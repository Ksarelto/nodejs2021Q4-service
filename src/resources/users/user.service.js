const { v4: uuidv4 } = require('uuid');
const { validateID } = require('../../common/utils');
const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const getOne = (id) => {
  if (!validateID(id)) throw new Error('Invalid id');
  return usersRepo.getOne(id);
};
const addUser = async (data) => {
  const id = uuidv4();
  const newUser = { ...data, id };
  const result = await usersRepo.addUser(newUser);
  return result;
};
const updateUser = async (id, data) => {
  if (!validateID(id)) throw new Error('Invalid id');
  const response = await usersRepo.updateUser(id, data);
  return response;
};
const deleteUser = (id) => {
  if (!validateID(id)) throw new Error('Invalid id');
  return usersRepo.deleteUser(id);
};

module.exports = { getAll, getOne, addUser, updateUser, deleteUser };
