const express = require('express');

const app = express();
app.use(express.json());

const talkerServices = require('./talkerServices');
const {
  validateEmail,
  validatePassword,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
} = require('./validations');

const talkValidation = [validateToken, validateName, validateAge, validateTalk];

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_NOT_FOUND_STATUS = 404;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_request, response) => {
  const talkerData = await talkerServices.getAllUsers();
  response.status(HTTP_OK_STATUS).send(talkerData);
});

app.get('/talker/:id', async (_request, response) => {
  const { id } = _request.params;
  const user = await talkerServices.getUserById(Number(id));
  if (!user) {
    return response.status(HTTP_NOT_FOUND_STATUS).send({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  response.status(HTTP_OK_STATUS).send(user);
});

app.post('/login', validateEmail, validatePassword, (_request, response) => {
  response.status(HTTP_OK_STATUS).send({
    token: talkerServices.generateRandomToken(),
  });
});

app.post('/talker', ...talkValidation, (_request, response) => {
  response.status(HTTP_CREATED_STATUS).send({
    message: 'ok',
  });
});

app.listen(PORT, () => {
  console.log('Online');
});
