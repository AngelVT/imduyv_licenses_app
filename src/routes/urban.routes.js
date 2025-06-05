import { Router } from "express";
import * as urbanControl from '../controllers/urban.controller.js';
import * as authenticator from '../middlewares/auth.JWT.js';

import { up } from "../configuration/upload.configuration.js";

const router = Router();

const URBAN_GROUPS = ['urban', 'all'];
const MODERATOR = ['moderator', 'admin', 'system'];
const ADMIN = ['admin', 'system'];
const UPLOADS = [{ name: 'zoneIMG', maxCount: 1 }, { name: 'resumeTables', maxCount: 30 }]

router.get('/', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.verifyGroup(URBAN_GROUPS)] , urbanControl.getLicenses);

router.get('/id/:licenciaID', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.verifyGroup(URBAN_GROUPS)] , urbanControl.getLicense);

router.get('/param/:getByParameter/value/:value', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.verifyGroup(URBAN_GROUPS)] , urbanControl.getLicenseBy);

router.get('/t/:type/i/:invoice/y/:year', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.verifyGroup(URBAN_GROUPS)] , urbanControl.getLicenseByInvoice);

router.get('/t/:type/y/:year', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.verifyGroup(URBAN_GROUPS)] , urbanControl.getLicenseByType);

router.get('/list/t/:type/y/:year', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.verifyGroup(URBAN_GROUPS)] , urbanControl.getLicenseListByType);

router.get('/check', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.verifyGroup(URBAN_GROUPS)] , urbanControl.checkInvoices);

router.post('/', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.verifyGroup(URBAN_GROUPS) , authenticator.verifyRole(MODERATOR), up.fields(UPLOADS)] , urbanControl.createLicense);

router.patch('/:licenciaID', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.verifyGroup(URBAN_GROUPS) , authenticator.verifyRole(MODERATOR), up.fields(UPLOADS)], urbanControl.updateLicense);

router.delete('/:licenciaID', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.verifyGroup(URBAN_GROUPS) , authenticator.verifyRole(ADMIN)] , urbanControl.deleteLicense);

router.get('/PDF/t/:type/i/:invoice/y/:year', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.verifyGroup(URBAN_GROUPS)] , urbanControl.getLicensePDF);

router.post('/setInvoices', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.verifyGroup(URBAN_GROUPS), authenticator.verifyRole(ADMIN)], urbanControl.setLicenseStartInvoices);

export default router;