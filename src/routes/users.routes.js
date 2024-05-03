import { Router } from "express";
import * as userControl from '../controllers/users.controller.js';
import * as authenticator from '../middlewares/auth.JWT.js';

import * as testing from '../controllers/test.controller.js'

const router = Router();

router.post('/test' , testing.test);

router.get('/name', authenticator.verifyToken , userControl.getUserName);

router.get('/', [authenticator.verifyToken , authenticator.isModerator] ,userControl.getUsers);

router.get('/:userID', [authenticator.verifyToken , authenticator.isModerator] ,userControl.getUser);

router.post('/' , [authenticator.verifyToken , authenticator.isAdmin] ,userControl.createUser);

router.patch('/:userID', [authenticator.verifyToken , authenticator.isAdmin] ,userControl.updateUser);

router.delete('/:userID', [authenticator.verifyToken , authenticator.isAdmin] ,userControl.deleteUser);

export default router;