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
 * @param ctx - Router context
 * @returns Undefined
 */

export const boardRouterGetAll = async (ctx: Context) => {
  try {
    const boards = await getAllBoards();
    successResponse(ctx, boards, StatusCodes.successCode);
  } catch (err) {
    errorResponse(ctx, err, StatusCodes.internalError);
  }
}

/**
 * Function implement GET method of boardRouter (get one board)
 * @async
 * @param ctx - Router context
 * @returns Undefined
 */

export const boardRouterGetOne = async (ctx: Context) => {
  try {
    const param = ctx.params.boardId;
    const board = await getOneBoard(param);
    successResponse(ctx, board, StatusCodes.successCode);
  } catch (err) {
    errorResponse(ctx, err, StatusCodes.notFound);
  }
}

/**
 * Function implement POST method of boardRouter
 * @async
 * @param ctx - Router context
 * @returns Undefined
 */

export const boardRouterPost = async (ctx: Context) => {
  try {
    const { body } = ctx.request;
    const board = await addBoard(body);
    successResponse(ctx, board, StatusCodes.successCreate);
  } catch (err) {
    errorResponse(ctx, err, StatusCodes.internalError);
  }
}

/**
 * Function implement PUT method of boardRouter
 * @async
 * @param ctx - Router context
 * @returns Undefined
 */

export const boardRouterPut = async (ctx: Context) => {
  try {
    const id = ctx.params.boardId;
    const { body } = ctx.request;
    const board = await updateBoard(id, body);
    successResponse(ctx, board, StatusCodes.successCode);
  } catch (err) {
    errorResponse(ctx, err, StatusCodes.internalError);
  }
}

/**
 * Function implement DELETE method of boardRouter
 * @async
 * @param ctx - Router context
 * @returns Undefined
 */

export const boardRouterDelete = async (ctx: Context) => {
  try {
    const id = ctx.params.boardId;
    const board = await deleteBoard(id);
    successResponse(ctx, board, StatusCodes.successDelete);
  } catch (err) {
    errorResponse(ctx, err, StatusCodes.internalError);
  }
}