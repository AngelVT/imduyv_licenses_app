import { Router } from "express";
import * as landControl from '../controllers/landuse.controller.js';
import * as authenticator from '../middlewares/auth.JWT.js';

import { up } from "../configuration/upload.configuration.js";

const router = Router();

router.get('/', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.isLandUser] , landControl.getLicenses);

router.get('/id/:licenciaID', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.isLandUser] , landControl.getLicense);

router.get('/param/:getByParameter/value/:value', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.isLandUser] , landControl.getLicenseBy);

router.get('/t/:type/i/:invoice/y/:year', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.isLandUser] , landControl.getLicenseByInvoice);

router.get('/t/:type/y/:year', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.isLandUser] , landControl.getLicenseByType);

router.get('/check', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.isLandUser] , landControl.checkInvoices);

router.post('/', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.isLandUser , authenticator.isModerator, up.single('zoneIMG')] , landControl.createLicense);

router.patch('/:licenciaID', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.isLandUser , authenticator.isModerator, up.single('zoneIMG')] , landControl.updateLicense);

router.delete('/:licenciaID', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.isLandUser , authenticator.isAdmin] , landControl.deleteLicense);

router.get('/PDF/t/:type/i/:invoice/y/:year', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.isLandUser] , landControl.getLicensePDF);

router.post('/setInvoices', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.isLandUser, authenticator.isAdmin], landControl.setLicenseStartInvoices);

export default router;