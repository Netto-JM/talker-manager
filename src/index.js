const express = require('express');

const app = express();
app.use(express.json());

const talkerServices = require('./talkerServices');

const HTTP_OK_STATUS = 200;
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
    return response.status(404).send({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  response.status(200).send(user);
});

app.post('/login', async (_request, response) => {
  response.status(HTTP_OK_STATUS).send({
    token: talkerServices.generateRandomToken(),
  });
});

app.listen(PORT, () => {
  console.log('Online');
});
