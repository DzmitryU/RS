const db = {};

const getAll = async (boardId) => {
  return Object.values(db[boardId] || {});
};

const get = async (boardId, id) => {
  return db[boardId][id];
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

module.exports = {
  getAll,
  get,
  remove,
  save,
};
