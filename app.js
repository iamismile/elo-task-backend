const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const middleware = require('./utils/middleware');
const carsRouter = require('./routes/carRoutes');
const manufacturersRouter = require('./routes/manufacturerRoutes');
const errorController = require('./controllers/errorController.js');

const app = express();

// GLOBAL MIDDLEWARES
app.use(cors()); // implement cors
app.options('*', cors());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // request logger
}
app.use(express.json()); // parse data from client
// configure file upload
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
);

// app routes
app.use('/api/v1/cars', carsRouter);
app.use('/api/v1/manufacturers', manufacturersRouter);

// unknown endpoint handler
app.use(middleware.unknownEndpoint);

// global error handler
app.use(errorController);

module.exports = app;
