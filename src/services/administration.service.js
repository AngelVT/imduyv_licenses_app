import * as periodRepo from '../repositories/administration.repository.js';
import { capitalizeName } from './user.service.js';
import { validateDates, validatePeriod } from '../validations/administration.validations.js';
import { DATE } from 'sequelize';


// * Municipal Administration Periods
export async function requestMunicipalPeriod(id) {
    const PERIOD = await periodRepo.findMunicipalPeriodById(id);

    if (PERIOD == null) {
        return {
            status: 404,
            data: {
                msg: "Requested period not found"
            },
            log: `Request completed, no results to show:
                Requested period -> ${id}`
        }
    }

    return {
        status: 200,
        data: {
            period: PERIOD
        },
        log: `Request completed: 
            Requested period -> ${PERIOD.id}
            Period Start -> ${PERIOD.administrationStart}
            Period End -> ${PERIOD.administrationEnd}`
    }
}

export async function requestMunicipalPeriods() {
    const PERIODS = await periodRepo.findAllMunicipalPeriods();

    if (PERIODS.length == 0) {
        return {
            status: 404,
            data: {
                msg: "No municipal periods found"
            },
            log: "Request completed all periods requested, none found"
        }
    }

    return {
        status: 200,
        data: {
            periods: PERIODS
        },
        log: "Request completed all periods requested"
    }
}

export async function requestMunicipalPeriodCreate(body) {
    const { municipalPresident, administrationStart, administrationEnd } = body;

    if (!municipalPresident || !administrationStart || !administrationEnd) {
        return {
            status: 400,
            data: {
                msg: "Missing information to complete the registration"
            },
            log: "Request failed due to missing required information for registration"
        }
    }

    if (!validateDates(administrationStart) || !validateDates(administrationEnd)) {
        return {
            status: 400,
            data: {
                msg: "Invalid dates provided"
            },
            log: "Request failed due to invalid dates were provided"
        }
    }

    if (!validatePeriod(administrationStart, administrationEnd)) {
        return {
            status: 400,
            data: {
                msg: "Invalid period provided, start end date must be after the start date"
            },
            log: "Request failed due to invalid dates were provided"
        }
    }

    body.municipalPresident = capitalizeName(municipalPresident);

    const NEW_PERIOD = await periodRepo.saveNewMunicipalPeriod(body);

    if (NEW_PERIOD == null) {
        return {
            status: 400,
            data: {
                msg: "Unable to register period due to overlapping periods please check your information again."
            },
            log: `Request failed period due to overlapping periods:
                Period Start -> ${administrationStart}
                Period End -> ${administrationEnd}`
        }
    }

    return {
        status: 200,
        data: {
            period: NEW_PERIOD
        },
        log: `New municipal period created:
            Id -> ${NEW_PERIOD.id}
            President -> ${NEW_PERIOD.municipalPresident}
            Period Start -> ${NEW_PERIOD.administrationStart}
            Period End -> ${NEW_PERIOD.administrationEnd}`
    }
}

export async function requestMunicipalPeriodUpdate(id, body) {
    const { municipalPresident, administrationStart, administrationEnd } = body;
    
    if (!municipalPresident && !administrationStart && !administrationEnd) {
        return {
            status: 400,
            data: {
                msg: "Missing information to complete the update"
            },
            log: "Request failed due to missing required information for update"
        }
    }

    if (administrationStart) {
        if (!validateDates(administrationStart)) {
            return {
                status: 400,
                data: {
                    msg: "Invalid dates provided"
                },
                log: "Request failed due to invalid dates were provided"
            }
        }
    }

    if (administrationEnd) {
        if (!validateDates(administrationEnd)) {
            return {
                status: 400,
                data: {
                    msg: "Invalid dates provided"
                },
                log: "Request failed due to invalid dates were provided"
            }
        }
    }

    const PERIOD = await periodRepo.findMunicipalPeriodById(id);

    if (administrationStart || administrationEnd) {
        const START = administrationStart ? administrationStart : PERIOD.administrationStart;
        const END = administrationEnd ? administrationEnd : PERIOD.administrationEnd;
    
        if (!validatePeriod(START, END)) {
            return {
                status: 400,
                data: {
                    msg: "Invalid period provided, start end date must be after the start date"
                },
                log: "Request failed due to invalid dates were provided"
            }
        }

        if (!await periodRepo.verifyNewMunicipalPeriod(id, START, END)) {
            return {
                status: 400,
                data: {
                    msg: "Unable to update period due to overlapping periods please check your information again."
                },
                log: `Request failed period due to overlapping periods:
                    Period Start -> ${administrationStart ? administrationStart : 'Not provided'}
                    Period End -> ${administrationEnd ? administrationEnd : 'Not provided'}`
            }
        }
    }

    if (municipalPresident)
        body.municipalPresident = capitalizeName(municipalPresident);

    const MODIFIED_PERIOD = await periodRepo.saveMunicipalPeriod(id, body);

    if (MODIFIED_PERIOD == null) {
        return {
            status: 404,
            data: {
                msg: "Requested period not found, unable to update"
            },
            log: `Request completed, no record to update:
                Requested period -> ${id}`
        }
    }

    return {
        status: 200,
        data: {
            period: MODIFIED_PERIOD
        },
        log: `Request completed, period modified:
            Id -> ${MODIFIED_PERIOD.id}
            President -> ${MODIFIED_PERIOD.municipalPresident}
            Period Start -> ${MODIFIED_PERIOD.administrationStart}
            Period End -> ${MODIFIED_PERIOD.administrationEnd}`
    }
}

