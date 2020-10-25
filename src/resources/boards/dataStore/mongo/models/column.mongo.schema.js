const uuid = require('uuid');

const ColumnSchema = {
  title: String,
  order: Number,
  id: {
    type: String,
    default: uuid
  }
}

module.exports = ColumnSchema;
