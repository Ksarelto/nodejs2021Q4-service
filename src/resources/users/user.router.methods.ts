/**
 * @module users_router_methods
 */

import { Context } from 'koa';
import { StatusCodes } from '../../common/constants';
import { User } from '../../common/types';
import { toResponse, successResponse, errorResponse } from '../../common/utils';
import { getAll, getOne, addUser, updateUser, deleteUser} from './user.service';

/**
 * Midlware to get HTTP method
 * @param ctx - Context object
 * @returns - Undefined
 */

export const userRouterGetAllRequest = async (ctx: Context) => {
  try {
    const users = await getAll();
    const response = users.map((user: User) => toResponse(user));
    if (response) {
      successResponse(ctx, response, StatusCodes.successCode);
    }
  } catch (err: unknown) {
    errorResponse(ctx, err, StatusCodes.internalError);
  }
}

/**
 * Midllware to get HTTP method
 * @param ctx - Context object
 * @returns - Undefined
 */

export const userRouterGetOneRequest = async (ctx: Context) => {
  try {
    const param = ctx.params.userId;
    const user = await getOne(param);
    successResponse(ctx, toResponse(user), StatusCodes.successCode);
  } catch (err) {
    errorResponse(ctx, err, StatusCodes.internalError);
  }
}

/**
 * Midllware to post HTTP method
 * @param ctx - Context object
 * @returns - Undefined
 */

export const userRouterPostRequest = async (ctx: Context) => {
  try {
    const { body } = ctx.request;
    const response = await addUser(body);
    successResponse(ctx, toResponse(response), StatusCodes.successCreate);
  } catch (err) {
    errorResponse(ctx, err, StatusCodes.internalError);
  }
}

/**
 * Midllware to put HTTP method
 * @param ctx - Context object
 * @returns - Undefined
 */

export const userRouterPutRequest = async (ctx: Context) => {
  try {
    const id = ctx.params.userId;
    const { body } = ctx.request;
    const response = await updateUser(id, body);
    successResponse(ctx, toResponse(response), StatusCodes.successCode);
  } catch (err) {
    errorResponse(ctx, err, StatusCodes.internalError);
  }
}

/**
 * Midllware to delete HTTP method
 * @param ctx - Context object
 * @returns - Undefined
 */

export const userRouterDeleteRequest = async (ctx: Context) => {
  try {
    const id = ctx.params.userId;
    await deleteUser(id);
    successResponse(ctx, null, StatusCodes.successDelete);
  } catch (err) {
    errorResponse(ctx, err, StatusCodes.internalError);
  }
}