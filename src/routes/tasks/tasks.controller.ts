import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  HttpStatus,
  HttpCode,
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
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from 'src/routes/registration/auth.guard';
import { ResponseTaskDto } from './dto/response-task.dto';
import {
  SwaggerDescription,
  SwaggerResponse,
  SwaggerSummary,
  SwaggerTags,
} from 'src/common/swagger.messages';

@ApiTags(SwaggerTags.task)
@ApiBearerAuth()
@ApiForbiddenResponse({ description: SwaggerResponse.forbidden })
@ApiUnauthorizedResponse({ description: SwaggerResponse.unauthorized })
@UseGuards(AuthGuard)
@Controller('boards')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiCreatedResponse({
    description: SwaggerDescription.createTask,
    type: ResponseTaskDto,
  })
  @ApiBody({ type: CreateTaskDto })
  @ApiQuery({ name: 'boardId', type: 'string' })
  @ApiOperation({ summary: SwaggerSummary.createTask })
  @Post('/:boardId/tasks')
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('boardId') boardId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.create(boardId, createTaskDto);
  }

  @ApiOkResponse({
    description: SwaggerDescription.getAllTasks,
    type: ResponseTaskDto,
  })
  @ApiQuery({ name: 'boardId', type: 'string' })
  @ApiOperation({ summary: SwaggerSummary.getAllTasks })
  @Get('/:boardId/tasks')
  findAll(@Param('boardId') boardId: string) {
    return this.tasksService.findAll(boardId);
  }

  @ApiOkResponse({
    description: SwaggerDescription.getTask,
    type: ResponseTaskDto,
  })
  @ApiQuery({ name: 'boardId', type: 'string' })
  @ApiQuery({ name: 'taskId', type: 'string' })
  @ApiOperation({ summary: SwaggerSummary.getOneTask })
  @Get('/:boardId/tasks/:taskId')
  findOne(@Param('taskId') taskId: string) {
    return this.tasksService.findOne(taskId);
  }

  @ApiOkResponse({
    description: SwaggerDescription.updateTask,
    type: ResponseTaskDto,
  })
  @ApiBody({ type: CreateTaskDto })
  @ApiQuery({ name: 'boardId', type: 'string' })
  @ApiQuery({ name: 'taskId', type: 'string' })
  @ApiOperation({ summary: SwaggerSummary.updateTask })
  @Put('/:boardId/tasks/:taskId')
  update(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(boardId, taskId, updateTaskDto);
  }

  @ApiNoContentResponse({
    description: SwaggerDescription.deleteTask,
  })
  @ApiQuery({ name: 'boardId', type: 'string' })
  @ApiQuery({ name: 'taskId', type: 'string' })
  @ApiOperation({ summary: SwaggerSummary.deleteTask })
  @Delete('/:boardId/tasks/:taskId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('boardId') boardId: string, @Param('taskId') taskId: string) {
    return this.tasksService.remove(boardId, taskId);
  }
}
