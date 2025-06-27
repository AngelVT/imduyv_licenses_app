import * as legacyRepo from "../repositories/land-legacy.repository.js";
import { validate as isUuid } from 'uuid';
import ValidationError from "../errors/ValidationError.js";
import ResourceError from "../errors/ResourceError.js";
import { validatePeriod, validateDates as validateDate } from "../validations/administration.validations.js";

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
    const licenses = await legacyRepo.findLegacyLicenseByRequestor(requestorName);

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
    if (!validateDate(startDate) || !validateDate(endDate)) {
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