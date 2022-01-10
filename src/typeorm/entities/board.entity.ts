import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EntColumn } from './column.entity';
import { EntTask } from './task.entity';

@Entity()
export class EntBoard {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  title!: string;

  @OneToMany(() => EntColumn, (column: EntColumn) => column.board, {
    eager: true,
    cascade: true,
  })
  columns!: EntColumn[];

  @OneToMany(() => EntTask, (task) => task.boardId)
  tasks!: EntTask[];
}
