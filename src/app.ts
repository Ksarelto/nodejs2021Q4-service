/**
 * @module app
 */
import express, { NextFunction, Request, Response } from 'express';
import { userRouter } from './resources/users/user.router';
import { boardRouter } from './resources/boards/boards.router';
import { tasksRouter } from './resources/tasks/tasks.router';
import {
  notFoundHandler,
  uncaughtExeptionsHandler,
} from './handlers/other.handlers';
import { errorResponseHandler } from './handlers/response.handlers';

/**
 * @constant {express} app is an object of Express
 */

const app = express();

/**
 * Event listener of UnhandledRejection
 * @param {string} event - Name of event
 * @param {callback} listener Callback called when event was called
 * @returns - undefined
 */

process.on('unhandledRejection', (err) => {
  uncaughtExeptionsHandler(err as Error);
});

/**
 * Event listener of UncaughtExeption
 * @param {string} event - Name of event
 * @param {callback} listener Callback called when event was called
 * @returns - undefined
 */

process.on('uncaughtException', (err) => {
  uncaughtExeptionsHandler(err);
});

/**
 * Express "use" method to parse request body
 * @remarks Method of Koa object(koa API)
 * @param {callback} koaBody that parse request body
 */

app.use(express.json());

/**
 * Express "use" method checking the url path for "/"
 * @async
 * @param {callback} callback with to arguments req: Request, res: Response and next: Function to call next method
 * @returns - undefined
 */

app.use(async (req, res, next): Promise<void> => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards', tasksRouter);
app.use(notFoundHandler);

/**
 * Koa "use" method for handling errors
 * @async
 * @param {callback} callback with to arguments ctx: Context and next: Function to call next method
 * @returns - undefined
 */

app.use(
  async (err: Error, _req: Request, res: Response, next: NextFunction) => {
    errorResponseHandler(err, res);
    next();
  }
);

export default app;
