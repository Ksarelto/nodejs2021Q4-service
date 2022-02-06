import { Injectable } from '@nestjs/common';
import { BoardRepository } from './boards.repository';
import { CreateBoardDto } from './dto/create-board.dto';
import { ResponseBoardDto } from './dto/response-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {}

  async create(createBoardDto: CreateBoardDto): Promise<ResponseBoardDto> {
    const savedBoard = await this.boardRepository.createBoard(createBoardDto);
    return savedBoard;
  }

  async findAll(): Promise<ResponseBoardDto[]> {
    const allBoards = await this.boardRepository.findAllBoards();
    return allBoards;
  }

  async findOne(id: string): Promise<ResponseBoardDto> {
    const board = await this.boardRepository.findOneBoard(id);
    return board;
  }

  async update(
    id: string,
    updateBoardDto: UpdateBoardDto,
  ): Promise<ResponseBoardDto> {
    const updatedBoard = await this.boardRepository.updateBoard(
      id,
      updateBoardDto,
    );
    return updatedBoard;
  }

  async remove(id: string): Promise<void> {
    await this.boardRepository.deleteBoard(id);
  }
}
