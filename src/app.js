import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

import config from './config.js';
import { __dirname } from './paths.js';
import * as defaults from './libs/initDefaults.js';
import { checkDB } from './database.js';

import launuseRoutes from './routes/landuse.routes.js';
import urbanRoutes from './routes/urban.routes.js';
import userRoutes from './routes/users.routes.js';
import authRoutes from './routes/auth.routes.js';
import appRoutes from './routes/app.routes.js';

const app = express();

checkDB();

defaults.setDefaultRoles();
defaults.setDefaultGroups();
defaults.setDefaultUsers();

app.use(express.json());

app.use(cookieParser(config.SECRET));

app.use(morgan('dev'));

app.use(cors({
    origin: config.ALLOWED_ORIGINS,
    credentials: true
}));

// * Stablish access to the web files
app.use(express.static(path.join(__dirname, 'public')));

// * Stablish routes
app.use('/api/landuse', launuseRoutes);

app.use('/api/urban', urbanRoutes);

app.use('/api/auth', authRoutes);

app.use('/api/users', userRoutes);

app.use('/app', appRoutes);

app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'notfound.html'));
});

export default app;