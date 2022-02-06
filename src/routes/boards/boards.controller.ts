import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
  ApiBody,
  ApiQuery,
  ApiOperation,
} from '@nestjs/swagger';
import {
  SwaggerDescription,
  SwaggerResponse,
  SwaggerSummary,
  SwaggerTags,
} from 'src/common/swagger.messages';
import { AuthGuard } from 'src/routes/registration/auth.guard';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { ResponseBoardDto } from './dto/response-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@ApiTags(SwaggerTags.board)
@ApiBearerAuth()
@ApiForbiddenResponse({ description: SwaggerResponse.forbidden })
@ApiUnauthorizedResponse({ description: SwaggerResponse.unauthorized })
@UseGuards(AuthGuard)
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @ApiCreatedResponse({
    description: SwaggerDescription.createBoard,
    type: ResponseBoardDto,
  })
  @ApiBody({ type: CreateBoardDto })
  @ApiOperation({ summary: SwaggerSummary.createBoard })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.create(createBoardDto);
  }

  @ApiOkResponse({ description: SwaggerDescription.getBoardAll })
  @ApiOperation({ summary: SwaggerSummary.getAllBoard })
  @Get()
  findAll() {
    return this.boardsService.findAll();
  }

  @ApiOkResponse({
    description: SwaggerDescription.getBoard,
    type: ResponseBoardDto,
  })
  @ApiQuery({ name: 'id', type: 'string' })
  @ApiOperation({ summary: SwaggerSummary.getOneBoard })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardsService.findOne(id);
  }

  @ApiOkResponse({
    description: SwaggerDescription.updateBoard,
    type: ResponseBoardDto,
  })
  @ApiQuery({ name: 'id', type: 'string' })
  @ApiBody({ type: CreateBoardDto })
  @ApiOperation({ summary: SwaggerSummary.updateBoard })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardsService.update(id, updateBoardDto);
  }

  @ApiNoContentResponse({ description: SwaggerDescription.deleteBoard })
  @ApiQuery({ name: 'id', type: 'string' })
  @ApiOperation({ summary: SwaggerSummary.deleteBoard })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.boardsService.remove(id);
  }
}
