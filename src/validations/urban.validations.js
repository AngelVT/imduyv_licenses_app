import { UrbanType, Term, Zone, Validity, UrbanLicense } from "../models/License.models.js";
import { fileTypeFromBuffer } from 'file-type';
import path from 'path';

export function validateParameter(parameter) {
    const VALID_PARAMETERS = {
        fullInvoice: {},
        requestorName: {},
        legalRepresentative: {},
        elaboratedBy: {},
        lastModifiedBy: {},
        catastralKey: {},
        collectionOrder: {},
        billInvoice: {},
        receiverName: {}
    }

    return Object.hasOwn(VALID_PARAMETERS, parameter);
}

export async function validateModels(models) {
    if(models.type) {
        const type = await UrbanType.findByPk(models.type);

        if (type == null) {
            return false
        }
    }

    if (models.term) {
        const terms = await Term.findByPk(models.term);

        if(terms == null) {
            return false;
        }
    }

    if (models.zone) {
        const zones = await Zone.findByPk(models.zone);

        if(zones == null) {
            return false;
        }
    }

    if (models.validity) {
        const validities = await Validity.findByPk(models.validity);

        if(validities == null) {
            return false;
        }
    }

    return true;
}

export async function existingLicenses() {
    const COUNT = await UrbanLicense.count();

    if(COUNT > 0)
        return true;

    return false;
}

export async function checkType(type) {
    const TYPE = await UrbanType.findOne({
        where: {
            licenseType: type
        }
    });

    if (TYPE == null) {
        return false;
    }

    return true;
}

export async function validateFile(files) {
    const allowedTypes = {
        'image/png': '.png',
        'image/svg+xml': '.svg'
    };

    for (const file of files) {
        const ext = path.extname(file.originalname).toLowerCase();

        const detected = await fileTypeFromBuffer(file.buffer);

        const mimetype = detected?.mime || file.mimetype;

        if (!allowedTypes[mimetype] || allowedTypes[mimetype] !== ext) {
            return false;
        }
    }

    return true;
}