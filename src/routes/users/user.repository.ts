import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntUser } from './entities/user.entity';

@EntityRepository(EntUser)
export class UserRepository extends Repository<EntUser> {
  async createUser(user: CreateUserDto): Promise<ResponseUserDto> {
    return await this.save(user);
  }

  async findAllUsers(): Promise<ResponseUserDto[]> {
    return await this.find();
  }

  async findOneUser(id: string) {
    return await this.findOneOrFail(id);
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<ResponseUserDto> {
    await this.findOneOrFail(id);
    const updatedUser = await this.save(user);
    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    await this.findOneOrFail(id);
    await this.delete(id);
  }
}
