const http = require('http');
const logger = require('./utils/logger');
const config = require('./utils/config');
const app = require('./app');
const connectDB = require('./utils/db');

// Uncaught exception handler
process.on('uncaughtException', (err) => {
  logger.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  logger.log(err.name, err.message);
  process.exit(1);
});

const server = http.createServer(app);

// Connect Database
connectDB();

const port = config.PORT;
server.listen(port, () => {
  logger.info(`🌟 Server is running on port ${port}`);
});

// Unhandled Promise Rejection handler
process.on('unhandledRejection', (error) => {
  logger.info('UNHANDLED REJECTION! 💥 Shutting down...');
  logger.error(error.name, error.message);
  server.close(() => {
    process.exit(1);
  });
});
