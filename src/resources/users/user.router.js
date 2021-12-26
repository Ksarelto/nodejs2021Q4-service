const Router = require('koa-router');
const { statusCodes } = require('../../common/constants');
const {
  toResponse,
  successResponse,
  errorResponse,
} = require('../../common/utils');
const usersService = require('./user.service');

const userRouter = new Router();

userRouter.get('/users', async (ctx) => {
  try {
    const users = await usersService.getAll();
    const response = users.map((user) => toResponse(user));
    successResponse(ctx, response, statusCodes.successCode);
  } catch (err) {
    errorResponse(ctx, err, statusCodes.internalError);
  }
});

userRouter.get('/users/:userId', async (ctx) => {
  try {
    const param = ctx.params.userId;
    const user = await usersService.getOne(param);
    successResponse(ctx, toResponse(user), statusCodes.successCode);
  } catch (err) {
    errorResponse(ctx, err, statusCodes.internalError);
  }
});

userRouter.post('/users', async (ctx) => {
  try {
    const { body } = ctx.request;
    const response = await usersService.addUser(body);
    successResponse(ctx, toResponse(response), statusCodes.successCreate);
  } catch (err) {
    errorResponse(ctx, err, statusCodes.internalError);
  }
});

userRouter.put('/users/:userId', async (ctx) => {
  try {
    const id = ctx.params.userId;
    const { body } = ctx.request;
    const response = await usersService.updateUser(id, body);
    successResponse(ctx, toResponse(response), statusCodes.successCode);
  } catch (err) {
    errorResponse(ctx, err, statusCodes.internalError);
  }
});

userRouter.delete('/users/:userId', async (ctx) => {
  try {
    const id = ctx.params.userId;
    await usersService.deleteUser(id);
    successResponse(ctx, null, statusCodes.successDelete);
  } catch (err) {
    errorResponse(ctx, err, statusCodes.internalError);
  }
});

module.exports = { userRouter };
