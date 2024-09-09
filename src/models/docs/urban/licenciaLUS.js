import path from "path";
import { __dirstorage } from "../../../paths.js";
import * as docUtils from "../docUtils/utils.js";

export async function generateUrbanLUS(lcDBObj) {

    lcDBObj = docUtils.prepareData(lcDBObj);

    var definition = {
        pageMargins: [ 5, 60, 5, 60 ],
        styles: docUtils.docStyles,
        content: [
            {
                text: "\"2024, año de Felipe Carrillo Puerto, Benemérito, Revolucionario y defensor del Mayab\"",
                alignment: 'center',
                fontSize: 8,
                margin: [0, 0, 0, 10],
            },
            {
                text: "LICENCIA DE USO DE SUELO",
                alignment: 'center',
                fontSize: 16,
                bold: true
            },
            {
                text: lcDBObj.fullInvoice,
                alignment: 'right',
                fontSize: 12,
                bold: true,
                margin: [0,10,0,10]
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
                                        [
                                            {text: 'Domicilio: ', style: 'labelT', border: docUtils.borderless},
                                            docUtils.field(lcDBObj.licenseSpecialData.requestorAddress.toUpperCase(), docUtils.borderless, null,'center', 7),
                                        ],
                                        docUtils.generateLegalRepresentativeField(lcDBObj.legalRepresentative),
                                        [
                                            {text: '', border: docUtils.borderless},
                                            {text: '', border: docUtils.borderless}
                                        ],
                                        [
                                            {text: 'Fecha de Solicitud: ', style: 'labelT', border: docUtils.borderless},
                                            docUtils.field(docUtils.dateFormatFull(lcDBObj.requestDate), docUtils.borderless, null,'center', 7)
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
                                            docUtils.field(lcDBObj.surfaceTotal, docUtils.borderless, 1, 'center', 7)
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
                                            {text: 'Uso de suelo permitido:', style: 'labelTC', border: docUtils.borderless, colSpan: 3},
                                            {},{},
                                            docUtils.field(lcDBObj.zone.licenseZone, docUtils.borderless, 9, 'center', 7),
                                            {},{},{},{},{},{},{},{}
                                        ],
                                        [
                                            {text: 'Porcentaje de ocupación:', style: 'labelTC', border: docUtils.borderless, colSpan: 2},
                                            {},
                                            docUtils.field(`${lcDBObj.licenseSpecialData.occupationPercent}%`, docUtils.borderless, 2, 'center', 7),
                                            {},
                                            {text: 'Sup. mínima por lote:', style: 'labelTC', border: docUtils.borderless, colSpan: 2},
                                            {},
                                            docUtils.field(`${lcDBObj.licenseSpecialData.surfacePerLote} m²`, docUtils.borderless, 2, 'center', 7),
                                            {},
                                            {text: 'Altura máxima:', style: 'labelTC', border: docUtils.borderless, colSpan: 2},
                                            {},
                                            docUtils.field(lcDBObj.licenseSpecialData.maximumHeight, docUtils.borderless, 2, 'center', 7),
                                            {}
                                        ],
                                        [
                                            {text: 'Frente mínimo:', style: 'labelTC', border: docUtils.borderless, colSpan: 2},
                                            {},
                                            docUtils.field(`${lcDBObj.licenseSpecialData.minimalFront} m`, docUtils.borderless, 2, 'center', 7),
                                            {},
                                            {text: 'Restricción frontal:', style: 'labelTC', border: docUtils.borderless, colSpan: 2},
                                            {},
                                            docUtils.field(`${lcDBObj.licenseSpecialData.frontalRestriction} m`, docUtils.borderless, 2, 'center', 7),
                                            {},
                                            {text: 'Estacionamientos:', style: 'labelTC', border: docUtils.borderless, colSpan: 2},
                                            {},
                                            docUtils.field(lcDBObj.licenseSpecialData.parkingLots, docUtils.borderless, 2, 'center', 7),
                                            {}
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
                    widths: ['*','*','*'],
                    body: [
                        [
                            {text: "CUADRO DE SUPERFICIES POR USO DE SUELO", style: 'headT', border: docUtils.borderless, colSpan: 3},{},{}
                        ],
                        [
                            {text: "Área total del terreno", style: 'labelTC'},
                            {text: "Uso de suelo", style: 'labelTC'},
                            {text: "%", style: 'labelTC'}
                        ],
                        [
                            {text: lcDBObj.surfaceTotal, style: ['center', 'regular']},
                            {text: lcDBObj.zone.licenseZone, style: ['center', 'regular']},
                            {text: lcDBObj.licenseSpecialData.usePercent, style: ['center', 'regular']}
                        ]
                    ]
                },
                layout: docUtils.containerLayout
            },
            {
                margin: [0, 15, 0, 20],
                style: ['formRow', 'regular'],
                text: 'El solicitante, con los documentos anexados a su escrito inicial, ha dado cumplimiento con los requisitos técnicos y legales que obran en el expediente radicado en este Instituto Municipal de Desarrollo Urbano y Vivienda, acredita la propiedad del inmueble motivo de la solicitud de Licencia de Uso de Suelo.Personal técnico adscrito al referido Instituto, realizó visita de inspección en campo al inmueble del que solicita la Licencia de Uso de Suelo, emitiendo opinión técnica positiva.',
                alignment: 'justify',
            },
            {
                style: 'formRow',
                table: {
                    widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
                    body: [
                        [{text: 'Fecha de Expedición: ', style: 'labelTC', colSpan: 2},
                            {},
                            docUtils.field(docUtils.dateFormatFull(lcDBObj.expeditionDate), docUtils.borderless, 2, 'center',6),
                            {},
                            {text: 'Vigencia: ', style: 'labelTC', colSpan: 2},
                            {},
                            docUtils.field(lcDBObj.validity.licenseValidity, docUtils.borderless, 2, 'center',7),
                            {},
                            {text: 'Folio de pago: ', style: 'labelTC', colSpan: 2},
                            {},
                            docUtils.field(`C-${lcDBObj.billInvoice}`, docUtils.borderless, 2, 'center',7),
                            {}]
                    ]
                },
                layout: docUtils.noBorderNoPadding
            },
            {
                stack: [
                    {
                        text:'NOTIFÍQUESE Y CÚMPLASE\nASÍ EN DEFINITIVA LO RESOLVIÓ Y AUTORIZÓ EL LICENCIADO EN DERECHO JORGE LUIS MARTÍNEZ ÁNGELES,\nDIRECTOR GENERAL DEL INSTITUTO MUNICIPAL DE DESARROLLO URBANO Y VIVIENDA',
                        style: ['regular', 'center'],
                        margin: [0,10,0,10]
                    },
                    {
                        columns: [
                            {width: 30,
                                text: ''
                            },
                            docUtils.signaturePresident(lcDBObj.approvalStatus),
                            docUtils.signatureSeal(lcDBObj.approvalStatus),
                            docUtils.signatureDirector(lcDBObj.approvalStatus),
                            {
                                width: 30,
                                svg: `
                                    <svg width="30" height="84">
                                        <text x="16" y="42" transform="rotate(-90, 15, 42)" text-anchor="middle" font-size="5" font-weight="bold">
                                            <tspan x="16" dy="1.2em">${lcDBObj.fullInvoice}</tspan>
                                            <tspan x="16" dy="1.2em">Pagina 1 de 2</tspan>
                                        </text>
                                    </svg>`,
                                alignment: 'left'
                            }
                        ]
                    },
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
                style: 'formRow',
                pageBreak: 'before',
                table: {
                    widths: ['*'],
                    body: [
                        [
                            {text: "MAPA DE ZONIFICACIÓN", style: 'headT', border: docUtils.borderless, margin:[1,2,1,2]}
                        ],
                        [
                            {
                                /*text: 'IMG'*/
                                border: docUtils.borderless,
                                image: await docUtils.fileExist(lcDBObj.fullInvoice, 'urban'),
                                width: 580,
                                alignment: 'center'
                            }
                        ]
                    ]
                },
                layout: docUtils.noBorderNoPadding
            },
            {
                style: 'formRow',
                table: {
                    widths: ['*'],
                    body: [
                        [{text: "PROHIBICIONES Y SANCIONES", style: 'headT', border: docUtils.borderless}],
                        [
                            {
                                type: 'lower-alpha',
                                ol: [
                                    'Para que se construyan las obras de urbanización y de vivienda, deberá tramitar y contar con la licencia de construcción emitida por la Secretaría de Obras Públicas Municipales de Tizayuca, debiendo acompañar los proyectos ejecutivos de agua potable, drenaje sanitario y pluvial, planos de niveles y rasantes con la aprobación correspondiente; así como de las especificaciones de los materiales a usarse en la urbanización.',
                                    'La presente no autoriza acciones urbanas ni construcción de obras que generen impacto social en su entorno inmediato.',
                                    'Acatar la normativa y restricciones de la zonificación secundaria que determina el documento técnico del Programa Municipal de Desarrollo Urbano y Ordenamiento Territorial de Tizayuca.',
                                    'El Instituto Municipal de Desarrollo Urbano y Vivienda se reserva el derecho de revocar la presente, en caso de incumplimiento a cualquiera de las condiciones establecidas en la misma',
                                    'Dar cumplimiento a las acciones y condiciones emitidas por la Secretaria de Obras Públicas del Municipio de, así como a lo dispuesto por la Comisión de Agua y Alcantarillado del Municipio de Tizayuca Hidalgo CAAMTH.',
                                    'El propietario está obligado a dejar 30% de la superficie neta de cada lote libre de construcción para absorción de agua pluvial, lo anterior estará asentado en los contratos de compra – venta.'
                                ],
                                fontSize: 6,
                                alignment: 'justify'
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
                            {text: "Lo anterior con fundamento en lo dispuesto en los artículos 27 párrafo tercero, 73 fracción XXIX-c, 115 fracción V, inciso d y e, de la Constitución Política de los Estados Unidos Mexicanos; artículos 115, 141, fracción XVII, incisos a, c, d, e y g de la Constitución Política para el Estado de Hidalgo; los artículos 1 fracción IV, 6,, fracción II, II, XII, XV y XVII, 52 fracción I y VII, 59, 60, 66 y 68 de la Ley General de Asentamientos Humanos, Ordenamiento Territorial y Desarrollo Urbano; los artículos 1, 2, 4 fracción XIX, 5, 7, 8 fracción VII, 9, fracción I y V, 54, 55, 56, 132, 133, 134, 135, 136, 137, 138, 139, 146, 147, 156 fracción VI, 159 y demás aplicables de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial para el Estado de Hidalgo; artículos 25, 32, 69, 71, 80 y demás aplicables del Reglamento de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial para el Estado de Hidalgo; artículos 56 fracción I inciso p, fracción II inciso k, 60 fracción I inciso h, II inciso e, f, g y m, 117 fracción IV de la Ley Orgánica Municipal del Estado de Hidalgo; a efecto de dar cumplimiento a lo ordenado por el seno de cabildo la creación del Instituto Municipal de Desarrollo Urbano y Vivienda, con fecha 15 de agosto de 2006, y habiéndose publicado la versión abreviada en el Periódico Oficial del estado el 28 de agosto y 04 de diciembre de 2006, y de acuerdo con la actualización del Programa Municipal de Desarrollo Urbano y Ordenamiento Territorial de Tizayuca, Hidalgo publicado en el Periódico Oficial de Gobierno del estado de Hidalgo en el tomo CLIV alcance uno al Periódico Oficial de fecha 28 de noviembre de 2022, mismo que se encuentra inscrito en el Registro Público de la Propiedad y del Comercio del Distrito Judicial de Tizayuca, Estado de Hidalgo, bajo el Acto publicitario No. 2,194 con Registro de entrada 26250-2022-0, con fecha de asiento 07 de diciembre de 2022.", style: 'regularSmall', alignment: 'justify'}
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
            },
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
    };
    return definition;
}