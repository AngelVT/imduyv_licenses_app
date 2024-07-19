export const borderless = [false,false,false,false];

export const formLayout = {
    paddingLeft: function(i, node) { return 1; },
    paddingRight: function(i, node) { return 1; },
    paddingTop: function(i, node) { return 1; },
    paddingBottom: function(i, node) { return 1; },
    hLineWidth: function(i, node) { return 1; },
    vLineWidth: function(i, node) { return 1; },
    hLineColor: function(i, node) { return '#000'; },
    vLineColor: function(i, node) { return '#000'; }
}

export const containerLayout = {
    paddingLeft: function(i, node) { return 2; },
    paddingRight: function(i, node) { return 2; },
    paddingTop: function(i, node) { return 2; },
    paddingBottom: function(i, node) { return 2; },
    hLineWidth: function(i, node) { return 1; },
    vLineWidth: function(i, node) { return 1; },
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
    hLineWidth: function(i, node) { return 1; },
    vLineWidth: function(i, node) { return 1; },
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
    }
}

export function field(text, borders, span, style, fontSize) {
    return {
        colSpan: span,
        border: borders,
        table: {widths: ['*'],body: [[{text: text, fontSize: fontSize, style: style}]]}
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
    "expeditionDate": "2024-05-22",
    "licenseValidity": 1,
    "paymentInvoice": "1445",
    "expirationDate": "2024-05-23",
    "licenseExpeditionType": 1,
    "contactPhone": 7791042842,
    "cost": 1,
    "discount": 0,
    "paymentDone": 1,
    "inspector": "eduardo alejandro cordoba vazquez",
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