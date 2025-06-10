import AppError from "./AppError.js";

class FileSystemError extends AppError {
    constructor(message, logMessage, logBody) {
        super(`File System error: ${message}`, logMessage, logBody, 500);
    }
}

export default FileSystemError;