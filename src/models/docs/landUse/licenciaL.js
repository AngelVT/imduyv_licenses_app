import path from "path";
import { __dirstorage } from "../../../paths.js";
import * as docUtils from "../docUtils/utils.js";

export function generateLandUseL(lcDBObj) {

    lcDBObj = docUtils.prepareData(lcDBObj);

    var definition = {
        pageMargins: [ 5, 60, 5, 10 ],
        styles: docUtils.docStyles,
        content: [
            {
                text: "\"2024, año de Felipe Carrillo Puerto, Benemérito, Revolucionario y defensor del Mayab\"",
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
                                            docUtils.field(lcDBObj.attentionName.toUpperCase(), docUtils.borderless, null,null, 7),
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
                                            {text: 'Uso de suelo permitido: ', style: 'labelTC', border: docUtils.borderless, colSpan: 3},
                                            {},{},
                                            docUtils.field(lcDBObj.authUse.licenseAuthUse, docUtils.borderless, 9, 'center', 7),
                                            {},{},{},{},{},{},{},{}
                                        ],
                                        [
                                            {text: 'Giro: ', style: 'labelT', border: docUtils.borderless, colSpan: 1},
                                            docUtils.field(lcDBObj.businessLinePrint, docUtils.borderless, 2, 'center', 7),
                                            {},
                                            {
                                                colSpan: 9,
                                                rowSpan: 2,
                                                text: 'LA AUTORIZACIÓN DE LICENCIA DE USO DE SUELO: TIENE COMO OBJETO AUTORIZAR EL USO O DESTINO DE UN PREDIO O INMUEBLE, ESTABLECIENDO SUS CONDICIONES DE APROVECHAMIENTO DE CONFORMIDAD CON LOS PROGRAMAS, REGLAMENTOS Y NORMATIVIDAD APLICABLE EN MATERIA DE DESARROLLO URBANO Y ORDENAMIENTO TERRITORIAL.',
                                                fontSize: 6,
                                                style: 'labelTC',
                                                margin:[0,4,0,0],
                                                border: docUtils.borderless
                                            },
                                            {},{},{},{},{},{},{},{}
                                        ],
                                        [
                                            {text: 'Superficie: ', style: 'labelT', border: docUtils.borderless, colSpan: 1},
                                            docUtils.field(lcDBObj.surfaceTotal, docUtils.borderless, 2, null, 6),{},{},{},{},{},{},{},{},{},{}
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
                                        [{text: "La presente no autoriza acciones urbanas que generen impacto social en su entorno inmediato conforme a lo establecido en el artículo 139 de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial del Estado de Hidalgo y al artículo 61 del Reglamento de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial del Estado de Hidalgo debiendo ser compatibles o permitidos los giros de acuerdo a la matriz de compatibilidad del Programa Municipal de Desarrollo Urbano y Ordenamiento Territorial del Municipio de Tizayuca, Estado de Hidalgo.\nAcatar la normativa y restricciones de la zonificación secundaria que determina el documento técnico del Programa Municipal de Desarrollo Urbano y Ordenamiento Territorial de Tizayuca. Los predios que tengan como frente un corredor urbano, podrán adoptar las características propias del corredor, siempre y cuando su acceso sea por el corredor. Deberá tramitar en su caso, la licencia de construcción en la Secretaría de Obras Públicas, así como la licencia de funcionamiento en la Dirección de Reglamentos, Espectáculos y Panteones, pertenecientes al Municipio de Tizayuca, Hidalgo. Dar cumplimiento a lo dispuesto en los artículos 80 y 81 de la Ley de Protección Civil del Estado de Hidalgo. El Instituto Municipal de Desarrollo Urbano y Vivienda se reserva el derecho de revocar la presente, en caso de incumplimiento a cualquiera de las condiciones establecidas en la misma.", fontSize: 6, border: docUtils.borderless, alignment: 'justify'}]
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
                                        [{text: "Lo anterior con fundamento en lo dispuesto en los artículos 27 párrafo tercero, 73 fracción XXIX-c, 115 fracción V, inciso d y e, de la Constitución Política de los Estados Unidos Mexicanos; artículos 115, 141, fracción XVII, incisos a, c, d, e y g de la Constitución Política para el Estado de Hidalgo; los artículos 1 fracción IV, 6,, fracción II, II, XII, XV y XVII, 52 fracción I y VII, 59, 60, 66 y 68 de la Ley General de Asentamientos Humanos, Ordenamiento Territorial y Desarrollo Urbano; los artículos 1, 2, 4 fracción XIX, 5, 7, 8 fracción VII, 9, fracción I y V, 54, 55, 56, 132, 133, 134, 135, 136, 137, 138, 139, 146, 147, 156 fracción VI, 159 y demás aplicables de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial para el Estado de Hidalgo; artículos 25, 32, 69 y 70 y demás aplicables del Reglamento de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial para el Estado de Hidalgo; artículos 56 fracción I inciso p, fracción II inciso k, 60 fracción I inciso h, II inciso e, f, g y m, 117 fracción IV de la Ley Orgánica Municipal del Estado de Hidalgo; a efecto de dar cumplimiento a lo ordenado por el seno de cabildo la creación del Instituto Municipal de Desarrollo Urbano y Vivienda, Tizayuca, Estado de Hidalgo, con fecha 15 de agosto de 2006, y habiéndose publicado la versión abreviada en el Periódico Oficial del estado el 28 de agosto y 04 de diciembre de 2006, y la actualización del Programa Municipal de Desarrollo Urbano y Ordenamiento Territorial de Tizayuca, Hidalgo publicado en el Periódico Oficial de Gobierno del estado de Hidalgo en el tomo CLIV alcance uno al Periódico Oficial de fecha 28 de noviembre de 2022, mismo que se encuentra inscrito en el Registro Público de la Propiedad y del Comercio del Distrito Judicial de Tizayuca, Estado de Hidalgo, bajo el Acto publicitario No. 2,194 con Registro de entrada 26250-2022-0, con fecha de asiento 07 de diciembre de 2022. ", style: 'regularSmall', border: docUtils.borderless, alignment: 'justify'}]
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
                            {text: 'Vigencia: ', style: 'labelTC', colSpan: 2},
                            {},
                            docUtils.field(lcDBObj.validity.licenseValidity, docUtils.borderless, 2, 'center',7),
                            {},
                            {text: 'Folio de pago: ', style: 'labelTC', colSpan: 2},
                            {},
                            docUtils.field(`C-${lcDBObj.paymentInvoice}`, docUtils.borderless, 2, 'center',7),
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
                        margin: [0,10,0,0]
                    },
                    {
                        table: {
                            widths: ['*','auto','*'],
                            body: [
                                [
                                    {},
                                    {
                                        image: path.join(__dirstorage, 'official', 'firma.png'),
                                        fit: ['*',70],
                                        alignment: 'center',
                                        margin: [0,10,0,0]
                                    },
                                    {
                                        columns: [
                                            {
                                                image: path.join(__dirstorage, 'official', 'sello.png'),
                                                fit: ['*',82],
                                                alignment: 'left'
                                            },
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
                        text: 'L.D. JORGE LUIS MARTÍNEZ ÁNGELES\nDIRECTOR GENERAL',
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
                            {text: "03PE09 - MAPA DE ZONIFICACIÓN", style: 'headT', border: docUtils.borderless, margin:[1,2,1,2]}
                        ],
                        [
                            {
                                /*text: 'IMG'*/
                                border: docUtils.borderless,
                                image: path.join(__dirstorage, 'zones', 'land', lcDBObj.zoneImage),
                                fit: ['*',288],
                                alignment: 'center'
                            }
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
                    { text: 'Anexo: ', style: 'labelT' }
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
                                                ol: [
                                                    'Por lo que hace al uso de suelo HABITACIONAL, una vez autorizado, deberá ser permitido con base en la matriz de compatibilidad del Programa Municipal de Desarrollo Urbano y Ordenamiento Territorial de Tizayuca, Hidalgo.',
                                                    'Por lo que hace al uso de suelo HABITACIONAL, una vez autorizado, deberá ser permitido con base en la matriz de compatibilidad del Programa Municipal de Desarrollo Urbano y Ordenamiento Territorial de Tizayuca, Hidalgo.',
                                                    'Se prohíbe la colocación de cualquier publicidad fuera y frente del predio.',
                                                    'Deberá destinar un cajón de estacionamiento por cada 30 m2 de construcción.',
                                                    'No se deberá ocupar la banqueta (vía pública) para realizar maniobras en su proceso constructivo.',
                                                    'Se deberá dar cumplimiento a las Normas Oficiales Mexicanas, según corresponda.',
                                                    'En todas las puertas que conduzcan al exterior habrá letreros con la palabra "salida" y flechas luminosas indicando la dirección de las salidas, las letras tendrán una altura mínima de quince centímetros.',
                                                    'Deberá tramitar dictamen ante la Dirección de Protección Civil y Bomberos del Municipio de Tizayuca, Hidalgo, así como atender todas las recomendaciones que en materia de riesgos se le efectúen; para poder realizar la actualización de su licencia tendra que presentar dicho dictamen vigente.'
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
            },
            {
                stack: [
                    {
                        text:'NOTIFÍQUESE Y CÚMPLASE ASÍ EN DEFINITIVA LO RESOLVIÓ Y AUTORIZÓ EL LICENCIADO EN DERECHO JORGE LUIS MARTÍNEZ ÁNGELES,\nDIRECTOR GENERAL DEL INSTITUTO MUNICIPAL DE DESARROLLO URBANO Y VIVIENDA',
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
                                        text: 'Director General: J.L.M.A.\nElaboró: E.I.R.B.\nRevisó: E.H.A. ',
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