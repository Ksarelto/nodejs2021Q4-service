const db = require('../../../db/db.json');
const { checkExistence } = require('../../common/utils');

const getAllBoards = async () => {
  const allBoards = await db.boards;
  return allBoards;
};

const getOneBoard = async (id) => {
  const { boards } = await db;
  const foundedBoard = checkExistence(boards, id, 'Board');
  return foundedBoard;
};

const addBoard = async (data) => {
  await db.boards.push(data);
  return data;
};

const updateBoard = async (id, data) => {
  let updatedBoard;
  const { boards } = await db;
  checkExistence(boards, id, 'Board');
  const updatedBoards = boards.map((board) => {
    if (board.id === id) {
      updatedBoard = { ...data, id: board.id };
      return updatedBoard;
    }
    return board;
  });

  db.boards = updatedBoards;
  return updatedBoard;
};

const deleteBoard = async (id) => {
  const { boards, tasks } = await db;
  checkExistence(boards, id, 'Board');
  const newBoardsArray = boards.filter((board) => board.id !== id);
  const newTasksArray = tasks.filter((task) => task.boardId !== id);
  db.boards = newBoardsArray;
  db.tasks = newTasksArray;
  return newBoardsArray;
};

module.exports = {
  getAllBoards,
  getOneBoard,
  addBoard,
  updateBoard,
  deleteBoard,
};
