import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class AlbumEntity {
  @ObjectIdColumn()
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
