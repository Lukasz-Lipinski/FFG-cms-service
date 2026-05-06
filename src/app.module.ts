import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AboutModule } from './modules/about/about.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicianEntity } from './modules/about/entity/MusicianEntity';
import { AboutEntity } from './modules/about/entity/AboutEntity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AboutModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://llipinski1993_db_user:Pusia12345@ffg-db.ffno4j3.mongodb.net/ffg-db',
      entities: [MusicianEntity, AboutEntity],
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
