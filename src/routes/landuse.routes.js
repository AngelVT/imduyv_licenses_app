import { Router } from "express";
import * as landControl from '../controllers/landuse.controller.js';
import * as authenticator from '../middlewares/auth.JWT.js';

import { up } from "../configuration/upload.configuration.js";

const router = Router();

router.get('/', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.isLandUser] , landControl.getLicenses);

router.get('/:licenciaID', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.isLandUser] , landControl.getLicense);

router.get('/:getByParameter/value/:value', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.isLandUser] , landControl.getLicenseBy);

router.get('/:type/:invoice/:year', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.isLandUser] , landControl.getLicenseByInvoice);

router.get('/:type/:year', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.isLandUser] , landControl.getLicenseByType);

router.post('/', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.isLandUser , authenticator.isModerator, up.single('zoneIMG')] , landControl.createLicense);

router.patch('/:licenciaID', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.isLandUser , authenticator.isModerator, up.single('zoneIMG')] , landControl.updateLicense);

router.delete('/:licenciaID', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.isLandUser , authenticator.isAdmin] , landControl.deleteLicense);

router.get('/PDF/:type/:invoice/:year', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.isLandUser] , landControl.getLicensePDF);

router.post('/setInvoices', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.isLandUser, authenticator.isAdmin], landControl.setLicenseStartInvoices);

export default router;