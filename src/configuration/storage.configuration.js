import fs from 'fs';
import path from 'path';
import { __dirstorage } from '../path.configuration.js';
import * as logger from '../utilities/logger.utilities.js';

export const setDefaultDirectories = async () => {
    createDirectory('assets/land', "Land use");
    createDirectory('assets/urban', "Urban");
    createDirectory('official', "Officials");
}

function createDirectory(dir, subject) {
    const directoryPath = path.join(__dirstorage, dir);

    fs.access(directoryPath, fs.constants.F_OK, (err) => {
        if (err) {
            fs.mkdir(directoryPath, { recursive: true }, (err) => {
                if (err) {
                    logger.logServerError(`Error creating ${subject} storage directory`, err);
                    logger.logConsoleError(`Error creating ${subject} storage directory`, err);
                } else {
                    logger.logServerInfo(`${subject} storage directory was created`, `Directory for ${subject} -> ${directoryPath}`);
                    logger.logConsoleInfo(`${subject} storage directory was created`);
                }
            });
        } else {
            logger.logConsoleInfo(`${subject} storage directory already exists`);
        }
    });
}