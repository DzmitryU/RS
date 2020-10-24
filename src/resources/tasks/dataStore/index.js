const memoryRepository = require('./memory/task.memory.repository');
const memoryTask = require('./memory/task.memory.model');

module.exports = {
    repository: memoryRepository,
    Task: memoryTask,
}