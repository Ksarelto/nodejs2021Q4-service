/**
 * @module task_memory_methods
 */
import { Tasks } from "../../common/types";
import {db} from '../../../db/db';
import { checkExistence } from '../../common/utils';

/**
 * This function get Boards and Tasks from database, find Tasks with the same boardId, return them
 * @async
 * @param id - The boardId of Task object
 * @returns The array of Tasks objects with same boardId
 */

export const getAllTasksDB = async (id: string) => {
  const { boards, tasks } = await db;
  checkExistence(boards, id, 'Board');
  const choosedTasks = tasks.filter((task: Tasks) => task.boardId === id);
  return choosedTasks;
};

/**
 * This function get Boards and Tasks from database, find Task object with the taskId, return it
 * @async
 * @param params - The object with boardId and taskId
 * @returns The searched Task object
 */

export const getOneTaskDB = async (params: Record<string, string>) => {
  const { boards, tasks } = await db;
  const {boardId, taskId} = params;
  checkExistence(boards, boardId, 'Board');
  const foundedTask = checkExistence(tasks, taskId, 'Task');
  return foundedTask;
};

/**
 * This function add to database new Task object and return it
 * @async
 * @param id - The boardId of Task object
 * @param data - The new Task object 
 * @returns The new Task object
 */

export const addTaskDB = async ( data: Tasks) => {
  await db.tasks.push(data);
  return data;
};

/**
 * This function get boards and tasks from database, find and update searched Task object, return updated object 
 * @async
 * @param params - The object with boardId and taskId
 * @param data - The data to update Task object
 * @returns The updated Task object
 */

export const updateTaskDB = async (params: Record<string, string>, data: Tasks) => {
  let updatedTask;
  const { tasks, boards } = await db;
  const {boardId, taskId} = params;
  checkExistence(boards, boardId, 'Board');
  checkExistence(tasks, taskId, 'Task');
  const updatedTasks = tasks.map((task: Tasks) => {
    if (task.id === taskId) {
      updatedTask = { ...data, id: task.id };
      return updatedTask;
    }
    return task;
  });

  db.tasks = updatedTasks;
  return updatedTask;
};

/**
 * This function find by id in database and delete Task object, return new array of Tasks
 * @async
 * @param params - The object with boardId and taskId
 * @returns New array of Tasks objects
 */

export const deleteTaskDB = async (params: Record<string, string>) => {
  const { tasks, boards } = await db;
  const {boardId, taskId} = params;
  checkExistence(boards, boardId, 'Board');
  checkExistence(tasks, taskId, 'Task');
  const newTasksArray = tasks.filter((task: Tasks) => task.id !== taskId);
  db.tasks = newTasksArray;
  return newTasksArray;
};
