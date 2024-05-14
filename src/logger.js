import { createLogger, format } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

export const logger = createLogger({
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.splat(),
        format.simple()
    ),
    transports: [
        new DailyRotateFile({
            filename: 'logs/test logs %DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        })
    ]
});