const uuid = require('uuid');

const Column = require('./column.memory.model');

class Board {
  constructor({
    id = uuid(),
    title,
    columns = [],
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map((column) => new Column(column));
  }
}

module.exports = Board;
