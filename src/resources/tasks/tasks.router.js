const Router = require('koa-router');
const { statusCodes } = require('../../common/constants.js');
const { successResponse, errorResponse } = require('../../common/utils.js');
const tasksService = require('./tasks.service.js');

const tasksRouter = new Router();

tasksRouter.get('/boards/:boardId/tasks', async (ctx) => {
  try {
    const params = ctx.params.boardId;
    const tasks = await tasksService.getAllTasks(params);
    successResponse(ctx, tasks, statusCodes.successCode);
  } catch (err) {
    errorResponse(ctx, err, statusCodes.internalError);
  }
});

tasksRouter.get('/boards/:boardId/tasks/:taskId', async (ctx) => {
  try {
    const { params } = ctx;
    const task = await tasksService.getOneTask(params);
    successResponse(ctx, task, statusCodes.successCode);
  } catch (err) {
    errorResponse(ctx, err, statusCodes.notFound);
  }
});

tasksRouter.post('/boards/:boardId/tasks', async (ctx) => {
  try {
    const { body } = ctx.request;
    const id = ctx.params.boardId;
    const task = await tasksService.addTask(id, body);
    successResponse(ctx, task, statusCodes.successCreate);
  } catch (err) {
    errorResponse(ctx, err, statusCodes.internalError);
  }
});

tasksRouter.put('/boards/:boardId/tasks/:taskId', async (ctx) => {
  try {
    const { params } = ctx;
    const { body } = ctx.request;
    const task = await tasksService.updateTask(params, body);
    successResponse(ctx, task, statusCodes.successCode);
  } catch (err) {
    errorResponse(ctx, err, statusCodes.internalError);
  }
});

tasksRouter.delete('/boards/:boardId/tasks/:taskId', async (ctx) => {
  try {
    const { params } = ctx;
    const task = await tasksService.deleteTask(params);
    successResponse(ctx, task, statusCodes.successDelete);
  } catch (err) {
    errorResponse(ctx, err, statusCodes.internalError);
  }
});

module.exports = { tasksRouter };
