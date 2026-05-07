import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AlbumEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  releaseDate: Date;

  @Column()
  coverImageUrl: string;

  @Column()
  description: string;

  @Column()
  trackList: string[];
}
