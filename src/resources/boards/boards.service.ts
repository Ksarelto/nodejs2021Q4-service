/**
 * @module boards_service
 */

import { v4 as uuidv4 } from 'uuid';
import { Board } from '../../common/types';
import { validateID } from '../../common/utils';
import { getAllBoardsDB, getOneBoardDB, addBoardDB, updateBoardDB, deleteBoardDB} from './boards.memory';

/**
 * Return the array of Boards objects
 * @async
 * @returns - The array of Boards objects
 */

export const getAllBoards = () => getAllBoardsDB();

/**
 * Validate the id, pass the id to getOneBoardDB func and return The Board object
 * @async
 * @param {string} id The id of Board object
 * @throw - Throws Error if invalid id
 * @returns - The Board object
 */

export const getOneBoard = async (id: string): Promise<Board> => {
  if (!validateID(id)) throw new Error('Invalid id');
  const board = await getOneBoardDB(id);
  return board;
};

/**
 * Generate id, create new Board object, pass him to addBoardDB, return added Board object
 * @async
 * @param {Board} data The data for new Board object
 * @returns - The created Board object
 */

export const addBoard = async (data: Board): Promise<Board> => {
  const id = uuidv4();
  const newBoard = { ...data, id };
  const addedBoard = await addBoardDB(newBoard);
  return addedBoard;
};

/**
 * Validate id, padd id and data to updateBoard func, return updated Board object
 * @async
 * @param {string} id The id of Board object
 * @param {Board} data Data to update Board
 * @throw - Throws Error if invalid id
 * @throw - Throws Error if board is undefined
 * @returns - The updated Board object
 */

export const updateBoard = async (id: string, data: Board): Promise<Board> => {
  if (!validateID(id)) throw new Error('Invalid id');
  const updatedBoard = await updateBoardDB(id, data);
  if(!updatedBoard) throw new Error('The board is undefined');
  return updatedBoard;
};

/**
 * Validate the id, pass id to deletedBoardDB func, return new array of Boards objects
 * @async
 * @param {string} id The id of Board object
 * @throw - Throws Error if invalid id
 * @returns - The new array of Board`s objects
 */

export const deleteBoard = async (id: string): Promise<Board[]> => {
  if (!validateID(id)) throw new Error('Invalid id');
  const boardsArray = await deleteBoardDB(id);
  return boardsArray;
};


