import { __dirstorage } from "../../../path.configuration.js";
import * as docUtils from "../../../utilities/document.utilities.js";

export async function generateUrbanRLF(lcDBObj) {

    lcDBObj = docUtils.prepareData(lcDBObj);

    const INSTITUTE_DIRECTOR_SIGNATURE = await docUtils.getDirectorNameSignature(lcDBObj.requestDate);
    const INSTITUTE_DIRECTOR_TITTLE = await docUtils.getDirectorNameTittle(lcDBObj.requestDate);
    const LICENSES_DIRECTOR = await docUtils.getLicensesDirectorName(lcDBObj.requestDate);
    const MUNICIPAL_PRESIDENT = await docUtils.getPresidentName(lcDBObj.requestDate);

    var definition = {
        pageMargins: [ 5, 60, 5, 60 ],
        styles: docUtils.docStyles,
        content: [
            {
                text: await docUtils.getYearLegend(lcDBObj.year),
                alignment: 'center',
                fontSize: 8,
                margin: [0, 0, 0, 10],
            },
            {
                text: "RELOTIFICACIÓN DE FRACCIONAMIENTO",
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
                                    widths: [70, '*'],
                                    body: [
                                        [
                                            {text: 'Nombre: ', style: 'labelT', border: docUtils.borderless},
                                            docUtils.field(lcDBObj.requestorName, docUtils.borderless, null,'center', 7)
                                        ],
                                        docUtils.generateLegalRepresentativeField(lcDBObj.legalRepresentative, lcDBObj.licenseSpecialData.representativeAs),
                                        [
                                            {text: 'Domicilio: ', style: 'labelT', border: docUtils.borderless},
                                            docUtils.field(lcDBObj.licenseSpecialData.requestorAddress, docUtils.borderless, null,'center', 7),
                                        ],
                                        [
                                            {text: 'Fecha de Solicitud: ', style: 'labelT', border: docUtils.borderless},
                                            docUtils.field(docUtils.dateFormatFull(lcDBObj.requestDate), docUtils.borderless, null,'center', 7),
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
                                            docUtils.field(lcDBObj.licenseSpecialData.buildingAddress, docUtils.borderless, 1, 'center', 7)
                                        ],
                                        [
                                            {text: 'Manzana y lotes: ', style: 'labelT', border: docUtils.borderless},
                                            docUtils.field(docUtils.arrayToText(lcDBObj.licenseSpecialData.lotes), docUtils.borderless, 1, 'center', 7)
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
                            {text: "RESULTADOS", style: 'headTB', border: docUtils.borderless}
                        ],
                        [
                            {
                                style: ['regular', 'justify'],
                                stack: [
                                    {
                                        text: [
                                            {text: lcDBObj.requestorName, bold: true},
                                            {
                                                text: lcDBObj.legalRepresentative ? [{text: ' a través del C. '}, {text: lcDBObj.legalRepresentative, bold: true}, { text: `, en su carácter de ${lcDBObj.licenseSpecialData.representativeAs}`}] : ''
                                            },
                                            ', solicita la ',
                                            {text: 'Relotificación de Fraccionamiento', bold: true},
                                            ' de ',
                                            {text: docUtils.arrayToText(lcDBObj.licenseSpecialData.lotes), bold: true},
                                            ' del desarrollo denominado ',
                                            ,{text: `“${lcDBObj.colony}”`, bold: true}, ' ubicado en ',{text: docUtils.arrayToText(lcDBObj.licenseSpecialData.location), bold: true},
                                            ', Hidalgo, acompañado para efectos los siguientes documentos:\n\n'
                                        ]
                                    },
                                    {
                                        ul: lcDBObj.licenseSpecialData.documents
                                    },
                                    {
                                        text: '\nUna vez analizados los antecedentes descritos el Instituto Municipal de Desarrollo Urbano y Vivienda, de Tizayuca, Hidalgo, resuelve en definitiva sobre la Autorización de Relotificación de Licencia de Fraccionamiento objeto de la presente resolución en atención a los siguientes:'
                                    }
                                ]
                            }
                        ]
                    ]
                },
                layout: docUtils.containerLayout
            },
            {
                table: {
                    widths: ['*'],
                    body: [
                        [
                            {text: "CONSIDERANDOS", style: 'headTB', border: docUtils.borderless}
                        ]
                    ]
                },
                layout: docUtils.containerLayout
            },
            {
                style: ['formRow', 'regular'],
                ol: [
                    {
                        text: [
                            'De lo anterior se desprende que el Instituto Municipal de Desarrollo Urbano y Vivienda del Municipio de Tizayuca, Hidalgo, es competente para conocer y resolver la solicitud de autorización de ',
                            {text: 'RELOTIFICACIÓN DE FRACCIONAMIENTO', bold: true}, 
                            ' para ',
                            {text: docUtils.arrayToText(lcDBObj.licenseSpecialData.lotes), bold: true},
                            ', para el fraccionamiento denominado ',
                            {text: `“${lcDBObj.colony}”`, bold: true},
                            ' planteada conforme al Reglamento de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial del Estado de Hidalgo, en su artículo 69 fracción V, VI y VII.\n\n']
                    },
                    {
                        text: [
                        'La autorización de ',
                        {text: 'RELOTIFICACIÓN DE FRACCIONAMIENTO', bold: true},
                        ': tiene por objeto dar cumplimiento a los trabajos en las manzanas y lotes citados, así como las obligaciones de las obras de urbanización faltantes a realizar que le permitan la dotación de infraestructura, equipamiento y servicios urbanos, conforme a las autorizaciones y disposiciones del Programa Municipal de Desarrollo Urbano y Ordenamiento Territorial de Tizayuca, Hidalgo.\n\n'
                        ]
                    },
                    {
                        text: [
                            'La autorización se otorga para la relotificación del fraccionamiento denominado ',{text: `“${lcDBObj.colony}”`, bold: true},
                            ' teniendo como situación actual la ',
                            {text: docUtils.arrayToText(lcDBObj.licenseSpecialData.lotes), bold: true},
                            ', concluyendo con una totalidad de ',
                            {text: lcDBObj.licenseSpecialData.totalRelotification, bold: true},
                            ' relotificados, quedando ',
                            {text: docUtils.arrayToText(lcDBObj.licenseSpecialData.resultRelotification), bold: true},
                            '; de acuerdo con tablas resumen de relotificación y al plano de relotificación que se anexa y que ahora forma parte integral de la misma.\n\n'
                        ]
                    },
                    {
                        text: [
                            'Dentro de las obligaciones de ',
                            {text: lcDBObj.requestorName, bold: true},
                            {
                                text: lcDBObj.legalRepresentative ? [{text: ' a través del C. '}, {text: lcDBObj.legalRepresentative, bold: true}, { text: `, en su carácter de ${lcDBObj.licenseSpecialData.representativeAs}`}] : ''
                            },
                            ', deberá satisfacer todas y cada una de las obligaciones comprendida en la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial del Estado de Hidalgo y su reglamento, las cuales de manera enunciativa mas no limitativa se detallan a continuación:'
                        ]
                    }
                ]
            },
            {
                pageBreak: lcDBObj.licenseSpecialData.pageBreak_1 == 1 ? 'before' : 'avoid',
                style: 'formRow',
                table: {
                    widths: ['*'],
                    body: [
                        [
                            {text: "DATOS GENERALES", style: 'headT', border: docUtils.borderless}
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
                pageBreak: lcDBObj.licenseSpecialData.pageBreak_2 == 1 ? 'before' : 'avoid',
                style: 'formRow',
                table: {
                    widths: ['*'],
                    body: [
                        [
                            {text: "TABLAS RESUMEN DE RELOTIFICACIÓN", style: 'headT', border: docUtils.borderless}
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
                pageBreak: lcDBObj.licenseSpecialData.pageBreak_3 == 1 ? 'before' : 'avoid',
                style: 'formRow',
				keepWithHeaderRows: 1,
                table: {
                    widths: ['*'],
                    body: [
                        [
                            {text: "OBLIGACIONES DEL FRACCIONADOR", style: ['headTB', 'tableHeader'], border: docUtils.borderless}
                        ],
                        [
                            {
                                style: 'regular',
                                stack: [
                                    {
                                        text: [{text: 'Primera.- ', bold: true},'La presente resolución y los planos autorizados que la integran, deberán ser mostrados al personal de este Instituto, cuando se constituyan en el lugar para realizar la Inspección establecida por la ley en la materia.\n\n']
                                    },
                                    {
                                        text: [{text: 'Segunda.- ', bold: true}, 'El área de donación o equipamiento se deberá escriturar a favor del Municipio de Tizayuca, Hgo., de acuerdo al artículo 66 del Reglamento de la Ley Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial del Estado de Hidalgo y su Reglamento.\n\n']
                                    },
                                    {
                                        text: [{text: 'Tercera.- ', bold: true}, 
                                            {text: lcDBObj.requestorName, bold: true},
                                            {
                                                text: lcDBObj.legalRepresentative ? [{text: ' a través del C. '}, {text: lcDBObj.legalRepresentative, bold: true}, { text: `, en su carácter de ${lcDBObj.licenseSpecialData.representativeAs}`}] : ''
                                            },', deberá satisfacer todas y cada una de las obligaciones comprendidas en el cuerpo de la Licencia de Fraccionamiento, expedida por el Instituto Municipal de Desarrollo Urbano y Vivienda, mediante expediente número ',{text: lcDBObj.licenseSpecialData.previousInvoice, bold: true}, ' de fecha ',
                                            docUtils.dateFormatFull(lcDBObj.licenseSpecialData.previousInvoiceDate), '.'
                                        ]
                                    }
                                ]
                            }
                        ]
                    ]
                },
                layout: docUtils.containerLayout
            },
            {
                pageBreak: lcDBObj.licenseSpecialData.pageBreak_4 == 1 ? 'before' : 'avoid',
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
                                    {text: 'Deberá presentar la siguiente documentación en los plazos que a continuación se indican:\n\n'},
                                    {ul: lcDBObj.licenseSpecialData.conditions.join('\n\n*').split('*')}
                                ]
                            }
                        ]
                    ]
                },
                layout: docUtils.containerLayout
            },
            {
                pageBreak: lcDBObj.licenseSpecialData.pageBreak_5 == 1 ? 'before' : 'avoid',
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
                                        {text: 'Primera.- ', bold: true},
                                        'De acuerdo a lo establecido en el artículo 94 del Reglamento de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial,',{text: ' no podrá enajenar ni celebrar contratos de promesa de los lotes del fraccionamiento hasta en tanto no se concluyan totalmente las obras de urbanización, pudiendo disponer de los lotes en venta únicamente correspondientes a las etapas terminadas y sean aprobadas por el Instituto Municipal de Desarrollo Urbano y Vivienda, de Tizayuca, Hidalgo.', bold: true},' En caso de que se transfiera parte o la totalidad del inmueble la operación se realizará tomando en consideración todas y cada una de las obligaciones que se derivan de la presente resolución, debiendo notificar a este Instituto Municipal de Desarrollo Urbano y Vivienda, de Tizayuca, Hidalgo, en un plazo no mayor a 5 días hábiles a partir de que se realice el cambio de propietario para los efectos legales y administrativos procedentes. En caso de hacer una o más ventas parciales, el Propietario será el responsable de la integración de cada uno de los conceptos señalados en el aspecto referente a la urbanización.\n\n'
                                    ]},
                                    {text: [
                                        {text: 'Segunda.- ', bold: true},
                                        'El fraccionador será responsable por la venta de los lotes a terceros y de los daños y perjuicios que de ellos se deriven, así como de la obra civil y/o vivienda ofertada, eximiendo a Instituto Municipal de Desarrollo Urbano y Vivienda, de Tizayuca, Hidalgo, de toda responsabilidad derivada de esas operaciones, quedando obligado en los términos del presente documento a informar al Registro Público de la Propiedad y del Comercio del Distrito Judicial de Tizayuca, de toda venta pactada.\n\n'
                                    ]},
                                    {text: [
                                        {text: 'Tercera.- ', bold: true},
                                        'Para que se constituyan las obras de urbanización y de vivienda ofertada en la superficie que se autoriza en este documento, deberá tramitar y obtener las Licencia de Construcción emitida por la Secretaria de Obras Públicas Municipal de Tizayuca, debiendo presentar para dicho trámite copia de los proyectos ejecutivos de agua potable y drenaje, con la aprobación correspondiente, así como de las especificaciones de los materiales a utilizar en la urbanización del  Fraccionamiento, de igual manera una fianza a favor del municipio, por el 25% de las obras de urbanización, que garantice las construcción de las mismas.\n\n'
                                    ]},
                                    {text: [
                                        {text: 'Cuarta.- ', bold: true},
                                        'Los Notarios, se abstendrán de autorizar escrituras públicas traslativas de dominio y certificar copias o ratificar firmas relativas al Fraccionamiento; los registradores públicos se abstendrán de inscribir los títulos señalados y la dirección de Ingresos e impuesto predial de la Presidencia Municipal de Tizayuca, Hgo; no realizará cobro de traslación de dominio sobre lotes del Fraccionamiento, como lo establece el Titulo Cuarto Capítulo I, de la sección cuarta  de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial del Estado de Hidalgo, hasta en tanto se obtenga la autorización.'
                                    ]}
                                ]
                            }
                        ]
                    ]
                },
                layout: docUtils.containerLayout
            },
            {
                pageBreak: lcDBObj.licenseSpecialData.pageBreak_6 == 1 ? 'before' : 'avoid',
                style: 'formRow',
                table: {
                    widths: ['*'],
                    body: [
                        [
                            {text: "MEDIDAS PREVENTIVAS", style: 'headTB', border: docUtils.borderless}
                        ],
                        [
                            {
                                style: ['regular', 'justify'],
                                border: docUtils.borderless,
                                text: [{text: 'ÚNICA. ', bold: true}, 'En caso de que ',{text: lcDBObj.requestorName, bold: true},
                                    {
                                        text: lcDBObj.legalRepresentative ? [{text: ' a través del C. '}, {text: lcDBObj.legalRepresentative, bold: true}, { text: `, en su carácter de ${lcDBObj.licenseSpecialData.representativeAs}`}] : ''
                                    },
                                    ' no de cumplimiento a las disposiciones de la presente resolución o pase por alto las previsiones que establece la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial del Estado de Hidalgo; así como la Ley Estatal del Procedimiento Administrativo y demás Leyes aplicables, se le sancionará de acuerdo a lo que éstas establecen en sus respectivos capítulos, con las consecuencias jurídicas que procedan, llegando incluso a la revocación de la presente autorización.\n\nPor lo anterior expuesto y fundado se:']
                            }
                        ]
                    ]
                },
                layout: docUtils.containerLayout
            },
            {
                pageBreak: lcDBObj.licenseSpecialData.pageBreak_7 == 1 ? 'before' : 'avoid',
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
                                text: [{text: 'PRIMERO. ', bold: true},'El Instituto Municipal de Desarrollo Urbano y Vivienda, de Tizayuca, Hidalgo;  resulto competente para conocer y dictaminar  en definitiva sobre la autorización de ', {text: 'RELOTIFICACIÓN DE FRACCIONAMIENTO', bold: true}, ' para ', {text: docUtils.arrayToText(lcDBObj.licenseSpecialData.lotes), bold: true}, ' del fraccionamiento denominado ',{text: `“${lcDBObj.colony}”`, bold: true},' , que dio origen a este trámite.\n\n',

                                {text: 'SEGUNDO. ', bold: true},'A través de esta resolución se autoriza la ', {text: 'RELOTIFICACIÓN DE FRACCIONAMIENTO', bold: true}, ' para ', {text: docUtils.arrayToText(lcDBObj.licenseSpecialData.lotes), bold: true}, ', del fraccionamiento denominado ',{text: `“${lcDBObj.colony}”`, bold: true},', ubicado en ', {text: lcDBObj.licenseSpecialData.location, bold: true},'\n\n',

                                {text: 'TERCERO. ', bold: true},'El uso de suelo autorizado para fraccionar es ',{text: lcDBObj.licenseSpecialData.detailedUse, bold: true},' para Desarrollo Habitacional, de acuerdo al Programa Municipal de Desarrollo Urbano y Ordenamiento Territorial de Tizayuca, Hidalgo.\n\n',

                                {text: 'CUARTO. ', bold: true}, 'Esta resolución no lo autoriza a realizar edificaciones, por lo que deberá solicitar la licencia de construcción correspondiente.\n\n',

                                {text: 'QUINTO. ', bold: true}, {text: lcDBObj.requestorName, bold: true}, {
                                    text: lcDBObj.legalRepresentative ? [{text: 'a través del C. '}, {text: lcDBObj.legalRepresentative, bold: true}, { text: `, en su carácter de ${lcDBObj.licenseSpecialData.representativeAs}`}] : ''
                                }, ', se obliga a entregar los documentos que se obtendrán con posterioridad como consecuencia del cumplimiento de sus obligaciones y la escritura de las áreas de donación a favor del Municipio de Tizayuca, Estado de Hidalgo, y escritura de protocolización de la presente resolución.\n\n',

                                {text: 'SEXTO. ', bold: true}, 'Remítase copia de la presente resolución, adjuntando plano del Fraccionamiento denominado ', {text: `“${lcDBObj.colony}”`, bold: true},', autorizado, con sello y firma al Registro Público de la propiedad y del Comercio, del distrito judicial de Tizayuca, estado de Hidalgo, de conformidad al artículo 156 fracción V de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial del Estado de Hidalgo.\n\n',

                                {text: 'SÉPTIMO. ', bold: true},'Se le apercibe a ',{text: lcDBObj.requestorName, bold: true}, 
                                {
                                    text: lcDBObj.legalRepresentative ? [{text: ' a través del C. '}, {text: lcDBObj.legalRepresentative, bold: true}, { text: `, en su carácter de ${lcDBObj.licenseSpecialData.representativeAs}`}] : ''
                                },' que de no dar cumplimiento a cualquiera de las obligaciones y prohibiciones señaladas en el cuerpo de la presente resolución o pase por alto las previsiones de la ley de la materia, se le aplicaran las sanciones que procedan y que son previstas en el Titulo IV, Capítulo I sección IV, relativo a fraccionamientos de la Ley de Asentamientos Humanos, Desarrollo Humano y Ordenamiento Territorial del Estado de Hidalgo y su Reglamento; ',{text: 'no se omite que la inobservancia de lo anterior faculte a esta autoridad a revocar la autorización concedida. ', bold: true}]
                            }
                        ]
                    ]
                },
                layout: docUtils.containerLayout
            },
            {
                pageBreak: lcDBObj.licenseSpecialData.pageBreak_8 == 1 ? 'before' : 'avoid',
                style: 'formRow',
                table: {
                    widths: ['*'],
                    body: [
                        [{text: "FUNDAMENTO JURÍDICO", style: 'headT', border: docUtils.borderless}],
                        [
                            {text: "Lo anterior con fundamento en lo dispuesto en los artículos 27 párrafo tercero, 73 fracción XXIX-c, 115 fracción V, inciso d y e, de la Constitución Política de los Estados Unidos Mexicanos; artículos 115, 141, fracción XVII, incisos a, c, d, e y g de la Constitución Política para el Estado de Hidalgo; los artículos 1 fracción IV, 6,, fracción II, II, XII, XV y XVII, 52 fracción I y VII, 59, 60, 66 y 68 de la Ley General de Asentamientos Humanos, Ordenamiento Territorial y Desarrollo Urbano; los artículos 1, 2, 4 fracción XIX, 5, 7, 8 fracción VII, 9, fracción I y V, 54, 55, 56, 132, 133, 134, 135, 136, 137, 138, 139, 146, 147, 156 fracción VI, 159 y demás aplicables de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial para el Estado de Hidalgo; artículos 25, 32, 69, 71, 80 y demás aplicables del Reglamento de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial para el Estado de Hidalgo; artículos 56 fracción I inciso p, fracción II inciso k, 60 fracción I inciso h, II inciso e, f, g y m, 117 fracción IV de la Ley Orgánica Municipal del Estado de Hidalgo; a efecto de dar cumplimiento a lo ordenado por el seno de cabildo la creación del Instituto Municipal de Desarrollo Urbano y Vivienda, con fecha 15 de agosto de 2006, y habiéndose publicado la versión abreviada en el Periódico Oficial del estado el 28 de agosto y 04 de diciembre de 2006, y de acuerdo con la actualización del Programa Municipal de Desarrollo Urbano y Ordenamiento Territorial de Tizayuca, Hidalgo publicado en el Periódico Oficial de Gobierno del estado de Hidalgo en el tomo CLIV alcance uno al Periódico Oficial de fecha 28 de noviembre de 2022, mismo que se encuentra inscrito en el Registro Público de la Propiedad y del Comercio del Distrito Judicial de Tizayuca, Estado de Hidalgo, bajo el Acto publicitario No. 2,194 con Registro de entrada 26250-2022-0, con fecha de asiento 07 de diciembre de 2022.", style: 'regularSmall', alignment: 'justify'
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
                            {},
                            {},
                            {},
                            {},
                            {},
                            {text: 'Folio de pago: ', style: 'labelTC', colSpan: 2},
                            {},
                            docUtils.field(lcDBObj.billInvoice, docUtils.borderless, 2, 'center',7),
                            {}]
                    ]
                },
                layout: docUtils.noBorderNoPadding
            },
            {
                pageBreak: 'avoid',
                stack: [
                    {
                        text:`NOTIFÍQUESE Y CÚMPLASE\nASÍ EN DEFINITIVA LO RESOLVIÓ Y AUTORIZÓ ${INSTITUTE_DIRECTOR_TITTLE},\nDIRECTOR GENERAL DEL INSTITUTO MUNICIPAL DE DESARROLLO URBANO Y VIVIENDA`,
                        style: 'center',
                        fontSize: 6,
                        margin: [0,10,0,100]
                    },
                    /*{
                        columns: [
                            docUtils.signaturePresident(lcDBObj.approvalStatus),
                            docUtils.signatureSeal(lcDBObj.approvalStatus),
                            docUtils.signatureDirector(lcDBObj.approvalStatus)
                        ]
                    },*/
                    {
                        columns: [
                            {
                            text: `${MUNICIPAL_PRESIDENT}.\nPRESIDENTA MUNICIPAL CONSTITUCIONAL\nDE TIZAYUCA, HIDALGO.`,
                            style: 'labelTC'
                        },
                        {
                            text: `${INSTITUTE_DIRECTOR_SIGNATURE}.\nDIRECTOR GENERAL DEL INSTITUTO MUNICIPAL\nDE DESARROLLO URBANO Y VIVIENDA.`,
                            style: 'labelTC'
                        }
                        ]
                    },
                    {
                        margin: [0,30,0,0],
                        columns: [
                            {
                                margin: [0,0,30,0],
                                text: `Revisó: ${LICENSES_DIRECTOR}`,
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