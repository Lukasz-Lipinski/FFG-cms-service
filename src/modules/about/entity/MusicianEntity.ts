import { ObjectId } from 'mongodb';
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';
import { InstrumentEnum } from '../shared/models';

@Entity()
export class MusicianEntity {
  @ObjectIdColumn()
  _id: ObjectId | undefined;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  instrument: InstrumentEnum;

  @Column()
  bio: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
