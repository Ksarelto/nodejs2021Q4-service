/**
 * @module utils
 */
import { Context } from "koa";
import { finished } from "stream";
import { User, SearchedArray } from "./types";
import { headers, StatusCodes } from './constants';
import Logger from "../logging/winston.log";
import { CustomErrors, UsersErrors, ValidationErrors } from "./errors.object";

/**
 * Remove field password from User object and return new User object
 * @param {User} user - Is a User object
 * @returns - The User without field password
 */

export const toResponse = (user: User): Omit<User,'password'> => {
  const { name, login, id } = user;
  return { name, login, id };
};

/**
 * This function validate id
 * @param {string | undefined} id - Is an id parametr of Item
 * @returns - If id valid return true, else false
 */

export const validateID = (id: string | undefined): boolean => {
  if (id === undefined) return false;
  if (!id.match(/^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/g))
    return false;
  return true;
};

/**
 * Check the existance of some Item in Array
 * @param {T} arr - Array of Items
 * @param {string | undefined} id - Id of searched item in array
 * @param {string} name - Nmae of the Array of the Items
 * @throws - Error message if searchedItem is not find
 * @returns - Searched Item
 */

export const checkExistence = <T extends SearchedArray>(arr: T[], id: string | undefined, name: string): SearchedArray => {
  if(!id) throw new ValidationErrors('Id empty', StatusCodes.invalidId, 'Invalid id');
  const searchedItem = arr.find((item) => item.id === id);
  if (!searchedItem) throw new UsersErrors('NotFound', StatusCodes.notFound, `Such ${name} is not found`);
  return searchedItem;
};

const createInfoMessage = (ctx: Context) => {
  const { params, method } = ctx;
  const { body, url } = ctx.request;
  const { statusCode } = ctx.res;
  return `
  Method: ${JSON.stringify(method)}
  URL: ${JSON.stringify(url)}
  Params: ${params ? JSON.stringify(params) : 'empty'}
  Body: ${JSON.stringify(body)}
  Status Code: ${statusCode}
  `
}

/**
 * Send success response with data to client
 * @param {Context} context - Is an object that include request and response of server
 * @param {T} data - Is some data that we should send to ckient
 * @param {number} code - Code number of response
 * @returns - undefined 
 */

export const successResponse = <T>(context: Context, data: T, code: number): void => {
  context.res.writeHead(code, headers);
  context.body = JSON.stringify(data);
  finished(context.res, () => {
    const message = createInfoMessage(context);
    Logger.info(message);
  })
};

export const createErrorMessage = (err: CustomErrors | Error) => `
    Name: ${JSON.stringify(err.name)}
    Message: ${JSON.stringify(err.message)}
    Stack: ${JSON.stringify(err.stack)}
    Status Code: ${err instanceof CustomErrors ? err.code : 500}
    `

/**
 * Send error response with error message to client
 * @param {Context} context - Is an object that include request and response of server
 * @param {unknown} error - Is Error object
 * @param {number} code - ode number of response
 * @returns - undefined
 */

export const errorResponse = (context: Context, error: unknown): void => {
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

export const uncaughtExeptionsHandler = (err: Error) => {
  const message = createErrorMessage(err);
  Logger.error(message);
  process.exit(1);
}