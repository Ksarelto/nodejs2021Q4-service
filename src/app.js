const Koa = require('koa');
const koaBody = require('koa-body');
const { userRouter } = require('./resources/users/user.router');
const { boardRouter } = require('./resources/boards/boards.router');
const { tasksRouter } = require('./resources/tasks/tasks.router');

const app = new Koa();

app.use(koaBody());

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

module.exports = app;
