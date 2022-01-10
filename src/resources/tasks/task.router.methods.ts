/**
 * @module task_router_methods
 */
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from '../../common/constants';
import { successResponseHandler } from '../../handlers/response.handlers';
import {
  getAllTasks,
  getOneTask,
  addTask,
  updateTask,
  deleteTask,
} from './tasks.service';

/**
 * Function implement GET method of taskRouter (get all tasks)
 * @async
 * @param {Request} req - Is an object that include request from user
 * @param {Response} res - Is an object that include response of server
 * @param {NextFunction} next - Is a callback that is called to call Error Handler
 * @returns - Undefined
 */

export const taskRouterGetAll = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { boardId } = req.params;
    const tasks = await getAllTasks(boardId);
    successResponseHandler(res, req, tasks, StatusCodes.successCode);
  } catch (err) {
    next(err);
  }
};

/**
 * Function implement GET method of taskRouter (get one task)
 * @async
 * @param {Request} req - Is an object that include request from user
 * @param {Response} res - Is an object that include response of server
 * @param {NextFunction} next - Is a callback that is called to call Error Handler
 * @returns - Undefined
 */

export const taskRouterGetOne = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { taskId } = req.params;
    const task = await getOneTask(taskId);
    successResponseHandler(res, req, task, StatusCodes.successCode);
  } catch (err) {
    next(err);
  }
};

/**
 * Function implement POST method of taskRouter
 * @async
 * @param {Request} req - Is an object that include request from user
 * @param {Response} res - Is an object that include response of server
 * @param {NextFunction} next - Is a callback that is called to call Error Handler
 * @returns - Undefined
 */

export const taskRouterPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { body } = req;
    const { boardId } = req.params;
    const task = await addTask(boardId, body);
    successResponseHandler(res, req, task, StatusCodes.successCreate);
  } catch (err) {
    next(err);
  }
};

/**
 * Function implement PUT method of taskRouter
 * @async
 * @param {Request} req - Is an object that include request from user
 * @param {Response} res - Is an object that include response of server
 * @param {NextFunction} next - Is a callback that is called to call Error Handler
 * @returns - Undefined
 */

export const taskRouterPut = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { params, body } = req;
    const task = await updateTask(params, body);
    successResponseHandler(res, req, task, StatusCodes.successCode);
  } catch (err) {
    next(err);
  }
};
/**
 * Function implement DELETE method of taskRouter
 * @async
 * @param {Request} req - Is an object that include request from user
 * @param {Response} res - Is an object that include response of server
 * @param {NextFunction} next - Is a callback that is called to call Error Handler
 * @returns - Undefined
 */

export const taskRouterDelete = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { params } = req;
    const task = await deleteTask(params);
    successResponseHandler(res, req, task, StatusCodes.successDelete);
  } catch (err) {
    next(err);
  }
};
