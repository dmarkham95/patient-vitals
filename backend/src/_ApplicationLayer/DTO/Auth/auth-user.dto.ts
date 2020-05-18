import { IsArray, IsBoolean, IsString } from 'class-validator';

export class AuthUserDto {

  @IsArray()
  roles: string[] | [];

  @IsString()
  displayName: string;
  
  @IsString()
  id: string;

  @IsString()
  photoURL?: string;
  
  @IsString()
  email: string;
  
  @IsBoolean()
  isConfirmed: boolean;

  @IsArray()
  shortcuts?: string[];
  
	settings?: any;

}
