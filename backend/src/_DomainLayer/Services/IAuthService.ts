import { AuthResponse } from "aws-lambda";
import { AuthLoginDto } from "_ApplicationLayer/DTO/Auth";
import { AuthSessionDto } from "_ApplicationLayer/DTO/Auth/auth-session.dto";
import { AuthSignupDto } from "_ApplicationLayer/DTO/Auth/auth-signup.dto";

export interface IAuthService {
  login(authLogin: AuthLoginDto): Promise<AuthSessionDto>;
  signUp(newUser: AuthSignupDto): Promise<AuthSessionDto>;
  loginWithAccessToken(token: string): Promise<AuthSessionDto>;
  authorize (token: string,eventMethod: string): Promise<AuthResponse>;
}
