import { __dirstorage } from "../../../paths.js";
import path from "path";

export const borderless = [false,false,false,false];

export const formLayout = {
    paddingLeft: function(i, node) { return 1; },
    paddingRight: function(i, node) { return 1; },
    paddingTop: function(i, node) { return 1; },
    paddingBottom: function(i, node) { return 1; },
    hLineWidth: function(i, node) { return 0.5; },
    vLineWidth: function(i, node) { return 0.5; },
    hLineColor: function(i, node) { return '#000'; },
    vLineColor: function(i, node) { return '#000'; }
}

export const containerLayout = {
    paddingLeft: function(i, node) { return 2; },
    paddingRight: function(i, node) { return 2; },
    paddingTop: function(i, node) { return 2; },
    paddingBottom: function(i, node) { return 2; },
    hLineWidth: function(i, node) { return 0.5; },
    vLineWidth: function(i, node) { return 0.5; },
    hLineColor: function(i, node) { return '#000'; },
    vLineColor: function(i, node) { return '#000'; }
}

export const noBorderNoPadding = {
    paddingLeft: function(i, node) { return 0; },
    paddingRight: function(i, node) { return 0; },
    paddingTop: function(i, node) { return 0; },
    paddingBottom: function(i, node) { return 0; },
    hLineWidth: function(i, node) { return 0; },
    vLineWidth: function(i, node) { return 0; },
    hLineColor: function(i, node) { return '#000'; },
    vLineColor: function(i, node) { return '#000'; }
}

export const NoPadding = {
    paddingLeft: function(i, node) { return 0; },
    paddingRight: function(i, node) { return 0; },
    paddingTop: function(i, node) { return 0; },
    paddingBottom: function(i, node) { return 0; },
    hLineWidth: function(i, node) { return 0.5; },
    vLineWidth: function(i, node) { return 0.5; },
    hLineColor: function(i, node) { return '#000'; },
    vLineColor: function(i, node) { return '#000'; }
}

export const subTable = {
    paddingLeft: function(i, node) { return 0; },
    paddingRight: function(i, node) { return 0; },
    paddingTop: function(i, node) { return 0; },
    paddingBottom: function(i, node) { return 0; },
    hLineWidth: function(i, node) { return 0.5; },
    vLineWidth: function(i, node) { return 0.5; },
    hLineColor: function(i, node) { return '#757575'; },
    vLineColor: function(i, node) { return '#757575'; }
}

export const cellLayout = {
    paddingLeft: function(i, node) { return 2; },
    paddingRight: function(i, node) { return 2; },
    paddingTop: function(i, node) { return 1; },
    paddingBottom: function(i, node) { return 1; },
    hLineWidth: function(i, node) { return 0.5; },
    vLineWidth: function(i, node) { return 0.5; },
    hLineColor: function(i, node) { return '#000'; },
    vLineColor: function(i, node) { return '#000'; }
}

export const docStyles = {
    headT: {
        color: 'white',
        fillColor: '#920000',
        fontSize: 7,
        bold: true,
        alignment: 'center',
    },
    headTB: {
        color: 'white',
        fillColor: '#757575',
        fontSize: 7,
        bold: true,
        alignment: 'center',
    },
    labelT: {
        fontSize: 7,
        bold: true
    },
    labelTC: {
        fontSize: 7,
        bold: true,
        alignment: 'center'
    },
    boldCenter: {
        bold: true,
        alignment: 'center'
    },
    center: {
        alignment: 'center'
    },
    formRow: {
        margin: [0,0,0,5]
    },
    regular: {
        fontSize: 7
    },
    regularSmall: {
        fontSize: 5
    },
    headST: {
        color: '#fff',
        fillColor: '#757575',
        fontSize: 5,
        alignment: 'center',
    }
}

export function field(text, borders, span, style, fontSize) {
    return {
        colSpan: span,
        border: borders,
        table: {widths: ['*'],body: [[{text: text, fontSize: fontSize, style: style}]]},layout: cellLayout
    }
}

export function voidCell(span) {
    return {colSpan: span,border: borderless, text: ''}
}

export function loadResumeAreas(total, fullInvoice) {
    let images = [];

    for (let index = 1; index <= total; index++) {
        images.push({
            image: path.join(__dirstorage, 'assets', 'urban', fullInvoice.replaceAll('/','_'),`area_${index}.png`),
            width: 550,
            alignment: 'center',
            margin: [0,0,0,5]
        });
    }
    images.push({
        text: [
            {text: 'Nota: ', style: 'regular', bold: true},
            {text: 'La información descrita corresponde y es responsabilidad del solicitante.', style: 'regular'}
        ]
    });
    return images;
}

