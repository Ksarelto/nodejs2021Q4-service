const { headers } = require('./constants');

const toResponse = (user) => {
  const { name, login, id } = user;
  return { name, login, id };
};

const validateID = (id) => {
  if (id === undefined) return false;
  if (!id.match(/^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/g))
    return false;
  return true;
};

const checkExistence = (arr, id, name) => {
  const searchedItem = arr.find((item) => item.id === id);
  if (!searchedItem) throw new Error(`${name} with such id is not defined`);
  return searchedItem;
};

const successResponse = (context, data, code) => {
  context.res.writeHead(code, headers);
  context.body = JSON.stringify(data);
};

const errorResponse = (context, error, code) => {
  context.response.status = code;
  context.body = error.message;
};

module.exports = {
  validateID,
  toResponse,
  checkExistence,
  successResponse,
  errorResponse,
};
