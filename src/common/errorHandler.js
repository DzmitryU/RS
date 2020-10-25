const HttpStatus = require('http-status-codes');

const { logger } = require('./logger')

const errorHandler =(err, req, res, next) => {
    logger.error(`Unhandled server error ${err.message} - ${JSON.stringify(err.stack)}`);

    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Unhandled server error');
}

module.exports = {
    errorHandler
}

process.on('uncaughtException', err => {
    logger.error(`Uncaught exception: ${err.message} - ${JSON.stringify(err.stack)}`);
});

process.on('unhandledRejection', (err) => {
    logger.error(
        `Unhandled rejection: ${err.message} - ${JSON.stringify(err.stack)}`
    );
});