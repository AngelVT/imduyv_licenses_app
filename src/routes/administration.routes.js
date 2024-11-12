import { Router } from "express";
import * as administrationControl from '../controllers/administration.controller.js';

const router = Router();

router.get('/periodData', administrationControl.getPeriods);

router.get('/periodData/:date', administrationControl.getPeriod);

router.post('/registerPeriod', administrationControl.createPeriod);

router.patch('/updatePeriod', administrationControl.updatePeriod);

router.delete('/deletePeriod', administrationControl.deletePeriod);

export default router;