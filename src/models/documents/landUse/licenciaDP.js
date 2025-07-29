import { __dirstorage } from "../../../path.configuration.js";
import * as docUtils from "../../../utilities/document.utilities.js";

export async function generateLandUseDP(lcDBObj) {

    lcDBObj = docUtils.prepareData(lcDBObj);

    const INSTITUTE_DIRECTOR_SIGNATURE = await docUtils.getDirectorNameSignature(lcDBObj.requestDate);
    const INSTITUTE_DIRECTOR_TITTLE = await docUtils.getDirectorNameTittle(lcDBObj.requestDate);
    const INSTITUTE_DIRECTOR_SHORT = await docUtils.getDirectorNameShort(lcDBObj.requestDate);
    const LICENSES_DIRECTOR = await docUtils.getLicensesDirectorName(lcDBObj.requestDate);

    const definition = {
        pageMargins: [ 5, 100, 5, 10 ],
        styles: docUtils.docStyles,
        watermark: lcDBObj.approvalStatus ? undefined : { text: 'Sin aprobar', color: 'red', opacity: 0.2, bold: true, italics: false, angle: 60 },
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
                                            {text: 'Nombre: ', style: 'labelT', border: docUtils.borderless, margin: [0,lcDBObj.licenseSpecialData.marginName,0,0]},
                                            docUtils.fieldLU(lcDBObj.requestorName, docUtils.borderless, null,'center', 7, lcDBObj.licenseSpecialData.marginName)
                                        ],
                                        [
                                            {text: 'En Atención: ', style: 'labelT', border: docUtils.borderless, margin: [0,lcDBObj.licenseSpecialData.marginAttention,0,0]},
                                            docUtils.fieldLU(lcDBObj.attentionName, docUtils.borderless, null,'center', 7, lcDBObj.licenseSpecialData.marginAttention)
                                        ]/*,
                                        [
                                            {text: '', border: docUtils.borderless},
                                            {text: '', border: docUtils.borderless}
                                        ],
                                        [
                                            {text: 'Fecha de Solicitud: ', style: 'labelT', border: docUtils.borderless},
                                            docUtils.fieldLU(lcDBObj.requestDate, docUtils.borderless, null,null, 7)
                                        ]*/
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
                                            docUtils.fieldLU(lcDBObj.address, docUtils.borderless, 3, 'center', 7),
                                            {},
                                            {}
                                        ],
                                        [
                                            {text: 'Clave Catastral: ', style: 'labelT', border: docUtils.borderless},
                                            docUtils.fieldLU(lcDBObj.catastralKey, docUtils.borderless, 1, 'center', 6),
                                            {text: 'Numero: ', style: 'labelT', border: docUtils.borderless},
                                            docUtils.fieldLU(lcDBObj.number, docUtils.borderless, 1, 'center', 7)
                                        ],
                                        [
                                            {text: 'Colonia: ', style: 'labelT', border: docUtils.borderless},
                                            docUtils.fieldLU(lcDBObj.colony, docUtils.borderless, 3, 'center', 7),{},{}
                                        ],
                                        [
                                            {text: 'Superficie Total: ', style: 'labelT', border: docUtils.borderless},
                                            docUtils.fieldLU(lcDBObj.surfaceTotal, docUtils.borderless, 3, 'center', 7),{},{}
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
                                            docUtils.fieldLU("PLANO 03PE01 - POLÍTICAS TERRITORIALES", docUtils.borderless, 4, 'boldCenter', 7),
                                            {},{},{},
                                            docUtils.fieldLU("PLANO 03PE01 - POLÍTICAS TERRITORIALES", docUtils.borderless, 4, 'boldCenter', 7),
                                            {},{},{},
                                            docUtils.fieldLU("PLANO 03PE01 - POLÍTICAS TERRITORIALES", docUtils.borderless, 4, 'boldCenter', 7),
                                            {},{},{}
                                        ],
                                        [
                                            {text: 'Plazo: ', style: 'labelTC', border: docUtils.borderless},
                                            docUtils.fieldLU(lcDBObj.term.licenseTerm, docUtils.borderless, 1, 'center', 6),
                                            {text: 'Zona: ', style: 'labelTC', border: docUtils.borderless},
                                            docUtils.fieldLU(lcDBObj.zone.licenseZone.toUpperCase(), docUtils.borderless, 7, 'center', 7),
                                            {},{},{},{},{},{},
                                            {text: 'Clave: ', style: 'labelTC', border: docUtils.borderless},
                                            docUtils.fieldLU(lcDBObj.zone.licenseKey, docUtils.borderless, 1, 'center',6)
                                        ],
                                        [
                                            {text: 'COS: ', style: 'labelTC', border: docUtils.borderless, colSpan: 2},
                                            {},
                                            docUtils.fieldLU(`${lcDBObj.licenseSpecialData.COS || '-'}%`, docUtils.borderless, 2, 'center', 6),
                                            {},
                                            {text: 'ALTURA MAXIMA: ', style: 'labelTC', border: docUtils.borderless, colSpan: 2},
                                            {},
                                            docUtils.fieldLU(`${lcDBObj.licenseSpecialData.alt_max || '-'} M`, docUtils.borderless, 2, 'center', 6),
                                            {},
                                            {text: 'NIVELES: ', style: 'labelTC', border: docUtils.borderless, colSpan: 2},{},
                                            docUtils.fieldLU(`${lcDBObj.licenseSpecialData.niveles || '-'}`, docUtils.borderless, 2, 'center', 6),
                                            {},
                                        ],
                                        [
                                            docUtils.voidCell(),
                                            docUtils.fieldLU('DERECHO DE PREFERENCIA', docUtils.borderless, 10, 'boldCenter', 8),
                                            {},{},{},{},{},{},{},{},{},docUtils.voidCell()
                                        ],
                                        [
                                            {text: 'Superficie: ', style: 'labelT', border: docUtils.borderless, colSpan: 1},
                                            docUtils.fieldLU(lcDBObj.surfaceTotal, docUtils.borderless, 2, 'center', 6),{},docUtils.voidCell(9),{},{},{},{},{},{},{},{}
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
                                            lineHeight: 1.5,
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
                                                        lineHeight: 1.3,
                                                        text: [
                                                            {text: 'PRIMERO. ', bold: true},
                                                            /*{text: 'Que el solicitante el C. '},
                                                            {text: lcDBObj.requestorName, bold: true},*/
                                                            {text: 'El Instituto Municipal de Desarrollo Urbano y Vivienda del Municipio de, Tizayuca, Estado de Hidalgo, resulta ser competente para el trámite y resolución de la solicitud del '},
                                                            {text: 'DERECHO DE PREFERENCIA.\n\n', bold: true},
                                                            //{text: ', así mismo de la inspección realizada en campo, se permite comprobar la localización y ubicación del inmueble que es motivo de la solicitud.\n\n'}
                                                        ]
                                                    },
                                                    {
                                                        lineHeight: 1.3,
                                                        text: [
                                                            {text: 'SEGUNDO. ', bold: true},
                                                            {text: 'Una vez identificada y revisada la propiedad de referencia, esta no se localiza dentro de un área de crecimiento para llevar a cabo acción urbana especifica, por tal motivo este instituto '},
                                                            {text: 'NO', bold: true},
                                                            {text: '  ejercerá el Derecho de Preferencia Municipal sobre el bien inmueble identificado como parcela '},
                                                            {text: lcDBObj.licenseSpecialData.parcela, bold: true},
                                                            {text: ', del ejido de Tizayuca, Hidalgo, la cual ampara con el certificado parcelario '},
                                                            {text: lcDBObj.licenseSpecialData.propertyNo, bold: true},
                                                            {text: ' de fecha '},
                                                            {text: docUtils.dateFormatFull(lcDBObj.licenseSpecialData.propertyDate)},
                                                            {text: ', debiendo mantener inalterable el uso de suelo actual.\n\n'}
                                                        ]
                                                    },
                                                    {
                                                        lineHeight: 1.3,
                                                        text: [
                                                            {text: 'TERCERO. ', bold: true},
                                                            {text: 'Así mismo se le informa que dicho predio, dentro de las normas de compatibilidad y aprovechamiento PLANO 03PE01 - POLÍTICAS TERRITORIALES, PLANO 03PE10 - ETAPAS DE DESARROLLO, 03PE09 -ZONIFICACIÓN SECUNDARIA del PMDUyOT, se encuentra como '},
                                                            {text: lcDBObj.zone.licenseZone, bold: true},
                                                            {text: ` (${lcDBObj.zone.licenseKey}).\n\n`, bold: true},
                                                        ]
                                                    },
                                                    {
                                                        lineHeight: 1.3,
                                                        text: [
                                                            {text: 'CUARTO. ', bold: true},
                                                            {text: 'El presente solo se refiere al ejercicio del Derecho de Preferencia del municipio de Tizayuca por conducto de este Instituto y por ningún motivo constituye un permiso para la realización de obras, subdivisiones o cambios de uso de suelo ni reconoce o valida la legitima propiedad o tenencia de la tierra, ni tampoco es vinculante con autorizaciones competencia de otras autoridades Federales, Estatales o Municipales, quienes resolverán lo conducente respecto a permisos y licencias entre otros, conforme a sus atribuciones.'}
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
                            docUtils.fieldLU(docUtils.dateFormatDMY(lcDBObj.expeditionDate), docUtils.borderless, 2, 'center',7),
                            {},
                            {},
                            {},
                            {},
                            {},
                            {text: 'Folio de pago: ', style: 'labelTC', colSpan: 2},
                            {},
                            docUtils.fieldLU(lcDBObj.paymentInvoice, docUtils.borderless, 2, 'center',7),
                            {}]
                    ]
                },
                layout: docUtils.noBorderNoPadding
            },
            {
                columns: [
                    {
                        width: '5%',
                        text: ''
                    },
                    {
                        width: '90%',
                        stack: [
                            {
                                text:`NOTIFÍQUESE Y CÚMPLASE\nASÍ EN DEFINITIVA LO RESOLVIÓ Y AUTORIZÓ ${INSTITUTE_DIRECTOR_TITTLE},\nDIRECTOR(A) GENERAL DEL INSTITUTO MUNICIPAL DE DESARROLLO URBANO Y VIVIENDA`,
                                style: ['regular', 'center'],
                                margin: [0,10,0,10]
                            },
                            {
                                text: `${INSTITUTE_DIRECTOR_SIGNATURE}.\nDIRECTOR(A) GENERAL DEL INSTITUTO MUNICIPAL\nDE DESARROLLO URBANO Y VIVIENDA.`,
                                style: 'labelTC'
                            }
                        ]
                    },
                    {
                        width: '5%',
                        stack: [
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
                        ]
                    ]
                },
                layout: docUtils.noBorderNoPadding
            },
            {
                style: 'formRow',
                stack: [
                    { text: 'Que el solicitante con los documentos anexados a su escrito inicial ha dado cumplimiento con los requisitos técnicos y legales que obran en el expediente radicado en este Instituto Municipal de Desarrollo Urbano y Vivienda, acredita la propiedad del inmueble motivo de la solicitud de Constancia de Derecho de Preferencia, así como de la visita de inspección de campo, misma que permite la localización y ubicación del inmueble materia de este trámite. ', fontSize: 7 , margin: [0,0,0,10],alignment: 'justify', lineHeight: 1.5 },
                    { text: `El C. ${lcDBObj.inspector} en su carácter de personal técnico adscrito al referido Instituto, realizó visita de inspección en campo al inmueble del que solicita la Constancia de Derecho de Preferencia, emitiendo opinión técnica positiva. `, fontSize: 7, alignment: 'justify', lineHeight: 1.5 },
                    docUtils.anexoFn(lcDBObj.licenseSpecialData.anexo)
                ]
            },
            {
                style: 'formRow',
                table: {
                    widths: ['*'],
                    body: [
                        [{text: "PROHIBICIONES Y SANCIONES", style: 'headT', border: docUtils.borderless}],
                        [
                            {
                                table: {
                                    widths: ['*'],
                                    body: [
                                        [
                                            {
                                                type: 'lower-alpha',
                                                separator: ')',
                                                lineHeight: 1.5,
                                                ol: lcDBObj.licenseSpecialData.restrictions ? lcDBObj.licenseSpecialData.restrictions : [],
                                                fontSize: 6,
                                                border: docUtils.borderless,
                                                alignment: 'justify'
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
                columns: [
                    {
                        width: '15%',
                        margin: [0,42,0,0],
                        text: `Director(a) General: ${INSTITUTE_DIRECTOR_SHORT}\nElaboró: ${docUtils.madeBy(lcDBObj.elaboratedBy)}\nRevisó: ${LICENSES_DIRECTOR}`,
                        fontSize: 6
                    },
                    {
                        width: '70%',
                        margin: [0,10,0,0],
                        text:`NOTIFÍQUESE Y CÚMPLASE\nASÍ EN DEFINITIVA LO RESOLVIÓ Y AUTORIZÓ ${INSTITUTE_DIRECTOR_TITTLE},\nDIRECTOR(A) GENERAL DEL INSTITUTO MUNICIPAL DE DESARROLLO URBANO Y VIVIENDA`,
                        style: ['regular', 'center'],
                    },
                    {
                        width: '15%',
                        stack: [
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
                        ] 
                    }
                ]
            }
        ]
    };
    return definition;
}