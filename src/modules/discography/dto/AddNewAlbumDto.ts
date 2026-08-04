import { IsDate, IsString } from 'class-validator';

export class AddNewAlbumDto {
  @IsString()
  title: string;

  @IsDate()
  releaseDate: Date;

  @IsString({ each: true })
  trackList: string[];

  @IsString()
  description: string;

  @IsString()
  coverImageUrl: string;
}
