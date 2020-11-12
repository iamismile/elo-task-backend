const express = require('express');
const morgan = require('morgan');

const middleware = require('./utils/middleware');
const carsRouter = require('./routes/carRoutes');

const app = express();

// Request logger
app.use(morgan('dev'));

// Body parser, reading data from body into req.body
app.use(express.json());

app.use('/api/v1/cars', carsRouter);

// Unknown endpoint handler
app.use(middleware.unknownEndpoint);

module.exports = app;
