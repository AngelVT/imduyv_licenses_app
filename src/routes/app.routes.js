import { Router } from "express";
import * as appControl from '../controllers/app.controller.js';
import * as authenticator from '../middlewares/auth.JWT.js';

const router = Router();

router.get('/info', appControl.goInfo);

router.get('/appInfo', appControl.getInfo);

router.get('/login', authenticator.loginRedirect, appControl.goLogIn);

router.get('/georef/:coordinates', appControl.getZoneInfo);

// * protected routes
router.get('/mainMenu', [
    authenticator.verifyToken({ redirect: true }),
    authenticator.accountIntegrity,
    authenticator.verifyGroup(['all'], { isMenu: true })
], appControl.goMainMenu);

router.get('/landMenu', [
    authenticator.verifyToken({ redirect: true }),
    authenticator.accountIntegrity,
    authenticator.verifyGroup(['land_use', 'all'], { isMenu: true })
], appControl.goLandMenu);

router.get('/landRegister', [
    authenticator.verifyToken({ redirect: true }),
    authenticator.accountIntegrity,
    authenticator.verifyGroup(['land_use', 'all'], { isMenu: true })
], appControl.goLandRegister);

router.get('/landConsult', [
    authenticator.verifyToken({ redirect: true }),
    authenticator.accountIntegrity,
    authenticator.verifyGroup(['land_use', 'all'], { isMenu: true })
], appControl.goLandConsult);

router.get('/landPrint', [
    authenticator.verifyToken({ redirect: true }),
    authenticator.accountIntegrity,
    authenticator.verifyGroup(['land_use', 'all'], { isMenu: true })
], appControl.goLandPrint);

router.get('/landLegacy', [
    authenticator.verifyToken({ redirect: true }),
    authenticator.accountIntegrity,
    authenticator.verifyGroup(['land_use', 'all'], { isMenu: true })
], appControl.goLandLegacy);

router.get('/urbanMenu', [
    authenticator.verifyToken({ redirect: true }),
    authenticator.accountIntegrity,
    authenticator.verifyGroup(['urban', 'all'], { isMenu: true })
], appControl.goUrbanMenu);

router.get('/urbanRegister', [
    authenticator.verifyToken({ redirect: true }),
    authenticator.accountIntegrity,
    authenticator.verifyGroup(['urban', 'all'], { isMenu: true })
], appControl.goUrbanRegister);

router.get('/urbanConsult', [
    authenticator.verifyToken({ redirect: true }),
    authenticator.accountIntegrity,
    authenticator.verifyGroup(['urban', 'all'], { isMenu: true })
], appControl.goUrbanConsult);

router.get('/urbanPrint', [
    authenticator.verifyToken({ redirect: true }),
    authenticator.accountIntegrity,
    authenticator.verifyGroup(['urban', 'all'], { isMenu: true })
], appControl.goUrbanPrint);

router.get('/sysadmin', [
    authenticator.verifyToken({ redirect: true }),
    authenticator.accountIntegrity,
    authenticator.verifyRole(['system'], { isMenu: true })
], appControl.goSystemMenu);

router.get('/userRegister', [
    authenticator.verifyToken({ redirect: true }),
    authenticator.accountIntegrity,
    authenticator.verifyRole(['system'], { isMenu: true })
], appControl.goUserRegister);

router.get('/userConsult', [
    authenticator.verifyToken({ redirect: true }),
    authenticator.accountIntegrity,
    authenticator.verifyRole(['system'], { isMenu: true })
], appControl.goUserConsult);

router.get('/passwordReset',
    authenticator.verifyToken({ redirect: true }),
    appControl.goPasswordReset);

router.get('/administration', [
    authenticator.verifyToken({ redirect: true }),
    authenticator.accountIntegrity,
    authenticator.verifyRole(['admin', 'system'], { isMenu: true })
], appControl.goAdministrationMenu);

export default router;