const router = require('express').Router();
const HttpStatus = require('http-status-codes');

const boardsService = require('./board.service');
const taskRouter = require('../tasks/task.router')
const { Board } = require('./dataStore')
const { errorCatcher } = require('../../common/errorCatcher');

router.use('/:boardId/tasks', taskRouter);

router.route('/').get(errorCatcher(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(Board.toResponse));
}));

router.route('/:id').get(errorCatcher(async (req, res) => {
  const board = await boardsService.get(req.params.id);
  if (board) {
    res.json(Board.toResponse(board));
  } else {
    res.status(HttpStatus.NOT_FOUND).send();
  }
}));

router.route('/').post(errorCatcher(async (req, res) => {
  const board = await boardsService.create(req.body);

  res.status(HttpStatus.OK).json(Board.toResponse(board));
}));

router.route('/:id').put(errorCatcher(async (req, res) => {
  const board = await boardsService.update(req.body);

  res.json(board);
}));

router.route('/:id').delete(async (req, res) => {
  await boardsService.remove(req.params.id);
  res.status(HttpStatus.OK).send();
});

module.exports = router;
