const Task = require('./task.mongo.model');

const getAll = async (boardId) => Task.find({ boardId });

const get = async (boardId, id) => Task.findOne({ boardId, _id: id });


const getByKey = async (key, value) => Task.find({ [key]: value });

const remove = async (boardId, id) => Task.deleteOne({ boardId, _id: id });

const save = async (task) => {
  await Task.updateOne({ _id: task.id }, task);

  return task;
};

const create = async (task) => Task.create(task);

module.exports = {
  getAll,
  get,
  getByKey,
  remove,
  save,
  create,
};
