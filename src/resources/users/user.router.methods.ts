/**
 * @module users_router_methods
 */

import { Context } from 'koa';
import { StatusCodes } from '../../common/constants';
import { User } from '../../common/types';
import { toResponse } from '../../common/utils';
import { successResponseHandler } from '../../handlers/response.handlers';
import { getAll, getOne, addUser, updateUser, deleteUser} from './user.service';

/**
 * Function implement GET method of userRouter(get all users)
 * @async
 * @param {Context} ctx - Context object
 * @returns - Undefined
 */

export const userRouterGetAll = async (ctx: Context): Promise<void> => {
  const users = await getAll();
  const response = users.map((user: User) => toResponse(user));
  if (response) {
    successResponseHandler(ctx, response, StatusCodes.successCode);
  }
}

/**
 * Function implement GET method of userRouter (get one User)
 * @async
 * @param {Context} ctx - Context object
 * @returns - Undefined
 */

export const userRouterGetOne = async (ctx: Context): Promise<void> => {
  const {params} = ctx;
  const id = params.userId;
  const user = await getOne(id);
  successResponseHandler(ctx, toResponse(user), StatusCodes.successCode);
}

/**
 * Function implement POST method of userRouter
 * @async
 * @param {Context} ctx - Context object
 * @returns - Undefined
 */

export const userRouterPost = async (ctx: Context): Promise<void> => {
  const { body } = ctx.request;
  const response = await addUser(body);
  successResponseHandler(ctx, toResponse(response), StatusCodes.successCreate);
}

/**
 * Function implement PUT method of userRouter
 * @async
 * @param {Context} ctx - Context object
 * @returns - Undefined
 */

export const userRouterPut = async (ctx: Context): Promise<void> => {
  const {params} = ctx;
  const id = params.userId;
  const { body } = ctx.request;
  const response = await updateUser(id, body);
  successResponseHandler(ctx, toResponse(response), StatusCodes.successCode);
}

/**
 * Function implement DELETE method of userRouter
 * @async
 * @param {Context} ctx - Context object
 * @returns - Undefined
 */

export const userRouterDelete = async (ctx: Context): Promise<void> => {
  const {params} = ctx;
  const id = params.userId;
  await deleteUser(id);
  successResponseHandler(ctx, null, StatusCodes.successDelete);
}