import { Router } from "express";
import * as urbanControl from '../controllers/urban.controller.js';
import * as authenticator from '../middlewares/auth.JWT.js';

import { up } from "../configuration/upload.configuration.js";

const router = Router();

const URBAN_GROUPS = ['urban', 'all'];
const MODERATOR = ['moderator', 'admin', 'system'];
const ADMIN = ['admin', 'system'];
const UPLOADS = [{ name: 'zoneIMG', maxCount: 1 }, { name: 'resumeTables', maxCount: 3 }]

router.get('/', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyGroup(URBAN_GROUPS),
    authenticator.verifyPermission(['license:read', 'license:manage'])
], urbanControl.getLicenses);

router.get('/id/:licenciaID', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyGroup(URBAN_GROUPS),
    authenticator.verifyPermission(['license:read', 'license:manage'])
], urbanControl.getLicense);

router.get('/param/:getByParameter/value/:value', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyGroup(URBAN_GROUPS),
    authenticator.verifyPermission(['license:read', 'license:manage'])
], urbanControl.getLicenseBy);

router.get('/t/:type/i/:invoice/y/:year', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyGroup(URBAN_GROUPS),
    authenticator.verifyPermission(['license:read', 'license:manage'])
], urbanControl.getLicenseByInvoice);

router.get('/t/:type/y/:year', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyGroup(URBAN_GROUPS),
    authenticator.verifyPermission(['license:read', 'license:manage'])
], urbanControl.getLicenseByType);

router.get('/list/t/:type/y/:year', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyGroup(URBAN_GROUPS),
    authenticator.verifyPermission(['license:read', 'license:manage'])
], urbanControl.getLicenseListByType);

router.get('/check', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyGroup(URBAN_GROUPS),
    authenticator.verifyPermission(['license:read', 'license:manage'])
], urbanControl.checkInvoices);

router.post('/', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyGroup(URBAN_GROUPS),
    authenticator.verifyRole(MODERATOR),
    authenticator.verifyPermission(['license:create', 'license:manage']),
    up.fields(UPLOADS)
], urbanControl.createLicense);

router.patch('/:licenciaID', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyGroup(URBAN_GROUPS),
    authenticator.verifyRole(MODERATOR),
    authenticator.verifyPermission(['license:update', 'license:manage']),
    up.fields(UPLOADS)
], urbanControl.updateLicense);

router.delete('/:licenciaID', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyGroup(URBAN_GROUPS),
    authenticator.verifyRole(ADMIN),
    authenticator.verifyPermission(['license:delete', 'license:manage'])
], urbanControl.deleteLicense);

router.get('/PDF/t/:type/i/:invoice/y/:year', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyGroup(URBAN_GROUPS),
    authenticator.verifyPermission(['license:read', 'license:manage'])
], urbanControl.getLicensePDF);

router.post('/setInvoices', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyGroup(URBAN_GROUPS),
    authenticator.verifyRole(ADMIN),
    authenticator.verifyPermission(['license:create', 'license:manage'])
], urbanControl.setLicenseStartInvoices);

export default router;