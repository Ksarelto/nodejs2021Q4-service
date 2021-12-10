/**
 * @module task_service
 */
import { v4 as uuidv4 } from 'uuid';
import { Tasks } from '../../common/types';
import { validateID } from '../../common/utils';
import { getAllTasksDB, getOneTaskDB, addTaskDB, updateTaskDB, deleteTaskDB} from './tasks.memory';

/**
 * This function validate id and return array of Tasks objects
 * @async
 * @param id The boardId of Task object
 * @returns The array of Task objects
 */

export const getAllTasks = async (id: string) => {
  if (!validateID(id)) throw new Error('Invalid board id');
  const allTasks = await getAllTasksDB(id);
  return allTasks
};

/**
 * This function validate params object, return the founded by id Task object
 * @async
 * @param params The object with boardId and taskId
 * @returns The Task object
 */

export const getOneTask = async (params: Record<string, string>) => {
  if (!validateID(params.boardId)) throw new Error('Invalid board id');
  if (!validateID(params.taskId)) throw new Error('Invalid task id');
  const oneTask = await getOneTaskDB(params);
  return oneTask;
};

/**
 * This function validate id, create new Task object, return this Task 
 * @async
 * @param id The boardId of Task object
 * @param data Data to create new Task
 * @returns Created Task object
 */

export const addTask = async (id: string, data: Tasks) => {
  if (!validateID(id)) throw new Error('Invalid board id');
  const taskId = uuidv4();
  const newTask = { ...data, id: taskId, boardId: id };
  const addedTask = await addTaskDB(id, newTask);
  return addedTask;
};

/**
 * This function valudate params object, return the updated Task object
 * @async
 * @param params The object with boardId and taskId
 * @param data Data to update Task object
 * @returns The updated Task object
 */


export const updateTask = async (params: Record<string, string>, data: Tasks) => {
  if (!validateID(params.boardId)) throw new Error('Invalid board id');
  if (!validateID(params.taskId)) throw new Error('Invalid task id');
  const updatedTask = await updateTaskDB(params, data);
  return updatedTask;
};

/**
 * This function validate params object, return new array of Task objects
 * @async
 * @param params The object with boardId and taskId
 * @returns The new array of Task objects
 */

export const deleteTask = async (params: Record<string, string>) => {
  if (!validateID(params.boardId)) throw new Error('Invalid board id');
  if (!validateID(params.taskId)) throw new Error('Invalid task id');
  const newTasksArray = await deleteTaskDB(params);
  return newTasksArray;
};
