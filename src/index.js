require('dotenv').config();
require('./db');

const http = require('http');
const app = require('./app');
const { logger } = require('./util');

const server = http.createServer(app);

server.listen(8080, () => {
    logger.info('Started listening on port 8080!');
});
