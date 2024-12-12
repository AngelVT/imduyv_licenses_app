import { MunicipalAdministration, InstituteAdministration, LicensesAdministration } from '../models/Administration.models.js';
import { Op } from 'sequelize';

// * Municipal Administration Periods
export async function findAllMunicipalPeriods() {
    return await MunicipalAdministration.findAll();
}

export async function findMunicipalPeriodById(id) {
    return await MunicipalAdministration.findByPk(id);
}

export async function saveNewMunicipalPeriod(newPeriod) {
    const [NEW_PERIOD, CREATED] = await MunicipalAdministration.findOrCreate({
        where: {
            [Op.or]: [
                {
                    administrationStart: { [Op.lte]: newPeriod.administrationEnd },
                    administrationEnd: { [Op.gte]: newPeriod.administrationStart }
                }
            ]
        },
        defaults: newPeriod
    });

    return CREATED ? NEW_PERIOD : null;
}

export async function saveMunicipalPeriod(id, newData) {
    const MODIFIED_PERIOD = await findMunicipalPeriodById(id);
    
    if(MODIFIED_PERIOD == null)
        return null;

    await MODIFIED_PERIOD.update(newData);

    return MODIFIED_PERIOD;
}

export async function deleteMunicipalPeriod(id) {
    const DELETED_PERIOD = await findMunicipalPeriodById(id);

    if(DELETED_PERIOD == null)
        return null

    await DELETED_PERIOD.destroy();

    return DELETED_PERIOD;
}

export async function getMunicipalPeriodByDate(date) {
    return await MunicipalAdministration.findOne(
        {
            where: {
                [Op.and]: [
                    { administrationStart: { [Op.lte]: date } },
                    { administrationEnd: { [Op.gte]: date } }
                ]
            }
        }
    );
}

export async function verifyNewMunicipalPeriod(id, start, end) {
    const OVERLAPPING_COUNT = await MunicipalAdministration.count({
        where: {
            [Op.and]: [
                {
                    administrationEnd: { [Op.gte]: start },
                    administrationStart: { [Op.lte]: end }
                },
                {
                    id: { [Op.not]: id } 
                }
            ]
        }
    });
    
    if (OVERLAPPING_COUNT > 0) {
        return false;
    }

    return true
}

// * Institute Administration Periods
export async function findAllInstitutePeriods() {
    return await InstituteAdministration.findAll();
}

export async function findInstitutePeriodById(id) {
    return await InstituteAdministration.findByPk(id);
}

export async function saveNewInstitutePeriod(newPeriod) {
    const [NEW_PERIOD, CREATED] = await InstituteAdministration.findOrCreate({
        where: {
            [Op.or]: [
                {
                    administrationStart: { [Op.lte]: newPeriod.administrationEnd },
                    administrationEnd: { [Op.gte]: newPeriod.administrationStart }
                }
            ]
        },
        defaults: newPeriod
    });

    return CREATED ? NEW_PERIOD : null;
}

export async function saveInstitutePeriod(id, newData) {
    const MODIFIED_PERIOD = await findInstitutePeriodById(id);
    
    if(MODIFIED_PERIOD == null)
        return null;

    await MODIFIED_PERIOD.update(newData);

    return MODIFIED_PERIOD;
}

export async function deleteInstitutePeriod(id) {
    const DELETED_PERIOD = await findInstitutePeriodById(id);

    if(DELETED_PERIOD == null)
        return null

    await DELETED_PERIOD.destroy();

    return DELETED_PERIOD;
}

export async function getInstitutePeriodByDate(date) {
    return await InstituteAdministration.findOne(
        {
            where: {
                [Op.and]: [
                    { administrationStart: { [Op.lte]: date } },
                    { administrationEnd: { [Op.gte]: date } }
                ]
            }
        }
    );
}

export async function verifyNewInstitutePeriod(id, start, end) {
    const OVERLAPPING_COUNT = await InstituteAdministration.count({
        where: {
            [Op.and]: [
                {
                    administrationEnd: { [Op.gte]: start },
                    administrationStart: { [Op.lte]: end }
                },
                {
                    id: { [Op.not]: id } 
                }
            ]
        }
    });
    
    if (OVERLAPPING_COUNT > 0) {
        return false;
    }

    return true
}

// * Licenses Direction Administration Periods
export async function findAllLicensesPeriods() {
    return await LicensesAdministration.findAll();
}

export async function findLicensesPeriodById(id) {
    return await LicensesAdministration.findByPk(id);
}

export async function saveNewLicensesPeriod(newPeriod) {
    const [NEW_PERIOD, CREATED] = await LicensesAdministration.findOrCreate({
        where: {
            [Op.or]: [
                {
                    administrationStart: { [Op.lte]: newPeriod.administrationEnd },
                    administrationEnd: { [Op.gte]: newPeriod.administrationStart }
                }
            ]
        },
        defaults: newPeriod
    });

    return CREATED ? NEW_PERIOD : null;
}

export async function saveLicensesPeriod(id, newData) {
    const MODIFIED_PERIOD = await findLicensesPeriodById(id);
    
    if(MODIFIED_PERIOD == null)
        return null;

    await MODIFIED_PERIOD.update(newData);

    return MODIFIED_PERIOD;
}

export async function deleteLicensesPeriod(id) {
    const DELETED_PERIOD = await findLicensesPeriodById(id);

    if(DELETED_PERIOD == null)
        return null

    await DELETED_PERIOD.destroy();

    return DELETED_PERIOD;
}

export async function getLicensesPeriodByDate(date) {
    return await LicensesAdministration.findOne(
        {
            where: {
                [Op.and]: [
                    { administrationStart: { [Op.lte]: date } },
                    { administrationEnd: { [Op.gte]: date } }
                ]
            }
        }
    );
}

export async function verifyNewLicensesPeriod(id, start, end) {
    const OVERLAPPING_COUNT = await InstituteAdministration.count({
        where: {
            [Op.and]: [
                {
                    administrationEnd: { [Op.gte]: start },
                    administrationStart: { [Op.lte]: end }
                },
                {
                    id: { [Op.not]: id } 
                }
            ]
        }
    });
    
    if (OVERLAPPING_COUNT > 0) {
        return false;
    }

    return true
}