const mongoose = require('mongoose');
const config = require('./config');
const logger = require('./logger');

const url = config.DATABASE_URI.replace('<PASSWORD>', config.DATABASE_PASSWORD);

const connectDB = async () => {
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  logger.info('⚡ MongoDB Database connected');
};

module.exports = connectDB;
