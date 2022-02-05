import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntBoard } from '../boards/entities/board.entity';
import { EntColumn } from './entities/column.entity';
import { ColumnsService } from './columns.service';
import { ColumnRepository } from './columns.repository';
import { ColumnsController } from './columns.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EntBoard, EntColumn, ColumnRepository])],
  controllers: [ColumnsController],
  providers: [ColumnsService],
})
export class ColumnsModule {}
