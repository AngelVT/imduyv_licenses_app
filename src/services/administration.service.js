import * as periodRepo from '../repositories/administration.repository.js';
import { validate as isUuid } from 'uuid';
import { capitalizeName } from './user.service.js';
import { validateDates, validatePeriod } from '../validations/administration.validations.js';
import ValidationError from '../errors/ValidationError.js';
import ResourceError from '../errors/ResourceError.js';


// * Municipal Administration Periods
export async function requestMunicipalPeriods() {
    const PERIODS = await periodRepo.findAllMunicipalPeriods();

    if (PERIODS.length === 0) {
        throw new ResourceError('There are no periods to display',
            'Municipal period request',
            `There are no municipal administration periods registered`
        );
    }

    return {
        periods: PERIODS
    }
}

export async function requestMunicipalPeriod(id) {
    if (!isUuid(id)) {
        throw new ValidationError('Request failed due to an invalid Id was provided',
            'Municipal period request',
            `Request failed due to invalid ID ${id}.`
        );
    }

    const PERIOD = await periodRepo.findMunicipalPeriodById(id);

    if (!PERIOD) {
        throw new ResourceError('The requested resource does not exist or is unavailable',
            'Municipal period request',
            `Requested ID ${id} not found.`
        );
    }

    return {
        period: PERIOD
    }
}

export async function requestMunicipalPeriodCreate(periodData) {
    const { municipalPresident, administrationStart, administrationEnd } = periodData;

    if (!municipalPresident || !administrationStart || !administrationEnd) {
        throw new ValidationError('Request failed due to missing information',
            'Municipal period create request',
            `Provided data -> ${JSON.stringify(periodData)}.`
        );
    }

    if (!validateDates(administrationStart) || !validateDates(administrationEnd)) {
        throw new ValidationError('Request failed due to dates are in an incorrect format please use ISOS format YYYY-MM-DD',
            'Municipal period create request',
            `Request failed due to dates are in an incorrect format
            Provided data -> Start date/${administrationStart} end date/${administrationEnd}.`
        );
    }

    if (!validatePeriod(administrationStart, administrationEnd)) {
        throw new ValidationError('Request failed due to end date cannot be before start date and viceversa.',
            'Municipal period create request',
            `Request failed due to period start/end inconsistency
            Provided data -> Start date/${administrationStart} end date/${administrationEnd}.`
        );
    }

    periodData.municipalPresident = capitalizeName(municipalPresident);

    const NEW_PERIOD = await periodRepo.saveNewMunicipalPeriod(periodData);

    if (!NEW_PERIOD) {
        throw new ValidationError('Request failed due to period overlapping please check your information again.',
            'Municipal period create request',
            `Request failed due to period overlapping
            Provided data -> Start date/${administrationStart} end date/${administrationEnd}.`
        );
    }

    return {
        period: NEW_PERIOD
    }
}

export async function requestMunicipalPeriodUpdate(id, periodData) {
    if (!isUuid(id)) {
        throw new ValidationError('Request failed due to an invalid Id was provided',
            'Municipal period update request',
            `Request failed due to invalid ID ${id}.`
        );
    }

    const { municipalPresident, administrationStart, administrationEnd } = periodData;

    if (!municipalPresident && !administrationStart && !administrationEnd) {
        throw new ValidationError('Request failed due to missing information',
            'Municipal period update request',
            `Request failed due to missing information
            Provided data -> ${JSON.stringify(periodData)}.`
        );
    }

    if (administrationStart) {
        if (!validateDates(administrationStart)) {
            throw new ValidationError('Request failed due to start date is in an incorrect format please use ISOS format YYYY-MM-DD',
                'Municipal period update request',
                `Request failed due to start date is in an incorrect format
                Provided data -> Start date/${administrationStart}.`
            );
        }
    }

    if (administrationEnd) {
        if (!validateDates(administrationEnd)) {
            throw new ValidationError('Request failed due to end date is in an incorrect format please use ISOS format YYYY-MM-DD',
                'Municipal period update request',
                `Request failed due to end date is in an incorrect format
                Provided data -> End date/${administrationEnd}.`
            );
        }
    }

    const PERIOD = await periodRepo.findMunicipalPeriodById(id);

    if (administrationStart || administrationEnd) {
        const START = administrationStart ? administrationStart : PERIOD.administrationStart;
        const END = administrationEnd ? administrationEnd : PERIOD.administrationEnd;

        if (!validatePeriod(START, END)) {
            throw new ValidationError('Request failed due to end date cannot be before start date and viceversa.',
                'Municipal period update request',
                `Request failed due to period start/end inconsistency
                Provided data -> Start date/${START} end date/${END}.`
            );
        }

        if (!await periodRepo.verifyNewMunicipalPeriod(id, START, END)) {
            throw new ValidationError('Request failed due to period overlapping please check your information again.',
                'Municipal period update request',
                `Request failed due to period overlapping
                Provided data -> Start date/${administrationStart} end date/${administrationEnd}.`
            );
        }
    }

    if (municipalPresident)
        periodData.municipalPresident = capitalizeName(municipalPresident);

    const MODIFIED_PERIOD = await periodRepo.saveMunicipalPeriod(id, periodData);

    if (!MODIFIED_PERIOD) {
        throw new ResourceError('The requested resource does not exist or is unavailable',
            'Municipal period update request',
            `Requested ID ${id} not found.`
        );
    }

    return {
        period: MODIFIED_PERIOD
    }
}

