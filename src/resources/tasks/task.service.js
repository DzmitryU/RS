const tasksRepo = require('./task.memory.repository');
const Task = require('./task.model');

const create = (createTaskDto) => tasksRepo.save(new Task(createTaskDto));

const getAll = (boardId) => tasksRepo.getAll(boardId);

const get = (boardId, id) => tasksRepo.get(boardId, id);

const remove = (boardId, id) => tasksRepo.remove(boardId, id);

const removeByBoard = async (boardId) => {
    const tasks = await getAll(boardId);
    tasks.forEach((task) => remove(boardId, task.id));
}

const update = (task) => tasksRepo.save(task);

module.exports = {
    create,
    getAll,
    get,
    remove,
    removeByBoard,
    update,
};
