const logger = require('../utils/logger');

module.exports = (err, req, res, next) => {
  logger.error(err);
  res.json(err);
};
