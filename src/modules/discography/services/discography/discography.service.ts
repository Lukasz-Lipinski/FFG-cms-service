import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { AlbumEntity } from '../../entity/AlbumEntity';
import { AddNewAlbumDto } from '../../dto/AddNewAlbumDto';
import { AppDataSource } from 'src/core/database/db';

@Injectable()
export class DiscographyService {
  private discographyRepository: Repository<AlbumEntity> = AppDataSource.getRepository(AlbumEntity);

  async getAlbum(id?: string): Promise<AlbumEntity> {
    if (!id) {
      throw new BadRequestException('Invalid album ID');
    }

    const album = await this.discographyRepository.findOne({ where: { id } });

    if (!album) {
      throw new BadRequestException('Album not found');
    }
    return album;
  }

  async addAlbum(album: AddNewAlbumDto): Promise<AlbumEntity> {
    if (!album) {
      throw new BadRequestException('Invalid album data');
    }

    const newAlbumEntity: Partial<AlbumEntity> = {
      ...album,
    };

    const createdAlbum = await this.discographyRepository.save(newAlbumEntity);

    if (!createdAlbum) {
      throw new BadRequestException('Failed to create album entity');
    }

    return createdAlbum;
  }
}
