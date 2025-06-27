import * as landRepo from '../repositories/landuse.repository.js';
import * as landValidate from '../validations/landuse.validations.js';
import * as landUtils from '../utilities/landuse.utilities.js';
import { validate as isUuid } from 'uuid';
import { specialDataToJSON } from '../utilities/json.utilities.js';
import { generateLandUseC } from "../models/documents/landUse/licenciaC.js";
import { generateLandUseL } from "../models/documents/landUse/licenciaL.js";
import { generateLandUseDP } from "../models/documents/landUse/licenciaDP.js";
import ResourceError from '../errors/ResourceError.js';
import ValidationError from '../errors/ValidationError.js';
import FileSystemError from '../errors/FileSystemError.js';
import { validateDates } from '../validations/administration.validations.js';

export async function requestAllLandLicenses() {

    let LICENSES = await landRepo.findAllLandLicenses();

    if (!LICENSES || LICENSES.length === 0) {
        throw new ResourceError('There are no land use records to display.',
            'Land use request all records',
            'There are no land use records registered.');
    }

    LICENSES = specialDataToJSON(LICENSES);

    return {
        licenses: LICENSES
    }
}

export async function requestLandLicenseById(id) {
    if (!isUuid(id)) {
        throw new ValidationError('Request failed due to invalid ID.',
            'Land use request by ID',
            `Request failed due to ID ${id} is invalid.`
        );
    }

    let LICENSE = await landRepo.findLandLicenseId(id);

    if (!LICENSE) {
        throw new ResourceError('The requested land use record does not exist.',
            'Land use request by ID.',
            `Request completed record ${id} does not exist.`);
    }

    LICENSE = specialDataToJSON(LICENSE);

    return {
        license: LICENSE
    }
}

export async function requestLandLicenseByInvoice(type, invoice, year) {
    if (isNaN(parseInt(type)) ||
        isNaN(parseInt(invoice)) ||
        isNaN(parseInt(year))) {
        throw new ValidationError('Request failed due to invalid search parameters provided.',
            'Land use request by full invoice',
            `Search params /t/${type}/i/${invoice}/y/${year} are invalid.`);
    }

    let LICENSE = await landRepo.findLandLicenseInvoice(type, invoice, year);

    if (!LICENSE) {
        throw new ResourceError('The requested land use record does not exist',
            'Land use request by full invoice',
            `Search params /t/${type}/i/${invoice}/y/${year} not found.`);
    }

    LICENSE = specialDataToJSON(LICENSE);
    return {
        license: LICENSE
    }
}

export async function requestLandLicenseByType(type, year) {
    if (isNaN(parseInt(type)) ||
        isNaN(parseInt(year))) {
        throw new ValidationError('Request failed due to invalid search parameters provided.',
            'Land use request by type and year',
            `Search params /t/${type}/y/${year} are invalid.`);
    }

    let LICENSES = await landRepo.findLandLicenseType(type, year);

    if (!LICENSES || LICENSES.length === 0) {
        throw new ResourceError('The requested records do not exist.',
            'Land use request by type and year',
            `Search params /t/${type}/y/${year} not found.`);
    }

    LICENSES = specialDataToJSON(LICENSES);

    return {
        licenses: LICENSES
    }
}

export async function requestLandLicenseByParameter(parameter, value) {
    if (!landValidate.validateParameter(parameter)) {
        throw new ValidationError('Request failed due to invalid search parameters provided.',
            'Land use request by parameter',
            `Search param ${parameter} is invalid.`);
    }

    let LICENSES = await landRepo.findLandLicenseBy(parameter, value)

    if (!LICENSES || LICENSES.length === 0) {
        throw new ResourceError('There are no matching record results results',
            'Land use request by parameter',
            `Search by param ${parameter} not found.`);
    }

    LICENSES = specialDataToJSON(LICENSES);

    return {
        licenses: LICENSES
    }
}

