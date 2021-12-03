const uuid = require('uuid');

const createUser = () => {
  const id = uuid();
  return id;
};

const toResponse = (user) => {
  const { name, login, id } = user;
  return { name, login, id };
};

module.exports = { toResponse, createUser };
