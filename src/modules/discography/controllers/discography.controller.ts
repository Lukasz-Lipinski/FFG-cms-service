import { Body, Controller, Get, Post } from '@nestjs/common';
import { AddNewAlbumDto } from '../dto/AddNewAlbumDto';

@Controller('discography')
export class DiscographyController {
  @Get()
  getDiscography(): string {
    return 'Discography page content';
  }

  @Post('add')
  addAlbum(@Body() albumDto: AddNewAlbumDto): Promise<string> {
    return new Promise(() => 'tests');
  }
}
