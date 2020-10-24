const { repository } = require('./dataStore');
const taskService = require('../tasks/task.service');

const create = (createUserDto) => repository.create(createUserDto);

const getAll = () => repository.getAll();

const get = (id) => repository.get(id);

const remove = async (id) => {
    await taskService.resetUser(id);
    await repository.remove(id);
}

const update = (user) => repository.save(user);

module.exports = {
    create,
    getAll,
    get,
    remove,
    update,
};