export async function requestMunicipalPeriodDelete(id) {
    const DELETED_PERIOD = await periodRepo.deleteMunicipalPeriod(id);

    if (DELETED_PERIOD == null) {
        return {
            status: 404,
            data: {
                msg: "Requested period not found, unable to delete"
            },
            log: `Request completed, no record to delete:
                Requested period -> ${id}`
        }
    }

    return {
        status: 200,
        data: {
            msg: `Period ${DELETED_PERIOD.administrationStart} - ${DELETED_PERIOD.administrationEnd} deleted successfully`
        },
        log:`Request completed, period deleted:
            Id -> ${DELETED_PERIOD.id}
            President -> ${DELETED_PERIOD.municipalPresident}
            Period Start -> ${DELETED_PERIOD.administrationStart}
            Period End -> ${DELETED_PERIOD.administrationEnd}`
    }
}

// * Institute Administration Periods
export async function requestInstitutePeriod(id) {
    const PERIOD = await periodRepo.findInstitutePeriodById(id);

    if (PERIOD == null) {
        return {
            status: 404,
            data: {
                msg: "Requested period not found"
            },
            log: `Request completed, no results to show:
                Requested period -> ${id}`
        }
    }

    return {
        status: 200,
        data: {
            period: PERIOD
        },
        log: `Request completed: 
            Requested period -> ${PERIOD.id}
            Period Start -> ${PERIOD.administrationStart}
            Period End -> ${PERIOD.administrationEnd}`
    }
}

export async function requestInstitutePeriods() {
    const PERIODS = await periodRepo.findAllInstitutePeriods();

    if (PERIODS.length == 0) {
        return {
            status: 404,
            data: {
                msg: "No institute periods found"
            },
            log: "Request completed all periods requested, none found"
        }
    }

    return {
        status: 200,
        data: {
            periods: PERIODS
        },
        log: "Request completed all periods requested"
    }
}

export async function requestInstitutePeriodCreate(body) {
    const {directorName, directorTittle, directorTittleShort , administrationStart, administrationEnd } = body;

    if (!directorName ||  !directorTittle || !directorTittleShort ||!administrationStart || !administrationEnd) {
        return {
            status: 400,
            data: {
                msg: "Missing information to complete the registration"
            },
            log: "Request failed due to missing required information for registration"
        }
    }

    if (!validateDates(administrationStart) || !validateDates(administrationEnd)) {
        return {
            status: 400,
            data: {
                msg: "Invalid dates provided"
            },
            log: "Request failed due to invalid dates were provided"
        }
    }

    if (!validatePeriod(administrationStart, administrationEnd)) {
        return {
            status: 400,
            data: {
                msg: "Invalid period provided, start end date must be after the start date"
            },
            log: "Request failed due to invalid dates were provided"
        }
    }

    body.directorName = capitalizeName(directorName);

    const NEW_PERIOD = await periodRepo.saveNewInstitutePeriod(body);

    if (NEW_PERIOD == null) {
        return {
            status: 400,
            data: {
                msg: "Unable to register period due to overlapping periods please check your information again."
            },
            log: `Request failed period due to overlapping periods:
                Period Start -> ${administrationStart}
                Period End -> ${administrationEnd}`
        }
    }

    return {
        status: 200,
        data: {
            period: NEW_PERIOD
        },
        log: `New municipal period created:
            Id -> ${NEW_PERIOD.id}
            Director -> ${NEW_PERIOD.directorName}
            Director Title -> ${NEW_PERIOD.directorTittle}
            Period Start -> ${NEW_PERIOD.administrationStart}
            Period End -> ${NEW_PERIOD.administrationEnd}`
    }
}

