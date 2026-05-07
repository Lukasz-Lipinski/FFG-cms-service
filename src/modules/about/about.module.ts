import { Module } from '@nestjs/common';
import { AboutController } from './controllers/about.controller';
import { AboutService } from './services/about.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicianEntity } from './entity/MusicianEntity';
import { AboutEntity } from './entity/AboutEntity';

@Module({
  imports: [TypeOrmModule.forFeature([MusicianEntity, AboutEntity])],
  controllers: [AboutController],
  providers: [AboutService],
})
export class AboutModule {}
