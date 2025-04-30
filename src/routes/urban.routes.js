import { Router } from "express";
import * as urbanControl from '../controllers/urban.controller.js';
import * as authenticator from '../middlewares/auth.JWT.js';

import { up } from "../configuration/upload.configuration.js";

const router = Router();

router.get('/', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.isUrbanUser] , urbanControl.getLicenses);

router.get('/id/:licenciaID', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.isUrbanUser] , urbanControl.getLicense);

router.get('/param/:getByParameter/value/:value', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.isUrbanUser] , urbanControl.getLicenseBy);

router.get('/t/:type/i/:invoice/y/:year', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.isUrbanUser] , urbanControl.getLicenseByInvoice);

router.get('/t/:type/y/:year', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.isUrbanUser] , urbanControl.getLicenseByType);

router.get('/list/t/:type/y/:year', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.isUrbanUser] , urbanControl.getLicenseListByType);

router.get('/check', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.isUrbanUser] , urbanControl.checkInvoices);

router.post('/', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.isUrbanUser , authenticator.isModerator, up.fields([{ name: 'zoneIMG', maxCount: 1 }, { name: 'resumeTables', maxCount: 30 }])] , urbanControl.createLicense);

router.patch('/:licenciaID', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.isUrbanUser , authenticator.isModerator, up.fields([{ name: 'zoneIMG', maxCount: 1 }, { name: 'resumeTables', maxCount: 30 }])], urbanControl.updateLicense);

router.delete('/:licenciaID', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.isUrbanUser , authenticator.isAdmin] , urbanControl.deleteLicense);

router.get('/PDF/t/:type/i/:invoice/y/:year', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.isUrbanUser] , urbanControl.getLicensePDF);

router.post('/setInvoices', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.isUrbanUser, authenticator.isAdmin], urbanControl.setLicenseStartInvoices);

export default router;