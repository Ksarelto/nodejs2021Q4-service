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
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { ResponseColumnDto } from './dto/response-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@ApiTags(SwaggerTags.column)
@ApiBearerAuth()
@ApiForbiddenResponse({ description: SwaggerResponse.forbidden })
@ApiUnauthorizedResponse({ description: SwaggerResponse.unauthorized })
@UseGuards(AuthGuard)
@Controller('boards')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @ApiCreatedResponse({
    description: SwaggerDescription.createColumn,
    type: ResponseColumnDto,
  })
  @ApiBody({ type: CreateColumnDto })
  @ApiOperation({ summary: SwaggerSummary.createColumn })
  @ApiQuery({ name: 'boardId', type: 'string' })
  @Post(':boardId/columns')
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param(':boardId') boardId: string,
    @Body() createColumnDto: CreateColumnDto,
  ) {
    return this.columnsService.create(boardId, createColumnDto);
  }

  @ApiOkResponse({ description: SwaggerDescription.getAllColumns })
  @ApiOperation({ summary: SwaggerSummary.getAllColumns })
  @ApiQuery({ name: 'boardId', type: 'string' })
  @Get(':boardId/columns')
  findAll(@Param(':boardId') boardId: string) {
    return this.columnsService.findAll(boardId);
  }

  @ApiOkResponse({
    description: SwaggerDescription.getOneColumn,
    type: ResponseColumnDto,
  })
  @ApiQuery({ name: 'boardId', type: 'string' })
  @ApiQuery({ name: 'columnId', type: 'string' })
  @ApiOperation({ summary: SwaggerSummary.getOneColumn })
  @Get(':boardId/columns/:columnId')
  findOne(@Param('columnId') columnId: string) {
    return this.columnsService.findOne(columnId);
  }

  @ApiOkResponse({
    description: SwaggerDescription.updateColumn,
    type: ResponseColumnDto,
  })
  @ApiQuery({ name: 'boardId', type: 'string' })
  @ApiQuery({ name: 'columnId', type: 'string' })
  @ApiBody({ type: CreateColumnDto })
  @ApiOperation({ summary: SwaggerSummary.updateColumn })
  @Put(':boardId/columns/:columnId')
  update(
    @Param('boardId') boardId: string,
    @Param('columnId') columnId: string,
    @Body() updateColumnDto: UpdateColumnDto,
  ) {
    return this.columnsService.update(boardId, columnId, updateColumnDto);
  }

  @ApiNoContentResponse({ description: SwaggerDescription.deleteColumn })
  @ApiQuery({ name: 'boardId', type: 'string' })
  @ApiQuery({ name: 'columnId', type: 'string' })
  @ApiOperation({ summary: SwaggerSummary.deleteColumn })
  @Delete(':boardId/columns/:columnId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('boardId') boardId: string,
    @Param('columnId') columnId: string,
  ) {
    return this.columnsService.remove(boardId, columnId);
  }
}
