import { Router } from "express";
import * as landControl from '../controllers/landuse.controller.js';
import * as authenticator from '../middlewares/auth.JWT.js';

import { up } from "../configuration/upload.configuration.js";

const router = Router();

const LAND_GROUPS = ['land_use', 'all'];
const MODERATOR = ['moderator', 'admin', 'system'];
const ADMIN = ['admin', 'system'];
const UPLOADS = 'zoneIMG';

router.get('/', [authenticator.verifyToken(), authenticator.accountIntegrity , authenticator.verifyGroup(LAND_GROUPS)] , landControl.getLicenses);

router.get('/id/:licenciaID', [authenticator.verifyToken(), authenticator.accountIntegrity , authenticator.verifyGroup(LAND_GROUPS)] , landControl.getLicense);

router.get('/param/:getByParameter/value/:value', [authenticator.verifyToken(), authenticator.accountIntegrity , authenticator.verifyGroup(LAND_GROUPS)] , landControl.getLicenseBy);

router.get('/t/:type/i/:invoice/y/:year', [authenticator.verifyToken(), authenticator.accountIntegrity , authenticator.verifyGroup(LAND_GROUPS)] , landControl.getLicenseByInvoice);

router.get('/t/:type/y/:year', [authenticator.verifyToken(), authenticator.accountIntegrity , authenticator.verifyGroup(LAND_GROUPS)] , landControl.getLicenseByType);

router.get('/pi/:printInvoice', [authenticator.verifyToken(), authenticator.accountIntegrity , authenticator.verifyGroup(LAND_GROUPS)] , landControl.getLicenseByPrintInvoice);

router.get('/check', [authenticator.verifyToken(), authenticator.accountIntegrity , authenticator.verifyGroup(LAND_GROUPS)] , landControl.checkInvoices);

router.post('/', [authenticator.verifyToken(), authenticator.accountIntegrity , authenticator.verifyGroup(LAND_GROUPS) , authenticator.verifyRole(MODERATOR), up.single(UPLOADS)] , landControl.createLicense);

router.patch('/:licenciaID', [authenticator.verifyToken(), authenticator.accountIntegrity , authenticator.verifyGroup(LAND_GROUPS) , authenticator.verifyRole(MODERATOR), up.single(UPLOADS)] , landControl.updateLicense);

router.delete('/:licenciaID', [authenticator.verifyToken(), authenticator.accountIntegrity , authenticator.verifyGroup(LAND_GROUPS) , authenticator.verifyRole(ADMIN)] , landControl.deleteLicense);

router.get('/PDF/t/:type/i/:invoice/y/:year', [authenticator.verifyToken(), authenticator.accountIntegrity , authenticator.verifyGroup(LAND_GROUPS)] , landControl.getLicensePDF);

router.post('/setInvoices', [authenticator.verifyToken(), authenticator.accountIntegrity , authenticator.verifyGroup(LAND_GROUPS), authenticator.verifyRole(ADMIN)], landControl.setLicenseStartInvoices);

export default router;