export async function requestInstitutePeriodUpdate(id, body) {
    const {directorName, directorTittle, directorTittleShort, administrationStart, administrationEnd } = body;
    
    if (!directorName &&  !directorTittle && !directorTittleShort && !administrationStart && !administrationEnd) {
        return {
            status: 400,
            data: {
                msg: "Missing information to complete the update"
            },
            log: "Request failed due to missing required information for update"
        }
    }

    if (administrationStart) {
        if (!validateDates(administrationStart)) {
            return {
                status: 400,
                data: {
                    msg: "Invalid dates provided"
                },
                log: "Request failed due to invalid dates were provided"
            }
        }
    }

    if (administrationEnd) {
        if (!validateDates(administrationEnd)) {
            return {
                status: 400,
                data: {
                    msg: "Invalid dates provided"
                },
                log: "Request failed due to invalid dates were provided"
            }
        }
    }

    const PERIOD = await periodRepo.findInstitutePeriodById(id);

    if (administrationStart || administrationEnd) {
        const START = administrationStart ? administrationStart : PERIOD.administrationStart;
        const END = administrationEnd ? administrationEnd : PERIOD.administrationEnd;

        if (!validatePeriod(START, END)) {
            return {
                status: 400,
                data: {
                    msg: "Invalid period provided, start end date must be after the start date"
                },
                log: "Request failed due to invalid dates were provided"
            }
        }

        if (!await periodRepo.verifyNewInstitutePeriod(id, START, END)) {
            return {
                status: 400,
                data: {
                    msg: "Unable to update period due to overlapping periods please check your information again."
                },
                log: `Request failed period due to overlapping periods:
                    Period Start -> ${administrationStart ? administrationStart : 'Not provided'}
                    Period End -> ${administrationEnd ? administrationEnd : 'Not provided'}`
            }
        }
    }

    if (directorName)
        body.directorName = capitalizeName(directorName);

    const MODIFIED_PERIOD = await periodRepo.saveInstitutePeriod(id, body);

    if (MODIFIED_PERIOD == null) {
        return {
            status: 404,
            data: {
                msg: "Requested period not found, unable to update"
            },
            log: `Request completed, no record to update:
                Requested period -> ${id}`
        }
    }

    return {
        status: 200,
        data: {
            period: MODIFIED_PERIOD
        },
        log: `Request completed, period modified:
            Id -> ${MODIFIED_PERIOD.id}
            Director -> ${MODIFIED_PERIOD.directorName}
            Director Title -> ${MODIFIED_PERIOD.directorTittle}
            Period Start -> ${MODIFIED_PERIOD.administrationStart}
            Period End -> ${MODIFIED_PERIOD.administrationEnd}`
    }
}

export async function requestInstitutePeriodDelete(id) {
    const DELETED_PERIOD = await periodRepo.deleteInstitutePeriod(id);

    if (DELETED_PERIOD == null) {
        return {
            status: 404,
            data: {
                msg: "Requested period not found, unable to delete"
            },
            log: `Request completed, no record to delete:
                Requested period -> ${id}`
        }
    }

    return {
        status: 200,
        data: {
            msg: `Period ${DELETED_PERIOD.administrationStart} - ${DELETED_PERIOD.administrationEnd} deleted successfully`
        },
        log:`Request completed, period deleted:
            Id -> ${DELETED_PERIOD.id}
            Director -> ${DELETED_PERIOD.directorName}
            Director Title -> ${DELETED_PERIOD.directorTittle}
            Period Start -> ${DELETED_PERIOD.administrationStart}
            Period End -> ${DELETED_PERIOD.administrationEnd}`
    }
}

// * Licenses Direction Administration Periods
export async function requestLicensesPeriod(id) {
    const PERIOD = await periodRepo.findLicensesPeriodById(id);

    if (PERIOD == null) {
        return {
            status: 404,
            data: {
                msg: "Requested period not found"
            },
            log: `Request completed, no results to show:
                Requested period -> ${id}`
        }
    }

    return {
        status: 200,
        data: {
            period: PERIOD
        },
        log: `Request completed: 
            Requested period -> ${PERIOD.id}
            Period Start -> ${PERIOD.administrationStart}
            Period End -> ${PERIOD.administrationEnd}`
    }
}

