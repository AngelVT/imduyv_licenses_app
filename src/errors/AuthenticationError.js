import AppError from "./AppError.js";

class AuthenticationError extends AppError {
    constructor(message, logMessage, logBody, status = 401) {
        super(`Authentication error: ${message}`, logMessage, logBody, status);
    }
}

export default AuthenticationError;