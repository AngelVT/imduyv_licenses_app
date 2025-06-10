import { requestHandler } from '../utilities/request.utilities.js';
import * as logger from '../utilities/logger.utilities.js';
import { printerPDF } from "../utilities/pdf.utilities.js";
import * as urbanService from '../services/urban.service.js'

export const getLicenses = async (req, res) => {
    try {

        const response = await urbanService.requestAllUrbanLicenses();

        res.status(response.status).json(response.data);

        logger.logRequestInfo('User get request completed', 
        `Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Get request -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('All urban records request failed due to server side error', error);
        logger.logRequestError('All urban records request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const getLicense = async (req, res) => {
    try {
        const ID = req.params.licenciaID;

        const response = await urbanService.requestUrbanLicenseById(ID);

        res.status(response.status).json(response.data);

        logger.logRequestInfo('Urban get request completed', 
        `Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Get request -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('Urban record request failed due to server side error', error);
        logger.logRequestError('Urban record request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const getLicenseByInvoice = async (req, res) => {
    try {
        const TYPE = req.params.type;
        const INVOICE = req.params.invoice;
        const YEAR = req.params.year;

        const response = await urbanService.requestUrbanLicenseByInvoice(TYPE, INVOICE, YEAR);

        res.status(response.status).json(response.data);

        logger.logRequestInfo('Urban get request completed', 
        `Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Get request -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('Urban record request failed due to server side error', error);
        logger.logRequestError('Urban record request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const getLicenseByType = async (req, res) => {
    try {
        const TYPE = req.params.type;
        const YEAR = req.params.year;

        const response = await urbanService.requestUrbanLicenseByType(TYPE, YEAR)

        res.status(response.status).json(response.data);

        logger.logRequestInfo('Urban get request completed', 
        `Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Get request -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('Urban record by type request failed due to server side error', error);
        logger.logRequestError('Urban record by type request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const getLicenseListByType = async (req, res) => {
    try {
        const TYPE = req.params.type;
        const YEAR = req.params.year;

        const response = await urbanService.requestUrbanLicenseListByType(TYPE, YEAR)

        res.status(response.status).json(response.data);

        logger.logRequestInfo('Urban get request completed', 
        `Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Get request -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('Urban list by type request failed due to server side error', error);
        logger.logRequestError('Urban list by type request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const getLicenseBy = async (req, res) => {
    try {
        const PARAMETER = req.params.getByParameter;
        const VALUE = req.params.value;

        const response = await urbanService.requestUrbanLicenseByParameter(PARAMETER, VALUE);

        res.status(response.status).json(response.data);

        logger.logRequestInfo('Urban get request completed', 
        `Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Get request -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('Urban record by attribute request failed due to server side error', error);
        logger.logRequestError('Urban record by attribute request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const createLicense = async (req, res) => {
    try {
        const BODY = req.body;
        const FILES = req.files;
        const REQUESTOR = req.name;

        const response = await urbanService.requestUrbanLicenseCreate(BODY, FILES, REQUESTOR);

        res.status(response.status).json(response.data);

        logger.logRequestInfo('Urban create request completed', 
        `Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Create request -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('Urban create request failed due to server side error', error);
        logger.logRequestError('Urban create request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const updateLicense = async (req, res) => {
    try {
        const ID = req.params.licenciaID;
        const BODY = req.body;
        const FILES = req.files;
        const REQUESTOR = req.name;

        const response = await urbanService.requestUrbanLicenseUpdate(ID, BODY, FILES, REQUESTOR);

        res.status(response.status).json(response.data);

        logger.logRequestInfo('Urban update request completed', 
        `Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Updated -> Record ${response.log}`);
    } catch (error) {
        logger.logConsoleError('Urban update request failed due to server side error', error);
        logger.logRequestError('Urban update request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
    
}

export const deleteLicense = async (req, res) => {
    try {
        const ID = req.params.licenciaID;

        const response = await urbanService.requestUrbanLicenseDelete(ID);

        res.status(response.status).json(response.data);

        logger.logRequestInfo('Urban delete request completed', 
        `Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Delete request -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('Urban delete request failed due to server side error', error);
        logger.logRequestError('Urban delete request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const getLicensePDF= async (req, res) => {
    try {
        const TYPE = parseInt(req.params.type);
        const INVOICE = parseInt(req.params.invoice);
        const YEAR = parseInt(req.params.year);

        const response = await urbanService.requestPDFDefinition(TYPE, INVOICE, YEAR);

        if (!response.data.definition) {
            return res.status(response.status).json(response.data);
        }

        const pdfDoc = printerPDF.createPdfKitDocument(response.data.definition);

        res.setHeader('Content-Type', 'application/pdf');
        pdfDoc.info.Title = response.data.fullInvoice;
        pdfDoc.pipe(res);
        pdfDoc.end();

        logger.logRequestInfo('Urban get PDF request completed', 
        `Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        PDF request -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('Urban get PDF request failed due to server side error', error);
        logger.logRequestError('Urban get PDF request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const setLicenseStartInvoices = async (req, res) => {
    try {
        const BODY = req.body;

        const response = await urbanService.requestInvoiceSet(BODY);

        res.status(response.status).json(response.data);

        logger.logRequestInfo('Urban start invoices set request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Delete Request -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('Urban start invoices request failed due to server side error', error);
        logger.logRequestError('Urban start invoices request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const checkInvoices = async (req, res) => {
    try {
        const response = await urbanService.requestInvoiceCheck();

        res.status(response.status).json(response.data);

        logger.logRequestInfo('Urban invoice check completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Get requested -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('Urban check invoice request failed due to server side error', error);
        logger.logRequestError('Urban check invoice request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}