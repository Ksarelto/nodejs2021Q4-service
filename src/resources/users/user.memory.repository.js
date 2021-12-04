const db = require('../../../db/db.json');
const { checkExistence } = require('../../common/utils');

const getAll = async () => {
  const allUsers = await db.users;
  return allUsers;
};

const getOne = async (id) => {
  const foundedUser = await db.users.find((user) => user.id === id);
  return foundedUser;
};

const addUser = async (data) => {
  await db.users.push(data);
  return data;
};

const updateUser = async (id, data) => {
  let updatedUser;
  const { users } = await db;
  checkExistence(users, id, 'User');
  const updatedUsers = users.map((user) => {
    if (user.id === id) {
      updatedUser = { ...data, id: user.id };
      return updatedUser;
    }
    return user;
  });

  db.users = updatedUsers;
  return updatedUser;
};

const deleteUser = async (id) => {
  const { users, tasks } = await db;
  checkExistence(users, id, 'User');
  const newUsersArray = users.filter((user) => user.id !== id);
  const newTasksArray = tasks.map((task) => {
    if (task.userId === id) return { ...task, userId: null };
    return task;
  });
  db.users = newUsersArray;
  db.tasks = newTasksArray;
  return newUsersArray;
};

module.exports = { getAll, getOne, addUser, updateUser, deleteUser };
