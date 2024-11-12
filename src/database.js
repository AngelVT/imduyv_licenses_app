import { Sequelize } from "sequelize";

import { logger, consoleLogger } from './logger.js';

const DB_PORT = process.env.DB_PORT;
const DB_DATABASE = process.env.DB_DATABASE;

export const pool =  new Sequelize(DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false,
    timezone: process.env.DB_TIMEZONE
});

export const checkDB = async () => {
    try {
        await pool.authenticate();
        //console.log("DB connection successful");
        consoleLogger.info("\n  DB connection successful");
        logger.info('DB connection successful\n    DB: %s\n    Port: %s', DB_DATABASE, DB_PORT);
    } catch (error) {
        consoleLogger.error('\n  Error connecting to the DB');
        logger.error('DB connection failure\n    DB: %s\n    Port: %s\n    Error: %s', DB_DATABASE, DB_PORT, error);
    }
};