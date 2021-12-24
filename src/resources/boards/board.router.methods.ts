/**
 * @module boards_router_methods
 */

import { Context } from 'koa';
import { StatusCodes } from '../../common/constants';
import { successResponse, errorResponse } from '../../common/utils';
import { getAllBoards, getOneBoard, addBoard, updateBoard, deleteBoard} from './boards.service';


/**
 * Function implement GET method of boardRouter (get all boards)
 * @async
 * @param {Context} ctx - Router context
 * @returns - undefined
 */

export const boardRouterGetAll = async (ctx: Context): Promise<void> => {
  try {
    const boards = await getAllBoards();
    successResponse(ctx, boards, StatusCodes.successCode);
  } catch (err) {
    errorResponse(ctx, err);
  }
}

/**
 * Function implement GET method of boardRouter (get one board)
 * @async
 * @param {Context} ctx - Router context
 * @returns - undefined
 */

export const boardRouterGetOne = async (ctx: Context): Promise<void> => {
  try {
    const {params} = ctx;
    const param = params.boardId;
    const board = await getOneBoard(param);
    successResponse(ctx, board, StatusCodes.successCode);
  } catch (err) {
    errorResponse(ctx, err);
  }
}

/**
 * Function implement POST method of boardRouter (add new board to database)
 * @async
 * @param {Context} ctx - Router context
 * @returns - undefined
 */

export const boardRouterPost = async (ctx: Context): Promise<void> => {
  try {
    const { body } = ctx.request;
    const board = await addBoard(body);
    successResponse(ctx, board, StatusCodes.successCreate);
  } catch (err) {
    errorResponse(ctx, err);
  }
}

/**
 * Function implement PUT method of boardRouter (update existed board)
 * @async
 * @param {Context} ctx - Router context
 * @returns - undefined
 */

export const boardRouterPut = async (ctx: Context): Promise<void> => {
  try {
    const {params} = ctx;
    const id = params.boardId;
    const { body } = ctx.request;
    const board = await updateBoard(id, body);
    successResponse(ctx, board, StatusCodes.successCode);
  } catch (err) {
    errorResponse(ctx, err);
  }
}

/**
 * Function implement DELETE method of boardRouter (delete one board)
 * @async
 * @param {Context} ctx - Router context
 * @returns - undefined
 */

export const boardRouterDelete = async (ctx: Context): Promise<void> => {
  try {
    const {params} = ctx;
    const id = params.boardId;
    const board = await deleteBoard(id);
    successResponse(ctx, board, StatusCodes.successDelete);
  } catch (err) {
    errorResponse(ctx, err);
  }
}