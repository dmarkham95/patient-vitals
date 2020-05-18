(global as any).fetch = require("node-fetch");
import { Injectable } from "@nestjs/common";
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession,
} from "amazon-cognito-identity-js";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import * as Axios from "axios";
import * as jsonwebtoken from "jsonwebtoken";
import { promisify } from "util";
import { AuthLoginDto } from "_ApplicationLayer/DTO/Auth";
import { Claim } from "_ApplicationLayer/Models/Auth/claim.model";
import { MapOfKidToPublicKey } from "_ApplicationLayer/Models/Auth/mapOfKidToPublicKey.model";
import { PublicKeys } from "_ApplicationLayer/Models/Auth/publicKey.model";
import { TokenHeader } from "_ApplicationLayer/Models/Auth/tokenHeader.model";
import { AuthSession } from "_DomainLayer/Entities/Auth/authSession";
import { IAuthRepository } from "_DomainLayer/Repositories/IAuthRepository";
import DynamoDB = require("aws-sdk/clients/dynamodb");
import { AuthSignupDto } from "_ApplicationLayer/DTO/Auth/auth-signup.dto";
import moment = require("moment");
import * as AWS from "aws-sdk";
import env_variables from "_Common/Utilities/Environments/env_variables";

@Injectable()
export class AuthRepository implements IAuthRepository {
  private cognitoPoolId = process.env.COGNITO_POOL_ID || "";
  private clientId = process.env.COGNITO_CLIENT_ID || "";
  private userPoolRegion = process.env.COGNITO_REGION || "";
  private cognitoIssuer = `https://cognito-idp.${this.userPoolRegion}.amazonaws.com/${this.cognitoPoolId}`;
  private jwkToPem = require("jwk-to-pem");
  private verifyPromised = promisify(jsonwebtoken.verify.bind(jsonwebtoken));

  private dynamoDBApiVersion = process.env.DYNAMODB_API_VERSION || "";
  private dynamoDBRegion = process.env.DYNAMODB_REGION || "";
  private dynamoDBTableName = process.env.DYNAMODB_TABLE || "";

  private accessKeyId = process.env.ACCESS_KEY_ID || "";
  private secretAccessKey = process.env.SECRET_ACCESS_KEY || "";

  private client: DocumentClient = new DocumentClient({
    apiVersion: this.dynamoDBApiVersion,
    region: this.dynamoDBRegion,
  });

  private db: DynamoDB = new DynamoDB({
    apiVersion: this.dynamoDBApiVersion,
    region: this.dynamoDBRegion,
  });
  private tableName: string = this.dynamoDBTableName;

  constructor() {
    console.log("env_variables.isDev", env_variables.isDev);
    if (env_variables.isDev) {
      AWS.config.update({
        region: this.userPoolRegion,
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey,
      });
    }
  }

  public async createNewUser(newUser: AuthSignupDto): Promise<AuthSession> {
    const { email, password } = newUser;

    const cognito = new AWS.CognitoIdentityServiceProvider();
    await cognito
      .adminCreateUser({
        UserPoolId: this.cognitoPoolId,
        Username: email,
        MessageAction: "SUPPRESS",
        TemporaryPassword: password,
      })
      .promise();

    const initAuthResponse = await cognito
      .adminInitiateAuth({
        AuthFlow: "ADMIN_NO_SRP_AUTH",
        ClientId: this.clientId,
        UserPoolId: this.cognitoPoolId,
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
        },
      })
      .promise();

    if (initAuthResponse.ChallengeName === "NEW_PASSWORD_REQUIRED") {
      await cognito
        .adminRespondToAuthChallenge({
          ChallengeName: "NEW_PASSWORD_REQUIRED",
          ClientId: this.clientId,
          UserPoolId: this.cognitoPoolId,
          ChallengeResponses: {
            USERNAME: email,
            NEW_PASSWORD: password,
          },
          Session: initAuthResponse.Session,
        })
        .promise();
    }

    let authSession = await this.getAuthenticateUser({
      email,
      password,
    });

    return authSession;
  }

  public async getAuthenticateUser(
    authLogin: AuthLoginDto
  ): Promise<AuthSession> {
    const userPoolData = {
      UserPoolId: this.cognitoPoolId,
      ClientId: this.clientId,
    };

    const userPool = new CognitoUserPool(userPoolData);

    var authenticationDetails = new AuthenticationDetails({
      Username: authLogin.email,
      Password: authLogin.password,
    });

    var cognitoUser = new CognitoUser({
      Username: authLogin.email,
      Pool: userPool,
    });

    var userSession = await this.authenticateUserAsync(
      cognitoUser,
      authenticationDetails
    );

    let awsId = userSession.getAccessToken().payload["sub"];

    // let user = await this.getUserByAwsId(awsId);

    // if (!user.IsActive) {
    //   throw new Error("User is not authorized");
    // }

    const authSession: AuthSession = {
      User: null,
      AccessToken: userSession.getIdToken().getJwtToken(),
      RefreshToken: userSession.getRefreshToken().getToken(),
    };

    return authSession;
  }

  private async getAuthClaim(token: string): Promise<Claim> {
    const tokenSections = (token || "").split(".");
    if (tokenSections.length < 2) {
      throw new Error("requested token is invalid");
    }

    const headerJSON = Buffer.from(tokenSections[0], "base64").toString("utf8");
    const header = JSON.parse(headerJSON) as TokenHeader;
    const keys = await this.getPublicKeys();
    const key = keys[header.kid];

    if (key === undefined) {
      throw new Error("claim made for unknown kid");
    }

    const claim = (await this.verifyPromised(token, key.pem)) as Claim;
    const currentSeconds = Math.floor(new Date().valueOf() / 1000);

    if (currentSeconds > claim.exp || currentSeconds < claim.auth_time) {
      throw new Error("claim is expired or invalid");
    }
    if (claim.iss !== this.cognitoIssuer) {
      throw new Error("claim issuer is invalid");
    }
    if (claim.token_use !== "id") {
      throw new Error("claim use is not access");
    }

    return claim;
  }

  public async getAuthenticateUserWithAccessToken(
    token: string
  ): Promise<AuthSession> {
    try {
      let claim = await this.getAuthClaim(token);

      // let user = await this.getUserByAwsId(claim.sub);

      // if (!user.IsActive) {
      //   console.log(`User is not authorized - ${claim.sub}`, user);
      //   throw new Error("User is not authorized");
      // }

      const authSession: AuthSession = {
        User: null,
        AccessToken: token,
      };

      return authSession;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async authorizeToken(token: string): Promise<Claim> {
    try {
      let claim = await this.getAuthClaim(token);
      console.log(`claim confirmed for ${claim.aud}`);
      return claim;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  private async authenticateUserAsync(
    cognitoUser: CognitoUser,
    authenticationDetails: AuthenticationDetails
  ): Promise<CognitoUserSession> {
    return new Promise(function (resolve, reject) {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => resolve(result),
        onFailure: (err) => reject(err),
      });
    });
  }

  private async getPublicKeys(): Promise<MapOfKidToPublicKey> {
    let cacheKeys: MapOfKidToPublicKey | undefined;

    if (!cacheKeys) {
      const url = `${this.cognitoIssuer}/.well-known/jwks.json`;
      const publicKeys = await Axios.default.get<PublicKeys>(url);
      cacheKeys = publicKeys.data.keys.reduce((agg, current) => {
        const pem = this.jwkToPem(current);
        agg[current.kid] = { instance: current, pem };
        return agg;
      }, {} as MapOfKidToPublicKey);
      return cacheKeys;
    } else {
      return cacheKeys;
    }
  }
}
