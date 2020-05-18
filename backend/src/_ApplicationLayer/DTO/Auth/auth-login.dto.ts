import { IsString } from 'class-validator';

export class AuthLoginDto {

  @IsString()
  public email: string;

  @IsString()
  public password: string;

}
