const { repository } = require('./dataStore');

const create = async (createTaskDto) => repository.create(createTaskDto);

const getAll = async (boardId) => repository.getAll(boardId);

const get = async (boardId, id) => repository.get(boardId, id);

const remove = async (boardId, id) => repository.remove(boardId, id);

const removeByBoard = async (boardId) => {
    const tasks = await getAll(boardId);
    tasks.forEach((task) => remove(boardId, task.id));
}

const update = async (task) => repository.save(task);

const resetUser = async (userId) => {
    const tasks = await repository.getByKey('userId', userId);
    const jobs = tasks.map(
        (task) => repository.save({ id: task._id, userId : null }),
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
