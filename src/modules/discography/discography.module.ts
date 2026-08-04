import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscographyService } from './services/discography/discography.service';
import { DiscographyController } from './controllers/discography.controller';
import { AlbumEntity } from './entity/AlbumEntity';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity])],
  controllers: [DiscographyController],
  providers: [DiscographyService],
})
export class DiscographyModule {}
