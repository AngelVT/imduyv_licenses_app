import { Sequelize } from "sequelize";

import * as loggerFunctions from "./libs/loggerFunctions.js";

const {
    DB_PORT,
    DB_HOST,
    DB_DIALECT,
    DB_DATABASE,
    DB_USER,
    DB_PASSWORD,
    DB_TIMEZONE
} = process.env;

if (!DB_PORT ||
    !DB_HOST ||
    !DB_DIALECT ||
    !DB_DATABASE ||
    !DB_USER ||
    !DB_PASSWORD ||
    !DB_TIMEZONE) {
    loggerFunctions.logConsoleError('Missing required environment variables',
        `    DB_PORT -> ${DB_PORT ? 'Defined' : 'Not defined'}
    DB_HOST -> ${DB_HOST ? 'Defined' : 'Not defined'}
    DB_DIALECT -> ${DB_DIALECT ? 'Defined' : 'Not defined'}
    DB_DATABASE -> ${DB_DATABASE ? 'Defined' : 'Not defined'}
    DB_USER -> ${DB_USER ? 'Defined' : 'Not defined'}
    DB_PASSWORD -> ${DB_PASSWORD ? 'Defined' : 'Not defined'}
    DB_TIMEZONE -> ${DB_TIMEZONE ? 'Defined' : 'Not defined'}`
    );
    process.exit(0);
}

export const pool =  new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
    logging: false,
    timezone: DB_TIMEZONE
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

export const closeDB = async () => {
    try {
        await pool.close();
        loggerFunctions.logConsoleInfo('DB connection closed successfully');
        loggerFunctions.logServerInfo('DB connection closed successfully', 
            `DB -> ${DB_DATABASE}
            Host -> ${DB_HOST}
            Port -> ${DB_PORT}`);
    } catch (error) {
        loggerFunctions.logConsoleError('Error closing DB connection', error);
        loggerFunctions.logServerError('Error closing DB connection', error);
    }
};