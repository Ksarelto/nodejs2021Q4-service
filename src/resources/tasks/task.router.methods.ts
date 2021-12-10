/**
 * @module task_router_methods
 */
import { Context } from 'koa';
import { StatusCodes } from '../../common/constants';
import { successResponse, errorResponse } from '../../common/utils';
import { getAllTasks, getOneTask, addTask, updateTask, deleteTask} from './tasks.service';

/**
 * Function implement GET method of taskRouter
 * @async
 * @param ctx - Router context
 * @returns Undefined
 */

export const taskRouterGetAll = async (ctx: Context) => {
  try {
    const params = ctx.params.boardId;
    const tasks = await getAllTasks(params);
    successResponse(ctx, tasks, StatusCodes.successCode);
  } catch (err) {
    errorResponse(ctx, err, StatusCodes.internalError);
  }
}

/**
 * Function implement GET method of taskRouter
 * @async
 * @param ctx - Router context
 * @returns Undefined
 */

export const taskRouterGetOne = async (ctx: Context) => {
  try {
    const parameters = ctx.params;
    const task = await getOneTask(parameters);
    successResponse(ctx, task, StatusCodes.successCode);
  } catch (err) {
    errorResponse(ctx, err, StatusCodes.notFound);
  }
}

/**
 * Function implement POST method of taskRouter
 * @async
 * @param ctx - Router context
 * @returns Undefined
 */

export const taskRouterPost = async (ctx: Context) => {
  try {
    const { body } = ctx.request;
    const id = ctx.params.boardId;
    const task = await addTask(id, body);
    successResponse(ctx, task, StatusCodes.successCreate);
  } catch (err) {
    errorResponse(ctx, err, StatusCodes.internalError);
  }
}

/**
 * Function implement PUT method of taskRouter
 * @async
 * @param ctx - Router context
 * @returns Undefined
 */

export const taskRouterPut = async (ctx: Context) => {
  try {
    const { params } = ctx;
    const { body } = ctx.request;
    const task = await updateTask(params, body);
    successResponse(ctx, task, StatusCodes.successCode);
  } catch (err) {
    errorResponse(ctx, err, StatusCodes.internalError);
  }
}
/**
 * Function implement DELETE method of taskRouter
 * @async
 * @param ctx - Router context
 * @returns Undefined
 */

export const taskRouterDelete = async (ctx: Context) => {
  try {
    const { params } = ctx;
    const task = await deleteTask(params);
    successResponse(ctx, task, StatusCodes.successDelete);
  } catch (err) {
    errorResponse(ctx, err, StatusCodes.internalError);
  }
}