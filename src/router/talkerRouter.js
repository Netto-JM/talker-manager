const { Router } = require('express');

const talkerRouter = Router();

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_NO_CONTENT_STATUS = 204;
const HTTP_NOT_FOUND_STATUS = 404;

const talkerServices = require('../talkerServices');
const {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateQuery,
} = require('../validations');

const talkValidation = [validateToken, validateName, validateAge, validateTalk];

const getSearch = async (request, response) => {
  const { q: query, rate } = request.query;
  const talkerData = await talkerServices.getAllUsers();
  const talkerUsersByName = await talkerServices.getUsersByName(query, talkerData);
  const talkerUsersByRate = await talkerServices.getUsersByRate(rate, talkerUsersByName);
  response.status(HTTP_OK_STATUS).send(talkerUsersByRate);
};

const getId = async (request, response) => {
  const { id } = request.params;
  const user = await talkerServices.getUserById(Number(id));
  if (!user) {
    return response.status(HTTP_NOT_FOUND_STATUS).send({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  response.status(HTTP_OK_STATUS).send(user);
};

const getTalker = async (_request, response) => {
  const talkerData = await talkerServices.getAllUsers();
  response.status(HTTP_OK_STATUS).send(talkerData);
};

const putId = async (request, response) => {
  const { id } = request.params;
  const user = await talkerServices.getUserById(Number(id));
  if (!user) {
    return response.status(HTTP_NOT_FOUND_STATUS).send({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  const userToEdit = request.body;
  const talkerUserWithId = { id: Number(id), ...userToEdit };
  talkerServices.editTalkerFile(talkerUserWithId);
  response.status(HTTP_OK_STATUS).send(talkerUserWithId);
};

const postTalker = async (request, response) => {
  const talkerUser = await talkerServices.editTalkerFile(request.body);
  response.status(HTTP_CREATED_STATUS).send(talkerUser);
};

const deleteId = async (request, response) => {
  const { id } = request.params;
  talkerServices.deleteTalkerUser(Number(id));
  response.status(HTTP_NO_CONTENT_STATUS).send();
};

talkerRouter.get('/search', validateToken, validateQuery, getSearch)
  .get('/:id', getId)
  .get('/', getTalker)
  .put('/:id', ...talkValidation, putId)
  .post('/', ...talkValidation, postTalker)
  .delete('/:id', validateToken, deleteId);

module.exports = {
  talkerRouter,
};