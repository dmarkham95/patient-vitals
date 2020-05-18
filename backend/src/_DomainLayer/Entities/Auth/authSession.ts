import { User } from "../TypeOrm/user.entity";

export interface AuthSession {
  AccessToken?: string;
  RefreshToken?: string;
  User?: User;
}
