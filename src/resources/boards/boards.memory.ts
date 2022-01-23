/**
 * @module boards_memory_methods
 */

import { DeleteResult, getRepository } from 'typeorm';
import { Board } from '../../common/types';
import { EntBoard } from '../../typeorm/entities/board.entity';

/**
 * Get all Boards objects from database and return them
 * @async
 * @returns - The array of Boards objects
 */

export const getAllBoardsDB = async (): Promise<EntBoard[]> => {
  const allBoards = await getRepository(EntBoard).find();
  return allBoards;
};

/**
 * Find the Board object by id in database and return it
 * @async
 * @param {string} id - Id of Board object
 * @returns - The found Board object
 */

export const getOneBoardDB = async (id: string): Promise<EntBoard> => {
  const board = await getRepository(EntBoard).findOneOrFail(id);
  return board;
};

/**
 * Add new Board object to database and return the object
 * @async
 * @param {Board} data - The Board object
 * @returns The Board object
 */

export const addBoardDB = async (data: Board): Promise<Board> => {
  const savedBoard = await getRepository(EntBoard).save(data);
  return savedBoard;
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
): Promise<Board> => {
  await getRepository(EntBoard).findOneOrFail(id);
  const updatedBoard = await getRepository(EntBoard).save(data);
  return updatedBoard;
};

/**
 * Find Board object by id, delete it from database, delete all tasks with id===task.boardId,
 * return the updated array of Boards objects
 * @async
 * @param {string} id - The Board object id
 * @returns - The Boards objects array without deleted Board
 */

export const deleteBoardDB = async (id: string): Promise<DeleteResult> => {
  const deletedBoard = await getRepository(EntBoard).delete(id);
  return deletedBoard;
};
