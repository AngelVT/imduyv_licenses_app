import AppError from "./AppError.js";

class DatabaseError extends AppError {
    constructor(message, logMessage, logBody) {
        super(`Database error: ${message}`, logMessage, logBody, 500);
    }
}

export default DatabaseError;