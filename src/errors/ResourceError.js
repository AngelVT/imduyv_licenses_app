import AppError from "./AppError.js";

class ResourceError extends AppError {
    constructor(message, logMessage, logBody) {
        super(message, logMessage, logBody, 404);
    }
}

export default ResourceError;