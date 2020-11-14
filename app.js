const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const middleware = require('./utils/middleware');
const carsRouter = require('./routes/carRoutes');
const manufacturersRouter = require('./routes/manufacturerRoutes');
const errorController = require('./controllers/errorController.js');

const app = express();

// Request logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser, reading data from body and attached into req.body
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
);

// app routes
app.use('/api/v1/cars', carsRouter);
app.use('/api/v1/manufacturers', manufacturersRouter);

// Unknown endpoint handler
app.use(middleware.unknownEndpoint);

// Global error handler
app.use(errorController);

module.exports = app;
