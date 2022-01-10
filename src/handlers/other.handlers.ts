/**
 * @module handlers_other
 */
import { Request, Response } from 'express';
import { StatusCodes } from '../common/constants';
import { CustomErrors, errorNames } from '../common/errors.object';
import Logger from '../logging/winston.log';
import { createErrorMessage } from './handlers.utils';

/**
 * Send a log message to console and file and exit the process
 * @param {Error} err - An error object
 * @returns - undefined
 */
export const uncaughtExeptionsHandler = (err: Error): void => {
  const message = createErrorMessage(err);
  Logger.crit(message);
};

/**
 * Catch unused request and send response messsage
 * @param {Response} res - Is an object that include response of server
 * @param {Request} req - Is an object that include request from user
 * @returns - undefined
 */

export const notFoundHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { originalUrl } = req;
  const notFoundUrl = new CustomErrors(
    errorNames.NFE,
    StatusCodes.notFound,
    `http://${req.headers.host}${originalUrl} is not found`
  );
  const message = createErrorMessage(notFoundUrl);
  Logger.warn(message);
  res.status(StatusCodes.notFound).json(notFoundUrl.message);
};
