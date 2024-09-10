import { __dirstorage, __dirname } from "../../../paths.js";
import path from "path";
import fs from 'fs';

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
    justify: {
        alignment: 'justify'
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

export async function loadChart(fullInvoice, sourcePattern) {
    let images = [];
    const dir = path.join(__dirstorage, 'assets', 'urban', fullInvoice.replaceAll('/', '_'));
    const pattern = new RegExp(sourcePattern);

    return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, files) => {
            if (err) {
                return reject(err);
            }

            const matchedFiles = files.filter(file => pattern.test(file));

            for (let e of matchedFiles) {
                images.push({
                    image: path.join(__dirstorage, 'assets', 'urban', fullInvoice.replaceAll('/', '_'), `${e}`),
                    width: 550,
                    alignment: 'center',
                    margin: [0, 0, 0, 5]
                });
            }

            images.push({
                text: [
                    { text: 'Nota: ', style: 'regular', bold: true },
                    { text: 'La información descrita corresponde y es responsabilidad del solicitante.', style: 'regular' }
                ]
            });

            resolve(images);
        });
    });
}

export async function fileExist(location, group) {
    let fileDirectory = path.join(__dirstorage, 'assets', group, location.replaceAll('/', '_'), 'zone.png');
    
    const defaultPath = path.join(__dirname, 'public', 'img', '404.jpg');

    return new Promise((resolve, reject) => {
        fs.access(fileDirectory,(err) => {
            if (err) {
                return resolve(defaultPath);
            }

            return resolve(fileDirectory);
        });
    });
}

