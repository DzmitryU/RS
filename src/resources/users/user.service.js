const { repository: usersRepo} = require('./dataStore');
const User = require('./dataStore/memory/user.model');
const taskService = require('../tasks/task.service');

const create = (createUserDto) => usersRepo.save(new User(createUserDto));

const getAll = () => usersRepo.getAll();

const get = (id) => usersRepo.get(id);

const remove = async (id) => {
    await taskService.resetUser(id);
    await usersRepo.remove(id);
}

const update = (user) => usersRepo.save(user);

module.exports = {
    create,
    getAll,
    get,
    remove,
    update,
};
