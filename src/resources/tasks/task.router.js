const router = require('express').Router();
const HttpStatus = require('http-status-codes');

const tasksService = require('./task.service');

router.route('/:boardId/tasks').get(async (req, res) => {
  const tasks = await tasksService.getAll(req.params.boardId);
  res.status(HttpStatus.OK).json(tasks);
});

router.route('/:boardId/tasks/:id').get(async (req, res) => {
  const task = await tasksService.get(req.params.boardId, req.params.id);
  if (task) {
    res.status(HttpStatus.OK).json(task);
  } else {
    res.status(HttpStatus.NOT_FOUND).send();
  }
});

router.route('/:boardId/tasks').post(async (req, res) => {
  const task = await tasksService.create({ ...req.body, boardId: req.params.boardId });

  res.status(HttpStatus.OK).json(task);
});

router.route('/:boardId/tasks/:id').put(async (req, res) => {
  const task = await tasksService.update({ ...req.body, boardId: req.params.boardId });
  res.status(HttpStatus.OK).json(task);
});

router.route('/:boardId/tasks/:id').delete(async (req, res) => {
  await tasksService.remove(req.params.boardId, req.params.id);
  res.status(HttpStatus.OK).send();
});

module.exports = router;
