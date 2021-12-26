import { Context } from 'koa';
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
 * @param {Context} ctx - Is an object that include request and response of server
 * @returns - undefined
 */

export const notFoundHandler = async (ctx: Context): Promise<void> => {
  const { originalUrl } = ctx;
  const notFoundUrl = new CustomErrors(
    errorNames.NFE,
    StatusCodes.notFound,
    `http://${ctx.headers.host}${originalUrl} is not found`
  );
  const message = createErrorMessage(notFoundUrl);
  Logger.warn(message);
};
