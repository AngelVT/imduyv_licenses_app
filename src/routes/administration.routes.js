import { Router } from "express";
import * as administrationControl from '../controllers/administration.controller.js';
import * as authenticator from '../middlewares/auth.JWT.js'

const router = Router();

const ADMIN = ['admin', 'system'];

// * Municipal Administration Periods
router.get('/municipalPeriod/:id', [authenticator.verifyToken, authenticator.accountIntegrity, authenticator.verifyRole(ADMIN)], administrationControl.getMunicipalPeriod);

router.get('/municipalPeriod', [authenticator.verifyToken, authenticator.accountIntegrity, authenticator.verifyRole(ADMIN)], administrationControl.getMunicipalPeriods);

router.post('/municipalPeriod', [authenticator.verifyToken, authenticator.accountIntegrity, authenticator.verifyRole(ADMIN)], administrationControl.createMunicipalPeriod);

router.patch('/municipalPeriod/:id', [authenticator.verifyToken, authenticator.accountIntegrity, authenticator.verifyRole(ADMIN)], administrationControl.updateMunicipalPeriod);

router.delete('/municipalPeriod/:id', [authenticator.verifyToken, authenticator.accountIntegrity, authenticator.verifyRole(ADMIN)], administrationControl.deleteMunicipalPeriod);

// * Institute Administration Periods
router.get('/institutePeriod/:id', [authenticator.verifyToken, authenticator.accountIntegrity, authenticator.verifyRole(ADMIN)], administrationControl.getInstitutePeriod);

router.get('/institutePeriod', [authenticator.verifyToken, authenticator.accountIntegrity, authenticator.verifyRole(ADMIN)], administrationControl.getInstitutePeriods);

router.post('/institutePeriod', [authenticator.verifyToken, authenticator.accountIntegrity, authenticator.verifyRole(ADMIN)], administrationControl.createInstitutePeriod);

router.patch('/institutePeriod/:id', [authenticator.verifyToken, authenticator.accountIntegrity, authenticator.verifyRole(ADMIN)], administrationControl.updateInstitutePeriod);

router.delete('/institutePeriod/:id', [authenticator.verifyToken, authenticator.accountIntegrity, authenticator.verifyRole(ADMIN)], administrationControl.deleteInstitutePeriod);

// * Licenses Direction Administration Periods
router.get('/licensesPeriod/:id', [authenticator.verifyToken, authenticator.accountIntegrity, authenticator.verifyRole(ADMIN)], administrationControl.getLicensePeriod);

router.get('/licensesPeriod', [authenticator.verifyToken, authenticator.accountIntegrity, authenticator.verifyRole(ADMIN)], administrationControl.getLicensePeriods);

router.post('/licensesPeriod', [authenticator.verifyToken, authenticator.accountIntegrity, authenticator.verifyRole(ADMIN)], administrationControl.createLicensePeriod);

router.patch('/licensesPeriod/:id', [authenticator.verifyToken, authenticator.accountIntegrity, authenticator.verifyRole(ADMIN)], administrationControl.updateLicensePeriod);

router.delete('/licensesPeriod/:id', [authenticator.verifyToken, authenticator.accountIntegrity, authenticator.verifyRole(ADMIN)], administrationControl.deleteLicensePeriod);

// * Licenses year legends
router.get('/yearLegend/:id', [authenticator.verifyToken, authenticator.accountIntegrity, authenticator.verifyRole(ADMIN)], administrationControl.getYearLegend);

router.get('/yearLegend', [authenticator.verifyToken, authenticator.accountIntegrity, authenticator.verifyRole(ADMIN)], administrationControl.getYearLegends);

router.post('/yearLegend', [authenticator.verifyToken, authenticator.accountIntegrity, authenticator.verifyRole(ADMIN)], administrationControl.createYearLegend);

router.patch('/yearLegend/:id', [authenticator.verifyToken, authenticator.accountIntegrity, authenticator.verifyRole(ADMIN)], administrationControl.updateYearLegend);

router.delete('/yearLegend/:id', [authenticator.verifyToken, authenticator.accountIntegrity, authenticator.verifyRole(ADMIN)], administrationControl.deleteYearLegend);

export default router;