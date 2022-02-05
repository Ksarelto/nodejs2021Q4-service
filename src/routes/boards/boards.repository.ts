import { EntityRepository, Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { ResponseBoardDto } from './dto/response-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { EntBoard } from './entities/board.entity';

@EntityRepository(EntBoard)
export class BoardRepository extends Repository<EntBoard> {
  async createBoard(board: CreateBoardDto): Promise<ResponseBoardDto> {
    return await this.save(board);
  }

  async findAllBoards(): Promise<ResponseBoardDto[]> {
    return await this.find();
  }

  async findOneBoard(id: string): Promise<ResponseBoardDto> {
    return await this.findOneOrFail(id);
  }

  async updateBoard(
    id: string,
    board: UpdateBoardDto,
  ): Promise<ResponseBoardDto> {
    await this.findOneOrFail(id);
    const updatedBoard = await this.save(board);
    return updatedBoard;
  }

  async deleteBoard(id: string): Promise<void> {
    await this.findOneOrFail(id);
    await this.delete(id);
  }
}
