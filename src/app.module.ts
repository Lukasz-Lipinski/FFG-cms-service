import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AboutModule } from './modules/about/about.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicianEntity } from './modules/about/entity/MusicianEntity';
import { AboutEntity } from './modules/about/entity/AboutEntity';
import { ConfigModule } from '@nestjs/config';
import { DiscographyModule } from './modules/discography/discography.module';
import { AlbumEntity } from './modules/discography/entity/AlbumEntity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'CaneCorsoDB',
      entities: [MusicianEntity, AboutEntity, AlbumEntity],
      migrations: ['src/migrations/*.ts'],
      synchronize: false,
    }),
    AboutModule,
    DiscographyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
