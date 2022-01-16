/**
 * @module task_memory_methods
 */
import { DeleteResult, getRepository } from 'typeorm';
import { Task } from '../../common/types';
import { EntTask } from '../../typeorm/entities/task.entity';
import { EntBoard } from '../../typeorm/entities/board.entity';
import {
  CustomErrors,
  errorMessages,
  errorNames,
  requestedObjects,
} from '../../common/errors.object';
import { StatusCodes } from '../../common/constants';

/**
 * Function generate correct task object for response
 * @param {EntTask} task EntTask object
 * @returns New generated Task object
 */

const generateTaskObject = (task: EntTask): Task => {
  const boardId = task.boardId.id;
  const userId = task.userId ? task.userId.id : null;
  if (boardId) {
    return { ...task, boardId, userId };
  }
  throw new CustomErrors(
    errorNames.VE,
    StatusCodes.invalidId,
    errorMessages.invalid + requestedObjects.task
  );
};

/**
 * Get Boards and Tasks from database, find Tasks with the same boardId, return them
 * @async
 * @param {string} id - The boardId of Task object
 * @returns - The array of Tasks objects with same boardId
 */

export const getAllTasksDB = async (id: string): Promise<Task[]> => {
  const allTasks = await getRepository(EntTask).find();
  const searchedTasks = allTasks.filter((task) => task.boardId.id === id);
  const tasks = searchedTasks.map((task: EntTask) => generateTaskObject(task));
  return tasks;
};

/**
 * Get Boards and Tasks from database, find Task object with the taskId, return it
 * @async
 * @param {Record<string,string>} params - The object with boardId and taskId
 * @returns - The searched Task object
 */

export const getOneTaskDB = async (id: string): Promise<Task> => {
  const task = await getRepository(EntTask).findOneOrFail(id);
  const resultTask = generateTaskObject(task);
  return resultTask;
};

/**
 * This function add to database new Task object and return it
 * @async
 * @param {Task} data - The new Task object
 * @returns - The new Task object
 */

export const addTaskDB = async (data: Task) => {
  const board = await getRepository(EntBoard).findOneOrFail({
    id: data.boardId,
  });
  const newTask = { ...data, boardId: board, userId: null };
  const savedTask = await getRepository(EntTask).save(newTask);
  return { ...savedTask, boardId: data.boardId };
};

/**
 * Get boards and tasks from database, find and update found Task object, return updated object
 * @async
 * @param {Record<string,string>} params - The object with boardId and taskId
 * @param {Task} data - The data to update Task object
 * @returns - The updated Task object
 */

export const updateTaskDB = async (
  params: Record<string, string>,
  data: Task
): Promise<Task> => {
  const { boardId, taskId } = params;
  await getRepository(EntBoard).findOneOrFail(boardId);
  const task = await getRepository(EntTask).findOneOrFail(taskId);
  const newTask = { ...data, boardId: task.boardId, userId: task.userId };
  const updatedTask = await getRepository(EntTask).save(newTask);
  return generateTaskObject(updatedTask);
};

/**
 * Find by id in database and delete Task object, return new array of Tasks
 * @async
 * @param {Record<string, string>} params - The object with boardId and taskId
 * @returns - New array of Task`s objects
 */

export const deleteTaskDB = async (
  params: Record<string, string>
): Promise<DeleteResult> => {
  const { boardId, taskId } = params;
  await getRepository(EntBoard).findOneOrFail(boardId);
  const deletedTask = await getRepository(EntTask).delete(taskId as string);
  return deletedTask;
};
