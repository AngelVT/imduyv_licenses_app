import * as landRepo from '../repositories/landuse.repository.js';
import * as landValidate from '../validations/landuse.validations.js';
import * as landUtils from '../utilities/landuse.utilities.js';
import { specialDataToJSON } from '../utilities/json.utilities.js';
import { generateLandUseC } from "../models/docs/landUse/licenciaC.js";
import { generateLandUseL } from "../models/docs/landUse/licenciaL.js";
import { generateLandUseDP } from "../models/docs/landUse/licenciaDP.js";

export async function requestAllLandLicenses() {

    let LICENSES = await landRepo.findAllLandLicenses();

    if (LICENSES == null || LICENSES.length == 0) {
        return {
            status: 404,
            data: {
                msg: "There are no land use records to display"
            },
            log: "Request completed but there are no records to display"
        };
    }

    LICENSES = specialDataToJSON(LICENSES);

    return {
        status: 200,
        data: {
            licenses: LICENSES
        },
        log: "Request completed all records requested"
    };
}

export async function requestLandLicenseById(id) {
    let LICENSE = await landRepo.findLandLicenseId(id);

    if (LICENSE == null) {
        return {
            status: 404,
            data: {
                msg: "There requested land use record does not exist"
            },
            log: `Request completed record ${id} not found`
        };
    }

    LICENSE = specialDataToJSON(LICENSE);

    return {
        status: 200,
        data: {
            license: LICENSE
        },
        log: `Request completed record ${LICENSE.id}:${LICENSE.fullInvoice} requested`
    };
}

export async function requestLandLicenseByInvoice(type, invoice, year) {
    let LICENSE = await landRepo.findLandLicenseInvoice(type, invoice, year);

    if (LICENSE == null) {
        return {
            status: 404,
            data: {
                msg: "There requested land use record does not exist"
            },
            log: `Request completed record ${type}/${invoice}/${year} not found`
        };
    }

    LICENSE = specialDataToJSON(LICENSE);

    return {
        status: 200,
        data: {
            license: LICENSE
        },
        log: `Request completed record ${LICENSE.id}:${LICENSE.fullInvoice} requested`
    };
}

export async function requestLandLicenseByType(type, year) {
    let LICENSES = await landRepo.findLandLicenseType(type, year);

    if (LICENSES == null || LICENSES.length == 0) {
        return {
            status: 404,
            data: {
                msg: "There are no land use records to display"
            },
            log: `Request completed no records of type ${type} from ${year}`
        };
    }

    LICENSES = specialDataToJSON(LICENSES);

    return {
        status: 200,
        data: {
            licenses: LICENSES
        },
        log: `Request completed records of type ${type} from ${year} requested`
    };
}

export async function requestLandLicenseByParameter(parameter, value) {
    if (!landValidate.validateParameter(parameter)) {
        return {
            status: 400,
            data: {
                msg: "Invalid search parameter"
            },
            log: `Request not completed due to invalid parameter: ${parameter}`
        };
    }

    let LICENSES = await landRepo.findLandLicenseBy(parameter, value)

    if (LICENSES == null || LICENSES.length == 0) {
        return {
            status: 404,
            data: {
                msg: "There are no matching result for this search"
            },
            log: `Request completed no records where ${parameter} = ${value}`
        };
    }

    LICENSES = specialDataToJSON(LICENSES);

    return {
        status: 200,
        data: {
            licenses: LICENSES
        },
        log: `Request completed records where ${parameter} = ${value}`
    };
}

export async function requestLandLicenseCreate(body, file, requestor) {
    const DATE = new Date;

    const YEAR = DATE.getFullYear();

    for (const key in body) {
        body[key] = body[key].toLowerCase();
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
    } = body;
    
    if (!licenseType || !requestorName|| !attentionName|| !address|| !number|| !colony|| !contactPhone|| !catastralKey|| !surface|| !georeference|| !zone|| !businessLinePrint|| !businessLineIntern|| !authorizedUse|| !expeditionType|| !term|| !validity|| !requestDate|| !expeditionDate|| !expirationDate|| !paymentInvoice|| !cost|| !discount|| !paymentDone|| !inspector || !file) {
        return {
            status: 400,
            data: {
                msg: "Unable to create due to missing information"
            },
            log: `Request not completed due to missing information`
        };
    }

    if (!await landValidate.validateModels({type: licenseType,term,zone,authorizedUse,validity,expeditionType})) {
        return {
            status: 400,
            data: {
                msg: "Unable to create due to invalid information provided"
            },
            log: `Request not completed due to invalid information`
        };
    }

    const INVOICE_INFO = await landUtils.generateInvoiceInformation(licenseType, YEAR);

    const SPECIAL_DATA = landUtils.generateSpecialData(licenseType);

    const NEW_LICENSE_DATA = {
        fullInvoice: INVOICE_INFO.fullInvoice,
        invoice: INVOICE_INFO.numericInvoice,
        licenseType: licenseType,
        year: YEAR,
        requestorName: requestorName,
        attentionName: attentionName,
        elaboratedBy: requestor,
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
        licenseSpecialData: SPECIAL_DATA
    }

    if (!await landUtils.saveZoneImage(file, INVOICE_INFO.fullInvoice)) {
        return {
            status: 400,
            data: {
                msg: "Error saving files to server"
            },
            log: `Error saving files in the server`
        };
    }

    const NEW_LICENSE = await landRepo.saveNewLandLicense(NEW_LICENSE_DATA);

    if (NEW_LICENSE == null) {
        return {
            status: 400,
            data: {
                msg: "Unable to create, license already exist"
            },
            log: `Request not completed, record already exist`
        };
    }

    return {
        status: 200,
        data: {
            license: NEW_LICENSE
        },
        log: `Request completed records where ${NEW_LICENSE.id}
            ${NEW_LICENSE.fullInvoice}`
    };
}

