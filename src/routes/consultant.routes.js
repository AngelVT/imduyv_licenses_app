import { Router } from "express";
import * as consultantControl from '../controllers/consultant.controller.js';
import * as authenticator from '../middlewares/auth.JWT.js';

const router = Router();

const CONSULTANT_GROUPS = ['consultant', 'land_use', 'all'];

router.get('/t/:type/i/:invoice/y/:year/lg/:isLegacy', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyGroup(CONSULTANT_GROUPS),
    authenticator.verifyPermission(['consultant:read','consultant:manage'])
], consultantControl.getConsultFullInvoice);

export default router;