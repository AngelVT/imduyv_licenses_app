import app from './app.js';
import config from './config.js';
import https from 'https';

import { logger, consoleLogger} from './logger.js';

https.createServer(config.HTTPS_OPTIONS, app).listen(config.APP_PORT, error => {
    if (error) {
        consoleLogger.error('\n  Error starting HTTPS server: %s', error);
        logger.error('Error starting service on port %d', config.APP_PORT);
    } else {
        consoleLogger.info('\n  Server running on port %s', config.APP_PORT);
        logger.info('Service started on port %d', config.APP_PORT);
    }
});
/*app.listen(config.APP_PORT);
console.log("Server running on port: ", config.APP_PORT)*/