const { v4: uuidv4 } = require('uuid');
const { validateID } = require('../../common/utils.js');
const boardsRepo = require('./boards.memory.js');

const getAllBoards = () => boardsRepo.getAllBoards();
const getOneBoard = (id) => {
  if (!validateID(id)) throw new Error('Invalid id');
  return boardsRepo.getOneBoard(id);
};
const addBoard = async (data) => {
  const id = uuidv4();
  const newBoard = { ...data, id };
  const result = await boardsRepo.addBoard(newBoard);
  return result;
};
const updateBoard = async (id, data) => {
  if (!validateID(id)) throw new Error('Invalid id');
  const response = await boardsRepo.updateBoard(id, data);
  return response;
};
const deleteBoard = (id) => {
  if (!validateID(id)) throw new Error('Invalid id');
  return boardsRepo.deleteBoard(id);
};

module.exports = {
  getAllBoards,
  getOneBoard,
  addBoard,
  updateBoard,
  deleteBoard,
};
