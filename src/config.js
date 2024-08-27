import fs from 'fs';

export default {
    SECRET: process.env.SECRET,
    TOKENS_EXP: 14400000,
    ALLOWED_ORIGINS: ['http://192.168.180.25:3091','http://localhost:3091'],
    APP_PORT: process.env.APP_PORT,
    DB_PORT: process.env.DB_PORT,
    DB_DIALECT: process.env.DB_DIALECT,
    DB_HOST: process.env.DB_HOST,
    DB_TIMEZONE: '-06:00',
    DB_DATABASE: process.env.DB_DATABASE,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    STORAGE_DIR: process.env.STORAGE_DIR,
    HTTPS_OPTIONS: {
        key: fs.readFileSync(process.env.CERT_KEY),
        cert: fs.readFileSync(process.env.CERT_CRT)
    }
}