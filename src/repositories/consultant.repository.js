import { LegacyLicense, LegacyType } from "../models/LandLegacy.models.js";
import { escapeLike } from "../utilities/repository.utilities.js";
import { LandUseLicense, Zone, AuthUse, ExpeditionType } from "../models/License.models.js";
import { Op } from "sequelize";
import { literal } from "sequelize";
import DatabaseError from "../errors/DatabaseError.js";

const LEGACY_ATTRIBUTES = [
    'legacy_license_uuid',
    'licencia',
    'nombre',
    'en_atencion',
    'calle',
    'numero',
    'colonia',
    'superficie_total',
    'clave_catastral',
    'georeferencia',
    'zona',
    'clave',
    'uso_suelo',
    'superficie',
    'vencimiento',
    'tipo_tramite'
];
const LEGACY_MODELS = [
    {
        model: LegacyType,
        attributes: ['licenseType']
    }
];

const LAND_USE_MODELS = [
    {
        model: Zone,
        attributes: ['licenseZone', 'licenseKey']
    },
    {
        model: AuthUse,
        attributes: ['licenseAuthUse']
    },
    {
        model: ExpeditionType,
        attributes: ['licenseExpType']
    },
];
const LAND_USE_ATTRIBUTES = [
    'public_land_license_id',
    'fullInvoice',
    'requestorName',
    'attentionName',
    'address',
    'number',
    'colony',
    'surfaceTotal',
    'catastralKey',
    'geoReference',
    'expirationDate',
    'approvalStatus',
    [literal(`"landUse_license"."licenseSpecialData"->>'COS'`), "COS"],
    [literal(`"landUse_license"."licenseSpecialData"->>'alt_max'`), "alt_max"],
    [literal(`"landUse_license"."licenseSpecialData"->>'niveles'`), "niveles"]
];

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