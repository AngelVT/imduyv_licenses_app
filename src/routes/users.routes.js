import { Router } from "express";
import * as userControl from '../controllers/users.controller.js';
import * as authenticator from '../middlewares/auth.JWT.js';

const router = Router();

router.get('/info', authenticator.verifyToken , userControl.getUserInfo);

router.get('/', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.isModerator] ,userControl.getUsers);

router.get('/:userID', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.isModerator] ,userControl.getUser);

router.get('/byName/:name', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.isModerator] ,userControl.getUserByName);

router.get('/byUsername/:username', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.isModerator] ,userControl.getUserByUsername);

router.get('/byGroup/:group', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.isModerator] ,userControl.getUserByGroup);

router.post('/' , [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.isSystemAdmin] ,userControl.createUser);

router.patch('/:userID', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.isSystemAdmin] ,userControl.updateUser);

router.delete('/:userID', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.isSystemAdmin] ,userControl.deleteUser);

router.get('/QR/:QR', [authenticator.verifyToken, authenticator.accountIntegrity , authenticator.isSystemAdmin] ,userControl.getUserQR);

export default router;