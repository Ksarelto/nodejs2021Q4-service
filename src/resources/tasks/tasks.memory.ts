/**
 * @module task_memory_methods
 */
import { Task } from '../../common/types';
import { db } from '../../../db/db';
import { checkExistence } from '../../common/utils';

/**
 * Get Boards and Tasks from database, find Tasks with the same boardId, return them
 * @async
 * @param {string} id - The boardId of Task object
 * @returns - The array of Tasks objects with same boardId
 */

export const getAllTasksDB = async (id: string): Promise<Task[]> => {
  const { boards, tasks } = await db;
  checkExistence(boards, id, 'Board');
  const choosedTasks = tasks.filter((task: Task) => task.boardId === id);
  return choosedTasks;
};

/**
 * Get Boards and Tasks from database, find Task object with the taskId, return it
 * @async
 * @param {Record<string,string>} params - The object with boardId and taskId
 * @returns - The searched Task object
 */

export const getOneTaskDB = async (
  params: Record<string, string>
): Promise<Task> => {
  const { boards, tasks } = await db;
  const { boardId, taskId } = params;
  checkExistence(boards, boardId, 'Board');
  const foundedTask = checkExistence(tasks, taskId, 'Task');
  return foundedTask as Task;
};

/**
 * This function add to database new Task object and return it
 * @async
 * @param {Task} data - The new Task object
 * @returns - The new Task object
 */

export const addTaskDB = async (data: Task) => {
  await db.tasks.push(data);
  return data;
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
): Promise<Task | undefined> => {
  let updatedTask;
  const { tasks, boards } = await db;
  const { boardId, taskId } = params;
  checkExistence(boards, boardId, 'Board');
  checkExistence(tasks, taskId, 'Task');
  const updatedTasks = tasks.map((task: Task) => {
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
 * Find by id in database and delete Task object, return new array of Tasks
 * @async
 * @param {Record<string, string>} params - The object with boardId and taskId
 * @returns - New array of Task`s objects
 */

export const deleteTaskDB = async (
  params: Record<string, string>
): Promise<Task[]> => {
  const { tasks, boards } = await db;
  const { boardId, taskId } = params;
  checkExistence(boards, boardId, 'Board');
  checkExistence(tasks, taskId, 'Task');
  const newTasksArray = tasks.filter((task: Task) => task.id !== taskId);
  db.tasks = newTasksArray;
  return newTasksArray;
};
