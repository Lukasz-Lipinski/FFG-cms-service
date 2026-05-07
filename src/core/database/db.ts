import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { AboutEntity } from '../../modules/about/entity/AboutEntity';
import { MusicianEntity } from '../../modules/about/entity/MusicianEntity';

export const AppDataSource = new DataSource({
  type: 'mongodb',
  url: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ffg-db.ffno4j3.mongodb.net/ffg-db?retryWrites=true&w=majority`,
  database: 'ffg-db',
  entities: [AboutEntity, MusicianEntity],
  synchronize: false,
});
