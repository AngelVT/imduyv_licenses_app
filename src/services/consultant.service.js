import * as consultantRepo from '../repositories/consultant.repository.js';
import ResourceError from '../errors/ResourceError.js';
import ValidationError from '../errors/ValidationError.js';
import { parseBool } from '../utilities/urban.utilities.js';

export async function requestConsultLicense(type, invoice, year, isLegacy) {
    if(isNaN(parseInt(type)) || isNaN(parseInt(invoice)) || isNaN(parseInt(year))) {
        throw new ValidationError('Solicitud fallida por tipo, folio o año invalido.',
            'Land use consultant request by full invoice',
            `Search params /t/${type}/i/${invoice}/y/${year} are invalid.`);
    }

    const doLegacySearch = parseBool(isLegacy, false)

    let licenses;

    if (doLegacySearch) {
        const invoiceLetters = {
            1: "C",
            2: "LS",
            3: "LC",
            4: "LI",
            5: "SEG",
            6: "DP",
            7: "LH"
        }
        const invoiceFull = `/${invoiceLetters[type]}/${invoice.padStart(3, '0')}/${year}`;

        licenses = await consultantRepo.findLegacyLicenseByInvoice(invoiceFull);

        if (!licenses || licenses.length === 0) {
            throw new ResourceError('La licencia solicitada no se encuentra dentro de las licencias Legacy o no existe. verifica tu información',
            'Land use request by full invoice',
            `Search params /t/${type}/i/${invoice}/y/${year} not found.`);
        }

        return {
            licenses
        }
    } else {
        licenses = await consultantRepo.findLandLicenseInvoice(type,invoice, year);

        if (!licenses || licenses.length === 0) {
            throw new ResourceError('La licencia solicitada no se encuentra dentro de las licencias nuevas o no existe. verifica tu información',
            'Land use request by full invoice',
            `Search params /t/${type}/i/${invoice}/y/${year} not found.`);
        }
        
        licenses.legacy_license_uuid = licenses.public_land_license_id;
        licenses.licencia = licenses.fullInvoice;

        return {
            licenses: [licenses]
        }
    }
}