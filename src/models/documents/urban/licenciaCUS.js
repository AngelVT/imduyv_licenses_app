import { __dirstorage } from "../../../path.configuration.js";
import * as docUtils from "../../../utilities/document.utilities.js";

export async function generateUrbanC(lcDBObj) {
    lcDBObj = docUtils.prepareData(lcDBObj);

    const EMPTY_CELL = {
        text:'',
        border: docUtils.borderless
    }
    
    const layouts = {
        A: [
            {text: 'Uso de suelo predominante: ', style: 'labelTC', border: docUtils.borderless, colSpan: 3},
            {},{},
            docUtils.fieldLU(lcDBObj.zone.licenseZone, docUtils.borderless, 9, 'boldCenter', 7),
            {},{},{},{},{},{},{},{}
        ],
        B: [
            {text: 'Zona: ', style: 'labelTC', border: docUtils.borderless},
            docUtils.fieldLU(lcDBObj.zone.licenseZone, docUtils.borderless, 5, 'boldCenter', 7),
            {},{},{},{},
            {text: 'Uso de suelo compatible: ', style: 'labelTC', border: docUtils.borderless, colSpan: 2},{},
            docUtils.fieldLU(lcDBObj.licenseSpecialData.activity, docUtils.borderless, 4, 'boldCenter', 7),
            {},{},{}
        ]
    }

    const layoutText = {
        A: 'Que el solicitante con los documentos anexados a su escrito inicial ha dado cumplimiento con los requisitos técnicos y legales que obran en el expediente radicado en este Instituto Municipal de Desarrollo Urbano y Vivienda, de Tizayuca, Hidalgo, acredita la propiedad del inmueble motivo de la solicitud firmada para obtener la Constancia de Uso de Suelo, así como de la visita de inspección de campo, misma que permite la localización y ubicación del Inmueble materia de este trámite. Personal técnico adscrito al referido Instituto, realizo visita de inspección en campo al Inmueble de que solicita la Constancia de Uso de Suelo, emitiendo opinión técnica positiva.',
        B: 'Que el solicitante acreditó el cumplimiento de los requisitos técnicos y legales establecidos para la expedición de la Constancia de Uso de Suelo, así como la propiedad del inmueble objeto de la solicitud, mediante la documentación que integra el expediente radicado en este Instituto Municipal de Desarrollo Urbano y Vivienda de Tizayuca, Hidalgo. Derivado del análisis efectuado al Programa Municipal de Desarrollo Urbano y Ordenamiento Territorial de Tizayuca vigente y a la normatividad aplicable, se determinó la procedencia de la solicitud, por lo que se emite la presente Constancia de Uso de Suelo en los términos que en ella se establecen.'
    }

    const INSTITUTE_DIRECTOR_SIGNATURE = await docUtils.getDirectorNameSignature(lcDBObj.requestDate);
    const LICENSES_DIRECTOR = await docUtils.getLicensesDirectorName(lcDBObj.requestDate);

    const definition = {
        pageMargins: [ 5, 60, 5, 60 ],
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
                text: "CONSTANCIA DE USO DE SUELO",
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
                                    widths: [70, '*'],
                                    body: [
                                        [
                                            {text: 'Nombre: ', style: 'labelT', border: docUtils.borderless},
                                            docUtils.fieldLU(lcDBObj.requestorName, docUtils.borderless, null, 'boldCenter', 7)
                                        ],
                                        [
                                            {text: '', border: docUtils.borderless},
                                            {text: '', border: docUtils.borderless}
                                        ],
                                        [
                                            {text: 'Fecha de Solicitud: ', style: 'labelT', border: docUtils.borderless},
                                            docUtils.fieldLU(docUtils.dateFormatFull(lcDBObj.requestDate), docUtils.borderless, null,'boldCenter', 7)
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
                                    widths: [60, '*'],
                                    body: [
                                        [
                                            {text: 'Domicilio: ', style: 'labelT', border: docUtils.borderless},
                                            docUtils.fieldLU(lcDBObj.buildingAddress, docUtils.borderless, null, 'boldCenter', 7)
                                        ],
                                        [
                                            {text: 'Clave Catastral: ', style: 'labelT', border: docUtils.borderless},
                                            docUtils.fieldLU(lcDBObj.catastralKey, docUtils.borderless,null, 'boldCenter', 6)
                                        ],
                                        [
                                            {text: 'Superficie Total: ', style: 'labelT', border: docUtils.borderless},
                                            docUtils.fieldLU(`${lcDBObj.surfaceTotal} m²`, docUtils.borderless, null, 'boldCenter', 7)
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
                                            docUtils.fieldLU("PLANO 03PE10 - ETAPAS DE DESARROLLO", docUtils.borderless, 4, 'boldCenter', 7),
                                            {},{},{},
                                            docUtils.fieldLU("PLANO 03PE09 - ZONIFICACIÓN SECUNDARIA", docUtils.borderless, 4, 'boldCenter', 7),
                                            {},{},{}
                                        ],
                                        [
                                            {text: 'Plazo: ', style: 'labelTC', border: docUtils.borderless},
                                            docUtils.fieldLU(lcDBObj.term.licenseTerm, docUtils.borderless, 3, 'boldCenter', 7),
                                            {},{},
                                            {text: 'P.C.U.: ', style: 'labelTC', border: docUtils.borderless},
                                            docUtils.fieldLU(lcDBObj.licenseSpecialData.PCU, docUtils.borderless, 3, 'boldCenter', 7),
                                            {},{},
                                            {text: 'Clave: ', style: 'labelTC', border: docUtils.borderless},
                                            docUtils.fieldLU(lcDBObj.zone.licenseKey, docUtils.borderless, 3, 'boldCenter',7),
                                            {},{}
                                        ],
                                        layouts[lcDBObj.licenseSpecialData.layout],
                                        [
                                            {text: 'Porcentaje de ocupación:', style: 'labelTC', border: docUtils.borderless, colSpan: 2},
                                            {},
                                            docUtils.fieldLU(`${lcDBObj.licenseSpecialData.occupationPercent}%`, docUtils.borderless, 2, 'boldCenter', 7),
                                            {},
                                            {text: 'Sup. mínima por lote:', style: 'labelTC', border: docUtils.borderless, colSpan: 2},
                                            {},
                                            docUtils.fieldLU(`${lcDBObj.licenseSpecialData.surfacePerLote} m²`, docUtils.borderless, 2, 'boldCenter', 7),
                                            {},
                                            {text: 'Altura máxima:', style: 'labelTC', border: docUtils.borderless, colSpan: 2},
                                            {},
                                            docUtils.fieldLU(`${lcDBObj.licenseSpecialData.maximumHeight} metros o ${lcDBObj.licenseSpecialData.levels} niveles`, docUtils.borderless, 2, 'boldCenter', 7),
                                            {}
                                        ],
                                        [
                                            {text: 'Frente mínimo:', style: 'labelTC', border: docUtils.borderless, colSpan: 2},
                                            {},
                                            docUtils.fieldLU(`${lcDBObj.licenseSpecialData.minimalFront} m`, docUtils.borderless, 2, 'boldCenter', 7),
                                            {},
                                            {text: 'Restricción frontal:', style: 'labelTC', border: docUtils.borderless, colSpan: 2},
                                            {},
                                            docUtils.fieldLU(`${lcDBObj.licenseSpecialData.frontalRestriction} m`, docUtils.borderless, 2, 'boldCenter', 7),
                                            {},
                                            {text: 'Densidad:', style: 'labelTC', border: docUtils.borderless, colSpan: 2},
                                            {},
                                            docUtils.fieldLU(`${lcDBObj.licenseSpecialData.viv_ha}`, docUtils.borderless, 2, 'boldCenter', 7),
                                            {},
                                        ],
                                        [
                                            {text: ['La expedición de constancia de uso de suelo: tiene como objeto establecer los usos y destinos de un predio con base en lo previsto en el Programa Municipal de Desarrollo Urbano y Ordenamiento Territorial de Tizayuca, lo cual ',{text:'NO AUTORIZA SU MODIFICACIÓN, CONSTRUCCIÓN O ALTERACIÓN.', decoration: 'underline'}], style: 'labelTC', border: docUtils.borderless, colSpan: 12, lineHeight: 1.5},
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
                columns: [
                    {
                        table: {
                            widths: ['*'],
                            body: [
                                [
                                    {text: `03PE09 - MAPA DE ZONIFICACIÓN - ${lcDBObj.geoReference}`, style: 'headT', border: docUtils.borderless, margin:[1,2,1,2]}
                                ],
                                [
                                    await docUtils.fileExist(lcDBObj.fullControlInvoice, 'urban', 290)
                                    /*{
                                        /*text: 'IMG'
                                        border: docUtils.borderless,
                                        image: await docUtils.fileExist(lcDBObj.fullInvoice, 'urban'),
                                        width: 290,
                                        alignment: 'center'
                                    }*/
                                ]
                            ]
                        },
                        layout: docUtils.noBorderNoPadding
                    },
                    {
                        margin: [0,0,5,0],
                        stack: [
                            { text: layoutText[lcDBObj.licenseSpecialData.layout], style: 'regular', margin: [0,0,0,1],alignment: 'justify', lineHeight: 1.1, fontSize: 7 },
                            {
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
                                                                ul: [
                                                                    'La presente no autoriza acciones urbanas ni construcción de obras que generen impacto social en su entorno inmediato.',
                                                                    {text: [
                                                                        'Esta constancia no autoriza ',
                                                                        {text: 'subdividir o fraccionar', bold: true},
                                                                        ' el inmueble señalado.'
                                                                    ]},
                                                                    'La presente se expide únicamente para los fines establecidos y no constituye, bajo ninguna circunstancia, documento que acredite la propiedad o posesión sobre el inmueble referido.',
                                                                    'El Instituto Municipal de Desarrollo Urbano y Vivienda se reserva el derecho de revocar la presente en caso de incumplimiento a cualquiera de las condiciones establecidas en la misma.'
                                                                ],
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
                            }
                        ]
                    }
                ],
                columnGap: 5
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
                                        [{text: "Lo anterior con fundamento en lo dispuesto en los artículos 27 párrafo tercero, 73 fracción XXIX-c, 115 fracción V, inciso d y e, de la Constitución Política de los Estados Unidos Mexicanos; artículos 115, 141, fracción XVII, incisos a, c, d, e y g de la Constitución Política para el Estado de Hidalgo; los artículos 1 fracción IV, 6, fracción II, II, XII, XV y XVII, 52 fracción I y VII, 59, 60, 66 y 68 de la Ley General de Asentamientos Humanos, Ordenamiento Territorial y Desarrollo Urbano; los artículos 1, 2, 4 fracción XIX, 5, 7, 8 fracción VII, 9, fracción I y V, 54, 55, 56, 132, 133, 134, 135, 136, 137, 138, 139, 146, 147, 156 fracción VI, 159 y demás aplicables de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial para el Estado de Hidalgo; artículos 25, 32, 69 y 70 y demás aplicables del Reglamento de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial del Estado de Hidalgo; artículos 56 fracción I inciso p, fracción II inciso k, 60 fracción I inciso h, II inciso e, f, g y m, 117 fracción IV de la Ley Orgánica Municipal del Estado de Hidalgo; a efecto de dar cumplimiento a lo ordenado por el seno de cabildo la creación del Instituto Municipal de Desarrollo Urbano y Vivienda, de Tizayuca, Hidalgo, con fecha 15 de agosto de 2006, y habiéndose publicado la versión abreviada en el Periódico Oficial del estado el 28 de agosto y 04 de diciembre de 2006, y la actualización del Programa Municipal de Desarrollo Urbano y Ordenamiento Territorial de Tizayuca, Hidalgo publicado en el Periódico Oficial de Gobierno del estado de Hidalgo en el tomo CLIV alcance uno al Periódico Oficial de fecha 28 de noviembre de 2022, mismo que se encuentra inscrito en el Registro Público de la Propiedad y del Comercio del Distrito Judicial de Tizayuca, Estado de Hidalgo, bajo el Acto publicitario No. 2,194 con Registro de entrada 26250-2022-0, con fecha de asiento 07 de diciembre de 2022.", style: 'regularSmall', border: docUtils.borderless, alignment: 'justify', lineHeight: 1.5}]
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
                            docUtils.fieldLU(docUtils.dateFormatFull(lcDBObj.expeditionDate), docUtils.borderless, 2, 'boldCenter',6),
                            {},
                            {text: 'Vigencia: ', style: 'labelTC', colSpan: 2},
                            {},
                            docUtils.fieldLU(lcDBObj.validity.licenseValidity, docUtils.borderless, 2, 'boldCenter',7),
                            {},
                            {text: 'Folio de pago: ', style: 'labelTC', colSpan: 2},
                            {},
                            docUtils.fieldLU(lcDBObj.billInvoice, docUtils.borderless, 2, 'boldCenter',7),
                            {}]
                    ]
                },
                layout: docUtils.noBorderNoPadding
            },
            {
                columns: [
                    {
                        width: '10%',
                        margin: [0,40,0,0],
                        text: `Elaboró: ${docUtils.madeBy(lcDBObj.elaboratedBy)}\nRevisó: ${LICENSES_DIRECTOR}`,
                        fontSize: 6
                    },
                    {
                        width: '80%',
                        stack: [
                            {
                                text:`NOTIFÍQUESE Y CÚMPLASE\nASÍ EN DEFINITIVA LO RESOLVIÓ Y AUTORIZÓ ${INSTITUTE_DIRECTOR_SIGNATURE},\nDIRECTOR(A) GENERAL DEL INSTITUTO MUNICIPAL DE DESARROLLO URBANO Y VIVIENDA`,
                                style: 'boldCenter',
                                fontSize: 7,
                                margin: [0,10,0,10]
                            },
                            {
                                text: `${INSTITUTE_DIRECTOR_SIGNATURE}\nDIRECTOR(A) GENERAL`,
                                style: 'labelTC',
                                fontSize: 8
                            }
                        ]
                    },
                    {
                        width: '10%',
                        text: ''
                    }
                ]
            }
        ],
        footer: function(currentPage, pageCount) {
            return {
                style: 'regularSmall',
                bold: true,
                text: `${lcDBObj.fullInvoice}\nPagina ${currentPage} de ${pageCount}`,
                alignment: 'center'
            };
        }
    };
    return definition;
}