export function loadResumeLotes(total, fullInvoice) {
    let images = [];

    for (let index = 1; index <= total; index++) {
        images.push({
            image: path.join(__dirstorage, 'assets', 'urban', fullInvoice.replaceAll('/','_'),`lote_${index}.png`),
            width: 550,
            alignment: 'center',
            margin: [0,0,0,5]
        });
    }
    images.push({
        text: [
            {text: 'Nota: ', style: 'regular', bold: true},
            {text: 'La información descrita corresponde y es responsabilidad del solicitante.', style: 'regular'}
        ]
    });
    return images;
}

export function prepareData(lcDBObj) {
    lcDBObj.fullInvoice = lcDBObj.fullInvoice.replaceAll('_','/');

    for (const key in lcDBObj) {
        if(typeof lcDBObj[key] == 'string')
            lcDBObj[key] = lcDBObj[key].toUpperCase();
    }

    lcDBObj.term.licenseTerm = lcDBObj.term.licenseTerm.toUpperCase();
    lcDBObj.validity.licenseValidity = lcDBObj.validity.licenseValidity.toUpperCase();
    lcDBObj.expeditionType.licenseExpType = lcDBObj.expeditionType.licenseExpType.toUpperCase();

    lcDBObj.requestDate = lcDBObj.requestDate.split('-').reverse().join('-');
    lcDBObj.expeditionDate = lcDBObj.expeditionDate.split('-').reverse().join('-');
    lcDBObj.expirationDate = lcDBObj.expeditionDate.split('-').reverse().join('-');

    return lcDBObj;
}

export function dateFormatFull(dateNumeric) {
    let months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril", 
        "Mayo", 
        "Junio", 
        "Julio", 
        "Agosto", 
        "Septiembre", 
        "Octubre", 
        "Noviembre", 
        "Diciembre"];
    var date = dateNumeric.split('-');
    return `${date[0]} de ${months[parseInt(date[1])-1]} del ${date[2]}`;
}

export function arrayToText(array) {
    let newArray = Array.from(array);
    if (newArray.length === 0 || !newArray) return '';
    if (newArray.length === 1) return newArray[0];

    const lastItem = newArray.pop();
    return `${newArray.join(', ')} y ${lastItem}`;
}

export function signaturePresident(status) {
    if(status) {
        return {
            image: path.join(__dirstorage, 'official', 'firmaB.png'),
            fit: ['*',70],
            alignment: 'center',
            margin: [0,10,0,0]
        }
    }
    return {
        image: path.join(__dirstorage, 'official', 'firma_blank.png'),
        fit: ['*',70],
        alignment: 'center',
        margin: [0,10,0,0]
    }
}

export function signatureDirector(status) {
    if(status) {
        return {
            image: path.join(__dirstorage, 'official', 'firma.png'),
            fit: ['*',70],
            alignment: 'center',
            margin: [0,10,0,0]
        }
    }
    return {
        image: path.join(__dirstorage, 'official', 'firma_blank.png'),
        fit: ['*',70],
        alignment: 'center',
        margin: [0,10,0,0]
    }
}

export function signatureSeal(status) {
    if(status) {
        return {
            image: path.join(__dirstorage, 'official', 'sello.png'),
            fit: ['*',70],
            alignment: 'center',
            margin: [0,10,0,0]
        }
    }
    return {
        image: path.join(__dirstorage, 'official', 'sello_blank.png'),
        fit: ['*',70],
        alignment: 'center',
        margin: [0,10,0,0]
    }
}

export function generateDSMCTable(situationArray, subject) {

    let body = [
        [
            {
                text: subject,
                colSpan: 4,
                style: 'headST',
                border: borderless
            },{},{},{}
        ],
        [
            {text: 'DESCRIPCIÓN', style: ['boldCenter', 'regularSmall']},
            {text: 'SUPERFICIE', style: ['boldCenter', 'regularSmall']},
            {text: 'MEDIDAS', style: ['boldCenter', 'regularSmall']},
            {text: 'COLINDANCIAS', style: ['boldCenter', 'regularSmall']}
        ]
    ]

    for(let i of situationArray) {
        let arr = [
            {text: i.description, style: ['boldCenter', 'regularSmall'], margin:[0,3,0,0]},
            {text: i.surface, style: ['boldCenter', 'regularSmall'], margin:[0,3,0,0]},
            {
                colSpan: 2,
                table: {
                    widths: ['*','*'],
                    body: generateSubTable(i.table)
                },
                layout: subTable
            },
            {}
    ]

        body.push(arr)
    }

    return body;
}

