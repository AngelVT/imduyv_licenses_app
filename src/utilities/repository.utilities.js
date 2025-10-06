import { Sequelize } from "sequelize";
import { Op } from "sequelize";

export function escapeLike(value) {
    return value
        .replace(/\\/g, '\\\\')  // Escape backslashes
        .replace(/%/g, '\\%')    // Escape %
        .replace(/_/g, '\\_');   // Escape _
}

export function unaccent(text) {
    if (!text) {
        return '';
    }

    return text
        .normalize("NFD")                 // Descompone letras y acentos
        .replace(/[\u0300-\u036f]/g, ""); // Elimina los diacríticos
}

export function buildLicenseFilter(params) {
    const { requestorName, year, type, colony } = params;

    const whereConditions = {
        year
    };

    const unaccentConditions = [];

    if (requestorName) {
        unaccentConditions.push(
            Sequelize.where(
                Sequelize.fn('unaccent', Sequelize.cast(Sequelize.col('requestorName'), 'text')),
                {
                    [Op.iLike]: `%${escapeLike(unaccent(requestorName))}%`
                }
            )
        );
    }

    if (colony) {
        unaccentConditions.push(
            Sequelize.where(
                Sequelize.fn('unaccent', Sequelize.cast(Sequelize.col('colony'), 'text')),
                {
                    [Op.iLike]: `%${escapeLike(unaccent(colony))}%`
                }
            )
        );
    }

    if (type) {
        whereConditions.licenseType = type;
    }

    if (unaccentConditions.length > 0) {
        whereConditions[Op.and] = unaccentConditions;
    }

    return whereConditions;
}

export function buildLegacyLicenseFilter(params) {
    const { requestorName, year, type, colony } = params;

    const whereConditions = {
        year
    };

    const unaccentConditions = [];

    if (requestorName) {
        unaccentConditions.push(
            Sequelize.where(
                Sequelize.fn('unaccent', Sequelize.cast(Sequelize.col('nombre'), 'text')),
                {
                    [Op.iLike]: `%${escapeLike(unaccent(requestorName))}%`
                }
            )
        );
    }

    if (colony) {
        unaccentConditions.push(
            Sequelize.where(
                Sequelize.fn('unaccent', Sequelize.cast(Sequelize.col('colonia'), 'text')),
                {
                    [Op.iLike]: `%${escapeLike(unaccent(colony))}%`
                }
            )
        );
    }

    if (type) {
        whereConditions.legacy_type_id = type;
    }

    if (unaccentConditions.length > 0) {
        whereConditions[Op.and] = unaccentConditions;
    }

    return whereConditions;
}