export async function requestLandLicenseByPrintInvoice(printInvoice) {
    const pattern = /\b\d{4}[-/\\|]\d{4}\b/;

    if (!pattern.test(printInvoice)) {
        throw new ValidationError('Request failed due to invalid print invoice provided.',
            'Land use request by print invoice',
            `Search print invoice ${printInvoice} is invalid.`);
    }

    let LICENSE = await landRepo.findLandLicensePrintInvoice(printInvoice);

    if (!LICENSE) {
        throw new ResourceError('The requested records do not exist.',
            'Land use request by print invoice',
            `Search by print invoice ${printInvoice} not found.`);
    }

    LICENSE = specialDataToJSON(LICENSE);

    return {
        license: LICENSE
    }
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
        inspector,
        COS,
        alt_max,
        niveles
    } = body;

    if (!licenseType || !requestorName || !attentionName || !address || !number || !colony || !contactPhone || !catastralKey || !surface || !georeference || !zone || !businessLinePrint || !businessLineIntern || !authorizedUse || !expeditionType || !term || !validity || !requestDate || !expeditionDate || !expirationDate || !paymentInvoice || !cost || !discount || !paymentDone || !inspector || !COS || !alt_max || !niveles || !file) {
        throw new ValidationError('Request failed due to missing information.',
            'Land use create request',
            `Request failed due to missing information.
            Provided data -> ${JSON.stringify(body)}`);
    }

    if ((requestDate && !validateDates(requestDate)) ||
        (expeditionDate && !validateDates(expeditionDate)) ||
        (expirationDate && !validateDates(expirationDate))) {
        throw new ValidationError(
            'Request failed due to invalid information.',
            'Land use update request',
            `Request failed due to invalid information.
            Provided data -> Request date: ${requestDate}, Expedition date: ${expeditionDate}, Expiration date: ${expirationDate}, Property date: ${propertyDate}`
        );
    }

    if (!await landValidate.validateModels({ type: licenseType, term, zone, authorizedUse, validity, expeditionType })) {
        throw new ValidationError('Request failed due to invalid information.',
            'Land use create request',
            `Request failed due to invalid information.
            Provided data -> License type: ${licenseType}, term: ${term}, zone: ${zone}, authorized use: ${authorizedUse}, validity: ${validity}, expedition type: ${expeditionType}`);
    }

    const INVOICE_INFO = await landUtils.generateInvoiceInformation(licenseType, YEAR);

    const SPECIAL_DATA = landUtils.generateSpecialData(licenseType);

    SPECIAL_DATA.COS = COS;
    SPECIAL_DATA.alt_max = alt_max;
    SPECIAL_DATA.niveles = niveles;

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

    if (!await landValidate.validateFile(file)) {
        throw new ValidationError('Invalid files provided only png files are allowed.',
            'Land use create request',
            `Request failed due to invalid files provided.
            Provided file -> ${file.originalname}`);
    }

    if (!await landUtils.saveZoneImage(file, INVOICE_INFO.fullInvoice)) {
        throw new FileSystemError('Error saving files to server.',
            'Land use create request',
            `Request failed due to unexpected error saving files to server.
            Provided file -> ${file.originalname}`);
    }

    const NEW_LICENSE = await landRepo.saveNewLandLicense(NEW_LICENSE_DATA);

    if (!NEW_LICENSE) {
        throw new ValidationError('Unable to create, license already exist',
            'Land use create request',
            `Request failed due to the record already exist.
            Existing record details -> fullInvoice: ${INVOICE_INFO.fullInvoice}, invoice: ${INVOICE_INFO.numericInvoice}, licenseType: ${licenseType}, year: ${YEAR}`);
    }

    return {
        license: NEW_LICENSE
    }
}

