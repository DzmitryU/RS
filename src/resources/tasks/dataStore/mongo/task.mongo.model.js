const mongoose = require('mongoose');
const uuid = require('uuid');

const taskSchema = {
  title: String,
  order: Number,
  description: String,
  userId: String,
  boardId: String,
  columnId: String,
  _id: {
    type: String,
    default: uuid
  }
};

const Task = mongoose.model('Task', taskSchema);

Task.toResponse = ({ title, order, description, userId, boardId, columnId, _id}) => ({
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
  id: _id,
});

module.exports = Task;
