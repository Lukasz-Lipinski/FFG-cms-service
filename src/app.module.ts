import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AboutModule } from './modules/about/about.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicianEntity } from './modules/about/entity/MusicianEntity';
import { AboutEntity } from './modules/about/entity/AboutEntity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DiscographyModule } from './modules/discography/discography.module';
import { AlbumEntity } from './modules/discography/entity/AlbumEntity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: 5432,
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [MusicianEntity, AboutEntity, AlbumEntity],
        migrations: ['src/migrations/*.ts'],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    AboutModule,
    DiscographyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
