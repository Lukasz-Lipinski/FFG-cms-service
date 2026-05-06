import { AboutEntity } from 'src/modules/about/entity/AboutEntity';
import { MusicianEntity } from 'src/modules/about/entity/MusicianEntity';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mongodb',
  host: 'mongodb+srv://llipinski1993_db_user:njyu5Kw9aAS2F2V3@ffg-db.ffno4j3.mongodb.net/',
  port: 27017,
  database: 'ffg-db',
  password: 'Pusia12345',
  username: 'llipinski1993_db_user',
});
