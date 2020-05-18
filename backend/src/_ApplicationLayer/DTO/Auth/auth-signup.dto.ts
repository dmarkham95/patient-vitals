import { IsString } from 'class-validator';

export class AuthSignupDto {

  @IsString()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;
}
