const AppError = require('./appError');

const unknownEndpoint = (req, res, next) => {
  next(new AppError(`Can't find '${req.originalUrl}' on this server!`, 404));
};

module.exports = {
  unknownEndpoint,
};
