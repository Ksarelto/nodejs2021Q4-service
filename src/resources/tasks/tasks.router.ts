/**
 * @module task_router
 */
import express from 'express';
import {
  taskRouterDelete,
  taskRouterGetAll,
  taskRouterGetOne,
  taskRouterPost,
  taskRouterPut,
} from './task.router.methods';

/**
 * This constant is a Router object
 * @constant tasksRouter
 */

export const tasksRouter = express.Router();

/**
 * HTTP method GET of Router object
 * @remarks Method of express Router object
 * @param {string} path url
 * @param {callback} taskRouterGetAll that implement router GET method, send to client response with all tasks or error message
 */

tasksRouter.get('/:boardId/tasks', taskRouterGetAll);
/**
 * HTTP method GET of Router object
 * @remarks Method of express Router object
 * @param {string} path url
 * @param {callback} taskRouterGetOne that implement router GET method, send to client response with one task or error message
 */
tasksRouter.get('/:boardId/tasks/:taskId', taskRouterGetOne);
/**
 * HTTP method POST of Router object
 * @remarks Method of express Router object
 * @param {string} path url
 * @param {callback} taskRouterPost that implement router POST method, send to client response with created task or error message
 */
tasksRouter.post('/:boardId/tasks', taskRouterPost);
/**
 * HTTP method PUT of Router object
 * @remarks Method of express Router object
 * @param {string} path url
 * @param {callback} taskRouterPut that implement router PUT method, send to client response with updated task or error message
 */
tasksRouter.put('/:boardId/tasks/:taskId', taskRouterPut);
/**
 * HTTP method DELETE of Router object
 * @remarks Method of express Router object
 * @param {string} path url
 * @param {callback} taskRouterDelete that implement router DELETE method, send to client response with array of tasks or error message
 */
tasksRouter.delete('/:boardId/tasks/:taskId', taskRouterDelete);
