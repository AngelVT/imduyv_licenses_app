import { UrbanLicense, UrbanType, Zone, Term, Validity } from "../models/License.models.js";
import { Op } from "sequelize";

const URBAN_MODELS = [
    {
        model: UrbanType,
        attributes: ['licenseType']
    },
    {
        model: Zone,
        attributes: ['licenseZone', 'licenseKey']
    },
    {
        model: Term,
        attributes: ['licenseTerm']
    },
    {
        model: Validity,
        attributes: ['licenseValidity']
    }
];

export async function findAllUrbanLicenses() {
    return await UrbanLicense.findAll({
        include: URBAN_MODELS,
        raw: true,
        nest: true
    });
}

export async function findUrbanLicense(id) {
    return await UrbanLicense.findByPk(id, {
        include: URBAN_MODELS,
        raw: true,
        nest: true
    });
}

export async function findUrbanLicenseInvoice(type, invoice, year) {
    return await UrbanLicense.findOne({
        where: {
            licenseType: type,
            invoice: invoice,
            year: year
        },
        include: URBAN_MODELS,
        raw: true,
        nest: true
    });
}

export async function findUrbanLicenseType(type, year) {
    return await UrbanLicense.findAll({
        where: {
            licenseType: type,
            year: year
        },
        include: URBAN_MODELS,
        raw: true,
        nest: true
    });
}

export async function findUrbanLicenseBy(parameter, value) {
    const PARAM = new Object;
    PARAM[parameter] = { [Op.like]: `%${value}%` };
    return await UrbanLicense.findAll({
        where: PARAM,
        include: URBAN_MODELS,
        raw: true,
        nest: true
    });
}

export async function saveNewUrbanLicense(newLicenseData) {
    const [NEW_LICENSE, CREATED] = await UrbanLicense.findOrCreate({
        where: { 
            fullInvoice: newLicenseData.fullInvoice,
            invoice: newLicenseData.invoice,
            licenseType: newLicenseData.licenseType,
            year: newLicenseData.year
        },
        include: URBAN_MODELS,
        defaults: newLicenseData,
        raw: true,
        nest: true
    });

    return CREATED ? NEW_LICENSE : null;
}

export async function saveUrbanLicense(id, newData) {
    const MODIFIED_LICENSE = await UrbanLicense.findByPk(id, {
        include: URBAN_MODELS
    });

    if (MODIFIED_LICENSE == null) return null;

    await MODIFIED_LICENSE.update(newData);

    if (newData.zone) {
        await MODIFIED_LICENSE.reload({include: URBAN_MODELS});
    }

    return MODIFIED_LICENSE;
}

export async function deleteUrbanLicense(id) {
    const DELETED_LICENSE = await UrbanLicense.findByPk(id, {
        include: URBAN_MODELS
    });

    if (DELETED_LICENSE == null) return null;

    await DELETED_LICENSE.destroy();

    return DELETED_LICENSE;
}

export async function getLicenseEspecialData(id) {
    return await UrbanLicense.findByPk(id, {
        attributes: ['fullInvoice','licenseSpecialData'],
        raw: true,
        nest: true
    });
}

export async function getLatestInvoice(type, year) {
    return await UrbanLicense.findAll({
        where: {
            licenseType: type,
            year: year
        },
        order: [
            ['invoice', 'DESC']
        ],
        attributes: ['invoice', 'year'],
        include: {
            model: UrbanType,
            attributes: ['licenseType']
        },
        raw: true,
        nest: true
    });
}

export async function getLicenseType(id) {
    return await UrbanType.findByPk(id, {
        attributes: ['licenseType'],
        raw: true,
        nest: true
    });
}