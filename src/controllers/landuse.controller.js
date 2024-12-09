import fs from 'fs';
import path from 'path';
import { Op } from 'sequelize';

import { generateLandInvoice } from '../libs/fullInvoiceGen.js';
import { __dirstorage } from '../paths.js';
import * as logger from '../libs/loggerFunctions.js';
import { LandUseLicense, Type, Term, Zone, AuthUse, Validity, ExpeditionType } from '../models/License.models.js';
import { validate, validLandCriteria } from '../libs/validate.js';
import { generateLandSpecialData } from '../models/docs/docUtils/utils.js';

import { printerPDF } from "../libs/pdfUtil.js";
import{ generateLandUseC } from "../models/docs/landUse/licenciaC.js";
import{ generateLandUseL } from "../models/docs/landUse/licenciaL.js";
import{ generateLandUseDP } from "../models/docs/landUse/licenciaDP.js";

export const getLicenses = async (req, res) => {
    try {
        const licenses = await LandUseLicense.findAll({
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
                },
            ]
        });

        if(licenses == null) {
            res.status(404).json({ msg: "The requested data does not exist or is unavailable" });
            return;
        }

        licenses.forEach(license => {
            license.licenseSpecialData = JSON.parse(license.licenseSpecialData);
        });

        res.status(200).json({data: licenses});

        logger.logRequestInfo('Land use get request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Requested -> All land use records`);
    } catch (error) {
        logger.logConsoleError('All land records request failed due to server side error', error);
        logger.logRequestError('All land records request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const getLicense = async (req, res) => {
    try {

        const id = req.params.licenciaID;

        const license = await LandUseLicense.findByPk( id ,{
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
                },
            ]
        });

        if(license == null) {
            res.status(404).json({ msg: "The requested data does not exist or is unavailable" });
            return;
        }

        license.licenseSpecialData = JSON.parse(license.licenseSpecialData);

        res.status(200).json({data: [license]});

        logger.logRequestInfo('Land use get request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Requested -> Record ${license.fullInvoice}`);
    } catch (error) {
        logger.logConsoleError('Land record request failed due to server side error', error);
        logger.logRequestError('Land record request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const getLicenseByInvoice = async (req, res) => {
    try {
        const type = req.params.type;
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
                },
            ]
        });

        if(license == null) {
            res.status(404).json({ msg: "The requested data does not exist or is unavailable" });
            return;
        }

        license.licenseSpecialData = JSON.parse(license.licenseSpecialData);

        res.status(200).json({data: [license]});

        logger.logRequestInfo('Land use get request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Requested -> Record ${license.fullInvoice}`);
    } catch (error) {
        logger.logConsoleError('Land record request failed due to server side error', error);
        logger.logRequestError('Land record request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const getLicenseByType = async (req, res) => {
    try {
        const type = req.params.type;
        const year = req.params.year;

        const licenses = await LandUseLicense.findAll({
            where: {
                licenseType: type,
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
                },
            ]
        });

        if(licenses == null) {
            res.status(404).json({ msg: "The requested data does not exist or is unavailable" });
            return;
        }

        licenses.forEach(license => {
            license.licenseSpecialData = JSON.parse(license.licenseSpecialData);
        });

        res.status(200).json({data: licenses});

        logger.logRequestInfo('Land use get request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Requested -> Records type ${type} of ${year}`);
    } catch (error) {
        logger.logConsoleError('Land records by type request failed due to server side error', error);
        logger.logRequestError('Land records by type request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const getLicenseBy = async (req, res) => {
    try {
        const parameter = req.params.getByParameter;
        const value = req.params.value;

        let validated;

        for (const key in validLandCriteria) {
            if (key === parameter) {
                validated = true
            }
        }

        if (!validated) {
            res.status(400).json({ msg: "Invalid information provided." });
            return;
        }

        const criteria = {};
        criteria[parameter] = { [Op.like]: `%${value}%` };

        const licenses = await LandUseLicense.findAll({
            where: criteria,
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
                },
            ]
        });

        if(licenses == null) {
            res.status(404).json({ msg: "The requested data does not exist or is unavailable" });
            return;
        }

        licenses.forEach(license => {
            license.licenseSpecialData = JSON.parse(license.licenseSpecialData);
        });

        res.status(200).json({data: licenses});

        logger.logRequestInfo('Land use get request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Requested -> Records with ${parameter} similar to ${value}`);
    } catch (error) {
        logger.logConsoleError('Land records by attribute request failed due to server side error', error);
        logger.logRequestError('Land records by attribute request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const createLicense = async (req, res) => {
    try {
        const date = new Date;

        const year = date.getFullYear();

        for (const key in req.body) {
            req.body[key] = req.body[key].toLowerCase();
        }

        const {
            licenseType,
            requestorName,
            attentionName,
            address,
            number,
            colony,
            contactPhone,
            catastralKey,
            surface,
            georeference,
            zone,
            businessLinePrint,
            businessLineIntern,
            authorizedUse,
            expeditionType,
            term,
            validity,
            requestDate,
            expeditionDate,
            expirationDate,
            paymentInvoice,
            cost,
            discount,
            paymentDone,
            inspector
        } = req.body;

        const file = req.file;

        if (!licenseType || !requestorName|| !attentionName|| !address|| !number|| !colony|| !contactPhone|| !catastralKey|| !surface|| !georeference|| !zone|| !businessLinePrint|| !businessLineIntern|| !authorizedUse|| !expeditionType|| !term|| !validity|| !requestDate|| !expeditionDate|| !expirationDate|| !paymentInvoice|| !cost|| !discount|| !paymentDone|| !inspector || !file) {
            res.status(400).json({ msg: "There is missing information" });
            return;
        }

        const invoice = await generateLandInvoice(licenseType, year);

        if (invoice == null) {
            res.status(400).json({ msg: "Invalid information provided." });
            return;
        }

        const validated = await validate({term,zone,authorizedUse,validity,expeditionType});

        if (validated == null) {
            res.status(400).json({ msg: "Invalid information provided." });
            return;
        }

        const licenseSpecialData = generateLandSpecialData(parseInt(licenseType)); 
        
        const newLicense = await LandUseLicense.create({
            fullInvoice: invoice.lcID,
            invoice: invoice.invoice,
            licenseType: licenseType,
            year: year,
            requestorName: requestorName,
            attentionName: attentionName,
            elaboratedBy: req.name,
            requestDate: requestDate,
            address: address,
            number: number,
            colony: colony,
            surfaceTotal: surface,
            catastralKey: catastralKey,
            licenseTerm: term,
            geoReference: georeference,
            licenseZone: zone,
            authorizedUse: authorizedUse,
            businessLinePrint: businessLinePrint,
            businessLineIntern: businessLineIntern,
            expeditionDate: expeditionDate,
            licenseValidity: validity,
            paymentInvoice: paymentInvoice,
            expirationDate: expirationDate,
            licenseExpeditionType: expeditionType,
            contactPhone: contactPhone,
            cost: cost,
            discount: discount,
            paymentDone: paymentDone,
            inspector: inspector.toLowerCase(),
            licenseSpecialData: licenseSpecialData
        });

        const destination = path.join(__dirstorage, 'assets', 'land', invoice.lcID, 'zone.png');
        const directory = path.dirname(destination);

        fs.mkdir(directory, { recursive: true }, (err) => {
            if (err) {
                return console.error(err);
            }

            fs.writeFile(destination, file.buffer, (err) => {
                if (err) {
                    return console.error(err);
                }
            });
        });
        
        res.status(200).json({ createdAt: newLicense.createdAt, fullInvoice: newLicense.fullInvoice, dbInvoice: newLicense.invoice});

        logger.logRequestInfo('Land use create request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Created -> Record ${newLicense.fullInvoice}`);
    } catch (error) {
        logger.logConsoleError('Land record creation request failed due to server side error', error);
        logger.logRequestError('Land record creation request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const updateLicense = async (req, res) => {
    try {
        const id = req.params.licenciaID;
        const file = req.file;

        for (const key in req.body) {
            if (key == 'conditions' || key == 'restrictions' || key == 'anexo') {
                console.log("Skipped", typeof key, key);
            } else {
                req.body[key] = req.body[key].toLowerCase();
            }
            
        }

        const {
            requestorName,
            attentionName,
            address,
            number,
            colony,
            contactPhone,
            catastralKey,
            surface,
            georeference,
            zone,
            businessLinePrint,
            businessLineIntern,
            authorizedUse,
            expeditionType,
            term,
            validity,
            requestDate,
            expeditionDate,
            expirationDate,
            paymentInvoice,
            cost,
            discount,
            paymentDone,
            inspector,
            anexo,
            restrictions,
            conditions,
            parcela,
            propertyNo,
            propertyDate
        } = req.body;

        const modifiedLicense = await LandUseLicense.findByPk(id);

        if (modifiedLicense == null) {
            res.status(404).json({ msg: "The requested data does not exist or is unavailable" });
            return;
        }

        const validated = await validate({term,authorizedUse,validity,expeditionType,zone});

        if (validated == null) {
            res.status(400).json({ msg: "Invalid information provided." });
            return;
        }

        let newSpecialData = JSON.parse(modifiedLicense.licenseSpecialData);

        newSpecialData.anexo = anexo ? anexo : newSpecialData.anexo;
        newSpecialData.restrictions = restrictions ? restrictions : newSpecialData.restrictions;
        newSpecialData.conditions = conditions ? conditions.replaceAll('\r', '').split('\n') : newSpecialData.conditions;
        newSpecialData.parcela = parcela ? parcela : newSpecialData.parcela;
        newSpecialData.propertyNo = propertyNo ? propertyNo : newSpecialData.propertyNo;
        newSpecialData.propertyDate = propertyDate ? propertyDate : newSpecialData.propertyDate;

        await modifiedLicense.update({
            requestorName: requestorName,
            attentionName: attentionName,
            lastModifiedBy: req.name,
            requestDate: requestDate,
            address: address,
            number: number,
            colony: colony,
            surfaceTotal: surface,
            catastralKey: catastralKey,
            licenseTerm: term,
            geoReference: georeference,
            licenseZone: zone,
            authorizedUse: authorizedUse,
            businessLinePrint: businessLinePrint,
            businessLineIntern: businessLineIntern,
            expeditionDate: expeditionDate,
            licenseValidity: validity,
            paymentInvoice: paymentInvoice,
            expirationDate: expirationDate,
            licenseExpeditionType: expeditionType,
            contactPhone: contactPhone,
            cost: cost,
            discount: discount,
            paymentDone: paymentDone,
            inspector: inspector,
            licenseSpecialData: newSpecialData
        });

        if(file) {
            const destination = path.join(__dirstorage, 'assets', 'land', modifiedLicense.fullInvoice.replaceAll('/','_'), 'zone.png');
            const directory = path.dirname(destination);

            fs.mkdir(directory, { recursive: true }, (err) => {
                if (err) {
                    return console.error(err);
                }

                fs.writeFile(destination, file.buffer, (err) => {
                    if (err) {
                        return console.error(err);
                    }
                });
            });
        }

        res.status(200).json({msg: "Record updated successfully", affectedRecord: modifiedLicense.fullInvoice});

        logger.logRequestInfo('Land use update request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Updated -> Record ${modifiedLicense.fullInvoice}`);
    } catch (error) {
        logger.logConsoleError('Land record update request failed due to server side error', error);
        logger.logRequestError('Land record update request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const deleteLicense = async (req, res) => {
    try {
        const id = req.params.licenciaID;

        const license = await LandUseLicense.findByPk(id);

        if (license == null) {
            res.status(404).json({ msg: "The requested data does not exist or is unavailable" });
            return;
        }

        license.destroy();

        res.status(200).json({msg: "Record deleted successfully"});

        logger.logRequestInfo('Land use delete request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Deleted -> Record ${license.fullInvoice}`);
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