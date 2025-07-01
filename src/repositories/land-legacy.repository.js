import { Op } from "sequelize";
import Sequelize from "sequelize";
import { LegacyLicense, LegacyType } from "../models/LandLegacy.models.js";
import { escapeLike } from "../utilities/repository.utilities.js";

const LEGACY_ATTRIBUTES = { exclude: ['legacy_license_id', 'createdAt', 'updatedAt'] };
const LEGACY_MODELS = [
    {
        model: LegacyType,
        attributes: ['licenseType']
    }
]

export async function findLegacyLicenseByUUID(id) {
    return await LegacyLicense.findOne({
        where: {
            legacy_license_uuid: id
        },
        order: [['licencia', 'ASC']],
        include: LEGACY_MODELS,
        attributes: LEGACY_ATTRIBUTES,
        raw: true,
        nest: true
    });
}

export async function findLegacyLicenseByInvoice(invoice) {
    return await LegacyLicense.findAll({
        where: {
            licencia: { [Op.iLike]: `%${escapeLike(invoice)}%` }
        },
        include: LEGACY_MODELS,
        attributes: LEGACY_ATTRIBUTES,
        raw: true,
        nest: true
    });
}

export async function findLegacyLicenseByTypeYear(type, year) {
    return await LegacyLicense.findAll({
        where: {
            legacy_type_id: type,
            year: year
        },
        order: [['licencia', 'ASC']],
        include: LEGACY_MODELS,
        attributes: LEGACY_ATTRIBUTES,
        raw: true,
        nest: true
    });
}

export async function findLegacyLicenseByCatastralKey(catastralKey) {
    return await LegacyLicense.findAll({
        where: {
            clave_catastral: { [Op.iLike]: `%${escapeLike(catastralKey)}%` }
        },
        order: [['licencia', 'ASC']],
        include: LEGACY_MODELS,
        attributes: LEGACY_ATTRIBUTES,
        raw: true,
        nest: true
    });
}

export async function findLegacyLicenseByRequestor(requestorName) {
    return await LegacyLicense.findAll({
        where: Sequelize.where(
            Sequelize.fn('unaccent', Sequelize.col('nombre')),
            {
                [Sequelize.Op.iLike]: `%${escapeLike(requestorName)}%`
            }
        ),
        order: [['licencia', 'ASC']],
        include: LEGACY_MODELS,
        attributes: LEGACY_ATTRIBUTES,
        raw: true,
        nest: true
    });
}

export async function findLegacyLicenseByPeriod(startDate, endDate) {
    return await LegacyLicense.findAll({
        where: {
            fecha_expedicion: {
                [Op.between]: [startDate, endDate]
            }
        },
        order: [['licencia', 'ASC']],
        include: LEGACY_MODELS,
        attributes: LEGACY_ATTRIBUTES,
        raw: true,
        nest: true
    });
}