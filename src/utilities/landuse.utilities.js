import path from "path";
import { promises as fs} from 'fs';
import { __dirstorage } from "../path.configuration.js";

import { getLatestInvoice, getLicenseType } from "../repositories/landuse.repository.js";


export async function generateInvoiceInformation(licenseType, year) {
    let numericInvoice;
    let type;
    let fullInvoice;

    const INVOICES = await getLatestInvoice(licenseType, year);

    if(INVOICES.length == 0) {
        numericInvoice = 1;

        const types = await getLicenseType(licenseType);

        type = types.licenseType;
    } else {
        numericInvoice =INVOICES[0].invoice + 1;
        type = INVOICES[0].type.licenseType;
    }

    fullInvoice = `IMDUyV_DLyCU_${type}_${numericInvoice.toString().padStart(3, '0')}_${year}`;

    return { numericInvoice, fullInvoice }
}

export function generateSpecialData(type) {
    if (type == 1) {
        return {
            anexo:" ",
        }
    }

    if (type >= 2 && type <=5) {
        return { 
            anexo:" ",
            restrictions: "La presente no autoriza acciones urbanas que generen impacto social en su entorno inmediato conforme a lo establecido en el artículo 139 de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial del Estado de Hidalgo y al artículo 61 del Reglamento de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial del Estado de Hidalgo debiendo ser compatibles o permitidos los giros de acuerdo a la matriz de compatibilidad del Programa Municipal de Desarrollo Urbano y Ordenamiento Territorial del Municipio de Tizayuca, Estado de Hidalgo. Acatar la normativa y restricciones de la zonificación secundaria que determina el documento técnico del Programa Municipal de Desarrollo Urbano y Ordenamiento Territorial de Tizayuca. Los predios que tengan como frente un corredor urbano, podrán adoptar las características propias del corredor, siempre y cuando su acceso sea por el corredor. Deberá tramitar en su caso, la licencia de construcción en la Secretaría de Obras Públicas, así como la licencia de funcionamiento en la Dirección de Reglamentos, Espectáculos y Panteones, pertenecientes al Municipio de Tizayuca, Hidalgo. Dar cumplimiento a lo dispuesto en los artículos 80 y 81 de la Ley de Protección Civil del Estado de Hidalgo. El Instituto Municipal de Desarrollo Urbano y Vivienda se reserva el derecho de revocar la presente, en caso de incumplimiento a cualquiera de las condiciones establecidas en la misma.",
            conditions: [
                "Por lo que hace al uso de suelo HABITACIONAL, una vez autorizado, deberá ser permitido con base en la matriz de compatibilidad del Programa Municipal de Desarrollo Urbano y Ordenamiento Territorial de Tizayuca, Hidalgo.",
                "No deberán ocupar área pública como mostrador de productos.",
                "Se prohíbe la colocación de cualquier publicidad fuera y frente del predio.",
                "Deberá destinar un cajón de estacionamiento por cada 30 m2 de construcción.",
                "No se deberá ocupar la banqueta (vía pública) para realizar maniobras en su proceso constructivo.",
                "Se deberá dar cumplimiento a las Normas Oficiales Mexicanas, según corresponda.",
                'En todas las puertas que conduzcan al exterior habrá letreros con la palabra "salida" y flechas luminosas indicando la dirección de las salidas, las letras tendrán una altura mínima de quince centímetros.',
                "Deberá tramitar dictamen ante la Dirección de Protección Civil y Bomberos del Municipio de Tizayuca, Hidalgo, así como atender todas las recomendaciones que en materia de riesgos se le efectúen; para poder realizar la actualización de su licencia tendrá que presentar dicho dictamen vigente."
            ]
        }
    }

    if (type == 6) {
        return { 
            anexo:" ",
            parcela: "##/### ###",
            propertyNo: "###########",
            propertyDate: "2024-01-01"
        }
    }
}

export async function saveZoneImage(file, fullInvoice) {
    try {
        const destination = path.join(__dirstorage, 'assets', 'land', fullInvoice, 'zone.png');

        const directory = path.dirname(destination);

        await fs.mkdir(directory, { recursive: true });

        await fs.writeFile(destination, file.buffer);

        return true
    } catch (error) {
        return false;
    }
}