const express = require('express');
const cors = require('cors');
const router = require('./middleware/routes');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json()); // Parses requests with json payloads
app.use(logger);
app.use(router);
app.use(errorHandler);

/* Application */
app.listen(process.env.PORT || 5000, () => {
  console.log('Snipps listening on port 5000');
});