export async function requestLandLicenseUpdate(id, licenseData, file, requestor) {
    if (!isUuid(id)) {
        throw new ValidationError('Request failed due to invalid ID.',
            'Land use update request',
            `Request failed due to ID ${id} is invalid.`
        );
    }

    const SPECIAL_DATA = await landRepo.getLicenseEspecialData(id);

    if (!SPECIAL_DATA) {
        throw new ResourceError('Request failed due to the record to update does not exist.',
            'Land use update request',
            `Request failed due to record ${id} does not exist.`);
    }

    if (!SPECIAL_DATA.active) {
        throw new ValidationError('Request failed due to resource is locked.',
            'Land use update request',
            `Request failed due to license locked.`);
    }

    for (const key in licenseData) {
        if (key !== 'conditions' && key !== 'restrictions' && key !== 'anexo' && key !== 'parcela' && key !== 'propertyNo') {
            licenseData[key] = licenseData[key].toLowerCase();
        }
    }

    const {
        licensePrintInvoice,
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
        propertyDate,
        COS,
        alt_max,
        niveles
    } = licenseData;

    if (!licensePrintInvoice && !requestorName && !attentionName && !address && !number && !colony && !contactPhone && !catastralKey && !surface && !georeference && !zone && !businessLinePrint && !businessLineIntern && !authorizedUse && !expeditionType && !term && !validity && !requestDate && !expeditionDate && !expirationDate && !paymentInvoice && !cost && !discount && !paymentDone && !inspector && !anexo && !restrictions && !conditions && !parcela && !propertyNo && !propertyDate && !COS && !alt_max && !niveles && !file) {
        throw new ValidationError('Request failed due to missing information.',
            'Land use update request',
            `Request failed due to missing information.
            Provided data -> ${licenseData}`);
    }

    if ((requestDate && !validateDates(requestDate)) ||
        (expeditionDate && !validateDates(expeditionDate)) ||
        (expirationDate && !validateDates(expirationDate)) ||
        (propertyDate && !validateDates(propertyDate))) {
        throw new ValidationError(
            'Request failed due to invalid information.',
            'Land use update request',
            `Request failed due to invalid information.
            Provided data -> Request date: ${requestDate}, Expedition date: ${expeditionDate}, Expiration date: ${expirationDate}, Property date: ${propertyDate}`
        );
    }

    if (!await landValidate.validateModels({ term, zone, authorizedUse, validity, expeditionType })) {
        throw new ValidationError('Request failed due to invalid information.',
            'Land use update request',
            `Request failed due to invalid information.
            Provided data -> Term: ${term}, zone: ${zone}, authorized use: ${authorizedUse}, validity: ${validity}, expedition type: ${expeditionType}`);
    }

    let newSpecialData = specialDataToJSON(SPECIAL_DATA).licenseSpecialData;

    newSpecialData.anexo = anexo ? anexo : newSpecialData.anexo;
    newSpecialData.restrictions = restrictions ? restrictions.replaceAll('\r', '').split('\n') : newSpecialData.restrictions;
    newSpecialData.conditions = conditions ? conditions.replaceAll('\r', '').split('\n') : newSpecialData.conditions;
    newSpecialData.parcela = parcela ? parcela : newSpecialData.parcela;
    newSpecialData.propertyNo = propertyNo ? propertyNo : newSpecialData.propertyNo;
    newSpecialData.propertyDate = propertyDate ? propertyDate : newSpecialData.propertyDate;
    newSpecialData.COS = COS ? COS : newSpecialData.COS;
    newSpecialData.alt_max = alt_max ? alt_max : newSpecialData.alt_max;
    newSpecialData.niveles = niveles ? niveles : newSpecialData.niveles;

    const NEW_DATA = {
        licensePrintInvoice: licensePrintInvoice,
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
        licenseSpecialData: newSpecialData,
        approvalStatus: false
    }

    if (file) {
        if (!await landValidate.validateFile(file)) {
            throw new ValidationError('Invalid files provided only png files are allowed.',
                'Land use update request',
                `Request failed due to invalid files provided.
            Provided file -> ${file.originalname}`);
        }

        if (!await landUtils.saveZoneImage(file, SPECIAL_DATA.fullInvoice)) {
            throw new FileSystemError('Error saving files to server.',
                'Land use update request',
                `Request failed due to unexpected error saving files to server.
            Provided file -> ${file.originalname}`);
        }
    }

    const MODIFIED_LICENSE = await landRepo.saveLandLicense(id, NEW_DATA);

    return {
        license: MODIFIED_LICENSE
    }
}

export async function requestLandLicenseApprove(id, requestor) {
    if (!isUuid(id)) {
        throw new ValidationError('Request failed due to invalid ID.',
            'Land use approval request',
            `Request failed due to ID ${id} is invalid.`
        );
    }

    const licenseApproval = await landRepo.getLicenseApprovalStatus(id);

    if (!licenseApproval) {
        throw new ResourceError('Request failed due to the record to approve does not exist.',
            'Land use update request',
            `Request failed due to record ${id} does not exist.`);
    }

    if (licenseApproval.approvalStatus) {
        return {
            msg: `The license ${licenseApproval.fullInvoice} is already approved`,
            license: {
                id,
                fullInvoice: licenseApproval.fullInvoice
            }
        }
    }

    const approvedLicense = await landRepo.saveLandLicense(id, {
        lastModifiedBy: requestor,
        approvalStatus: true
    });

    return {
        msg: `The license ${approvedLicense.fullInvoice} was approved`,
        license: {
            id,
            fullInvoice: approvedLicense.fullInvoice
        }
    }
}

export async function requestLandLicenseLock(id, requestor) {
    if (!isUuid(id)) {
        throw new ValidationError('Request failed due to invalid ID.',
            'Land use lock request',
            `Request failed due to ID ${id} is invalid.`
        );
    }

    const licenseLock = await landRepo.getLicenseApprovalStatus(id);

    if (!licenseLock) {
        throw new ResourceError('Request failed due to the record to approve does not exist.',
            'Land use lock request',
            `Request failed due to record ${id} does not exist.`);
    }

    if (!licenseLock.approvalStatus) {
        throw new ValidationError('Request failed due to license not approved.',
            'Land use lock request',
            `Request failed due to the license is has not been approved.`
        );
    }

    if (!licenseLock.active) {
        return {
            msg: `The license ${licenseLock.fullInvoice} is already locked`,
            license: {
                id,
                fullInvoice: licenseLock.fullInvoice
            }
        }
    }

    const lockedLicense = await landRepo.saveLandLicense(id, {
        lastModifiedBy: requestor,
        active: false
    });

    return {
        msg: `The license ${lockedLicense.fullInvoice} was locked`,
        license: {
            id,
            fullInvoice: lockedLicense.fullInvoice
        }
    }
}

