const db = require('../../../db/db.json');
const { checkExistence } = require('../../common/utils');

const getAllTasks = async (id) => {
  const { boards, tasks } = await db;
  checkExistence(boards, id, 'Board');
  const choosedTasks = tasks.filter((task) => task.boardId === id);
  return choosedTasks;
};

const getOneTask = async (params) => {
  const { boards, tasks } = await db;
  checkExistence(boards, params.boardId, 'Board');
  const foundedTask = checkExistence(tasks, params.taskId, 'Task');
  return foundedTask;
};

const addTask = async (id, data) => {
  await db.tasks.push(data);
  return data;
};

const updateTask = async (params, data) => {
  let updatedTask;
  const { tasks, boards } = await db;
  checkExistence(boards, params.boardId, 'Board');
  checkExistence(tasks, params.taskId, 'Task');
  const updatedTasks = tasks.map((task) => {
    if (task.id === params.taskId) {
      updatedTask = { ...data, id: task.id };
      return updatedTask;
    }
    return task;
  });

  db.tasks = updatedTasks;
  return updatedTask;
};

const deleteTask = async (params) => {
  const { tasks, boards } = await db;
  checkExistence(boards, params.boardId, 'Board');
  checkExistence(tasks, params.taskId, 'Task');
  const newTasksArray = tasks.filter((task) => task.id !== params.taskId);
  db.tasks = newTasksArray;
  return newTasksArray;
};

module.exports = {
  getAllTasks,
  getOneTask,
  addTask,
  updateTask,
  deleteTask,
};
