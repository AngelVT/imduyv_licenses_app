import { accessLogger, logger, httpLogger, requestLogger, consoleLogger } from "../configuration/logger.configuration.js";

//console logging functions
export function logConsoleError(message, error) {
    consoleLogger.error(`\n  ${message}\n  Details:\n%s`, error);
}

export function logConsoleWarning(message, details) {
    consoleLogger.warning(`\n  ${message}${!details ? '' : ':\n  Details:\n  %s'}`, details);
}

export function logConsoleInfo(message, details) {
    consoleLogger.info(`\n  ${message}${!details ? '' : ':\n  Details:\n  %s'}`, details);
}

export function logConsoleApp(message) {
    consoleLogger.app(`\n  ${message}`);
}

export function logConsoleApi(message) {
    consoleLogger.api(`\n  ${message}`);
}

//server logging functions
export function logServerError(message, error) {
    logger.error(`${message}.\n    Error details: %s`, error);
}

export function logServerWarning(message, details) {
    logger.warning(`${message}.\n    Warning details:\n        %s`, details);
}

export function logServerInfo(message, details) {
    logger.info(`${message}.\n    Info details:\n        %s`, details);
}

export function logServerHttp(message, details) {
    httpLogger.info(`${message}`, details);
}

export function logServerShutdownInfo(message, details) {
    logger.info(`${message}.\n    Info details:\n        %s`, details);
    logger.on('finish', ()=> {
        process.exit(0);
    });
}

//access logging functions
export function logAccessError(message, error) {
    accessLogger.error(`${message}.\n    Error details: %s`, error);
}

export function logAccessWarning(message, details) {
    accessLogger.warning(`${message}.\n    Warning details:\n        %s`, details);
}

export function logAccessInfo(message, details) {
    accessLogger.info(`${message}.\n    Info details:\n        %s`, details);
}

//request logging functions
export function logRequestError(message, error) {
    requestLogger.error(`${message}.\n    Error details: %s`, error);
}

export function logRequestWarning(message, details) {
    requestLogger.warning(`${message}.\n    Warning details:\n        %s`, details);
}

export function logRequestInfo(message, details) {
    requestLogger.info(`${message}.\n    Info details:\n        %s`, details);
}