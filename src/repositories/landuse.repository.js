import { LandUseLicense } from "../models/License.models";
import { Op } from "sequelize";

const LAND_USE_MODELS = [
    {
        model: Type,
        attributes: ['licenseType']
    },
    {
        model: Term,
        attributes: ['licenseTerm']
    },
    {
        model: Zone,
        attributes: ['licenseZone', 'licenseKey']
    },
    {
        model: AuthUse,
        attributes: ['licenseAuthUse']
    },
    {
        model: Validity,
        attributes: ['licenseValidity']
    },
    {
        model: ExpeditionType,
        attributes: ['licenseExpType']
    },
];

export async function findAllLandLicenses() {
    return await LandUseLicense.findAll({
        include: LAND_USE_MODELS,
        raw: true,
        nest: true
    });
}

export async function findLandLicense(id) {
    return await LandUseLicense.findByPk(id, {
        include: LAND_USE_MODELS,
        raw: true,
        nest: true
    });
}

export async function findLandLicenseInvoice(type, invoice, year) {
    return await LandUseLicense.findOne({
        where: {
            licenseType: type,
            invoice: invoice,
            year: year
        },
        include: LAND_USE_MODELS,
        raw: true,
        nest: true
    });
}

export async function findLandLicenseType(type, year) {
    return await LandUseLicense.findAll({
        where: {
            licenseType: type,
            year: year
        },
        include: LAND_USE_MODELS,
        raw: true,
        nest: true
    });
}

export async function findLandLicenseBy(parameter, value) {
    const PARAM = new Object;
    PARAM[parameter] = { [Op.like]: `%${value}%` };
    return await LandUseLicense.findAll({
        where: PARAM,
        include: LAND_USE_MODELS,
        raw: true,
        nest: true
    });
}

export async function saveNewLandLicense(newLicenseData) {
    const [NEW_LICENSE, CREATED] = await LandUseLicense.findOrCreate({
        where: { 
            fullInvoice: newLicenseData.fullInvoice,
            invoice: newLicenseData.invoice,
            licenseType: newLicenseData.licenseType,
            year: newLicenseData.year
        },
        include: LAND_USE_MODELS,
        defaults: newLicenseData,
        raw: true,
        nest: true
    });

    return CREATED ? NEW_LICENSE : null;
}

export async function saveLandLicense(id, newData) {
    const MODIFIED_LICENSE = await LandUseLicense.findByPk(id, {
        include: LAND_USE_MODELS
    });

    if (MODIFIED_LICENSE == null) return null;

    await MODIFIED_LICENSE.update(newData);

    if (newData.zone || newData.authorizedUse || newData.validity || newData.expeditionType || newData.term) {
        await MODIFIED_LICENSE.reload({include: LAND_USE_MODELS});
    }

    return MODIFIED_LICENSE;
}

export async function deleteLandLicense(id) {
    const DELETED_LICENSE = await LandUseLicense.findByPk(id, {
        include: LAND_USE_MODELS
    });

    if (DELETED_LICENSE == null) return null;

    await DELETED_LICENSE.destroy();

    return DELETED_LICENSE;
}