import fs from 'fs';
import path from 'path';

import { generateUrbanInvoice } from '../libs/fullInvoiceGen.js';
import { __dirstorage } from '../path.configuration.js';
import * as logger from '../utilities/logger.utilities.js';
import { Term, UrbanLicense, UrbanType, Validity, Zone } from '../models/License.models.js';
import { validate, validUrbanCriteria } from '../libs/validate.js';
import { generateUrbanSpecialData } from '../models/docs/docUtils/utils.js';

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
        /*const id = req.params.licenciaID;

        const files = req.files;

        for (const key in req.body) {
            if (key == 'requestorAddress' ||
                key == 'buildingAddress' ||
                key == 'maximumHeight' ||
                key == 'parkingLots' ||
                key == 'authorizationResume' ||
                key == 'households' ||
                key == 'documents' ||
                key == 'conditions' ||
                key == 'lotes' ||
                key == 'manzanas' ||
                key == 'actualSituation' ||
                key == 'actualAuthorizedFS' ||
                key == 'representativeAs' ||
                key == 'antecedent') {
                    console.log("Skipped", typeof key, key)
            } else {
                req.body[key] = req.body[key].toLowerCase();
            }
        }

        const {
            requestorName,
            requestDate,
            colony,
            address,
            catastralKey,
            surface,
            zone,
            expeditionDate,
            collectionOrder,
            paymentDate,
            billInvoice,
            authorizedQuantity,
            deliveryDate,
            receiverName,
            validity,
            term,
            PCU,
            number,
            representativeAs,
            requestorAddress,
            buildingAddress,
            occupationPercent,
            surfacePerLote,
            maximumHeight,
            minimalFront,
            frontalRestriction,
            parkingLots,
            usePercent,
            actualSituation,
            actualAuthorizedFS,
            authorizationResume,
            households,
            documents,
            lotes,
            manzanas,
            conditions,
            privateSurface,
            commonSurface,
            location,
            authorizationFor,
            integrity,
            detailedUse,
            urbanLUS,
            urbanCUS,
            antecedent,
            antecedentType,
            habitacionalLotes,
            totalManzanas,
            totalSurface,
            totalRelotification,
            resultRelotification,
            previousInvoice,
            previousInvoiceDate,
            layout,
            pageBreak_1,
            pageBreak_2,
            pageBreak_3,
            pageBreak_4,
            pageBreak_5,
            pageBreak_6,
            pageBreak_7,
            pageBreak_8,
            pageBreak_9,
            pageBreak_10
        } = req.body;

        let { legalRepresentative } = req.body;

        const modifiedLicense = await UrbanLicense.findByPk(id);

        if (modifiedLicense == null) {
            res.status(404).json({ msg: "The requested data does not exist or is unavailable" });
            return;
        }

        const validated = await validate({zone});

        if (validated == null) {
            res.status(400).json({ msg: "Invalid information provided." });
            return;
        }

        let newSpecialData = JSON.parse(modifiedLicense.licenseSpecialData);

        newSpecialData.PCU = PCU ? PCU.toUpperCase() : newSpecialData.PCU;
        newSpecialData.representativeAs = representativeAs ? representativeAs : newSpecialData.representativeAs;
        newSpecialData.requestorAddress = requestorAddress ? requestorAddress : newSpecialData.requestorAddress;
        newSpecialData.buildingAddress = buildingAddress ? buildingAddress : newSpecialData.buildingAddress;
        newSpecialData.occupationPercent = occupationPercent ? occupationPercent : newSpecialData.occupationPercent;
        newSpecialData.surfacePerLote = surfacePerLote ? surfacePerLote : newSpecialData.surfacePerLote;
        newSpecialData.maximumHeight = maximumHeight ? maximumHeight : newSpecialData.maximumHeight;
        newSpecialData.minimalFront = minimalFront ? minimalFront : newSpecialData.minimalFront;
        newSpecialData.frontalRestriction = frontalRestriction ? frontalRestriction : newSpecialData.frontalRestriction;
        newSpecialData.parkingLots = parkingLots ? parkingLots : newSpecialData.parkingLots;
        newSpecialData.usePercent = usePercent ? usePercent : newSpecialData.usePercent;
        newSpecialData.actualSituation = actualSituation ? JSON.parse(actualSituation) : newSpecialData.actualSituation;
        newSpecialData.actualAuthorizedFS = actualAuthorizedFS ? JSON.parse(actualAuthorizedFS) : newSpecialData.actualAuthorizedFS;
        newSpecialData.authorizationResume = authorizationResume ? authorizationResume : newSpecialData.authorizationResume;
        newSpecialData.households = households ? households : newSpecialData.households;
        newSpecialData.documents = documents ? documents.replaceAll('\r', '').split('\n') : newSpecialData.documents;
        newSpecialData.lotes = lotes ? lotes.replaceAll('\r', '').split('\n') : newSpecialData.lotes;
        newSpecialData.manzanas = manzanas ? manzanas.replaceAll('\r', '').split('\n') : newSpecialData.manzanas;
        newSpecialData.conditions = conditions ? conditions.replaceAll('\r', '').split('\n') : newSpecialData.conditions;
        newSpecialData.privateSurface = privateSurface ? privateSurface : newSpecialData.privateSurface;
        newSpecialData.commonSurface = commonSurface ? commonSurface : newSpecialData.commonSurface;
        newSpecialData.location = location ? location.replaceAll('\r', '').split('\n') : newSpecialData.location;
        newSpecialData.authorizationFor = authorizationFor ? authorizationFor : newSpecialData.authorizationFor;
        newSpecialData.integrity = integrity ? integrity : newSpecialData.integrity;
        newSpecialData.detailedUse = detailedUse ? detailedUse : newSpecialData.detailedUse;
        newSpecialData.urbanCUS = urbanCUS ? urbanCUS : newSpecialData.urbanCUS;
        newSpecialData.urbanLUS = urbanLUS ? urbanLUS : newSpecialData.urbanLUS;
        newSpecialData.antecedent = antecedent ? antecedent : newSpecialData.antecedent;
        newSpecialData.antecedentType = antecedentType ? antecedentType : newSpecialData.antecedentType;
        newSpecialData.habitacionalLotes = habitacionalLotes ? habitacionalLotes : newSpecialData.habitacionalLotes;
        newSpecialData.totalManzanas = totalManzanas ? totalManzanas : newSpecialData.totalManzanas;
        newSpecialData.totalSurface = totalSurface ? totalSurface : newSpecialData.totalSurface;
        newSpecialData.totalRelotification = totalRelotification ? totalRelotification : newSpecialData.totalRelotification;
        newSpecialData.resultRelotification = resultRelotification ? resultRelotification.replaceAll('\r', '').split('\n') : newSpecialData.resultRelotification;
        newSpecialData.previousInvoice = previousInvoice ? previousInvoice : newSpecialData.previousInvoice;
        newSpecialData.previousInvoiceDate = previousInvoiceDate ? previousInvoiceDate : newSpecialData.previousInvoiceDate;

        newSpecialData.layout = layout ? layout.toUpperCase() : newSpecialData.layout;
        newSpecialData.pageBreak_1 = pageBreak_1 ? parseInt(pageBreak_1) : newSpecialData.pageBreak_1;
        newSpecialData.pageBreak_2 = pageBreak_2 ? parseInt(pageBreak_2) : newSpecialData.pageBreak_2;
        newSpecialData.pageBreak_3 = pageBreak_3 ? parseInt(pageBreak_3) : newSpecialData.pageBreak_3;
        newSpecialData.pageBreak_4 = pageBreak_4 ? parseInt(pageBreak_4) : newSpecialData.pageBreak_4;
        newSpecialData.pageBreak_5 = pageBreak_5 ? parseInt(pageBreak_5) : newSpecialData.pageBreak_5;
        newSpecialData.pageBreak_6 = pageBreak_6 ? parseInt(pageBreak_6) : newSpecialData.pageBreak_6;
        newSpecialData.pageBreak_7 = pageBreak_7 ? parseInt(pageBreak_7) : newSpecialData.pageBreak_7;
        newSpecialData.pageBreak_8 = pageBreak_8 ? parseInt(pageBreak_8) : newSpecialData.pageBreak_8;
        newSpecialData.pageBreak_9 = pageBreak_9 ? parseInt(pageBreak_9) : newSpecialData.pageBreak_9;
        newSpecialData.pageBreak_10 = pageBreak_10 ? parseInt(pageBreak_10) : newSpecialData.pageBreak_10;

        if (legalRepresentative == '-' || newSpecialData.representativeAs == '-') {
            legalRepresentative = null;
            newSpecialData.representativeAs = null;
        }

        await modifiedLicense.update({
            requestDate: requestDate,
            requestorName: requestorName,
            legalRepresentative: legalRepresentative,
            address: address,
            colony: colony,
            number: number,
            catastralKey: catastralKey,
            surfaceTotal: surface,
            licenseZone: zone,
            licenseValidity: validity,
            licenseTerm: term,
            expeditionDate: expeditionDate,
            collectionOrder: collectionOrder,
            paymentDate: paymentDate,
            billInvoice: billInvoice,
            authorizedQuantity: authorizedQuantity,
            deliveryDate: deliveryDate,
            receiverName: receiverName,
            lastModifiedBy: req.name,
            licenseSpecialData: newSpecialData
        });

        if (files) {
            const destination = path.join(__dirstorage, 'assets', 'urban', modifiedLicense.fullInvoice, 'zone.png');
            const directory = path.dirname(destination);

            await new Promise((resolve, reject) => {
                fs.mkdir(directory, { recursive: true }, (err) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve();
                });
            });

            if (files.zoneIMG) {
                await new Promise((resolve, reject) => {
                    fs.writeFile(destination, files.zoneIMG[0].buffer, (err) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve();
                    });
                });
            }

            if (files.resumeTables) {
                await deleteFiles(directory);
                
                await Promise.all(files.resumeTables.map(e => {
                    const currentDestination = path.join(__dirstorage, 'assets', 'urban', modifiedLicense.fullInvoice, e.originalname.toLowerCase());
                    return new Promise((resolve, reject) => {
                        if (e.originalname.toLowerCase().includes('tabla_s')) {
                            fs.writeFile(currentDestination, e.buffer, (err) => {
                                if (err) {
                                    return reject(err);
                                }
                                resolve();
                            });
                        } else {
                            resolve();
                        }
                    });
                }));
            }
        }*/

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