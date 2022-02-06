import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import type { EntBoard } from '../../boards/entities/board.entity';
import type { EntUser } from '../../users/entities/user.entity';

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

  @ManyToOne('EntBoard', 'tasks', {
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  boardId!: EntBoard;

  @ManyToOne('EntUser', 'tasks', {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  userId!: EntUser | null;
}
