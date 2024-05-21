import fs from 'fs';
import path from 'path';
import { __dirstorage } from '../paths.js';
import { consoleLogger, logger } from '../logger.js';

export const setUrbanStorage = async () => {
    const directoryPath = path.join(__dirstorage, 'zones', 'urban');

    fs.access(directoryPath, fs.constants.F_OK, (err) => {
        if (err) {
            fs.mkdir(directoryPath, { recursive: true }, (err) => {
                if (err) {
                    logger.error('Error creating urban storage directory:\n    Error: %s', err);
                    consoleLogger.error('\n  Error creating land use storage directory:\n  Error: %s', err);
                } else {
                    logger.info('Urban storage directory was created');
                    consoleLogger.info('\n  Urban storage directory was created');
                }
            });
        } else {
            consoleLogger.info('\n  Urban storage directory already exists');
        }
    });
}

export const setLandStorage = async () => {
    const directoryPath = path.join(__dirstorage, 'zones', 'land');

    fs.access(directoryPath, fs.constants.F_OK, (err) => {
        if (err) {
            fs.mkdir(directoryPath, { recursive: true }, (err) => {
                if (err) {
                    logger.error('Error creating land use storage directory:\n%s', err);
                    consoleLogger.error('\n  Error creating land use storage directory:\n  Error: %s', err);
                } else {
                    logger.info('Land use storage directory was created');
                    consoleLogger.info('\n  Land use storage directory was created');
                }
            });
        } else {
            consoleLogger.info('\n  Land use storage directory already exists');
        }
    });
}