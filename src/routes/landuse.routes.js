import { Router } from "express";
import * as landControl from '../controllers/landuse.controller.js';
import * as authenticator from '../middlewares/auth.JWT.js';

import { up } from "../multerUp.js";

const router = Router();

router.get('/', [authenticator.verifyToken , authenticator.isLandUser] , landControl.getLicenses);

router.get('/:licenciaID', [authenticator.verifyToken , authenticator.isLandUser] , landControl.getLicense);

router.get('/:getByParameter/value/:value', [authenticator.verifyToken , authenticator.isUrbanUser] , landControl.getLicenseBy);

router.get('/:type/:invoice/:year', [authenticator.verifyToken , authenticator.isUrbanUser] , landControl.getLicenseByInvoice);

router.get('/:type/:year', [authenticator.verifyToken , authenticator.isUrbanUser] , landControl.getLicenseByType);

router.post('/', [authenticator.verifyToken , authenticator.isLandUser , authenticator.isModerator, up.single('zoneIMG')] , landControl.createLicense);

router.patch('/:licenciaID', [authenticator.verifyToken , authenticator.isLandUser , authenticator.isModerator, up.single('zoneIMG')] , landControl.updateLicense);

router.delete('/:licenciaID', [authenticator.verifyToken , authenticator.isLandUser , authenticator.isModerator] , landControl.deleteLicense);

export default router;