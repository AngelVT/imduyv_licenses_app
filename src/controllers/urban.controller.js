import fs from 'fs';
import path from 'path';
import { Op } from 'sequelize';

import { generateUrbanInvoice } from '../libs/fullInvoiceGen.js';
import { __dirstorage } from '../paths.js';
import { consoleLogger, requestLogger } from "../logger.js";
import { UrbanLicense, UrbanType, Zone } from '../models/License.models.js';
import { validate, validUrbanCriteria } from '../libs/validate.js';


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
            catastralKey,
            surface,
            zone,
            expeditionDate,
            collectionOrder,
            paymentDate,
            billInvoice,
            authorizedQuantity,
            deliveryDate,
            receiverName
        } = req.body;

        const file = req.file;

        if (!licenseType || !requestorName || !legalRepresentative || !requestDate || !colony || !address || !catastralKey || !surface || !zone || !expeditionDate || !collectionOrder || !paymentDate || !billInvoice || !authorizedQuantity || !deliveryDate || !receiverName) {
            res.status(400).json({ msg: "There is missing information" });
            return;
        }

        const invoice = await generateUrbanInvoice(licenseType, year);

        if (invoice == null) {
            res.status(400).json({ msg: "Invalid information provided." });
            return;
        }

        const validated = await validate({urbanType: licenseType, zone});

        if (validated == null) {
            res.status(400).json({ msg: "Invalid information provided." });
            return;
        }

        const fileName = invoice.lcID + '_zone.png';

        const destination = path.join(__dirstorage, 'zones', 'urban',fileName);

        fs.writeFile(destination, file.buffer, err => {
            if (err) {
                console.log(err);
            }
        });

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
            colony: colony,
            catastralKey: catastralKey,
            surfaceTotal: surface,
            zoneImage: fileName,
            licenseZone: zone,
            expeditionDate: expeditionDate,
            collectionOrder: collectionOrder,
            paymentDate: paymentDate,
            billInvoice: billInvoice,
            authorizedQuantity: authorizedQuantity,
            deliveryDate: deliveryDate,
            receiverName: receiverName,
            observations: 'none',
            licenseSpecialData: {}
        });

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

        for (const key in req.body) {
            req.body[key] = req.body[key].toLowerCase();
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
            receiverName
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
            authorizedquantity: authorizedQuantity,
            deliveryDate: deliveryDate,
            receiverName: receiverName,
        });

        if(file) {
            const fileName = modifiedLicense.zoneImage;

            const destination = path.join(__dirstorage, 'zones', 'urban',fileName);

            fs.writeFile(destination, file.buffer, err => {
                if (err) {
                    console.log(err);
                }
            });
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