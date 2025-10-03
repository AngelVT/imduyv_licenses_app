import { findLegacyLicenseByPeriodType } from "../repositories/land-legacy.repository.js";
import { findLandLicenseByPeriodType } from "../repositories/landuse.repository.js";
import { dateFormatFull, dateFormatDMY, parseSimpleFormatting } from "./document.utilities.js";
import ExcelJS from 'exceljs';

export async function generateTableBody(types, start, end, observations) {
    const body = [
        [
            {
                text: 'DIRECCIÓN DE LICENCIAS Y CONTROL URBANO.',
                style: 'headT',
                fontSize: 14,
                colSpan: 7,
                margin: [0, 15, 0, 15]
            }, {}, {}, {}, {}, {}, {}
        ],
        [
            {
                text: `DEPARTAMENTO: LICENCIAS DE USO DE SUELO, (${dateFormatFull(start)} - ${dateFormatFull(end)}).`,
                style: 'boldCenter',
                fontSize: 9,
                colSpan: 7,
                margin: [0, 5, 0, 5]
            }, {}, {}, {}, {}, {}, {}
        ],
        [
            {
                text: 'FOLIO DE LICENCIA.',
                style: 'boldCenter',
                fontSize: 9,
                margin: [0, 5, 0, 5]
            },
            {
                text: 'TIPO DE TRAMITE.',
                style: 'boldCenter',
                fontSize: 9,
                margin: [0, 5, 0, 5]
            },
            {
                text: 'SOLICITANTE.',
                style: 'boldCenter',
                fontSize: 9,
                margin: [0, 5, 0, 5]
            },
            {
                text: 'COLONIA Y/O BARRIO.',
                style: 'boldCenter',
                fontSize: 9,
                margin: [0, 5, 0, 5]
            },
            {
                text: 'FECHA DE EXPEDICIÓN.',
                style: 'boldCenter',
                fontSize: 9,
                margin: [0, 5, 0, 5]
            },
            {
                text: 'FOLIO DE PAGO.',
                style: 'boldCenter',
                fontSize: 9,
                margin: [0, 5, 0, 5]
            },
            {
                text: 'FOLIO DE HOJA MEMBRETADA.',
                style: 'boldCenter',
                fontSize: 9,
                margin: [0, 5, 0, 5]
            }
        ]
    ];

    const typesLong = {
        1: 'CONSTANCIA DE USO DE SUELO',
        2: 'LICENCIA DE USO DE SUELO SERVICIOS',
        3: 'LICENCIA DE USO DE SUELO COMERCIAL',
        4: 'LICENCIA DE USO DE SUELO INDUSTRIAL',
        5: 'LICENCIA DE USO DE SUELO SEGREGADO',
        6: 'DERECHO DE PREFERENCIA',
        7: 'LICENCIA DE USO DE SUELO HABITACIONAL'
    }

    let totalLicenses = 0;

    const signaturesMargin = [0, 25, 0, 25];
    const rowsMargin = [0, 10, 0, 10];

    for (const type of types) {
        const licenses = await findLandLicenseByPeriodType(type, start, end);
        const legacyLicenses = await findLegacyLicenseByPeriodType(type, start, end);
        totalLicenses += licenses.length;
        totalLicenses += legacyLicenses.length;

        for (const legacy of legacyLicenses) {
            body.push([
                {
                    text: legacy.licencia,
                    fontSize: 7,
                    alignment: 'center',
                    margin: rowsMargin
                },
                {
                    text: typesLong[type],
                    fontSize: 7,
                    alignment: 'center',
                    margin: rowsMargin
                },
                {
                    text: legacy.nombre?.toUpperCase(),
                    fontSize: 7,
                    alignment: 'center',
                    margin: rowsMargin
                },
                {
                    text: legacy.colonia?.toUpperCase(),
                    fontSize: 7,
                    alignment: 'center',
                    margin: rowsMargin
                },
                {
                    text: dateFormatDMY(legacy.fecha_expedicion),
                    fontSize: 7,
                    alignment: 'center',
                    margin: rowsMargin
                },
                {
                    text: legacy.folio_pago?.toUpperCase(),
                    fontSize: 7,
                    alignment: 'center',
                    margin: rowsMargin
                },
                {
                    text: legacy.folio_membrete ? legacy.folio_membrete : '-',
                    fontSize: 7,
                    alignment: 'center',
                    margin: rowsMargin
                }
            ]);
        }

        for (const license of licenses) {
            if (license.fullInvoice.includes('SYS-')) {
                totalLicenses--;
                continue;
            }

            body.push([
                {
                    text: license.fullInvoice.replaceAll('_', '/'),
                    fontSize: 7,
                    alignment: 'center',
                    margin: rowsMargin
                },
                {
                    text: typesLong[type],
                    fontSize: 7,
                    alignment: 'center',
                    margin: rowsMargin
                },
                {
                    text: license.requestorName.toUpperCase(),
                    fontSize: 7,
                    alignment: 'center',
                    margin: rowsMargin
                },
                {
                    text: license.colony.toUpperCase(),
                    fontSize: 7,
                    alignment: 'center',
                    margin: rowsMargin
                },
                {
                    text: dateFormatDMY(license.expeditionDate),
                    fontSize: 7,
                    alignment: 'center',
                    margin: rowsMargin
                },
                {
                    text: license.paymentInvoice.toUpperCase(),
                    fontSize: 7,
                    alignment: 'center',
                    margin: rowsMargin
                },
                {
                    text: license.licensePrintInvoice?.toUpperCase(),
                    fontSize: 7,
                    alignment: 'center',
                    margin: rowsMargin
                }
            ]);
        }

        body.push([
            {
                text: `SUBTOTAL DE ${typesLong[type]}: ${licenses.length + legacyLicenses.length}`,
                style: 'headT',
                fontSize: 9,
                colSpan: 7,
                alignment: 'right',
            }, {}, {}, {}, {}, {}, {}
        ]);
    }

    body.push([
        {
            text: `TOTAL, DE LICENCIAS EMITIDAS:  ${totalLicenses}`,
            style: 'headT',
            fontSize: 9,
            colSpan: 7
        }, {}, {}, {}, {}, {}, {}
    ]);

    if (observations.trim() !== '-') {
        body.push([
            {
                colSpan: 7,
                fontSize: 9,
                margin: [5,0,5,0],
                alignment: 'justify',
                text: [
                    {
                        text: `OBSERVACIONES: `,
                        bold: true,
                    },
                    {
                        text: parseSimpleFormatting(observations),
                    },
                ]
            }, {}, {}, {}, {}, {}, {}
        ]);
    }

    body.push([
        {
            text: ['Realizó: LIC. Fernando Irving García Samperio.\n', 
                {text: 'Director de Licencias y Control Urbano del IMDUyV.', bold: true}
            ],
            margin: signaturesMargin,
            alignment: 'center',
            fontSize: 9,
            colSpan: 2
        }, {},
        {
            text: ['Revisó: L.D. Estefhani Itzel Rodríguez Barrera.\n', 
                {text: 'Titular del Órgano Interno de Control del IMDUyV. ', bold: true}
            ],
            margin: signaturesMargin,
            alignment: 'center',
            fontSize: 9,
            colSpan: 3
        }, {}, {},
        {
            text: ['Autorizó: M.A.C.I.G. Hipólito Zamora Soria. \n', 
                {text: 'Director General del IMDUyV.', bold: true}
            ],
            margin: signaturesMargin,
            alignment: 'center',
            fontSize: 9,
            colSpan: 2
        }, {}
    ]);

    body.push([
        {
            text: '',
            style: 'headT',
            colSpan: 7,
            margin: [0,5,0,5]
        }, {}, {}, {}, {}, {}, {}
    ]);

    return body;
}

