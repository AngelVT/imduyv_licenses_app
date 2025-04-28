import path from "path";
import { promises as fs } from 'fs';
import { __dirstorage } from "../path.configuration.js";

import { getLatestInvoice, getLicenseType } from "../repositories/urban.repository.js";

async function ensureDirectoryExists(directory) {
    await fs.mkdir(directory, { recursive: true });
}

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
        type = INVOICES[0].urban_type.licenseType;
    }

    fullInvoice = `IMDUyV_DLyCU_${type}_${numericInvoice.toString().padStart(3, '0')}_${year}`;

    return { numericInvoice, fullInvoice }
}

export function parseBool(value, defaultValue) {
    if (typeof value === 'undefined' || value === null) {
        return defaultValue;
    }

    if (typeof value === 'string') {
        return value.toLowerCase() === 'true';
    }

    return Boolean(value);
}

export function generateSpecialData(type) {
    switch (parseInt(type)) {
        case 1:
            return {
                buildingAddress: "Domicilio",
                PCU: "PCU",
                occupationPercent: 0,
                surfacePerLote: 0,
                maximumHeight: 9,
                levels: 3,
                minimalFront: 0.00,
                frontalRestriction: 0.0,
            }
        case 2:
            return {
                representativeAs: "Representante Legal",
                requestorAddress: "Domicilio",
                buildingAddress: "Domicilio",
                occupationPercent: 0,
                surfacePerLote: 0,
                maximumHeight: 9,
                levels: 3,
                minimalFront: 0.00,
                frontalRestriction: 0.0,
                parkingLots: "Ej: 1 Cajón por lote",
                authUse: "-",
                activity: "-",
                usePercent: 0,
                antecedentType: "0",
                antecedent: "IMDUyV/DLyCU/####/###/####",
                conditions: ["Deberá presentar copia de escritura de fusión de predios protocolizada y debidamente inscrita en el Registro Público de la Propiedad y el Comercio, así como notificar a la Dirección de Catastro Municipal, en un periodo no mayor a 30 días hábiles.",
                "Deberá presentar la Constancia de factibilidad de transporte de Residuos Sólidos Urbanos en un plazo no mayor a 15 días hábiles.",
                "Por lo que hace al uso HABITACIONAL UNIFAMILIAR, una vez autorizado, deberá ser permitido con base en la matriz de compatibilidad del Programa Municipal de Desarrollo Urbano y Ordenamiento Territorial de Tizayuca, Hidalgo.",
                "Las vialidades del desarrollo deberán ser de acuerdo a la clasificación de vías publicas descritas en el articulo 63 de Reglamento de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial del Estado de Hidalgo." ,
                "La presente no autoriza acciones urbanas ni construcción de obras que generen impacto social en su entorno inmediato.",
                "Para realizar obras de construcción, deberá tramitar y contar con licencia de construcción emitida por la Secretaría de Obras Públicas del Municipio de Tizayuca.",
                "El propietario está obligado a dejar 40% de la superficie neta de cada lote, libre de construcción para absorción de agua pluvial.",
                "Se prohíbe la colocación de cualquier publicidad fuera y frente del predio.",
                "No se podrá destinar el uso de suelo para fines comerciales, si no solo el establecido en esta licencia.",
                "Acatar la normativa y restricciones de la zonificación secundaria que determina el documento técnico del Programa Municipal de Desarrollo Urbano y Ordenamiento Territorial de Tizayuca."],
                restrictions: [
                    'Esta licencia no autoriza subdividir, fraccionar o limpiar el terreno, hasta en tanto no se tramite la Licencia correspondiente para fraccionar.',
                    'Todo propietario o poseedor de predios, sin importar el régimen de propiedad, que subdivida, lotifique, relotifique o fraccione violando las disposiciones de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial, y su reglamento se harán acreedores de las sanciones correspondientes.',
                ],
                observations: [
                    "Tendrá como uso predominante el de vivienda unifamiliar, permitiéndose áreas comerciales y de servicio en un 10% de la superficie total vendible.",
                    "De acuerdo al aérea total del predio 161,950.70m² clasificado como Zona U3, para el aarea de donacion, debera tener la siguientes consideraciones> 15 m² por vivienda o 13% del area total del predio, que corresponde a 21,053.59 m²"
                ]
            }
        case 3:
            return {
                representativeAs: "Representante Legal",
                requestorAddress: "Domicilio",
                buildingAddress: "Domicilio",
                actualSituation: [
                    {
                        "description": "Fila 1",
                        "surface": "31,091.07",
                        "table": {
                            "distribution": ["Oeste", "Noroeste", "Norte", "Noreste", "Este", "Sureste", "Sur", "Suroeste"],
                            "measures": ["15.00 m", "15.00 m", "15.00 m", "15.00 m", "15.00 m", "15.00 m", "15.00 m", "15.00 m"],
                            "adjoining": ["LOTE 8", "LOTE 6", "LOTE 50", "CALLE PORVENIR", "LOTE 8", "LOTE 6", "LOTE 50", "CALLE PORVENIR"]
                        }
                    }
                ],
                actualAuthorizedFS: [
                    {
                        "description": "Fila 1",
                        "surface": "31,091.07",
                        "table": {
                            "distribution": ["Oeste", "Noroeste", "Norte", "Noreste", "Este", "Sureste", "Sur", "Suroeste"],
                            "measures": ["15.00 m", "15.00 m", "15.00 m", "15.00 m", "15.00 m", "15.00 m", "15.00 m", "15.00 m"],
                            "adjoining": ["LOTE 8", "LOTE 6", "LOTE 50", "CALLE PORVENIR", "LOTE 8", "LOTE 6", "LOTE 50", "CALLE PORVENIR"]
                        }
                    },
                    {
                        "description": "Fila 2",
                        "surface": "31,091.07",
                        "table": {
                            "distribution": ["Oeste", "Noroeste", "Norte", "Noreste", "Este", "Sureste", "Sur", "Suroeste"],
                            "measures": ["15.00 m", "15.00 m", "15.00 m", "15.00 m", "15.00 m", "15.00 m", "15.00 m", "15.00 m"],
                            "adjoining": ["LOTE 8", "LOTE 6", "LOTE 50", "CALLE PORVENIR", "LOTE 8", "LOTE 6", "LOTE 50", "CALLE PORVENIR"]
                        }
                    }
                ],
                authorizationResume: "Ej: SE AUTORIZA LA SUBDIVISIÓN DE LOS PREDIOS IDENTIFICADOS COMO LAS PARCELAS 777, 775, 778, 786, 790, 791 Y LOTE 1 (PARCELA 924), RESULTANDO LA FUSIÓN CON UNA SUPERFICIE TOTAL DE: 161,100.70 M2.",
                conditions: ["Ej: Deberá protocolizar la escritura de la subdivisión, debidamente inscrita en el Registro Público de la Propiedad y del Comercio del Distrito Judicial de Tizayuca, Hidalgo, en un plazo no mayor a 90 días naturales contados a partir de la firma del presente."],
                "layout": "A",
                "pageBreak_1": false,
                "pageBreak_2": false,
                "pageBreak_3": true,
            }
        case 4:
            return {
                representativeAs: "Representante Legal",
                requestorAddress: "Domicilio",
                buildingAddress: "Domicilio",
                actualSituation: [
                    {
                        "description": "Fila 1",
                        "surface": "31,091.07",
                        "table": {
                            "distribution": ["Oeste", "Noroeste", "Norte", "Noreste", "Este", "Sureste", "Sur", "Suroeste"],
                            "measures": ["15.00 m", "15.00 m", "15.00 m", "15.00 m", "15.00 m", "15.00 m", "15.00 m", "15.00 m"],
                            "adjoining": ["LOTE 8", "LOTE 6", "LOTE 50", "CALLE PORVENIR", "LOTE 8", "LOTE 6", "LOTE 50", "CALLE PORVENIR"]
                        }
                    },
                    {
                        "description": "Fila 2",
                        "surface": "31,091.07",
                        "table": {
                            "distribution": ["Oeste", "Noroeste", "Norte", "Noreste", "Este", "Sureste", "Sur", "Suroeste"],
                            "measures": ["15.00 m", "15.00 m", "15.00 m", "15.00 m", "15.00 m", "15.00 m", "15.00 m", "15.00 m"],
                            "adjoining": ["LOTE 8", "LOTE 6", "LOTE 50", "CALLE PORVENIR", "LOTE 8", "LOTE 6", "LOTE 50", "CALLE PORVENIR"]
                        }
                    }
                ],
                actualAuthorizedFS: [
                    {
                        "description": "Fila 1",
                        "surface": "31,091.07",
                        "table": {
                            "distribution": ["Oeste", "Noroeste", "Norte", "Noreste", "Este", "Sureste", "Sur", "Suroeste"],
                            "measures": ["15.00 m", "15.00 m", "15.00 m", "15.00 m", "15.00 m", "15.00 m", "15.00 m", "15.00 m"],
                            "adjoining": ["LOTE 8", "LOTE 6", "LOTE 50", "CALLE PORVENIR", "LOTE 8", "LOTE 6", "LOTE 50", "CALLE PORVENIR"]
                        }
                    }
                ],
                authorizationResume: "Ej: SE AUTORIZA LA FUSIÓN DE LOS PREDIOS IDENTIFICADOS COMO LAS PARCELAS 777, 775, 778, 786, 790, 791 Y LOTE 1 (PARCELA 924), RESULTANDO LA FUSIÓN CON UNA SUPERFICIE TOTAL DE: 161,100.70 M2.",
                conditions: ["Ej: Deberá protocolizar la escritura de la subdivisión, debidamente inscrita en el Registro Público de la Propiedad y del Comercio del Distrito Judicial de Tizayuca, Hidalgo, en un plazo no mayor a 90 días naturales contados a partir de la firma del presente."],
                "layout": "A",
                "pageBreak_1": false,
                "pageBreak_2": false,
                "pageBreak_3": true,
            }
        case 5:
            return {
                representativeAs: "Representante Legal",
                requestorAddress: "Domicilio",
                buildingAddress: "Domicilio",
                location: ["un costado del fraccionamiento Haciendas de Tizayuca, en el municipio de Tizayuca"],
                documents: [
                    "Ej: Solicitud de Licencia de Fraccionamiento.",
                    "Copia de Identificación oficial del C. Ismael Banderas Peñaloza, consistente en credencial de elector, con número de folio 1165026473873, expedida por Instituto Nacional Electoral.",
                    "Copia de Constancia de Situación Fiscal a nombre de Arrendadora Cesvin.",
                    "Copia de Licencias de Uso de Suelo No. IMDUyV/DLyCU/LUS/0011/2023, IMDUyV/DLyCU/LUS/0012/2023, IMDUyV/DLyCU/LUS/0013/2023, IMDUyV/DLyCU/LUS/0014/2023, IMDUyV/DLyCU/LUS/0015/2023, IMDUyV/DLyCU/LUS/0016/2023, IMDUyV/DLyCU/LUS/0017/2023, de fecha 04 de diciembre de 2023.",
                    "Copias de Certificados de existencia o inexistencia de Gravámenes.",
                    "Copias de los recibos de pago de impuesto predial a nombre de Arrendadora Cesvin S.A. de C.V, clave catastral 6908055000053, 690855000041, 6905055000017, 690855000044, 6905055000045, 6908055000046 y 6908055000070 correspondiente al ejercicio fiscal enero- diciembre 2023.",
                    "Reporte fotográfico.",
                    "Croquis de localización con coordenadas UTM.",
                    "4 juegos de planos para su autorización de proyecto de lotificación firmado por Arq. Yolanda Calva Silva Pérez, D.R. y C. 328",
                    "Copia de Acta constitutiva de Arrendadora Cesvin S.A. de C.V.",
                    "Copia de Poder Notarial Lic. Ismael Banderas Peñaloza",
                    "Copia de Factibilidad de servicios emitida por CAAMTH, No. 001-FACT-CAAMTH-2024 de fecha 06 de febrero de 2024.",
                    "Copia de Acuse de solicitud de Constancia de Viabilidad en la Secretaria de Infraestructura Pública y Desarrollo Urbano Sostenible, de fecha 06 de diciembre de 2023.",
                    "Copia de Acuse de solicitud de aprobación del Estudio de Vulnerabilidad y Riesgo, a Subsecretaria de Protección Civil, de fecha 17 de enero de 2024.",
                    "Copia de Constancia de Factibilidad de Transporte de Residuos Sólidos Urbanos y RME, de fecha 23 de febrero de 2024.",
                    "Copia de Aprobación de proyecto emitida por CFE, de fecha 10 de junio de 2019.",
                ],
                authorizationFor: "Ej: AUTORIZACIÓN DE PRÓRROGA DE LICENCIA DE FRACCIONAMIENTO",
                integrity: "Ej: 98 lotes, divididos en 45 lotes habitacionales, 30 lotes habitacionales en condominio, 8 lotes comerciales, 4 lotes de áreas jardinadas, 2 lotes de área de donación, 4 lotes de infraestructura y 5 lotes de servidumbre de paso",
                detailedUse: "Ej: Habitacional de Interés Social, Económico Condominal Horizontal, Condominal Vertical y Comercial.",
                conditions: [
                    "Ej: En un plazo de 90 días naturales contados a partir de la firma de éste, presentará copia simple de la escritura de protocolización del Fraccionamiento denominado “ANDALUCÍA RESIDENCIAL, 3RA ETAPA, SECCIÓN MÁLAGA” debidamente inscrita en el Registro Público de la Propiedad y del Comercio. ",
                    "En un plazo de 90 días naturales presentará factibilidad del suministro de energía eléctrica emitida por la CFE (Comisión Federal de Electricidad), para el fraccionamiento denominado “ANDALUCÍA RESIDENCIAL, 3RA ETAPA, SECCIÓN MÁLAGA”.",
                    "En un plazo de 90 días naturales presentará factibilidad y proyectos ejecutivos aprobados por la Comisión de Agua y Alcantarillado del Municipio de Tizayuca, Hgo., (CAAMTH), para el fraccionamiento denominado “ANDALUCÍA RESIDENCIAL, 3RA ETAPA, SECCIÓN MÁLAGA”. ",
                    "Presentar convenio con la Secretaria de Obras Publicas del Municipio de Tizayuca, Hidalgo, del mantenimiento de la infraestructura vial, en un radio de 500.00 m. del fraccionamiento, como lo indica en las obligaciones del fraccionador en un plazo no mayor a 30 días naturales.",
                    "Deberá cumplir con las condicionantes establecidas por la Comisión de Agua y Alcantarillado del Municipio de Tizayuca (CAAMTH), la Secretaria de Obras Públicas municipales y la Secretaria General Municipal, debiendo cumplir mediante convenio en un periodo establecido por estas instancias; así como determinadas por las entidades estatales correspondientes.",
                    "Deberá presentar Dictamen del Estudio de Impacto Urbano y Vial emitido por la Secretaria de Infraestructura Pública y Desarrollo Urbano Sostenible, de Gobierno del Estado de Hidalgo, en un plazo no mayor a 60 días naturales.",
                    "Deberá presentar Resolución del Estudio de Impacto Ambiental, emitido por la Secretaria de Medio Ambiente y Recursos Naturales del Estado de Hidalgo, en un plazo no mayor a 60 días naturales.",
                    "Deberá presentar Constancia de Viabilidad emitida por la Secretaria de Infraestructura Pública y Desarrollo Urbano Sostenible, de Gobierno del Estado de Hidalgo, en un plazo no mayor a 60 días naturales.",
                    "Deberá presentar proyecto de red de agua potable y calculo hidráulico validado por la dependencia correspondiente, en un plazo no mayor a 30 días naturales.",
                    "Deberá presentar proyecto de red de drenaje y calculo sanitario, validado por dependencia correspondiste, en un plazo no mayor a 30 días naturales.",
                    "Deberá presentar proyecto de drenaje pluvial y calculo hidráulico, validado por la dependencia correspondiente en un plazo no mayor a 30 días naturales.",
                    "Deberá presentar proyecto de red de energía eléctrica y calculo eléctrico, validado por la dependencia correspondiente, en un plazo no mayor a 30 días naturales.",
                    "Presentar calendario y presupuesto de obra de urbanización en un plazo no mayor a 30 dias naturales.",
                    "En consideración del impacto urbano y a la sobredemanda de los servicios públicos en el municipio, se deberán de generar las medidas adecuadas de prevención, integración y/o compensación, para disminuir o compensar los impactos o alteraciones causadas por la presente autorización. En razón de lo anterior el fraccionador deberá mediante convenio retribuir al Instituto Municipal de Desarrollo Urbano y Vivienda, el 30% del monto de la presente autorización. Dicho convenio se deberá de formalizarse en un plazo de hasta 90 días hábiles contados a partir de la firma de éste.",
                    "En caso de incumplimiento a cualquiera de las prerrogativas descritas con antelación se hará acreedor a las sanciones establecidas en el artículo 196 fracción V en relación con el Artículo 193 fracción XIII, ambos de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial del Estado de Hidalgo.",
                    "En caso de incumplimiento a lo antes citado, este documento quedará sin validez."
                ],
                "pageBreak_1": true,
                "pageBreak_2": true,
                "pageBreak_3": true,
                "pageBreak_4": false,
                "pageBreak_5": false,
                "pageBreak_6": false,
                "pageBreak_7": false,
                "pageBreak_8": false,
                "pageBreak_9": false
            }
        case 6:
            return {
                representativeAs: "Representante Legal",
                requestorAddress: "Domicilio",
                buildingAddress: "Domicilio",
                occupationPercent: 0,
                surfacePerLote: 0,
                maximumHeight: 9,
                levels: 3,
                minimalFront: 0.00,
                frontalRestriction: 0.0,
                parkingLots: "Ej: 1 Cajón por lote",
                usePercent: 0,
                documents: [
                    "Ej: Solicitud de Licencia de Fraccionamiento.",
                    "Copia de Identificación oficial del C. Ismael Banderas Peñaloza, consistente en credencial de elector, con número de folio 1165026473873, expedida por Instituto Nacional Electoral.",
                    "Copia de Constancia de Situación Fiscal a nombre de Arrendadora Cesvin.",
                    "Copia de Licencias de Uso de Suelo No. IMDUyV/DLyCU/LUS/0011/2023, IMDUyV/DLyCU/LUS/0012/2023, IMDUyV/DLyCU/LUS/0013/2023, IMDUyV/DLyCU/LUS/0014/2023, IMDUyV/DLyCU/LUS/0015/2023, IMDUyV/DLyCU/LUS/0016/2023, IMDUyV/DLyCU/LUS/0017/2023, de fecha 04 de diciembre de 2023.",
                    "Copias de Certificados de existencia o inexistencia de Gravámenes.",
                    "Copias de los recibos de pago de impuesto predial a nombre de Arrendadora Cesvin S.A. de C.V, clave catastral 6908055000053, 690855000041, 6905055000017, 690855000044, 6905055000045, 6908055000046 y 6908055000070 correspondiente al ejercicio fiscal enero- diciembre 2023.",
                    "Reporte fotográfico.",
                    "Croquis de localización con coordenadas UTM.",
                    "4 juegos de planos para su autorización de proyecto de lotificación firmado por Arq. Yolanda Calva Silva Pérez, D.R. y C. 328",
                    "Copia de Acta constitutiva de Arrendadora Cesvin S.A. de C.V.",
                    "Copia de Poder Notarial Lic. Ismael Banderas Peñaloza",
                    "Copia de Factibilidad de servicios emitida por CAAMTH, No. 001-FACT-CAAMTH-2024 de fecha 06 de febrero de 2024.",
                    "Copia de Acuse de solicitud de Constancia de Viabilidad en la Secretaria de Infraestructura Pública y Desarrollo Urbano Sostenible, de fecha 06 de diciembre de 2023.",
                    "Copia de Acuse de solicitud de aprobación del Estudio de Vulnerabilidad y Riesgo, a Subsecretaria de Protección Civil, de fecha 17 de enero de 2024.",
                    "Copia de Constancia de Factibilidad de Transporte de Residuos Sólidos Urbanos y RME, de fecha 23 de febrero de 2024.",
                    "Copia de Aprobación de proyecto emitida por CFE, de fecha 10 de junio de 2019.",
                ],
                conditions: [
                    "Ej: En un plazo de 90 días naturales contados a partir de la firma de éste, presentará copia simple de la escritura de protocolización del Fraccionamiento denominado “ANDALUCÍA RESIDENCIAL, 3RA ETAPA, SECCIÓN MÁLAGA” debidamente inscrita en el Registro Público de la Propiedad y del Comercio. ",
                    "En un plazo de 90 días naturales presentará factibilidad del suministro de energía eléctrica emitida por la CFE (Comisión Federal de Electricidad), para el fraccionamiento denominado “ANDALUCÍA RESIDENCIAL, 3RA ETAPA, SECCIÓN MÁLAGA”.",
                    "En un plazo de 90 días naturales presentará factibilidad y proyectos ejecutivos aprobados por la Comisión de Agua y Alcantarillado del Municipio de Tizayuca, Hgo., (CAAMTH), para el fraccionamiento denominado “ANDALUCÍA RESIDENCIAL, 3RA ETAPA, SECCIÓN MÁLAGA”. ",
                    "Presentar convenio con la Secretaria de Obras Publicas del Municipio de Tizayuca, Hidalgo, del mantenimiento de la infraestructura vial, en un radio de 500.00 m. del fraccionamiento, como lo indica en las obligaciones del fraccionador en un plazo no mayor a 30 días naturales.",
                    "Deberá cumplir con las condicionantes establecidas por la Comisión de Agua y Alcantarillado del Municipio de Tizayuca (CAAMTH), la Secretaria de Obras Públicas municipales y la Secretaria General Municipal, debiendo cumplir mediante convenio en un periodo establecido por estas instancias; así como determinadas por las entidades estatales correspondientes.",
                    "Deberá presentar Dictamen del Estudio de Impacto Urbano y Vial emitido por la Secretaria de Infraestructura Pública y Desarrollo Urbano Sostenible, de Gobierno del Estado de Hidalgo, en un plazo no mayor a 60 días naturales.",
                    "Deberá presentar Resolución del Estudio de Impacto Ambiental, emitido por la Secretaria de Medio Ambiente y Recursos Naturales del Estado de Hidalgo, en un plazo no mayor a 60 días naturales.",
                    "Deberá presentar Constancia de Viabilidad emitida por la Secretaria de Infraestructura Pública y Desarrollo Urbano Sostenible, de Gobierno del Estado de Hidalgo, en un plazo no mayor a 60 días naturales.",
                    "Deberá presentar proyecto de red de agua potable y calculo hidráulico validado por la dependencia correspondiente, en un plazo no mayor a 30 días naturales.",
                    "Deberá presentar proyecto de red de drenaje y calculo sanitario, validado por dependencia correspondiste, en un plazo no mayor a 30 días naturales.",
                    "Deberá presentar proyecto de drenaje pluvial y calculo hidráulico, validado por la dependencia correspondiente en un plazo no mayor a 30 días naturales.",
                    "Deberá presentar proyecto de red de energía eléctrica y calculo eléctrico, validado por la dependencia correspondiente, en un plazo no mayor a 30 días naturales.",
                    "Presentar calendario y presupuesto de obra de urbanización en un plazo no mayor a 30 dias naturales.",
                    "En consideración del impacto urbano y a la sobredemanda de los servicios públicos en el municipio, se deberán de generar las medidas adecuadas de prevención, integración y/o compensación, para disminuir o compensar los impactos o alteraciones causadas por la presente autorización. En razón de lo anterior el fraccionador deberá mediante convenio retribuir al Instituto Municipal de Desarrollo Urbano y Vivienda, el 30% del monto de la presente autorización. Dicho convenio se deberá de formalizarse en un plazo de hasta 90 días hábiles contados a partir de la firma de éste.",
                    "En caso de incumplimiento a cualquiera de las prerrogativas descritas con antelación se hará acreedor a las sanciones establecidas en el artículo 196 fracción V en relación con el Artículo 193 fracción XIII, ambos de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial del Estado de Hidalgo.",
                    "En caso de incumplimiento a lo antes citado, este documento quedará sin validez."
                ],
                urbanCUS: "Ej: IMDUyV/DLyCU/CUS/0011/2023, IMDUyV/DLyCU/CUS/0012/2023, IMDUyV/DLyCU/CUS/0013/2023, IMDUyV/DLyCU/CUS/0014/2023, IMDUyV/DLyCU/CUS/0015/2023, IMDUyV/DLyCU/CUS/0016/2023, IMDUyV/DLyCU/CUS/0017/2023",
                urbanLUS: "Ej: IMDUyV/DLyCU/LUS/0011/2023, IMDUyV/DLyCU/LUS/0012/2023, IMDUyV/DLyCU/LUS/0013/2023, IMDUyV/DLyCU/LUS/0014/2023, IMDUyV/DLyCU/LUS/0015/2023, IMDUyV/DLyCU/LUS/0016/2023, IMDUyV/DLyCU/LUS/0017/2023",
                location: ["Ej: Parcela 775", "777", "778", "786", "790", "791", "LOTE 1 (PARCELA 925)"],
                habitacionalLotes: "Ej: 3 lotes habitacionales",
                totalManzanas: "Ej: 37 manzanas",
                totalSurface: "Ej: 14,335.98 m²",
                "pageBreak_1": true,
                "pageBreak_2": true,
                "pageBreak_3": true,
                "pageBreak_4": false,
                "pageBreak_5": false,
                "pageBreak_6": false,
                "pageBreak_7": false,
                "pageBreak_8": false,
                "pageBreak_9": false
            }
        case 7:
            return {
                representativeAs: "Representante Legal",
                requestorAddress: "Domicilio",
                buildingAddress: "Domicilio",
                lotes: ["Ej: Lote 1", "Lote 2", "Lote 3", "Lote 4"],
                location: [" Ej:  un costado del fraccionamiento Haciendas de Tizayuca, en el municipio de Tizayuca"],
                documents: [
                    "Ej: Solicitud por escrito de Autorización de Régimen de Propiedad de Condómino.",
                    "Copia de Identificación oficial del C. Elías Guarneros Ramírez, consistente en credencial de elector, con número de folio 1130008658056, expedida por Instituto Nacional Electoral.",
                    "Croquis de localización.",
                    "4 planos para su autorización.",
                    "Copia Relotificación de Fraccionamiento No. IMDUYV/DPT/RF/001/2023, de fecha 10 de octubre de 2023.",
                    "Copia de Segundo Testimonio de Relotificación del Fraccionamiento denominado “los Héroes Tizayuca”, escritura No. 43,226, de fecha 30 de octubre de 2023.",
                    "Copia de Convenio de servicios de agua potable con la CAAMTH.",
                    "Copia de Recibo de pago de impuesto predial, periodo enero – diciembre 2023, con clave catastral 690500010000100001, del predio ubicado en Los Héroes Tizayuca del Municipio Tizayuca a nombre de Desarrollos Inmobiliarios SADASI S.A. de C.V.",
                    "Memoria descriptiva",
                    "Dos juegos de Reglamento General del Condominio.",
                    "Reporte fotográfico.",
                    "Copia de Acta constitutiva de “Desarrollos inmobiliarios SADASI S.A. DE C.V.”",
                    "Copia de Poder notarial otorgado a favor del C. Elías Guarneros Ramírez por “Desarrollos Inmobiliarios SADASI S.A. de C.V.”",
                    "Copia de cédula de identificación fiscal, RFC.",
                ],
                totalRelotification: "Ej: 47 lotes",
                resultRelotification: ["Ej: Manzana 217", "LOTES 1 A 13", "13-A", "13-B", "15 A 44", "62", "65"],
                previousInvoice: "Ej: IMDUyV/DPT/RLF/08/2021",
                previousInvoiceDate: "Ej: 2024-12-07",
                conditions: [
                    "Ej: En un plazo de 90 días naturales contados a partir de la firma de éste, presentará copia simple de la escritura de protocolización del Fraccionamiento denominado “ANDALUCÍA RESIDENCIAL, 3RA ETAPA, SECCIÓN MÁLAGA” debidamente inscrita en el Registro Público de la Propiedad y del Comercio. ",
                    "En un plazo de 90 días naturales presentará factibilidad del suministro de energía eléctrica emitida por la CFE (Comisión Federal de Electricidad), para el fraccionamiento denominado “ANDALUCÍA RESIDENCIAL, 3RA ETAPA, SECCIÓN MÁLAGA”.",
                    "En un plazo de 90 días naturales presentará factibilidad y proyectos ejecutivos aprobados por la Comisión de Agua y Alcantarillado del Municipio de Tizayuca, Hgo., (CAAMTH), para el fraccionamiento denominado “ANDALUCÍA RESIDENCIAL, 3RA ETAPA, SECCIÓN MÁLAGA”. ",
                    "Presentar convenio con la Secretaria de Obras Publicas del Municipio de Tizayuca, Hidalgo, del mantenimiento de la infraestructura vial, en un radio de 500.00 m. del fraccionamiento, como lo indica en las obligaciones del fraccionador en un plazo no mayor a 30 días naturales.",
                    "Deberá cumplir con las condicionantes establecidas por la Comisión de Agua y Alcantarillado del Municipio de Tizayuca (CAAMTH), la Secretaria de Obras Públicas municipales y la Secretaria General Municipal, debiendo cumplir mediante convenio en un periodo establecido por estas instancias; así como determinadas por las entidades estatales correspondientes.",
                    "Deberá presentar Dictamen del Estudio de Impacto Urbano y Vial emitido por la Secretaria de Infraestructura Pública y Desarrollo Urbano Sostenible, de Gobierno del Estado de Hidalgo, en un plazo no mayor a 60 días naturales.",
                    "Deberá presentar Resolución del Estudio de Impacto Ambiental, emitido por la Secretaria de Medio Ambiente y Recursos Naturales del Estado de Hidalgo, en un plazo no mayor a 60 días naturales.",
                    "Deberá presentar Constancia de Viabilidad emitida por la Secretaria de Infraestructura Pública y Desarrollo Urbano Sostenible, de Gobierno del Estado de Hidalgo, en un plazo no mayor a 60 días naturales.",
                    "Deberá presentar proyecto de red de agua potable y calculo hidráulico validado por la dependencia correspondiente, en un plazo no mayor a 30 días naturales.",
                    "Deberá presentar proyecto de red de drenaje y calculo sanitario, validado por dependencia correspondiste, en un plazo no mayor a 30 días naturales.",
                    "Deberá presentar proyecto de drenaje pluvial y calculo hidráulico, validado por la dependencia correspondiente en un plazo no mayor a 30 días naturales.",
                    "Deberá presentar proyecto de red de energía eléctrica y calculo eléctrico, validado por la dependencia correspondiente, en un plazo no mayor a 30 días naturales.",
                    "Presentar calendario y presupuesto de obra de urbanización en un plazo no mayor a 30 dias naturales.",
                    "En consideración del impacto urbano y a la sobredemanda de los servicios públicos en el municipio, se deberán de generar las medidas adecuadas de prevención, integración y/o compensación, para disminuir o compensar los impactos o alteraciones causadas por la presente autorización. En razón de lo anterior el fraccionador deberá mediante convenio retribuir al Instituto Municipal de Desarrollo Urbano y Vivienda, el 30% del monto de la presente autorización. Dicho convenio se deberá de formalizarse en un plazo de hasta 90 días hábiles contados a partir de la firma de éste.",
                    "En caso de incumplimiento a cualquiera de las prerrogativas descritas con antelación se hará acreedor a las sanciones establecidas en el artículo 196 fracción V en relación con el Artículo 193 fracción XIII, ambos de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial del Estado de Hidalgo.",
                    "En caso de incumplimiento a lo antes citado, este documento quedará sin validez."
                ],
                detailedUse: "Ej: Habitacional de Interés Social, Económico Condominal Horizontal, Condominal Vertical y Comercial.",
                "pageBreak_1": true,
                "pageBreak_2": true,
                "pageBreak_3": false,
                "pageBreak_4": false,
                "pageBreak_5": false,
                "pageBreak_6": false,
                "pageBreak_7": false,
                "pageBreak_8": false
            }
        case 8:
            return {
                representativeAs: "Representante Legal",
                requestorAddress: "Domicilio",
                buildingAddress: "Domicilio",
                households: "Ej: 5 viviendas",
                documents: [
                    "Ej: Solicitud por escrito de Autorización de Régimen de Propiedad de Condómino.",
                    "Copia de Identificación oficial del C. Elías Guarneros Ramírez, consistente en credencial de elector, con número de folio 1130008658056, expedida por Instituto Nacional Electoral.",
                    "Croquis de localización.",
                    "4 planos para su autorización.",
                    "Copia Relotificación de Fraccionamiento No. IMDUYV/DPT/RF/001/2023, de fecha 10 de octubre de 2023.",
                    "Copia de Segundo Testimonio de Relotificación del Fraccionamiento denominado “los Héroes Tizayuca”, escritura No. 43,226, de fecha 30 de octubre de 2023.",
                    "Copia de Convenio de servicios de agua potable con la CAAMTH.",
                    "Copia de Recibo de pago de impuesto predial, periodo enero – diciembre 2023, con clave catastral 690500010000100001, del predio ubicado en Los Héroes Tizayuca del Municipio Tizayuca a nombre de Desarrollos Inmobiliarios SADASI S.A. de C.V.",
                    "Memoria descriptiva",
                    "Dos juegos de Reglamento General del Condominio.",
                    "Reporte fotográfico.",
                    "Copia de Acta constitutiva de “Desarrollos inmobiliarios SADASI S.A. DE C.V.”",
                    "Copia de Poder notarial otorgado a favor del C. Elías Guarneros Ramírez por “Desarrollos Inmobiliarios SADASI S.A. de C.V.”",
                    "Copia de cédula de identificación fiscal, RFC.",
                ],
                lotes: ["Ej: Lote 1", "Lote 2", "Lote 3", "Lote 4"],
                manzanas: ["Ej: Manzana 1", "Manzana 2"],
                conditions: [
                    "Ej: Copia simple de la escritura de protocolización de la constitución de Régimen de Propiedad en Condominio debidamente inscrita en el Registro Público de la Propiedad y del Comercio, en un plazo no mayor a 90 días hábiles, a partir de la firma de este.",
                    "Presentar copia de comprobante de pago de impuesto predial correspondiente al periodo enero - diciembre 2024, en un plazo no mayor a 30 días naturales.",
                    "En consideración del impacto urbano y a la sobredemanda de los servicios públicos en el municipio, se deberán de generar las medidas adecuadas de prevención, integración y/o compensación, para mitigar o contrarrestar los impactos o alteraciones causadas por la presente autorización. En razón de lo anterior deberá mediante convenio retribuir por medio del Instituto Municipal de Desarrollo Urbano y Vivienda, hasta el 30% del monto de la presente autorización.  Dicho convenio se deberá de formalizarse en un plazo de hasta 30 días hábiles contados a partir de la firma de éste."
                ],
                privateSurface: 0.0,
                commonSurface: 0.0,
                "pageBreak_1": false,
                "pageBreak_2": true,
                "pageBreak_3": true,
                "pageBreak_4": false,
                "pageBreak_5": false,
                "pageBreak_6": false,
                "pageBreak_7": false,
                "pageBreak_8": false,
                "pageBreak_9": false,
                "pageBreak_10": true,
            }
        case 9:
            return {
                PCU: "PCU",
                representativeAs: "Representante Legal",
                buildingAddress: "Domicilio",
                occupationPercent: 0,
                surfacePerLote: 0,
                maximumHeight: 9,
                levels: 3,
                minimalFront: 0,
                frontalRestriction: 0,
                parkingLots: "Ej: 1 Cajón por lote",
                usePercent: 0,
                conditions: [
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
            }
    }
}

export async function saveZoneImage(file, fullInvoice) {
    const EXT = file[0].originalname.split('.').pop();
    const folderPath = path.join(__dirstorage, 'assets', 'urban', fullInvoice);
    const destination = path.join(folderPath, `zone.${EXT}`);
    const pattern = /^zone\.[^\\/]+$/;

    try {
        await ensureDirectoryExists(folderPath);

        const files = await fs.readdir(folderPath);
        const matchedFiles = files.filter(name => pattern.test(name));

        await Promise.all(
            matchedFiles.map(filename =>
                fs.unlink(path.join(folderPath, filename))
            )
        );

        await fs.writeFile(destination, file[0].buffer);

        return true;
    } catch (error) {
        console.error('Error saving zone image:', error);
        return false;
    }
}

export async function saveLicenseCharts(files, fullInvoice) {
    try {
        const directory = path.join(__dirstorage, 'assets', 'urban', fullInvoice);

        await ensureDirectoryExists(directory)

        const EXISTING_FILES = await fs.readdir(directory);

        for (const FILE of EXISTING_FILES) {
            if (FILE.startsWith('tabla_s')) {
                await fs.unlink(path.join(directory, FILE));
            }
        }

        for (const FILE of files) {
            if (FILE.originalname.startsWith('tabla_s')) {
                const destination = path.join(directory, FILE.originalname);
                await fs.writeFile(destination, FILE.buffer);
            }
        }

        return true;
    } catch (error) {
        return false;
    }
}