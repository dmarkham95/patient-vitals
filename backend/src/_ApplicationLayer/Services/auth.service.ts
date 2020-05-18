import { Inject, Injectable } from "@nestjs/common";
import { AuthResponse, PolicyDocument, Statement } from "aws-lambda";
import { AuthSessionDto } from "_ApplicationLayer/DTO/Auth/auth-session.dto";
import { AuthSignupDto } from "_ApplicationLayer/DTO/Auth/auth-signup.dto";
import { AUTH_REPOSITORY } from "_Common/Constant/RepositoryNames/Repositories";
import { IAuthRepository } from "_DomainLayer/Repositories/IAuthRepository";
import { IAuthService } from "_DomainLayer/Services/IAuthService";
import { AuthLoginDto } from "../DTO/Auth";
@Injectable()
export class AuthService implements IAuthService {
  private authRepository: IAuthRepository;

  constructor(@Inject(AUTH_REPOSITORY) authRepository: IAuthRepository) {
    this.authRepository = authRepository;
  }

  public async login(authLogin: AuthLoginDto): Promise<AuthSessionDto> {
    try {
      const session = await this.authRepository.getAuthenticateUser(authLogin);

      // const authUser: AuthUserDto = {
      //   roles: session.User.Roles,
      //   isConfirmed: session.User.IsConfirmed,
      //   displayName: `${session.User.LastName}, ${session.User.FirstName}`,
      //   photoURL: null,
      //   id: session.User.UserId,
      //   email: session.User.Email,
      //   settings: null,
      //   shortcuts: [],
      // };

      const authSession: AuthSessionDto = {
        user: null,
        accessToken: session.AccessToken,
        refreshToken: session.RefreshToken,
      };

      return authSession;
    } catch (error) {
      throw error;
    }
  }

  public async signUp(newUser: AuthSignupDto): Promise<AuthSessionDto> {
    const session = await this.authRepository.createNewUser(newUser);

    // const authUser: AuthUserDto = {
    //   roles: session.User.Roles,
    //   isConfirmed: session.User.IsConfirmed,
    //   displayName: `${session.User.LastName}, ${session.User.FirstName}`,
    //   photoURL: null,
    //   id: session.User.UserId,
    //   email: session.User.Email,
    //   settings: null,
    //   shortcuts: [],
    // };

    const authSession: AuthSessionDto = {
      user: null,
      accessToken: session.AccessToken,
      refreshToken: session.RefreshToken,
    };

    return authSession;
  }

  public async loginWithAccessToken(token: string): Promise<AuthSessionDto> {
    const session = await this.authRepository.getAuthenticateUserWithAccessToken(
      token
    );

    // const authUser: AuthUserDto = {
    //   roles: session.User.Roles,
    //   isConfirmed: session.User.IsConfirmed,
    //   displayName: `${session.User.LastName}, ${session.User.FirstName}`,
    //   photoURL: null,
    //   id: session.User.UserId,
    //   email: session.User.Email,
    //   settings: null,
    //   shortcuts: [],
    // };

    const authSession: AuthSessionDto = {
      user: null,
      accessToken: session.AccessToken,
      refreshToken: session.RefreshToken,
    };
    return authSession;
  }

  async authorize(token: string, eventMethod: string): Promise<AuthResponse> {
    let c = await this.authRepository.authorizeToken(token);
    let authRes = this.generateAwsPolicy(c.sub, "Allow", eventMethod);
    return authRes;
  }

  private async generateAwsPolicy(
    principalId: string,
    effect: string,
    resource: string,
    context?: any
  ) {
    var authResponse: AuthResponse;

    if (effect && resource) {
      let statementOne: Statement = {
        Action: "execute-api:Invoke",
        Effect: effect,
        Resource: resource,
      };

      let policyDocument: PolicyDocument = {
        Version: "2012-10-17",
        Statement: [statementOne],
      };

      authResponse = {
        principalId: principalId,
        policyDocument: policyDocument,
      };
    }

    if (context) {
      authResponse.context = context;
    }

    return authResponse;
  }
}
