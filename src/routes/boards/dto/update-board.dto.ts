import { PartialType } from '@nestjs/mapped-types';
import { ResponseBoardDto } from './response-board.dto';

export class UpdateBoardDto extends PartialType(ResponseBoardDto) {}
