/**
 * @module boards_memory_methods
 */

import { db } from '../../../db/db';
import { Boards, Tasks } from '../../common/types';
import { checkExistence } from '../../common/utils';

/**
 * This function get all boards from database and return them
 * @returns The array of boards objects
 */

export const getAllBoardsDB = async (): Promise<Boards[]> => {
  const allBoards = await db.boards;
  return allBoards;
};

/**
 * This function find the board by id and return it
 * @param id - Id of board object
 * @returns The searched board object
 */

export const getOneBoardDB = async (id: string): Promise<Boards> => {
  const { boards } = await db;
  const foundedBoard = checkExistence(boards, id, 'Board');
  return foundedBoard as Boards;
};

/**
 * This function add new Board object to database and return the object
 * @param data - The Board object
 * @returns The Board object
 */

export const addBoardDB = async (data: Boards): Promise<Boards> => {
  await db.boards.push(data);
  return data;
};

/**
 * This function find Board object by id and update it with data parametr and return the updated Board object 
 * @param id - The Board id
 * @param data - The Board object
 * @returns The updated Board object
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
 * This function find board by id, delete it from database, return the updated array of Boards
 * @param id - The Board id
 * @returns The Boards array without deleted Board
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
