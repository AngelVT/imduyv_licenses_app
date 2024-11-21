import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

import config from './config.js';
import { __dirname, __dirstorage } from './paths.js';
import * as defaults from './libs/initDefaults.js';
import { checkDB } from './database.js';
import { verifyToken, isLandUser, isUrbanUser } from './middlewares/auth.JWT.js';

import landuseRoutes from './routes/landuse.routes.js';
import urbanRoutes from './routes/urban.routes.js';
import userRoutes from './routes/users.routes.js';
import authRoutes from './routes/auth.routes.js';
import appRoutes from './routes/app.routes.js';
import testRoutes from './routes/test.routes.js';
import administrationRoutes from './routes/administration.routes.js';
import * as defaultStorage from './libs/setDefaultDirectories.js';

const app = express();

checkDB();

defaults.setDefaultRoles();
defaults.setDefaultGroups();
defaults.setDefaultUsers();
defaults.setDefaultLicenseTypes();
defaults.setDefaultLicenseTerms();
defaults.setDefaultLicenseZones();
defaults.setDefaultLicenseAuthUses();
defaults.setDefaultLicenseValidities();
defaults.setDefaultLicenseExpeditionTypes();
defaults.setDefaultUrbanLicenseTypes();
defaultStorage.setDefaultDirectories();

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(cookieParser(process.env.SECRET));

app.use(morgan('dev'));

app.use(cors({
    origin: config.ALLOWED_ORIGINS,
    credentials: true
}));

// * Stablish access to the web files
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/private', verifyToken, express.static(path.join(__dirname, 'private')));
app.use('/urbanStorage', verifyToken, isUrbanUser, express.static(path.join(__dirstorage, 'assets', 'urban')));
app.use('/landUseStorage', verifyToken, isLandUser, express.static(path.join(__dirstorage, 'assets', 'land')));

// * Stablish routes
app.use('/api/landuse', landuseRoutes);

app.use('/api/urban', urbanRoutes);

app.use('/api/auth', authRoutes);

app.use('/api/users', userRoutes);

app.use('/api/administration', administrationRoutes);

app.use('/app', appRoutes);

app.use('/test', testRoutes);

app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notfound.html'));
});

export default app;