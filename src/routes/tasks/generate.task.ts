import { HttpException, HttpStatus } from '@nestjs/common';
import { errMess, requestedObjects } from 'src/exeptions/errors.object';
import { CreateTaskDto } from './dto/create-task.dto';
import { EntTask } from './entities/task.entity';

const generateTaskObject = (task: EntTask): CreateTaskDto => {
  const boardId = task.boardId.id;
  const userId = task.userId ? task.userId.id : null;
  if (boardId) {
    return { ...task, boardId, userId };
  }
  throw new HttpException(
    errMess.invalid + requestedObjects.task,
    HttpStatus.BAD_REQUEST,
  );
};

export default generateTaskObject;
