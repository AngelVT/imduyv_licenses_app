import fs from 'fs';
import path from 'path';
import { Op } from 'sequelize';

import { generateLandInvoice } from '../libs/fullInvoiceGen.js';
import { __dirstorage } from '../path.configuration.js';
import * as logger from '../utilities/logger.utilities.js';
import { LandUseLicense, Type, Term, Zone, AuthUse, Validity, ExpeditionType } from '../models/License.models.js';
import { validate, validLandCriteria } from '../libs/validate.js';
import { generateLandSpecialData } from '../models/docs/docUtils/utils.js';

import { printerPDF } from "../utilities/pdf.utilities.js";
import{ generateLandUseC } from "../models/docs/landUse/licenciaC.js";
import{ generateLandUseL } from "../models/docs/landUse/licenciaL.js";
import{ generateLandUseDP } from "../models/docs/landUse/licenciaDP.js";
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
        const response = await landService.requestLandLicenseCreate(req.body, req.file, req.name);
        
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

        const response = await landService.requestLandLicenseUpdate(ID, DATA, FILE, req.name);

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
        const type = parseInt(req.params.type);
        const invoice = req.params.invoice;
        const year = req.params.year;

        const license = await LandUseLicense.findOne({
            where: {
                licenseType: type,
                invoice: invoice,
                year: year
            },
            include: [
                {
                    model: Type,
                    attributes: ['licenseType']
                },
                {
                    model: Term,
                    attributes: ['licenseTerm']
                },
                {
                    model: Zone,
                    attributes: ['licenseZone', 'licenseKey']
                },
                {
                    model: AuthUse,
                    attributes: ['licenseAuthUse']
                },
                {
                    model: Validity,
                    attributes: ['licenseValidity']
                },
                {
                    model: ExpeditionType,
                    attributes: ['licenseExpType']
                }
            ]
        });

        if(license == null) {
            res.status(404).json({ msg: "The requested data does not exist or is unavailable" });
            return;
        }

        license.licenseSpecialData = JSON.parse(license.licenseSpecialData);

        let def

        if (type == 1) {
            def = await generateLandUseC(license);
        }

        if (type >= 2 && type <= 6) {
            def = await generateLandUseL(license);
        }

        if (type == 7) {
            def = await generateLandUseDP(license);
        }

        const pdfDoc = await printerPDF.createPdfKitDocument(def);

        res.setHeader('Content-Type', 'application/pdf');
        pdfDoc.info.Title = license.fullInvoice;
        pdfDoc.pipe(res);
        pdfDoc.end();

        logger.logRequestInfo('Land use get PDF request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Requested -> Record ${license.fullInvoice}`);
    } catch (error) {
        logger.logConsoleError('Land record PDF request failed due to server side error', error);
        logger.logRequestError('Land record PDF request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}