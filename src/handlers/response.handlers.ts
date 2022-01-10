/**
 * @module handlers_main
 */
import { Request, Response } from 'express';
import { finished } from 'stream';
import { EntityNotFoundError } from 'typeorm';
import { headers } from '../common/constants';
import { CustomErrors } from '../common/errors.object';
import Logger from '../logging/winston.log';
import { createErrorMessage, createInfoMessage } from './handlers.utils';

/**
 * Send success response with data to client and a log message to file and console
 * @param {Response} res - Is an object that include response of server
 * @param {Request} req - Is an object that include request from user
 * @param {T} data - Is some data that we should send to ckient
 * @param {number} code - Code number of response
 * @returns - undefined
 */

export const successResponseHandler = <T>(
  res: Response,
  req: Request,
  data: T,
  code: number
): void => {
  res.status(code).set(headers).json(data);
  finished(res, () => {
    const message = createInfoMessage(res, req);
    Logger.http(message);
  });
};

/**
 * Check instance of error object and return status code
 * @param {unknown} error an Error object
 * @returns {number} Status code
 */

const setStatusCode = (error: unknown) => {
  if (error instanceof CustomErrors) {
    return error.code;
  }
  if (error instanceof EntityNotFoundError) {
    return 404;
  }
  return 500;
};

/**
 * Send error response with error message to client and a lod message to file and console
 * @param {unknown} error - Is Error object
 * @param {Response} res - Is an object that include response of server
 * @returns - undefined
 */

export const errorResponseHandler = (error: Error, res: Response): void => {
  const statusCode = setStatusCode(error);
  const message = createErrorMessage(error as CustomErrors | Error);
  if (statusCode === 400) {
    Logger.warn(message);
    return;
  }
  Logger.error(message);
  res.status(statusCode).json(error.message);
};
