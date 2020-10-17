const { PORT } = require('./common/config');
const app = require('./app');
const { logger } = require('./common/logger');

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);

process
    .on('unhandledRejection', (error, ) => {
        logger.error(`Unhandled Rejection at Promise ${error}`);
    })
    .on('uncaughtException', error => {
        logger.error(`Uncaught Exception thrown ${error.message}`);
        process.exit(1);
    });

// uncaughtException
// throw Error('Oops!');

// unhandledRejection
// Promise.reject('Reason for fail');