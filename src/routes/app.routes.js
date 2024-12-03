import { Router } from "express";
import * as appControl from '../controllers/app.controller.js';
import * as authenticator from '../middlewares/auth.JWT.js';

const router = Router();

router.get('/info', appControl.goInfo);

router.get('/appInfo', appControl.getInfo);

router.get('/login', appControl.goLogIn);

router.get('/georef/:coordinates', appControl.getZoneInfo);

// * protected routes
router.get('/mainMenu', [authenticator.verifyToken, authenticator.requiresPasswordUpdate , authenticator.isAllUser] , appControl.goMainMenu);

router.get('/landMenu', [authenticator.verifyToken, authenticator.requiresPasswordUpdate , authenticator.isLandUser] , appControl.goLandMenu);

router.get('/landRegister', [authenticator.verifyToken, authenticator.requiresPasswordUpdate , authenticator.isLandUser] , appControl.goLandRegister);

router.get('/landConsult', [authenticator.verifyToken, authenticator.requiresPasswordUpdate , authenticator.isLandUser] , appControl.goLandConsult);

router.get('/landPrint', [authenticator.verifyToken, authenticator.requiresPasswordUpdate , authenticator.isLandUser] , appControl.goLandPrint);

router.get('/urbanMenu', [authenticator.verifyToken, authenticator.requiresPasswordUpdate , authenticator.isUrbanUser] , appControl.goUrbanMenu);

router.get('/urbanRegister', [authenticator.verifyToken, authenticator.requiresPasswordUpdate , authenticator.isUrbanUser] , appControl.goUrbanRegister);

router.get('/urbanConsult', [authenticator.verifyToken, authenticator.requiresPasswordUpdate , authenticator.isUrbanUser] , appControl.goUrbanConsult);

router.get('/urbanPrint', [authenticator.verifyToken, authenticator.requiresPasswordUpdate , authenticator.isUrbanUser] , appControl.goUrbanPrint);

router.get('/sysadmin', [authenticator.verifyToken, authenticator.requiresPasswordUpdate , authenticator.isSystemAdmin] , appControl.goSystemMenu);

router.get('/userRegister', [authenticator.verifyToken, authenticator.requiresPasswordUpdate , authenticator.isSystemAdmin] , appControl.goUserRegister);

router.get('/passwordReset', authenticator.verifyToken , appControl.goPasswordReset);

export default router;