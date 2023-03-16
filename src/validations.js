const HTTP_OK_STATUS = 200;
const HTTP_BAD_REQUEST_STATUS = 400;
const HTTP_UNAUTHORIZED_STATUS = 401;

const checkStringLength = (string, length) => (string.length >= length);

const checkIntegerRange = (integer, minLength, maxLength = Infinity) => {
  const isValidTypeRate = Number.isInteger(integer);
  const isValidRangeRate = integer >= minLength && integer <= maxLength;
  return isValidTypeRate && isValidRangeRate;
};

const checkEmailValidation = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateEmail = (request, response, next) => {
  const hasEmail = Object.prototype.hasOwnProperty.call(request.body, 'email');
  if (!hasEmail) {
    return response.status(HTTP_BAD_REQUEST_STATUS).send({
      message: 'O campo "email" é obrigatório',
    });
  }

  const isValidEmail = checkEmailValidation(request.body.email);
  if (!isValidEmail) {
    return response.status(HTTP_BAD_REQUEST_STATUS).send({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  next();
};

const validatePassword = (request, response, next) => {
  const hasPassword = Object.prototype.hasOwnProperty.call(request.body, 'password');
  if (!hasPassword) {
    return response.status(HTTP_BAD_REQUEST_STATUS).send({
      message: 'O campo "password" é obrigatório',
    });
  }

  const isValidPassword = checkStringLength(request.body.password, 6);
  if (!isValidPassword) {
    return response.status(HTTP_BAD_REQUEST_STATUS).send({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
  next();
};

const checkTokenValidation = (token) => {
  const VALID_TOKEN_LENGTH = 16;
  const isValidTypeToken = typeof (token) === 'string';
  const isValidLengthToken = token.length === VALID_TOKEN_LENGTH;
  return isValidTypeToken && isValidLengthToken;
};

const validateToken = (request, response, next) => {
  const hasToken = Object.prototype.hasOwnProperty.call(request.headers, 'authorization');
  if (!hasToken) {
    return response.status(HTTP_UNAUTHORIZED_STATUS).send({
      message: 'Token não encontrado',
    });
  }

  const isValidToken = checkTokenValidation(request.headers.authorization);
  if (!isValidToken) {
    return response.status(HTTP_UNAUTHORIZED_STATUS).send({
      message: 'Token inválido',
    });
  }
  next();
};

const validateName = (request, response, next) => {
  const hasName = Object.prototype.hasOwnProperty.call(request.body, 'name');
  if (!hasName) {
    return response.status(HTTP_BAD_REQUEST_STATUS).send({
      message: 'O campo "name" é obrigatório',
    });
  }

  const isValidName = checkStringLength(request.body.name, 3);
  if (!isValidName) {
    return response.status(HTTP_BAD_REQUEST_STATUS).send({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
  next();
};

const validateAge = (request, response, next) => {
  const hasAge = Object.prototype.hasOwnProperty.call(request.body, 'age');
  if (!hasAge) {
    return response.status(HTTP_BAD_REQUEST_STATUS).send({
      message: 'O campo "age" é obrigatório',
    });
  }

  const isValidAge = checkIntegerRange(request.body.age, 18);
  if (!isValidAge) {
    return response.status(HTTP_BAD_REQUEST_STATUS).send({
      message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
    });
  }
  next();
};

const checkDateValidation = (date) => {
  const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  return dateRegex.test(date);
};

const validateWatchedAt = (talk) => {
  const hasWatchedAt = Object.prototype.hasOwnProperty.call(talk, 'watchedAt');
  if (!hasWatchedAt) {
    return {
      isValideWatchedAt: false,
      payload: { message: 'O campo "watchedAt" é obrigatório' },
    };
  }

  const isValidDate = checkDateValidation(talk.watchedAt);
  if (!isValidDate) {
    return {
      isValideWatchedAt: false,
      payload: {
        message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
      },
    };
  }
  return { isValideWatchedAt: true };
};

const validateRate = (talk) => {
  const hasRate = Object.prototype.hasOwnProperty.call(talk, 'rate');
  if (!hasRate) {
    return {
      isValideRate: false,
      payload: { message: 'O campo "rate" é obrigatório' },
    };
  }

  const isValidRate = checkIntegerRange(talk.rate, 1, 5);
  if (!isValidRate) {
      return {
      isValideRate: false,
      payload: {
        message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
      },
    };
  }
  return { isValideRate: true };
};

const validateQuery = (request, response, next) => {
  const { q: query, rate } = request.query;
  const noQuery = (typeof query === 'undefined');
  const noRate = (typeof rate === 'undefined');
  const noQueries = noQuery && noRate;
  if (noQueries) return response.status(HTTP_OK_STATUS).send([]);
  if (noRate) return next();
  const isValidRate = checkIntegerRange(+request.query.rate, 1, 5);
  if (!isValidRate) {
    return response.status(HTTP_BAD_REQUEST_STATUS).send({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }
  next();
};

const validateTalk = (request, response, next) => {
  const hasTalk = Object.prototype.hasOwnProperty.call(request.body, 'talk');
  if (!hasTalk) {
    return response.status(HTTP_BAD_REQUEST_STATUS).send({
      message: 'O campo "talk" é obrigatório',
    });
  }

  const watchedAtValidation = validateWatchedAt(request.body.talk);
  if (!watchedAtValidation.isValideWatchedAt) {
    return response.status(HTTP_BAD_REQUEST_STATUS).send(watchedAtValidation.payload);
  }

  const rateValidation = validateRate(request.body.talk);
  if (!rateValidation.isValideRate) {
    return response.status(HTTP_BAD_REQUEST_STATUS).send(rateValidation.payload);
  }

  next();
};

module.exports = {
  validateEmail,
  validatePassword,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateQuery,
};
