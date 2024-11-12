import fs from 'fs';

export default {
    TOKENS_EXP: 28800000,
    ALLOWED_ORIGINS: ['http://licencias.imduyv.gob.mx'],
    HTTPS_OPTIONS: {
        key: fs.readFileSync(process.env.CERT_KEY),
        cert: fs.readFileSync(process.env.CERT_CRT)
    }
}