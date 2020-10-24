const memoryRepository = require('./memory/board.memory.repository');
const Board = require('./memory/models/board.memory.model');

module.exports = {
    repository: memoryRepository,
    Board,
}