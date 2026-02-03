import { Router } from "express";
import * as geoControl from '../controllers/geo.controller.js';

const router = Router();

router.get('/pointInfo/:coordinates', geoControl.getPointInfo);

router.get('/zoneSec', geoControl.getZoneSecLayer);

router.get('/fracLayer', geoControl.getFracLayer);

export default router;