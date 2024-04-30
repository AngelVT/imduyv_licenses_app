import { Router } from "express";
import * as landControl from '../controllers/landuse.controller.js';
import * as authenticator from '../middlewares/auth.JWT.js';

const router = Router();

router.get('/', [authenticator.verifyToken , authenticator.isLandUser] , landControl.getLicenses);

router.get('/:licenciaID', [authenticator.verifyToken , authenticator.isLandUser] , landControl.getLicense);

router.post('/', [authenticator.verifyToken , authenticator.isLandUser , authenticator.isModerator] , landControl.createLicense);

router.patch('/:licenciaID', [authenticator.verifyToken , authenticator.isLandUser , authenticator.isModerator] , landControl.updateLicense);

router.delete('/:licenciaID', [authenticator.verifyToken , authenticator.isLandUser , authenticator.isModerator] , landControl.deleteLicense);

export default router;