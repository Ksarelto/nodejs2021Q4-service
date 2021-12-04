const { v4: uuidv4 } = require('uuid');
const { validateID } = require('../../common/utils.js');
const tasksRepo = require('./tasks.memory.js');

const getAllTasks = (id) => {
  if (!validateID(id)) throw new Error('Invalid board id');
  return tasksRepo.getAllTasks(id);
};
const getOneTask = (params) => {
  if (!validateID(params.boardId)) throw new Error('Invalid board id');
  if (!validateID(params.taskId)) throw new Error('Invalid task id');
  return tasksRepo.getOneTask(params);
};
const addTask = async (id, data) => {
  if (!validateID(id)) throw new Error('Invalid board id');
  const taskId = uuidv4();
  const newTask = { ...data, id: taskId, boardId: id };
  const result = await tasksRepo.addTask(id, newTask);
  return result;
};
const updateTask = async (params, data) => {
  if (!validateID(params.boardId)) throw new Error('Invalid board id');
  if (!validateID(params.taskId)) throw new Error('Invalid task id');
  const response = await tasksRepo.updateTask(params, data);
  return response;
};
const deleteTask = (params) => {
  if (!validateID(params.boardId)) throw new Error('Invalid board id');
  if (!validateID(params.taskId)) throw new Error('Invalid task id');
  return tasksRepo.deleteTask(params);
};

module.exports = {
  getAllTasks,
  getOneTask,
  addTask,
  updateTask,
  deleteTask,
};
