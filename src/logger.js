import { createLogger, format, transports , addColors} from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const loggerLevels = {
    levels: {
        error: 0,
        warning: 1,
        info: 2
    }
};

const requestLevels = {
    levels: {
        delete: 0,
        update: 1,
        create: 2,
        get: 3
    }
};

const accessLevels = {
    levels: {
        access: 0,
        attempt: 1
    }
};

const consoleLevels = {
    levels: {
        error: 0,
        warning: 1,
        info: 2,
        devInfo: 2
    },
    colors: {
        error: 'bold white redBG',
        warning: 'bold white yellowBG',
        info: 'bold white greenBG',
        devInfo: 'bold white blueBG'
    }
};

addColors(consoleLevels.colors)

export const logger = createLogger({
    levels: loggerLevels.levels,
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A' }),
        format.splat(),
        format.simple(),
        format.align(),
        format.printf((info) => `[ ${info.timestamp} ] ${info.level}: \n${info.message}`)
    ),
    transports: [
        new DailyRotateFile({
            filename: 'logs/server-logs-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        })
    ]
});

export const requestLogger = createLogger({
    levels: requestLevels.levels,
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.splat(),
        format.simple()
    ),
    transports: [
        new DailyRotateFile({
            filename: 'logs/request-logs-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        })
    ]
});

export const accessLogger = createLogger({
    levels: accessLevels.levels,
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.splat(),
        format.simple()
    ),
    transports: [
        new DailyRotateFile({
            filename: 'logs/access-logs-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        })
    ]
});

export const consoleLogger = createLogger({
    levels: consoleLevels.levels,
    format: format.combine(
        format.colorize(),
        format.splat(),
        format.simple(),
        
    ),
    transports: [new transports.Console()]
});