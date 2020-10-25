const Board = require('./models/board.memory.model');

const db = {};

const getAll = async () => {
  return Object.values(db);
};

const get = async (id) => {
  return db[id];
}

const remove = async (id) => {
  delete db[id];
}

const save = async (board) => {
  db[board.id] = board;

  return board
};

const create = async (board) => save(new Board(board));

module.exports = {
  getAll,
  get,
  remove,
  save,
  create,
};
