import { Type, Term, Zone, AuthUse, Validity, ExpeditionType, LandUseLicense } from "../models/License.models.js";
import { fileTypeFromBuffer } from 'file-type';
import path from 'path';

export function validateParameter(parameter) {
    const VALID_PARAMETERS = {
        fullInvoice: {},
        requestorName: {},
        attentionName: {},
        elaboratedBy: {},
        lastModifiedBy: {},
        address: {},
        number: {},
        colony: {},
        catastralKey: {},
        geoReference: {},
        businessLinePrint: {},
        businessLineIntern: {},
        paymentInvoice: {},
        contactPhone: {},
        cost: {},
        discount: {},
        paymentDone: {},
        inspector: {}
    }

    return Object.hasOwn(VALID_PARAMETERS, parameter);
}

export async function validateModels(models) {
    if(models.type) {
        const type = await Type.findByPk(models.type);

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

    if (models.authUse) {
        const authUses = await AuthUse.findByPk(models.authUse);

        if(authUses == null) {
            return false;
        }
    }

    if (models.validity) {
        const validities = await Validity.findByPk(models.validity);

        if(validities == null) {
            return false;
        }
    }

    if (models.expeditionType) {
        const expeditionTypes = await ExpeditionType.findByPk(models.expeditionType);

        if(expeditionTypes == null) {
            return false;
        }
    }

    return true;
}

export async function existingLicenses() {
    const COUNT = await LandUseLicense.count();

    if(COUNT > 0)
        return true;

    return false;
}

export async function checkType(type) {
    const TYPE = await Type.findOne({
        where: {
            licenseType: type
        }
    });

    if (TYPE == null) {
        return false;
    }

    return true;
}

export async function validateFile(file) {
    if (file.mimetype !== 'image/png') {
        return false
    }

    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.png') {
        return false;
    }

    const detectedType = await fileTypeFromBuffer(file.buffer);
    if (!detectedType || detectedType.mime !== 'image/png') {
        return false;
    }
    
    return true;
}