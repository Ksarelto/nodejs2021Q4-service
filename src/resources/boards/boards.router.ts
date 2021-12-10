/**
 * @module boards_router
 */
import Router from 'koa-router';
import { boardRouterDelete, boardRouterGetAll, boardRouterGetOne, boardRouterPost, boardRouterPut } from './board.router.methods';

export const boardRouter = new Router();

boardRouter.get('/boards', boardRouterGetAll)
           .get('/boards/:boardId', boardRouterGetOne)
           .post('/boards', boardRouterPost)
           .put('/boards/:boardId', boardRouterPut)
           .delete('/boards/:boardId', boardRouterDelete);
