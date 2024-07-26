import path from "path";
import { __dirstorage } from "../../../paths.js";
import * as docUtils from "../docUtils/utils.js";

export function generateUrbanCRPC(lcDBObj) {

    lcDBObj = docUtils.prepareData(lcDBObj);

    var definition = {
        pageMargins: [ 5, 60, 5, 70 ],
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
                                            docUtils.field(lcDBObj.requestorName, docUtils.borderless, null,null, 7)
                                        ],
                                        [
                                            {text: 'Domicilio: ', style: 'labelT', border: docUtils.borderless},
                                            docUtils.field('BLVD. VALLE DE SAN JAVIER, NO. 707 B, PISO 2 INT. 5, FRACC. VALLE DE SAN JAVIER, PACHUCA DE SOTO, CP. 42086', docUtils.borderless, null,null, 7),
                                        ],
                                        [
                                            {text: '', border: docUtils.borderless},
                                            {text: '', border: docUtils.borderless}
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
                                            docUtils.field('CALLE PROGRESO, MANZANA 4, LOTE 36, FRACCIONAMIENTO AMPLIACIÓN LOS OLMOS, TIZAYUCA, HIDALGO.', docUtils.borderless, 1, null, 7)
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
                            {text: "ANTECEDENTES", style: 'headTB', border: docUtils.borderless}
                        ],
                        [
                            {
                                style: 'regular',
                                stack: [
                                    {
                                        text: [
                                            {text: lcDBObj.requestorName, bold: true},
                                            ' a través del C. ',
                                            {text: lcDBObj.legalRepresentative, bold: true},
                                            ', en su carácter de Representante Legal, solicita la ',
                                            {text: 'AUTORIZACIÓN DE RÉGIMEN DE PROPIEDAD EN CONDOMINIO', bold: true},
                                            ' para ',
                                            {text: lcDBObj.licenseSpecialData.households, bold: true},
                                            ' ubicadas en ',
                                            {text: docUtils.arrayToText(lcDBObj.licenseSpecialData.lotes), bold: true},
                                            {text: ' de la '},
                                            {text: docUtils.arrayToText(lcDBObj.licenseSpecialData.manzanas), bold: true},
                                            ' dentro del fraccionamiento ',
                                            {text: `"${lcDBObj.colony}"`, bold: true},
                                            ', en el Municipio de Tizayuca, Hidalgo, acompañado para efectos los siguientes documentos:\n\n'
                                        ]
                                    },
                                    {
                                        ul: lcDBObj.licenseSpecialData.documents
                                    }
                                ]
                            }
                        ]
                    ]
                },
                layout: docUtils.containerLayout
            },
            {
                style: ['regular', 'formRow'],
                text: 'Una vez analizados los antecedentes descritos, el Instituto Municipal de Desarrollo Urbano y Vivienda, resuelve en definitiva sobre la autorización de Régimen de Propiedad en Condominio, objeto de la presente resolución en atención a lo siguiente:'
            },
            {
                table: {
                    widths: ['*'],
                    body: [
                        [
                            {text: "CONSIDERANDO", style: 'headTB', border: docUtils.borderless}
                        ]
                    ]
                },
                layout: docUtils.containerLayout
            },
            {
                style: ['regular', 'formRow'],
                alignment: 'justify',
                ol: [
                    {text: ['El Instituto Municipal de Desarrollo Urbano y Vivienda, es competente para conocer y resolver la solicitud de',{text: 'AUTORIZACIÓN DE RÉGIMEN DE PROPIEDAD EN CONDOMINIO', bold: true},', para',{text: lcDBObj.licenseSpecialData.households, bold: true},'ubicadas en los ',{text: docUtils.arrayToText(lcDBObj.licenseSpecialData.lotes), bold: true},' de la ',{text: docUtils.arrayToText(lcDBObj.licenseSpecialData.manzanas), bold: true},', dentro del fraccionamiento “',{text: lcDBObj.colony, bold: true},'”, con fundamento en lo previsto en los Artículos 27º y 115º  de la Constitución Política de los Estados Unidos Mexicanos; 1, 10 fracción  XXV, 40 Y 43 de la Ley General de Asentamientos Humanos, Ordenamiento Territorial y Desarrollo Urbano; 10 y 71  fracción XLV de la Constitución Política del Estado de Hidalgo; 1, 7, 8, 69 fracción VIII, 83, 104, 405, 406, 107 y 108 del Reglamento de la Ley de Asentamientos Humanos y Desarrollo Urbano del Estado de Hidalgo y los Artículos 1, 4, 6, 7, 8, 9, 10, 13, 52 y 53 de la Ley de Propiedad en Condominio de Inmuebles para el Estado de Hidalgo.']},
                    {text: ['Para respaldar su solicitud de ',{text: lcDBObj.requestorName, bold: true},' a través del C. ',{text: lcDBObj.legalRepresentative, bold: true},', en su carácter de Representante Legal, presentó el plano arquitectónico del inmueble objeto del Régimen de Propiedad en Condominio, con las características que establece la Ley de Propiedad en Condominio de Inmuebles para el Estado de Hidalgo vigente en la entidad, misma que reúne todos y cada uno de los elementos que este precepto legal exige, comprende ',{text: lcDBObj.licenseSpecialData.privateSurface, bold: true},' de áreas privativas y ',{text: lcDBObj.licenseSpecialData.commonSurface, bold: true},' de área común, según plano autorizado se desglosa de la siguiente manera: m']}
                ]
            },
            {
                pageBreak: 'before',
                style: 'formRow',
                table: {
                    widths: ['*'],
                    body: [
                        [
                            {text: "RESUMEN DE ÁREAS", style: 'headT', border: docUtils.borderless}
                        ],
                        [
                            {
                            }
                        ]
                    ]
                },
                layout: docUtils.containerLayout
            },
            {
                pageBreak: 'before',
                style: 'formRow',
                table: {
                    widths: ['*'],
                    body: [
                        [
                            {text: "RESUMEN DE LOTES", style: 'headT', border: docUtils.borderless}
                        ],
                        [
                            {
                            }
                        ]
                    ]
                },
                layout: docUtils.containerLayout
            },
            {
                pageBreak: 'before',
                style: ['regular', 'formRow'],
                alignment: 'justify',
                start: 3,
                ol: [
                    'Los condóminos de las porciones del inmueble objeto de esta autorización deberán sujetarse a lo establecido en la Ley de Propiedad en Condominio de Inmuebles para el Estado de Hidalgo y al Reglamento Interno.',
                    'En  virtud de que el DESARROLLOS INMOBILIARIOS SADASI S.A. DE C.V. a través del ING. ELÍAS GUARNEROS RAMÍREZ en su carácter de Representante Legal, ha cumplido con los requisitos de la Ley de Propiedad en Condominio de Inmuebles para el Estado de Hidalgo vigente en sus numerales 1, 4, 6, 7, 8, 9, 10, 13, 52 y 53, así como lo dispuesto por los artículos 1, 66 fracción VIII, 104, 105, 107 y 108 del Reglamento de la Ley de Asentamiento Humanos, Desarrollo Urbano y Ordenamiento Territorial del Estado de Hidalgo, resuelve que es procedente la autorización de: RÉGIMEN DE PROPIEDAD EN CONDOMINIO para 5 VIVIENDAS ubicadas en los LOTES 37 y 38 de la MANZANA 218, dentro del fraccionamiento “LOS HÉROES TIZAYUCA”, ubicado en el municipio de Tizayuca, Estado de Hidalgo.'
                ]
            },
            {
                style: 'formRow',
                table: {
                    widths: ['*'],
                    body: [
                        [
                            {text: "PROHIBICIONES Y SANCIONES", style: 'headTB', border: docUtils.borderless}
                        ],
                        [
                            {
                                fontSize: 7,
                                alignment: 'justify',
                                stack: [
                                {text: [
                                    {text: 'PRIMERO.', bold: true},
                                    'En caso de que se transmita parte o la totalidad del inmueble, tal operación se realizará tomando en consideración todas y cada una de las obligaciones que se derivan de la presente resolución y conforme a lo establecido en  los  artículos  7,  63,  64, 65 y 66 de la Ley de Propiedad en Condominio de Inmuebles para el Estado de Hidalgo.'
                                ]},
                                {text: [
                                    {text: 'SEGUNDO.', bold: true},
                                    'El Propietario será responsable por la venta a terceros y de los daños y perjuicios que de ellos se deriven, así como de la obra civil, eximiendo a este Instituto Municipal de Desarrollo Urbano y Vivienda y al Municipio, de toda responsabilidad derivada de esas operaciones quedando obligado en los términos del presente documento a informar al Registro Público de la Propiedad y del Comercio de toda venta pactada.'
                                ]},
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
                            {text: "OBLIGACIONES", style: 'headTB', border: docUtils.borderless}
                        ],
                        [
                            {
                                fontSize: 7,
                                alignment: 'justify',
                                stack: [
                                {text: [
                                    {text: 'PRIMERO. ', bold: true},
                                    'Deberá atender lo señalado en los artículos 3, 7, 10, 11 y 12 de la Ley de Propiedad en Condominio de Inmuebles para el Estado de Hidalgo.'
                                ]},
                                {text: [
                                    {text: 'SEGUNDO. ', bold: true},
                                    'Deberá satisfacer todas y cada una de las obligaciones y derechos derivados del Régimen, de Propiedad de Condominio  comprendidas  en los artículos  22,  52,  53,  54,  55,  57,  61  de  la  Ley de Propiedad en Condominio de Inmuebles para el Estado  de  Hidalgo.'
                                ]},
                                {text: [
                                    {text: 'TERCERO. ', bold: true},
                                    'La presente  resolución  y  los  planos  autorizados  que  la  integran,  deberán  ser  mostrados  al personal  del Instituto Municipal de Desarrollo Urbano y Vivienda,  cuando  se  constituyan  en  el  lugar  para  realizar  la  supervisión  establecida.'
                                ]}
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
                            {text: "CONDICIONANTES", style: 'headTB', border: docUtils.borderless}
                        ],
                        [
                            {
                                style: 'regular',
                                stack: [
                                    {text: 'Deberá presentar la siguiente documentación y condicionantes en los plazos que a continuación se indica:'},
                                    {ul: [
                                        'Copia simple de la escritura de protocolización de la constitución de Régimen de Propiedad en Condominio debidamente inscrita en el Registro Público de la Propiedad y del Comercio, en un plazo no mayor a 90 días hábiles, a partir de la firma de este.',
                                        'Presentar copia de comprobante de pago de impuesto predial correspondiente al periodo enero - diciembre 2024, en un plazo no mayor a 30 días naturales. ',
                                        'En consideración del impacto urbano y a la sobredemanda de los servicios públicos en el municipio, se deberán de generar las medidas adecuadas de prevención, integración y/o compensación, para mitigar o contrarrestar los impactos o alteraciones causadas por la presente autorización. En razón de lo anterior deberá mediante convenio retribuir por medio del Instituto Municipal de Desarrollo Urbano y Vivienda, hasta el 30% del monto de la presente autorización.  Dicho convenio se deberá de formalizarse en un plazo de hasta 30 días hábiles contados a partir de la firma de éste.'
                                    ]}
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
                        [{text: "FUNDAMENTO JURÍDICO", style: 'headT', border: docUtils.borderless}],
                        [
                            {text: "Lo anterior con fundamento en lo dispuesto en los artículos 27 párrafo tercero, 73 fracción XXIX-c, 115 fracción V, inciso d y e, de la Constitución Política de los Estados Unidos Mexicanos; artículos 115, 141, fracción XVII, incisos a, c, d, e y g de la Constitución Política para el Estado de Hidalgo; los artículos 1 fracción IV, 6,, fracción II, II, XII, XV y XVII, 52 fracción I y VII, 59, 60, 66 y 68 de la Ley General de Asentamientos Humanos, Ordenamiento Territorial y Desarrollo Urbano; los artículos 1, 2, 4 fracción XIX, 5, 7, 8 fracción VII, 9, fracción I y V, 54, 55, 56, 132, 133, 134, 135, 136, 137, 138, 139, 146, 147, 156 fracción VI, 159 y demás aplicables de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial para el Estado de Hidalgo; artículos 25, 32, 69 y 71 y demás aplicables del Reglamento de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial para el Estado de Hidalgo; artículos 56 fracción I inciso p, fracción II inciso k, 60 fracción I inciso h, II inciso e, f, g y m, 117 fracción IV de la Ley Orgánica Municipal del Estado de Hidalgo; a efecto de dar cumplimiento a lo ordenado por el seno del cabildo y la creación del Instituto Municipal de Desarrollo Urbano y Vivienda, Tizayuca, Estado de Hidalgo, con fecha 15 de agosto de 2006, y habiéndose publicado la versión abreviada en el Periódico Oficial del estado el 28 de agosto y 04 de diciembre de 2006, y la actualización del Programa Municipal de Desarrollo Urbano y Ordenamiento Territorial de Tizayuca, Hidalgo publicado en el Periódico Oficial de Gobierno del Estado de Hidalgo en el tomo CLIV alcance uno al Periódico Oficial de fecha 28 de noviembre de 2022, mismo que se encuentra inscrito en el Registro Público de la Propiedad y del Comercio del Distrito Judicial de Tizayuca, Estado de Hidalgo, bajo el Acto publicitario No. 2,194 con Registro de entrada 26250-2022-0, con fecha de asiento 07 de diciembre de 2022.", style: 'regularSmall', alignment: 'justify'
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
                            docUtils.field(`C-${lcDBObj.paymentInvoice}`, docUtils.borderless, 2, 'center',6),
                            {}]
                    ]
                },
                layout: docUtils.noBorderNoPadding
            },
            {
                pageBreak: 'avoid',
                stack: [
                    {
                        text:'NOTIFÍQUESE Y CÚMPLASE\nASÍ EN DEFINITIVA LO RESOLVIÓ Y AUTORIZÓ EL LICENCIADO EN DERECHO JORGE LUIS MARTÍNEZ ÁNGELES,\nDIRECTOR GENERAL DEL INSTITUTO MUNICIPAL DE DESARROLLO URBANO Y VIVIENDA',
                        style: 'center',
                        fontSize: 6,
                        margin: [0,10,0,10]
                    },
                    {
                        columns: [
                            {
                                image: path.join(__dirstorage, 'official', 'firma.png'),
                                fit: ['*',70],
                                alignment: 'center',
                                margin: [0,10,0,0]
                            },
                            {
                                image: path.join(__dirstorage, 'official', 'sello.png'),
                                fit: ['*',82],
                                alignment: 'center'
                            },
                            {
                                image: path.join(__dirstorage, 'official', 'firma.png'),
                                fit: ['*',70],
                                alignment: 'center',
                                margin: [0,10,0,0]
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                            text: 'M.A.P.P. SUSANA ARACELI ÁNGELES QUEZADA\nPRESIDENTA MUNICIPAL CONSTITUCIONAL\nDE TIZAYUCA, HIDALGO.',
                            style: 'labelTC'
                        },
                        {},
                        {
                            text: 'L.D. JORGE LUIS MARTÍNEZ ÁNGELES.\nDIRECTOR GENERAL DEL INSTITUTO MUNICIPAL\nDE DESARROLLO URBANO Y VIVIENDA.',
                            style: 'labelTC'
                        }
                        ]
                    },
                    {
                        margin: [0,30,0,0],
                        columns: [
                            {
                                margin: [0,0,30,0],
                                text: 'Revisó: E.H.A.',
                                fontSize: 6,
                                alignment: 'right'
                            },
                            {
                                margin: [30,0,0,0],
                                text: 'Elaboró: A.H.C.',
                                fontSize: 6
                            }
                        ]
                    }
                ]
            }
        ],
        footer: function(currentPage, pageCount) {
            return {
                columns: [
                    {
                        svg: `
                        <svg width="30" height="66">
                            <text x="16" y="33" transform="rotate(-90, 15, 33)" text-anchor="middle" font-size="4" font-weight="bold">
                                <tspan x="16" dy="1.2em">${lcDBObj.fullInvoice}</tspan>
                                <tspan x="16" dy="1.2em">Pagina ${currentPage} de ${pageCount}</tspan>
                            </text>
                        </svg>`,
                        alignment: 'right'
                    }
                ]
            };
        }
    };
    return definition;
}