/**
 * @module boards_service
 */

import { DeleteResult } from 'typeorm';
import { StatusCodes } from '../../common/constants';
import {
  CustomErrors,
  errorMessages,
  errorNames,
  requestedObjects,
} from '../../common/errors.object';
import { Board } from '../../common/types';
import { validateID } from '../../common/utils';
import { EntBoard } from '../../typeorm/entities/board.entity';
import {
  getAllBoardsDB,
  getOneBoardDB,
  addBoardDB,
  updateBoardDB,
  deleteBoardDB,
} from './boards.memory';

/**
 * Return the array of Boards objects
 * @async
 * @returns - The array of Boards objects
 */

export const getAllBoards = async () => getAllBoardsDB();

/**
 * Validate the id, pass the id to getOneBoardDB func and return The Board object
 * @async
 * @param {string} id The id of Board object
 * @throw - Throws Error if invalid id
 * @returns - The EntBoard object
 */

export const getOneBoard = async (id: string): Promise<EntBoard> => {
  if (!validateID(id))
    throw new CustomErrors(
      errorNames.VE,
      StatusCodes.invalidId,
      errorMessages.invalid + requestedObjects.board
    );
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
  const addedBoard = await addBoardDB(data);
  return addedBoard;
};

/**
 * Validate id, padd id and data to updateBoard func, return updated Board object
 * @async
 * @param {string} id The id of Board object
 * @param {Board} data Data to update Board
 * @throw - Throws Error if invalid id
 * @returns - The updated Board object
 */

export const updateBoard = async (id: string, data: Board): Promise<Board> => {
  if (!validateID(id))
    throw new CustomErrors(
      errorNames.VE,
      StatusCodes.invalidId,
      errorMessages.invalid + requestedObjects.board
    );
  const updatedBoard = await updateBoardDB(id, data);
  return updatedBoard;
};

/**
 * Validate the id, pass id to deletedBoardDB func, return new array of Boards objects
 * @async
 * @param {string} id The id of Board object
 * @throw - Throws Error if invalid id
 * @returns - The Deleted result
 */

export const deleteBoard = async (id: string): Promise<DeleteResult> => {
  if (!validateID(id))
    throw new CustomErrors(
      errorNames.VE,
      StatusCodes.invalidId,
      errorMessages.invalid + requestedObjects.board
    );
  const boardsArray = await deleteBoardDB(id);
  return boardsArray;
};
