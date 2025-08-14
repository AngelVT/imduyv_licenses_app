import { __dirstorage } from "../../../path.configuration.js";
import * as docUtils from "../../../utilities/document.utilities.js";

export async function generateLandUseL(lcDBObj) {

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
                                            {text: 'Nombre: ', style: 'labelT', border: docUtils.borderless, margin: [0,lcDBObj.licenseSpecialData.marginName + 4,0,0]},
                                            docUtils.fieldLU(lcDBObj.requestorName, docUtils.borderless, null,'boldCenter', 7,lcDBObj.licenseSpecialData.marginName)
                                        ],
                                        [
                                            {text: 'En Atención: ', style: 'labelT', border: docUtils.borderless, margin: [0,lcDBObj.licenseSpecialData.marginAttention + 4,0,0]},
                                            docUtils.fieldLU(lcDBObj.attentionName, docUtils.borderless, null,'boldCenter', 7,lcDBObj.licenseSpecialData.marginAttention)
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
                                    widths: ['auto', '*', 'auto', 40],
                                    body: [
                                        [
                                            {text: 'Calle: ', style: 'labelT', border: docUtils.borderless, margin: [0,4,0,0]},
                                            docUtils.fieldLU(lcDBObj.address, docUtils.borderless, 3, 'boldCenter', 7),
                                            {},
                                            {}
                                        ],
                                        [
                                            {text: 'Clave Catastral: ', style: 'labelT', border: docUtils.borderless, margin: [0,4,0,0]},
                                            docUtils.fieldLU(lcDBObj.catastralKey, docUtils.borderless, 1, 'boldCenter', 6),
                                            {text: 'Numero: ', style: 'labelT', border: docUtils.borderless, margin: [0,4,0,0]},
                                            docUtils.fieldLU(lcDBObj.number, docUtils.borderless, 1, 'boldCenter', 7)
                                        ],
                                        [
                                            {text: 'Colonia: ', style: 'labelT', border: docUtils.borderless, margin: [0,4,0,0]},
                                            docUtils.fieldLU(lcDBObj.colony, docUtils.borderless, 3, 'boldCenter', 7),{},{}
                                        ],
                                        [
                                            {text: 'Superficie Total: ', style: 'labelT', border: docUtils.borderless, margin: [0,4,0,0]},
                                            docUtils.fieldLU(lcDBObj.surfaceTotal, docUtils.borderless, 3, 'boldCenter', 7),{},{}
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
                                            {text: 'Plazo: ', style: 'labelTC', border: docUtils.borderless, margin: [0,4,0,0]},
                                            docUtils.fieldLU(lcDBObj.term.licenseTerm, docUtils.borderless, 2, 'boldCenter', 6),
                                            {},
                                            {text: 'COS: ', style: 'labelTC', border: docUtils.borderless, margin: [0,4,0,0]},
                                            docUtils.fieldLU(lcDBObj.licenseSpecialData.COS === 0 ? '-' :  `${lcDBObj.licenseSpecialData.COS} %`, docUtils.borderless, 2, 'boldCenter', 6),
                                            {},
                                            {text: 'Altura maxima: ', style: 'labelTC', border: docUtils.borderless, margin: [0,4,0,0]},
                                            docUtils.fieldLU(lcDBObj.licenseSpecialData.alt_max === 0 ? '-' : `${lcDBObj.licenseSpecialData.alt_max} M`, docUtils.borderless, 2, 'boldCenter', 6),
                                            {},
                                            {text: 'Niveles: ', style: 'labelTC', border: docUtils.borderless, margin: [0,4,0,0]},
                                            docUtils.fieldLU(lcDBObj.licenseSpecialData.niveles === 0 ? '-' : lcDBObj.licenseSpecialData.niveles, docUtils.borderless, 2, 'boldCenter', 6),
                                            {}
                                        ],
                                        [
                                            {text: 'Zona: ', style: 'labelTC', border: docUtils.borderless, margin: [0,4,0,0]},
                                            docUtils.fieldLU(lcDBObj.zone.licenseZone.toUpperCase(), docUtils.borderless, 8, 'boldCenter', 7),
                                            {},{},{},{},{},{},{},
                                            {text: 'Clave: ', style: 'labelTC', border: docUtils.borderless, margin: [0,4,0,0]},
                                            docUtils.fieldLU(lcDBObj.zone.licenseKey, docUtils.borderless, 2, 'boldCenter',7),
                                            {}
                                        ],
                                        [
                                            {text: 'Uso de suelo que se autoriza: ', style: 'labelTC', border: docUtils.borderless, colSpan: 3, margin: [0,4,0,0]},
                                            {},{},
                                            docUtils.fieldLU(lcDBObj.authorized_use.licenseAuthUse.toUpperCase(), docUtils.borderless, 9, 'boldCenter', 7),
                                            {},{},{},{},{},{},{},{}
                                        ],
                                        [
                                            {text: 'Actividad: ', style: 'labelT', border: docUtils.borderless, margin: [0,4,0,0]},
                                            docUtils.fieldLU(lcDBObj.businessLinePrint, docUtils.borderless, 8, 'boldCenter', 7),
                                            {},{},{},{},{},{},{},
                                            {text: 'Superficie: ', style: 'labelT', border: docUtils.borderless, margin: [0,4,0,0]},
                                            docUtils.fieldLU(lcDBObj.surfaceTotal, docUtils.borderless, 2, 'boldCenter', 6),{}
                                        ],
                                        [
                                            {
                                                colSpan: 12,
                                                text: 'LA AUTORIZACIÓN DE LICENCIA DE USO DE SUELO: TIENE COMO OBJETO AUTORIZAR EL USO O DESTINO DE UN PREDIO O INMUEBLE, ESTABLECIENDO SUS CONDICIONES DE APROVECHAMIENTO DE CONFORMIDAD CON LOS PROGRAMAS, REGLAMENTOS Y NORMATIVIDAD APLICABLE EN MATERIA DE DESARROLLO URBANO Y ORDENAMIENTO TERRITORIAL.',
                                                fontSize: 6,
                                                lineHeight: 1.5,
                                                style: 'labelTC',
                                                margin:[0,4,0,0],
                                                border: docUtils.borderless},
                                            {},{},{},{},{},{},{},{},{},{},{}
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
                        [{text: "RESTRICCIONES Y SANCIONES", style: 'headT', border: docUtils.borderless}],
                        [
                            {
                                table: {
                                    widths: ['*'],
                                    body: [
                                        [{text: lcDBObj.licenseSpecialData.restrictions.join('\n'), fontSize: 6, lineHeight: 1.5, border: docUtils.borderless, alignment: 'justify'}]
                                    ]
                                },
                                layout: docUtils.formLayout
                            }
                        ]
                    ]
                },
                layout: docUtils.containerLayoutA
            },
            {
                style: 'formRow',
                table: {
                    widths: ['*'],
                    body: [
                        [{text: "FUNDAMENTO JURÍDICO", style: 'headT', border: docUtils.borderless}],
                        [
                            {text: "Lo anterior con fundamento en lo dispuesto en los artículos 27 párrafo tercero, 73 fracción XXIX-c, 115 fracción V, inciso d y e, de la Constitución Política de los Estados Unidos Mexicanos; artículos 115, 141, fracción XVII, incisos a, c, d, e y g de la Constitución Política para el Estado de Hidalgo; los artículos 1 fracción IV, 6,, fracción II, II, XII, XV y XVII, 52 fracción I y VII, 59, 60, 66 y 68 de la Ley General de Asentamientos Humanos, Ordenamiento Territorial y Desarrollo Urbano; los artículos 1, 2, 4 fracción XIX, 5, 7, 8 fracción VII, 9, fracción I y V, 54, 55, 56, 132, 133, 134, 135, 136, 137, 138, 139, 146, 147, 156 fracción VI, 159 y demás aplicables de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial para el Estado de Hidalgo; artículos 25, 32, 69 y 70 y demás aplicables del Reglamento de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial para el Estado de Hidalgo; artículos 56 fracción I inciso p, fracción II inciso k, 60 fracción I inciso h, II inciso e, f, g y m, 117 fracción IV de la Ley Orgánica Municipal del Estado de Hidalgo; a efecto de dar cumplimiento a lo ordenado por el seno de cabildo la creación del Instituto Municipal de Desarrollo Urbano y Vivienda, de Tizayuca, estado de Hidalgo, con fecha 15 de agosto de 2006, y habiéndose publicado la versión abreviada en el Periódico Oficial del estado el 28 de agosto y 04 de diciembre de 2006, y la actualización del Programa Municipal de Desarrollo Urbano y Ordenamiento Territorial de Tizayuca, Hidalgo publicado en el Periódico Oficial de Gobierno del estado de Hidalgo en el tomo CLIV alcance uno al Periódico Oficial de fecha 28 de noviembre de 2022, mismo que se encuentra inscrito en el Registro Público de la Propiedad y del Comercio del Distrito Judicial de Tizayuca, Estado de Hidalgo, bajo el Acto publicitario No. 2,194 con Registro de entrada 26250-2022-0, con fecha de asiento 07 de diciembre de 2022.", style: 'regularSmall', alignment: 'justify', lineHeight: 1.5}
                        ]
                    ]
                },
                layout: docUtils.containerLayoutA
            },
            {
                style: 'formRow',
                table: {
                    widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
                    body: [
                        [{text: 'Fecha de Expedición: ', style: 'labelTC', colSpan: 2, margin: [0,4,0,0]},
                            {},
                            docUtils.fieldLU(docUtils.dateFormatDMY(lcDBObj.expeditionDate), docUtils.borderless, 2, 'boldCenter',7),
                            {},
                            {text: 'Vigencia: ', style: 'labelTC', colSpan: 2, margin: [0,4,0,0]},
                            {},
                            docUtils.fieldLU(lcDBObj.validity.licenseValidity, docUtils.borderless, 2, 'boldCenter',7),
                            {},
                            {text: 'Folio de pago: ', style: 'labelTC', colSpan: 2, margin: [0,4,0,0]},
                            {},
                            docUtils.fieldLU(lcDBObj.paymentInvoice, docUtils.borderless, 2, 'boldCenter',7),
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
                                text:`NOTIFÍQUESE Y CÚMPLASE\nASÍ EN DEFINITIVA LO RESOLVIÓ Y AUTORIZÓ ${INSTITUTE_DIRECTOR_SIGNATURE},\nDIRECTOR GENERAL DEL INSTITUTO MUNICIPAL DE DESARROLLO URBANO Y VIVIENDA`,
                                style: ['regular', 'center'],
                                margin: [0,10,0,10]
                            },
                            {
                                text: `${INSTITUTE_DIRECTOR_SIGNATURE}.\nDIRECTOR GENERAL DEL INSTITUTO MUNICIPAL\nDE DESARROLLO URBANO Y VIVIENDA.`,
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
                margin: [8,0,8,0],
                stack: [
                    { text: 'Que el solicitante con los documentos anexados a su escrito inicial ha dado cumplimiento con los requisitos técnicos y legales que obran en el expediente radicado en este Instituto Municipal de Desarrollo Urbano y Vivienda, acredita la propiedad del inmueble motivo de la solicitud de Licencia de Uso de Suelo, así como de la visita de inspección de campo, misma que permite la localización y ubicación del inmueble materia de este trámite. ', fontSize: 7 , margin: [0,0,0,10],alignment: 'justify', lineHeight: 1.5 },
                    { text: `El C. ${lcDBObj.inspector} en su carácter de personal técnico adscrito al referido Instituto, realizó visita de inspección en campo al inmueble del que solicita la Licencia de Uso de Suelo, emitiendo opinión técnica positiva. `, fontSize: 7, alignment: 'justify', lineHeight: 1.5 },
                    docUtils.anexoFn(lcDBObj.licenseSpecialData.anexo)
                ]
            },
            {
                style: 'formRow',
                table: {
                    widths: ['*'],
                    body: [
                        [{text: "CONDICIONANTES", style: 'headT', border: docUtils.borderless}],
                        [
                            {
                                table: {
                                    widths: ['*'],
                                    body: [
                                        [
                                            {
                                                type: 'lower-alpha',
                                                ol: lcDBObj.licenseSpecialData.conditions,
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
                layout: docUtils.containerLayoutA
            },
            {
                columns: [
                    {
                        width: '15%',
                        margin: [0,42,0,0],
                        text: `Director General: ${INSTITUTE_DIRECTOR_SHORT}\nElaboró: ${docUtils.madeBy(lcDBObj.elaboratedBy)}\nRevisó: ${LICENSES_DIRECTOR}`,
                        fontSize: 6
                    },
                    {
                        width: '70%',
                        text:`NOTIFÍQUESE Y CÚMPLASE\nASÍ EN DEFINITIVA LO RESOLVIÓ Y AUTORIZÓ ${INSTITUTE_DIRECTOR_SIGNATURE},\nDIRECTOR GENERAL DEL INSTITUTO MUNICIPAL DE DESARROLLO URBANO Y VIVIENDA`,
                        style: ['regular', 'center'],
                        margin: [0,10,0,0]
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
        ],
    };
    return definition;
}