export async function generateTableBodyGeoRef(types, start, end) {
    const body = [
        [
            {
                text: 'DIRECCIÓN DE LICENCIAS Y CONTROL URBANO.',
                style: 'headT',
                fontSize: 14,
                colSpan: 7,
                margin: [0, 15, 0, 15]
            }, {}, {}, {}, {}, {}, {}
        ],
        [
            {
                text: `DEPARTAMENTO: LICENCIAS DE USO DE SUELO, (${dateFormatFull(start)} - ${dateFormatFull(end)}).`,
                style: 'boldCenter',
                fontSize: 9,
                colSpan: 7,
                margin: [0, 5, 0, 5]
            }, {}, {}, {}, {}, {}, {}
        ],
        [
            {
                text: 'FOLIO DE LICENCIA.',
                style: 'boldCenter',
                fontSize: 9,
                margin: [0, 5, 0, 5]
            },
            {
                text: 'TIPO DE TRAMITE.',
                style: 'boldCenter',
                fontSize: 9,
                margin: [0, 5, 0, 5]
            },
            {
                text: 'SOLICITANTE.',
                style: 'boldCenter',
                fontSize: 9,
                margin: [0, 5, 0, 5]
            },
            {
                text: 'DIRECCION.',
                style: 'boldCenter',
                fontSize: 9,
                margin: [0, 5, 0, 5]
            },
            {
                text: 'GEOREFERENCIA/\nCLAVE CATASTRAL',
                style: 'boldCenter',
                fontSize: 9,
                margin: [0, 5, 0, 5],
                colSpan: 2
            },
            {
                /*text: 'CLAVE CATASTRAL.',
                style: 'boldCenter',
                fontSize: 9,
                margin: [0, 5, 0, 5],*/
            },
            {
                text: 'GIRO.',
                style: 'boldCenter',
                fontSize: 9,
                margin: [0, 5, 0, 5]
            }
        ]
    ];

    const typesLong = {
        1: 'CONSTANCIA DE USO DE SUELO',
        2: 'LICENCIA DE USO DE SUELO SERVICIOS',
        3: 'LICENCIA DE USO DE SUELO COMERCIAL',
        4: 'LICENCIA DE USO DE SUELO INDUSTRIAL',
        5: 'LICENCIA DE USO DE SUELO SEGREGADO',
        6: 'DERECHO DE PREFERENCIA',
        7: 'LICENCIA DE USO DE SUELO HABITACIONAL'
    }

    let totalLicenses = 0;

    const rowsMargin = [0, 10, 0, 10];

    for (const type of types) {
        const licenses = await findLandLicenseByPeriodType(type, start, end);
        const legacyLicenses = await findLegacyLicenseByPeriodType(type, start, end);
        totalLicenses += licenses.length;
        totalLicenses += legacyLicenses.length;

        for (const legacy of legacyLicenses) {
            body.push([
                {
                    text: legacy.licencia,
                    fontSize: 7,
                    alignment: 'center',
                    margin: rowsMargin
                },
                {
                    text: typesLong[type],
                    fontSize: 7,
                    alignment: 'center',
                    margin: rowsMargin
                },
                {
                    text: legacy.nombre?.toUpperCase(),
                    fontSize: 7,
                    alignment: 'center',
                    margin: rowsMargin
                },
                {
                    text: `${legacy.calle}, ${legacy.numero}, ${legacy.colonia}`.toUpperCase(),
                    fontSize: 7,
                    alignment: 'center',
                    margin: rowsMargin
                },
                {
                    text: `${legacy.georeferencia}\n\nC.C.: ${legacy.clave_catastral}`,
                    fontSize: 7,
                    alignment: 'center',
                    margin: rowsMargin,
                    colSpan: 2
                },
                {
                    /*text: legacy.clave_catastral,
                    fontSize: 8,
                    alignment: 'center',
                    margin: rowsMargin,*/
                },
                {
                    text: legacy.giro_2,
                    fontSize: 7,
                    alignment: 'center',
                    margin: rowsMargin
                }
            ]);
        }

        for (const license of licenses) {
            if (license.fullInvoice.includes('SYS-')) {
                totalLicenses--;
                continue;
            }

            body.push([
                {
                    text: license.fullInvoice.replaceAll('_', '/'),
                    fontSize: 7,
                    alignment: 'center',
                    margin: rowsMargin
                },
                {
                    text: typesLong[type],
                    fontSize: 7,
                    alignment: 'center',
                    margin: rowsMargin
                },
                {
                    text: license.requestorName.toUpperCase(),
                    fontSize: 7,
                    alignment: 'center',
                    margin: rowsMargin
                },
                {
                    text: `${license.address}, ${license.number}, ${license.colony}`.toUpperCase(),
                    fontSize: 7,
                    alignment: 'center',
                    margin: rowsMargin
                },
                {
                    text: `${license.geoReference}\n\nC.C.: ${license.catastralKey}`,
                    fontSize: 8,
                    alignment: 'center',
                    margin: rowsMargin,
                    colSpan: 2
                },
                {
                    /*text: license.catastralKey,
                    fontSize: 8,
                    alignment: 'center',
                    margin: rowsMargin,*/
                },
                {
                    text: license.businessLineIntern?.toUpperCase(),
                    fontSize: 7,
                    alignment: 'center',
                    margin: rowsMargin
                }
            ]);
        }

        body.push([
            {
                text: `SUBTOTAL DE ${typesLong[type]}: ${licenses.length + legacyLicenses.length}`,
                style: 'headT',
                fontSize: 9,
                colSpan: 7,
                alignment: 'right',
            }, {}, {}, {}, {}, {}, {}
        ]);
    }

    body.push([
        {
            text: `TOTAL, DE LICENCIAS EMITIDAS:  ${totalLicenses}`,
            style: 'headT',
            fontSize: 9,
            colSpan: 7
        }, {}, {}, {}, {}, {}, {}
    ]);

    return body;
}

