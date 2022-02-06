import { CreateUserDto } from '../users/dto/create-user.dto';
import { EntUser } from '../users/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(EntUser)
export class Authentification extends Repository<EntUser> {
  async getUser(login: string) {
    return await this.findOneOrFail({ login });
  }
  async getOneUser(login: string) {
    return await this.findOne({ login });
  }
  async addUser(body: CreateUserDto) {
    return await this.save(body);
  }
}
