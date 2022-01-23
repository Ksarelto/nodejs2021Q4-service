/**
 * @module users_router
 */

import express from 'express';
import {
  userRouterDelete,
  userRouterGetAll,
  userRouterGetOne,
  userRouterPost,
  userRouterPut,
} from './user.router.methods';

/**
 * This constant is a Router object
 * @constant userRouter
 */

export const userRouter = express.Router();

/**
 * HTTP method GET of Router object
 * @remarks Method of express Router object
 * @param {string} path url
 * @param {callback} userRouterGetAll that implement router GET method, send to client response with all users or error message
 */

userRouter.get('/', userRouterGetAll);
/**
 * HTTP method GET of Router object
 * @remarks Method of express Router object
 * @param {string} path url
 * @param {callback} userRouterGetOne that implement router GET method, send to client response with one user or error message
 */
userRouter.get('/:userId', userRouterGetOne);
/**
 * HTTP method POST of Router object
 * @remarks Method of express Router object
 * @param {string} path url
 * @param {callback} userRouterPost that implement router POST method, send to client response with created user or error message
 */
userRouter.post('/', userRouterPost);
/**
 * HTTP method PUT of Router object
 * @remarks Method of express Router object
 * @param {string} path url
 * @param {callback} userRouterPut that implement router PUT method, send to client response with updated user or error message
 */
userRouter.put('/:userId', userRouterPut);
/**
 * HTTP method DELETE of Router object
 * @remarks Method of express Router object
 * @param {string} path url
 * @param {callback} userRouterDelete that implement router DELETE method, send to client deleted result or error message
 */
userRouter.delete('/:userId', userRouterDelete);
