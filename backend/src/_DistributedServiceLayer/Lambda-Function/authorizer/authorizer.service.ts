import { Inject, Injectable } from "@nestjs/common";
import { AuthResponse } from "aws-lambda";
import { AUTH_SERVICE } from "_Common/Constant/ServiceNames/Services";
import { IAuthService } from "_DomainLayer/Services/IAuthService";

@Injectable()
export class AuthorizerService {
    private authServive: IAuthService;

    constructor(@Inject(AUTH_SERVICE) authServive: IAuthService) {
      this.authServive = authServive;
    }

  public async runAuthJob(token: string,methodArn: string): Promise<AuthResponse> {
    let authRes = await this.authServive.authorize(token,methodArn);
    return authRes;
  }



}
