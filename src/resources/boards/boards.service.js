const { v4: uuidv4 } = require('uuid');
const boardsRepo = require('./boards.memory.js');

const getAllBoards = () => boardsRepo.getAllBoards();
const getOneBoard = (id) => boardsRepo.getOneBoard(id);
const addBoard = async (data) => {
  const id = uuidv4();
  const newBoard = { ...data, id };
  const result = await boardsRepo.addBoard(newBoard);
  return result;
};
const updateBoard = async (id, data) => {
  const response = await boardsRepo.updateBoard(id, data);
  return response;
};
const deleteBoard = (id) => boardsRepo.deleteBoard(id);

module.exports = {
  getAllBoards,
  getOneBoard,
  addBoard,
  updateBoard,
  deleteBoard,
};
