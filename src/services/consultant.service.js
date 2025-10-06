import * as consultantRepo from '../repositories/consultant.repository.js';
import ResourceError from '../errors/ResourceError.js';
import ValidationError from '../errors/ValidationError.js';
import { parseBool } from '../utilities/urban.utilities.js';
import { buildLicenseFilter, buildLegacyLicenseFilter } from '../utilities/repository.utilities.js';

export async function requestConsultLicense(type, invoice, year) {
    if (isNaN(parseInt(type)) || isNaN(parseInt(invoice)) || isNaN(parseInt(year))) {
        throw new ValidationError('Solicitud fallida por tipo, folio o año invalido.',
            'Land use consultant request by full invoice',
            `Search params /t/${type}/i/${invoice}/y/${year} are invalid.`);
    }

    const today = Date.now();

    const invoiceLetters = {
        1: "C",
        2: "LS",
        3: "LC",
        4: "LI",
        5: "SEG",
        6: "DP",
        7: "LH"
    }

    const invoiceFull = `${invoiceLetters[type]}/${invoice.padStart(3, '0')}/${year}`;

    const [legacyLicenses, newLicense] = await Promise.all([
        consultantRepo.findLegacyLicenseByInvoice(invoiceFull, type),
        consultantRepo.findLandLicenseInvoice(type, invoice, year)
    ]);

    if (legacyLicenses && legacyLicenses.length > 0) {
        for (const lic of legacyLicenses) {
            const licDate = new Date(lic.vencimiento);
            lic.expired = today >= licDate;
        }

        return {
            legacy: true,
            licenses: legacyLicenses
        };
    }

    if (newLicense && Object.keys(newLicense).length > 0) {
        newLicense.legacy_license_uuid = newLicense.public_land_license_id;
        newLicense.licencia = newLicense.fullInvoice;

        const licDate = new Date(newLicense.expirationDate);
        newLicense.expired = today >= licDate;

        return {
            legacy: false,
            licenses: [newLicense]
        };
    }

    throw new ResourceError(
        'La licencia solicitada no se encuentra dentro de las licencias nuevas ni Legacy. Verifica tu información.',
        'Land use request by full invoice',
        `Search params /t/${type}/i/${invoice}/y/${year} not found.`
    );
}

export async function requestConsultLicenseFiltered(searchParams) {
    const { year, type } = searchParams;

    if (isNaN(parseInt(year)) || (isNaN(parseInt(type)) && type)) {
        throw new ValidationError('Solicitud fallida por año invalido.',
            'Land use consultant request by filter',
            `Search params year ${year} or type ${type} are invalid.`);
    }

    const filters = buildLicenseFilter(searchParams);
    const legacyFilters = buildLegacyLicenseFilter(searchParams);

    const licenses = await consultantRepo.findLandLicenseByFilters(filters);

    const legacyLicenses = await consultantRepo.findLegacyLicenseByFilters(legacyFilters);

    if ((!licenses || licenses.length === 0) && (!legacyLicenses || legacyLicenses.length === 0)) {
        throw new ResourceError('La búsqueda solicitada no arrojo resultados con los filtros asignados, verifica tu información.',
            'Land use request by filters',
            `Search params ${searchParams} not found.`);
    }

    licenses.forEach(l => {
        l.legacy_license_uuid = l.public_land_license_id;
        l.licencia = l.fullInvoice;
    });

    return {
        licenses,
        legacyLicenses
    }
}