export async function requestMunicipalPeriodDelete(id) {
    if (!isUuid(id)) {
        throw new ValidationError('Request failed due to an invalid Id was provided',
            'Municipal period update request',
            `Request failed due to invalid ID ${id}.`
        );
    }

    const DELETED_PERIOD = await periodRepo.deleteMunicipalPeriod(id);

    if (!DELETED_PERIOD) {
        throw new ResourceError('The requested resource does not exist or is unavailable',
            'Municipal period delete request',
            `Requested ID ${id} not found.`
        );
    }

    return {
        data: {
            msg: `Period ${DELETED_PERIOD.administrationStart} - ${DELETED_PERIOD.administrationEnd} deleted successfully`
        },
        period: DELETED_PERIOD.toJSON()
    }
}

// * Institute Administration Periods
export async function requestInstitutePeriods() {
    const PERIODS = await periodRepo.findAllInstitutePeriods();

    if (PERIODS.length === 0) {
        throw new ResourceError('There are no periods to display',
            'Institute administration period request',
            `There are no institute administration periods registered`
        );
    }

    return {
        periods: PERIODS
    }
}

export async function requestInstitutePeriod(id) {
    if (!isUuid(id)) {
        throw new ValidationError('Request failed due to an invalid Id was provided',
            'Institute period request',
            `Request failed due to invalid ID ${id}.`
        );
    }

    const PERIOD = await periodRepo.findInstitutePeriodById(id);

    if (!PERIOD) {
        throw new ResourceError('The requested resource does not exist or is unavailable',
            'Institute period request',
            `Requested ID ${id} not found.`
        );
    }

    return {
        period: PERIOD
    }
}

export async function requestInstitutePeriodCreate(periodData) {
    const { directorName, directorTittle, directorTittleShort, administrationStart, administrationEnd } = periodData;

    if (!directorName || !directorTittle || !directorTittleShort || !administrationStart || !administrationEnd) {
        throw new ValidationError('Request failed due to missing information',
            'Institute period create request',
            `Request failed due to missing information
            Provided data -> ${JSON.stringify(periodData)}.`
        );
    }

    if (!validateDates(administrationStart) || !validateDates(administrationEnd)) {
        throw new ValidationError('Request failed due to dates are in an incorrect format please use ISOS format YYYY-MM-DD',
            'Institute period create request',
            `Request failed due to dates are in an incorrect format
            Provided data -> Start date/${administrationStart} end date/${administrationEnd}.`
        );
    }

    if (!validatePeriod(administrationStart, administrationEnd)) {
        throw new ValidationError('Request failed due to end date cannot be before start date.',
            'Institute period create request',
            `Request failed due to period start/end inconsistency
            Provided data -> Start date/${administrationStart} end date/${administrationEnd}.`
        );
    }

    periodData.directorName = capitalizeName(directorName);

    const NEW_PERIOD = await periodRepo.saveNewInstitutePeriod(periodData);

    if (!NEW_PERIOD) {
        throw new ValidationError('Request failed due to period overlapping please check your information again.',
            'Institute period create request',
            `Request failed due to period overlapping
            Provided data -> Start date/${administrationStart} end date/${administrationEnd}.`
        );
    }

    return {
        period: NEW_PERIOD
    }
}

