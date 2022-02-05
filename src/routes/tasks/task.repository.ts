import { EntBoard } from '../boards/entities/board.entity';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { EntTask } from './entities/task.entity';

@EntityRepository(EntTask)
export class TaskRepository extends Repository<EntTask> {
  async createTask(id: string, task: CreateTaskDto) {
    const board = await getRepository(EntBoard).findOneOrFail(id);
    const newTask = { ...task, boardId: board, userId: null };
    const savedTask = await this.save(newTask);
    return savedTask;
  }

  async getAllTasks() {
    const allTasks = await this.find();
    return allTasks;
  }

  async getOneTask(id: string) {
    const task = await this.findOneOrFail(id);
    return task;
  }

  async updateTask(boardId: string, taskId: string, task: UpdateTaskDto) {
    await getRepository(EntBoard).findOneOrFail(boardId);
    const searchedTask = await this.findOneOrFail(taskId);
    const newTask = {
      ...task,
      boardId: searchedTask.boardId,
      userId: searchedTask.userId,
    };
    const updatedTask = await this.save(newTask);
    return updatedTask;
  }

  async deleteTask(boardId: string, taskId: string) {
    await getRepository(EntBoard).findOneOrFail(boardId);
    await getRepository(EntTask).findOneOrFail(taskId);
    await this.delete(taskId);
  }
}
