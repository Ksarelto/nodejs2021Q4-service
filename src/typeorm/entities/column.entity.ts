import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
// eslint-disable-next-line import/no-cycle
import { EntBoard } from './board.entity';

@Entity()
export class EntColumn {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  title!: string;

  @Column()
  order!: number;

  @ManyToOne(() => EntBoard, (board: EntBoard) => board.columns, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  board!: EntBoard;
}
