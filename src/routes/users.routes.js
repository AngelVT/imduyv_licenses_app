import { Router } from "express";
import * as userControl from '../controllers/users.controller.js';
import * as authenticator from '../middlewares/auth.JWT.js';

const router = Router();

const SYSTEM = ['system'];

router.get('/info', authenticator.verifyToken() , userControl.getUserInfo);

router.get('/', [authenticator.verifyToken(), authenticator.accountIntegrity , authenticator.verifyRole(SYSTEM)] ,userControl.getUsers);

router.get('/:userID', [authenticator.verifyToken(), authenticator.accountIntegrity , authenticator.verifyRole(SYSTEM)] ,userControl.getUser);

router.get('/byName/:name', [authenticator.verifyToken(), authenticator.accountIntegrity , authenticator.verifyRole(SYSTEM)] ,userControl.getUserByName);

router.get('/byUsername/:username', [authenticator.verifyToken(), authenticator.accountIntegrity , authenticator.verifyRole(SYSTEM)] ,userControl.getUserByUsername);

router.get('/byGroup/:group', [authenticator.verifyToken(), authenticator.accountIntegrity , authenticator.verifyRole(SYSTEM)] ,userControl.getUserByGroup);

router.post('/' , [authenticator.verifyToken(), authenticator.accountIntegrity , authenticator.verifyRole(SYSTEM)] ,userControl.createUser);

router.patch('/:userID', [authenticator.verifyToken(), authenticator.accountIntegrity , authenticator.verifyRole(SYSTEM)] ,userControl.updateUser);

router.delete('/:userID', [authenticator.verifyToken(), authenticator.accountIntegrity , authenticator.verifyRole(SYSTEM)] ,userControl.deleteUser);

router.get('/QR/:QR', [authenticator.verifyToken(), authenticator.accountIntegrity , authenticator.verifyRole(SYSTEM)] ,userControl.getUserQR);

export default router;