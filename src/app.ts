/**
 * @module app
 */
import Koa from 'koa';
import koaBody from 'koa-body';
import { userRouter } from './resources/users/user.router';
import { boardRouter } from './resources/boards/boards.router';
import { tasksRouter } from './resources/tasks/tasks.router';
import { uncaughtExeptionsHandler } from './common/utils';

/**
 * @constant {Koa} app is an object of Koa class 
 */

const app = new Koa();

/**
 * Koa "use" method to parse request body
 * @remarks Method of Koa object(koa API)
 * @param {callback} koaBody that parse request body
 */

app.use(koaBody());

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
 * Event listener of UnhandledRejection
 * @param {string} event - Name of event
 * @param {callback} listener Callback called when event was called
 * @returns - undefined
 */

process.on('unhandledRejection', (err) => {
  uncaughtExeptionsHandler(err as Error);
})

/**
 * Koa "use" method checking the url path for "/"
 *@remarks Method of Koa object(koa API)
 * @async
 * @param {callback} callback with to arguments ctx: Context and next: Function to call next method
 * @returns - undefined
 */

app.use(async (ctx, next): Promise<void> => {
  if (ctx.originalUrl === '/') {
    ctx.body('Service is running!');
    return;
  }
  next();
});
app.use(userRouter.routes()).use(userRouter.allowedMethods());
app.use(boardRouter.routes()).use(boardRouter.allowedMethods());
app.use(tasksRouter.routes()).use(tasksRouter.allowedMethods());

export default app;