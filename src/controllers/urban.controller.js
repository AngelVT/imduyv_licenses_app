import fs from 'fs';
import path from 'path';

import { generateUrbanInvoice } from '../libs/fullInvoiceGen.js';
import { __dirstorage } from '../paths.js';
import { consoleLogger, requestLogger } from "../logger.js";
import { UrbanLicense, UrbanType, Zone } from '../models/License.models.js';
import { validate } from '../libs/validate.js';


export const getLicenses = (req, res) => {
    try {
        res.status(200).json({ msg: "Getting all"});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Error on server"});
    }
}

export const getLicense = (req, res) => {
    try {
        res.status(200).json({ msg: "Getting single"});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Error on server"});
    }
}

export const createLicense = async (req, res) => {
    try {
        const date = new Date;

        const year = date.getFullYear();

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
            billInvoice: 'C-' + billInvoice,
            authorizedquantity: authorizedQuantity,
            deliveryDate: deliveryDate,
            receiverName: receiverName,
            observations: 'none'
        });

        requestLogger.create('Urban creation request completed:\n    Record: %s\n    Invoice: %s', newLicense.id, newLicense.fullInvoice)

        res.status(200).json({ msg: "Creating"});
    } catch (error) {
        consoleLogger.error('\n  Request failed due to server side error:\n  Error: %s', error)
        requestLogger.error('Request failed due to server side error:\n    Error: %s', error);
        res.status(200).json({msg: "Internal server error"});
    }
}

export const updateLicense= (req, res) => {
    try {
        res.status(200).json({ msg: "Updating"});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Error on server"});
    }
    
}

export const deleteLicense = (req, res) => {
    try {
        res.status(200).json({ msg: "Deleting"});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Error on server"});
    }
}