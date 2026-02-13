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
import { validateDates, validatePeriod } from '../validations/administration.validations.js';
import path from 'path';
import { __dirstorage } from '../path.configuration.js';
import { requestCoordinateCheck } from './geo.service.js';
import { unaccent } from "../utilities/repository.utilities.js";
import { generateLandQuarterReport, generateLandGeoRefReport, generateLandStatusReport } from '../models/documents/landUse/quarterReport.js';
import { dateFormatFull } from '../utilities/document.utilities.js';
import { generateLandDataReport } from '../utilities/reporting.utilities.js';
import { literal } from "sequelize";
import { parseBool } from '../utilities/urban.utilities.js';
import * as notificationRepo from '../repositories/notification.repository.js';
import { getIO } from '../sockets/handler.socket.js';

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

    const searchValue = unaccent(value);

    let LICENSES = await landRepo.findLandLicenseBy(parameter, searchValue);

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

export async function requestUnapprovedLandLicenses() {

    let LICENSES = await landRepo.findUnapprovedLandLicenses();

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

export async function requestLandLicenseCreate(body, files, requestor) {
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
        //zone,
        businessLinePrint,
        businessLineIntern,
        authorizedUse,
        expeditionType,
        //term,
        validity,
        requestDate,
        expeditionDate,
        expirationDate,
        paymentInvoice,
        cost,
        discount,
        paymentDone,
        inspector,
        //COS,
        //alt_max,
        //niveles
    } = body;

    const [zoneIMG] = files.zoneIMG || [];
    const [recordFile] = files.recordFile || [];

    if (!licenseType || !requestorName || !attentionName || !address || !number || !colony || !contactPhone || !catastralKey || !surface || !georeference || !businessLinePrint || !businessLineIntern || !authorizedUse || !expeditionType || !validity || !requestDate || !expeditionDate || !expirationDate || !paymentInvoice || !cost || !discount || !paymentDone || !inspector || !zoneIMG) {
        throw new ValidationError('Request failed due to missing information.',
            'Land use create request',
            `Request failed due to missing information.
            Provided data -> ${JSON.stringify(body)}`);
    }

    const coordinateInfo = await requestCoordinateCheck(georeference);

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

    if (!await landValidate.validateModels({ type: licenseType, authorizedUse, validity, expeditionType })) {
        throw new ValidationError('Request failed due to invalid information.',
            'Land use create request',
            `Request failed due to invalid information.
            Provided data -> License type: ${licenseType}, authorized use: ${authorizedUse}, validity: ${validity}, expedition type: ${expeditionType}`);
    }

    const INVOICE_INFO = await landUtils.generateInvoiceInformation(licenseType, YEAR);

    const SPECIAL_DATA = landUtils.generateSpecialData(licenseType);

    SPECIAL_DATA.COS = coordinateInfo.data.COS;
    SPECIAL_DATA.alt_max = coordinateInfo.data.alt_max;
    SPECIAL_DATA.niveles = coordinateInfo.data.niveles;

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
        licenseTerm: coordinateInfo.data.numericTerm,
        geoReference: georeference,
        licenseZone: coordinateInfo.data.numericZone,
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

    if (!await landValidate.validateFile(zoneIMG)) {
        throw new ValidationError('Invalid files provided only png files are allowed.',
            'Land use create request',
            `Request failed due to invalid files provided.
            Provided file -> ${zoneIMG.originalname}`);
    }

    if (!await landUtils.saveZoneImage(zoneIMG, INVOICE_INFO.fullInvoice)) {
        throw new FileSystemError('Error saving files to server.',
            'Land use create request',
            `Request failed due to unexpected error saving files to server.
            Provided file -> ${zoneIMG.originalname}`);
    }

    if (recordFile) {
        if (!await landValidate.validatePFFile(recordFile)) {
            throw new ValidationError('Invalid files provided only png files are allowed.',
            'Land use create request',
            `Request failed due to invalid files provided.
            Provided file -> ${recordFile.originalname}`);
        }
        if (!await landUtils.saveRecordPDF(recordFile, INVOICE_INFO.fullInvoice)) {
            throw new FileSystemError('Error saving files to server.',
            'Land use create request',
            `Request failed due to unexpected error saving files to server.
            Provided file -> ${recordFile.originalname}`);
        }
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

export async function requestLandLicenseUpdate(id, licenseData, files, requestor) {
    if (!isUuid(id)) {
        throw new ValidationError('Request failed due to invalid ID.',
            'Land use update request',
            `Request failed due to ID ${id} is invalid.`
        );
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
        //zone,
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
        marginName,
        marginAttention,
        compacted,
        includeBusinessLine
        //COS,
        //alt_max,
        //niveles
    } = licenseData;

    const [zoneIMG] = files.zoneIMG || [];
    const [recordFile] = files.recordFile || [];

    const SPECIAL_DATA = await landRepo.getLicenseEspecialData(id);

    if (!SPECIAL_DATA) {
        throw new ResourceError('Request failed due to the record to update does not exist.',
            'Land use update request',
            `Request failed due to record ${id} does not exist.`);
    }

    if (!SPECIAL_DATA.active) {
        
        if (licensePrintInvoice) {

            const MODIFIED_LICENSE = await landRepo.saveLandLicense(id, {
                licensePrintInvoice: licensePrintInvoice
            });

            return {
                license: MODIFIED_LICENSE
            }
        }

        throw new ValidationError('Request failed due to resource is locked.',
            'Land use update request',
            `Request failed due to license locked.`);
    }

    for (const key in licenseData) {
        if (key !== 'conditions' && key !== 'restrictions' && key !== 'anexo' && key !== 'parcela' && key !== 'propertyNo') {
            licenseData[key] = licenseData[key].toLowerCase();
        }
    }

    if (!licensePrintInvoice && !requestorName && !attentionName && !address && !number && !colony && !contactPhone && !catastralKey && !surface && !georeference && !businessLinePrint && !businessLineIntern && !authorizedUse && !expeditionType && !validity && !requestDate && !expeditionDate && !expirationDate && !paymentInvoice && !cost && !discount && !paymentDone && !inspector && !anexo && !restrictions && !conditions && !parcela && !propertyNo && !propertyDate && !marginName && !marginAttention && !compacted && !includeBusinessLine && !zoneIMG && !recordFile && !term) {
        throw new ValidationError('Request failed due to missing information.',
            'Land use update request',
            `Request failed due to missing information.
            Provided data -> ${JSON.stringify(licenseData)}`);
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

    if (!await landValidate.validateModels({ authorizedUse, validity, expeditionType, term })) {
        throw new ValidationError('Request failed due to invalid information.',
            'Land use update request',
            `Request failed due to invalid information.
            Provided data -> Term: ${term}, zone: ${zone}, authorized use: ${authorizedUse}, validity: ${validity}, expedition type: ${expeditionType}`);
    }

    if (marginName && isNaN(parseInt(marginName))) {
        throw new ValidationError('Request failed due to invalid margin.',
            'Land use update request',
            `Request failed due to invalid information.
            Provided data -> Margin Name: ${marginName}.`);
    }

    if (marginAttention && isNaN(parseInt(marginAttention))) {
        throw new ValidationError('Request failed due to invalid margin.',
            'Land use update request',
            `Request failed due to invalid information.
            Provided data -> Margin Attention: ${marginAttention}.`);
    }

    //let newSpecialData = specialDataToJSON(SPECIAL_DATA).licenseSpecialData;
    let newSpecialData = {
        anexo ,
        restrictions: restrictions ? restrictions.replaceAll('\r', '').split('\n') : undefined,
        conditions: conditions ? conditions.replaceAll('\r', '').split('\n') : undefined,
        parcela,
        propertyNo,
        propertyDate,
        marginName: marginName ? parseInt(marginName) : undefined,
        marginAttention: marginAttention ? parseInt(marginAttention) : undefined,
        compacted: parseBool(compacted, false),
        includeBusinessLine: parseBool(includeBusinessLine, false)
    }
    let coordinateInfo;

    if (georeference) {
        coordinateInfo = await requestCoordinateCheck(georeference);

        newSpecialData.COS = coordinateInfo.data.COS;
        newSpecialData.alt_max = coordinateInfo.data.alt_max;
        newSpecialData.niveles = coordinateInfo.data.niveles;
    }

    /*newSpecialData.anexo = anexo ? anexo : newSpecialData.anexo;
    newSpecialData.restrictions = restrictions ? restrictions.replaceAll('\r', '').split('\n') : newSpecialData.restrictions;
    newSpecialData.conditions = conditions ? conditions.replaceAll('\r', '').split('\n') : newSpecialData.conditions;
    newSpecialData.parcela = parcela ? parcela : newSpecialData.parcela;
    newSpecialData.propertyNo = propertyNo ? propertyNo : newSpecialData.propertyNo;
    newSpecialData.propertyDate = propertyDate ? propertyDate : newSpecialData.propertyDate;

    newSpecialData.marginName = marginName ? parseInt(marginName) : newSpecialData.marginName;
    newSpecialData.marginAttention = marginAttention ? parseInt(marginAttention) : newSpecialData.marginAttention;*/

    /*if (comment) {
        newSpecialData.comments = newSpecialData.comments ? newSpecialData.comments : [];

        const newComment = {
            date: Date.now(),
            author: requestor,
            imduyv: true,
            message: comment
        }
        newSpecialData.comments.push(newComment);
    }
    newSpecialData.COS = COS ? COS : newSpecialData.COS;
    newSpecialData.alt_max = alt_max ? alt_max : newSpecialData.alt_max;
    newSpecialData.niveles = niveles ? niveles : newSpecialData.niveles;*/

    newSpecialData = JSON.stringify(newSpecialData).replace(/'/g, "''");

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
        licenseTerm: term ? term : georeference ? coordinateInfo.data.numericTerm : undefined,
        geoReference: georeference ? georeference : undefined,
        licenseZone: georeference ? coordinateInfo.data.numericZone : undefined,
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
        licenseSpecialData: literal(`COALESCE("licenseSpecialData", '{}'::jsonb) || '${newSpecialData}'::jsonb`),
        approvalStatus: false
    }

    if (zoneIMG) {
        if (!await landValidate.validateFile(zoneIMG)) {
            throw new ValidationError('Invalid files provided only png files are allowed for zone image.',
                'Land use update request',
                `Request failed due to invalid files provided.
            Provided file -> ${zoneIMG.originalname}`);
        }

        if (!await landUtils.saveZoneImage(zoneIMG, SPECIAL_DATA.fullInvoice)) {
            throw new FileSystemError('Error saving files to server.',
                'Land use update request',
                `Request failed due to unexpected error saving files to server.
            Provided file -> ${zoneIMG.originalname}`);
        }
    }

    if (recordFile) {
        if (!await landValidate.validatePFFile(recordFile)) {
            throw new ValidationError('Invalid files provided only pdf files are allowed for record.',
                'Land use update request',
                `Request failed due to invalid files provided.
            Provided file -> ${recordFile.originalname}`);
        }

        if (!await landUtils.saveRecordPDF(recordFile, SPECIAL_DATA.fullInvoice)) {
            throw new FileSystemError('Error saving files to server.',
                'Land use update request',
                `Request failed due to unexpected error saving files to server.
            Provided file -> ${recordFile.originalname}`);
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
            'Land use approval request',
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
        approvalStatus: true,
        active: false
    });

    if (!await landUtils.generateArchivePDF(approvedLicense)) {
        throw new FileSystemError('Error saving files to server.',
            'Land use approval request',
            `Request failed due to unexpected error saving files to server.
            File creation for -> ${id}:${licenseApproval.fullInvoice}`);
    }

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

    const licenseLock = await landRepo.findLandLicenseId(id);

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

    if (!await landUtils.generateArchivePDF(licenseLock)) {
        throw new FileSystemError('Error saving files to server.',
            'Land use lock request',
            `Request failed due to unexpected error saving files to server.
            File creation for -> ${id}:${licenseLock.fullInvoice}`);
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
        active: true,
        approvalStatus: false
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

export async function requestObservationCreation(id, comment, author) {
    if (!isUuid(id)) {
        throw new ValidationError('Request failed due to invalid ID.',
            'Land use observation request',
            `Request failed due to ID ${id} is invalid.`
        );
    }

    if (!comment) {
        throw new ValidationError('Request failed due to missing information.',
            'Consultant comment request',
            `Request failed due to no comment was provided`);
    }

    const currentComments = await landRepo.findLandLicenseObservations(id);
    
    const newComments = JSON.parse(currentComments.comments);
    
    newComments.push({
        date: Date.now(),
        author: {
            name: author.name,
            username: author.username,
        },
        imduyv: true,
        message: comment
    });
    
    await landRepo.updateLandLicenseObservations(id, JSON.stringify(newComments).replace(/'/g, "''"));
    

    const notification = await notificationRepo.saveNotifications({
        fullInvoice: currentComments.fullInvoice,
        url: `/app/consultant?type=${currentComments.licenseType}&invoice=${currentComments.invoice}&year=${currentComments.year}`,
        commenter: author.id
    });

    const io = getIO();

    io.to("external_channel").emit("new_comment", {
        notification_uuid: notification.notification_uuid,
        fullInvoice: currentComments.fullInvoice,
        url: notification.url,
        createdAt: notification.createdAt,
        user: {
            name: author.name,
            username: author.username
        }
    });
    
    return {
        comments: newComments
    }
}

export async function requestPDFDefinition(type, invoice, year) {
    if (isNaN(parseInt(type)) ||
        isNaN(parseInt(invoice)) ||
        isNaN(parseInt(year))) {
        throw new ValidationError('Request failed due to invalid search parameters provided.',
            'Land use PDF request by full invoice',
            `Search params /t/${type}/i/${invoice}/y/${year} are invalid.`);
    }

    let LICENSE = await landRepo.findLandLicenseInvoice(type, invoice, year);

    if (!LICENSE) {
        throw new ResourceError('The requested land use record does not exist',
            'Land use PDF request by full invoice',
            `Search params /t/${type}/i/${invoice}/y/${year} not found.`);
    }

    if (!LICENSE.active) {
        return {
            ID: LICENSE.public_land_license_id,
            fullInvoice: LICENSE.fullInvoice,
            file: path.join(__dirstorage, 'assets', 'land', LICENSE.fullInvoice, `${LICENSE.fullInvoice}.pdf`)
        };
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

export async function requestQuarterReports(periodStart, periodEnd, types, observations, report_type) {
    const REPORT_TYPES = ["quarter","geoRef", "status", "excel"];

    if (!periodStart || !periodEnd || !types || !report_type) {
        throw new ValidationError('Request failed due to invalid missing information.',
            'Land use report request',
            `Search params missing: 
                periodStart:${!periodStart}
                periodEnd: ${!periodEnd}
                types: ${!types}
                report_type: ${!report_type}`);
    }

    if(!Array.isArray(types)) {
        throw new ValidationError('Request failed due to invalid parameters provided.',
            'Land use report request',
            `Search param types ${types} is invalid.`);
    }

    if (!validateDates(periodStart) || !validateDates(periodEnd)) {
        throw new ValidationError('Request failed due to dates are in an incorrect format please use ISOS format YYYY-MM-DD',
            'Land use report request',
            `Request failed due to dates are in an incorrect format
            Provided data -> Start date/${periodStart} end date/${periodEnd}.`
        );
    }

    if (!validatePeriod(periodStart, periodEnd)) {
        throw new ValidationError('Request failed due to end date cannot be before start date and viceversa.',
            'Land use report request',
            `Request failed due to period start/end inconsistency
            Provided data -> Start date/${periodStart} end date/${periodEnd}.`
        );
    }

    for (const type of types) {
        if (isNaN(parseInt(type))) {
            throw new ValidationError('Request failed due to invalid type parameters provided.',
                'Land use report',
                `Search param types in ${types} are invalid.`);
        }
    }

    if (!REPORT_TYPES.includes(report_type)) {
        throw new ValidationError('Request failed due to invalid report type requested.',
                'Land use report',
                `Search param report type ${report_type} is invalid.`);
    }

    let reportDefinition

    /*if (!parseBool(isGeoRef, false)) {
        reportDefinition = await generateLandQuarterReport(periodStart, periodEnd, types, observations);
    } else {
        reportDefinition = await generateLandGeoRefReport(periodStart, periodEnd, types, observations);
    }*/

    switch (report_type) {
        case "quarter":
            if (!observations) {
                throw new ValidationError('Request failed due to missing observations.',
            'Land use report request',
            `Observations not provided for quarter report`);
            }

            reportDefinition = await generateLandQuarterReport(periodStart, periodEnd, types, observations);
            break;
    
        case "geoRef":
            reportDefinition = await generateLandGeoRefReport(periodStart, periodEnd, types, observations);
            break;

        case "status":
            reportDefinition = await generateLandStatusReport(periodStart, periodEnd, types, observations);
            break;

        case "excel":
            reportDefinition = await generateLandDataReport(periodStart, periodEnd, types);
            return {
                buffer: reportDefinition
            }
    }

    return {
        definition: reportDefinition
    }
}

export async function requestPeriodIncome(periodStart, periodEnd, types) {
    if(!Array.isArray(types)) {
        throw new ValidationError('Request failed due to invalid parameters provided.',
            'Land use report request',
            `Search param types ${types} is invalid.`);
    }

    if (!validateDates(periodStart) || !validateDates(periodEnd)) {
        throw new ValidationError('Request failed due to dates are in an incorrect format please use ISOS format YYYY-MM-DD',
            'Land use report request',
            `Request failed due to dates are in an incorrect format
            Provided data -> Start date/${periodStart} end date/${periodEnd}.`
        );
    }

    if (!validatePeriod(periodStart, periodEnd)) {
        throw new ValidationError('Request failed due to end date cannot be before start date and viceversa.',
            'Land use report request',
            `Request failed due to period start/end inconsistency
            Provided data -> Start date/${periodStart} end date/${periodEnd}.`
        );
    }

    for (const type of types) {
        if (isNaN(parseInt(type))) {
            throw new ValidationError('Request failed due to invalid type parameters provided.',
                'Land use report',
                `Search param types in ${types} are invalid.`);
        }
    }

    const typesLong = {
        1: 'CONSTANCIA DE USO DE SUELO',
        2: 'LICENCIA DE USO DE SUELO SERVICIOS',
        3: 'LICENCIA DE USO DE SUELO COMERCIAL',
        4: 'LICENCIA DE USO DE SUELO INDUSTRIAL',
        5: 'LICENCIA DE USO DE SUELO SEGREGADO',
        6: 'DERECHO DE PREFERENCIA',
        7: 'LICENCIA DE USO DE SUELO HABITACIONAL'
    }

    const totalCost = await landRepo.findLandLicenseIncome(types, periodStart, periodEnd);

    return {
        period: `${dateFormatFull(periodStart)} - ${dateFormatFull(periodEnd)}`,
        types: types.map(t => {return typesLong[t]}),
        totalPeriodIncome: totalCost
    }
}