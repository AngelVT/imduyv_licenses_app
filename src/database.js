import { Sequelize } from "sequelize";
import config from "./config.js";

import { logger } from './logger.js';

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
        console.log("DB connection successful");
        logger.info('DB connection successful DB: %s', config.DB_DATABASE);
    } catch (error) {
        console.log('Error connecting to the DB');
        logger.warn('DB connection failure\n DB: %s \n Error: %s\n', config.DB_DATABASE , error);
    }
};