function generateSubTable(tableObj) {
    let subBody = []

    for (let i = 0; i < tableObj.distribution.length; i++) {
        let row;
        if (i == 0) {
            row = [
                {text: `AL ${tableObj.distribution[i]}: ${tableObj.measures[i]}`, style: 'regularSmall', border: [false, false, true, true], margin:[2,0,0,0]},
                {text: `COLINDA CON ${tableObj.adjoining[i]}`, style: 'regularSmall', border: [true, false, false, true], margin:[2,0,0,0]}
            ]
        } else if (i == tableObj.distribution.length - 1) {
            row = [
                {text: `AL ${tableObj.distribution[i]}: ${tableObj.measures[i]}`, style: 'regularSmall', border: [false, true, true, false], margin:[2,0,0,0]},
                {text: `COLINDA CON ${tableObj.adjoining[i]}`, style: 'regularSmall', border: [true, true, false, false], margin:[2,0,0,0]}
            ]
        } else {
            row = [
                {text: `AL ${tableObj.distribution[i]}: ${tableObj.measures[i]}`, style: 'regularSmall', border: [false, true, true, true], margin:[2,0,0,0]},
                {text: `COLINDA CON ${tableObj.adjoining[i]}`, style: 'regularSmall', border: [true, true, false, true], margin:[2,0,0,0]}
            ]
        }
        subBody.push(row);
    }

    return subBody
}

