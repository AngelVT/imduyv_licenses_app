class AppError extends Error {
    constructor(message, logMessage, logBody, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        this.logMessage = logMessage;
        this.logBody = logBody;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;