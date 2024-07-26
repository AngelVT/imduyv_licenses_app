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
    vLineWidth: function(i, node) { return 0; },
    hLineColor: function(i, node) { return '#000'; },
    vLineColor: function(i, node) { return '#000'; }
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
    "zoneImage": "IMDUyV_DLyCU_C_001_2024_zone.png",
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
        "requestorAddress": "ARQUIMEDES 3 302, CHAPULTEPEC MORALES, DISTRITO FEDERAL, CP 11570",
        "buildingAddress":"BOULEVARD MIGUEL HIDALGO Y COSTILLA, MANZANA 218, LOTE 37 Y 38, FRACCIONAMIENTO LOS HÉROES TIZAYUCA",
        "privateSurface": "617.35 m²",
        "commonSurface": "227.35 m²",
        "restrictions": ["Restricción 1", "Restricción 2","Restricción 3","Restricción 4"],
        "conditions": ["Condicionante 1", "Condicionante 2","Condicionante 3","Condicionante 4"],
        "anexo":"some anexo",
        "parcela": "742, Z-3, P1/3",
        "propertyNo": "000001002885",
        "propertyDate": "2018-04-12",
        "authorizedFS": "divicion.png",
        "authorizationResume": "SE AUTORIZA LA FUSIÓN DE LOS PREDIOS IDENTIFICADOS COMO LAS PARCELAS 777, 775, 778, 786, 790, 791 Y LOTE 1 (PARCELA 924), RESULTANDO LA FUSIÓN CON UNA SUPERFICIE TOTAL DE: 161,100.70 M2.",
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
        "lotes": ["Lote 1", "Lote 2","Lote 3","Lote 4"],
        "manzanas": ["Manzana 222"],
        "actualSituation": [
            {
                "description": "PARCELA 777",
                "surface": "31,091.07",
                "distrubution": ["Oeste","Noroeste","Norte", "Noreste", "Este", "Sureste","Sur", "Suroeste"],
                "measures": ["Oeste","Noroeste","Norte", "Noreste", "Este", "Sureste","Sur", "Suroeste"],
                "adjoining": ["Oeste","Noroeste","Norte", "Noreste", "Este", "Sureste","Sur", "Suroeste"]
            },
            {
                "description": "PARCELA 777",
                "surface": "31,091.07",
                "distrubution": ["Oeste","Noroeste","Norte", "Noreste", "Este", "Sureste","Sur", "Suroeste"],
                "measures": ["Oeste","Noroeste","Norte", "Noreste", "Este", "Sureste","Sur", "Suroeste"],
                "adjoining": ["Oeste","Noroeste","Norte", "Noreste", "Este", "Sureste","Sur", "Suroeste"]
            }
        ],
        "actualAuthorizedFS": [
            {
                "description": "PARCELA 777",
                "surface": "31,091.07",
                "distrubution": ["Oeste","Noroeste","Norte", "Noreste", "Este", "Sureste","Sur", "Suroeste"],
                "measures": ["Oeste","Noroeste","Norte", "Noreste", "Este", "Sureste","Sur", "Suroeste"],
                "adjoining": ["Oeste","Noroeste","Norte", "Noreste", "Este", "Sureste","Sur", "Suroeste"]
            }
        ]
    },
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
    if (array.length === 0 || !array) return '';
    if (array.length === 1) return array[0];

    const lastItem = array.pop();
    return `${array.join(', ')} y ${lastItem}`;
}