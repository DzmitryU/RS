const memoryRepository = require('./memory/user.memory.repository');
const memoryUser = require('./memory/user.memory.model');

const mongoRepository = require('./mongo/user.mongo.repository');
const mongoUser = require('./mongo/user.model');

module.exports = {
    repository: mongoRepository,
    User: mongoUser,
}