import { Router } from "express";
import * as administrationControl from '../controllers/administration.controller.js';
import * as authenticator from '../middlewares/auth.JWT.js'

const router = Router();

// * Municipal Administration Periods
router.get('/municipalPeriod/:id', [authenticator.verifyToken, authenticator.accountIntegrity, authenticator.isAdmin], administrationControl.getMunicipalPeriod);

router.get('/municipalPeriod', [authenticator.verifyToken, authenticator.accountIntegrity, authenticator.isAdmin], administrationControl.getMunicipalPeriods);

router.post('/municipalPeriod', [authenticator.verifyToken, authenticator.accountIntegrity, authenticator.isAdmin], administrationControl.createMunicipalPeriod);

router.patch('/municipalPeriod/:id', [authenticator.verifyToken, authenticator.accountIntegrity, authenticator.isAdmin], administrationControl.updateMunicipalPeriod);

router.delete('/municipalPeriod/:id', [authenticator.verifyToken, authenticator.accountIntegrity, authenticator.isAdmin], administrationControl.deleteMunicipalPeriod);

// * Institute Administration Periods
router.get('/institutePeriod/:id', [authenticator.verifyToken, authenticator.accountIntegrity, authenticator.isAdmin], administrationControl.getInstitutePeriod);

router.get('/institutePeriod', [authenticator.verifyToken, authenticator.accountIntegrity, authenticator.isAdmin], administrationControl.getInstitutePeriods);

router.post('/institutePeriod', [authenticator.verifyToken, authenticator.accountIntegrity, authenticator.isAdmin], administrationControl.createInstitutePeriod);

router.patch('/institutePeriod/:id', [authenticator.verifyToken, authenticator.accountIntegrity, authenticator.isAdmin], administrationControl.updateInstitutePeriod);

router.delete('/institutePeriod/:id', [authenticator.verifyToken, authenticator.accountIntegrity, authenticator.isAdmin], administrationControl.deleteInstitutePeriod);

// * Licenses Direction Administration Periods
router.get('/licensesPeriod/:id', [authenticator.verifyToken, authenticator.accountIntegrity, authenticator.isAdmin], administrationControl.getLicensePeriod);

router.get('/licensesPeriod', [authenticator.verifyToken, authenticator.accountIntegrity, authenticator.isAdmin], administrationControl.getLicensePeriods);

router.post('/licensesPeriod', [authenticator.verifyToken, authenticator.accountIntegrity, authenticator.isAdmin], administrationControl.createLicensePeriod);

router.patch('/licensesPeriod/:id', [authenticator.verifyToken, authenticator.accountIntegrity, authenticator.isAdmin], administrationControl.updateLicensePeriod);

router.delete('/licensesPeriod/:id', [authenticator.verifyToken, authenticator.accountIntegrity, authenticator.isAdmin], administrationControl.deleteLicensePeriod);

// * Licenses year legends
router.get('/yearLegend/:id', [authenticator.verifyToken, authenticator.accountIntegrity, authenticator.isAdmin], administrationControl.getYearLegend);

router.get('/yearLegend', [authenticator.verifyToken, authenticator.accountIntegrity, authenticator.isAdmin], administrationControl.getYearLegends);

router.post('/yearLegend', [authenticator.verifyToken, authenticator.accountIntegrity, authenticator.isAdmin], administrationControl.createYearLegend);

router.patch('/yearLegend/:id', [authenticator.verifyToken, authenticator.accountIntegrity, authenticator.isAdmin], administrationControl.updateYearLegend);

router.delete('/yearLegend/:id', [authenticator.verifyToken, authenticator.accountIntegrity, authenticator.isAdmin], administrationControl.deleteYearLegend);

export default router;