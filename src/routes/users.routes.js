import { Router } from "express";
import * as userControl from '../controllers/users.controller.js';
import * as authenticator from '../middlewares/auth.JWT.js';

const router = Router();

router.get('/info', authenticator.verifyToken , userControl.getUserInfo);

router.get('/', [authenticator.verifyToken , authenticator.isModerator] ,userControl.getUsers);

router.get('/:userID', [authenticator.verifyToken , authenticator.isModerator] ,userControl.getUser);

router.post('/' , [authenticator.verifyToken , authenticator.isSystemAdmin] ,userControl.createUser);

router.patch('/:userID', [authenticator.verifyToken , authenticator.isSystemAdmin] ,userControl.updateUser);

router.delete('/:userID', [authenticator.verifyToken , authenticator.isSystemAdmin] ,userControl.deleteUser);

export default router;