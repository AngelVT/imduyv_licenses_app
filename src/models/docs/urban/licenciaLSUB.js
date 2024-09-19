import path from "path";
import { __dirstorage } from "../../../paths.js";
import * as docUtils from "../docUtils/utils.js";

export async function generateUrbanLSUB(lcDBObj) {

    lcDBObj = docUtils.prepareData(lcDBObj);

    var definition = {
        pageMargins: [ 5, 40, 5, 40 ],
        styles: docUtils.docStyles,
        content: [
            {
                text: "\"2024, año de Felipe Carrillo Puerto, Benemérito, Revolucionario y defensor del Mayab\"",
                alignment: 'center',
                fontSize: 8,
                margin: [0,0,0,10]
            },
            {
                text: "LICENCIA DE SUBDIVISIÓN",
                alignment: 'center',
                fontSize: 16,
                bold: true
            },
            {
                text: lcDBObj.fullInvoice,
                alignment: 'right',
                fontSize: 12,
                bold: true,
                margin: [0,10,0,0]
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
                                            docUtils.field(lcDBObj.requestorName, docUtils.borderless, null,'center', 7)
                                        ],
                                        docUtils.generateLegalRepresentativeField(lcDBObj.legalRepresentative, lcDBObj.licenseSpecialData.representativeAs),
                                        [
                                            {text: 'Domicilio: ', style: 'labelT', border: docUtils.borderless},
                                            docUtils.field(lcDBObj.licenseSpecialData.requestorAddress.toUpperCase(), docUtils.borderless, null,'center', 7),
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
                                    widths: ['auto', '*'],
                                    body: [
                                        [
                                            {text: 'Domicilio: ', style: 'labelT', border: docUtils.borderless},
                                            docUtils.field(lcDBObj.licenseSpecialData.buildingAddress.toUpperCase(), docUtils.borderless, 1, 'center', 7)
                                        ],
                                        [
                                            {text: 'Clave Catastral: ', style: 'labelT', border: docUtils.borderless},
                                            docUtils.field(lcDBObj.catastralKey, docUtils.borderless, 1, 'center', 7),
                                        ],
                                        [
                                            {text: 'Superficie Total: ', style: 'labelT', border: docUtils.borderless},
                                            docUtils.field(`${lcDBObj.surfaceTotal} m²`, docUtils.borderless, 1, 'center', 7)
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
                            {text: "CONSIDERANDOS", style: 'headT', border: docUtils.borderless}
                        ],
                        [
                            {
                                border: [true, true, true, false],
                                table: {
                                    widths: [90,90,100.5,'*'],
                                    body: docUtils.generateDSMCTable(lcDBObj.licenseSpecialData.actualSituation, 'SITUACIÓN ACTUAL')
                                },layout: docUtils.subTable
                            }
                        ],
                        [
                            {
                                border: [true, false, true,true],
                                text: [
                                    {text: 'Nota: ', style: 'regularSmall', bold: true},
                                    {text: 'La información descrita corresponde y es responsabilidad del solicitante.', style: 'regularSmall'}
                                ]
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
                            {text: "RESOLUCIÓN", style: 'headT', border: docUtils.borderless}
                        ],
                        [
                            {
                                border: [true, true, true, false],
                                table: {
                                    widths: [90,90,100.5,'*'],
                                    body: docUtils.generateDSMCTable(lcDBObj.licenseSpecialData.actualAuthorizedFS, 'SUBDIVISIÓN QUE SE AUTORIZA')
                                },layout: docUtils.subTable
                            }
                        ],
                        [
                            {
                                border: [true, false, true, false],
                                text: lcDBObj.licenseSpecialData.authorizationResume,
                                fontSize: 6,
                                alignment: 'center',
                                bold: true
                            }
                        ],
                        [
                            {
                                border: [true, false, true,true],
                                text: [
                                    {text: 'Nota: ', style: 'regularSmall', bold: true},
                                    {text: 'La información descrita corresponde y es responsabilidad del solicitante.', style: 'regularSmall'}
                                ]
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
                            docUtils.field(docUtils.dateFormatFull(lcDBObj.expeditionDate), docUtils.borderless, 2, 'center',6),
                            {},{},{},{},{},
                            {text: 'Folio de pago: ', style: 'labelTC', colSpan: 2},
                            {},
                            docUtils.field(lcDBObj.billInvoice, docUtils.borderless, 2, 'center',6),
                            {}]
                    ]
                },
                layout: docUtils.noBorderNoPadding
            },
            {
                pageBreak: 'avoid',
                stack: [
                    {
                        text:'NOTIFÍQUESE Y CÚMPLASE\nASÍ EN DEFINITIVA LO RESOLVIÓ Y AUTORIZÓ EL MAESTRO EN AUDITORÍA Y CONTROL INTERNO GUBERNAMENTAL HIPÓLITO ZAMORA SORIA,\nDIRECTOR GENERAL DEL INSTITUTO MUNICIPAL DE DESARROLLO URBANO Y VIVIENDA',
                        style: 'center',
                        fontSize: 6,
                        margin: [0,10,0,40]
                    },
                    /*{
                        columns: [
                            {width: 30,
                                text: ''
                            },
                            docUtils.signaturePresident(lcDBObj.approvalStatus),
                            docUtils.signatureSeal(lcDBObj.approvalStatus),
                            docUtils.signatureDirector(lcDBObj.approvalStatus),
                            {
                                width: 30,
                                text: ''
                            }
                        ]
                    },*/
                    {
                        columns: [
                            {width: 5,
                                text: ''},
                            {
                            text: 'I.A.E.V. GRETCHEN ALYNE ATILANO MORENO.\nPRESIDENTA MUNICIPAL CONSTITUCIONAL\nDE TIZAYUCA, HIDALGO.',
                            style: 'labelTC'
                        },
                        {width: 140,
                            text: ''},
                        {
                            text: 'M.A.C.I.G. HIPÓLITO ZAMORA SORIA.\nDIRECTOR GENERAL DEL INSTITUTO MUNICIPAL\nDE DESARROLLO URBANO Y VIVIENDA.',
                            style: 'labelTC'
                        },
                        {width: 5,
                            text: ''}
                        ]
                    }
                ]
            },
            {
                pageBreak: 'before',
                style: 'formRow',
                table: {
                    widths: ['*'],
                    body: [
                        [
                            {text: "CONDICIONANTES", style: 'headT', border: docUtils.borderless}
                        ],
                        [
                            {
                                type: 'lower-alpha',
                                ol: lcDBObj.licenseSpecialData.conditions ? lcDBObj.licenseSpecialData.conditions.join('\n\n*').split('*') : ["..."],
                                fontSize: 6
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
                            {text: "RESTRICCIONES Y SANCIONES", style: 'headT', border: docUtils.borderless}
                        ],
                        [
                            {
                                ul: [
                                    'La presente no autoriza acciones urbanas que generen impacto social en su entorno inmediato conforme a lo establecido en el artículo 139 de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial del Estado de Hidalgo y al artículo 71 del Reglamento de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial del Estado de Hidalgo.',
                                    'Acatar la normativa y restricciones de la zonificación secundaria que determina el documento técnico del Programa Municipal de Desarrollo Urbano y Ordenamiento Territorial de Tizayuca.',
                                    'El presente documento es intransferible y aplicación durante su vigencia es exclusivamente para los inmuebles autorizados y del propietario acreditado, dejando de surtir efecto alguno si por cualquier título legal se transfiere el uso, destino o dominio del predio y solo refiere el uso de suelo de la acción urbana competencia de este Instituto Municipal de Desarrollo Urbano y Vivienda, de Tizayuca, estado de Hidalgo y por ningún motivo constituye un permiso para la realización de obras, ni reconoce ni valida la personalidad jurídica, legitima la propiedad y/o tenencia de la tierra, ni tampoco es vinculante con autorizaciones competencia de otras autoridades federales, estatales y/o municipales, quienes en su caso resolverán lo conducente respecto a permisos, licencias y dictámenes entre otros.',
                                    'El Instituto Municipal de Desarrollo Urbano y Vivienda se reserva el derecho de revocar la presente, en caso de incumplimiento a cualquiera de las condiciones establecidas en la misma.'
                                ],
                                fontSize: 6
                            }
                        ]
                    ]
                },
                layout: docUtils.containerLayout
            },
            {
                style: 'formRow',
                pageBreak: 'avoid',
                table: {
                    widths: ['*'],
                    body: [
                        [
                            {text: "SUBDIVISIÓN QUE SE AUTORIZA", style: 'headT', border: docUtils.borderless, margin:[1,2,1,2]}
                        ],
                        [
                            {
                                border: [true, true, true,false],
                                /*text: 'IMG'*/
                                image: await docUtils.fileExist(lcDBObj.fullInvoice, 'urban'),
                                width: 580,
                                alignment: 'center'
                            }
                        ],
                        [
                            {
                                border: [true, false, true,true],
                                text: [
                                    {text: 'Nota: ', style: 'regular', bold: true},
                                    {text: 'La información descrita corresponde y es responsabilidad del solicitante.', style: 'regular'}
                                ]
                            }
                        ]
                    ]
                },
                layout: docUtils.containerLayout
            },
            {
                stack: [
                    { text: 'El solicitante, con los documentos anexados a su escrito inicial, ha dado cumplimiento con los requisitos técnicos y legales que obran en el expediente radicado en este Instituto Municipal de Desarrollo Urbano y Vivienda, acredita la propiedad del inmueble motivo de la solicitud de Licencia de Subdivisión, así como de la visita de inspección de campo, misma que permite la localización y ubicación del inmueble, materia de este trámite.', style: 'regular', margin: [0,0,0,25],alignment: 'justify' },
                    { text: 'Personal técnico adscrito al referido Instituto, realizó visita de inspección en campo al inmueble del que solicita la Licencia de Subdivisión, emitiendo opinión técnica positiva. Por tanto, se autorizan los planos de Subdivisión exhibidos por el solicitante, los cuales forman parte integrante de esta autorización.', style: 'regular', margin: [0,0,0,15], alignment: 'justify' }
                ]
            },
            {
                style: 'formRow',
                table: {
                    widths: ['*'],
                    body: [
                        [{text: "FUNDAMENTO JURÍDICO", style: 'headT', border: docUtils.borderless}],
                        [
                            {text: "Lo anterior con fundamento en lo dispuesto en los artículos 27 párrafo tercero, 73 fracción XXIX-c, 115 fracción V, inciso d y e, de la Constitución Política de los Estados Unidos Mexicanos; artículos 115, 141, fracción XVII, incisos a, c, d, e y g de la Constitución Política para el Estado de Hidalgo; los artículos 1 fracción IV, 6,, fracción II, II, XII, XV y XVII, 52 fracción I y VII, 59, 60, 66 y 68 de la Ley General de Asentamientos Humanos, Ordenamiento Territorial y Desarrollo Urbano; los artículos 1, 2, 4 fracción XIX, 5, 7, 8 fracción VII, 9, fracción I y V, 54, 55, 56, 132, 133, 134, 135, 136, 137, 138, 139, 146, 147, 156 fracción VI, 159 y demás aplicables de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial para el Estado de Hidalgo; artículos 25, 32, 69 y 71 y demás aplicables del Reglamento de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial para el Estado de Hidalgo; artículos 56 fracción I inciso p, fracción II inciso k, 60 fracción I inciso h, II inciso e, f, g y m, 117 fracción IV de la Ley Orgánica Municipal del Estado de Hidalgo; a efecto de dar cumplimiento a lo ordenado por el seno del cabildo y la creación del Instituto Municipal de Desarrollo Urbano y Vivienda, Tizayuca, Estado de Hidalgo, con fecha 15 de agosto de 2006, y habiéndose publicado la versión abreviada en el Periódico Oficial del estado el 28 de agosto y 04 de diciembre de 2006, y la actualización del Programa Municipal de Desarrollo Urbano y Ordenamiento Territorial de Tizayuca, Hidalgo publicado en el Periódico Oficial de Gobierno del Estado de Hidalgo en el tomo CLIV alcance uno al Periódico Oficial de fecha 28 de noviembre de 2022, mismo que se encuentra inscrito en el Registro Público de la Propiedad y del Comercio del Distrito Judicial de Tizayuca, Estado de Hidalgo, bajo el Acto publicitario No. 2,194 con Registro de entrada 26250-2022-0, con fecha de asiento 07 de diciembre de 2022.", style: 'regularSmall', alignment: 'justify'}
                        ]
                    ]
                },
                layout: docUtils.containerLayout
            },
            {
                margin: [0,30,0,0],
                columns: [
                    {
                        margin: [0,0,30,0],
                        text: 'Revisó: F.I.G.S.',
                        fontSize: 6,
                        alignment: 'right'
                    },
                    {
                        margin: [30,0,0,0],
                        text: `Elaboró: ${docUtils.madeBy(lcDBObj.elaboratedBy)}`,
                        fontSize: 6
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