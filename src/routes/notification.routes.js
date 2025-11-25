import { Router } from "express";
import * as authenticator from '../middlewares/auth.JWT.js';
import * as notificationControl from '../controllers/notification.controller.js';

const router = Router();

const GROUPS = ['consultant', 'land_use', 'all'];

router.get('/latest', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyGroup(GROUPS),
    authenticator.verifyPermission(['license:update', 'license:manage', 'consultant:comment'])
], notificationControl.getLatestNotifications);

export default router;