const { Task, repository } = require('./dataStore');

const create = (createTaskDto) => repository.save(new Task(createTaskDto));

const getAll = (boardId) => repository.getAll(boardId);

const get = (boardId, id) => repository.get(boardId, id);

const remove = (boardId, id) => repository.remove(boardId, id);

const removeByBoard = async (boardId) => {
    const tasks = await getAll(boardId);
    tasks.forEach((task) => remove(boardId, task.id));
}

const update = (task) => repository.save(task);

const resetUser = async (userId) => {
    const tasks = await repository.getByKey('userId', userId);
    const jobs = tasks.map(
        (task) => repository.save({...task, userId : null }),
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
