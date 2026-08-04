import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { AboutEntity } from '../../modules/about/entity/AboutEntity';
import { MusicianEntity } from '../../modules/about/entity/MusicianEntity';
import { AlbumEntity } from '../../modules/discography/entity/AlbumEntity';

export const AppDataSource = new DataSource({
  type: 'mongodb',
  url: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cc-db.kbgicrx.mongodb.net/?appName=cc-db`,
  database: 'ffg-db',
  entities: [AboutEntity, MusicianEntity, AlbumEntity],
  synchronize: false,
});
