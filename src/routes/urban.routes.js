import { Router } from "express";
import * as urbanControl from '../controllers/urban.controller.js';
import * as authenticator from '../middlewares/auth.JWT.js';

const router = Router();

router.get('/', [authenticator.verifyToken , authenticator.isUrbanUser] , urbanControl.getLicenses);

router.get('/:licenciaID', [authenticator.verifyToken , authenticator.isUrbanUser] , urbanControl.getLicense);

router.post('/', [authenticator.verifyToken , authenticator.isUrbanUser , authenticator.isModerator] , urbanControl.createLicense);

router.patch('/:licenciaID', [authenticator.verifyToken , authenticator.isUrbanUser , authenticator.isModerator] , urbanControl.updateLicense);

router.delete('/:licenciaID', [authenticator.verifyToken , authenticator.isUrbanUser , authenticator.isModerator] , urbanControl.deleteLicense);

export default router;