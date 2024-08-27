import fs from 'fs';
import path from 'path';
import { Op } from 'sequelize';

import { generateUrbanInvoice } from '../libs/fullInvoiceGen.js';
import { __dirstorage } from '../paths.js';
import { consoleLogger, requestLogger } from "../logger.js";
import { Term, UrbanLicense, UrbanType, Validity, Zone } from '../models/License.models.js';
import { validate, validUrbanCriteria } from '../libs/validate.js';
import { generateUrbanSpecialData } from '../models/docs/docUtils/utils.js';

import { printerPDF } from "../libs/pdfUtil.js";
import { generateUrbanC } from "../models/docs/urban/constanciaU.js";
import { generateUrbanLUS } from "../models/docs/urban/licenciaLUS.js";
import { generateUrbanLSUB } from "../models/docs/urban/licenciaLSUB.js";
import { generateUrbanLFUS } from "../models/docs/urban/licenciaLFUS.js";
import { generateUrbanCRPC } from "../models/docs/urban/licenciaCRPC.js";
import { generateUrbanLF } from '../models/docs/urban/licenciaLF.js';
import { generateUrbanPLF } from '../models/docs/urban/licenciaPLF.js';
import { generateUrbanRLF } from '../models/docs/urban/urbanRLF.js';

export const getLicenses = async (req, res) => {
    try {
        const licenses = await UrbanLicense.findAll({
            include: [
                {
                    model: UrbanType,
                    attributes: ['licenseType']
                },
                {
                    model: Zone,
                    attributes: ['licenseZone', 'licenseKey']
                }
            ]
        });

        if(licenses == null) {
            res.status(404).json({ msg: "The requested data does not exist or is unavailable" });
            return;
        }

        licenses.forEach(e => {
            e.licenseSpecialData = JSON.parse(e.licenseSpecialData)
        });

        requestLogger.get('Urban get request completed:\n    All record requested');

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

        const license = await UrbanLicense.findByPk( id ,{
            include: [
                {
                    model: UrbanType,
                    attributes: ['licenseType']
                },
                {
                    model: Zone,
                    attributes: ['licenseZone', 'licenseKey']
                }
            ]
        });

        if(license == null) {
            res.status(404).json({ msg: "The requested data does not exist or is unavailable" });
            return;
        }

        license.licenseSpecialData = JSON.parse(license.licenseSpecialData);

        requestLogger.get('Urban get request completed:\n    Requested record: %d', id);

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

        const license = await UrbanLicense.findOne({
            where: {
                licenseType: type,
                invoice: invoice,
                year: year
            },
            include: [
                {
                    model: UrbanType,
                    attributes: ['licenseType']
                },
                {
                    model: Zone,
                    attributes: ['licenseZone', 'licenseKey']
                }
            ]
        });

        if(license == null) {
            res.status(404).json({ msg: "The requested data does not exist or is unavailable" });
            return;
        }

        requestLogger.get('Urban get request completed:\n    Requested record: %d', license.id);

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

        const licenses = await UrbanLicense.findAll({
            where: {
                licenseType: type,
                year: year
            },
            include: [
                {
                    model: UrbanType,
                    attributes: ['licenseType']
                },
                {
                    model: Zone,
                    attributes: ['licenseZone', 'licenseKey']
                }
            ]
        });

        if(licenses == null) {
            res.status(404).json({ msg: "The requested data does not exist or is unavailable" });
            return;
        }

        requestLogger.get('Urban get request completed:\n    Requested record: %d', licenses.id);

        for (let license of licenses) {
            license.licenseSpecialData = JSON.parse(license.licenseSpecialData);
        }

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

        for (const key in validUrbanCriteria) {
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

        const licenses = await UrbanLicense.findAll({
            where: criteria,
            include: [
                {
                    model: UrbanType,
                    attributes: ['licenseType']
                },
                {
                    model: Zone,
                    attributes: ['licenseZone', 'licenseKey']
                }
            ]
        });

        if(licenses == null) {
            res.status(404).json({ msg: "The requested data does not exist or is unavailable" });
            return;
        }

        requestLogger.get('Urban get request completed:\n    Requested record: %d', licenses.id);

        for (let license of licenses) {
            license.licenseSpecialData = JSON.parse(license.licenseSpecialData);
        }

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
            legalRepresentative,
            requestDate,
            colony,
            address,
            number,
            catastralKey,
            licenseTerm,
            surface,
            zone,
            expeditionDate,
            licenseValidity,
            collectionOrder,
            paymentDate,
            billInvoice,
            authorizedQuantity,
            deliveryDate,
            receiverName,
            PCU,
            requestorAddress,
            buildingAddress
        } = req.body;

        const files = req.files;

        if (!licenseType || !requestorName || !requestDate) {
            res.status(400).json({ msg: "There is missing information" });
            return;
        }

        const invoice = await generateUrbanInvoice(licenseType, year);

        if (invoice == null) {
            res.status(400).json({ msg: "Invalid information provided." });
            return;
        }

        const validated = await validate({urbanType: licenseType});

        if (validated == null) {
            res.status(400).json({ msg: "Invalid information provided." });
            return;
        }

        const licenseSpecialData = generateUrbanSpecialData(parseInt(licenseType));

        licenseSpecialData.PCU = PCU ? PCU.toUpperCase() : licenseSpecialData.PCU;
        licenseSpecialData.requestorAddress = requestorAddress ? requestorAddress : licenseSpecialData.requestorAddress;
        licenseSpecialData.buildingAddress = buildingAddress ? buildingAddress : licenseSpecialData.buildingAddress;

        const newLicense = await UrbanLicense.create({
            fullInvoice: invoice.lcID,
            invoice: invoice.invoice,
            licenseType: licenseType,
            year: year,
            requestDate: requestDate,
            requestorName: requestorName,
            legalRepresentative: legalRepresentative,
            elaboratedBy: 'someone',
            address: address,
            number: number,
            colony: colony,
            catastralKey: catastralKey,
            licenseTerm: licenseTerm,
            surfaceTotal: surface,
            licenseZone: zone ? zone : 1,
            expeditionDate: expeditionDate,
            licenseValidity: licenseValidity,
            collectionOrder: collectionOrder,
            paymentDate: paymentDate,
            billInvoice: billInvoice,
            authorizedQuantity: authorizedQuantity,
            deliveryDate: deliveryDate,
            receiverName: receiverName,
            observations: 'none',
            licenseSpecialData: licenseSpecialData
        });

        const destination = path.join(__dirstorage, 'assets', 'urban', newLicense.fullInvoice, 'zone.png');
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

        if(files.resumeTables) {
            await Promise.all(files.resumeTables.map(e => {
                const currentDestination = path.join(__dirstorage, 'assets', 'urban', modifiedLicense.fullInvoice, e.originalname);
                return new Promise((resolve, reject) => {
                    fs.writeFile(currentDestination, e.buffer, (err) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve();
                    });
                });
            }));
        }

        requestLogger.create('Urban creation request completed:\n    Record: %s\n    Invoice: %s', newLicense.id, newLicense.fullInvoice)

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
                key == 'actualAuthorizedFS') {
                    console.log("Skipped", typeof key, key)
            } else {
                req.body[key] = req.body[key].toLowerCase();
            }
        }

        const {
            requestorName,
            legalRepresentative,
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
            PCU,
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
            habitacionalLotes,
            totalManzanas,
            totalSurface,
            totalRelotification,
            resultRelotification,
            previousInvoice,
            previousInvoiceDate,
        } = req.body;

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
        newSpecialData.habitacionalLotes = habitacionalLotes ? habitacionalLotes : newSpecialData.habitacionalLotes;
        newSpecialData.totalManzanas = totalManzanas ? totalManzanas : newSpecialData.totalManzanas;
        newSpecialData.totalSurface = totalSurface ? totalSurface : newSpecialData.totalSurface;
        newSpecialData.totalRelotification = totalRelotification ? totalRelotification : newSpecialData.totalRelotification;
        newSpecialData.resultRelotification = resultRelotification ? resultRelotification.replaceAll('\r', '').split('\n') : newSpecialData.resultRelotification;
        newSpecialData.previousInvoice = previousInvoice ? previousInvoice : newSpecialData.previousInvoice;
        newSpecialData.previousInvoiceDate = previousInvoiceDate ? previousInvoiceDate : newSpecialData.previousInvoiceDate;

        await modifiedLicense.update({
            requestDate: requestDate,
            requestorName: requestorName,
            legalRepresentative: legalRepresentative,
            address: address,
            colony: colony,
            catastralKey: catastralKey,
            surfaceTotal: surface,
            licenseZone: zone,
            expeditionDate: expeditionDate,
            collectionOrder: collectionOrder,
            paymentDate: paymentDate,
            billInvoice: billInvoice,
            authorizedQuantity: authorizedQuantity,
            deliveryDate: deliveryDate,
            receiverName: receiverName,
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
                    const currentDestination = path.join(__dirstorage, 'assets', 'urban', modifiedLicense.fullInvoice, e.originalname);
                    return new Promise((resolve, reject) => {
                        fs.writeFile(currentDestination, e.buffer, (err) => {
                            if (err) {
                                return reject(err);
                            }
                            resolve();
                        });
                    });
                }));
            }
        }

        requestLogger.update('Urban update request completed:\n    Record: %s\n    Invoice: %s', modifiedLicense.id, modifiedLicense.fullInvoice);

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

        const license = await UrbanLicense.findByPk(id);

        if (license == null) {
            res.status(404).json({ msg: "The requested data does not exist or is unavailable" });
            return;
        }

        license.destroy();

        requestLogger.delete('Urban delete request completed:\n    Record: %s\n    Invoice: %s', license.id, license.fullInvoice);

        res.status(200).json({msg: "Record deleted successfully"});
    } catch (error) {
        consoleLogger.error('\n  Request failed due to server side error:\n  Error: %s', error)
        requestLogger.error('Request failed due to server side error:\n    Error: %s', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const getLicensePDF= async (req, res) => {
    try {
        const type = req.params.type;
        const invoice = req.params.invoice;
        const year = req.params.year;

        const license = await UrbanLicense.findOne({
            where: {
                licenseType: type,
                invoice: invoice,
                year: year
            },
            include: [
                {
                    model: UrbanType,
                    attributes: ['licenseType']
                },
                {
                    model: Zone,
                    attributes: ['licenseZone', 'licenseKey']
                },
                {
                    model: Term,
                    attributes: ['licenseTerm']
                },
                {
                    model: Validity,
                    attributes: ['licenseValidity']
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

        switch (parseInt(type)) {
            case 1:
                consoleLogger.info('Generating PDF');
                def = generateUrbanC(license);
                break;
            case 2:
                consoleLogger.info('Generating PDF');
                def = generateUrbanLUS(license);
                break;
            case 3:
                consoleLogger.info('Generating PDF');
                def = generateUrbanLSUB(license);
                break;
            case 4:
                consoleLogger.info('Generating PDF');
                def = generateUrbanLFUS(license);
                break;
            case 5:
                consoleLogger.info('Generating PDF');
                def = await generateUrbanPLF(license);
                break;
            case 6:
                consoleLogger.info('Generating PDF');
                def = await generateUrbanLF(license);
                break;
            case 7:
                consoleLogger.info('Generating PDF');
                def = await generateUrbanRLF(license);
                break;
            case 8:
                consoleLogger.info('Generating PDF');
                def = await generateUrbanCRPC(license);
                break;
        
            default:
                def = generateUrbanC(license);
                break;
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

async function deleteFiles(directory) {
    return new Promise((resolve, reject) => {
        fs.readdir(directory, (err, files) => {
            if (err) {
                return reject(err);
            }

            let deletePromises = files
                .filter(file => file.startsWith('lote_') || file.startsWith('area_'))
                .map(file => {
                    return new Promise((resolve, reject) => {
                        fs.unlink(path.join(directory, file), err => {
                            if (err) {
                                console.error(`Error deleting file ${file}:`, err);
                                return reject(err);
                            }
                            console.log(`Deleted file ${file}`);
                            resolve();
                        });
                    });
                });

            Promise.all(deletePromises)
                .then(resolve)
                .catch(reject);
        });
    });
}