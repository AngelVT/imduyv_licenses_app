import { UrbanType, Term, Zone, Validity } from "../models/License.models.js";

export function validateParameter(parameter) {
    const VALID_PARAMETERS = {
        fullInvoice: {},
        requestorName: {},
        legalRepresentative: {},
        elaboratedBy: {},
        lastModifiedBy: {},
        colony: {},
        catastralKey: {},
        geoReference: {},
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