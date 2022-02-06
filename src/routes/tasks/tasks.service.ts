import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { EntTask } from './entities/task.entity';
import generateTaskObject from './generate.task';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(private taskRepository: TaskRepository) {}

  async create(boardId: string, createTaskDto: CreateTaskDto) {
    const savedTask = await this.taskRepository.createTask(
      boardId,
      createTaskDto,
    );
    return { ...savedTask, boardId: savedTask.boardId.id };
  }

  async findAll(boardId: string) {
    const allTasks = await this.taskRepository.getAllTasks();
    const searchedTasks = allTasks.filter(
      (task) => task.boardId.id === boardId,
    );
    const tasks = searchedTasks.map((task: EntTask) =>
      generateTaskObject(task),
    );
    return tasks;
  }

  async findOne(taskId: string) {
    const task = await this.taskRepository.getOneTask(taskId);
    const resultTask = generateTaskObject(task);
    return resultTask;
  }

  async update(boardId: string, taskId: string, updateTaskDto: UpdateTaskDto) {
    const savedTask = await this.taskRepository.updateTask(
      boardId,
      taskId,
      updateTaskDto,
    );
    return { ...savedTask, boardId: updateTaskDto.boardId };
  }

  async remove(boardId: string, taskId: string) {
    await this.taskRepository.deleteTask(boardId, taskId);
  }
}
