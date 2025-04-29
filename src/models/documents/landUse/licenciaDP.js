import { __dirstorage } from "../../../path.configuration.js";
import * as docUtils from "../../../utilities/document.utilities.js";

export async function generateLandUseDP(lcDBObj) {

    lcDBObj = docUtils.prepareData(lcDBObj);

    const INSTITUTE_DIRECTOR_SIGNATURE = await docUtils.getDirectorNameSignature(lcDBObj.requestDate);
    const INSTITUTE_DIRECTOR_TITTLE = await docUtils.getDirectorNameTittle(lcDBObj.requestDate);
    const INSTITUTE_DIRECTOR_SHORT = await docUtils.getDirectorNameShort(lcDBObj.requestDate);
    const LICENSES_DIRECTOR = await docUtils.getLicensesDirectorName(lcDBObj.requestDate);

    var definition = {
        pageMargins: [ 5, 100, 5, 10 ],
        styles: docUtils.docStyles,
        content: [
            {
                text: await docUtils.getYearLegend(lcDBObj.year),
                alignment: 'center',
                fontSize: 8,
                margin: [0,0,0,10]
            },
            {
                text: "LICENCIA DE USO DE SUELO",
                alignment: 'center',
                fontSize: 16,
                bold: true
            },
            {
                text: lcDBObj.fullInvoice,
                alignment: 'center',
                fontSize: 12,
                bold: true,
                margin: [0,0,0,10]
            },
            {
                style: 'formRow',
                table: {
                    widths: ['*', 1, '*'],
                    body: [
                        [
                            {text: "DATOS GENERALES SOLICITANTE", style: 'headT', border: docUtils.borderless},
                            {text: '',border: docUtils.borderless},
                            {text: "DATOS DEL INMUEBLE", style: 'headT', border: docUtils.borderless}
                        ],
                        [
                            {
                                table: {
                                    widths: ['auto', '*'],
                                    body: [
                                        [
                                            {text: 'Nombre: ', style: 'labelT', border: docUtils.borderless},
                                            docUtils.field(lcDBObj.requestorName, docUtils.borderless, null,null, 7)
                                        ],
                                        [
                                            {text: 'En Atención: ', style: 'labelT', border: docUtils.borderless},
                                            docUtils.field(lcDBObj.attentionName, docUtils.borderless, null,null, 7),
                                        ],
                                        [
                                            {text: '', border: docUtils.borderless},
                                            {text: '', border: docUtils.borderless}
                                        ],
                                        [
                                            {text: 'Fecha de Solicitud: ', style: 'labelT', border: docUtils.borderless},
                                            docUtils.field(lcDBObj.requestDate, docUtils.borderless, null,null, 7)
                                        ]
                                    ]
                                },
                                layout: docUtils.formLayout
                            },
                            {
                                text: '',border: docUtils.borderless
                            },
                            {
                                table: {
                                    widths: ['auto', '*', 'auto', 30],
                                    body: [
                                        [
                                            {text: 'Calle: ', style: 'labelT', border: docUtils.borderless},
                                            docUtils.field(lcDBObj.address, docUtils.borderless, 3, null, 7),
                                            {},
                                            {}
                                        ],
                                        [
                                            {text: 'Clave Catastral: ', style: 'labelT', border: docUtils.borderless},
                                            docUtils.field(lcDBObj.catastralKey, docUtils.borderless, 1, null, 6),
                                            {text: 'Numero: ', style: 'labelT', border: docUtils.borderless},
                                            docUtils.field(lcDBObj.number, docUtils.borderless, 1, 'center', 7)
                                        ],
                                        [
                                            {text: 'Colonia: ', style: 'labelT', border: docUtils.borderless},
                                            docUtils.field(lcDBObj.colony, docUtils.borderless, 3, null, 7),{},{}
                                        ],
                                        [
                                            {text: 'Superficie Total: ', style: 'labelT', border: docUtils.borderless},
                                            docUtils.field(lcDBObj.surfaceTotal, docUtils.borderless, 3, null, 7),{},{}
                                        ]
                                    ]
                                },
                                layout: docUtils.formLayout
                            }
                        ]
                    ]
                },
                layout: docUtils.containerLayout
            },
            {
                style: 'formRow',
                table: {
                    widths: ['*'],
                    body: [
                        [
                            {text: "NORMAS DE COMPATIBILIDADES Y APROVECHAMIENTO", style: 'headT', border: docUtils.borderless}
                        ],
                        [
                            {
                                table: {
                                    widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
                                    body: [
                                        [
                                            docUtils.field("PLANO 03PE01 - POLÍTICAS TERRITORIALES", docUtils.borderless, 4, 'boldCenter', 7),
                                            {},{},{},
                                            docUtils.field("PLANO 03PE01 - POLÍTICAS TERRITORIALES", docUtils.borderless, 4, 'boldCenter', 7),
                                            {},{},{},
                                            docUtils.field("PLANO 03PE01 - POLÍTICAS TERRITORIALES", docUtils.borderless, 4, 'boldCenter', 7),
                                            {},{},{}
                                        ],
                                        [
                                            {text: 'Plazo: ', style: 'labelTC', border: docUtils.borderless},
                                            docUtils.field(lcDBObj.term.licenseTerm, docUtils.borderless, 1, 'center', 6),
                                            {text: 'Zona: ', style: 'labelTC', border: docUtils.borderless},
                                            docUtils.field(lcDBObj.zone.licenseZone, docUtils.borderless, 7, 'center', 7),
                                            {},{},{},{},{},{},
                                            {text: 'Clave: ', style: 'labelTC', border: docUtils.borderless},
                                            docUtils.field(lcDBObj.zone.licenseKey, docUtils.borderless, 1, 'center',6)
                                        ],
                                        [
                                            {text: 'COS: ', style: 'labelTC', border: docUtils.borderless, colSpan: 2},
                                            {},
                                            docUtils.field(`${lcDBObj.licenseSpecialData.COS}%`, docUtils.borderless, 2, 'center', 6),
                                            {},
                                            {text: 'ALTURA MAXIMA: ', style: 'labelTC', border: docUtils.borderless, colSpan: 2},
                                            {},
                                            docUtils.field(`${lcDBObj.licenseSpecialData.alt_max} M`, docUtils.borderless, 2, 'center', 6),
                                            {},
                                            {text: 'NIVELES: ', style: 'labelTC', border: docUtils.borderless, colSpan: 2},{},
                                            docUtils.field(`${lcDBObj.licenseSpecialData.niveles}`, docUtils.borderless, 2, 'center', 6),
                                            {},
                                        ],
                                        [
                                            docUtils.voidCell(),
                                            docUtils.field('DERECHO DE PREFERENCIA', docUtils.borderless, 10, 'boldCenter', 8),
                                            {},{},{},{},{},{},{},{},{},docUtils.voidCell()
                                        ],
                                        [
                                            {text: 'Superficie: ', style: 'labelT', border: docUtils.borderless, colSpan: 1},
                                            docUtils.field(lcDBObj.surfaceTotal, docUtils.borderless, 2, null, 6),{},docUtils.voidCell(9),{},{},{},{},{},{},{},{}
                                        ]
                                    ]
                                },
                                layout: docUtils.formLayout
                            }
                        ]
                    ]
                },
                layout: docUtils.containerLayout
            },
            {
                style: 'formRow',
                table: {
                    widths: ['*'],
                    body: [
                        [{text: "CONSIDERANDO", style: 'headT', border: docUtils.borderless}],
                        [
                            {
                                table: {
                                    widths: ['*'],
                                    body: [
                                        [{  type: 'upper-alpha',
                                            style: 'regular',
                                            border: docUtils.borderless,
                                            separator: ')',
                                            ol: [
                                                    {
                                                        text: [
                                                            {text: 'Que el solicitante el C. '},
                                                            {text: lcDBObj.requestorName, bold: true},
                                                            {text: ', con los documentos que se anexan a su escrito inicial, acredita la propiedad del inmueble motivo de la solicitud del '},
                                                            {text: 'DERECHO DE PREFERENCIA', bold: true},
                                                            {text: ', así mismo de la inspección realizada en campo, se permite comprobar la localización y ubicación del inmueble que es motivo de la solicitud.'}
                                                        ]
                                                    },
                                                    {
                                                        text: [
                                                            {text: 'En virtud de que la parcela '},
                                                            {text: lcDBObj.licenseSpecialData.parcela, bold: true},
                                                            {text: ', del Ejido de Tizayuca, Hidalgo, de acuerdo al Plano 03PE01 - Políticas Territoriales, Plano 03PE10 - Etapas de Desarrollo, 03PE09-Zonificación Secundaria, se encuentra dentro del polígono identificado con un uso de suelo '},
                                                            {text: lcDBObj.zone.licenseZone, bold: true},
                                                            {text: `, "${lcDBObj.zone.licenseKey}"`, bold: true},
                                                        ]
                                                    }
                                            ]
                                        }]
                                    ]
                                },
                                layout: docUtils.formLayout
                            }
                        ]
                    ]
                },
                layout: docUtils.containerLayout
            },
            {
                style: 'formRow',
                table: {
                    widths: ['*'],
                    body: [
                        [{text: "RESOLUTIVO", style: 'headT', border: docUtils.borderless}],
                        [
                            {
                                table: {
                                    widths: ['*'],
                                    body: [
                                        [{  
                                            style: 'regular',
                                            border: docUtils.borderless,
                                            stack: [
                                                    {
                                                        text: [
                                                            {text: 'PRIMERO. ', bold: true},
                                                            {text: 'Que el solicitante el C. '},
                                                            {text: lcDBObj.requestorName, bold: true},
                                                            {text: ', con los documentos que se anexan a su escrito inicial, acredita la propiedad del inmueble motivo de la solicitud del '},
                                                            {text: 'DERECHO DE PREFERENCIA', bold: true},
                                                            {text: ', así mismo de la inspección realizada en campo, se permite comprobar la localización y ubicación del inmueble que es motivo de la solicitud.\n\n'}
                                                        ]
                                                    },
                                                    {
                                                        text: [
                                                            {text: 'SEGUNDO. ', bold: true},
                                                            {text: 'Este Instituto '},
                                                            {text: 'NO', bold: true},
                                                            {text: ' ejercerá el DERECHO DE PREFERENCIA, respecto de la parcela '},
                                                            {text: lcDBObj.licenseSpecialData.parcela, bold: true},
                                                            {text: ' del ejido de Tizayuca, Hidalgo, la cual ampara con el título de propiedad '},
                                                            {text: lcDBObj.licenseSpecialData.propertyNo, bold: true},
                                                            {text: ' de fecha '},
                                                            {text: docUtils.dateFormatFull(lcDBObj.licenseSpecialData.propertyDate)},
                                                            {text: '.\n\n'}
                                                        ]
                                                    },
                                                    {
                                                        text: [
                                                            {text: 'TERCERO. ', bold: true},
                                                            {text: 'Así mismo se le informa que dicha parcela cuenta, dentro de las normas de compatibilidad y aprovechamiento PLANO 03PE01 - POLÍTICAS TERRITORIALES, PLANO 03PE10 -ETAPAS DE DESARROLLO, 03PE09 -ZONIFICACIÓN SECUNDARIA, con un '},
                                                            {text: lcDBObj.zone.licenseZone, bold: true},
                                                            {text: `, "${lcDBObj.zone.licenseKey}"`, bold: true},
                                                        ]
                                                    }
                                            ]
                                        }]
                                    ]
                                },
                                layout: docUtils.formLayout
                            }
                        ]
                    ]
                },
                layout: docUtils.containerLayout
            },
            {
                style: 'formRow',
                table: {
                    widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
                    body: [
                        [{text: 'Fecha de Expedición: ', style: 'labelTC', colSpan: 2},
                            {},
                            docUtils.field(lcDBObj.expeditionDate, docUtils.borderless, 2, 'center',7),
                            {},
                            {},
                            {},
                            {},
                            {},
                            {text: 'Folio de pago: ', style: 'labelTC', colSpan: 2},
                            {},
                            docUtils.field(lcDBObj.paymentInvoice, docUtils.borderless, 2, 'center',7),
                            {}]
                    ]
                },
                layout: docUtils.noBorderNoPadding
            },
            {
                stack: [
                    {
                        text:`NOTIFÍQUESE Y CÚMPLASE\nASÍ EN DEFINITIVA LO RESOLVIÓ Y AUTORIZÓ ${INSTITUTE_DIRECTOR_TITTLE},\nDIRECTOR(A) GENERAL DEL INSTITUTO MUNICIPAL DE DESARROLLO URBANO Y VIVIENDA`,
                        style: ['regular', 'center'],
                        margin: [0,10,0,0]
                    },
                    {
                        table: {
                            widths: ['*','auto','*'],
                            body: [
                                [
                                    {},
                                    docUtils.signatureDirector(lcDBObj.approvalStatus),
                                    {
                                        columns: [
                                            docUtils.signatureSeal(lcDBObj.approvalStatus),
                                            {
                                                svg: `
                                                    <svg width="30" height="84">
                                                        <text x="16" y="42" transform="rotate(-90, 15, 42)" text-anchor="middle" font-size="5" font-weight="bold">
                                                            <tspan x="16" dy="1.2em">${lcDBObj.fullInvoice}</tspan>
                                                            <tspan x="16" dy="1.2em">Pagina 1 de 2</tspan>
                                                        </text>
                                                    </svg>`,
                                                alignment: 'right'
                                            }
                                        ]
                                    }
                                ],
                            ]
                        },
                        layout: docUtils.noBorderNoPadding
                    },
                    {
                        text: `${INSTITUTE_DIRECTOR_SIGNATURE}.\nDIRECTOR(A) GENERAL DEL INSTITUTO MUNICIPAL\nDE DESARROLLO URBANO Y VIVIENDA.`,
                        style: 'labelTC'
                    }
                ]
            },
            {
                style: 'formRow',
                pageBreak: 'before',
                table: {
                    widths: ['*'],
                    body: [
                        [
                            {text: `03PE09 - MAPA DE ZONIFICACIÓN - ${lcDBObj.geoReference}`, style: 'headT', border: docUtils.borderless, margin:[1,2,1,2]}
                        ],
                        [
                            await docUtils.fileExist(lcDBObj.fullInvoice, 'land')
                            /*{
                                text: 'IMG'
                                border: docUtils.borderless,
                                image: await docUtils.fileExist(lcDBObj.fullInvoice, 'land'),
                                width: 586,
                                alignment: 'center'
                            }*/
                        ]
                    ]
                },
                layout: docUtils.noBorderNoPadding
            },
            {
                style: 'formRow',
                stack: [
                    { text: 'Que el solicitante con los documentos anexados a su escrito inicial ha dado cumplimiento con los requisitos técnicos y legales que obran en el expediente radicado en este Instituto Municipal de Desarrollo Urbano y Vivienda, acredita la propiedad del inmueble motivo de la solicitud de Constancia de Uso de Suelo, así como de la visita de inspección de campo, misma que permite la localización y ubicación del inmueble materia de este trámite. ', fontSize: 7 , margin: [0,0,0,25],alignment: 'justify' },
                    { text: `El C. ${lcDBObj.inspector}`, fontSize: 7 },
                    { text: 'En su carácter de personal técnico adscrito al referido Instituto, realizó visita de inspección en campo al inmueble del que solicita la Constancia de Uso de Suelo, emitiendo opinión técnica positiva. ', fontSize: 7 , margin: [0,0,0,15], alignment: 'justify' },
                    { text: `Anexo: ${lcDBObj.licenseSpecialData.anexo}`, style: 'labelT' }
                ]
            },
            {
                style: 'formRow',
                table: {
                    widths: ['*'],
                    body: [
                        [{text: "FUNDAMENTO JURÍDICO", style: 'headT', border: docUtils.borderless}],
                        [
                            {
                                table: {
                                    widths: ['*'],
                                    body: [
                                        [
                                            {
                                                type: 'lower-alpha',
                                                text: 'Lo anterior con fundamento en lo dispuesto en los artículos 100, 102 parrafo segundo, 103, 104, 193 de la Ley de Asentamiento Humanos, Desarrollo Urbano y Ordenamiento Territorial. ',
                                                style: 'labelTC',
                                                border: docUtils.borderless
                                            }
                                        ]
                                    ]
                                },
                                layout: docUtils.formLayout
                            }
                        ]
                    ]
                },
                layout: docUtils.containerLayout
            },
            {
                stack: [
                    {
                        text:`NOTIFÍQUESE Y CÚMPLASE\nASÍ EN DEFINITIVA LO RESOLVIÓ Y AUTORIZÓ ${INSTITUTE_DIRECTOR_TITTLE},\nDIRECTOR(A) GENERAL DEL INSTITUTO MUNICIPAL DE DESARROLLO URBANO Y VIVIENDA`,
                        style: ['regular', 'center'],
                        margin: [0,10,0,0]
                    },
                    {
                        table: {
                            widths: ['*','auto','*'],
                            body: [
                                [
                                    {
                                        margin: [0,42,0,0],
                                        text: `Director(a) General: ${INSTITUTE_DIRECTOR_SHORT}\nElaboró: ${docUtils.madeBy(lcDBObj.elaboratedBy)}\nRevisó: ${LICENSES_DIRECTOR}`,
                                        fontSize: 6
                                    },
                                    {},
                                    {
                                        svg: `
                                            <svg width="30" height="84">
                                                <text x="16" y="42" transform="rotate(-90, 15, 42)" text-anchor="middle" font-size="5" font-weight="bold">
                                                    <tspan x="16" dy="1.2em">${lcDBObj.fullInvoice}</tspan>
                                                    <tspan x="16" dy="1.2em">Pagina 2 de 2</tspan>
                                                </text>
                                            </svg>`,
                                        alignment: 'right'
                                        
                                    }
                                ],
                            ]
                        },
                        layout: docUtils.noBorderNoPadding
                    }
                ]
            }
        ]
    };
    return definition;
}