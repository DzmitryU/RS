const boardsRepo = require('./board.memory.repository');
const Board = require('./models/board.model');
const taskService = require('../tasks/task.service')

const create = (createBoardDto) => boardsRepo.save(new Board(createBoardDto));

const getAll = () => boardsRepo.getAll();

const get = (id) => boardsRepo.get(id);

const remove = async (id) => {
    await boardsRepo.remove(id);
    await taskService.removeByBoard(id);
}

const update = (user) => boardsRepo.save(user);

module.exports = {
    create,
    getAll,
    get,
    remove,
    update,
};
