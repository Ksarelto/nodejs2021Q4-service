/**
 * @module boards_service
 */

import { v4 as uuidv4 } from 'uuid';
import { Boards } from '../../common/types';
import { validateID } from '../../common/utils';
import { getAllBoardsDB, getOneBoardDB, addBoardDB, updateBoardDB, deleteBoardDB} from './boards.memory';

/**
 * This function return the array of Boards objects
 * @async
 * @returns The array of Boards objects
 */

export const getAllBoards = () => getAllBoardsDB();

/**
 * This function validate the id, pass the id to getOneBoardDB func and return The Board object
 * @async
 * @param id The id of Board object
 * @throw Throws Error if invalid id
 * @returns The Board object
 */

export const getOneBoard = async (id: string) => {
  if (!validateID(id)) throw new Error('Invalid id');
  const board = await getOneBoardDB(id);
  return board;
};

/**
 * This function generate id, create new Board object, pass him to addBoardDB, return added Board object
 * @async
 * @param data The data for new Board object
 * @returns The Board object
 */

export const addBoard = async (data: Boards) => {
  const id = uuidv4();
  const newBoard = { ...data, id };
  const addedBoard = await addBoardDB(newBoard);
  return addedBoard;
};

/**
 * This function validate id, padd id and data to updateBoard func, return updated Board object
 * @async
 * @param id The id of Board object
 * @param data Data to update Board
 * @throw Throws Error if invalid id
 * @returns The updated Board object
 */

export const updateBoard = async (id: string, data: Boards) => {
  if (!validateID(id)) throw new Error('Invalid id');
  const updatedBoard = await updateBoardDB(id, data);
  return updatedBoard;
};

/**
 * This function validate the id, pass id to deletedBoardDB func, return new array of Boards objects
 * @async
 * @param id The id of Board object
 * @throw Throws Error if invalid id
 * @returns The new array of Boards objects
 */

export const deleteBoard = async (id: string) => {
  if (!validateID(id)) throw new Error('Invalid id');
  const boardsArray = await deleteBoardDB(id);
  return boardsArray;
};


