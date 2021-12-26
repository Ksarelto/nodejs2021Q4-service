const Router = require('koa-router');
const { statusCodes } = require('../../common/constants.js');
const { successResponse, errorResponse } = require('../../common/utils.js');
const boardsService = require('./boards.service.js');

const boardRouter = new Router();

boardRouter.get('/boards', async (ctx) => {
  try {
    const boards = await boardsService.getAllBoards();
    successResponse(ctx, boards, statusCodes.successCode);
  } catch (err) {
    errorResponse(ctx, err, statusCodes.internalError);
  }
});

boardRouter.get('/boards/:boardId', async (ctx) => {
  try {
    const param = ctx.params.boardId;
    const board = await boardsService.getOneBoard(param);
    successResponse(ctx, board, statusCodes.successCode);
  } catch (err) {
    errorResponse(ctx, err, statusCodes.notFound);
  }
});

boardRouter.post('/boards', async (ctx) => {
  try {
    const { body } = ctx.request;
    const board = await boardsService.addBoard(body);
    successResponse(ctx, board, statusCodes.successCreate);
  } catch (err) {
    errorResponse(ctx, err, statusCodes.internalError);
  }
});

boardRouter.put('/boards/:boardId', async (ctx) => {
  try {
    const id = ctx.params.boardId;
    const { body } = ctx.request;
    const board = await boardsService.updateBoard(id, body);
    successResponse(ctx, board, statusCodes.successCode);
  } catch (err) {
    errorResponse(ctx, err, statusCodes.internalError);
  }
});

boardRouter.delete('/boards/:boardId', async (ctx) => {
  try {
    const id = ctx.params.boardId;
    const board = await boardsService.deleteBoard(id);
    successResponse(ctx, board, statusCodes.successDelete);
  } catch (err) {
    errorResponse(ctx, err, statusCodes.internalError);
  }
});

module.exports = { boardRouter };
