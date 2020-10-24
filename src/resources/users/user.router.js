const router = require('express').Router();
const HttpStatus = require('http-status-codes');

const User = require('./user.model');
const usersService = require('./user.service');
const { errorCatcher } = require('../../common/errorCatcher');

router.route('/').get(errorCatcher(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
}));

router.route('/:id').get(errorCatcher(async (req, res) => {
  const user = await usersService.get(req.params.id);
  if (user) {
    res.json(User.toResponse(user));
  } else {
    res.status(HttpStatus.NOT_FOUND).send();
  }
}));

router.route('/').post(errorCatcher(async (req, res) => {
  const user = await usersService.create(req.body);

  res.status(HttpStatus.OK).json(User.toResponse(user));
}));

router.route('/:id').put(errorCatcher(async (req, res) => {
  const user = await usersService.update(req.body);
  res.json(User.toResponse(user));
}));

router.route('/:id').delete(errorCatcher(async (req, res) => {
  await usersService.remove(req.params.id);
  res.status(HttpStatus.OK).send();
}));

module.exports = router;
