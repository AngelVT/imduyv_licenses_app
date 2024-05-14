import { Sequelize } from "sequelize";
import config from "./config.js";

import { logger, consoleLogger } from './logger.js';

export const pool =  new Sequelize(config.DB_DATABASE, config.DB_USER, config.DB_PASSWORD, {
    host: config.DB_HOST,
    port: config.DB_PORT,
    dialect: config.DB_DIALECT,
    logging: false,
    timezone: config.DB_TIMEZONE
});

export const checkDB = async () => {
    try {
        await pool.authenticate();
        //console.log("DB connection successful");
        consoleLogger.info("\n  DB connection successful");
        logger.info('DB connection successful\n    DB: %s\n    Port: %s', config.DB_DATABASE, config.DB_PORT);
    } catch (error) {
        consoleLogger.error('\n  Error connecting to the DB');
        logger.error('DB connection failure\n    DB: %s\n    Port: %s\n    Error: %s', config.DB_DATABASE, config.DB_PORT, error);
    }
};