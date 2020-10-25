const Board = require('./models/board.mongo.model');

const getAll = async () => Board.find({});

const get = async (id) => Board.findById(id);

const remove = async (id) => Board.deleteOne({ _id: id });

const save = async (board) => {

  await Board.updateOne({ _id: board.id }, board);

  return board;
};

const create = (board) => Board.create(board);

module.exports = {
  getAll,
  get,
  remove,
  save,
  create,
};
