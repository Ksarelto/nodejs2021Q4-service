const Router = require('koa-router');
const tasksService = require('./tasks.service.js');

const tasksRouter = new Router();

tasksRouter.get('/boards/:boardId/tasks', async (ctx) => {
  try {
    const params = ctx.params.boardId;
    const boards = await tasksService.getAllTasks(params);
    ctx.res.writeHead(200, { 'Content-Type': 'application/json' });
    ctx.body = JSON.stringify(boards);
  } catch (err) {
    ctx.response.status = 500;
    ctx.body = err.message;
  }
});

tasksRouter.get('/boards/:boardId/tasks/:taskId', async (ctx) => {
  try {
    const { params } = ctx;
    const board = await tasksService.getOneTask(params);
    ctx.res.writeHead(200, { 'Content-Type': 'application/json' });
    ctx.body = JSON.stringify(board);
  } catch (err) {
    ctx.response.status = 404;
    ctx.body = err.message;
  }
});

tasksRouter.post('/boards/:boardId/tasks', async (ctx) => {
  try {
    const { body } = ctx.request;
    const id = ctx.params.boardId;
    const board = await tasksService.addTask(id, body);
    ctx.res.writeHead(201, { 'Content-Type': 'application/json' });
    ctx.body = JSON.stringify(board);
  } catch (err) {
    ctx.response.status = 500;
    ctx.body = err.message;
  }
});

tasksRouter.put('/boards/:boardId/tasks/:taskId', async (ctx) => {
  try {
    const { params } = ctx;
    const { body } = ctx.request;
    const task = await tasksService.updateTask(params, body);
    ctx.res.writeHead(200, { 'Content-Type': 'application/json' });
    ctx.body = JSON.stringify(task);
  } catch (err) {
    ctx.response.status = 500;
    ctx.body = err.message;
  }
});

tasksRouter.delete('/boards/:boardId/tasks/:taskId', async (ctx) => {
  try {
    const { taskId } = ctx.params;
    const board = await tasksService.deleteTask(taskId);
    ctx.res.writeHead(204, { 'Content-Type': 'application/json' });
    ctx.body = JSON.stringify(board);
  } catch (err) {
    ctx.response.status = 500;
    ctx.body = err.message;
  }
});

module.exports = { tasksRouter };