export async function requestInstitutePeriodUpdate(id, periodData) {
    if (!isUuid(id)) {
        throw new ValidationError('Request failed due to an invalid Id was provided',
            'Institute period update request',
            `Request failed due to invalid ID ${id}.`
        );
    }

    const { directorName, directorTittle, directorTittleShort, administrationStart, administrationEnd } = periodData;

    if (!directorName && !directorTittle && !directorTittleShort && !administrationStart && !administrationEnd) {
        throw new ValidationError('Request failed due to missing information',
            'Institute period update request',
            `Request failed due to missing information
            Provided data -> ${JSON.stringify(periodData)}.`
        );
    }

    if (administrationStart) {
        if (!validateDates(administrationStart)) {
            throw new ValidationError('Request failed due to start date is in an incorrect format please use ISOS format YYYY-MM-DD',
                'Institute period update request',
                `Request failed due to start date is in an incorrect
                Provided data -> Start date/${administrationStart}.`
            );
        }
    }

    if (administrationEnd) {
        if (!validateDates(administrationEnd)) {
            throw new ValidationError('Request failed due to end date is in an incorrect format please use ISOS format YYYY-MM-DD',
                'Institute period update request',
                `Request failed due to end date is in an incorrect format
                Provided data -> End date/${administrationEnd}.`
            );
        }
    }

    const PERIOD = await periodRepo.findInstitutePeriodById(id);

    if (administrationStart || administrationEnd) {
        const START = administrationStart ? administrationStart : PERIOD.administrationStart;
        const END = administrationEnd ? administrationEnd : PERIOD.administrationEnd;

        if (!validatePeriod(START, END)) {
            throw new ValidationError('Request failed due to end date cannot be before start date and viceversa.',
                'Institute period update request',
                `Request failed due to period start/end inconsistency
                Provided data -> Start date/${START} end date/${END}.`
            );
        }

        if (!await periodRepo.verifyNewInstitutePeriod(id, START, END)) {
            throw new ValidationError('Request failed due to period overlapping please check your information again.',
                'Institute period update request',
                `Request failed due to period overlapping
                Provided data -> Start date/${administrationStart} end date/${administrationEnd}.`
            );
        }
    }

    if (directorName)
        periodData.directorName = capitalizeName(directorName);

    const MODIFIED_PERIOD = await periodRepo.saveInstitutePeriod(id, periodData);

    if (!MODIFIED_PERIOD) {
        throw new ResourceError('The requested resource does not exist or is unavailable',
            'Institute period update request',
            `Requested ID ${id} not found.`
        );
    }

    return {
        period: MODIFIED_PERIOD
    }
}

export async function requestInstitutePeriodDelete(id) {
    if (!isUuid(id)) {
        throw new ValidationError('Request failed due to an invalid Id was provided',
            'Institute period delete request',
            `Request failed due to invalid ID ${id}.`
        );
    }

    const DELETED_PERIOD = await periodRepo.deleteInstitutePeriod(id);

    if (!DELETED_PERIOD) {
        throw new ResourceError('The requested resource does not exist or is unavailable',
            'Institute period delete request',
            `Requested ID ${id} not found.`
        );
    }

    return {
        data: {
            msg: `Period ${DELETED_PERIOD.administrationStart} - ${DELETED_PERIOD.administrationEnd} deleted successfully`
        },
        period: DELETED_PERIOD.toJSON()
    }
}

// * Licenses Direction Administration Periods
export async function requestLicensesPeriods() {
    const PERIODS = await periodRepo.findAllLicensesPeriods();

    if (PERIODS.length === 0) {
        throw new ResourceError('There are no periods to display',
            'License direction period request',
            `There are no license direction periods registered`
        );
    }

    return {
        periods: PERIODS
    }
}

