import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ResponseUserDto } from '../dto/response-user.dto';

@Entity()
export class EntUser {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  login!: string;

  @Column()
  password!: string;

  @OneToMany('EntTask', 'userId')
  tasks!: string;

  static toResponse(user: ResponseUserDto) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
