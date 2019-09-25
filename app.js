const express = require('express');
const cors = require('cors');
const router = require('./middleware/routes');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const app = express();

/* Middleware */
app.use(cors()); // Enables cors policy for network requests/responses
app.use(express.json()); // Parses requests with json payloads
app.use(logger);
app.use(router);
app.use(errorHandler);

module.exports = app;
