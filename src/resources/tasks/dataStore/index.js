const memoryRepository = require('./memory/task.memory.repository');
const memoryTask = require('./memory/task.memory.model');

const mongoRepository = require('./mongo/task.mongo.repository');
const mongoTask = require('./mongo/task.mongo.model');

module.exports = {
    repository: mongoRepository,
    Task: mongoTask,
}