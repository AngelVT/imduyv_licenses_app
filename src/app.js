import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import path from 'path';

import config from './configuration/general.configuration.js';
import { __dirname, __dirstorage } from './path.configuration.js';
import { checkDB } from './configuration/database.configuration.js';
import { setDBDefaults } from './configuration/databaseValues.configuration.js';
import { setDefaultDirectories } from './configuration/storage.configuration.js';
import { verifyToken, verifyGroup } from './middlewares/auth.JWT.js';
import { NODE_ENV, SECRET_COOKIE } from './configuration/environment.configuration.js';

import helmetMiddleware from './configuration/helmet.configuration.js';
import landuseRoutes from './routes/landuse.routes.js';
import legacyRoutes from './routes/land-legacy.routes.js';
import urbanRoutes from './routes/urban.routes.js';
import consultantRoutes from './routes/consultant.routes.js';
import userRoutes from './routes/users.routes.js';
import authRoutes from './routes/auth.routes.js';
import appRoutes from './routes/app.routes.js';
import testRoutes from './routes/test.routes.js';
import geoRoutes from './routes/geo.routes.js';
import administrationRoutes from './routes/administration.routes.js';
import notificationRoutes from './routes/notification.routes.js';
import { logConsoleApi, logConsoleApp, logServerHttp } from './utilities/logger.utilities.js';

const app = express();
app.set('trust proxy', 1);

checkDB();

setDBDefaults();
setDefaultDirectories();

app.use(helmetMiddleware);

/*if (NODE_ENV === 'production') {
    app.use(rateLimit({
        windowMs: 10 * 60 * 1000,
        max: 100,
        message: "Too many requests from this IP, please try again later."
    }));
}*/

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 60,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        status: 429,
        error: "Demasiadas solicitudes a API desde esta IP intenta de nuevo mas tarde."
    },
    skipSuccessfulRequests: false
});

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(cookieParser(SECRET_COOKIE));

app.use(cors({
    origin: config.ALLOWED_ORIGINS,
    credentials: true
}));

app.use('/', morgan('tiny', {
    stream: {
        write: (msg) => {
            logServerHttp(`${msg.trim()}`);
        }
    }
}));

app.use('/app', morgan('tiny', {
    stream: {
        write: (msg) => {
            logConsoleApp(`Screen request: ${msg.trim()}`);
        }
    }
}));

app.use('/api', morgan('tiny', {
    stream: {
        write: (msg) => {
            logConsoleApi(`Api request: ${msg.trim()}`);
        }
    }
}));

// * Stablish access to the web files
app.use('/tool/map', express.static(path.join(__dirname, 'resources', 'tools', 'map')));

app.use('/public', express.static(path.join(__dirname, 'resources', 'public')));

app.use('/private', verifyToken(), express.static(path.join(__dirname, 'resources', 'private')));

app.use('/urbanStorage', verifyToken(), verifyGroup(['urban', 'all']), express.static(path.join(__dirstorage, 'assets', 'urban')));

app.use('/landUseStorage', verifyToken(), verifyGroup(['land_use', 'all']), express.static(path.join(__dirstorage, 'assets', 'land')));

app.use('/legacyStorage', verifyToken(), verifyGroup(['land_use', 'all']), express.static(path.join(__dirstorage, 'assets', 'legacy')));

// * Stablish routes
app.use("/api", apiLimiter);

app.use('/api/landuse', landuseRoutes);

app.use('/api/landLegacy', legacyRoutes);

app.use('/api/urban', urbanRoutes);

app.use('/api/consultant', consultantRoutes);

app.use('/api/auth', authRoutes);

app.use('/api/users', userRoutes);

app.use('/api/administration', administrationRoutes);

app.use('/api/geographic', geoRoutes);

app.use('/app/notification', notificationRoutes);

app.use('/app', appRoutes);

app.use('/test', testRoutes);

app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'resources', 'public', 'notfound.html'));
});

export default app;