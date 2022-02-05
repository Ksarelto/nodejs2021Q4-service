import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import type { EntBoard } from '../../boards/entities/board.entity';

@Entity()
export class EntColumn {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  order!: number;

  @ManyToOne('EntBoard', 'columns', {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  board!: EntBoard;
}
