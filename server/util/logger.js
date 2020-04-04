const { createLogger, format, transports } = require('winston');

const { combine, timestamp, printf } = format;

module.exports = createLogger({
    level: 'debug',
    transports: [new transports.Console()],
    exitOnError: false,
    format: combine(
        timestamp({ format: 'HH:mm:ss.SSS' }),
        printf(info => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`)
    ),
});
