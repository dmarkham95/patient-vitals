import { IsString } from 'class-validator';
import { AuthUserDto } from '.';

export class AuthSessionDto {

  @IsString()
  public user: AuthUserDto;

  @IsString()
  public accessToken: string;

  @IsString()
  public refreshToken?: string;
  

}
