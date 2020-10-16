const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    transports: [
        new transports.Console({
            format: format.combine(
                format.timestamp({format:'YYYY-MM-DD: hh:mm:ss.SSS'}),
                format.colorize(),
                format.simple()
            )
        })
    ]
});

const monitorRequests = (req, res, next) => {
    logger.info(`${req.method} ${req.url} - query params: ${JSON.stringify(req.query)} - body: ${JSON.stringify(req.body)}`);

    next();
};

module.exports = {
    monitorRequests,
    logger,
};
