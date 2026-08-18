import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { InstrumentEnum } from '../shared/models';

@Entity()
export class MusicianEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  surname!: string;

  @Column('enum', { enum: InstrumentEnum })
  instrument!: InstrumentEnum;

  @Column('text')
  bio!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
