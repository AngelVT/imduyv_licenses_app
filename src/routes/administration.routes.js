import { Router } from "express";
import * as administrationControl from '../controllers/administration.controller.js';

const router = Router();

// * Municipal Administration Periods
router.get('/municipalPeriod/:id', administrationControl.getMunicipalPeriod);

router.get('/municipalPeriod', administrationControl.getMunicipalPeriods);

router.post('/municipalPeriod', administrationControl.createMunicipalPeriod);

router.patch('/municipalPeriod/:id', administrationControl.updateMunicipalPeriod);

router.delete('/municipalPeriod/:id', administrationControl.deleteMunicipalPeriod);

// * Institute Administration Periods
router.get('/institutePeriod/:id', administrationControl.getInstitutePeriod);

router.get('/institutePeriod', administrationControl.getInstitutePeriods);

router.post('/institutePeriod', administrationControl.createInstitutePeriod);

router.patch('/institutePeriod/:id', administrationControl.updateInstitutePeriod);

router.delete('/institutePeriod/:id', administrationControl.deleteInstitutePeriod);

// * Licenses Direction Administration Periods
router.get('/licensesPeriod/:id', administrationControl.getLicensePeriod);

router.get('/licensesPeriod', administrationControl.getLicensePeriods);

router.post('/licensesPeriod', administrationControl.createLicensePeriod);

router.patch('/licensesPeriod/:id', administrationControl.updateLicensePeriod);

router.delete('/licensesPeriod/:id', administrationControl.deleteLicensePeriod);

export default router;