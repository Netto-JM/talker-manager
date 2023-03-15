// isValidDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

const validateEmail = (request, response, next) => {
  const hasEmail = Object.prototype.hasOwnProperty.call(request.body, 'email');
  if (!hasEmail) {
    return response.status(400).send({
      message: 'O campo \'email\' é obrigatório',
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailRegex.test(request.body.email);
  if (!isValidEmail) {
    return response.status(400).send({
      message: 'O \'email\' deve ter o formato \'email@email.com\'',
    });
  }
  next();
};

const validatePassword = (request, response, next) => {
  const hasPassword = Object.prototype.hasOwnProperty.call(request.body, 'password');
  if (!hasPassword) {
    return response.status(400).send({
      message: 'O campo \'password\' é obrigatório',
    });
  }

  const isValidPassword = request.body.password.length >= 6;
  if (!isValidPassword) {
    return response.status(400).send({
      message: 'O \'password\' deve ter pelo menos 6 caracteres',
    });
  }
  next();
};

const validateToken = (request, response, next) => {
  const hasToken = Object.prototype.hasOwnProperty.call(request.headers, 'authorization');
  if (!hasToken) {
    return response.status(401).send({
      message: 'Token não encontrado',
    });
  }

  const {authorization: token} = request.headers
  const VALID_TOKEN_LENGTH = 16
  const isValidTypeToken = typeof (token) === 'string';
  const isValidLengthToken = token.length === VALID_TOKEN_LENGTH
  const isValidToken = isValidTypeToken && isValidLengthToken;
  if (!isValidToken) {
    return response.status(401).send({
      message: 'Token inválido',
    });
  }
  next();
};

module.exports = {
  validateEmail,
  validatePassword,
  validateToken,
};