export async function generateTableBodyStatus(types, start, end) {
    const body = [
        [
            {
                text: 'DIRECCIÓN DE LICENCIAS Y CONTROL URBANO.',
                style: 'headT',
                fontSize: 14,
                colSpan: 4,
                margin: [0, 15, 0, 15]
            }, {}, {}, {}
        ],
        [
            {
                text: `DEPARTAMENTO: LICENCIAS DE USO DE SUELO, (${dateFormatFull(start)} - ${dateFormatFull(end)}).`,
                style: 'boldCenter',
                fontSize: 9,
                colSpan: 4,
                margin: [0, 5, 0, 5]
            }, {}, {}, {}
        ],
        [
            {
                text: 'TIPO DE TRAMITE.',
                style: 'boldCenter',
                fontSize: 9,
                margin: [0, 5, 0, 5]
            },
            {
                text: 'FOLIO DE LICENCIA.',
                style: 'boldCenter',
                fontSize: 9,
                margin: [0, 5, 0, 5],
            },
            {
                text: 'FECHA DE EXPEDICIÓN.',
                style: 'boldCenter',
                fontSize: 9,
                margin: [0, 5, 0, 5]
            },
            {
                text: 'ESTATUS.',
                style: 'boldCenter',
                fontSize: 9,
                margin: [0, 5, 0, 5]
            }
        ]
    ];

    const typesLong = {
        1: 'CONSTANCIA DE USO DE SUELO',
        2: 'LICENCIA DE USO DE SUELO SERVICIOS',
        3: 'LICENCIA DE USO DE SUELO COMERCIAL',
        4: 'LICENCIA DE USO DE SUELO INDUSTRIAL',
        5: 'LICENCIA DE USO DE SUELO SEGREGADO',
        6: 'DERECHO DE PREFERENCIA',
        7: 'LICENCIA DE USO DE SUELO HABITACIONAL'
    }

    let totalLicenses = 0;

    const rowsMargin = [0, 10, 0, 10];

    for (const type of types) {
        const licenses = await findLandLicenseByPeriodType(type, start, end);
        const legacyLicenses = await findLegacyLicenseByPeriodType(type, start, end);
        totalLicenses += licenses.length;
        totalLicenses += legacyLicenses.length;

        for (const legacy of legacyLicenses) {
            body.push([
                {
                    fillColor: '#f7f7f7',
                    text: typesLong[type],
                    fontSize: 7,
                    alignment: 'center',
                    margin: rowsMargin
                },
                {
                    fillColor: '#f7f7f7',
                    text: legacy.licencia,
                    fontSize: 7,
                    alignment: 'center',
                    margin: rowsMargin
                },
                {
                    fillColor: '#f7f7f7',
                    text: dateFormatDMY(legacy.fecha_expedicion),
                    fontSize: 7,
                    alignment: 'center',
                    margin: rowsMargin
                },
                {
                    fillColor: '#f7f7f7',
                    text: legacy.folio_membrete ? "ENTREGADA" : "EN REVISIÓN",
                    fontSize: 7,
                    alignment: 'center',
                    margin: rowsMargin
                }
            ]);
        }

        for (const license of licenses) {
            if (license.fullInvoice.includes('SYS-')) {
                totalLicenses--;
                continue;
            }

            body.push([
                {
                    text: typesLong[type],
                    fontSize: 7,
                    alignment: 'center',
                    margin: rowsMargin
                },
                {
                    text: license.fullInvoice.replaceAll('_', '/'),
                    fontSize: 7,
                    alignment: 'center',
                    margin: rowsMargin
                },
                {
                    text: dateFormatDMY(license.expeditionDate),
                    fontSize: 7,
                    alignment: 'center',
                    margin: rowsMargin
                },
                {
                    text: license.approvalStatus ? "ENTREGADA" : "EN REVISIÓN",
                    fontSize: 7,
                    alignment: 'center',
                    margin: rowsMargin
                }
            ]);
        }

        body.push([
            {
                text: `SUBTOTAL DE ${typesLong[type]}: ${licenses.length + legacyLicenses.length}`,
                style: 'headT',
                fontSize: 9,
                colSpan: 4,
                alignment: 'right',
            }, {}, {}, {}
        ]);
    }

    body.push([
        {
            text: `TOTAL, DE LICENCIAS EMITIDAS:  ${totalLicenses}`,
            style: 'headT',
            fontSize: 9,
            colSpan: 4
        }, {}, {}, {}
    ]);

    return body;
}

