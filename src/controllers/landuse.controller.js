import fs from 'fs';
import path from 'path';
import { Op } from 'sequelize';

import { generateLandInvoice } from '../libs/fullInvoiceGen.js';
import { __dirstorage } from '../paths.js';
import { consoleLogger, requestLogger } from "../logger.js";
import { LandUseLicense, Type, Term, Zone, AuthUse, Validity, ExpeditionType } from '../models/License.models.js';
import { validate, validLandCriteria } from '../libs/validate.js';
import { generateLandSpecialData } from '../models/docs/docUtils/utils.js';

import { printerPDF } from "../libs/pdfUtil.js";
import{ generateLandUseC } from "../models/docs/landUse/constanciaLU.js";
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

        requestLogger.get('Land use get request completed:\n    All record requested');

        licenses.forEach(license => {
            license.licenseSpecialData = JSON.parse(license.licenseSpecialData);
        });

        res.status(200).json({data: licenses});
    } catch (error) {
        consoleLogger.error('\n  Request failed due to server side error:\n  Error: %s', error)
        requestLogger.error('Request failed due to server side error:\n    Error: %s', error);
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

        requestLogger.get('Land use get request completed:\n    Requested record: %d', id);

        license.licenseSpecialData = JSON.parse(license.licenseSpecialData);

        res.status(200).json({data: [license]});
    } catch (error) {
        consoleLogger.error('\n  Request failed due to server side error:\n  Error: %s', error)
        requestLogger.error('Request failed due to server side error:\n    Error: %s', error);
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

        requestLogger.get('Land get request completed:\n    Requested record: %d', license.id);

        license.licenseSpecialData = JSON.parse(license.licenseSpecialData);

        res.status(200).json({data: [license]});
    } catch (error) {
        consoleLogger.error('\n  Request failed due to server side error:\n  Error: %s', error)
        requestLogger.error('Request failed due to server side error:\n    Error: %s', error);
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

        requestLogger.get('Land get request completed:\n    Requested record: %d', licenses.id);

        licenses.forEach(license => {
            license.licenseSpecialData = JSON.parse(license.licenseSpecialData);
        });

        res.status(200).json({data: licenses});
    } catch (error) {
        consoleLogger.error('\n  Request failed due to server side error:\n  Error: %s', error)
        requestLogger.error('Request failed due to server side error:\n    Error: %s', error);
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

        requestLogger.get('Land get request completed:\n    Requested record: %d', licenses.id);

        licenses.forEach(license => {
            license.licenseSpecialData = JSON.parse(license.licenseSpecialData);
        });

        res.status(200).json({data: licenses});
    } catch (error) {
        consoleLogger.error('\n  Request failed due to server side error:\n  Error: %s', error)
        requestLogger.error('Request failed due to server side error:\n    Error: %s', error);
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

        requestLogger.create('Land use creation request completed:\n    Record: %s\n    Invoice: %s', newLicense.id, newLicense.fullInvoice);
        
        res.status(200).json({ createdAt: newLicense.createdAt, fullInvoice: newLicense.fullInvoice, dbInvoice: newLicense.invoice});
    } catch (error) {
        consoleLogger.error('\n  Request failed due to server side error:\n  Error: %s', error)
        requestLogger.error('Request failed due to server side error:\n    Error: %s', error);
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

        requestLogger.update('Land use update request completed:\n    Record: %s\n    Invoice: %s', modifiedLicense.id, modifiedLicense.fullInvoice);

        res.status(200).json({msg: "Record updated successfully", affectedRecord: modifiedLicense.fullInvoice});
    } catch (error) {
        consoleLogger.error('\n  Request failed due to server side error:\n  Error: %s', error)
        requestLogger.error('Request failed due to server side error:\n    Error: %s', error);
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

        requestLogger.delete('Land use delete request completed:\n    Record: %s\n    Invoice: %s', license.id, license.fullInvoice);

        res.status(200).json({msg: "Record deleted successfully"});
    } catch (error) {
        consoleLogger.error('\n  Request failed due to server side error:\n  Error: %s', error)
        requestLogger.error('Request failed due to server side error:\n    Error: %s', error);
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

        requestLogger.get('Urban get request completed:\n    Requested record: %d', license.id);

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
    } catch (error) {
        consoleLogger.error('\n  Request failed due to server side error:\n  Error: %s', error)
        requestLogger.error('Request failed due to server side error:\n    Error: %s', error);
        res.status(500).json({msg: "Internal server error"});
    }
}