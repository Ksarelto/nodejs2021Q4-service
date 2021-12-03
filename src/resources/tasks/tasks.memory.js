const db = require('../../../db/db.json');

const getAllTasks = async (id) => {
  const allTasks = await db.tasks;
  const choosedTasks = allTasks.filter((task) => task.boardId === id);
  return choosedTasks;
};

const getOneTask = async (params) => {
  const foundedTask = await db.tasks.find(
    (task) => task.id === params.taskId && task.boardId === params.boardId
  );
  if (!foundedTask) throw new Error('Board is not exist');
  return foundedTask;
};

const addTask = async (id, data) => {
  await db.tasks.push(data);
  return data;
};

const updateTask = async (params, data) => {
  let updatedTask;
  const { tasks } = await db;
  const searchedTask = tasks.find((task) => task.boardId === params.boardId);
  if (!searchedTask) throw new Error('Board with such id is not defined');
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

const deleteTask = async (id) => {
  const { tasks } = await db;
  const deletedTask = tasks.find((task) => task.id === id);
  if (!deletedTask) throw new Error('Task with such id is not defined');
  const newTasksArray = tasks.filter((task) => task.id !== id);
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
