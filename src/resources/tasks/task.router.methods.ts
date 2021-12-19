/**
 * @module task_router_methods
 */
import { Context } from 'koa';
import { StatusCodes } from '../../common/constants';
import { successResponse, errorResponse } from '../../common/utils';
import { getAllTasks, getOneTask, addTask, updateTask, deleteTask} from './tasks.service';

/**
 * Function implement GET method of taskRouter (get all tasks)
 * @async
 * @param {Context} ctx - Router context
 * @returns - Undefined
 */

export const taskRouterGetAll = async (ctx: Context): Promise<void> => {
  try {
    const {params} = ctx;
    const id = params.boardId;
    const tasks = await getAllTasks(id);
    successResponse(ctx, tasks, StatusCodes.successCode);
  } catch (err) {
    errorResponse(ctx, err, StatusCodes.internalError);
  }
}

/**
 * Function implement GET method of taskRouter (get one task)
 * @async
 * @param {Context} ctx - Router context
 * @returns - Undefined
 */

export const taskRouterGetOne = async (ctx: Context): Promise<void> => {
  try {
    const {params} = ctx;
    const task = await getOneTask(params);
    successResponse(ctx, task, StatusCodes.successCode);
  } catch (err) {
    errorResponse(ctx, err, StatusCodes.notFound);
  }
}

/**
 * Function implement POST method of taskRouter
 * @async
 * @param {Context} ctx - Router context
 * @returns - Undefined
 */

export const taskRouterPost = async (ctx: Context): Promise<void> => {
  try {
    const { body } = ctx.request;
    const {params} = ctx;
    const id = params.boardId;
    const task = await addTask(id, body);
    successResponse(ctx, task, StatusCodes.successCreate);
  } catch (err) {
    errorResponse(ctx, err, StatusCodes.internalError);
  }
}

/**
 * Function implement PUT method of taskRouter
 * @async
 * @param {Context} ctx - Router context
 * @returns - Undefined
 */

export const taskRouterPut = async (ctx: Context): Promise<void> => {
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
 * @param {Context} ctx - Router context
 * @returns - Undefined
 */

export const taskRouterDelete = async (ctx: Context): Promise<void> => {
  try {
    const { params } = ctx;
    const task = await deleteTask(params);
    successResponse(ctx, task, StatusCodes.successDelete);
  } catch (err) {
    errorResponse(ctx, err, StatusCodes.internalError);
  }
}