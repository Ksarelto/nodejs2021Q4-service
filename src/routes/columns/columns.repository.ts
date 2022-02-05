import { EntityRepository, getRepository, Repository } from 'typeorm';
import { EntBoard } from '../boards/entities/board.entity';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { EntColumn } from './entities/column.entity';

@EntityRepository(EntColumn)
export class ColumnRepository extends Repository<EntColumn> {
  async createColumn(
    boardId: string,
    column: CreateColumnDto,
  ): Promise<EntColumn> {
    const board = await getRepository(EntBoard).findOneOrFail(boardId);
    const savedColumn = { ...column, board };
    return await this.save(savedColumn);
  }

  async findAllColumns(): Promise<EntColumn[]> {
    return await this.find();
  }

  async findOneColumn(id: string): Promise<EntColumn> {
    return await this.findOneOrFail(id);
  }

  async updateColumn(
    boardId: string,
    columnId: string,
    column: UpdateColumnDto,
  ): Promise<EntColumn> {
    const board = await getRepository(EntBoard).findOneOrFail(boardId);
    await this.findOneOrFail(columnId);
    const resultColumn = { ...column, board };
    const updatedColumn = await this.save(resultColumn);
    return updatedColumn;
  }

  async deleteColumn(boardId: string, columnId: string): Promise<void> {
    await getRepository(EntBoard).findOneOrFail(boardId);
    await this.findOneOrFail(columnId);
    await this.delete(columnId);
  }
}
