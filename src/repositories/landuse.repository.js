import { LandUseLicense, Type, Term, Zone, AuthUse, Validity, ExpeditionType } from "../models/License.models.js";
import { Op } from "sequelize";
import { generateSpecialData } from "../utilities/landuse.utilities.js";
import { escapeLike } from "../utilities/repository.utilities.js";

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
const LAND_USE_ATTRIBUTES = { exclude: ['land_license_id'] };

async function getType(type) {
    const TYPE = await Type.findOne({
        where: { licenseType: type },
        raw: true
    });

    return TYPE.license_type_id
}

function generateSafeLicense(license) {
    const { land_license_id, ...safeLicense } = license.toJSON();
    return safeLicense;
}

export async function findAllLandLicenses() {
    return await LandUseLicense.findAll({
        include: LAND_USE_MODELS,
        raw: true,
        nest: true
    });
}

export async function findLandLicenseId(id) {
    return await LandUseLicense.findOne({
        where: {
            public_land_license_id: id
        },
        attributes: LAND_USE_ATTRIBUTES,
        include: LAND_USE_MODELS,
        raw: true,
        nest: true
    });
}

export async function findLandLicensePrintInvoice(printInvoice) {
    return await LandUseLicense.findOne({
        where: {
            licensePrintInvoice: { [Op.iLike]: `%${escapeLike(printInvoice)}%`, [Op.escape]: '\\' }
        },
        attributes: LAND_USE_ATTRIBUTES,
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
        attributes: LAND_USE_ATTRIBUTES,
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
        order: [['invoice', 'ASC']],
        attributes: LAND_USE_ATTRIBUTES,
        include: LAND_USE_MODELS,
        raw: true,
        nest: true
    });
}

export async function findLandLicenseBy(parameter, value) {
    const PARAM = new Object;
    PARAM[parameter] = { [Op.iLike]: `%${escapeLike(value)}%`, [Op.escape]: '\\' };
    return await LandUseLicense.findAll({
        where: PARAM,
        include: LAND_USE_MODELS,
        attributes: LAND_USE_ATTRIBUTES,
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

    return CREATED ? generateSafeLicense(NEW_LICENSE) : null;
}

export async function saveLandLicense(id, newData) {
    const MODIFIED_LICENSE = await LandUseLicense.findOne({
        where: {
            public_land_license_id: id
        },
        include: LAND_USE_MODELS
    });

    if (MODIFIED_LICENSE == null) return null;

    try {
        await MODIFIED_LICENSE.update(newData);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return 400
        }
        return 500
    }

    if (newData.zone || newData.authorizedUse || newData.validity || newData.expeditionType || newData.term) {
        await MODIFIED_LICENSE.reload({ include: LAND_USE_MODELS });
    }

    return generateSafeLicense(MODIFIED_LICENSE);
}

export async function deleteLandLicense(id) {
    const DELETED_LICENSE = await LandUseLicense.findOne({
        where: {
            public_land_license_id: id
        },
        include: LAND_USE_MODELS
    });

    if (DELETED_LICENSE == null) return null;

    await DELETED_LICENSE.destroy();

    return generateSafeLicense(DELETED_LICENSE);
}

export async function getLicenseEspecialData(id) {
    return await LandUseLicense.findOne({
        where: {
            public_land_license_id: id
        },
        attributes: ['fullInvoice', 'licenseSpecialData'],
        raw: true,
        nest: true
    });
}

export async function getLatestInvoice(type, year) {
    return await LandUseLicense.findAll({
        where: {
            licenseType: type,
            year: year
        },
        order: [
            ['invoice', 'DESC']
        ],
        attributes: ['invoice', 'year'],
        include: {
            model: Type,
            attributes: ['licenseType']
        },
        raw: true,
        nest: true
    });
}

export async function getLicenseType(id) {
    return await Type.findByPk(id, {
        attributes: ['licenseType'],
        raw: true,
        nest: true
    });
}

export async function saveStartInvoice(invoice, type, year) {
    const TYPE = await getType(type);
    const START_INVOICE = await LandUseLicense.create({
        fullInvoice: `IMDUyV_DLyCU_SYS_${invoice.toString().padStart(3, '0')}_${year}`,
        invoice: invoice,
        licenseType: TYPE,
        year: year,
        requestorName: 'Placeholder',
        attentionName: 'Placeholder',
        elaboratedBy: 'Placeholder',
        requestDate: '1999-01-01',
        address: 'Placeholder',
        number: 'Placeholder',
        colony: 'Placeholder',
        surfaceTotal: 'Placeholder',
        catastralKey: 'Placeholder',
        licenseTerm: 1,
        geoReference: 'Placeholder',
        licenseZone: 1,
        authorizedUse: 1,
        businessLinePrint: 'Placeholder',
        businessLineIntern: 'Placeholder',
        expeditionDate: '1999-01-01',
        licenseValidity: 1,
        paymentInvoice: 'Placeholder',
        expirationDate: '1999-01-01',
        licenseExpeditionType: 1,
        contactPhone: 7700000000,
        cost: 0,
        discount: 0,
        paymentDone: 0,
        inspector: 'Placeholder',
        licenseSpecialData: generateSpecialData(TYPE)
    });
}