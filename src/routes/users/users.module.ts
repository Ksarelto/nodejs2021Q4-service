import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { EntUser } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EntUser, UserRepository])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
