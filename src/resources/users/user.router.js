const Router = require('koa-router');
const { toResponse } = require('./user.model');
const usersService = require('./user.service');

const userRouter = new Router();

userRouter.get('/users', async (ctx) => {
  const users = await usersService.getAll();
  ctx.body = users.map((user) => toResponse(user));
  ctx.response.status = 200;
});

userRouter.get('/users/:userId', async (ctx) => {
  const param = ctx.params.userId;
  const user = await usersService.getOne(param);
  ctx.res.writeHead(200, { 'Content-Type': 'application/json' });
  ctx.body = JSON.stringify(toResponse(user));
});

userRouter.post('/users', async (ctx) => {
  try {
    const { body } = ctx.request;
    const response = await usersService.addUser(body);
    ctx.res.writeHead(201, { 'Content-Type': 'application/json' });
    ctx.body = JSON.stringify(toResponse(response));
  } catch (err) {
    ctx.response.status = 500;
    ctx.body = err.message;
  }
});

userRouter.put('/users/:userId', async (ctx) => {
  try {
    const id = ctx.params.userId;
    const { body } = ctx.request;
    const response = await usersService.updateUser(id, body);
    ctx.res.writeHead(200, { 'Content-Type': 'application/json' });
    ctx.body = JSON.stringify(toResponse(response));
  } catch (err) {
    ctx.response.status = 500;
    ctx.body = err.message;
  }
});

userRouter.delete('/users/:userId', async (ctx) => {
  try {
    const id = ctx.params.userId;
    await usersService.deleteUser(id);
    ctx.res.writeHead(204, { 'Content-Type': 'application/json' });
  } catch (err) {
    ctx.response.status = 500;
    ctx.body = err.message;
  }
});

module.exports = { userRouter };
