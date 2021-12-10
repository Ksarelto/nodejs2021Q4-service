/**
 * @module boards_memory_methods
 */

import { db } from '../../../db/db';
import { Boards, Tasks } from '../../common/types';
import { checkExistence } from '../../common/utils';

/**
 * This function get all Boards objects from database and return them
 * @async
 * @returns The array of Boards objects
 */

export const getAllBoardsDB = async (): Promise<Boards[]> => {
  const allBoards = await db.boards;
  return allBoards;
};

/**
 * This function find the Board object by id and return it
 * @async
 * @param id - Id of Board object
 * @returns The searched Board object
 */

export const getOneBoardDB = async (id: string): Promise<Boards> => {
  const { boards } = await db;
  const foundedBoard = checkExistence(boards, id, 'Board');
  return foundedBoard as Boards;
};

/**
 * This function add new Board object to database and return the object
 * @async
 * @param data - The Board object
 * @returns The Board object
 */

export const addBoardDB = async (data: Boards): Promise<Boards> => {
  await db.boards.push(data);
  return data;
};

/**
 * This function find Board object by id and update it with data parametr and return the updated Board object 
 * @async
 * @param id - The Board object id
 * @param data - Params to update Board object
 * @returns  Updated Board object
 */

export const updateBoardDB = async (id: string, data: Boards): Promise<Boards | undefined> => {
  let updatedBoard;
  const { boards } = await db;
  checkExistence(boards, id, 'Board');
  const updatedBoards = boards.map((board: Boards) => {
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
 * This function find Board object by id, delete it from database, return the updated array of Boards objects
 * @async
 * @param id - The Board object id
 * @returns The Boards objects array without deleted Board
 */

export const deleteBoardDB = async (id: string): Promise<Boards[]> => {
  const { boards, tasks } = await db;
  checkExistence(boards, id, 'Board');
  const newBoardsArray = boards.filter((board: Boards) => board.id !== id);
  const newTasksArray = tasks.filter((task: Tasks) => task.boardId !== id);
  db.boards = newBoardsArray;
  db.tasks = newTasksArray;
  return newBoardsArray;
};
