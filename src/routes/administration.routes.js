import { Router } from "express";
import * as administrationControl from '../controllers/administration.controller.js';
import * as authenticator from '../middlewares/auth.JWT.js'

const router = Router();

const ADMIN = ['admin', 'system'];

// * Municipal Administration Periods
router.get('/municipalPeriod/:id', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyRole(ADMIN),
    authenticator.verifyPermission(['administration:read', 'administration:manage'])
], administrationControl.getMunicipalPeriod);

router.get('/municipalPeriod', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyRole(ADMIN),
    authenticator.verifyPermission(['administration:read', 'administration:manage'])
], administrationControl.getMunicipalPeriods);

router.post('/municipalPeriod', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyRole(ADMIN),
    authenticator.verifyPermission(['administration:create', 'administration:manage'])
], administrationControl.createMunicipalPeriod);

router.patch('/municipalPeriod/:id', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyRole(ADMIN),
    authenticator.verifyPermission(['administration:update', 'administration:manage'])
], administrationControl.updateMunicipalPeriod);

router.delete('/municipalPeriod/:id', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyRole(ADMIN),
    authenticator.verifyPermission(['administration:delete', 'administration:manage'])
], administrationControl.deleteMunicipalPeriod);

// * Institute Administration Periods
router.get('/institutePeriod/:id', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyRole(ADMIN),
    authenticator.verifyPermission(['administration:read', 'administration:manage'])
], administrationControl.getInstitutePeriod);

router.get('/institutePeriod', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyRole(ADMIN),
    authenticator.verifyPermission(['administration:read', 'administration:manage'])
], administrationControl.getInstitutePeriods);

router.post('/institutePeriod', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyRole(ADMIN),
    authenticator.verifyPermission(['administration:create', 'administration:manage'])
], administrationControl.createInstitutePeriod);

router.patch('/institutePeriod/:id', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyRole(ADMIN),
    authenticator.verifyPermission(['administration:update', 'administration:manage'])
], administrationControl.updateInstitutePeriod);

router.delete('/institutePeriod/:id', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyRole(ADMIN),
    authenticator.verifyPermission(['administration:delete', 'administration:manage'])
], administrationControl.deleteInstitutePeriod);

// * Licenses Direction Administration Periods
router.get('/licensesPeriod/:id', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyRole(ADMIN),
    authenticator.verifyPermission(['administration:read', 'administration:manage'])
], administrationControl.getLicensePeriod);

router.get('/licensesPeriod', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyRole(ADMIN),
    authenticator.verifyPermission(['administration:read', 'administration:manage'])
], administrationControl.getLicensePeriods);

router.post('/licensesPeriod', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyRole(ADMIN),
    authenticator.verifyPermission(['administration:create', 'administration:manage'])
], administrationControl.createLicensePeriod);

router.patch('/licensesPeriod/:id', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyRole(ADMIN),
    authenticator.verifyPermission(['administration:update', 'administration:manage'])
], administrationControl.updateLicensePeriod);

router.delete('/licensesPeriod/:id', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyRole(ADMIN),
    authenticator.verifyPermission(['administration:delete', 'administration:manage'])
], administrationControl.deleteLicensePeriod);

// * Licenses year legends
router.get('/yearLegend/:id', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyRole(ADMIN),
    authenticator.verifyPermission(['administration:read', 'administration:manage'])
], administrationControl.getYearLegend);

router.get('/yearLegend', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyRole(ADMIN),
    authenticator.verifyPermission(['administration:read', 'administration:manage'])
], administrationControl.getYearLegends);

router.post('/yearLegend', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyRole(ADMIN),
    authenticator.verifyPermission(['administration:create', 'administration:manage'])
], administrationControl.createYearLegend);

router.patch('/yearLegend/:id', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyRole(ADMIN),
    authenticator.verifyPermission(['administration:update', 'administration:manage'])
], administrationControl.updateYearLegend);

router.delete('/yearLegend/:id', [
    authenticator.verifyToken(),
    authenticator.accountIntegrity,
    authenticator.verifyRole(ADMIN),
    authenticator.verifyPermission(['administration:delete', 'administration:manage'])
], administrationControl.deleteYearLegend);

export default router;