const http = require('http');
const logger = require('./utils/logger');
const config = require('./utils/config');
const app = require('./app');
const connectDB = require('./utils/db');

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
  logger.error(`${error.name}: ${error.message}`);
  server.close(() => {
    process.exit(1);
  });
});
