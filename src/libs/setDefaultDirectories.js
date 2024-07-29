import fs from 'fs';
import path from 'path';
import { __dirstorage } from '../paths.js';
import { consoleLogger, logger } from '../logger.js';

export const setDefaultDirectories = async () => {
    createDirectory('assets/land', "Land use")
    createDirectory('assets/urban', "Urban")
    createDirectory('official', "Officials")
}

function createDirectory(dir, subject) {
    const directoryPath = path.join(__dirstorage, dir);

    fs.access(directoryPath, fs.constants.F_OK, (err) => {
        if (err) {
            fs.mkdir(directoryPath, { recursive: true }, (err) => {
                if (err) {
                    logger.error(`Error creating ${subject} storage directory:\n%s`, err);
                    consoleLogger.error(`\n  Error creating ${subject} storage directory:\n  Error: %s`, err);
                } else {
                    logger.info(`${subject} storage directory was created`);
                    consoleLogger.info(`\n  ${subject} storage directory was created`);
                }
            });
        } else {
            consoleLogger.info(`\n  ${subject} storage directory already exists`);
        }
    });
}