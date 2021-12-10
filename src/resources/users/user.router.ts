/**
 * @module users_router
 */

import Router from 'koa-router';
import { 
  userRouterDeleteRequest, 
  userRouterGetAllRequest, 
  userRouterGetOneRequest, 
  userRouterPostRequest, 
  userRouterPutRequest 
} from './user.router.methods';

/**
 * This constant is a Router object
 * @constant userRouter
 */

export const userRouter = new Router();

/**
 * HTTP methods of Router object
 */

userRouter.get('/users', userRouterGetAllRequest)
          .get('/users/:userId', userRouterGetOneRequest)
          .post('/users', userRouterPostRequest)
          .put('/users/:userId', userRouterPutRequest)
          .delete('/users/:userId', userRouterDeleteRequest)
