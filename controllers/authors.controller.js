const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Author = require('../models/Author.model');
const ErrorWithHTTPStatus = require('../utils/ErrorWithHttpStatus');

exports.signup = async (request, response, next) => {
  try {
    const hashPass = await bcrypt.hash(request.body.password, 2);
    await Author.insert({
      name: request.body.name,
      password: hashPass,
    });
    response.status(201).send('Signed up!');
  } catch (err) {
    next(err);
  }
};

exports.login = async (request, response, next) => {
  try {
    const author = await Author.select(request.body.name);
    if (!author) throw new ErrorWithHTTPStatus('Author DNE', 404);
    const isMatch = await bcrypt.compare(
      request.body.password,
      author.password
    );
    if (!isMatch) throw new ErrorWithHTTPStatus('Incorrect password', 401);
    const token = jwt.sign(author.name, process.env.JWT_SECRET);
    response.send({ message: 'Logged in!', token });
  } catch (err) {
    next(err);
  }
};
