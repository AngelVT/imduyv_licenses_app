import { Router } from "express";
import * as urbanControl from '../controllers/urban.controller.js';
import * as authenticator from '../middlewares/auth.JWT.js';

import { up } from "../multerUp.js";

const router = Router();

router.get('/', [authenticator.verifyToken , authenticator.isUrbanUser] , urbanControl.getLicenses);

router.get('/:licenciaID', [authenticator.verifyToken , authenticator.isUrbanUser] , urbanControl.getLicense);

router.get('/:getByParameter/value/:value', [authenticator.verifyToken , authenticator.isUrbanUser] , urbanControl.getLicenseBy);

router.get('/:type/:invoice/:year', [authenticator.verifyToken , authenticator.isUrbanUser] , urbanControl.getLicenseByInvoice);

router.get('/:type/:year', [authenticator.verifyToken , authenticator.isUrbanUser] , urbanControl.getLicenseByType);

router.post('/', [authenticator.verifyToken , authenticator.isUrbanUser , authenticator.isModerator, up.single('zoneIMG')] , urbanControl.createLicense);

router.patch('/:licenciaID', [authenticator.verifyToken , authenticator.isUrbanUser , authenticator.isModerator, up.fields([{ name: 'zoneIMG', maxCount: 1 }, { name: 'resumeTables', maxCount: 10 }])], urbanControl.updateLicense);

router.delete('/:licenciaID', [authenticator.verifyToken , authenticator.isUrbanUser , authenticator.isModerator] , urbanControl.deleteLicense);

router.get('/PDF/:type/:invoice/:year', [authenticator.verifyToken , authenticator.isUrbanUser] , urbanControl.getLicensePDF);

export default router;