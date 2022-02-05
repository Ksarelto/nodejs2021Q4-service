import { Injectable } from '@nestjs/common';
import { ColumnRepository } from './columns.repository';
import { CreateColumnDto } from './dto/create-column.dto';
import { ResponseColumnDto } from './dto/response-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Injectable()
export class ColumnsService {
  constructor(private columnRepository: ColumnRepository) {}

  async create(
    boardId: string,
    createColumnDto: CreateColumnDto,
  ): Promise<ResponseColumnDto> {
    const savedColumn = await this.columnRepository.createColumn(
      boardId,
      createColumnDto,
    );
    return { ...savedColumn, board: savedColumn.board.id };
  }

  async findAll(boardId: string): Promise<ResponseColumnDto[]> {
    const allColumns = await this.columnRepository.findAllColumns();
    const filteredColumns = allColumns.filter(
      (col) => col.board.id === boardId,
    );
    const resultColumnsArray = filteredColumns.map((col) => ({
      ...col,
      board: col.board.id,
    }));
    return resultColumnsArray;
  }

  async findOne(id: string): Promise<ResponseColumnDto> {
    const column = await this.columnRepository.findOneColumn(id);
    return { ...column, board: column.board.id };
  }

  async update(
    boardId: string,
    columnId: string,
    updateColumnDto: UpdateColumnDto,
  ): Promise<ResponseColumnDto> {
    const updatedColumn = await this.columnRepository.updateColumn(
      boardId,
      columnId,
      updateColumnDto,
    );
    return { ...updatedColumn, board: updatedColumn.board.id };
  }

  async remove(boardId: string, columnId: string): Promise<void> {
    await this.columnRepository.deleteColumn(boardId, columnId);
  }
}
