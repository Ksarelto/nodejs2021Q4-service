/**
 * @module users_router_methods
 */

import { Context } from 'koa';
import { StatusCodes } from '../../common/constants';
import { User } from '../../common/types';
import { toResponse, successResponse, errorResponse } from '../../common/utils';
import { getAll, getOne, addUser, updateUser, deleteUser} from './user.service';

/**
 * Function implement GET method of userRouter(get all users)
 * @async
 * @param {Context} ctx - Context object
 * @returns - Undefined
 */

export const userRouterGetAll = async (ctx: Context): Promise<void> => {
  try {
    const users = await getAll();
    const response = users.map((user: User) => toResponse(user));
    if (response) {
      successResponse(ctx, response, StatusCodes.successCode);
    }
  } catch (err: unknown) {
    errorResponse(ctx, err);
  }
}

/**
 * Function implement GET method of userRouter (get one User)
 * @async
 * @param {Context} ctx - Context object
 * @returns - Undefined
 */

export const userRouterGetOne = async (ctx: Context): Promise<void> => {
  try {
    const {params} = ctx;
    const id = params.userId;
    const user = await getOne(id);
    successResponse(ctx, toResponse(user), StatusCodes.successCode);
  } catch (err) {
    errorResponse(ctx, err);
  }
}

/**
 * Function implement POST method of userRouter
 * @async
 * @param {Context} ctx - Context object
 * @returns - Undefined
 */

export const userRouterPost = async (ctx: Context): Promise<void> => {
  try {
    const { body } = ctx.request;
    const response = await addUser(body);
    successResponse(ctx, toResponse(response), StatusCodes.successCreate);
  } catch (err) {
    errorResponse(ctx, err);
  }
}

/**
 * Function implement PUT method of userRouter
 * @async
 * @param {Context} ctx - Context object
 * @returns - Undefined
 */

export const userRouterPut = async (ctx: Context): Promise<void> => {
  try {
    const {params} = ctx;
    const id = params.userId;
    const { body } = ctx.request;
    const response = await updateUser(id, body);
    successResponse(ctx, toResponse(response), StatusCodes.successCode);
  } catch (err) {
    errorResponse(ctx, err);
  }
}

/**
 * Function implement DELETE method of userRouter
 * @async
 * @param {Context} ctx - Context object
 * @returns - Undefined
 */

export const userRouterDelete = async (ctx: Context): Promise<void> => {
  try {
    const {params} = ctx;
    const id = params.userId;
    await deleteUser(id);
    successResponse(ctx, null, StatusCodes.successDelete);
  } catch (err) {
    errorResponse(ctx, err);
  }
}