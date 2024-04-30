import { Router } from "express";
import * as authControl from '../controllers/auth.controller.js';

const router = Router();

router.post('/signin', authControl.signIn);

router.post('/logout', authControl.logOut);

export default router;