export async function requestLandLicenseUpdate(id, licenseData, file, requestor) {
    for (const key in licenseData) {
        if (key !== 'conditions' && key !== 'restrictions' && key !== 'anexo' && key !== 'parcela' && key !== 'propertyNo') {
            licenseData[key] = licenseData[key].toLowerCase();
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
    } = licenseData;

    if (!requestorName && !attentionName && !address && !number && !colony && !contactPhone && !catastralKey && !surface && !georeference && !zone && !businessLinePrint && !businessLineIntern && !authorizedUse && !expeditionType && !term && !validity && !requestDate && !expeditionDate && !expirationDate && !paymentInvoice && !cost && !discount && !paymentDone && !inspector && !anexo && !restrictions && !conditions && !parcela && !propertyNo && !propertyDate && !file) {
        return {
            status: 400,
            data: {
                msg: "Unable to update record due to missing information"
            },
            log: `Request not completed due to missing information`
        };
    }

    if (!await landValidate.validateModels({term,zone,authorizedUse,validity,expeditionType})) {
        return {
            status: 400,
            data: {
                msg: "Unable to create due to invalid information provided"
            },
            log: `Request not completed due to invalid information`
        };
    }

    const SPECIAL_DATA = await landRepo.getLicenseEspecialData(id);

    if (SPECIAL_DATA == null) {
        return {
            status: 404,
            data: {
                msg: "There requested land use record does not exist"
            },
            log: `Request not completed record ${id} not found`
        };
    }

    let newSpecialData = specialDataToJSON(SPECIAL_DATA).licenseSpecialData;

    newSpecialData.anexo = anexo ? anexo : newSpecialData.anexo;
    newSpecialData.restrictions = restrictions ? restrictions : newSpecialData.restrictions;
    newSpecialData.conditions = conditions ? conditions.replaceAll('\r', '').split('\n') : newSpecialData.conditions;
    newSpecialData.parcela = parcela ? parcela : newSpecialData.parcela;
    newSpecialData.propertyNo = propertyNo ? propertyNo : newSpecialData.propertyNo;
    newSpecialData.propertyDate = propertyDate ? propertyDate : newSpecialData.propertyDate;

    const NEW_DATA ={
        requestorName: requestorName,
        attentionName: attentionName,
        lastModifiedBy: requestor,
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
    }

    if (file) {
        await landUtils.saveZoneImage(file, SPECIAL_DATA.fullInvoice);
    }
    
    const MODIFIED_LICENSE = await landRepo.saveLandLicense(id, NEW_DATA);

    return {
        status: 200,
        data: {
            license: MODIFIED_LICENSE
        },
        log: `Request completed record modified ${MODIFIED_LICENSE.id}:${MODIFIED_LICENSE.fullInvoice}`
    };
}

export async function requestLandLicenseDelete(id) {
    const DELETED_LICENSE = await landRepo.deleteLandLicense(id);

    if (DELETED_LICENSE == null) {
        return {
            status: 404,
            data: {
                msg: "There requested land use record does not exist"
            },
            log: `Request not completed record ${id} not found`
        };
    }

    return {
        status: 200,
        data: {
            msg: `User ${DELETED_LICENSE.fullInvoice} deleted successfully.`
        },
        log: `Request completed:
            ID -> ${DELETED_LICENSE.id}
            Invoice -> ${DELETED_LICENSE.fullInvoice}`
    }
}

export async function requestPDFDefinition(type, invoice, year) {
    let LICENSE = await landRepo.findLandLicenseInvoice(type, invoice, year);

    if (LICENSE == null) {
        return {
            status: 404,
            data: {
                msg: "There requested land use record does not exist"
            },
            log: `Request completed record ${type}/${invoice}/${year} not found`
        };
    }

    LICENSE = specialDataToJSON(LICENSE);

    let DEFINITION

    if (type == 1) {
        DEFINITION = await generateLandUseC(LICENSE);
    }

    if (type >= 2 && type <= 6) {
        DEFINITION = await generateLandUseL(LICENSE);
    }

    if (type == 7) {
        DEFINITION = await generateLandUseDP(LICENSE);
    }

    return {
        status: 200,
        data: {
            fullInvoice: LICENSE.fullInvoice,
            definition: DEFINITION
        },
        log: `Request completed, PDF generated for record ${LICENSE.id}:${LICENSE.fullInvoice}`
    };
}