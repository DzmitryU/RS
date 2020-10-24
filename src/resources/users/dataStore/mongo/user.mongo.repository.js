const User = require('./user.mongo.model');

const getAll = async () => User.find({});

const get = async (id) => User.findById(id);

const remove = async (id) => User.deleteOne({ _id: id });

const save = async (user) => {
  await User.updateOne({ _id: user.id}, user);

  return user;
};

const create = async (user) => User.create(user);

module.exports = {
  getAll,
  get,
  remove,
  save,
  create,
};
