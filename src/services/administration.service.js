import * as periodRepo from '../repositories/administration.repository.js'


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
                periods: "No municipal periods found"
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

    const PERIOD = await periodRepo.findMunicipalPeriodById(id);

    if (administrationStart || administrationEnd) {
        const START = administrationStart ? administrationStart : PERIOD.administrationStart;
        const END = administrationEnd ? administrationEnd : PERIOD.administrationEnd;

        if (!await periodRepo.verifyNewPeriod(id, START, END)) {
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
    return {
        status: 200,
        data: {
            msg: "Testing get institute period"
        },
        log: "Test going get institute period"
    }
}

export async function requestInstitutePeriods() {
    return {
        status: 200,
        data: {
            msg: "Testing get all institute period"
        },
        log: "Test going get all institute period"
    }
}

export async function requestInstitutePeriodCreate(body) {
    return {
        status: 200,
        data: {
            msg: "Testing create institute period"
        },
        log: "Test going create institute period"
    }
}

export async function requestInstitutePeriodUpdate(id, body) {
    return {
        status: 200,
        data: {
            msg: "Testing update institute period"
        },
        log: "Test going update institute period"
    }
}

export async function requestInstitutePeriodDelete(id) {
    return {
        status: 200,
        data: {
            msg: "Testing delete institute period"
        },
        log: "Test going delete institute period"
    }
}

// * Licenses Direction Administration Periods
export async function requestLicensesPeriod(id) {
    return {
        status: 200,
        data: {
            msg: "Testing get licenses period"
        },
        log: "Test going get licenses period"
    }
}

export async function requestLicensesPeriods() {
    return {
        status: 200,
        data: {
            msg: "Testing get all licenses period"
        },
        log: "Test going get all licenses period"
    }
}

export async function requestLicensesPeriodCreate(body) {
    return {
        status: 200,
        data: {
            msg: "Testing create licenses period"
        },
        log: "Test going create licenses period"
    }
}

export async function requestLicensesPeriodUpdate(id, body) {
    return {
        status: 200,
        data: {
            msg: "Testing update licenses period"
        },
        log: "Test going update licenses period"
    }
}

export async function requestLicensesPeriodDelete(id) {
    return {
        status: 200,
        data: {
            msg: "Testing delete licenses period"
        },
        log: "Test going delete licenses period"
    }
}