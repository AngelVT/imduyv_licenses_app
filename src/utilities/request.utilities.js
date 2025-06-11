import * as logger from './logger.utilities.js';
import ValidationError from '../errors/ValidationError.js';
import ResourceError from '../errors/ResourceError.js';
import AuthenticationError from '../errors/AuthenticationError.js';
import DatabaseError from '../errors/DatabaseError.js';
import FileSystemError from '../errors/FileSystemError.js';

export function requestHandler(requestFn) {
    return async (req, res) => {
        try {
            await requestFn(req, res);
        } catch (error) {
            if (error instanceof ValidationError || error instanceof ResourceError) {
                logger.logRequestError(error.logMessage, error.logBody)
                return res.status(error.statusCode).json({ msg: error.message });
            }

            if (error instanceof DatabaseError || error instanceof FileSystemError) {
                logger.logServerError(error.logMessage, error.logBody);
                return res.status(error.statusCode).json({ msg: error.message });
            }

            if (error instanceof AuthenticationError) {
                logger.logAccessInfo(error.logMessage, error.logBody);
                return res.status(error.statusCode).json({ msg: error.message });
            }

            logger.logConsoleError("Error during request", error);
            logger.logServerError('Unknown error', error);
            return res.status(500).json({ msg: "Unknown server error" });
        }
    }
}