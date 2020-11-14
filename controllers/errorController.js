const logger = require('../utils/logger');
const AppError = require('../utils/appError');

// Error response for development with details
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

// Error response for production without error details
const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // Programming or other unknown error: don't leak error details
  // Log error
  logger.error('ERROR 💥', err);

  // Send generic message
  res.status(500).json({
    status: 'error',
    message: 'Something went very wrong!',
  });
};

const handleValidationErrorDB = (err) => new AppError(err.message, 400);
const handleCastErrorDB = (err) => new AppError(err.message, 400);

// global error handler
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    return sendErrorDev(err, res);
  }

  let error = Object.create(err);

  if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
  if (error.name === 'CastError') error = handleCastErrorDB(error);

  sendErrorProd(error, res);
};
