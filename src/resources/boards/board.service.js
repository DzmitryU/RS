const { repository, Board } = require('./dataStore');
const taskService = require('../tasks/task.service')

const create = (createBoardDto) => repository.save(new Board(createBoardDto));

const getAll = () => repository.getAll();

const get = (id) => repository.get(id);

const remove = async (id) => {
    await repository.remove(id);
    await taskService.removeByBoard(id);
}

const update = (user) => repository.save(user);

module.exports = {
    create,
    getAll,
    get,
    remove,
    update,
};
