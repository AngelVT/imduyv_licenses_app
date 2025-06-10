import { UrbanLicense, UrbanType, Zone, Term, Validity } from "../models/License.models.js";
import { Op } from "sequelize";
import { generateSpecialData } from "../utilities/urban.utilities.js";
import { escapeLike } from "../utilities/repository.utilities.js";

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
const URBAN_ATTRIBUTES = { exclude: ['urban_license_id'] }

async function getType(type) {
    const TYPE = await UrbanType.findOne({
        where: { licenseType: type},
        raw: true
    });

    return TYPE.license_urban_type_id
}

function generateSafeLicense(license) {
    const { urban_license_id, ...safeLicense } = license.toJSON();
    return safeLicense;
}

export async function findAllUrbanLicenses() {
    return await UrbanLicense.findAll({
        attributes: URBAN_ATTRIBUTES,
        include: URBAN_MODELS,
        raw: true,
        nest: true
    });
}

export async function findUrbanLicense(id) {
    return await UrbanLicense.findOne({
        where: {
            public_urban_license_id: id
        },
        attributes: URBAN_ATTRIBUTES,
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
        attributes: URBAN_ATTRIBUTES,
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
        order: [['invoice', 'ASC']],
        attributes: URBAN_ATTRIBUTES,
        include: URBAN_MODELS,
        raw: true,
        nest: true
    });
}

export async function findUrbanLicenseListByType(type, year) {
    return await UrbanLicense.findAll({
        attributes: ['public_urban_license_id', 'fullInvoice', 'requestorName'],
        where: {
            licenseType: type,
            year: year
        },
        order: [['invoice', 'ASC']],
        raw: true,
        nest: true
    });
}

export async function findUrbanLicenseBy(parameter, value) {
    const PARAM = new Object;
    PARAM[parameter] = { [Op.like]: `%${escapeLike(value)}%` };
    return await UrbanLicense.findAll({
        where: PARAM,
        attributes: URBAN_ATTRIBUTES,
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

    return CREATED ? generateSafeLicense(NEW_LICENSE) : null;
}

export async function saveUrbanLicense(id, newData) {
    const MODIFIED_LICENSE = await UrbanLicense.findOne({
        where: {
            public_urban_license_id: id
        },
        include: URBAN_MODELS
    });

    if (MODIFIED_LICENSE == null) return null;

    await MODIFIED_LICENSE.update(newData);

    if (newData.zone) {
        await MODIFIED_LICENSE.reload({include: URBAN_MODELS});
    }

    return generateSafeLicense(MODIFIED_LICENSE);
}

export async function deleteUrbanLicense(id) {
    const DELETED_LICENSE = await UrbanLicense.findOne({
        where: {
            public_urban_license_id: id
        },
        include: URBAN_MODELS
    });

    if (DELETED_LICENSE == null) return null;

    await DELETED_LICENSE.destroy();

    return generateSafeLicense(DELETED_LICENSE);
}

export async function getLicenseEspecialData(id) {
    return await UrbanLicense.findOne({
        where: {
            public_urban_license_id: id
        },
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

export async function saveStartInvoice(invoice, type, year) {
    const TYPE = await getType(type);
    const START_INVOICE = await UrbanLicense.create({
        fullInvoice: `IMDUyV_DLyCU_SYS_${invoice.toString().padStart(3, '0')}_${year}`,
        invoice: invoice,
        licenseType: TYPE,
        year: year,
        requestorName: 'Placeholder',
        elaboratedBy: 'Placeholder',
        geoReference: 'Placeholder',
        licenseSpecialData: generateSpecialData(TYPE)
    });
}