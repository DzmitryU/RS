const mongoRepository = require('./mongo/board.mongo.repository');
const mongoBoard = require('./mongo/models/board.mongo.model');

const memoryRepository = require('./memory/board.memory.repository');
const memoryBoard = require('./memory/models/board.memory.model');

module.exports = {
    repository: mongoRepository,
    Board: mongoBoard,
}