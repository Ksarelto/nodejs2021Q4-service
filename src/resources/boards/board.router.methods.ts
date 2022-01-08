/**
 * @module boards_router_methods
 */

import { Context } from 'koa';
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
 * @param {Context} ctx - Router context
 * @returns - undefined
 */

export const boardRouterGetAll = async (ctx: Context): Promise<void> => {
  const boards = await getAllBoards();
  successResponseHandler(ctx, boards, StatusCodes.successCode);
};

/**
 * Function implement GET method of boardRouter (get one board)
 * @async
 * @param {Context} ctx - Router context
 * @returns - undefined
 */

export const boardRouterGetOne = async (ctx: Context): Promise<void> => {
  const { params } = ctx;
  const param = params.boardId;
  const board = await getOneBoard(param);
  successResponseHandler(ctx, board, StatusCodes.successCode);
};

/**
 * Function implement POST method of boardRouter (add new board to database)
 * @async
 * @param {Context} ctx - Router context
 * @returns - undefined
 */

export const boardRouterPost = async (ctx: Context): Promise<void> => {
  const { body } = ctx.request;
  const board = await addBoard(body);
  successResponseHandler(ctx, board, StatusCodes.successCreate);
};

/**
 * Function implement PUT method of boardRouter (update existed board)
 * @async
 * @param {Context} ctx - Router context
 * @returns - undefined
 */

export const boardRouterPut = async (ctx: Context): Promise<void> => {
  const { params } = ctx;
  const id = params.boardId;
  const { body } = ctx.request;
  const board = await updateBoard(id, body);
  successResponseHandler(ctx, board, StatusCodes.successCode);
};

/**
 * Function implement DELETE method of boardRouter (delete one board)
 * @async
 * @param {Context} ctx - Router context
 * @returns - undefined
 */

export const boardRouterDelete = async (ctx: Context): Promise<void> => {
  const { params } = ctx;
  const id = params.boardId;
  const board = await deleteBoard(id);
  successResponseHandler(ctx, board, StatusCodes.successDelete);
};
