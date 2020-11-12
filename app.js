const express = require('express');
const morgan = require('morgan');
const middleware = require('./utils/middleware');

const app = express();

// Request logger
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello Ismile');
});

// Unknown endpoint handler
app.use(middleware.unknownEndpoint);

module.exports = app;