export const recordExample = {
    "id": 4,
    "fullInvoice": "IMDUyV_DLyCU_CRPC_001_2024",
    "invoice": 1,
    "licenseType": 1,
    "year": 2024,
    "requestorName": "alberto enrique santana sanchez",
    "attentionName": "juan enrique santana navarrete",
    "legalRepresentative": "juan enrique santana navarrete",
    "requestDate": "2024-05-21",
    "address": "camino interparcelario parcela 854 z-4 p1/3",
    "number": "S/N",
    "colony": "olmos",
    "surfaceTotal": "200 m2",
    "catastralKey": '1234567890123, 1234567890123, 1234567890123, 1234567890123',
    "licenseTerm": 1,
    "geoReference": "somegeo, anothergeo",
    "licenseZone": 1,
    "authorizedUse": 1,
    "businessLinePrint": "print business line",
    "businessLineIntern": "some businessline",
    "expeditionDate": "2024-09-22",
    "licenseValidity": 1,
    "paymentInvoice": "1445",
    "expirationDate": "2024-05-23",
    "licenseExpeditionType": 1,
    "contactPhone": 7791042842,
    "cost": 1,
    "discount": 0,
    "paymentDone": 1,
    "inspector": "eduardo alejandro cordoba vazquez",
    "licenseSpecialData": {
        "occupationPercent":"70",
        "surfacePerLote":"90",
        "maximumHeight":"9 metros o 3 niveles",
        "minimalFront":"6.00",
        "frontalRestriction":"2.5",
        "parkingLots":"1 Cajón por lote",
        "usePercent":"100",
        "PCU": "U3",
        "requestorAddress": "ARQUIMEDES 3 302, CHAPULTEPEC MORALES, DISTRITO FEDERAL, CP 11570",
        "buildingAddress":"BOULEVARD MIGUEL HIDALGO Y COSTILLA, MANZANA 218, LOTE 37 Y 38, FRACCIONAMIENTO LOS HÉROES TIZAYUCA",
        "privateSurface": "617.35 m²",
        "commonSurface": "227.35 m²",
        "restrictions": "La presente no autoriza acciones urbanas que generen impacto social en su entorno inmediato conforme a lo establecido en el artículo 139 de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial del Estado de Hidalgo y al artículo 61 del Reglamento de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial del Estado de Hidalgo debiendo ser compatibles o permitidos los giros de acuerdo a la matriz de compatibilidad del Programa Municipal de Desarrollo Urbano y Ordenamiento Territorial del Municipio de Tizayuca, Estado de Hidalgo.\nAcatar la normativa y restricciones de la zonificación secundaria que determina el documento técnico del Programa Municipal de Desarrollo Urbano y Ordenamiento Territorial de Tizayuca. Los predios que tengan como frente un corredor urbano, podrán adoptar las características propias del corredor, siempre y cuando su acceso sea por el corredor. Deberá tramitar en su caso, la licencia de construcción en la Secretaría de Obras Públicas, así como la licencia de funcionamiento en la Dirección de Reglamentos, Espectáculos y Panteones, pertenecientes al Municipio de Tizayuca, Hidalgo. Dar cumplimiento a lo dispuesto en los artículos 80 y 81 de la Ley de Protección Civil del Estado de Hidalgo. El Instituto Municipal de Desarrollo Urbano y Vivienda se reserva el derecho de revocar la presente, en caso de incumplimiento a cualquiera de las condiciones establecidas en la misma.",
        "conditions": [
            "Copia simple de la escritura de protocolización de la constitución de Régimen de Propiedad en Condominio debidamente inscrita en el Registro Público de la Propiedad y del Comercio, en un plazo no mayor a 90 días hábiles, a partir de la firma de este.",
            "Presentar copia de comprobante de pago de impuesto predial correspondiente al periodo enero - diciembre 2024, en un plazo no mayor a 30 días naturales.",
            "En consideración del impacto urbano y a la sobredemanda de los servicios públicos en el municipio, se deberán de generar las medidas adecuadas de prevención, integración y/o compensación, para mitigar o contrarrestar los impactos o alteraciones causadas por la presente autorización. En razón de lo anterior deberá mediante convenio retribuir por medio del Instituto Municipal de Desarrollo Urbano y Vivienda, hasta el 30% del monto de la presente autorización.  Dicho convenio se deberá de formalizarse en un plazo de hasta 30 días hábiles contados a partir de la firma de éste."
        ],
        "anexo":"some anexo",
        "parcela": "742, Z-3, P1/4",
        "propertyNo": "100001002885",
        "propertyDate": "2018-04-12",
        "authorizationResume": "SE AUTORIZA LA FUSIÓN DE LOS PREDIOS IDENTIFICADOS COMO LAS PARCELAS 777, 775, 778, 786, 790, 791 Y LOTE 1 (PARCELA 924), RESULTANDO LA FUSIÓN CON UNA SUPERFICIE TOTAL DE: 161,100.70 M2.",
        "households": "5 viviendas",
        "areasR":"2",
        "lotesR":"3",
        "documents": [
            'Solicitud por escrito de Autorización de Régimen de Propiedad de Condómino.',
            'Copia de Identificación oficial del C. Elías Guarneros Ramírez, consistente en credencial de elector, con número de folio 1130008658056, expedida por Instituto Nacional Electoral.',
            'Croquis de localización.',
            '4 planos para su autorización.',
            'Copia Relotificación de Fraccionamiento No. IMDUYV/DPT/RF/001/2023, de fecha 10 de octubre de 2023.',
            'Copia de Segundo Testimonio de Relotificación del Fraccionamiento denominado “los Héroes Tizayuca”, escritura No. 43,226, de fecha 30 de octubre de 2023.',
            'Copia de Convenio de servicios de agua potable con la CAAMTH.',
            'Copia de Recibo de pago de impuesto predial, periodo enero – diciembre 2023, con clave catastral 690500010000100001, del predio ubicado en Los Héroes Tizayuca del Municipio Tizayuca a nombre de Desarrollos Inmobiliarios SADASI S.A. de C.V.',
            'Memoria descriptiva',
            'Dos juegos de Reglamento General del Condominio.',
            'Reporte fotográfico.',
            'Copia de Acta constitutiva de “Desarrollos inmobiliarios SADASI S.A. DE C.V.”',
            'Copia de Poder notarial otorgado a favor del C. Elías Guarneros Ramírez por “Desarrollos Inmobiliarios SADASI S.A. de C.V.”',
            'Copia de cédula de identificación fiscal, RFC.',
        ],
        "lotes": ["Lote 1", "Lote 2","Lote 3","Lote 4"],
        "manzanas": ["Manzana 222"],
        "actualSituation": [
            {
                "description": "PARCELA 777",
                "surface": "31,091.07",
                "table": {
                    "distribution": ["Oeste","Noroeste","Norte", "Noreste", "Este", "Sureste","Sur", "Suroeste"],
                    "measures": ["15.00 m","15.00 m","15.00 m", "15.00 m", "15.00 m", "15.00 m","15.00 m", "15.00 m"],
                    "adjoining": ["LOTE 8","LOTE 6","LOTE 50", "CALLE PORVENIR", "LOTE 8", "LOTE 6","LOTE 50", "CALLE PORVENIR"]
                }
            },
            {
                "description": "PARCELA 777",
                "surface": "31,091.07",
                "table": {
                    "distribution": ["Oeste","Noroeste","Norte", "Noreste", "Este", "Sureste","Sur", "Suroeste"],
                    "measures": ["Oeste","Noroeste","Norte", "Noreste", "Este", "Sureste","Sur", "Suroeste"],
                    "adjoining": ["Oeste","Noroeste","Norte", "Noreste", "Este", "Sureste","Sur", "Suroeste"]
                }
            }
        ],
        "actualAuthorizedFS": [
            {
                "description": "PARCELA 777",
                "surface": "31,091.07",
                "table": {
                    "distribution": ["Oeste","Noroeste","Norte", "Noreste", "Este", "Sureste","Sur", "Suroeste"],
                    "measures": ["Oeste","Noroeste","Norte", "Noreste", "Este", "Sureste","Sur", "Suroeste"],
                    "adjoining": ["Oeste","Noroeste","Norte", "Noreste", "Este", "Sureste","Sur", "Suroeste"]
                }
            }
        ]
    },
    "approvalStatus": true,
	"active": true,
    "createdAt": "2024-05-22T15:44:17.000Z",
    "updatedAt": "2024-05-22T15:44:17.000Z",
    "type": {
        "licenseType": "C"
    },
    "term": {
        "licenseTerm": "mediano"
    },
    "zone": {
        "licenseZone": "Densidad alta (multifamiliar dúplex, tríplex y cuádruplex)",
        "licenseKey": "CUMM"
    },
    "authUse": {
        "licenseAuthUse": "Manufactura de sustancias químicas, productos derivados del petróleo y carbón"
    },
    "validity": {
        "licenseValidity": "doce meses"
    },
    "expeditionType": {
        "licenseExpType": "nueva"
    }
}

