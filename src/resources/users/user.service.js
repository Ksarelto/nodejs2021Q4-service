const { v4: uuidv4 } = require('uuid');
const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const getOne = (id) => usersRepo.getOne(id);
const addUser = async (data) => {
  const id = uuidv4();
  const newUser = { ...data, id };
  const result = await usersRepo.addUser(newUser);
  return result;
};
const updateUser = async (id, data) => {
  const response = await usersRepo.updateUser(id, data);
  return response;
};
const deleteUser = (id) => usersRepo.deleteUser(id);

module.exports = { getAll, getOne, addUser, updateUser, deleteUser };
