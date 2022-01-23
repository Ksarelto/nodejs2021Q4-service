/**
 * @module handler_utils
 */
import { Response, Request } from 'express';
import { CustomErrors } from '../common/errors.object';

/**
 * Create an info message
 * @param {Response} res - Is an object that include response of server
 * @param {Request} req - Is an object that include request from user
 * @returns A message of type string
 */

export const createInfoMessage = (res: Response, req: Request): string => {
  const { params, method, body, url } = req;
  const { statusCode } = res;
  return `
  Method: ${JSON.stringify(method)}
  URL: ${JSON.stringify(url)}
  Params: ${params ? JSON.stringify(params) : 'empty'}
  Body: ${JSON.stringify(body)}
  Status Code: ${statusCode}
  `;
};

/**
 * Create na error message
 * @param {CustomErrors | Error} err - Error object
 * @returns - An error message of type string
 */

export const createErrorMessage = (err: CustomErrors | Error): string => `
      Name: ${JSON.stringify(err.name)}
      Message: ${JSON.stringify(err.message)}
      Stack: ${JSON.stringify(err.stack)}
      Status Code: ${err instanceof CustomErrors ? err.code : 500}
 `;
