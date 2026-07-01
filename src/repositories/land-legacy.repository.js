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

const LEGACY_ORDER = [['licencia', 'ASC']];

export async function findLegacyLicenseByUUID(id) {
    return await LegacyLicense.findOne({
        where: {
            legacy_license_uuid: id
        },
        order: LEGACY_ORDER,
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
        order: LEGACY_ORDER,
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
        order: LEGACY_ORDER,
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
        order: LEGACY_ORDER,
        include: LEGACY_MODELS,
        attributes: LEGACY_ATTRIBUTES,
        raw: true,
        nest: true
    });
}

export async function findLegacyLicenseByAttention(attention) {
    return await LegacyLicense.findAll({
        where: Sequelize.where(
            Sequelize.fn('unaccent', Sequelize.col('en_atencion')),
            {
                [Sequelize.Op.iLike]: `%${escapeLike(attention)}%`
            }
        ),
        order: LEGACY_ORDER,
        include: LEGACY_MODELS,
        attributes: LEGACY_ATTRIBUTES,
        raw: true,
        nest: true
    });
}

export async function findLegacyLicenseFiltered(filter) {
    const where = [];

    if (filter.period) {
        where.push({
            fecha_expedicion: {
                [Op.between]: [filter.period[0], filter.period[1]]
            }
        });
    }

    if (filter.legacy_type_id) {
        where.push({
            legacy_type_id: filter.legacy_type_id
        });
    }

    if (filter.year) {
        where.push({
            year: filter.year
        });
    }

    if (filter.parameter && filter.value) {
        where.push(Sequelize.where(
            Sequelize.fn('unaccent',
                Sequelize.cast(Sequelize.col(filter.parameter), 'text')),
            {
                [Op.iLike]: `%${escapeLike(filter.value)}%`
            }
        ));
    }

    if (where.length === 0) {
        return []
    }

    return await LegacyLicense.findAll({
        where: {
            [Op.and]: where
        },
        order: LEGACY_ORDER,
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
        order: LEGACY_ORDER,
        include: LEGACY_MODELS,
        attributes: LEGACY_ATTRIBUTES,
        raw: true,
        nest: true
    });
}

export async function findLegacyLicenseByPeriodType(type ,startDate, endDate) {
    return await LegacyLicense.findAll({
        where: {
            legacy_type_id: type,
            fecha_expedicion: {
                [Op.between]: [startDate, endDate]
            }
        },
        order: LEGACY_ORDER,
        attributes: ['licencia', 'nombre', 'clave_catastral', 'calle', 'numero','colonia', 'giro_2','fecha_expedicion', 'folio_membrete','folio_pago', 'georeferencia', 'tipo_tramite'],
        raw: true
    });
}