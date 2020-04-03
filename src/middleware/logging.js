const onFinished = require('on-finished');
const { logger } = require('../util');

module.exports = (req, res, next) => {
    const startTime = new Date().getTime();

    const print = () =>
        logger.log({
            message: `${req.method} ${req.originalUrl || req.url} ${req.body.method || '--'} ${res.statusCode} - ${
                new Date().getTime() - startTime
            }ms`,
            level: res.statusCode >= 400 ? 'error' : 'info',
        });

    onFinished(res, print);
    next();
};
