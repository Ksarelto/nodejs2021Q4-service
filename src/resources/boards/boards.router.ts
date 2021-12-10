/**
 * @module boards_router
 */
import Router from 'koa-router';
import { boardRouterDelete, boardRouterGetAll, boardRouterGetOne, boardRouterPost, boardRouterPut } from './board.router.methods';

/**
 * This constant is a Router object
 * @constant boardRouter
 */

export const boardRouter = new Router();

/**
 * HTTP methods of Router object
 */

boardRouter.get('/boards', boardRouterGetAll)
           .get('/boards/:boardId', boardRouterGetOne)
           .post('/boards', boardRouterPost)
           .put('/boards/:boardId', boardRouterPut)
           .delete('/boards/:boardId', boardRouterDelete);
