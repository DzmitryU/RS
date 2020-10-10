const usersRepo = require('./user.memory.repository');
const User = require('./user.model');

const create = (createUserDto) => usersRepo.save(new User(createUserDto));

const getAll = () => usersRepo.getAll();

const get = (id) => usersRepo.get(id);

const remove = (id) => usersRepo.remove(id);

const update = (user) => usersRepo.save(user);

module.exports = {
    create,
    getAll,
    get,
    remove,
    update,
};
