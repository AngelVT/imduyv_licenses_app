import { Router } from "express";
import * as authControl from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/auth.JWT.js';

const router = Router();

router.post('/signin', authControl.signIn);

router.post('/logout', authControl.logOut);

router.post('/passwordReset', verifyToken(), authControl.passwordReset)

export default router;