import { Sequelize } from "sequelize";
import config from "./config.js";


async function createPool() {
    try {
        const DB = new Sequelize(config.DB_DATABASE, config.DB_USER, config.DB_PASSWORD, {
            host: config.DB_HOST,
            port: config.DB_PORT,
            dialect: config.DB_DIALECT,
            logging: false,
            timezone: config.DB_TIMEZONE
        });
        return DB;
    } catch (error) {
        console.log("The following error ocurred while crating connection pool.", error);
        return false;
    }
}

export const pool = await createPool();

export const checkDB = async () => {
    try {
        await pool.authenticate();
        console.log("DB connection successful");
    } catch (error) {
        console.log('Error checking DB connection: ', error);
    }
};