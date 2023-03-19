const { Router } = require('express');

const loginRouter = Router();

const HTTP_OK_STATUS = 200;

const { generateRandomToken } = require('../talkerServices');
const { validateEmail, validatePassword } = require('../validations');

const postLogin = (_request, response) => {
  response.status(HTTP_OK_STATUS).send({
    token: generateRandomToken(),
  });
};

loginRouter.post('/', validateEmail, validatePassword, postLogin);

module.exports = {
  loginRouter,
};