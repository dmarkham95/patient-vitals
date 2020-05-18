import { Body, Controller, Inject, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthLoginDto, AuthTokenLoginDto } from "_ApplicationLayer/DTO/Auth";
import { AUTH_SERVICE } from "_Common/Constant/ServiceNames/Services";
import { IAuthService } from "_DomainLayer/Services/IAuthService";
import { AuthSignupDto } from "_ApplicationLayer/DTO/Auth/auth-signup.dto";

@Controller()
export class AuthController {
  private authServive: IAuthService;

  constructor(@Inject(AUTH_SERVICE) authServive: IAuthService) {
    this.authServive = authServive;
  }

  @Post("login")
  public async login(
    @Req() request: Request,
    @Res() response: Response,
    @Body() loginProps: AuthLoginDto
  ) {
    const session = await this.authServive.login(loginProps);

    response.cookie("patient_vitals_refresh_token", session.refreshToken, {
      httpOnly: true,
      path: "/auth/refresh-token",
      domain: "localhost",
    });

    delete session.refreshToken;

    response.send(session);
    return response;
  }

  @Post("signup")
  public async signup(
    @Req() request: Request,
    @Res() response: Response,
    @Body() loginProps: AuthSignupDto
  ) {
    const session = await this.authServive.signUp(loginProps);

    response.cookie("patient_vitals_refresh_token", session.refreshToken, {
      httpOnly: true,
      path: "/auth/refresh-token",
      domain: "localhost",
    });

    delete session.refreshToken;

    response.send(session);
    return response;
  }

  @Post("token")
  public async loginWithToken(
    @Req() request: Request,
    @Res() response: Response,
    @Body() token: AuthTokenLoginDto
  ) {
    const session = await this.authServive.loginWithAccessToken(token.token);
    response.send(session);

    return response;
  }
}
