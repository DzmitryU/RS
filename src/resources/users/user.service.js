const bcrypt = require('bcrypt');

const { repository } = require('./dataStore');
const taskService = require('../tasks/task.service');
const { SALT_ROUNDS } = require('../../common/constants');

const create = async (createUserDto) => {
    const hash = await bcrypt.hash(createUserDto.password, SALT_ROUNDS);
    return repository.create({...createUserDto, password: hash });
}

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
