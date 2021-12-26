/**
 * Create an info message 
 * @param {Context} ctx - Is an object that include request and response of server 
 * @returns A message of type string
 */

import { Context } from "koa";
import { CustomErrors } from "../common/errors.object";

 export const createInfoMessage = (ctx: Context): string => {
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
 * Create na error message
 * @param {CustomErrors | Error} err - Error object 
 * @returns - An error message of type string
 */

 export const createErrorMessage = (err: CustomErrors | Error): string => `
      Name: ${JSON.stringify(err.name)}
      Message: ${JSON.stringify(err.message)}
      Stack: ${JSON.stringify(err.stack)}
      Status Code: ${err instanceof CustomErrors ? err.code : 500}
 `