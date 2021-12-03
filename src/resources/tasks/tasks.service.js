const { v4: uuidv4 } = require('uuid');
const tasksRepo = require('./tasks.memory.js');

const getAllTasks = (id) => tasksRepo.getAllTasks(id);
const getOneTask = (params) => tasksRepo.getOneTask(params);
const addTask = async (id, data) => {
  const taskId = uuidv4();
  const newTask = { ...data, id: taskId, boardId: id };
  const result = await tasksRepo.addTask(id, newTask);
  return result;
};
const updateTask = async (params, data) => {
  const response = await tasksRepo.updateTask(params, data);
  return response;
};
const deleteTask = (id) => tasksRepo.deleteTask(id);

module.exports = {
  getAllTasks,
  getOneTask,
  addTask,
  updateTask,
  deleteTask,
};
