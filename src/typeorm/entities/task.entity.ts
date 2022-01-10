import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { EntBoard } from './board.entity';
import { EntUser } from './user.entity';

@Entity()
export class EntTask {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  title!: string;

  @Column()
  order!: number;

  @Column()
  description!: string;

  @Column({ type: 'uuid', nullable: true, name: 'column_id' })
  columnId!: string | null;

  @ManyToOne(() => EntBoard, (board) => board.tasks, {
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  boardId!: EntBoard;

  @ManyToOne(() => EntUser, (user) => user.tasks, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  userId!: EntUser | null;
}