export async function requestLicensesPeriods() {
    const PERIODS = await periodRepo.findAllLicensesPeriods();

    if (PERIODS.length == 0) {
        return {
            status: 404,
            data: {
                msg: "No licenses periods found"
            },
            log: "Request completed all periods requested, none found"
        }
    }

    return {
        status: 200,
        data: {
            periods: PERIODS
        },
        log: "Request completed all periods requested"
    }
}

export async function requestLicensesPeriodCreate(body) {
    const { directorName, administrationStart, administrationEnd } = body;

    if (!directorName || !administrationStart || !administrationEnd) {
        return {
            status: 400,
            data: {
                msg: "Missing information to complete the registration"
            },
            log: "Request failed due to missing required information for registration"
        }
    }

    if (!validateDates(administrationStart) || !validateDates(administrationEnd)) {
        return {
            status: 400,
            data: {
                msg: "Invalid dates provided"
            },
            log: "Request failed due to invalid dates were provided"
        }
    }

    if (!validatePeriod(administrationStart, administrationEnd)) {
        return {
            status: 400,
            data: {
                msg: "Invalid period provided, start end date must be after the start date"
            },
            log: "Request failed due to invalid dates were provided"
        }
    }

    body.directorName = capitalizeName(directorName);

    const NEW_PERIOD = await periodRepo.saveNewLicensesPeriod(body);

    if (NEW_PERIOD == null) {
        return {
            status: 400,
            data: {
                msg: "Unable to register period due to overlapping periods please check your information again."
            },
            log: `Request failed period due to overlapping periods:
                Period Start -> ${administrationStart}
                Period End -> ${administrationEnd}`
        }
    }

    return {
        status: 200,
        data: {
            period: NEW_PERIOD
        },
        log: `New municipal period created:
            Id -> ${NEW_PERIOD.id}
            President -> ${NEW_PERIOD.directorName}
            Period Start -> ${NEW_PERIOD.administrationStart}
            Period End -> ${NEW_PERIOD.administrationEnd}`
    }
}

export async function requestLicensesPeriodUpdate(id, body) {
    const { directorName, administrationStart, administrationEnd } = body;
    
    if (!directorName && !administrationStart && !administrationEnd) {
        return {
            status: 400,
            data: {
                msg: "Missing information to complete the update"
            },
            log: "Request failed due to missing required information for update"
        }
    }

    if (administrationStart) {
        if (!validateDates(administrationStart)) {
            return {
                status: 400,
                data: {
                    msg: "Invalid dates provided"
                },
                log: "Request failed due to invalid dates were provided"
            }
        }
    }

    if (administrationEnd) {
        if (!validateDates(administrationEnd)) {
            return {
                status: 400,
                data: {
                    msg: "Invalid dates provided"
                },
                log: "Request failed due to invalid dates were provided"
            }
        }
    }

    const PERIOD = await periodRepo.findLicensesPeriodById(id);

    if (administrationStart || administrationEnd) {
        const START = administrationStart ? administrationStart : PERIOD.administrationStart;
        const END = administrationEnd ? administrationEnd : PERIOD.administrationEnd;

        if (!validatePeriod(START, END)) {
            return {
                status: 400,
                data: {
                    msg: "Invalid period provided, start end date must be after the start date"
                },
                log: "Request failed due to invalid dates were provided"
            }
        }

        if (!await periodRepo.verifyNewLicensesPeriod(id, START, END)) {
            return {
                status: 400,
                data: {
                    msg: "Unable to update period due to overlapping periods please check your information again."
                },
                log: `Request failed period due to overlapping periods:
                    Period Start -> ${administrationStart ? administrationStart : 'Not provided'}
                    Period End -> ${administrationEnd ? administrationEnd : 'Not provided'}`
            }
        }
    }

    if (directorName)
        body.directorName = capitalizeName(directorName);

    const MODIFIED_PERIOD = await periodRepo.saveLicensesPeriod(id, body);

    if (MODIFIED_PERIOD == null) {
        return {
            status: 404,
            data: {
                msg: "Requested period not found, unable to update"
            },
            log: `Request completed, no record to update:
                Requested period -> ${id}`
        }
    }

    return {
        status: 200,
        data: {
            period: MODIFIED_PERIOD
        },
        log: `Request completed, period modified:
            Id -> ${MODIFIED_PERIOD.id}
            President -> ${MODIFIED_PERIOD.directorName}
            Period Start -> ${MODIFIED_PERIOD.administrationStart}
            Period End -> ${MODIFIED_PERIOD.administrationEnd}`
    }
}

