/* eslint-disable import/no-cycle */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { EntTask } from './task.entity';

@Entity()
export class EntUser {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  login!: string;

  @Column()
  password!: string;

  @OneToMany(() => EntTask, (task) => task.userId)
  tasks!: EntTask[];
}
