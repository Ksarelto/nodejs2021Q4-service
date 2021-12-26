import { Context } from "koa";
import { finished } from "stream";
import { headers } from "../common/constants";
import { CustomErrors } from "../common/errors.object";
import Logger from "../logging/winston.log";
import { createErrorMessage, createInfoMessage } from "./handlers.utils";


/**
 * Send success response with data to client and a log message to file and console
 * @param {Context} context - Is an object that include request and response of server
 * @param {T} data - Is some data that we should send to ckient
 * @param {number} code - Code number of response
 * @returns - undefined 
 */

export const successResponseHandler = <T>(context: Context, data: T, code: number): void => {
  context.res.writeHead(code, headers);
  context.body = JSON.stringify(data);
  finished(context.res, () => {
    const message = createInfoMessage(context);
    Logger.http(message);
  })
};


/**
 * Send error response with error message to client and a lod message to file and console
 * @param {Context} context - Is an object that include request and response of server
 * @param {unknown} error - Is Error object
 * @returns - undefined
 */

export const errorResponseHandler = (context: Context, error: unknown): void => {
  const statusCode = error instanceof CustomErrors ? error.code : 500;
  context.response.status = statusCode;
  context.body = (error as Error).message;
  const message = createErrorMessage(error as CustomErrors | Error);
  if(statusCode === 400){
    Logger.warn(message);
    return;
  } 
  Logger.error(message);
};
