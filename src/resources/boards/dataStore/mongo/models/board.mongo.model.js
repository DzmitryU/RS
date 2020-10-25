const mongoose = require('mongoose');
const uuid = require('uuid');

const ColumnSchema = require('./column.mongo.schema');

const boardSchema = {
  title: String,
  _id: {
    type: String,
    default: uuid
  },
  columns: [ColumnSchema]
};

const Board = mongoose.model('Board', boardSchema);

const toResponseColumn = ({ title, order, id }) => ({
  title,
  order,
  id,
})

Board.toResponse = ({ title, columns, _id }) => ({
  title,
  columns: columns.map(toResponseColumn),
  id: _id,
});

module.exports = Board;
