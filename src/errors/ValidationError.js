import AppError from "./AppError.js";

class ValidationError extends AppError {
    constructor(message, logMessage, logBody) {
        super(message, logMessage, logBody, 400);
    }
}

export default ValidationError;