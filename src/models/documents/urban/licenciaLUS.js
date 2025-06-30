import { __dirstorage } from "../../../path.configuration.js";
import * as docUtils from "../../../utilities/document.utilities.js";

export async function generateUrbanLUS(lcDBObj) {

    lcDBObj = docUtils.prepareData(lcDBObj);

    const INSTITUTE_DIRECTOR_SIGNATURE = await docUtils.getDirectorNameSignature(lcDBObj.requestDate);
    const LICENSES_DIRECTOR = await docUtils.getLicensesDirectorName(lcDBObj.requestDate);
    const MUNICIPAL_PRESIDENT = await docUtils.getPresidentName(lcDBObj.requestDate);

    const planos = [
        docUtils.fieldLU("PLANO 03PE01 - POLÍTICAS TERRITORIALES", docUtils.borderless, 4, 'boldCenter', 7),
        {},{},{},
        docUtils.fieldLU("PLANO 03PE10 - ETAPAS DE DESARROLLO", docUtils.borderless, 4, 'boldCenter', 7),
        {},{},{},
        docUtils.fieldLU("PLANO 03PE09 - ZONIFICACIÓN SECUNDARIA", docUtils.borderless, 4, 'boldCenter', 7),
        {},{},{}
    ]

    // plazo PCU CLAVE
    const PPC = [
        {text: 'Plazo: ', style: 'labelTC', border: docUtils.borderless},
        docUtils.fieldLU(lcDBObj.term.licenseTerm, docUtils.borderless, 3, 'boldCenter', 7),
        {},{},
        {text: 'P.C.U.: ', style: 'labelTC', border: docUtils.borderless},
        docUtils.fieldLU(lcDBObj.licenseSpecialData.PCU, docUtils.borderless, 3, 'boldCenter', 7),
        {},{},
        {text: 'Clave: ', style: 'labelTC', border: docUtils.borderless},
        docUtils.fieldLU(lcDBObj.zone.licenseKey, docUtils.borderless, 3, 'boldCenter',7),
        {},{}
    ]

    //Uso de suelo autorizado y actividad
    const USAA = [
        {text: 'Uso de suelo autorizado: ', style: 'labelTC', border: docUtils.borderless, colSpan: 2},
        {},
        docUtils.fieldLU(lcDBObj.licenseSpecialData.authUse, docUtils.borderless, 4, 'boldCenter',7),
        {},
        {},
        {},
        {text: 'Actividad: ', style: 'labelTC', border: docUtils.borderless, colSpan: 2},
        {},
        docUtils.fieldLU(lcDBObj.licenseSpecialData.activity, docUtils.borderless, 4, 'boldCenter',7),
        {},
        {},
        {}
    ]

    const compatibilities = [
        [
            {text: 'Uso de suelo permitido:', style: 'labelTC', border: docUtils.borderless, colSpan: 3},
            {},{},
            docUtils.fieldLU(lcDBObj.zone.licenseZone, docUtils.borderless, 9, 'boldCenter', 7),
            {},{},{},{},{},{},{},{}
        ],
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
            {text: 'Estacionamientos:', style: 'labelTC', border: docUtils.borderless, colSpan: 2},
            {},
            docUtils.fieldLU(lcDBObj.licenseSpecialData.parkingLots, docUtils.borderless, 2, 'boldCenter', 7),
            {}
        ]
    ]

    if (lcDBObj.licenseSpecialData.isFrac) {
        compatibilities.splice(1, 0, USAA);
        compatibilities.unshift(PPC);
        compatibilities.unshift(planos);
    }

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
                                    widths: [70, '*'],
                                    body: [
                                        [
                                            {text: 'Nombre: ', style: 'labelT', border: docUtils.borderless},
                                            docUtils.fieldLU(lcDBObj.requestorName, docUtils.borderless, null,'boldCenter', 7)
                                        ],
                                        [
                                            {text: 'Domicilio: ', style: 'labelT', border: docUtils.borderless},
                                            docUtils.fieldLU(lcDBObj.licenseSpecialData.requestorAddress, docUtils.borderless, null,'boldCenter', 7),
                                        ],
                                        docUtils.generateLegalRepresentativeField(lcDBObj.legalRepresentative, lcDBObj.licenseSpecialData.representativeAs),
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
                                            docUtils.fieldLU(lcDBObj.buildingAddress, docUtils.borderless, 1, 'boldCenter', 7)
                                        ],
                                        [
                                            {text: 'Clave Catastral: ', style: 'labelT', border: docUtils.borderless},
                                            docUtils.fieldLU(lcDBObj.catastralKey, docUtils.borderless, 1, 'boldCenter', 6),
                                        ],
                                        [
                                            {text: 'Superficie Total: ', style: 'labelT', border: docUtils.borderless},
                                            docUtils.fieldLU(`${lcDBObj.surfaceTotal} m²`, docUtils.borderless, 1, 'boldCenter', 7)
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
                                    body: compatibilities
                                },
                                layout: docUtils.formLayout
                            }
                        ]
                    ]
                },
                layout: docUtils.containerLayout
            },
            lcDBObj.licenseSpecialData.isFrac ? {
                style: 'formRow',
                table: {
                    widths: ['*'],
                    body: [
                        [{text: "ÁREA DE DONACIÓN", style: 'headT', border: docUtils.borderless}],
                        [
                            {
                                text: [
                                    {text: 'Con base al'},
                                    {text: ' artículo 80 ', bold: true},
                                    {text: 'fracción VII del Reglamento de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial para el Estado de Hidalgo, el área de donación para este tipo de desarrollo sera: '},
                                    {text: `${lcDBObj.licenseSpecialData.donationArea}`, bold: true}
                                ],
                                lineHeight: 1.5,
                                fontSize: 6,
                                alignment: 'justify'
                            }
                        ]
                    ]
                },
                layout: docUtils.containerLayout
            }
            :
            {},
            lcDBObj.licenseSpecialData.isFrac ?
            {
                style: 'formRow',
                table: {
                    widths: ['*', 5, '*'],
                    body: [
                        [
                            {text: "CUADRO DE SUPERFICIES POR USO DE SUELO", style: 'headT', border: docUtils.borderless, margin: [0, 3, 0, 3]},
                            {text: '',border: docUtils.borderless},
                            {text: "OBSERVACIONES", style: 'headT', border: docUtils.borderless, margin: [0, 3, 0, 3]}
                        ],
                        [
                            {
                                margin: [0,5,0,0],
                                border: docUtils.borderless,
                                table: {
                                    widths: ['*','*','*'],
                                    body: [
                                        [
                                            {text: "Área total del terreno", style: 'labelTC', border: [false, true, false, false]},
                                            {text: "Uso de suelo", style: 'labelTC', border: [false, true, false, false]},
                                            {text: "%", style: 'labelTC', border: [false, true, false, false]}
                                        ],
                                        [
                                            {text: `${lcDBObj.surfaceTotal} m²`, style: ['center', 'regular'], border: [false, true, false, true]},
                                            {text: lcDBObj.zone.licenseZone, style: ['center', 'regular'], border: [false, true, false, true]},
                                            {text: '100', style: ['center', 'regular'], border: [false, true, false, true]}
                                        ]
                                    ]
                                },
                                layout: docUtils.containerLayout
                            },
                            {
                                text: '',border: docUtils.borderless
                            },
                            {
                                margin: [3, 3, 3, 3],
                                ul: lcDBObj.licenseSpecialData.observations ? lcDBObj.licenseSpecialData.observations : [],
                                lineHeight: 1.5,
                                fontSize: 6,
                                alignment: 'justify'
                            }
                        ]
                    ]
                },
                layout: docUtils.NoPadding
            }
            :
            {
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
                            {text: `${lcDBObj.surfaceTotal} m²`, style: ['center', 'regular']},
                            {text: lcDBObj.zone.licenseZone, style: ['center', 'regular']},
                            {text: '100', style: ['center', 'regular']}
                        ]
                    ]
                },
                layout: docUtils.containerLayout
            },
            {
                margin: [0, 10, 0, 20],
                style: ['formRow', 'regular'],
                text: [
                    {
                        text: 'La autorización de licencia de uso de suelo: tiene como objeto autorizar el uso de suelo o destino de un predio o inmueble, estableciendo sus condiciones de aprovechamiento de conformidad con los programas, reglamentos y normatividad aplicable en materia de desarrollo urbano y ordenamiento territorial\n\n',
                        bold: true,
                        alignment: 'center'
                    },
                    'El solicitante, con los documentos anexados a su escrito inicial, ha dado cumplimiento con los requisitos técnicos y legales que obran en el expediente radicado en este Instituto Municipal de Desarrollo Urbano y Vivienda, acredita la propiedad del inmueble motivo de la solicitud de Licencia de Uso de Suelo.Personal técnico adscrito al referido Instituto, realizó visita de inspección en campo al inmueble del que solicita la Licencia de Uso de Suelo, emitiendo opinión técnica positiva.'],
                alignment: 'justify',
                lineHeight: 1.5
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
                stack: [
                    {
                        text:`NOTIFÍQUESE Y CÚMPLASE\nASÍ EN DEFINITIVA LO RESOLVIÓ Y AUTORIZÓ ${MUNICIPAL_PRESIDENT}, PRESIDENTE MUNICIPAL CONSTITUCIONAL DE TIZAYUCA, HIDALGO Y\n${INSTITUTE_DIRECTOR_SIGNATURE}, DIRECTOR(A) GENERAL DEL INSTITUTO MUNICIPAL DE DESARROLLO URBANO Y VIVIENDA`,
                        style: 'boldCenter',
                        fontSize: 7,
                        margin: [0,10,0,lcDBObj.licenseSpecialData.isFrac ? 20 : 50]
                    },
                    {
                        columns: [
                            {width: 50,
                                text: ''},
                            {
                            text: `${MUNICIPAL_PRESIDENT}\nPRESIDENTE MUNICIPAL CONSTITUCIONAL\nDE TIZAYUCA, HIDALGO.`,
                            style: 'labelTC',
                            fontSize: 8
                        },
                        {width: 0,
                            text: ''},
                        {
                            text: `${INSTITUTE_DIRECTOR_SIGNATURE}\nDIRECTOR(A) GENERAL DEL INSTITUTO MUNICIPAL\nDE DESARROLLO URBANO Y VIVIENDA.`,
                            style: 'labelTC',
                            fontSize: 8
                        },
                        {width: 50,
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
                            {text: `MAPA DE ZONIFICACIÓN - ${lcDBObj.geoReference}`, style: 'headT', border: docUtils.borderless, margin:[1,2,1,2]}
                        ],
                        [
                            await docUtils.fileExist(lcDBObj.fullInvoice, 'urban')
                            /*{
                                text: 'IMG'
                                border: docUtils.borderless,
                                image: await docUtils.fileExist(lcDBObj.fullInvoice, 'urban'),
                                width: 580,
                                alignment: 'center'
                            }*/
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
                        [{ text: "CONDICIONANTES", style: 'headT', border: docUtils.borderless }],
                        [
                            {
                                stack: [
                                    {
                                        type: 'lower-alpha',
                                        ol: lcDBObj.licenseSpecialData.conditions ? lcDBObj.licenseSpecialData.conditions : [],
                                        fontSize: 6,
                                        alignment: 'justify'
                                    },
                                    {
                                        text: "El Instituto Municipal de Desarrollo Urbano y Vivienda se reserva el derecho de revocar la presente, en caso de incumplimiento a cualquiera de las condiciones establecidas en la misma.", bold: true, fontSize: 6, alignment: "center"
                                    }
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
                        [{text: "PROHIBICIONES Y SANCIONES", style: 'headT', border: docUtils.borderless}],
                        [
                            {
                                type: 'lower-alpha',
                                ol: lcDBObj.licenseSpecialData.restrictions ? lcDBObj.licenseSpecialData.restrictions : [],
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