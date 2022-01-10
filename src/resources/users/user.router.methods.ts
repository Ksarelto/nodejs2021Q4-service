/**
 * @module users_router_methods
 */

import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from '../../common/constants';
import { User } from '../../common/types';
import { toResponse } from '../../common/utils';
import { successResponseHandler } from '../../handlers/response.handlers';
import {
  getAll,
  getOne,
  addUser,
  updateUser,
  deleteUser,
} from './user.service';

/**
 * Function implement GET method of userRouter(get all users)
 * @async
 * @param {Request} req - Is an object that include request from user
 * @param {Response} res - Is an object that include response of server
 * @param {NextFunction} next - Is a callback that is called to call Error Handler
 * @returns - Undefined
 */

export const userRouterGetAll = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await getAll();
    const response = users.map((user: User) => toResponse(user));
    if (response) {
      successResponseHandler(res, req, response, StatusCodes.successCode);
    }
  } catch (err) {
    next(err);
  }
};

/**
 * Function implement GET method of userRouter (get one User)
 * @async
 * @param {Request} req - Is an object that include request from user
 * @param {Response} res - Is an object that include response of server
 * @param {NextFunction} next - Is a callback that is called to call Error Handler
 * @returns - Undefined
 */

export const userRouterGetOne = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.params;
    const user = await getOne(userId);
    successResponseHandler(res, req, toResponse(user), StatusCodes.successCode);
  } catch (err) {
    next(err);
  }
};

/**
 * Function implement POST method of userRouter
 * @async
 * @param {Request} req - Is an object that include request from user
 * @param {Response} res - Is an object that include response of server
 * @param {NextFunction} next - Is a callback that is called to call Error Handler
 * @returns - Undefined
 */

export const userRouterPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { body } = req;
    const response = await addUser(body);
    successResponseHandler(
      res,
      req,
      toResponse(response),
      StatusCodes.successCreate
    );
  } catch (err) {
    next(err);
  }
};

/**
 * Function implement PUT method of userRouter
 * @async
 * @param {Request} req - Is an object that include request from user
 * @param {Response} res - Is an object that include response of server
 * @param {NextFunction} next - Is a callback that is called to call Error Handler
 * @returns - Undefined
 */

export const userRouterPut = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.params;
    const { body } = req;
    const response = await updateUser(userId, body);
    successResponseHandler(
      res,
      req,
      toResponse(response),
      StatusCodes.successCode
    );
  } catch (err) {
    next(err);
  }
};

/**
 * Function implement DELETE method of userRouter
 * @async
 * @param {Request} req - Is an object that include request from user
 * @param {Response} res - Is an object that include response of server
 * @param {NextFunction} next - Is a callback that is called to call Error Handler
 * @returns - Undefined
 */

export const userRouterDelete = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.params;
    await deleteUser(userId);
    successResponseHandler(res, req, null, StatusCodes.successDelete);
  } catch (err) {
    next(err);
  }
};
