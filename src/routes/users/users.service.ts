import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { passwordStrength } from 'src/common/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntUser } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<UpdateUserDto> {
    const hashPassword = bcrypt.hashSync(
      createUserDto.password,
      passwordStrength,
    );
    const newUser = { ...createUserDto, password: hashPassword };
    const user = await this.usersRepository.createUser(newUser);
    return EntUser.toResponse(user);
  }

  async findAllUsers(): Promise<UpdateUserDto[]> {
    const users = await this.usersRepository.findAllUsers();
    return users.map((user) => EntUser.toResponse(user));
  }

  async findOneUser(id: string): Promise<UpdateUserDto> {
    const user = await this.usersRepository.findOneUser(id);
    return EntUser.toResponse(user);
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    const updatedUser = await this.usersRepository.updateUser(
      id,
      updateUserDto,
    );
    return EntUser.toResponse(updatedUser);
  }

  async removeUser(id: string): Promise<void> {
    await this.usersRepository.deleteUser(id);
  }
}
