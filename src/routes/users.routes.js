import { Router } from "express";
import * as userControl from '../controllers/users.controller.js';
import * as authenticator from '../middlewares/auth.JWT.js';
import { up } from "../multerUp.js";

import * as testing from '../controllers/test.controller.js';

const router = Router();

router.get('/test', testing.test);

router.get('/testFile' , testing.testFile);

router.get('/testScript' , testing.testScript);

router.get('/info', authenticator.verifyToken , userControl.getUserInfo);

router.get('/', [authenticator.verifyToken , authenticator.isModerator] ,userControl.getUsers);

router.get('/:userID', [authenticator.verifyToken , authenticator.isModerator] ,userControl.getUser);

router.post('/' , [authenticator.verifyToken , authenticator.isAdmin] ,userControl.createUser);

router.patch('/:userID', [authenticator.verifyToken , authenticator.isAdmin] ,userControl.updateUser);

router.delete('/:userID', [authenticator.verifyToken , authenticator.isAdmin] ,userControl.deleteUser);

export default router;