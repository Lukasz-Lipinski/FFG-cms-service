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

  @Column('string')
  name: string;

  @Column('string')
  surname: string;

  @Column('enum', { enum: InstrumentEnum })
  instrument: InstrumentEnum;

  @Column('string')
  bio: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
