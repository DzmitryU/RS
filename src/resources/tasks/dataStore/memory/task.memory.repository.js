const { flattenDeep } = require('lodash');
const Task = require('./task.memory.model');

const db = {};

const getAll = async (boardId) => {
  return Object.values(db[boardId] || {});
};

const get = async (boardId, id) => {
  return db[boardId][id];
}

const getByKey = async (key, value) => {
  const boards = Object.values(db);
  const tasks = flattenDeep(boards.map((board) => Object.values(board)));

  return tasks.filter((task) => task[key] === value);
}

const remove = async (boardId, id) => {
  delete db[boardId][id];
}

const save = async (task) => {
  if (!db[task.boardId]) {
    db[task.boardId] = {};
  }
  db[task.boardId][task.id] = task;

  return task
};

const create = (task) => save(new Task(task));

module.exports = {
  getAll,
  get,
  getByKey,
  remove,
  save,
  create,
};
