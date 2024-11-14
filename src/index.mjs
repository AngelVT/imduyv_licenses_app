import app from './app.js';

import * as loggerFunctions from './libs/loggerFunctions.js';

/*https.createServer(config.HTTPS_OPTIONS, app).listen(config.APP_PORT, error => {
    if (error) {
        consoleLogger.error('\n  Error starting HTTPS server: %s', error);
        logger.error('Error starting service on port %d', config.APP_PORT);
    } else {
        consoleLogger.info('\n  Server running on port %s', config.APP_PORT);
        logger.info('Service started on port %d', config.APP_PORT);
    }
});*/
const PORT = process.env.APP_PORT;

try {
    app.listen(PORT);
    loggerFunctions.logConsoleInfo('Server running successfully on port ' + PORT);
    loggerFunctions.logServerInfo('Server started successfully', 'Port -> ' + PORT);
} catch (error) {
    loggerFunctions.logConsoleError('Server running on port ' + PORT);
    loggerFunctions.logServerError('Error starting server', error);
}