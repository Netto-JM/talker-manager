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

module.exports = {
  validateEmail,
  validatePassword,
};
