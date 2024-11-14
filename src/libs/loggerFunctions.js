import { accessLogger, logger, requestLogger, consoleLogger } from "../logger.js";

//console logging functions
export function logConsoleError(message, error) {
    consoleLogger.error(`\n  ${message}.\n  Details:\n%s`, error);
}

export function logConsoleWarning(message, details) {
    consoleLogger.warning(`\n  ${message}.${!details ? '' : ':\n  Details:\n  %s'}`, details);
}

export function logConsoleInfo(message, details) {
    consoleLogger.info(`\n  ${message}.${!details ? '' : ':\n  Details:\n  %s'}`, details);
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