import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import type { EntColumn } from '../../columns/entities/column.entity';
import type { EntTask } from '../../tasks/entities/task.entity';

@Entity()
export class EntBoard {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @OneToMany('EntColumn', 'board', {
    eager: true,
    cascade: true,
  })
  columns!: EntColumn[];

  @OneToMany('EntTask', 'boardId')
  tasks!: EntTask[];
}
