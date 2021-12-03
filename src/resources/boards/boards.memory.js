const db = require('../../../db/db.json');

const getAllBoards = async () => {
  const allBoards = await db.boards;
  return allBoards;
};

const getOneBoard = async (id) => {
  const foundedBoard = await db.boards.find((user) => user.id === id);
  if (!foundedBoard) throw new Error('Board is not exist');
  return foundedBoard;
};

const addBoard = async (data) => {
  await db.boards.push(data);
  return data;
};

const updateBoard = async (id, data) => {
  let updatedBoard;
  const { boards } = await db;
  const searchedBoard = boards.find((board) => board.id === id);
  if (!searchedBoard) throw new Error('Board with such id is not defined');
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
  const deletedBoard = boards.find((board) => board.id === id);
  if (!deletedBoard) throw new Error('Board with such id is not defined');
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
