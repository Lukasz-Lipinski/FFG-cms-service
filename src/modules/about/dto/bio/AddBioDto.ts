import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class AddBioDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  bio: string;
}
