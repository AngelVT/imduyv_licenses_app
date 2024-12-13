import app from './app.js';
import https from 'https';
import fs from 'fs';
import { closeDB } from './configuration/database.configuration.jsW';

import * as loggerFunctions from './utilities/logger.utilities.js';

const { 
    APP_PORT,
    CERT_KEY,
    CERT_CRT,
    STORAGE_DIR,
    ADMIN_PASSWORD,
    SECRET,
    SECRET_DOC
} = process.env;

if (!APP_PORT ||
    !CERT_KEY ||
    !CERT_CRT ||
    !STORAGE_DIR ||
    !ADMIN_PASSWORD ||
    !SECRET ||
    !SECRET_DOC) {
    loggerFunctions.logConsoleError('Missing required environment variables',
    `    APP_PORT -> ${APP_PORT ? 'Defined' : 'Not defined'}
    CERT_KEY -> ${CERT_KEY ? 'Defined' : 'Not defined'}
    CERT_CRT -> ${CERT_CRT ? 'Defined' : 'Not defined'}
    STORAGE_DIR -> ${STORAGE_DIR ? 'Defined' : 'Not defined'}
    ADMIN_PASSWORD -> ${ADMIN_PASSWORD ? 'Defined' : 'Not defined'}
    SECRET -> ${SECRET ? 'Defined' : 'Not defined'}
    SECRET_DOC -> ${SECRET_DOC ? 'Defined' : 'Not defined'}`
    );
    process.exit(1);
}

let privateKey, certificate;
try {
    privateKey = fs.readFileSync(CERT_KEY);
    certificate = fs.readFileSync(CERT_CRT);
} catch (error) {
    loggerFunctions.logConsoleError('Error SSL certificate files.', error);
    loggerFunctions.logServerError('Error reading SSL certificate files', error);
}

const server = https.createServer({ key: privateKey, cert: certificate }, app);

server.listen(APP_PORT,() => {
    loggerFunctions.logConsoleInfo('Server listening  on port ' + APP_PORT);
    loggerFunctions.logServerInfo('Server server listening', 'Port -> ' + APP_PORT);
});

server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        loggerFunctions.logConsoleError('Server unable to start on port ' + APP_PORT + ' due to it is already in use', error);
        loggerFunctions.logServerError('Error starting server port already in use', error);
    } else {
        loggerFunctions.logConsoleError('Server unable to start on port ' + APP_PORT);
        loggerFunctions.logServerError('Error starting server', error);
    }
});

const shutdown = async () => {
    loggerFunctions.logConsoleWarning('Shutting down server...');
    loggerFunctions.logServerInfo('Server Shutdown started', 'Clean up started');

    await closeDB();

    server.close(() => {
        loggerFunctions.logConsoleInfo('HTTP server closed successfully');
        loggerFunctions.logServerShutdownInfo('Server Shutdown finished', 'Cleanup finished');
    });
};

process.on('SIGINT', shutdown); 
process.on('SIGTERM', shutdown)