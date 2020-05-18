export interface Claim {
    token_use: string;
    auth_time: number;
    iss: string;
    exp: number;
    sub: string;
    aud: string;
    iat: string;
    email: string;
  }