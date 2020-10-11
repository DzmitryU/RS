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

const resetUser = async (userId) => {
    const tasks = await tasksRepo.getByKey('userId', userId);
    const jobs = tasks.map(
        (task) => tasksRepo.save({...task, userId : null }),
    );
    await Promise.all(jobs);
}

module.exports = {
    create,
    getAll,
    get,
    remove,
    removeByBoard,
    update,
    resetUser,
};
