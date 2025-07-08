import * as loggerFunctions from './utilities/logger.utilities.js';
import app from './app.js';
import { closeDB } from './configuration/database.configuration.js';
import { APP_PORT, STORAGE_DIR, ADMIN_PASSWORD, SECRET, SECRET_DOC } from './configuration/environment.configuration.js';

if (!APP_PORT ||
    !STORAGE_DIR ||
    !ADMIN_PASSWORD ||
    !SECRET ||
    !SECRET_DOC) {
    loggerFunctions.logConsoleError('Missing required environment variables',
        `    APP_PORT -> ${APP_PORT ? 'Defined' : 'Not defined'}
    STORAGE_DIR -> ${STORAGE_DIR ? 'Defined' : 'Not defined'}
    ADMIN_PASSWORD -> ${ADMIN_PASSWORD ? 'Defined' : 'Not defined'}
    SECRET -> ${SECRET ? 'Defined' : 'Not defined'}
    SECRET_DOC -> ${SECRET_DOC ? 'Defined' : 'Not defined'}`
    );
    process.exit(1);
}

const server = app.listen(APP_PORT, () => {
    loggerFunctions.logConsoleInfo('Server listening on port ' + APP_PORT);
    loggerFunctions.logServerInfo('Server listening', 'Port -> ' + APP_PORT);
});

server.on('error',(error) => {
    if (error.code === 'EADDRINUSE') {
        loggerFunctions.logConsoleError('Server unable to start on port ' + APP_PORT + ' due to it is already in use', error);
        loggerFunctions.logServerError('Error starting server port already in use', error);
    } else {
        loggerFunctions.logConsoleError('Server unable to start on port ' + APP_PORT);
        loggerFunctions.logServerError('Error starting server', error);
    }
});

const shutdown = async () => {
    loggerFunctions.logServerInfo('Server Shutdown started', 'Clean up started');
    loggerFunctions.logConsoleWarning('Shutting down server...');

    await closeDB();

    server.close(() => {
        loggerFunctions.logConsoleInfo('HTTP server closed successfully');
        loggerFunctions.logServerShutdownInfo('Server Shutdown finished', 'Cleanup finished');
    });
};

process.on('SIGINT', shutdown); 
process.on('SIGTERM', shutdown);