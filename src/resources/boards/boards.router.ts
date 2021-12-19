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
 * HTTP method GET of Router object
 * @remarks Method of koa-router Router object
 * @param {string} path url
 * @param {callback} boardRouterGetAll that implement router GET method, send to client response with all boards or error message
 */

boardRouter.get('/boards', boardRouterGetAll)
/**
 * HTTP method GET of Router object
 * @remarks Method of koa-router Router object
 * @param {string} path url
 * @param {callback} boardRouterGetOne that implement router GET method, send to client response with found board or error message
 */
           .get('/boards/:boardId', boardRouterGetOne)
/**
 * HTTP method POST of Router object
 * @remarks Method of koa-router Router object
 * @param {string} path url
 * @param {callback} boardRouterPost that implement router POST method, send to client response with created board or error message
 */
           .post('/boards', boardRouterPost)
/**
 * HTTP method PUT of Router object
 * @remarks Method of koa-router Router object
 * @param {string} path url
 * @param {callback} boardRouterPut that implement router PUT method, send to client response with updated board or error message
 */
           .put('/boards/:boardId', boardRouterPut)
/**
 * HTTP method DELETE of Router object
 * @remarks Method of koa-router Router object
 * @param {string} path url
 * @param {callback} boardRouterDelete that implement router DELETE method, 
 * send to client response with all boards without deleted one or error message
 */
           .delete('/boards/:boardId', boardRouterDelete);
