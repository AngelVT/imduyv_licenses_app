import { requestHandler } from '../utilities/request.utilities.js';
import * as periodsService from '../services/administration.service.js';
import * as logger from '../utilities/logger.utilities.js';


// * Municipal Administration Periods
export const getMunicipalPeriods = requestHandler(
    async function (req, res) {
        const response = await periodsService.requestMunicipalPeriods();

        res.status(200).json(response);

        logger.logRequestInfo('Municipal period get all request completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Requested records -> All records requested`);
    }
);

export const getMunicipalPeriod = requestHandler(
    async function (req, res) {
        const id = req.params.id;

        const response = await periodsService.requestMunicipalPeriod(id);

        res.status(200).json(response);

        logger.logRequestInfo('Municipal period get request completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Requested record -> ${response.period.municipal_administration_uuid}:${response.period.administrationStart} to ${response.period.administrationEnd}`);
    }
);

export const createMunicipalPeriod = requestHandler(
    async function (req, res) {
        const data = req.body;
        const response = await periodsService.requestMunicipalPeriodCreate(data);

        res.status(200).json(response);

        logger.logRequestInfo('Municipal period create request completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Created record -> ${response.period.municipal_administration_uuid}:${response.period.administrationStart} to ${response.period.administrationEnd}
        Provided data -> ${JSON.stringify(data)}`);
    }
);

export const updateMunicipalPeriod = requestHandler(
    async function (req, res) {
        const id = req.params.id;
        const data = req.body;

        const response = await periodsService.requestMunicipalPeriodUpdate(id, data);

        res.status(200).json(response);

        logger.logRequestInfo('Municipal period update request completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Updated record -> ${response.period.municipal_administration_uuid}:${response.period.administrationStart} to ${response.period.administrationEnd}
        Provided data -> ${JSON.stringify(data)}`);
    }
);

export const deleteMunicipalPeriod = requestHandler(
    async function (req, res) {
        const id = req.params.id;

        const response = await periodsService.requestMunicipalPeriodDelete(id);

        res.status(200).json(response.data);

        logger.logRequestInfo('Municipal period delete request completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Deleted record -> ${response.period.municipal_administration_uuid}:${response.period.administrationStart} to ${response.period.administrationEnd}`);
    }
);

// * Institute Administration Periods
export const getInstitutePeriods = requestHandler(
    async function (req, res) {
        const response = await periodsService.requestInstitutePeriods();

        res.status(200).json(response);

        logger.logRequestInfo('Institute period get all request completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Requested record -> All records requested`);
    }
);

export const getInstitutePeriod = requestHandler(
    async function (req, res) {
        const id =req.params.id;

        const response = await periodsService.requestInstitutePeriod(id);

        res.status(200).json(response);

        logger.logRequestInfo('Institute period get request completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Requested record -> ${response.period.institute_administration_uuid}:${response.period.administrationStart} to ${response.period.administrationEnd}`);
    }
);

export const createInstitutePeriod = requestHandler(
    async function (req, res) {
        const data = req.body;

        const response = await periodsService.requestInstitutePeriodCreate(data);

        res.status(200).json(response);

        logger.logRequestInfo('Institute period create request completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Created record -> ${response.period.institute_administration_uuid}:${response.period.administrationStart} to ${response.period.administrationEnd}
        Provided data -> ${JSON.stringify(data)}`);
    }
);

export const updateInstitutePeriod = requestHandler(
    async function (req, res) {
        const id = req.params.id;
        const data = req.body;

        const response = await periodsService.requestInstitutePeriodUpdate(id, data);

        res.status(200).json(response);

        logger.logRequestInfo('Institute period update request completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Updated record -> ${response.period.institute_administration_uuid}:${response.period.administrationStart} to ${response.period.administrationEnd}
        Provided data -> ${JSON.stringify(data)}`);
    }
);

export const deleteInstitutePeriod = requestHandler(
    async function (req, res) {
        const id = req.params.id;

        const response = await periodsService.requestInstitutePeriodDelete(id);

        res.status(200).json(response.data);

        logger.logRequestInfo('Institute period delete request completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Deleted record -> ${response.period.institute_administration_uuid}:${response.period.administrationStart} to ${response.period.administrationEnd}`);
    }
);

// * Licenses Direction Administration Periods
export const getLicensePeriods = requestHandler(
    async function (req, res) {
        const response = await periodsService.requestLicensesPeriods();

        res.status(200).json(response);

        logger.logRequestInfo('Licenses period get all request completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Requested records -> All records requested`);
    }
);

export const getLicensePeriod = requestHandler(
    async function (req, res) {
        const id = req.params.id;

        const response = await periodsService.requestLicensesPeriod(id);

        res.status(200).json(response);

        logger.logRequestInfo('Licenses period get request completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Requested record -> ${response.period.licenses_administration_uuid}:${response.period.administrationStart} to ${response.period.administrationEnd}`);
    }
);

export const createLicensePeriod = requestHandler(
    async function (req, res) {
        const data = req.body;

        const response = await periodsService.requestLicensesPeriodCreate(data);

        res.status(200).json(response);

        logger.logRequestInfo('Licenses period create request completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Created record -> ${response.period.licenses_administration_uuid}:${response.period.administrationStart} to ${response.period.administrationEnd}
        Provided data -> ${JSON.stringify(data)}`);
    }
);

export const updateLicensePeriod = requestHandler(
    async function (req, res) {
        const id = req.params.id;
        const data = req.body;

        const response = await periodsService.requestLicensesPeriodUpdate(id, data);

        res.status(200).json(response);

        logger.logRequestInfo('Licenses period update request completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Updated record -> ${response.period.licenses_administration_uuid}:${response.period.administrationStart} to ${response.period.administrationEnd}
        Provided data -> ${JSON.stringify(data)}`);
    }
);

export const deleteLicensePeriod = requestHandler(
    async function (req, res) {
        const id = req.params.id;

        const response = await periodsService.requestLicensesPeriodDelete(id);

        res.status(200).json(response.data);

        logger.logRequestInfo('Licenses period delete request completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Deleted record -> ${response.period.licenses_administration_uuid}:${response.period.administrationStart} to ${response.period.administrationEnd}`);
    }
);

// * Licenses Year Legends
export const getYearLegends = requestHandler(
    async function (req, res) {
        const response = await periodsService.requestYearLegends();

        res.status(200).json(response);

        logger.logRequestInfo('Year legend get request completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Requested records -> All records requested`);
    }
);

export const getYearLegend = requestHandler(
    async function (req, res) {
        const response = await periodsService.requestYearLegends(id);

        res.status(200).json(response);

        logger.logRequestInfo('Year legend get all request completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Requested record -> ${response.legends.year_legend_uuid}:${response.legends.year}`);
    }
);

export const createYearLegend = requestHandler(
    async function (req, res) {
        const data = req.body;

        const response = await periodsService.requestYearLegendCreate(data);

        res.status(200).json(response);

        logger.logRequestInfo('Year legend create request completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Created record -> ${response.legend.year_legend_uuid}:${response.legend.year}
        Provided data -> ${JSON.stringify(data)}`);
    }
);

export const updateYearLegend = requestHandler(
    async function (req, res) {
        const id = req.params.id;
        const data = req.body;

        const response = await periodsService.requestYearLegendUpdate(id, data);

        res.status(200).json(response);

        logger.logRequestInfo('Year legend update request completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Updated record -> ${response.legend.year_legend_uuid}:${response.legend.year}
        Provided data -> ${JSON.stringify(data)}`);
    }
);

export const deleteYearLegend = requestHandler(
    async function (req, res) {
        const id = req.params.id;

        const response = await periodsService.requestYearLegendDelete(id);

        res.status(200).json(response.data);

        logger.logRequestInfo('Year legend delete request completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Deleted record -> ${response.legend.year_legend_uuid}:${response.legend.year}`);
    }
);