export async function requestLicensesPeriod(id) {
    if (!isUuid(id)) {
        throw new ValidationError('Request failed due to an invalid Id was provided',
            'License direction period request',
            `Request failed due to invalid ID ${id}.`
        );
    }

    const PERIOD = await periodRepo.findLicensesPeriodById(id);

    if (!PERIOD) {
        throw new ResourceError('The requested resource does not exist or is unavailable',
            'License direction period request',
            `Requested ID ${id} not found.`
        );
    }

    return {
        period: PERIOD
    }
}

export async function requestLicensesPeriodCreate(periodData) {
    const { directorName, administrationStart, administrationEnd } = periodData;

    if (!directorName || !administrationStart || !administrationEnd) {
        throw new ValidationError('Request failed due to missing information',
            'Licenses direction period create request',
            `Request failed due to missing information
            Provided data -> ${JSON.stringify(periodData)}.`
        );
    }

    if (!validateDates(administrationStart) || !validateDates(administrationEnd)) {
        throw new ValidationError('Request failed due to dates are in an incorrect format please use ISOS format YYYY-MM-DD',
            'License direction period create request',
            `Request failed due to dates are in an incorrect format
            Provided data -> Start date/${administrationStart} end date/${administrationEnd}.`
        );
    }

    if (!validatePeriod(administrationStart, administrationEnd)) {
        throw new ValidationError('Request failed due to end date cannot be before start date.',
            'License direction period create request',
            `Request failed due to period start/end inconsistency
            Provided data -> Start date/${administrationStart} end date/${administrationEnd}.`
        );
    }

    periodData.directorName = capitalizeName(directorName);

    const NEW_PERIOD = await periodRepo.saveNewLicensesPeriod(periodData);

    if (!NEW_PERIOD) {
        throw new ValidationError('Request failed due to period overlapping please check your information again.',
            'License direction period create request',
            `Request failed due to period overlapping
            Provided data -> Start date/${administrationStart} end date/${administrationEnd}.`
        );
    }

    return {
        period: NEW_PERIOD
    }
}

export async function requestLicensesPeriodUpdate(id, periodData) {
    if (!isUuid(id)) {
        throw new ValidationError('Request failed due to an invalid Id was provided',
            'License direction period update request',
            `Request failed due to invalid ID ${id}.`
        );
    }

    const { directorName, administrationStart, administrationEnd } = periodData;

    if (!directorName && !administrationStart && !administrationEnd) {
        throw new ValidationError('Request failed due to missing information',
            'Licenses direction period update request',
            `Request failed due to missing information
            Provided data -> ${JSON.stringify(periodData)}.`
        );
    }

    if (administrationStart) {
        if (!validateDates(administrationStart)) {
            throw new ValidationError('Request failed due to start date is in an incorrect format please use ISOS format YYYY-MM-DD',
                'License direction period update request',
                `Request failed due to start date is in an incorrect format
                Provided data -> Start date/${administrationStart}.`
            );
        }
    }

    if (administrationEnd) {
        if (!validateDates(administrationEnd)) {
            throw new ValidationError('Request failed due to end date is in an incorrect format please use ISOS format YYYY-MM-DD',
                'License direction period update request',
                `Request failed due to end date is in an incorrect format
                Provided data -> End date/${administrationEnd}.`
            );
        }
    }

    const PERIOD = await periodRepo.findLicensesPeriodById(id);

    if (administrationStart || administrationEnd) {
        const START = administrationStart ? administrationStart : PERIOD.administrationStart;
        const END = administrationEnd ? administrationEnd : PERIOD.administrationEnd;

        if (!validatePeriod(START, END)) {
            throw new ValidationError('Request failed due to end date cannot be before start date and viceversa.',
                'License direction period update request',
                `Request failed due to period start/end inconsistency
                Provided data -> Start date/${START} end date/${END}.`
            );
        }

        if (!await periodRepo.verifyNewLicensesPeriod(id, START, END)) {
            throw new ValidationError('Request failed due to period overlapping please check your information again.',
                'Licenses direction period update request',
                `Request failed due to period overlapping
                Provided data -> Start date/${administrationStart} end date/${administrationEnd}.`
            );
        }
    }

    if (directorName)
        periodData.directorName = capitalizeName(directorName);

    const MODIFIED_PERIOD = await periodRepo.saveLicensesPeriod(id, periodData);

    if (!MODIFIED_PERIOD) {
        throw new ResourceError('The requested resource does not exist or is unavailable',
            'License direction period update request',
            `Requested ID ${id} not found.`
        );
    }

    return {
        period: MODIFIED_PERIOD
    }
}

