import { Router } from "express";
import * as legacyControl from "../controllers/land-legacy.controller.js";
import * as authenticator from '../middlewares/auth.JWT.js';

const router = Router();

const LAND_GROUPS = ['land_use', 'all'];

router.get('/:legacyID', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyGroup(LAND_GROUPS),
    authenticator.verifyPermission(['license:read', 'license:manage'])
], legacyControl.getLicense);

router.get('/t/:type/y/:year', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyGroup(LAND_GROUPS),
    authenticator.verifyPermission(['license:read', 'license:manage'])
], legacyControl.getLicenseByTypeYear);

router.get('/catastral/:catastralKey', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyGroup(LAND_GROUPS),
    authenticator.verifyPermission(['license:read', 'license:manage'])
], legacyControl.getLicenseByCatastralKey);

router.get('/name/:name', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyGroup(LAND_GROUPS),
    authenticator.verifyPermission(['license:read', 'license:manage'])
], legacyControl.getLicenseByRequestorName);

router.get('/period/start/:startDate/end/:endDate', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyGroup(LAND_GROUPS),
    authenticator.verifyPermission(['license:read', 'license:manage'])
], legacyControl.getLicenseByPeriod);

export default router;