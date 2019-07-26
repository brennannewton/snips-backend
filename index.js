const express = require('express');
const router = require('./middleware/routes');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const app = express();

/* Middleware */
app.use(express.json()); // Parses requests with json payloads
app.use(logger);
app.use(router);
app.use(errorHandler);

/* Application */
app.listen(5000, () => {
  console.log('Snipps listening on port 5000');
});
