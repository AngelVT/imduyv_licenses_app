import path from "path";
import { promises as fs } from 'fs';
import { createWriteStream } from "fs";
import { __dirstorage } from "../path.configuration.js";
import { generateLandUseC } from "../models/documents/landUse/licenciaC.js";
import { generateLandUseL } from "../models/documents/landUse/licenciaL.js";
import { generateLandUseDP } from "../models/documents/landUse/licenciaDP.js";
import { printerPDF } from "../utilities/pdf.utilities.js";

import { getLatestInvoice, getLicenseType } from "../repositories/landuse.repository.js";


export async function generateInvoiceInformation(licenseType, year) {
    let numericInvoice;
    let type;
    let fullInvoice;

    const INVOICES = await getLatestInvoice(licenseType, year);

    if (INVOICES.length == 0) {
        numericInvoice = 1;

        const types = await getLicenseType(licenseType);

        type = types.licenseType;
    } else {
        numericInvoice = INVOICES[0].invoice + 1;
        type = INVOICES[0].type.licenseType;
    }

    fullInvoice = `IMDUyV_DLyCU_${type}_${numericInvoice.toString().padStart(3, '0')}_${year}`;

    return { numericInvoice, fullInvoice }
}

export function generateSpecialData(type) {
    const textTypes = {
        1: '',
        2: 'SERVICIOS',
        3: 'COMERCIAL',
        4: 'INDUSTRIAL',
        5: 'SEGREGADO',
        6: ''
    };

    if (type == 1) {
        return {
            anexo: "-",
            restrictions: [
                "La presente no autoriza acciones urbanas, ni construcción de obras que generen impacto social en su entorno inmediato.",
                "Esta constancia no autoriza subdividir o fraccionar el inmueble señalado.",
                "La presente se expide únicamente para los fines establecidos y no constituye bajo ninguna circunstancia documento que acredite la propiedad o posesión sobre el inmueble referido.",
                "El Instituto Municipal de Desarrollo Urbano y Vivienda, se reserva el derecho de revocar la presente en caso de incumplimiento a cualquiera de las condiciones establecidas en la misma."
            ],
            marginName: 10,
            marginAttention: 10
        }
    }

    if (type >= 2 && type <= 5) {

        return {
            anexo: "-",
            restrictions: [
                "La presente no autoriza acciones urbanas que generen impacto social en su entorno inmediato conforme a lo establecido en el artículo 139 de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial del Estado de Hidalgo y al artículo 61 del Reglamento de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial del Estado de Hidalgo debiendo ser compatibles o permitidos los giros de acuerdo a la matriz de compatibilidad del Programa Municipal de Desarrollo Urbano y Ordenamiento Territorial del Municipio de Tizayuca, Estado de Hidalgo.",
                "Acatar la normativa y restricciones de la zonificación secundaria que determina el documento técnico del Programa Municipal de Desarrollo Urbano y Ordenamiento Territorial de Tizayuca.",
                "Los predios que tengan como frente un corredor urbano, podrán adoptar las características propias del corredor, siempre y cuando su acceso sea por el corredor.",
                "Deberá tramitar en su caso, la licencia de construcción en la Secretaría de Obras Públicas, así como la licencia de funcionamiento en la Dirección de Reglamentos, Espectáculos y Panteones, pertenecientes al Municipio de Tizayuca, Hidalgo.",
                "Dar cumplimiento a lo dispuesto en los artículos 80 y 81 de la Ley de Protección Civil del Estado de Hidalgo.",
                "El Instituto Municipal de Desarrollo Urbano y Vivienda se reserva el derecho de revocar la presente, en caso de incumplimiento a cualquiera de las condiciones establecidas en la misma."
            ],
            conditions: [
                `Por lo que hace al uso de suelo ${textTypes[type]}, una vez autorizado, deberá ser permitido con base en la matriz de compatibilidad del Programa Municipal de Desarrollo Urbano y Ordenamiento Territorial de Tizayuca, Hidalgo.`,
                "No deberán ocupar área pública como mostrador de productos.",
                "Se prohíbe la colocación de cualquier publicidad fuera y frente del predio.",
                "Deberá destinar un cajón de estacionamiento por cada 30 m2 de construcción.",
                "No se deberá ocupar la banqueta (vía pública) para realizar maniobras en su proceso constructivo.",
                "Se deberá dar cumplimiento a las Normas Oficiales Mexicanas, según corresponda.",
                'En todas las puertas que conduzcan al exterior habrá letreros con la palabra "salida" y flechas luminosas indicando la dirección de las salidas, las letras tendrán una altura mínima de quince centímetros.',
                "Se prohíbe la ocupación, obstrucción, o uso de areas municipales, para cualquier fin distinto al establecido, tales como: actividades comerciales, de construcción, almacenamiento de materiales, entre otros.",
                "Deberá tramitar dictamen ante la Dirección de Protección Civil y Bomberos del Municipio de Tizayuca, Hidalgo, así como atender todas las recomendaciones que en materia de riesgos se le efectúen; para poder realizar la actualización de su licencia tendrá que presentar dicho dictamen vigente."
            ],
            marginName: 10,
            marginAttention: 10
        }
    }

    if (type == 6) {
        return {
            anexo: "-",
            parcela: "##/### ###",
            propertyNo: "###########",
            propertyDate: "2024-01-01",
            restrictions: [
                "Los actos, convenios o contratos que se realicen sin respetar el Derecho de Preferencia a que se refiere este apartado podrán ser declarados nulos mediante procedimiento administrativo o judicial, cuando por derecho haya sido conculcado.",
                "Los propietarios, poseedores, fedatarios públicos, registradores públicos y autoridades que den fe o realicen acciones, trámites administrativos de transmisión de la propiedad o que inscriban actos o negocios jurídicos, contrario a lo establecido en la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial del Estado de Hidalgo, se harán acreedores a las sanciones y responsabilidades administrativas, civiles y penales correspondientes, con fundamento en los artículos 102, 193 fracciones XIV y XV, así como el artículo 200 de la misma Ley y demás aplicables.",
                "En caso de incumplimiento de las obligaciones señaladas, se harán acreedores a las sanciones y responsabilidades penales, civiles y administrativas conforme al artículo 52 de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial para Estado de Hidalgo."
            ],
            marginName: 10,
            marginAttention: 10
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

export async function saveLegacyPDF(file) {
    try {
        const destination = path.join(__dirstorage, 'assets', 'legacy', `${file.originalname}`);

        const directory = path.dirname(destination);

        await fs.mkdir(directory, { recursive: true });

        await fs.writeFile(destination, file.buffer);

        return true
    } catch (error) {
        return false;
    }
}

export async function generateArchivePDF(license) {
    try {
        const destination = path.join(__dirstorage, 'assets', 'land', license.fullInvoice, `${license.fullInvoice}.pdf`);

        const directory = path.dirname(destination);

        await fs.mkdir(directory, { recursive: true });

        let definition;

        if (license.licenseType == 1) {
            definition = await generateLandUseC(license);
        }

        if (license.licenseType >= 2 && license.licenseType <= 5) {
            definition = await generateLandUseL(license);
        }

        if (license.licenseType == 6) {
            definition = await generateLandUseDP(license);
        }

        const pdfDoc = printerPDF.createPdfKitDocument(definition);

        const writeStream = createWriteStream(destination);

        return new Promise((resolve, reject) => {
            pdfDoc.pipe(writeStream);
            pdfDoc.end();

            writeStream.on('finish', () => resolve(true));
            writeStream.on('error', (err) => {
                console.error("Error writing PDF:", err);
                reject(false)
            });
        });
    } catch (error) {
        console.log(error)
        return false;
    }
}