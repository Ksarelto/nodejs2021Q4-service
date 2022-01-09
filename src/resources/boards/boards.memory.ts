/**
 * @module boards_memory_methods
 */

import { db } from '../../../db/db';
import { Board, Task } from '../../common/types';
import { checkExistence } from '../../common/utils';

/**
 * Get all Boards objects from database and return them
 * @async
 * @returns - The array of Boards objects
 */

export const getAllBoardsDB = async (): Promise<Board[]> => {
  const allBoards = await db.boards;
  return allBoards;
};

/**
 * Find the Board object by id in database and return it
 * @async
 * @param {string} id - Id of Board object
 * @returns - The found Board object
 */

export const getOneBoardDB = async (id: string): Promise<Board> => {
  const { boards } = await db;
  const foundedBoard = checkExistence(boards, id, 'Board');
  return foundedBoard as Board;
};

/**
 * Add new Board object to database and return the object
 * @async
 * @param {Board} data - The Board object
 * @returns The Board object
 */

export const addBoardDB = async (data: Board): Promise<Board> => {
  await db.boards.push(data);
  return data;
};

/**
 * Find Board object by id and update it with data parametr and return the updated Board object
 * @async
 * @param {string} id - The Board object id
 * @param {Board} data - Params to update Board object
 * @returns - The updated Board object or undefined
 */

export const updateBoardDB = async (
  id: string,
  data: Board
): Promise<Board | undefined> => {
  let updatedBoard;
  const { boards } = await db;
  checkExistence(boards, id, 'Board');
  const updatedBoards = boards.map((board: Board) => {
    if (board.id === id) {
      updatedBoard = { ...data, id: board.id };
      return updatedBoard;
    }
    return board;
  });

  db.boards = updatedBoards;
  return updatedBoard;
};

/**
 * Find Board object by id, delete it from database, delete all tasks with id===task.boardId,
 * return the updated array of Boards objects
 * @async
 * @param {string} id - The Board object id
 * @returns - The Boards objects array without deleted Board
 */

export const deleteBoardDB = async (id: string): Promise<Board[]> => {
  const { boards, tasks } = await db;
  checkExistence(boards, id, 'Board');
  const newBoardsArray = boards.filter((board: Board) => board.id !== id);
  const newTasksArray = tasks.filter((task: Task) => task.boardId !== id);
  db.boards = newBoardsArray;
  db.tasks = newTasksArray;
  return newBoardsArray;
};
