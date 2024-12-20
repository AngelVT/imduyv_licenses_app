import * as logger from '../utilities/logger.utilities.js';
import { printerPDF } from "../utilities/pdf.utilities.js";
import * as landService from '../services/landuse.service.js';

export const getLicenses = async (req, res) => {
    try {
        const response = await landService.requestAllLandLicenses();

        res.status(response.status).json(response.data);

        logger.logRequestInfo('Land use get request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Get requested -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('All land records request failed due to server side error', error);
        logger.logRequestError('All land records request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const getLicense = async (req, res) => {
    try {
        const ID = req.params.licenciaID;

        const response = await landService.requestLandLicenseById(ID);

        res.status(response.status).json(response.data);

        logger.logRequestInfo('Land use get request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Get request -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('Land record request failed due to server side error', error);
        logger.logRequestError('Land record request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const getLicenseByInvoice = async (req, res) => {
    try {
        const TYPE = req.params.type;
        const INVOICE = req.params.invoice;
        const YEAR = req.params.year;

        const response = await landService.requestLandLicenseByInvoice(TYPE, INVOICE, YEAR);

        res.status(response.status).json(response.data);

        logger.logRequestInfo('Land use get request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Get request -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('Land record request failed due to server side error', error);
        logger.logRequestError('Land record request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const getLicenseByType = async (req, res) => {
    try {
        const TYPE = req.params.type;
        const YEAR = req.params.year;

        const response = await landService.requestLandLicenseByType(TYPE, YEAR)

        res.status(response.status).json(response.data);

        logger.logRequestInfo('Land use get request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Get request -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('Land records by type request failed due to server side error', error);
        logger.logRequestError('Land records by type request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const getLicenseBy = async (req, res) => {
    try {
        const PARAMETER = req.params.getByParameter;
        const VALUE = req.params.value;

        const response = await landService.requestLandLicenseByParameter(PARAMETER, VALUE);

        res.status(response.status).json(response.data);

        logger.logRequestInfo('Land use get request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Get request -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('Land records by attribute request failed due to server side error', error);
        logger.logRequestError('Land records by attribute request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const createLicense = async (req, res) => {
    try {
        const DATA = req.body;
        const FILE = req.file;
        const REQUESTOR = req.name;

        const response = await landService.requestLandLicenseCreate(DATA, FILE, REQUESTOR);
        
        res.status(response.status).json(response.data);

        logger.logRequestInfo('Land use create request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Create request -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('Land record creation request failed due to server side error', error);
        logger.logRequestError('Land record creation request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const updateLicense = async (req, res) => {
    try {
        const ID = req.params.licenciaID;
        const DATA = req.body;
        const FILE = req.file;
        const REQUESTOR = req.name

        const response = await landService.requestLandLicenseUpdate(ID, DATA, FILE, REQUESTOR);

        res.status(response.status).json(response.data);

        logger.logRequestInfo('Land use update request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Update request -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('Land record update request failed due to server side error', error);
        logger.logRequestError('Land record update request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const deleteLicense = async (req, res) => {
    try {
        const ID = req.params.licenciaID;

        const response = await landService.requestLandLicenseDelete(ID);

        res.status(response.status).json(response.data);

        logger.logRequestInfo('Land use delete request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Delete Request -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('Land record delete request failed due to server side error', error);
        logger.logRequestError('Land record delete request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const getLicensePDF= async (req, res) => {
    try {
        const TYPE = parseInt(req.params.type);
        const INVOICE = parseInt(req.params.invoice);
        const YEAR = parseInt(req.params.year);

        const response = await landService.requestPDFDefinition(TYPE, INVOICE, YEAR);

        if (!response.data.definition) {
            return res.status(response.status).json(response.data);
        }

        const pdfDoc = printerPDF.createPdfKitDocument(response.data.definition);

        res.setHeader('Content-Type', 'application/pdf');
        pdfDoc.info.Title = response.data.fullInvoice;
        pdfDoc.pipe(res);
        pdfDoc.end();

        logger.logRequestInfo('Land use get PDF request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        PDF request -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('Land record PDF request failed due to server side error', error);
        logger.logRequestError('Land record PDF request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}