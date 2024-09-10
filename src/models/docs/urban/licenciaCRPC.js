import path from "path";
import { __dirstorage } from "../../../paths.js";
import * as docUtils from "../docUtils/utils.js";

export async function generateUrbanCRPC(lcDBObj) {

    lcDBObj = docUtils.prepareData(lcDBObj);

    var definition = {
        pageMargins: [ 5, 60, 5, 60 ],
        styles: docUtils.docStyles,
        content: [
            {
                text: "\"2024, año de Felipe Carrillo Puerto, Benemérito, Revolucionario y defensor del Mayab\"",
                alignment: 'center',
                fontSize: 8,
                margin: [0,0,0,10]
            },
            {
                text: "AUTORIZACIÓN DE RÉGIMEN DE PROPIEDAD EN CONDOMINIO",
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
                                            {
                                                text: lcDBObj.legalRepresentative ? [{text: ' a través del C. '}, {text: lcDBObj.legalRepresentative, bold: true}, { text: `, en su carácter de ${lcDBObj.licenseSpecialData.representativeAs}`}] : ''
                                            },', solicita la ',
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
                    {text: ['El Instituto Municipal de Desarrollo Urbano y Vivienda, es competente para conocer y resolver la solicitud de',{text: 'AUTORIZACIÓN DE RÉGIMEN DE PROPIEDAD EN CONDOMINIO', bold: true},', para ',{text: lcDBObj.licenseSpecialData.households, bold: true},'ubicadas en los ',{text: docUtils.arrayToText(lcDBObj.licenseSpecialData.lotes), bold: true},' de la ',{text: docUtils.arrayToText(lcDBObj.licenseSpecialData.manzanas), bold: true},', dentro del fraccionamiento “',{text: lcDBObj.colony, bold: true},'”, con fundamento en lo previsto en los Artículos 27º y 115º  de la Constitución Política de los Estados Unidos Mexicanos; 1, 10 fracción  XXV, 40 Y 43 de la Ley General de Asentamientos Humanos, Ordenamiento Territorial y Desarrollo Urbano; 10 y 71  fracción XLV de la Constitución Política del Estado de Hidalgo; 1, 7, 8, 69 fracción VIII, 83, 104, 405, 406, 107 y 108 del Reglamento de la Ley de Asentamientos Humanos y Desarrollo Urbano del Estado de Hidalgo y los Artículos 1, 4, 6, 7, 8, 9, 10, 13, 52 y 53 de la Ley de Propiedad en Condominio de Inmuebles para el Estado de Hidalgo.\n\n']},
                    {text: ['Para respaldar su solicitud de ',{text: lcDBObj.requestorName, bold: true},{
                        text: lcDBObj.legalRepresentative ? [{text: ' a través del C. '}, {text: lcDBObj.legalRepresentative, bold: true}, { text: `, en su carácter de ${lcDBObj.licenseSpecialData.representativeAs}`}] : ''
                    },', presentó el plano arquitectónico del inmueble objeto del Régimen de Propiedad en Condominio, con las características que establece la Ley de Propiedad en Condominio de Inmuebles para el Estado de Hidalgo vigente en la entidad, misma que reúne todos y cada uno de los elementos que este precepto legal exige, comprende ',{text: `${lcDBObj.licenseSpecialData.privateSurface} m²`, bold: true},' de áreas privativas y ',{text: `${lcDBObj.licenseSpecialData.commonSurface} m²`, bold: true},' de área común, según plano autorizado se desglosa de la siguiente manera: m']}
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
                                stack: await docUtils.loadChart(lcDBObj.fullInvoice, 'tabla_s1_')
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
                                stack: await docUtils.loadChart(lcDBObj.fullInvoice, 'tabla_s2_')
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
                    'Los condóminos de las porciones del inmueble objeto de esta autorización deberán sujetarse a lo establecido en la Ley de Propiedad en Condominio de Inmuebles para el Estado de Hidalgo y al Reglamento Interno.\n\n',
                    {text: [{text:'En  virtud de que el '},{text: lcDBObj.requestorName, bold: true},{
                        text: lcDBObj.legalRepresentative ? [{text: ' a través del C. '}, {text: lcDBObj.legalRepresentative, bold: true}, { text: `, en su carácter de ${lcDBObj.licenseSpecialData.representativeAs}`}] : ''
                    },{text:', ha cumplido con los requisitos de la Ley de Propiedad en Condominio de Inmuebles para el Estado de Hidalgo vigente en sus numerales 1, 4, 6, 7, 8, 9, 10, 13, 52 y 53, así como lo dispuesto por los artículos 1, 66 fracción VIII, 104, 105, 107 y 108 del Reglamento de la Ley de Asentamiento Humanos, Desarrollo Urbano y Ordenamiento Territorial del Estado de Hidalgo, resuelve que es procedente la autorización de: RÉGIMEN DE PROPIEDAD EN CONDOMINIO para '},{text: lcDBObj.licenseSpecialData.households, bold: true},{text:' ubicadas en los '},{text: docUtils.arrayToText(lcDBObj.licenseSpecialData.lotes), bold: true},{text:' de la '},{text: docUtils.arrayToText(lcDBObj.licenseSpecialData.manzanas), bold: true},{text:', dentro del fraccionamiento '},{text: `"${lcDBObj.colony}"`, bold: true},{text:', ubicado en el municipio de Tizayuca, Estado de Hidalgo.'},]}
                    /*'LOS HÉROES TIZAYUCA”'*/
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
                                    'En caso de que se transmita parte o la totalidad del inmueble, tal operación se realizará tomando en consideración todas y cada una de las obligaciones que se derivan de la presente resolución y conforme a lo establecido en  los  artículos  7,  63,  64, 65 y 66 de la Ley de Propiedad en Condominio de Inmuebles para el Estado de Hidalgo.\n\n'
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
                                    'Deberá atender lo señalado en los artículos 3, 7, 10, 11 y 12 de la Ley de Propiedad en Condominio de Inmuebles para el Estado de Hidalgo.\n\n'
                                ]},
                                {text: [
                                    {text: 'SEGUNDO. ', bold: true},
                                    'Deberá satisfacer todas y cada una de las obligaciones y derechos derivados del Régimen, de Propiedad de Condominio  comprendidas  en los artículos  22,  52,  53,  54,  55,  57,  61  de  la  Ley de Propiedad en Condominio de Inmuebles para el Estado  de  Hidalgo.\n\n'
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
                                    {ul: lcDBObj.licenseSpecialData.conditions}
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
                            {text: "Lo anterior con fundamento en lo dispuesto en los artículos 27 párrafo tercero, 73 fracción XXIX-c, 115 fracción V, inciso d y e, de la Constitución Política de los Estados Unidos Mexicanos; artículos 115, 141, fracción XVII, incisos a, c, d, e y g de la Constitución Política para el Estado de Hidalgo; los artículos 1 fracción IV, 6,, fracción II, II, XII, XV y XVII, 52 fracción I y VII, 59, 60, 66 y 68 de la Ley General de Asentamientos Humanos, Ordenamiento Territorial y Desarrollo Urbano; los artículos 1, 2, 4 fracción XIX, 5, 7, 8 fracción VII, 9, fracción I y V, 54, 55, 56, 132, 133, 134, 135, 136, 137, 138, 139, 146, 147, 156 fracción VI, 159 y demás aplicables de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial para el Estado de Hidalgo; artículos 25, 32, 69 y 71 y demás aplicables del Reglamento de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial para el Estado de Hidalgo; artículos 56 fracción I inciso p, fracción II inciso k, 60 fracción I inciso h, II inciso e, f, g y m, 117 fracción IV de la Ley Orgánica Municipal del Estado de Hidalgo; a efecto de dar cumplimiento a lo ordenado por el seno del cabildo y la creación del Instituto Municipal de Desarrollo Urbano y Vivienda, Tizayuca, Estado de Hidalgo, con fecha 15 de agosto de 2006, y habiéndose publicado la versión abreviada en el Periódico Oficial del estado el 28 de agosto y 04 de diciembre de 2006, y la actualización del Programa Municipal de Desarrollo Urbano y Ordenamiento Territorial de Tizayuca, Hidalgo publicado en el Periódico Oficial de Gobierno del Estado de Hidalgo en el tomo CLIV alcance uno al Periódico Oficial de fecha 28 de noviembre de 2022, mismo que se encuentra inscrito en el Registro Público de la Propiedad y del Comercio del Distrito Judicial de Tizayuca, Estado de Hidalgo, bajo el Acto publicitario No. 2,194 con Registro de entrada 26250-2022-0, con fecha de asiento 07 de diciembre de 2022.", style: 'regular', alignment: 'justify'
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
                            {text: "MEDIDAS PREVENTIVAS", style: 'headTB', border: docUtils.borderless}
                        ],
                        [
                            {
                                style: 'regular',
                                text: [{text: 'ÚNICA. ', bold: true},{text: 'En caso de que '},{text: lcDBObj.requestorName, bold: true},{
                                    text: lcDBObj.legalRepresentative ? [{text: ' a través del C. '}, {text: lcDBObj.legalRepresentative, bold: true}, { text: `, en su carácter de ${lcDBObj.licenseSpecialData.representativeAs}`}] : ''
                                },{text: ' no de cumplimiento a las disposiciones de la presente resolución o pase por alto las previsiones que establece la  Ley de Propiedad en Condominio de Inmuebles para el Estado de Hidalgo, la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial del Estado de Hidalgo; así como la Ley Estatal del Procedimiento Administrativo y demás Leyes aplicables, se le sancionará de acuerdo a lo que éstas establecen en sus respectivos capítulos, con las consecuencias jurídicas que procedan, llegando incluso a la revocación de la presente autorización.\nPor lo anterior expuesto y fundado se:'}]
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
                            {text: "RESUELVE", style: 'headTB', border: docUtils.borderless}
                        ],
                        [
                            {
                                style: 'regular',
                                text: [{text: 'PRIMERO. ', bold: true},{text: 'El Instituto Municipal de Desarrollo Urbano y Vivienda, resulta ser competente para el trámite en resolución de la solicitud de la autorización de '},{text: 'RÉGIMEN DE PROPIEDAD EN CONDOMINIO', bold: true},{text: ', que dio origen a este trámite.\n\n'},
                                    {text: 'SEGUNDO. ', bold: true},{text: 'A través de esta resolución y previo pago de los derechos, se autoriza el '},{text: 'RÉGIMEN DE PROPIEDAD EN CONDOMINIO, LIBRO DE ACTAS Y REGLAMENTO INTERNO DE CONDOMINIO ', bold: true},{text: lcDBObj.licenseSpecialData.households},{text: ' ubicadas en los '},{text: docUtils.arrayToText(lcDBObj.licenseSpecialData.lotes), bold: true},{text: ' de la '},{text: docUtils.arrayToText(lcDBObj.licenseSpecialData.manzanas), bold: true},{text: ', del fraccionamiento '},{text: `"${lcDBObj.colony}"`, bold: true},{text: ', ubicado en el municipio de Tizayuca, Estado de Hidalgo, que comprende '},{text: `${lcDBObj.licenseSpecialData.privateSurface} m² de áreas privativas y ${lcDBObj.licenseSpecialData.commonSurface} m² de área común.\n\n`, bold: true},
                                    {text: 'TERCERO. ', bold: true},{text: 'Remítase copia de la presente resolución, adjuntando plano del Régimen de Propiedad en Condominio, autorizado con sello y firmas al Registro Público de la Propiedad y del Comercio del Distrito Judicial de Tizayuca Hidalgo.\n\n'},
                                    {text: 'CUARTO. ', bold: true},{text: 'Deberá presentar copia de la protocolización del Régimen de Propiedad en Condominio una vez inscrito en el Registro Público de la Propiedad y del Comercio al Instituto Municipal de Desarrollo Urbano y Vivienda.'}]
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
                        margin: [0,10,0,10]
                    },
                    {
                        columns: [
                            docUtils.signaturePresident(lcDBObj.approvalStatus),
                            docUtils.signatureSeal(lcDBObj.approvalStatus),
                            docUtils.signatureDirector(lcDBObj.approvalStatus)
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
                            text: 'M.A.C.I.G. HIPÓLITO ZAMORA SORIA.\nDIRECTOR GENERAL DEL INSTITUTO MUNICIPAL\nDE DESARROLLO URBANO Y VIVIENDA.',
                            style: 'labelTC'
                        }
                        ]
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