export async function generateLandDataReport(start, end, types) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Datos');
    const data = [];

    for (const type of types) {
        const licenses = await findLandLicenseByPeriodType(type, start, end);
        const legacyLicenses = await findLegacyLicenseByPeriodType(type, start, end);

        for (const legacy of legacyLicenses) {
            data.push({
                folio: legacy.licencia,
                solicitante: legacy.nombre,
                clave_catastral: legacy.clave_catastral,
                calle: legacy.calle,
                numero: legacy.numero,
                colonia: legacy.colonia,
                georeferencia: legacy.georeferencia,
                giro: legacy.giro_2,
                fecha_expedicion: legacy.expeditionDate ? new Date(legacy.expeditionDate) : null,
                folio_pago: legacy.folio_pago,
                folio_membrete: legacy.folio_membrete,
                estatus: legacy.folio_membrete ? "ENTREGADA" : "EN REVISIÓN",
            });
        }

        for (const license of licenses) {
            if (license.fullInvoice.includes('SYS-')) {
                continue;
            }

            data.push({
                folio: license.fullInvoice.replaceAll('_', '/'),
                solicitante: license.requestorName,
                clave_catastral: license.catastralKey,
                calle: license.address,
                numero: license.number,
                colonia: license.colony,
                georeferencia: license.geoReference,
                giro: license.businessLineIntern,
                fecha_expedicion: license.expeditionDate ? new Date(license.expeditionDate) : null,
                folio_pago: license.paymentInvoice,
                folio_membrete: license.licensePrintInvoice,
                estatus: license.approvalStatus ? "ENTREGADA" : "EN REVISIÓN",
            });
        }
    }

    worksheet.columns = Object.keys(data[0]).map(key => ({ header: key, key, width: 30 }));

    worksheet.addRows(data);

    worksheet.getColumn("fecha_expedicion").numFmt = "dd/mm/yyyy";

    return workbook;
}