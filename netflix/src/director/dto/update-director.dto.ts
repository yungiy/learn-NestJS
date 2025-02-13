import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateDirectorDto {
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsNotEmpty()
  @IsDateString()
  @IsOptional()
  dob?: Date;

  @IsOptional()
  nationality?: string;
}
