import app from './app.js';
import https from 'https';
import fs from 'fs';
import { closeDB } from './database.js';

import * as loggerFunctions from './libs/loggerFunctions.js';

const { APP_PORT, CERT_KEY, CERT_CRT } = process.env;

if (!APP_PORT || !CERT_KEY || !CERT_CRT) {
    loggerFunctions.logConsoleError('Missing required environment variables.');
    loggerFunctions.logServerError('Unable to start server due to missing environment variables.');
    process.exit(1);
}

let privateKey, certificate;
try {
    privateKey = fs.readFileSync(CERT_KEY);
    certificate = fs.readFileSync(CERT_CRT);
} catch (error) {
    loggerFunctions.logConsoleError('Error reading certificate files.');
    loggerFunctions.logServerError('Error reading SSL certificates', error);
    process.exit(1);
}

const server = https.createServer({ key: privateKey, cert: certificate }, app)

server.listen(APP_PORT, error => {
    if (error) {
        loggerFunctions.logConsoleError('Server unable to start on port ' + APP_PORT);
        loggerFunctions.logServerError('Error starting server', error);
    } else {
        loggerFunctions.logConsoleInfo('Server running successfully on port ' + APP_PORT);
        loggerFunctions.logServerInfo('Server started successfully', 'Port -> ' + APP_PORT);
    }
});

const shutdown = async () => {
    loggerFunctions.logConsoleWarning('Shutting down server...');
    loggerFunctions.logServerInfo('Server Shutdown started', 'Clean up started');

    await closeDB();

    server.close(() => {
        loggerFunctions.logConsoleInfo('HTTP server closed successfully');
        loggerFunctions.logServerInfo('Server Shutdown finished', 'Cleanup finished')
        process.exit(0);
    });
};

process.on('SIGINT', shutdown); 
process.on('SIGTERM', shutdown);