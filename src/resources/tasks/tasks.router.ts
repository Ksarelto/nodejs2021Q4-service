/**
 * @module task_router
 */
import Router from 'koa-router';
import { taskRouterDelete, taskRouterGetAll, taskRouterGetOne, taskRouterPost, taskRouterPut } from './task.router.methods';

export const tasksRouter = new Router();

tasksRouter.get('/boards/:boardId/tasks', taskRouterGetAll)
           .get('/boards/:boardId/tasks/:taskId', taskRouterGetOne)
           .post('/boards/:boardId/tasks', taskRouterPost)
           .put('/boards/:boardId/tasks/:taskId', taskRouterPut)
           .delete('/boards/:boardId/tasks/:taskId', taskRouterDelete);

