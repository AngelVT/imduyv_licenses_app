import { __dirstorage } from "../../../path.configuration.js";
import * as docUtils from "../../../utilities/document.utilities.js";

export async function generateLandUseC(lcDBObj) {

    lcDBObj = docUtils.prepareData(lcDBObj);

    const INSTITUTE_DIRECTOR_SIGNATURE = await docUtils.getDirectorNameSignature(lcDBObj.requestDate);
    const INSTITUTE_DIRECTOR_TITTLE = await docUtils.getDirectorNameTittle(lcDBObj.requestDate);

    var definition = {
        pageMargins: [ 5, 60, 5, 10 ],
        styles: docUtils.docStyles,
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
                                    widths: ['auto', '*', 'auto', 90],
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
                                            docUtils.field(lcDBObj.number, docUtils.borderless, 1, 'center', 6)
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
                                            docUtils.field("PLANO 03PE10 - ETAPAS DE DESARROLLO", docUtils.borderless, 4, 'boldCenter', 7),
                                            {},{},{},
                                            docUtils.field("PLANO 03PE09 - ZONIFICACIÓN SECUNDARIA", docUtils.borderless, 4, 'boldCenter', 7),
                                            {},{},{}
                                        ],
                                        [
                                            {text: 'Plazo: ', style: 'labelTC', border: docUtils.borderless},
                                            docUtils.field(lcDBObj.term.licenseTerm, docUtils.borderless, 1, 'center', 6),
                                            {text: 'COS: ', style: 'labelTC', border: docUtils.borderless},
                                            docUtils.field(`${lcDBObj.licenseSpecialData.COS}%`, docUtils.borderless, 1, 'center', 7),
                                            {text: 'Altura maxima: ', style: 'labelTC', border: docUtils.borderless, colSpan: 2},
                                            {},
                                            docUtils.field(`${lcDBObj.licenseSpecialData.alt_max} M`, docUtils.borderless, 2, 'center', 6),
                                            {},
                                            {text: 'Niveles: ', style: 'labelTC', border: docUtils.borderless},
                                            docUtils.field(lcDBObj.licenseSpecialData.niveles, docUtils.borderless, 1, 'center', 6),
                                            {text: 'Clave: ', style: 'labelTC', border: docUtils.borderless},
                                            docUtils.field(lcDBObj.zone.licenseKey, docUtils.borderless, 1, 'center',6)
                                        ],
                                        [
                                            {text: 'Uso de suelo permitido: ', style: 'labelTC', border: docUtils.borderless, colSpan: 3},
                                            {},{},
                                            docUtils.field(lcDBObj.zone.licenseZone, docUtils.borderless, 9, 'center', 7),
                                            {},{},{},{},{},{},{},{}
                                        ],
                                        [
                                            {text: 'La expedición de constancia de uso de suelo: tiene como objeto establecer los usos y destinos de un predio con base en lo previsto en el Programa Municipal de Desarrollo Urbano y Ordenamiento Territorial de Tizayuca, lo cual no autoriza su modificación, construcción o alteración.', style: 'labelTC', border: docUtils.borderless, colSpan: 12},
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
                                    await docUtils.fileExist(lcDBObj.fullInvoice, 'land')
                                    /*{
                                        text: 'IMG'
                                        border: docUtils.borderless,
                                        image: await docUtils.fileExist(lcDBObj.fullInvoice, 'land'),
                                        width: 290,
                                        alignment: 'center'
                                    }*/
                                ]
                            ]
                        },
                        layout: docUtils.noBorderNoPadding
                    },
                    {
                        margin: [0,0,35,0],
                        stack: [
                            { text: 'Que el solicitante con los documentos anexados a su escrito inicial ha dado cumplimiento con los requisitos técnicos y legales que obran en el expediente radicado en este Instituto Municipal de Desarrollo Urbano y Vivienda, acredita la propiedad del inmueble motivo de la solicitud de Constancia de Uso de Suelo, así como de la visita de inspección de campo, misma que permite la localización y ubicación del inmueble materia de este trámite. ', style: 'regular', margin: [0,0,0,25],alignment: 'justify' },
                            { text: `El C. ${lcDBObj.inspector}`, style: 'regular' },
                            { text: 'En su carácter de personal técnico adscrito al referido Instituto, realizó visita de inspección en campo al inmueble del que solicita la Constancia de Uso de Suelo, emitiendo opinión técnica positiva. ', style: 'regular', margin: [0,0,0,15], alignment: 'justify' },
                            { text: `Anexo: ${lcDBObj.licenseSpecialData.anexo}`, style: 'labelT' }
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
                            {text: "Lo anterior con fundamento en lo dispuesto en los artículos 27 párrafo tercero, 73 fracción XXIX-c, 115 fracción V, inciso d y e, de la Constitución Política de los Estados Unidos Mexicanos; artículos 115, 141, fracción XVII, incisos a, c, d, e y g de la Constitución Política para el Estado de Hidalgo; los artículos 1 fracción IV, 6,, fracción II, II, XII, XV y XVII, 52 fracción I y VII, 59, 60, 66 y 68 de la Ley General de Asentamientos Humanos, Ordenamiento Territorial y Desarrollo Urbano; los artículos 1, 2, 4 fracción XIX, 5, 7, 8 fracción VII, 9, fracción I y V, 54, 55, 56, 132, 133, 134, 135, 136, 137, 138, 139, 146, 147, 156 fracción VI, 159 y demás aplicables de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial para el Estado de Hidalgo; artículos 25, 32, 69 y 70 y demás aplicables del Reglamento de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial para el Estado de Hidalgo; artículos 56 fracción I inciso p, fracción II inciso k, 60 fracción I inciso h, II inciso e, f, g y m, 117 fracción IV de la Ley Orgánica Municipal del Estado de Hidalgo; a efecto de dar cumplimiento a lo ordenado por el seno de cabildo la creación del Instituto Municipal de Desarrollo Urbano y Vivienda, de Tizayuca, estado de Hidalgo, con fecha 15 de agosto de 2006, y habiéndose publicado la versión abreviada en el Periódico Oficial del estado el 28 de agosto y 04 de diciembre de 2006, y la actualización del Programa Municipal de Desarrollo Urbano y Ordenamiento Territorial de Tizayuca, Hidalgo publicado en el Periódico Oficial de Gobierno del estado de Hidalgo en el tomo CLIV alcance uno al Periódico Oficial de fecha 28 de noviembre de 2022, mismo que se encuentra inscrito en el Registro Público de la Propiedad y del Comercio del Distrito Judicial de Tizayuca, Estado de Hidalgo, bajo el Acto publicitario No. 2,194 con Registro de entrada 26250-2022-0, con fecha de asiento 07 de diciembre de 2022.", style: 'regularSmall', alignment: 'justify'}
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
                            {text: 'Vigencia: ', style: 'labelTC', colSpan: 2},
                            {},
                            docUtils.field(lcDBObj.validity.licenseValidity, docUtils.borderless, 2, 'center',7),
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
                                                            <tspan x="16" dy="1.2em">Pagina 1 de 1</tspan>
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
            }
        ]
    };
    return definition;
}