import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import type { EntTask } from './task.entity';

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

  @OneToMany('EntTask', 'userId')
  tasks!: EntTask[];
}