export async function requestLicensesPeriodDelete(id) {
    const DELETED_PERIOD = await periodRepo.deleteLicensesPeriod(id);

    if (DELETED_PERIOD == null) {
        return {
            status: 404,
            data: {
                msg: "Requested period not found, unable to delete"
            },
            log: `Request completed, no record to delete:
                Requested period -> ${id}`
        }
    }

    return {
        status: 200,
        data: {
            msg: `Period ${DELETED_PERIOD.administrationStart} - ${DELETED_PERIOD.administrationEnd} deleted successfully`
        },
        log:`Request completed, period deleted:
            Id -> ${DELETED_PERIOD.id}
            President -> ${DELETED_PERIOD.directorName}
            Period Start -> ${DELETED_PERIOD.administrationStart}
            Period End -> ${DELETED_PERIOD.administrationEnd}`
    }
}

// * Licenses Year Legend
export async function requestYearLegend(id) {
    const LEGEND = await periodRepo.findYearLegendById(id);

    if (LEGEND == null) {
        return {
            status: 404,
            data: {
                msg: "Requested year legend not found"
            },
            log: `Request completed, no results to show:
                Requested year legend -> ${id}`
        }
    }

    return {
        status: 200,
        data: {
            legend: LEGEND
        },
        log: `Request completed: 
            Requested legend -> ${LEGEND.id}
            Legend -> "${LEGEND.year}, ${LEGEND.year_legend}"`
    }
}

export async function requestYearLegends() {
    const LEGENDS = await periodRepo.findAllYearLegends();

    if (LEGENDS.length == 0) {
        return {
            status: 404,
            data: {
                msg: "No year legends found"
            },
            log: "Request completed all year legends requested, none found"
        }
    }

    return {
        status: 200,
        data: {
            legends: LEGENDS
        },
        log: "Request completed all year legends requested"
    }
}

export async function requestYearLegendCreate(body) {
    const { year_legend } = body;

    if (!year_legend) {
        return {
            status: 400,
            data: {
                msg: "Missing information to complete the registration"
            },
            log: "Request failed due to missing required information for registration"
        }
    }

    const YEAR = new Date().getFullYear();

    const NEW_LEGEND = await periodRepo.saveNewYearLegend(YEAR, year_legend);

    if (NEW_LEGEND == null) {
        return {
            status: 400,
            data: {
                msg: `Unable to register year legend due to a legend for ${YEAR} year already exists.`
            },
            log: `Unable to register year legend due to a legend for ${YEAR} year already exists.`
        }
    }

    return {
        status: 200,
        data: {
            legend: NEW_LEGEND
        },
        log: `New  year legend created:
            Id -> ${NEW_LEGEND.id}
            Legend -> ${NEW_LEGEND.year}, ${NEW_LEGEND.year_legend}`
    }
}

export async function requestYearLegendUpdate(id, body) {
    const { year_legend } = body;
    
    if (!year_legend) {
        return {
            status: 400,
            data: {
                msg: "Missing information to complete the update"
            },
            log: "Request failed due to missing required information for update"
        }
    }

    const MODIFIED_LEGEND = await periodRepo.saveYearLegend(id, year_legend);

    if (MODIFIED_LEGEND == null) {
        return {
            status: 404,
            data: {
                msg: "Requested year legend not found, unable to update"
            },
            log: `Request completed, no record to update:
                Requested period -> ${id}`
        }
    }

    return {
        status: 200,
        data: {
            legend: MODIFIED_LEGEND
        },
        log: `Request completed, period modified:
            Id -> ${MODIFIED_LEGEND.id}
            Legend -> "${MODIFIED_LEGEND.year}, ${MODIFIED_LEGEND.year_legend}"`
    }
}

export async function requestYearLegendDelete(id) {
    const DELETED_LEGEND = await periodRepo.deleteYearLegend(id);

    if (DELETED_LEGEND == null) {
        return {
            status: 404,
            data: {
                msg: "Requested year legend not found, unable to delete"
            },
            log: `Request completed, no record to delete:
                Requested year legend -> ${id}`
        }
    }

    return {
        status: 200,
        data: {
            msg: `Year legend "${DELETED_LEGEND.year}, ${DELETED_LEGEND.year_legend}" deleted successfully`
        },
        log:`Request completed, year legend deleted:
            Id -> ${DELETED_LEGEND.id}
            Year Legend -> "${DELETED_LEGEND.year}, ${DELETED_LEGEND.year_legend}"`
    }
}