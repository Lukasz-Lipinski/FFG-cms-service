import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { AboutEntity } from '../../modules/about/entity/AboutEntity';
import { MusicianEntity } from '../../modules/about/entity/MusicianEntity';
import { AlbumEntity } from '../../modules/discography/entity/AlbumEntity';
import { config } from 'dotenv';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [AboutEntity, MusicianEntity, AlbumEntity],
  synchronize: false,
  migrations: ['src/core/migrations/*.ts'],
});
