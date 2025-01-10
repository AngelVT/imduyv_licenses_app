import { __dirname, __dirstorage } from "../path.configuration.js";
import { printerPDF } from "../utilities/pdf.utilities.js";
import { generateUrbanLUH } from "../models/documents/urban/licenciaLH.js";

export const test = async (req, res) => {
    try {
        const data = {
            "id": 10,
            "fullInvoice": "IMDUyV_DLyCU_LUH_000_2025",
            "invoice": 0,
            "licenseType": 2,
            "year": 2025,
            "requestDate": "2025-01-10",
            "requestorName": "Placeholder",
            "legalRepresentative": null,
            "elaboratedBy": "Placeholder",
            "lastModifiedBy": "Administrador De Sistema",
            "colony": null,
            "catastralKey": 1515151515151515,
            "geoReference": "Placeholder",
            "licenseTerm": 1,
            "surfaceTotal": null,
            "licenseZone": 1,
            "expeditionDate": "2025-01-13",
            "licenseValidity": 1,
            "collectionOrder": null,
            "paymentDate": null,
            "billInvoice": "c-2855 y c-000",
            "authorizedQuantity": null,
            "deliveryDate": null,
            "receiverName": null,
            "observations": null,
            "licenseSpecialData": {
                "PCU": "PCU",
                "representativeAs": "Representante Legal",
                "requestorAddress": "Domicilio",
                "buildingAddress": "Domicilio",
                "occupationPercent": 0,
                "surfacePerLote": 0,
                "maximumHeight": "Ej: 9 metros o 3 niveles",
                "minimalFront": 0,
                "frontalRestriction": 0,
                "parkingLots": "Ej: 1 Cajón por lote",
                "usePercent": 0,
                "conditions": [
                    "Por lo que hace al uso HABITACIONAL, una vez autorizado, deberá ser permitido con base en la matriz de compatibilidad del Programa Municipal de Desarrollo Urbano y Ordenamiento Territorial de Tizayuca, Hidalgo.",
                    "La presente no autoriza acciones urbanas ni construcción de obras que generen impacto social en su entorno inmediato.",
                    "Para realizar obras de construcción, deberá tramitar y contar con licencia de construcción emitida por la Secretaría de Obras Públicas del Municipio de Tizayuca.",
                    "El propietario está obligado a dejar 30% de la superficie neta de cada lote libre de construcción para absorción de agua pluvial.",
                    "Se prohíbe la colocación de cualquier publicidad fuera y frente del predio.",
                    "No se podrá destinar el uso de suelo para fines comerciales, si no solo el establecido en esta licencia.",
                    "No se deberá ocupar la banqueta (vía pública) para realizar maniobras en su proceso constructivo.",
                    "Acatar la normativa y restricciones de la zonificación secundaria que determina el documento técnico del Programa Municipal de Desarrollo Urbano y Ordenamiento Territorial de Tizayuca.",
                    "El Instituto Municipal de Desarrollo Urbano y Vivienda se reserva el derecho de revocar la presente, en caso de incumplimiento a cualquiera de las condiciones establecidas en la misma."
                ]
            },
            "approvalStatus": 0,
            "active": 1,
            "createdAt": "2025-01-10T15:11:09.000Z",
            "updatedAt": "2025-01-10T15:39:34.000Z",
            "urban_type": {
                "licenseType": "LUH"
            },
            "zone": {
                "licenseZone": "Densidad muy baja (Unifamiliar)",
                "licenseKey": "H0.5"
            },
            "term": {
                "licenseTerm": "corto"
            },
            "validity": {
                "licenseValidity": "seis meses"
            }
        }

        const definition = await generateUrbanLUH(data);

        const pdfDoc = printerPDF.createPdfKitDocument(definition);

        res.setHeader('Content-Type', 'application/pdf');
        pdfDoc.info.Title = 'IMDUyV/DLyCU/SYS/000/2025';
        pdfDoc.pipe(res);
        pdfDoc.end();
    } catch (error) {
        console.log('Tha error: ', error);
        res.status(500).json({ msg: "Error on server" });
    }
}

export const testFile = async (req, res) => {
    try {
        res.status(200).json({msg: "Pong"});
    } catch (error) {
        console.log('Tha error: ', error);
        res.status(500).json({ msg: "Error on server" });
    }
}


export const testScript = async (req, res) => {
    try {
        res.status(200).json({msg: "Pong"});
    } catch (error) {
        console.log('Tha error: ', error);
        res.status(500).json({ msg: "Error on server" });
    }
}