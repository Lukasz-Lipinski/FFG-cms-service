import { IsDate, IsString } from 'class-validator';

export class AddNewAlbumDto {
  @IsString()
  title: string;
  @IsDate()
  releaseDate: Date;
  @IsString({ each: true })
  trackList: string[];
  description: string;
  coverImageUrl: string;
}
