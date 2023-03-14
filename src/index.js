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

app.listen(PORT, () => {
  console.log('Online');
});
