import * as periodsService from '../services/administration.service.js';
import * as logger from '../libs/loggerFunctions.js';


// * Municipal Administration Periods
export const getMunicipalPeriods = async (req, res) => {
    try {
        const response = await periodsService.requestMunicipalPeriods();

        res.status(response.status).json(response.data);

        logger.logRequestInfo('Municipal period get all request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Get all request -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('Municipal period get all request failed due to server side error', error);
        logger.logRequestError('Municipal period get all request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const getMunicipalPeriod = async (req, res) => {
    try {
        const response = await periodsService.requestMunicipalPeriod(req.params.id);

        res.status(response.status).json(response.data);

        logger.logRequestInfo('Municipal period get request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Get request -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('Municipal period get request failed due to server side error', error);
        logger.logRequestError('Municipal period get request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const createMunicipalPeriod = async (req, res) => {
    try {
        const response = await periodsService.requestMunicipalPeriodCreate(req.body);

        res.status(response.status).json(response.data);

        logger.logRequestInfo('Municipal period create request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Create request -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('Municipal period create request failed due to server side error', error);
        logger.logRequestError('Municipal period create request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const updateMunicipalPeriod = async (req, res) => {
    try {
        const response = await periodsService.requestMunicipalPeriodUpdate(req.params.id, req.body);

        res.status(response.status).json(response.data);

        logger.logRequestInfo('Municipal period update request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Update request -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('Municipal period update request failed due to server side error', error);
        logger.logRequestError('Municipal period update request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const deleteMunicipalPeriod = async (req, res) => {
    try {
        const response = await periodsService.requestMunicipalPeriodDelete(req.params.id);

        res.status(response.status).json(response.data);

        logger.logRequestInfo('Municipal period delete request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Delete request -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('Municipal period delete request failed due to server side error', error);
        logger.logRequestError('Municipal period delete request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

// * Institute Administration Periods
export const getInstitutePeriods = async (req, res) => {
    try {
        const response = await periodsService.requestInstitutePeriods();

        res.status(response.status).json(response.data);

        logger.logRequestInfo('Institute period get all request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Get all request -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('Institute period get all request failed due to server side error', error);
        logger.logRequestError('Institute period get all request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const getInstitutePeriod = async (req, res) => {
    try {
        const response = await periodsService.requestInstitutePeriod(req.params.id);

        res.status(response.status).json(response.data);

        logger.logRequestInfo('Institute period get request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Get request -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('Institute period get request failed due to server side error', error);
        logger.logRequestError('Institute period get request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const createInstitutePeriod = async (req, res) => {
    try {
        const response = await periodsService.requestInstitutePeriodCreate(req.body);

        res.status(response.status).json(response.data);

        logger.logRequestInfo('Institute period create request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Create request -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('Institute period create request failed due to server side error', error);
        logger.logRequestError('Institute period create request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const updateInstitutePeriod = async (req, res) => {
    try {
        const response = await periodsService.requestInstitutePeriodUpdate(req.params.id, req.body);

        res.status(response.status).json(response.data);

        logger.logRequestInfo('Institute period update request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Update request -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('Institute period update request failed due to server side error', error);
        logger.logRequestError('Institute period update request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const deleteInstitutePeriod = async (req, res) => {
    try {
        const response = await periodsService.requestInstitutePeriodDelete(req.params.id);

        res.status(response.status).json(response.data);

        logger.logRequestInfo('Institute period delete request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Delete request -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('Institute period delete request failed due to server side error', error);
        logger.logRequestError('Institute period delete request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

// * Licenses Direction Administration Periods
export const getLicensePeriods = async (req, res) => {
    try {
        const response = await periodsService.requestLicensesPeriods();

        res.status(response.status).json(response.data);

        logger.logRequestInfo('Licenses period get all request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Get all request -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('Licenses period get all request failed due to server side error', error);
        logger.logRequestError('Licenses period get all request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const getLicensePeriod = async (req, res) => {
    try {
        const response = await periodsService.requestLicensesPeriod(req.params.id);

        res.status(response.status).json(response.data);

        logger.logRequestInfo('Licenses period get request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Get request -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('Licenses period get request failed due to server side error', error);
        logger.logRequestError('Licenses period get request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const createLicensePeriod = async (req, res) => {
    try {
        const response = await periodsService.requestLicensesPeriodCreate(req.body);

        res.status(response.status).json(response.data);

        logger.logRequestInfo('Licenses period create request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Create request -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('Licenses period create request failed due to server side error', error);
        logger.logRequestError('Licenses period create request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const updateLicensePeriod = async (req, res) => {
    try {
        const response = await periodsService.requestLicensesPeriodUpdate(req.params.id, req.body);

        res.status(response.status).json(response.data);

        logger.logRequestInfo('Licenses period update request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Update request -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('Licenses period update request failed due to server side error', error);
        logger.logRequestError('Licenses period update request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const deleteLicensePeriod = async (req, res) => {
    try {
        const response = await periodsService.requestLicensesPeriodDelete(req.params.id);

        res.status(response.status).json(response.data);

        logger.logRequestInfo('Licenses period delete request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Delete request -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('Licenses period delete request failed due to server side error', error);
        logger.logRequestError('Licenses period delete request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}