/**
 * @module app
 */
import Koa from 'koa';
import koaBody from 'koa-body';
import { userRouter } from './resources/users/user.router';
import { boardRouter } from './resources/boards/boards.router';
import { tasksRouter } from './resources/tasks/tasks.router';

/**
 * @alias Koa
 */

const app = new Koa();

app.use(koaBody());

/**
 * This method checking the url path for "/"
 * @param ctx - is a context that include request and response objects
 * @param next - is a method to call next method
 */

app.use(async (ctx, next) => {
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