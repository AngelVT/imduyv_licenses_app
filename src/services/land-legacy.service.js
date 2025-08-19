import * as legacyRepo from "../repositories/land-legacy.repository.js";
import { validate as isUuid } from 'uuid';
import ValidationError from "../errors/ValidationError.js";
import ResourceError from "../errors/ResourceError.js";
import { validatePeriod, validateDates } from "../validations/administration.validations.js";
import { validatePFFile } from "../validations/landuse.validations.js";
import { saveLegacyPDF } from "../utilities/landuse.utilities.js";
import FileSystemError from "../errors/FileSystemError.js";
import { unaccent } from "../utilities/repository.utilities.js";

export async function requestLegacyLicenseByUUID(id) {
    if (!isUuid(id)) {
        throw new ValidationError('Request failed due to invalid ID.',
            'Land use legacy request by ID',
            `Request failed due to ID ${id} is invalid.`
        );
    }

    const license = await legacyRepo.findLegacyLicenseByUUID(id);

    if (!license) {
        throw new ResourceError('The requested land use legacy record does not exist.',
            'Land use legacy request by ID.',
            `Request completed record ${id} does not exist.`);
    }

    return {
        license
    }
}

export async function requestLegacyLicenseByInvoice(invoice) {
    const format = /^[A-Za-z]{1,3}\/\d{3}(\/\d{4})?$/;

    if (!format.test(invoice)) {
        throw new ValidationError('Request failed due to invalid invoice, it is recommended to use this format to search TYPE/###/####.',
            'Land use legacy request by ID',
            `Request failed due to ID ${invoice} is invalid.`
        );
    }

    const licenses = await legacyRepo.findLegacyLicenseByInvoice(invoice);

    if (!licenses || licenses.length === 0) {
        throw new ResourceError('The requested land use legacy record does not exist, it is recommended to use this format to search TYPE/###/####.',
            'Land use legacy request by invoice.',
            `Request completed record ${invoice} does not exist.`);
    }

    return {
        licenses
    }
}

export async function requestLegacyLicenseByTypeYear(type, year) {
    if (isNaN(parseInt(type)) ||
        isNaN(parseInt(year))) {
        throw new ValidationError('Request failed due to invalid search parameters provided.',
            'Land use legacy request by type and year',
            `Search params /t/${type}/y/${year} are invalid.`);
    }

    const licenses = await legacyRepo.findLegacyLicenseByTypeYear(type, year);

    if (!licenses || licenses.length === 0) {
        throw new ResourceError('The requested records do not exist.',
            'Land use legacy request by type and year',
            `Search params /t/${type}/y/${year} not found.`);
    }

    return {
        licenses
    }
}

export async function requestLegacyLicenseByCatastralKey(catastralKey) {
    const licenses = await legacyRepo.findLegacyLicenseByCatastralKey(catastralKey);

    if (!licenses || licenses.length === 0) {
        throw new ResourceError('The requested records do not exist.',
            'Land use legacy request by catastral key',
            `Search catastral key ${catastralKey} not found.`);
    }

    return {
        licenses
    }
}

export async function requestLegacyLicenseByRequestor(requestorName) {
    const name = unaccent(requestorName);

    const licenses = await legacyRepo.findLegacyLicenseByRequestor(name);

    if (!licenses || licenses.length === 0) {
        throw new ResourceError('The requested records do not exist.',
            'Land use legacy request by requestor name',
            `Search requestor name ${requestorName} not found.`);
    }

    return {
        licenses
    }
}

export async function requestLegacyLicenseByPeriod(startDate, endDate) {
    if (!validateDates(startDate) || !validateDates(endDate)) {
        throw new ValidationError('Request failed due to invalid search parameters provided.',
            'Land use legacy request by period',
            `Search params start date: ${startDate}, end date: ${endDate} are invalid.`);
    }

    if (!validatePeriod(startDate, endDate)) {
        throw new ValidationError('Request failed due to end date cannot be before start date and viceversa.',
            'Land use legacy request by period',
            `Request failed due to period start/end inconsistency
            Provided data -> Period from ${startDate} to ${administrationEnd}.`
        );
    }

    const licenses = await legacyRepo.findLegacyLicenseByPeriod(startDate, endDate);

    if (!licenses || licenses.length === 0) {
        throw new ResourceError('The requested records do not exist.',
            'Land use legacy request by requestor name',
            `Search by period ${startDate} to ${endDate} not found.`);
    }

    return {
        licenses
    }
}

export async function requestLegacyPDFUpload(id, file) {
    if (!isUuid(id)) {
        throw new ValidationError('Request failed due to invalid ID.',
            'Land use legacy upload request',
            `Request failed due to ID ${id} is invalid.`
        );
    }

    const license = await legacyRepo.findLegacyLicenseByUUID(id);

    if (!license) {
        throw new ResourceError('The requested land use legacy record does not exist.',
            'Land use legacy upload request',
            `Request completed record ${id} does not exist.`);
    }

    if (!await validatePFFile(file)) {
        throw new ValidationError('Request failed due to invalid file provided.',
            'Land use legacy upload request',
            `Request failed due to file ${file.originalname} is invalid.`
        );
    }

    file.originalname = `${license.licencia.replaceAll('/', '_')}.pdf`;

    if (!await saveLegacyPDF(file)) {
        throw new FileSystemError('Error saving files to server.',
            'Land use legacy upload request',
            `Request failed due to unexpected error saving files to server.
            Provided file -> ${file.originalname}`);
    }

    return {
        msg: `PDF uploaded successfully for license ${license.licencia}`
    }
}