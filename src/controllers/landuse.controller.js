import fs from 'fs';
import path from 'path';

import { generateInvoice } from '../libs/fullInvoiceGen.js';
import { __dirstorage } from '../paths.js';
import { consoleLogger, requestLogger } from "../logger.js";

import { LandUseLicense } from '../models/License.models.js';


export const getLicenses = (req, res) => {
    res.status(200).json({ msg: "Getting all"});
}

export const getLicense = (req, res) => {
    res.status(200).json({ msg: "Getting single"});
}

export const createLicense = async (req, res) => {
    try {
        const date = new Date;

        const year = date.getFullYear();

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

        if (!licenseType|| !requestorName|| !attentionName|| !address|| !number|| !colony|| !contactPhone|| !catastralKey|| !surface|| !georeference|| !zone|| !businessLinePrint|| !businessLineIntern|| !authorizedUse|| !expeditionType|| !term|| !validity|| !requestDate|| !expeditionDate|| !expirationDate|| !paymentInvoice|| !cost|| !discount|| !paymentDone|| !inspector || !file) {
            res.status(400).json({ msg: "There is missing information" });
            return;
        }

        const invoice = await generateInvoice(licenseType, year);

        if (invoice == null) {
            res.status(400).json({ msg: "Invalid information provided." });
            return;
        }

        const fileName = invoice.lcID + '_zone.png';

        const destination = path.join(__dirstorage, 'zones', 'land',fileName);

        fs.writeFile(destination, file.buffer, err => {
            if (err) {
                console.log(err);
            }
        });

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
            term: term,
            geoReference: georeference,
            zoneImage: fileName,
            zone: zone,
            authorizedUse: authorizedUse,
            businessLinePrint: businessLinePrint,
            businessLineIntern: businessLineIntern,
            expeditionDate: expeditionDate,
            validity: validity,
            paymentInvoice: paymentInvoice,
            expirationDate: expirationDate,
            expeditionType: expeditionType,
            contactPhone: contactPhone,
            cost: cost,
            discount: discount,
            paymentDone: paymentDone,
            inspector: inspector
        });

        requestLogger.create('Land use creation request completed:\n    Record: %s\n    Invoice: %s', newLicense.id, newLicense.fullInvoice);

        res.status(200).json({ createdAt: newLicense.createdAt, fullInvoice: newLicense.fullInvoice, dbInvoice: newLicense.invoice});
    } catch (error) {
        consoleLogger.error('\n  Request failed due to server side error:\n  Error: %s', error)
        requestLogger.error('Request failed due to server side error:\n    Error: %s', error);
        res.status(200).json({msg: "Internal server error"});
    }
}

export const updateLicense= (req, res) => {
    res.status(200).json({ msg: "Updating"});
}

export const deleteLicense = (req, res) => {
    res.status(200).json({ msg: "Deleting"});
}