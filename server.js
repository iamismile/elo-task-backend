const http = require('http');
const logger = require('./utils/logger');
const config = require('./utils/config');
const app = require('./app');

const server = http.createServer(app);

const port = config.PORT;
server.listen(port, () => {
  logger.info(`🌟 Server is running on port ${port}`);
});