export async function requestLicensesPeriodDelete(id) {
    if (!isUuid(id)) {
        throw new ValidationError('Request failed due to an invalid Id was provided',
            'License direction period delete request',
            `Request failed due to invalid ID ${id}.`
        );
    }

    const DELETED_PERIOD = await periodRepo.deleteLicensesPeriod(id);

    if (!DELETED_PERIOD) {
        throw new ResourceError('The requested resource does not exist or is unavailable',
            'Licenses period delete request',
            `Requested ID ${id} not found.`
        );
    }

    return {
        data: {
            msg: `Period ${DELETED_PERIOD.administrationStart} - ${DELETED_PERIOD.administrationEnd} deleted successfully`
        },
        period: DELETED_PERIOD.toJSON()
    }
}

// * Licenses Year Legend
export async function requestYearLegends() {
    const LEGENDS = await periodRepo.findAllYearLegends();

    if (LEGENDS.length === 0) {
        throw new ResourceError('There are no year legends to display',
            'Year legend request',
            `There are no year legends registered`
        );
    }

    return {
        legends: LEGENDS
    }
}

export async function requestYearLegend(id) {
    if (!isUuid(id)) {
        throw new ValidationError('Request failed due to an invalid Id was provided',
            'Year legend request',
            `Request failed due to invalid ID ${id}.`
        );
    }

    const LEGEND = await periodRepo.findYearLegendById(id);

    if (!LEGEND) {
        throw new ResourceError('The requested resource does not exist or is unavailable',
            'Year legend request',
            `Requested ID ${id} not found.`
        );
    }

    return {
        legend: LEGEND
    }
}

export async function requestYearLegendCreate(legendData) {
    const { year_legend } = legendData;

    if (!year_legend) {
        throw new ValidationError('Request failed due to missing information',
            'Year legend create request',
            `Request failed due to missing information
            Provided data -> ${JSON.stringify(legendData)}.`
        );
    }

    const YEAR = new Date().getFullYear();

    const NEW_LEGEND = await periodRepo.saveNewYearLegend(YEAR, year_legend);

    if (!NEW_LEGEND) {
        throw new ResourceError(`Unable to register year legend due to a legend for ${YEAR} year already exists.`,
            'Year legend create request',
            `RUnable to register year legend due to a legend for ${YEAR} year already exists`
        );
    }

    return {
        legend: NEW_LEGEND
    }
}

export async function requestYearLegendUpdate(id, legendData) {
    if (!isUuid(id)) {
        throw new ValidationError('Request failed due to an invalid Id was provided',
            'Year legend update request',
            `Request failed due to invalid ID ${id}.`
        );
    }

    const { year_legend } = legendData;

    if (!year_legend) {
        throw new ValidationError('Request failed due to missing information',
            'Year legend update request',
            `Provided data -> ${JSON.stringify(legendData)}.`
        );
    }

    const MODIFIED_LEGEND = await periodRepo.saveYearLegend(id, year_legend);

    if (!MODIFIED_LEGEND) {
        throw new ResourceError('The requested resource does not exist or is unavailable',
            'Year legend request',
            `Requested ID ${id} not found.`
        );
    }

    return {
        legend: MODIFIED_LEGEND
    }
}

export async function requestYearLegendDelete(id) {
    if (!isUuid(id)) {
        throw new ValidationError('Request failed due to an invalid Id was provided',
            'Year legend delete request',
            `Request failed due to invalid ID ${id}.`
        );
    }

    const DELETED_LEGEND = await periodRepo.deleteYearLegend(id);

    if (!DELETED_LEGEND) {
        throw new ResourceError('The requested resource does not exist or is unavailable',
            'Year legend request',
            `Requested ID ${id} not found.`
        );
    }

    return {
        data: {
            msg: `Year legend "${DELETED_LEGEND.year}, ${DELETED_LEGEND.year_legend}" deleted successfully`
        },
        legend: DELETED_LEGEND.toJSON()
    }
}