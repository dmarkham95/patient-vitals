import { IsString } from 'class-validator';

export class AuthTokenLoginDto {

  @IsString()
  public token: string;

}
