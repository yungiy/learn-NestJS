import { IsEmail, IsString } from 'class-validator';

export class CrateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  username: string;
}

export class UpdateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
