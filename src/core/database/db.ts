import { AboutEntity } from 'src/modules/about/entity/AboutEntity';
import { MusicianEntity } from 'src/modules/about/entity/MusicianEntity';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mongodb',
  url: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ffg-db.ffno4j3.mongodb.net/ffg-db?retryWrites=true&w=majority`,
  database: 'ffg-db',
  entities: [AboutEntity, MusicianEntity],
  synchronize: false,
});
