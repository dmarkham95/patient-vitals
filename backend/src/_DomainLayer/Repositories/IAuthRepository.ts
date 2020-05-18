import { AuthLoginDto } from "_ApplicationLayer/DTO/Auth";
import { Claim } from "_ApplicationLayer/Models/Auth/claim.model";
import { AuthSession } from "_DomainLayer/Entities/Auth/authSession";
import { AuthSignupDto } from "_ApplicationLayer/DTO/Auth/auth-signup.dto";

export interface IAuthRepository {
  createNewUser(newUser: AuthSignupDto): Promise<AuthSession>;
  getAuthenticateUser(authLogin: AuthLoginDto): Promise<AuthSession>;
  getAuthenticateUserWithAccessToken(token: string): Promise<AuthSession>;
  authorizeToken(token: string): Promise<Claim>;
}
