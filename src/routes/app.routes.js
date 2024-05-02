import { Router } from "express";
import * as appControl from '../controllers/app.controller.js';
import * as authenticator from '../middlewares/auth.JWT.js';

const router = Router();

router.get('/info', appControl.goInfo);

router.get('/appInfo', appControl.getInfo);

router.get('/login', appControl.goLogIn);

// * protected routes
router.get('/mainMenu', [authenticator.verifyToken , authenticator.isAllUser] , appControl.goMainMenu);

router.get('/landMenu', [authenticator.verifyToken , authenticator.isLandUser] , appControl.goLandMenu);

router.get('/landRegister', [authenticator.verifyToken , authenticator.isLandUser] , appControl.goLandRegister);

router.get('/landConsult', [authenticator.verifyToken , authenticator.isLandUser] , appControl.goLandConsult);

router.get('/landPrint', [authenticator.verifyToken , authenticator.isLandUser] , appControl.goLandPrint);

router.get('/urbanMenu', [authenticator.verifyToken , authenticator.isUrbanUser] , appControl.goUrbanMenu);

router.get('/urbanRegister', [authenticator.verifyToken , authenticator.isUrbanUser] , appControl.goUrbanRegister);

router.get('/urbanConsult', [authenticator.verifyToken , authenticator.isUrbanUser] , appControl.goUrbanConsult);

router.get('/urbanPrint', [authenticator.verifyToken , authenticator.isUrbanUser] , appControl.goUrbanPrint);

export default router;