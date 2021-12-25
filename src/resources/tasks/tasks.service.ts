/**
 * @module task_service
 */
import { v4 as uuidv4 } from 'uuid';
import { StatusCodes } from '../../common/constants';
import { CustomErrors, errorMessages, errorNames, requestedObjects } from '../../common/errors.object';
import { Task } from '../../common/types';
import { validateID } from '../../common/utils';
import { getAllTasksDB, getOneTaskDB, addTaskDB, updateTaskDB, deleteTaskDB} from './tasks.memory';

/**
 * Validate id and return array of Tasks objects
 * @async
 * @param {string} id The boardId of Task object
 * @throw - Throws Error if invalid id
 * @returns - The array of Tasks objects
 */

export const getAllTasks = async (id: string): Promise<Task[]> => {
  if (!validateID(id)) throw new CustomErrors(
    errorNames.VE, StatusCodes.invalidId, errorMessages.invalid + requestedObjects.board 
    );
  const allTasks = await getAllTasksDB(id);
  return allTasks
};

/**
 * Validate params object, return the founded by id Task object
 * @async
 * @param {Record<string, string>} params The object with boardId and taskId
 * @throw - Throws Error if invalid boardId
 * @throw - Throws Error if invalid taskId
 * @returns - The Task object
 */

export const getOneTask = async (params: Record<string, string>): Promise<Task> => {
  const {boardId, taskId} = params;
  if (!validateID(boardId)) throw new CustomErrors(
    errorNames.VE, StatusCodes.invalidId, errorMessages.invalid + requestedObjects.board
    );
  if (!validateID(taskId)) throw new CustomErrors(
    errorNames.VE, StatusCodes.invalidId, errorMessages.invalid + requestedObjects.task
    );
  const oneTask = await getOneTaskDB(params);
  return oneTask;
};

/**
 * Validate id, create new Task object, return this Task 
 * @async
 * @param {string} id The boardId of Task object
 * @param {Task} data Data to create new Task
 * @throw - Throws Error if invalid id
 * @returns - The created Task object
 */

export const addTask = async (id: string, data: Task): Promise<Task> => {
  if (!validateID(id)) throw new Error('Invalid board id');
  const taskId = uuidv4();
  const newTask = { ...data, id: taskId, boardId: id };
  const addedTask = await addTaskDB(newTask);
  return addedTask;
};

/**
 * Valudate params object, return the updated Task object
 * @async
 * @param {Record<string, string>} params The object with boardId and taskId
 * @param {Task} data Data to update Task object
 * @throw - Throws Error if invalid boardId
 * @throw - Throws Error if invalid taskId
 * @throw - Throws Error if updated task is undefined
 * @returns - The updated Task object
 */


export const updateTask = async (params: Record<string, string>, data: Task): Promise<Task> => {
  const {boardId, taskId} = params;
  if (!validateID(boardId)) throw new CustomErrors(
    errorNames.VE, StatusCodes.invalidId, errorMessages.invalid + requestedObjects.board
    );
  if (!validateID(taskId)) throw new CustomErrors(
    errorNames.VE, StatusCodes.invalidId, errorMessages.invalid + requestedObjects.task
    );
  const updatedTask = await updateTaskDB(params, data);
  if(!updatedTask) throw new CustomErrors(
    errorNames.NFE, StatusCodes.notFound, requestedObjects.task + errorMessages.notExist
    );
  return updatedTask;
};

/**
 * Validate params object, return new array of Task objects
 * @async
 * @param {Record<string, string>} params The object with boardId and taskId
 * @throw - Throws Error if invalid boardId
 * @throw - Throws Error if invalid taskId
 * @returns - The new array of Task objects
 */

export const deleteTask = async (params: Record<string, string>): Promise<Task[]> => {
  const {boardId, taskId} = params;
  if (!validateID(boardId)) throw new CustomErrors(
    errorNames.VE, StatusCodes.invalidId, errorMessages.invalid + requestedObjects.board
    );
  if (!validateID(taskId)) throw new CustomErrors(
    errorNames.VE, StatusCodes.invalidId, errorMessages.invalid + requestedObjects.task
    );
  const newTasksArray = await deleteTaskDB(params);
  return newTasksArray;
};
