import { Sequelize } from "sequelize";

import { logger, consoleLogger } from './logger.js';
import * as loggerFunctions from "./libs/loggerFunctions.js";

const DB_PORT = process.env.DB_PORT;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;

export const pool =  new Sequelize(DB_DATABASE, DB_USER, process.env.DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false,
    timezone: process.env.DB_TIMEZONE
});

export const checkDB = async () => {
    try {
        await pool.authenticate();
        loggerFunctions.logConsoleInfo('DB connection successful');
        loggerFunctions.logServerInfo('DB connection successful',
            `DB -> ${DB_DATABASE}
        Host -> ${DB_HOST}
        Port -> ${DB_PORT}
        User -> ${DB_USER}`);
    } catch (error) {
        loggerFunctions.logConsoleError('Error connecting to the DB', 
            `        DB -> ${DB_DATABASE}
        Host -> ${DB_HOST}
        Port -> ${DB_PORT}
        User -> ${DB_USER}
        
        Error -> ${error}`);
        loggerFunctions.logServerError(`Database connection failure.
        DB -> ${DB_DATABASE}
        Host -> ${DB_HOST}
        Port -> ${DB_PORT}
        User -> ${DB_USER}`, error);
    }
};