export function prepareData(lcDBObj) {
    lcDBObj.fullInvoice = lcDBObj.fullInvoice.replaceAll('_','/');

    for (const key in lcDBObj.dataValues) {
        if(typeof lcDBObj[key] == 'string') {
            lcDBObj[key] = lcDBObj[key].toUpperCase();
        }
    }

    if (lcDBObj.term) {
        lcDBObj.term.licenseTerm = lcDBObj.term.licenseTerm.toUpperCase();
    }

    if(lcDBObj.validity) {
        lcDBObj.validity.licenseValidity = lcDBObj.validity.licenseValidity.toUpperCase();
    }

    if(lcDBObj.expeditionType) {
        lcDBObj.expeditionType.licenseExpType = lcDBObj.expeditionType.licenseExpType.toUpperCase();
    }

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
    let date = dateNumeric.split('-');
    return `${date[2]} de ${months[parseInt(date[1])-1]} del ${date[0]}`;
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

export function madeBy(name) {
    let nameArr = name.split(' ');

    nameArr = nameArr.map(e => e.charAt(0) + '.');

    return nameArr.join('');
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
                    widths: [100,'*'],
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

export function generateLegalRepresentativeField(representative, representativeAs) {
    if (representative) {
        return [
            {text: `${representativeAs}: `, style: 'labelT', border: borderless},
            field(representative, borderless, null,'center', 7)
        ];
    }

    return [{text: '', border: borderless},{text: '', border: borderless}];
}

function generateSubTable(tableObj) {
    let subBody = []

    for (let i = 0; i < tableObj.distribution.length; i++) {
        let row;
        if (i == 0) {
            row = [
                {text: `${tableObj.distribution[i]} ${tableObj.measures[i]}`, style: 'regularSmall', border: [false, false, true, true], margin:[2,0,0,0]},
                {text: `${tableObj.adjoining[i]}`, style: 'regularSmall', border: [true, false, false, true], margin:[2,0,0,0]}
            ]
        } else if (i == tableObj.distribution.length - 1) {
            row = [
                {text: `${tableObj.distribution[i]} ${tableObj.measures[i]}`, style: 'regularSmall', border: [false, true, true, false], margin:[2,0,0,0]},
                {text: `${tableObj.adjoining[i]}`, style: 'regularSmall', border: [true, true, false, false], margin:[2,0,0,0]}
            ]
        } else {
            row = [
                {text: `${tableObj.distribution[i]} ${tableObj.measures[i]}`, style: 'regularSmall', border: [false, true, true, true], margin:[2,0,0,0]},
                {text: `${tableObj.adjoining[i]}`, style: 'regularSmall', border: [true, true, false, true], margin:[2,0,0,0]}
            ]
        }
        subBody.push(row);
    }

    return subBody
}

export function generateDistributionTable(lotes, manzanas) {
    let table = [
        [
            {text: "CUADRO DE DISTRIBUCIÓN POR MANZANAS", style: 'headT', border: borderless, colSpan: 2},{}
        ],
        [
            {text: "LOTE", style: 'labelTC'},
            {text: "MANZANA", style: 'labelTC'}
        ]
    ]

    for (let i = 0; i < lotes.length; i++) {
        table.push([
            {text: lotes[i], style: ['center', 'regular']},
            {text: manzanas[i], style: ['left', 'regular']}
        ]);
    }

    return table
}

export const recordExample = {
    "id": 4,
    "fullInvoice": "IMDUyV_DLyCU_CRPC_999_2024",
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
    "billInvoice": "1445",
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
            "En un plazo de 90 días naturales contados a partir de la firma de éste, presentará copia simple de la escritura de protocolización del Fraccionamiento denominado “ANDALUCÍA RESIDENCIAL, 3RA ETAPA, SECCIÓN MÁLAGA” debidamente inscrita en el Registro Público de la Propiedad y del Comercio. ",
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
        "anexo":"some anexo",
        "parcela": "742, Z-3, P1/4",
        "propertyNo": "100001002885",
        "propertyDate": "2018-04-12",
        "authorizationResume": "se autoriza la fusión de los predios identificados como las parcelas 777, 775, 778, 786, 790, 791 y lote 1 (parcela 924), resultando la fusión con una superficie total de: 161,100.70 m2. tu puta madre",
        "households": "5 viviendas",
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
        "lotes": ["Lote 1", "Lote 2","Lote 3", "Lote 4"],
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
        ],
        "urbanCUS": "IMDUyV/DLyCU/CUS/0011/2023, IMDUyV/DLyCU/CUS/0012/2023, IMDUyV/DLyCU/CUS/0013/2023, IMDUyV/DLyCU/CUS/0014/2023, IMDUyV/DLyCU/CUS/0015/2023, IMDUyV/DLyCU/CUS/0016/2023, IMDUyV/DLyCU/CUS/0017/2023",
        "urbanLUS": "IMDUyV/DLyCU/LUS/0011/2023, IMDUyV/DLyCU/LUS/0012/2023, IMDUyV/DLyCU/LUS/0013/2023, IMDUyV/DLyCU/LUS/0014/2023, IMDUyV/DLyCU/LUS/0015/2023, IMDUyV/DLyCU/LUS/0016/2023, IMDUyV/DLyCU/LUS/0017/2023",
        "location": ["un costado del fraccionamiento Haciendas de Tizayuca, en el municipio de Tizayuca"],
        "habitacionalLotes":"3 lotes habitacionales",
        "totalManzanas":"37 manzanas",
        "totalSurface":"14,335.98 m²",
        "authorizationFor" : "AUTORIZACIÓN DE PRÓRROGA DE LICENCIA DE FRACCIONAMIENTO",
        "integrity" : "98 lotes, divididos en 45 lotes habitacionales, 30 lotes habitacionales en condominio, 8 lotes comerciales, 4 lotes de áreas jardinadas, 2 lotes de área de donación, 4 lotes de infraestructura y 5 lotes de servidumbre de paso",
        "detailedUse" : "Habitacional de Interés Social, Económico Condominal Horizontal, Condominal Vertical y Comercial.",
        "totalRelotification": "47 lotes",
        "resultRelotification": ["Manzana 217", "LOTES 1 A 13", "13-A", "13-B", "15 A 44", "62", "65"],
        "previousInvoice":"IMDUyV/DPT/RLF/08/2021",
        "previousInvoiceDate":"2024-12-07",
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
                representativeAs: "Representante Legal",
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
                representativeAs: "Representante Legal",
                requestorAddress: "Domicilio",
                buildingAddress: "Domicilio",
                actualSituation: [
                    {
                        "description": "Fila 1",
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
                        "description": "Fila 1",
                        "surface": "31,091.07",
                        "table": {
                            "distribution": ["Oeste","Noroeste","Norte", "Noreste", "Este", "Sureste","Sur", "Suroeste"],
                            "measures": ["15.00 m","15.00 m","15.00 m", "15.00 m", "15.00 m", "15.00 m","15.00 m", "15.00 m"],
                            "adjoining": ["LOTE 8","LOTE 6","LOTE 50", "CALLE PORVENIR", "LOTE 8", "LOTE 6","LOTE 50", "CALLE PORVENIR"]
                        }
                    },
                    {
                        "description": "Fila 2",
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
                representativeAs: "Representante Legal",
                requestorAddress: "Domicilio",
                buildingAddress: "Domicilio",
                actualSituation: [
                    {
                        "description": "Fila 1",
                        "surface": "31,091.07",
                        "table": {
                            "distribution": ["Oeste","Noroeste","Norte", "Noreste", "Este", "Sureste","Sur", "Suroeste"],
                            "measures": ["15.00 m","15.00 m","15.00 m", "15.00 m", "15.00 m", "15.00 m","15.00 m", "15.00 m"],
                            "adjoining": ["LOTE 8","LOTE 6","LOTE 50", "CALLE PORVENIR", "LOTE 8", "LOTE 6","LOTE 50", "CALLE PORVENIR"]
                        }
                    },
                    {
                        "description": "Fila 2",
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
                        "description": "Fila 1",
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
            return {
                representativeAs: "Representante Legal",
                requestorAddress: "Domicilio",
                buildingAddress: "Domicilio",
                location: ["un costado del fraccionamiento Haciendas de Tizayuca, en el municipio de Tizayuca"],
                documents: [
                    "Solicitud de Licencia de Fraccionamiento.",
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
                authorizationFor : "AUTORIZACIÓN DE PRÓRROGA DE LICENCIA DE FRACCIONAMIENTO",
                integrity : "98 lotes, divididos en 45 lotes habitacionales, 30 lotes habitacionales en condominio, 8 lotes comerciales, 4 lotes de áreas jardinadas, 2 lotes de área de donación, 4 lotes de infraestructura y 5 lotes de servidumbre de paso",
                detailedUse : "Habitacional de Interés Social, Económico Condominal Horizontal, Condominal Vertical y Comercial.",
                conditions: [
                    "En un plazo de 90 días naturales contados a partir de la firma de éste, presentará copia simple de la escritura de protocolización del Fraccionamiento denominado “ANDALUCÍA RESIDENCIAL, 3RA ETAPA, SECCIÓN MÁLAGA” debidamente inscrita en el Registro Público de la Propiedad y del Comercio. ",
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
            }
        case 6:
            return {
                representativeAs: "Representante Legal",
                requestorAddress: "Domicilio",
                buildingAddress: "Domicilio",
                occupationPercent: 0,
                surfacePerLote: 0,
                maximumHeight: "Ej: 9 metros o 3 niveles",
                minimalFront: 0.00,
                frontalRestriction: 0.0,
                parkingLots: "Ej: 1 Cajón por lote",
                usePercent: 0,
                documents: [
                    "Solicitud de Licencia de Fraccionamiento.",
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
                    "En un plazo de 90 días naturales contados a partir de la firma de éste, presentará copia simple de la escritura de protocolización del Fraccionamiento denominado “ANDALUCÍA RESIDENCIAL, 3RA ETAPA, SECCIÓN MÁLAGA” debidamente inscrita en el Registro Público de la Propiedad y del Comercio. ",
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
                location: ["Parcela 775", "777", "778", "786", "790", "791" , "LOTE 1 (PARCELA 925)"],
                habitacionalLotes:"3 lotes habitacionales",
                totalManzanas:"37 manzanas",
                totalSurface:"14,335.98 m²"
            }
        case 7:
            return {
                representativeAs: "Representante Legal",
                requestorAddress: "Domicilio",
                buildingAddress: "Domicilio",
                lotes: ["Lote 1", "Lote 2","Lote 3","Lote 4"],
                location: [" un costado del fraccionamiento Haciendas de Tizayuca, en el municipio de Tizayuca"],
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
                totalRelotification: "47 lotes",
                resultRelotification: ["Manzana 217", "LOTES 1 A 13", "13-A", "13-B", "15 A 44", "62", "65"],
                previousInvoice:"IMDUyV/DPT/RLF/08/2021",
                previousInvoiceDate:"2024-12-07",
                conditions: [
                    "En un plazo de 90 días naturales contados a partir de la firma de éste, presentará copia simple de la escritura de protocolización del Fraccionamiento denominado “ANDALUCÍA RESIDENCIAL, 3RA ETAPA, SECCIÓN MÁLAGA” debidamente inscrita en el Registro Público de la Propiedad y del Comercio. ",
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
                detailedUse : "Habitacional de Interés Social, Económico Condominal Horizontal, Condominal Vertical y Comercial.",
            }
        case 8:
            return {
                representativeAs: "Representante Legal",
                requestorAddress: "Domicilio",
                buildingAddress: "Domicilio",
                households: "Ej: 5 viviendas",
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

export function generateLandSpecialData(type) {

    if (type == 1) {
        return {
            anexo:" "
        }
    }

    if (type >= 2 && type <=6) {
        return { 
            anexo:" ",
            restrictions: "La presente no autoriza acciones urbanas que generen impacto social en su entorno inmediato conforme a lo establecido en el artículo 139 de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial del Estado de Hidalgo y al artículo 61 del Reglamento de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial del Estado de Hidalgo debiendo ser compatibles o permitidos los giros de acuerdo a la matriz de compatibilidad del Programa Municipal de Desarrollo Urbano y Ordenamiento Territorial del Municipio de Tizayuca, Estado de Hidalgo. <br> Acatar la normativa y restricciones de la zonificación secundaria que determina el documento técnico del Programa Municipal de Desarrollo Urbano y Ordenamiento Territorial de Tizayuca. Los predios que tengan como frente un corredor urbano, podrán adoptar las características propias del corredor, siempre y cuando su acceso sea por el corredor. Deberá tramitar en su caso, la licencia de construcción en la Secretaría de Obras Públicas, así como la licencia de funcionamiento en la Dirección de Reglamentos, Espectáculos y Panteones, pertenecientes al Municipio de Tizayuca, Hidalgo. Dar cumplimiento a lo dispuesto en los artículos 80 y 81 de la Ley de Protección Civil del Estado de Hidalgo. El Instituto Municipal de Desarrollo Urbano y Vivienda se reserva el derecho de revocar la presente, en caso de incumplimiento a cualquiera de las condiciones establecidas en la misma.",
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

    if (type == 7) {
        return { 
            anexo:" ",
            parcela: "##/### ###",
            propertyNo: "###########",
            propertyDate: "2024-01-01"
        }
    }

    return { DATA:"NO\nDATA"}
}