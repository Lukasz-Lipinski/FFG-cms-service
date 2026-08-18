import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { AboutEntity } from '../../modules/about/entity/AboutEntity';
import { MusicianEntity } from '../../modules/about/entity/MusicianEntity';
import { AlbumEntity } from '../../modules/discography/entity/AlbumEntity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'admin',
  database: 'CaneCorsoDB',
  entities: [AboutEntity, MusicianEntity, AlbumEntity],
  synchronize: false,
  migrations: ['src/core/migrations/*.ts'],
});
