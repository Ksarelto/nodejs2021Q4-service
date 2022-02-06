import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from './boards.repository';
import { EntBoard } from './entities/board.entity';
import { EntColumn } from '../columns/entities/column.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EntBoard, EntColumn, BoardRepository])],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
