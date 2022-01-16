/**
 * @module boards_router_methods
 */

import { Response, Request, NextFunction } from 'express';
import { StatusCodes } from '../../common/constants';
import { successResponseHandler } from '../../handlers/response.handlers';
import {
  getAllBoards,
  getOneBoard,
  addBoard,
  updateBoard,
  deleteBoard,
} from './boards.service';

/**
 * Function implement GET method of boardRouter (get all boards)
 * @async
 * @param {Request} req - Is an object that include request from user
 * @param {Response} res - Is an object that include response of server
 * @param {NextFunction} next - Is a callback that is called to call Error Handler
 * @returns - undefined
 */

export const boardRouterGetAll = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const boards = await getAllBoards();
    successResponseHandler(res, req, boards, StatusCodes.successCode);
  } catch (err) {
    next(err);
  }
};

/**
 * Function implement GET method of boardRouter (get one board)
 * @async
 * @param {Request} req - Is an object that include request from user
 * @param {Response} res - Is an object that include response of server
 * @param {NextFunction} next - Is a callback that is called to call Error Handler
 * @returns - undefined
 */

export const boardRouterGetOne = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { boardId } = req.params;
    const board = await getOneBoard(boardId as string);
    successResponseHandler(res, req, board, StatusCodes.successCode);
  } catch (err) {
    next(err);
  }
};

/**
 * Function implement POST method of boardRouter (add new board to database)
 * @async
 * @param {Request} req - Is an object that include request from user
 * @param {Response} res - Is an object that include response of server
 * @param {NextFunction} next - Is a callback that is called to call Error Handler
 * @returns - undefined
 */

export const boardRouterPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { body } = req;
    const board = await addBoard(body);
    successResponseHandler(res, req, board, StatusCodes.successCreate);
  } catch (err) {
    next(err);
  }
};

/**
 * Function implement PUT method of boardRouter (update existed board)
 * @async
 * @param {Request} req - Is an object that include request from user
 * @param {Response} res - Is an object that include response of server
 * @param {NextFunction} next - Is a callback that is called to call Error Handler
 * @returns - undefined
 */

export const boardRouterPut = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { boardId } = req.params;
    const { body } = req;
    const board = await updateBoard(boardId as string, body);
    successResponseHandler(res, req, board, StatusCodes.successCode);
  } catch (err) {
    next(err);
  }
};

/**
 * Function implement DELETE method of boardRouter (delete one board)
 * @async
 * @param {Request} req - Is an object that include request from user
 * @param {Response} res - Is an object that include response of server
 * @param {NextFunction} next - Is a callback that is called to call Error Handler
 * @returns - undefined
 */

export const boardRouterDelete = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { boardId } = req.params;
    const board = await deleteBoard(boardId as string);
    successResponseHandler(res, req, board, StatusCodes.successDelete);
  } catch (err) {
    next(err);
  }
};