export async function requestLandLicenseUnlock(id, requestor) {
    if (!isUuid(id)) {
        throw new ValidationError('Request failed due to invalid ID.',
            'Land use unlock request',
            `Request failed due to ID ${id} is invalid.`
        );
    }

    const licenseLock = await landRepo.getLicenseApprovalStatus(id);

    if (!licenseLock) {
        throw new ResourceError('Request failed due to the record to approve does not exist.',
            'Land use unlock request',
            `Request failed due to record ${id} does not exist.`);
    }

    if (licenseLock.active) {
        return {
            msg: `The license ${licenseLock.fullInvoice} is already unlocked`,
            license: {
                id,
                fullInvoice: licenseLock.fullInvoice
            }
        }
    }

    const unlockedLicense = await landRepo.saveLandLicense(id, {
        lastModifiedBy: requestor,
        active: true
    });

    return {
        msg: `The license ${unlockedLicense.fullInvoice} was unlocked`,
        license: {
            id,
            fullInvoice: unlockedLicense.fullInvoice
        }
    }
}

export async function requestLandLicenseDelete(id) {
    if (!isUuid(id)) {
        throw new ValidationError('Request failed due to invalid ID.',
            'Land use update request',
            `Request failed due to ID ${id} is invalid.`
        );
    }

    const DELETED_LICENSE = await landRepo.deleteLandLicense(id);

    if (DELETED_LICENSE == null) {
        throw new ResourceError('Request failed due to the record to update do not exist.',
            'Land use update request',
            `Request failed due to record ${id} does not exist.`);
    }

    return {
        data: {
            msg: `User ${DELETED_LICENSE.fullInvoice} deleted successfully.`
        },
        license: DELETED_LICENSE
    }
}

export async function requestPDFDefinition(type, invoice, year) {
    if (isNaN(parseInt(type)) ||
        isNaN(parseInt(invoice)) ||
        isNaN(parseInt(year))) {
        throw new ValidationError('Request failed due to invalid search parameters provided.',
            'Land use request by full invoice',
            `Search params /t/${type}/i/${invoice}/y/${year} are invalid.`);
    }

    let LICENSE = await landRepo.findLandLicenseInvoice(type, invoice, year);

    if (LICENSE == null) {
        throw new ResourceError('The requested land use record does not exist',
            'Land use request by full invoice',
            `Search params /t/${type}/i/${invoice}/y/${year} not found.`);
    }

    LICENSE = specialDataToJSON(LICENSE);

    let DEFINITION

    if (type == 1) {
        DEFINITION = await generateLandUseC(LICENSE);
    }

    if (type >= 2 && type <= 5) {
        DEFINITION = await generateLandUseL(LICENSE);
    }

    if (type == 6) {
        DEFINITION = await generateLandUseDP(LICENSE);
    }

    return {
        ID: LICENSE.public_land_license_id,
        fullInvoice: LICENSE.fullInvoice,
        definition: DEFINITION
    };
}

export async function requestInvoiceSet(body) {
    const { C, DP, LC, LI, LS, SEG } = body

    if (isNaN(parseInt(C)) ||
        isNaN(parseInt(DP)) ||
        isNaN(parseInt(LC)) ||
        isNaN(parseInt(LI)) ||
        isNaN(parseInt(LS)) ||
        isNaN(parseInt(SEG))) {
        throw new ValidationError('Request failed due to invalid invoice parameters provided.',
            'Land use set start invoices request',
            `Failed due to invalid parameters provided.
                Provided invoices -> ${JSON.stringify(body)}`
        );
    }

    if (!C && !DP && !LC && !LI && !LS && !SEG) {
        throw new ValidationError('Unable to set invoices due to missing information.',
            'Land use set start invoices request',
            `Unable to set invoices due to missing information.
                Provided invoices -> ${JSON.stringify(body)}`
        );
    }

    if (await landValidate.existingLicenses()) {
        throw new ValidationError('Unable to set invoices due to there are invoices already registered.',
            'Land use set start invoices request',
            `Unable to set invoices due to already existing records.`
        );
    }

    for (const key in body) {
        if (landValidate.checkType(key)) {
            await landRepo.saveStartInvoice(body[key], key, new Date().getFullYear());
        }
    }

    return {
        invoices: `C: ${C}
        DP: ${DP}
        LC: ${LC}
        LI: ${LI}
        LS: ${LS}
        SEG: ${SEG}`
    }
}

export async function requestInvoiceCheck() {
    if (!await landValidate.existingLicenses()) {
        throw new ResourceError('No land use record registered.',
            'Land use invoice check request.',
            `No land use records registered`);
    }

    return {
        existing: true
    }
}