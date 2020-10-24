const router = require('express').Router({mergeParams: true});
const HttpStatus = require('http-status-codes');

const tasksService = require('./task.service');
const { errorCatcher } = require('../../common/errorCatcher');

router.route('/').get(errorCatcher(async (req, res) => {
  const tasks = await tasksService.getAll(req.params.boardId);
  res.status(HttpStatus.OK).json(tasks);
}));

router.route('/:id').get(errorCatcher(async (req, res) => {
  const task = await tasksService.get(req.params.boardId, req.params.id);
  if (task) {
    res.status(HttpStatus.OK).json(task);
  } else {
    res.status(HttpStatus.NOT_FOUND).send();
  }
}));

router.route('').post(errorCatcher(async (req, res) => {
  const task = await tasksService.create({ ...req.body, boardId: req.params.boardId });

  res.status(HttpStatus.OK).json(task);
}));

router.route('/:id').put(errorCatcher(async (req, res) => {
  const task = await tasksService.update({ ...req.body, boardId: req.params.boardId });
  res.status(HttpStatus.OK).json(task);
}));

router.route('/:id').delete(errorCatcher(async (req, res) => {
  await tasksService.remove(req.params.boardId, req.params.id);
  res.status(HttpStatus.OK).send();
}));

module.exports = router;
