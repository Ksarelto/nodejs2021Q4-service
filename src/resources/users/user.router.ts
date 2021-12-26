/**
 * @module users_router
 */

import Router from 'koa-router';
import { 
  userRouterDelete, 
  userRouterGetAll, 
  userRouterGetOne, 
  userRouterPost, 
  userRouterPut 
} from './user.router.methods';

/**
 * This constant is a Router object
 * @constant userRouter
 */

export const userRouter = new Router();

/**
 * HTTP method GET of Router object
 * @remarks Method of koa-router Router object
 * @param {string} path url
 * @param {callback} userRouterGetAll that implement router GET method, send to client response with all users or error message
 */

userRouter.get('/users', userRouterGetAll)
/**
 * HTTP method GET of Router object
 * @remarks Method of koa-router Router object
 * @param {string} path url
 * @param {callback} userRouterGetOne that implement router GET method, send to client response with one user or error message
 */
          .get('/users/:userId', userRouterGetOne)
/**
 * HTTP method POST of Router object
 * @remarks Method of koa-router Router object
 * @param {string} path url
 * @param {callback} userRouterPost that implement router POST method, send to client response with created user or error message
 */
          .post('/users', userRouterPost)
/**
 * HTTP method PUT of Router object
 * @remarks Method of koa-router Router object
 * @param {string} path url
 * @param {callback} userRouterPut that implement router PUT method, send to client response with updated user or error message
 */
          .put('/users/:userId', userRouterPut)
/**
 * HTTP method DELETE of Router object
 * @remarks Method of koa-router Router object
 * @param {string} path url
 * @param {callback} userRouterDelete that implement router DELETE method, send to client response with all boards or error message
 */
          .delete('/users/:userId', userRouterDelete)
