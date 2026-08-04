import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AddNewAlbumDto } from '../dto/AddNewAlbumDto';
import { DiscographyService } from '../services/discography/discography.service';
import { AlbumEntity } from '../entity/AlbumEntity';

@Controller('discography')
export class DiscographyController {
  constructor(private readonly discographyService: DiscographyService) {}

  @Get(':id')
  async getDiscography(@Param('id') id: string): Promise<AlbumEntity> {
    return this.discographyService.getAlbum(id);
  }

  @Post('add')
  async addAlbum(@Body() albumDto: AddNewAlbumDto): Promise<AlbumEntity> {
    return await this.discographyService.addAlbum(albumDto);
  }
}
