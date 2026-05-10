import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AboutModule } from './modules/about/about.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicianEntity } from './modules/about/entity/MusicianEntity';
import { AboutEntity } from './modules/about/entity/AboutEntity';
import { ConfigModule } from '@nestjs/config';
import { DiscographyModule } from './modules/discography/discography.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ffg-db.ffno4j3.mongodb.net/ffg-db`,
      entities: [MusicianEntity, AboutEntity],
    }),
    AboutModule,
    DiscographyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
