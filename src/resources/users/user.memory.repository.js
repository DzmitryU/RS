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

const save = async (user) => {
  db[user.id] = user;

  return user
};

module.exports = {
  getAll,
  get,
  remove,
  save,
};
