import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMovieDto {
  @IsOptional()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  genre: string;
}
