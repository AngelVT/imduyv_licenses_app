import { Router } from "express";
import * as landControl from '../controllers/landuse.controller.js';
import * as authenticator from '../middlewares/auth.JWT.js';

import { up } from "../configuration/upload.configuration.js";

const router = Router();

const LAND_GROUPS = ['land_use', 'all'];
const MODERATOR = ['moderator', 'admin', 'system'];
const ADMIN = ['admin', 'system'];
const UPLOADS = 'zoneIMG';

router.get('/', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyGroup(LAND_GROUPS),
    authenticator.verifyPermission(['license:read', 'license:manage'])
], landControl.getLicenses);

router.get('/id/:licenciaID', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyGroup(LAND_GROUPS),
    authenticator.verifyPermission(['license:read', 'license:manage'])
], landControl.getLicense);

router.get('/param/:getByParameter/value/:value', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyGroup(LAND_GROUPS),
    authenticator.verifyPermission(['license:read', 'license:manage'])
], landControl.getLicenseBy);

router.get('/t/:type/i/:invoice/y/:year', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyGroup(LAND_GROUPS),
    authenticator.verifyPermission(['license:read', 'license:manage'])
], landControl.getLicenseByInvoice);

router.get('/t/:type/y/:year', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyGroup(LAND_GROUPS),
    authenticator.verifyPermission(['license:read', 'license:manage'])
], landControl.getLicenseByType);

router.get('/pi/:printInvoice', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyGroup(LAND_GROUPS),
    authenticator.verifyPermission(['license:read', 'license:manage'])
], landControl.getLicenseByPrintInvoice);

router.get('/check', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyGroup(LAND_GROUPS),
    authenticator.verifyPermission(['license:read', 'license:manage'])
], landControl.checkInvoices);

router.post('/', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyGroup(LAND_GROUPS),
    authenticator.verifyRole(MODERATOR),
    authenticator.verifyPermission(['license:create', 'license:manage']),
    up.single(UPLOADS)
], landControl.createLicense);

router.patch('/:licenciaID', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyGroup(LAND_GROUPS),
    authenticator.verifyRole(MODERATOR),
    authenticator.verifyPermission(['license:update', 'license:manage']),
    up.single(UPLOADS)
], landControl.updateLicense);

router.patch('/approve/:licenciaID', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyGroup(LAND_GROUPS),
    authenticator.verifyRole(MODERATOR),
    authenticator.verifyPermission(['license:approve']),
    up.single(UPLOADS)
], landControl.approveLicense);

router.patch('/lock/:licenciaID', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyGroup(LAND_GROUPS),
    authenticator.verifyRole(MODERATOR),
    authenticator.verifyPermission(['license:lock', 'license:manage']),
    up.single(UPLOADS)
], landControl.lockLicense);

router.patch('/unlock/:licenciaID', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyGroup(LAND_GROUPS),
    authenticator.verifyRole(MODERATOR),
    authenticator.verifyPermission(['license:unlock', 'license:manage']),
    up.single(UPLOADS)
], landControl.unlockLicense);

router.delete('/:licenciaID', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyGroup(LAND_GROUPS),
    authenticator.verifyRole(ADMIN),
    authenticator.verifyPermission(['license:delete', 'license:manage'])
], landControl.deleteLicense);

router.get('/PDF/t/:type/i/:invoice/y/:year', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyGroup(LAND_GROUPS),
    authenticator.verifyPermission(['license:read', 'license:manage'])
], landControl.getLicensePDF);

router.post('/setInvoices', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyGroup(LAND_GROUPS),
    authenticator.verifyRole(ADMIN),
    authenticator.verifyPermission(['license:create', 'license:manage'])
], landControl.setLicenseStartInvoices);

export default router;