export function generateUrbanSpecialData(type) {
    switch(type) {
        case 1:
            return { PCU: "PCU" }
        case 2:
            return {
                requestorAddress: "Domicilio",
                buildingAddress: "Domicilio",
                occupationPercent: 0,
                surfacePerLote: 0,
                maximumHeight: "Ej: 9 metros o 3 niveles",
                minimalFront: 0.00,
                frontalRestriction: 0.0,
                parkingLots: "Ej: 1 Cajón por lote",
                usePercent: 0
            }
        case 3:
            return {
                requestorAddress: "Domicilio",
                buildingAddress: "Domicilio",
                actualSituation: [
                    {
                        "description": "PARCELA 777",
                        "surface": "31,091.07",
                        "table": {
                            "distribution": ["Oeste","Noroeste","Norte", "Noreste", "Este", "Sureste","Sur", "Suroeste"],
                            "measures": ["15.00 m","15.00 m","15.00 m", "15.00 m", "15.00 m", "15.00 m","15.00 m", "15.00 m"],
                            "adjoining": ["LOTE 8","LOTE 6","LOTE 50", "CALLE PORVENIR", "LOTE 8", "LOTE 6","LOTE 50", "CALLE PORVENIR"]
                        }
                    }
                ],
                actualAuthorizedFS: [
                    {
                        "description": "PARCELA 777",
                        "surface": "31,091.07",
                        "table": {
                            "distribution": ["Oeste","Noroeste","Norte", "Noreste", "Este", "Sureste","Sur", "Suroeste"],
                            "measures": ["15.00 m","15.00 m","15.00 m", "15.00 m", "15.00 m", "15.00 m","15.00 m", "15.00 m"],
                            "adjoining": ["LOTE 8","LOTE 6","LOTE 50", "CALLE PORVENIR", "LOTE 8", "LOTE 6","LOTE 50", "CALLE PORVENIR"]
                        }
                    },
                    {
                        "description": "PARCELA 777",
                        "surface": "31,091.07",
                        "table": {
                            "distribution": ["Oeste","Noroeste","Norte", "Noreste", "Este", "Sureste","Sur", "Suroeste"],
                            "measures": ["15.00 m","15.00 m","15.00 m", "15.00 m", "15.00 m", "15.00 m","15.00 m", "15.00 m"],
                            "adjoining": ["LOTE 8","LOTE 6","LOTE 50", "CALLE PORVENIR", "LOTE 8", "LOTE 6","LOTE 50", "CALLE PORVENIR"]
                        }
                    }
                ],
                authorizationResume: "Ej: SE AUTORIZA LA SUBDIVISIÓN DE LOS PREDIOS IDENTIFICADOS COMO LAS PARCELAS 777, 775, 778, 786, 790, 791 Y LOTE 1 (PARCELA 924), RESULTANDO LA FUSIÓN CON UNA SUPERFICIE TOTAL DE: 161,100.70 M2."
            }
        case 4:
            return {
                requestorAddress: "Domicilio",
                buildingAddress: "Domicilio",
                actualSituation: [
                    {
                        "description": "PARCELA 777",
                        "surface": "31,091.07",
                        "table": {
                            "distribution": ["Oeste","Noroeste","Norte", "Noreste", "Este", "Sureste","Sur", "Suroeste"],
                            "measures": ["15.00 m","15.00 m","15.00 m", "15.00 m", "15.00 m", "15.00 m","15.00 m", "15.00 m"],
                            "adjoining": ["LOTE 8","LOTE 6","LOTE 50", "CALLE PORVENIR", "LOTE 8", "LOTE 6","LOTE 50", "CALLE PORVENIR"]
                        }
                    },
                    {
                        "description": "PARCELA 777",
                        "surface": "31,091.07",
                        "table": {
                            "distribution": ["Oeste","Noroeste","Norte", "Noreste", "Este", "Sureste","Sur", "Suroeste"],
                            "measures": ["15.00 m","15.00 m","15.00 m", "15.00 m", "15.00 m", "15.00 m","15.00 m", "15.00 m"],
                            "adjoining": ["LOTE 8","LOTE 6","LOTE 50", "CALLE PORVENIR", "LOTE 8", "LOTE 6","LOTE 50", "CALLE PORVENIR"]
                        }
                    }
                ],
                actualAuthorizedFS: [
                    {
                        "description": "PARCELA 777",
                        "surface": "31,091.07",
                        "table": {
                            "distribution": ["Oeste","Noroeste","Norte", "Noreste", "Este", "Sureste","Sur", "Suroeste"],
                            "measures": ["15.00 m","15.00 m","15.00 m", "15.00 m", "15.00 m", "15.00 m","15.00 m", "15.00 m"],
                            "adjoining": ["LOTE 8","LOTE 6","LOTE 50", "CALLE PORVENIR", "LOTE 8", "LOTE 6","LOTE 50", "CALLE PORVENIR"]
                        }
                    }
                ],
                authorizationResume: "Ej: SE AUTORIZA LA FUSIÓN DE LOS PREDIOS IDENTIFICADOS COMO LAS PARCELAS 777, 775, 778, 786, 790, 791 Y LOTE 1 (PARCELA 924), RESULTANDO LA FUSIÓN CON UNA SUPERFICIE TOTAL DE: 161,100.70 M2."
            }
        case 5:
            return {}
        case 6:
            return {}
        case 7:
            return {}
        case 8:
            return {
                requestorAddress: "Domicilio",
                buildingAddress: "Domicilio",
                households: "Ej: 5 viviendas",
                areasR:"2",
                lotesR:"3",
                documents: [
                    "Solicitud por escrito de Autorización de Régimen de Propiedad de Condómino.",
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
                lotes: ["Lote 1", "Lote 2","Lote 3","Lote 4"],
                manzanas: ["Manzana 1", "Manzana 2"],
                conditions: [
                    "Copia simple de la escritura de protocolización de la constitución de Régimen de Propiedad en Condominio debidamente inscrita en el Registro Público de la Propiedad y del Comercio, en un plazo no mayor a 90 días hábiles, a partir de la firma de este.",
                    "Presentar copia de comprobante de pago de impuesto predial correspondiente al periodo enero - diciembre 2024, en un plazo no mayor a 30 días naturales.",
                    "En consideración del impacto urbano y a la sobredemanda de los servicios públicos en el municipio, se deberán de generar las medidas adecuadas de prevención, integración y/o compensación, para mitigar o contrarrestar los impactos o alteraciones causadas por la presente autorización. En razón de lo anterior deberá mediante convenio retribuir por medio del Instituto Municipal de Desarrollo Urbano y Vivienda, hasta el 30% del monto de la presente autorización.  Dicho convenio se deberá de formalizarse en un plazo de hasta 30 días hábiles contados a partir de la firma de éste."
                ],
                privateSurface: 0.0,
                commonSurface: 0.0
            }
        default:
            return { DATA:"NO\nDATA"}
    }
}