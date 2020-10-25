const { repository, Board } = require('./dataStore');
const taskService = require('../tasks/task.service')

const create = async (createBoardDto) => repository.create(createBoardDto);

const getAll = async () => repository.getAll();

const get = async (id) => repository.get(id);

const remove = async (id) => {
    await repository.remove(id);
    await taskService.removeByBoard(id);
}

const update = async (user) => repository.save(user);

module.exports = {
    create,
    getAll,
    get,
    remove,
    update,
};
