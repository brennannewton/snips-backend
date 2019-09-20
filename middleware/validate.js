const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {
  const auth = request.headers.authorization;
  if (!auth) return response.send(401);
  const token = auth.split(' ')[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    response.send(401);
  }
};
