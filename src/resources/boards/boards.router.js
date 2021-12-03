const Router = require('koa-router');
const boardsService = require('./boards.service.js');

const boardRouter = new Router();

boardRouter.get('/boards', async (ctx) => {
  try {
    const boards = await boardsService.getAllBoards();
    ctx.res.writeHead(200, { 'Content-Type': 'application/json' });
    ctx.body = JSON.stringify(boards);
  } catch (err) {
    ctx.response.status = 500;
    ctx.body = err.message;
  }
});

boardRouter.get('/boards/:boardId', async (ctx) => {
  try {
    const param = ctx.params.boardId;
    const board = await boardsService.getOneBoard(param);
    ctx.res.writeHead(200, { 'Content-Type': 'application/json' });
    ctx.body = JSON.stringify(board);
  } catch (err) {
    ctx.response.status = 404;
    ctx.body = err.message;
  }
});

boardRouter.post('/boards', async (ctx) => {
  try {
    const { body } = ctx.request;
    const board = await boardsService.addBoard(body);
    ctx.res.writeHead(201, { 'Content-Type': 'application/json' });
    ctx.body = JSON.stringify(board);
  } catch (err) {
    ctx.response.status = 500;
    ctx.body = err.message;
  }
});

boardRouter.put('/boards/:boardId', async (ctx) => {
  try {
    const id = ctx.params.boardId;
    const { body } = ctx.request;
    const board = await boardsService.updateBoard(id, body);
    ctx.res.writeHead(200, { 'Content-Type': 'application/json' });
    ctx.body = JSON.stringify(board);
  } catch (err) {
    ctx.response.status = 500;
    ctx.body = err.message;
  }
});

boardRouter.delete('/boards/:boardId', async (ctx) => {
  try {
    const id = ctx.params.boardId;
    const board = await boardsService.deleteBoard(id);
    ctx.res.writeHead(204, { 'Content-Type': 'application/json' });
    ctx.body = JSON.stringify(board);
  } catch (err) {
    ctx.response.status = 500;
    ctx.body = err.message;
  }
});

module.exports = { boardRouter };
