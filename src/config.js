import fs from 'fs';

export default {
    SECRET: 'u9dYYqNP4582Dra22H21TyZTX',
    TOKENS_EXP: 30000,
    ALLOWED_ORIGINS: ['http://192.168.180.25:3091','http://localhost:3091'],
    APP_PORT: 3091,
    DB_PORT: 3306,
    DB_DIALECT: 'mysql',
    DB_HOST: 'localhost',
    DB_TIMEZONE: '-06:00',
    DB_DATABASE: 'dev_imduy_licencias',
    DB_USER: 'API',
    DB_PASSWORD: '()Xz[pM9nZ)O4D[V',
    HTTPS_OPTIONS: {
        key: fs.readFileSync('./src/certificate/server.key'),
        cert: fs.readFileSync('./src/certificate/server.crt')
    }
}