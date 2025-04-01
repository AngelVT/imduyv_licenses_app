import { MunicipalAdministration, InstituteAdministration, LicensesAdministration, YearOf } from '../models/Administration.models.js';
import { Op } from 'sequelize';

// * Municipal Administration Periods
export async function findAllMunicipalPeriods() {
    return await MunicipalAdministration.findAll({
        raw: true,
        nest: true
    });
}

export async function findMunicipalPeriodById(id) {
    return await MunicipalAdministration.findByPk(id, {
        raw: true,
        nest: true
    });
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
        defaults: newPeriod,
        raw: true,
        nest: true
    });

    return CREATED ? NEW_PERIOD : null;
}

export async function saveMunicipalPeriod(id, newData) {
    const MODIFIED_PERIOD = await MunicipalAdministration.findByPk(id);
    
    if(MODIFIED_PERIOD == null)
        return null;

    await MODIFIED_PERIOD.update(newData);

    return MODIFIED_PERIOD;
}

export async function deleteMunicipalPeriod(id) {
    const DELETED_PERIOD = await MunicipalAdministration.findByPk(id);

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
            },
            raw: true,
            nest: true
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
    return await InstituteAdministration.findAll({
        raw: true,
        nest:true
    });
}

export async function findInstitutePeriodById(id) {
    return await InstituteAdministration.findByPk(id, {
        raw: true,
        nest: true
    });
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
        defaults: newPeriod,
        raw: true,
        nest: true
    });

    return CREATED ? NEW_PERIOD : null;
}

export async function saveInstitutePeriod(id, newData) {
    const MODIFIED_PERIOD = await InstituteAdministration.findByPk(id);
    
    if(MODIFIED_PERIOD == null)
        return null;

    await MODIFIED_PERIOD.update(newData);

    return MODIFIED_PERIOD;
}

export async function deleteInstitutePeriod(id) {
    const DELETED_PERIOD = await InstituteAdministration.findByPk(id);

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
            },
            raw: true,
            nest: true
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
    return await LicensesAdministration.findAll({
        raw: true,
        nest: true
    });
}

export async function findLicensesPeriodById(id) {
    return await LicensesAdministration.findByPk(id, {
        raw: true,
        nest: true
    });
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
        defaults: newPeriod,
        raw: true,
        nest: true
    });

    return CREATED ? NEW_PERIOD : null;
}

export async function saveLicensesPeriod(id, newData) {
    const MODIFIED_PERIOD = await LicensesAdministration.findByPk(id);
    
    if(MODIFIED_PERIOD == null)
        return null;

    await MODIFIED_PERIOD.update(newData);

    return MODIFIED_PERIOD;
}

export async function deleteLicensesPeriod(id) {
    const DELETED_PERIOD = await LicensesAdministration.findByPk(id);

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
            },
            raw: true,
            nest: true
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

// * Licenses Year legend
export async function findAllYearLegends() {
    return await YearOf.findAll({
        raw: true,
        nest: true
    });
}

export async function findYearLegendById(id) {
    return await YearOf.findByPk(id, {
        raw: true,
        nest: true
    });
}

export async function getYearLegendByYear(year) {
    return await YearOf.findOne({
        where: {
            year: year
        },
        raw: true,
        nest: true
    });
}

export async function saveNewYearLegend(year, yearLegend) {
    const [NEW_LEGEND, CREATED] = await YearOf.findOrCreate({
        where: {
            year: year
        },
        defaults: {
            year: year,
            year_legend: yearLegend
        },
        raw: true,
        nest: true
    });

    return CREATED ? NEW_LEGEND : null;
}

export async function saveYearLegend(id, yearLegend) {
    const MODIFIED_LEGEND = await YearOf.findByPk(id);
    
    if(MODIFIED_LEGEND == null)
        return null;

    await MODIFIED_LEGEND.update({
        year_legend: yearLegend
    });

    return MODIFIED_LEGEND;
}

export async function deleteYearLegend(id) {
    const DELETED_LEGEND = await YearOf.findByPk(id);

    if(DELETED_LEGEND == null)
        return null

    await DELETED_LEGEND.destroy();

    return DELETED_LEGEND;
}
