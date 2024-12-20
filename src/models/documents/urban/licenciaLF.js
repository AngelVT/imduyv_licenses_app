import { __dirstorage } from "../../../path.configuration.js";
import * as docUtils from "../../../utilities/document.utilities.js";

export async function generateUrbanLF(lcDBObj) {

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
                text: "LICENCIA DE FRACCIONAMIENTO",
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
                                    widths: [60, '*'],
                                    body: [
                                        [
                                            {text: 'Domicilio: ', style: 'labelT', border: docUtils.borderless},
                                            docUtils.field(lcDBObj.licenseSpecialData.buildingAddress, docUtils.borderless, 1, 'center', 7)
                                        ],
                                        [
                                            {text: 'Clave Catastral: ', style: 'labelT', border: docUtils.borderless},
                                            docUtils.field(lcDBObj.catastralKey, docUtils.borderless, 1, 'center', 6),
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
                    widths: ['*', 1, '*'],
                    body: [
                        [
                            {
                                border: docUtils.borderless,
                                table: {
                                    widths: [70, '*'],
                                    body: [
                                        [
                                            {text: 'Constancia de Uso de Suelo: ', style: 'labelT', border: docUtils.borderless},
                                            docUtils.field(lcDBObj.licenseSpecialData.urbanCUS, docUtils.borderless, 1, 'center', 6)
                                        ]
                                    ]
                                },
                                layout: docUtils.formLayout
                            },
                            {
                                text: '',border: docUtils.borderless
                            },
                            {
                                border: docUtils.borderless,
                                table: {
                                    widths: [70, '*'],
                                    body: [
                                        [
                                            {text: 'Licencia de Uso de Suelo: ', style: 'labelT', border: docUtils.borderless},
                                            docUtils.field(lcDBObj.licenseSpecialData.urbanLUS, docUtils.borderless, 1, 'center', 6)
                                        ]
                                    ]
                                },
                                layout: docUtils.formLayout
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
                                            docUtils.field(`${lcDBObj.licenseSpecialData.usePercent}% por lote`, docUtils.borderless, 2, 'center', 7),
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
                                        stack: [
                                            {
                                                text: [
                                                    {text: lcDBObj.requestorName, bold: true},
                                                    {
                                                        text: lcDBObj.legalRepresentative ? [{text: ' a través del C. '}, {text: lcDBObj.legalRepresentative, bold: true}, { text: `, en su carácter de ${lcDBObj.licenseSpecialData.representativeAs}`}] : ''
                                                    },
                                                    ', solicita la ',
                                                    {text: 'AUTORIZACIÓN DEL FRACCIONAMIENTO', bold: true},
                                                    ' denominado ',
                                                    {text: `“${lcDBObj.colony}”`, bold: true},
                                                    ' ubicado en ',
                                                    {text: docUtils.arrayToText(lcDBObj.licenseSpecialData.location), bold: true},
                                                    ', del ejido de Tizayuca, estado de Hidalgo, acompañado para efectos los siguientes documentos:\n\n'
                                                ]
                                            },
                                            {
                                                ul: lcDBObj.licenseSpecialData.documents
                                            },
                                        ]
                                    },
                                    {
                                        text: '\nUna vez analizados los antecedentes descritos el Instituto Municipal de Desarrollo Urbano y Vivienda, resuelve en definitiva sobre la Autorización de Fraccionamiento objeto de la presente resolución en atención a los siguientes: '
                                    }
                                ]
                            }
                        ]
                    ]
                },
                layout: docUtils.containerLayout
            },
            {
                pageBreak: 'avoid',
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
                            'De lo anterior se desprende que ',
                            {text: lcDBObj.requestorName, bold: true}, 
                            {
                                text: lcDBObj.legalRepresentative ? [{text: ' a través del C. '}, {text: lcDBObj.legalRepresentative, bold: true}, { text: `, en su carácter de ${lcDBObj.licenseSpecialData.representativeAs}`}] : ''
                            },
                            ', solicita la autorización del Fraccionamiento denominado ',
                            {text: `“${lcDBObj.colony}”`, bold: true},
                            ', ha cumplido con los requisitos que exige la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial del Estado de Hidalgo, en lo sucesivo se le denominará fraccionador para los efectos de esta resolución, asimismo se establecen las obligaciones que contrae, además de las constancias que obran en el expediente lo previsto en el artículo 149 de la codificación señalada anteriormente, por lo tanto el Instituto Municipal de Desarrollo Urbano y Vivienda, con apoyo en lo dispuesto por los artículos 150° y 154° de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial del Estado de Hidalgo; ',
                            "AUTORIZA LA RESOLUCIÓN DE LICENCIA DE FRACCIONAMIENTO",
                            ' denominado ' ,
                            {text: `“${lcDBObj.colony}”`, bold: true},
                            ' ubicado en la ',
                            {text: docUtils.arrayToText(lcDBObj.licenseSpecialData.location), bold: true},
                            ', del ejido de Tizayuca, estado de Hidalgo.\n\n']
                    },
                    {
                        text: [
                        'La autorización se integra por una totalidad de ',
                        {text: lcDBObj.licenseSpecialData.habitacionalLotes, bold: true},
                        ', integrados por una totalidad de ',
                        {text: lcDBObj.licenseSpecialData.totalManzanas, bold: true},' y ',{text: `${lcDBObj.licenseSpecialData.totalSurface} m²`, bold: true},
                        ' de área de donación, de acuerdo al plano de fraccionamiento que se anexa y que ahora forma parte integral de la misma. Dentro de las obligaciones de ',
                        {text: lcDBObj.requestorName, bold: true},
                        {
                            text: lcDBObj.legalRepresentative ? [{text: ' a través del C. '}, {text: lcDBObj.legalRepresentative, bold: true}, { text: `, en su carácter de ${lcDBObj.licenseSpecialData.representativeAs}`}] : ''
                        },
                        ', en su carácter de Representante Legal, deberá satisfacer todas y cada una de las obligaciones comprendida en la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial del Estado de Hidalgo y su reglamento, las cuales de manera enunciativa mas no limitativa se detallan a continuación: '
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
                            {text: "CUADRO DE SUPERFICIES POR USO DE SUELO", style: 'headT', border: docUtils.borderless}
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
                            {text: "CUADRO DE DISTRIBUCIÓN POR MANZANAS", style: 'headT', border: docUtils.borderless}
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
                table: {
                    widths: ['*'],
                    body: [
                        [
                            {text: "CUADRO DE DONACIONES", style: 'headT', border: docUtils.borderless}
                        ],
                        [
                            {
                                stack: await docUtils.loadChart(lcDBObj.fullInvoice, 'tabla_s3_')
                            }
                        ]
                    ]
                },
                layout: docUtils.containerLayout
            },
            {
                style: ['formRow', 'regular'],
                text: ['Las tablas que contiene los cuadros de lotificación se presentarán como ',{text: 'ANEXO I', bold: true} ,' a la presente resolución.']
            },
            {
                pageBreak: lcDBObj.licenseSpecialData.pageBreak_4 == 1 ? 'before' : 'avoid',
                style: 'formRow',
                table: {
                    widths: ['*'],
                    body: [
                        [
                            {text: "OBLIGACIONES DEL FRACCIONADOR", style: 'headTB', border: docUtils.borderless}
                        ],
                        [
                            {
                                style: 'regular',
                                stack: [
                                    {text: [{text: 'Primera.- ', bold: true},'Urbanización del fraccionamiento: Comprenderá las siguientes especificaciones:\n\n']},
                                    {
                                        type: 'lower-alpha',
                                        separator: ')',
                                        ol: [
                                            {text: [{text: 'Accesos provisionales: ', bold: true},'Deberá construir los accesos provisionales necesarios para el acceso y tránsito de vehículos pesados, maquinaria y equipo que se requiera en la construcción de las obras de urbanización del ', {text: 'FRACCIONAMIENTO', bold: true},' denominado ',
                                            {text: `“${lcDBObj.colony}”`, bold: true},' con el objetivo de no utilizar las vialidades existentes, evitando el deterioro de éstas y las posibles congestiones vehiculares resultantes. En caso de que las condiciones topográficas o técnicas no permitieran la construcción de accesos provisionales y se tenga la necesidad de utilizar las vialidades existentes, deberá convenir con la Secretaria de Obras Publicas del Municipio de Tizayuca, Hidalgo, de manera previa, las condiciones de usos y reparación de dichas vialidades.\n\n']},
                                            {text: [{text: 'Agua potable: ', bold: true},'Deberá construir la infraestructura que se requiera para abastecer al fraccionamiento por medio de una toma derivada del mismo, debiendo construir las redes necesarias para la distribución interna del Fraccionamiento dotando de tomas domiciliarias a cada uno de los lotes conforme a las memorias técnicas y al proyecto ejecutivo presentado y aprobado por la Comisión de Agua y Alcantarillado del Municipio de Tizayuca, Hgo; (CAAMTH), así mismo contara con la autorización de las especificaciones técnicas que deberán satisfacer los materiales a utilizar en la construcción de la infraestructura.\n\n']},
                                            {text: [{text: 'Alcantarillado: ', bold: true},'Deberá construir la infraestructura que se requiera e instalará las redes necesarias para todo el Fraccionamiento, dotando de salidas de aguas negras a cada uno de los lotes y conectar el sistema al colector municipal, de acuerdo al proyecto ejecutivo aprobado por la Comisión de Agua y Alcantarillado del Municipio de Tizayuca, Hgo. (CAAMTH); así mismo contara con la autorización de las especificaciones técnicas que deben satisfacer los materiales a utilizar en la construcción de la infraestructura.']},
                                            {text: [{text: 'Desagüe pluvial: ', bold: true},'Deberá diseñar y desarrollar el proyecto ejecutivo de desagüe pluvial para el Fraccionamiento y llevará a cabo su construcción, previa autorización de la Comisión de Agua y Alcantarillado del Municipio de Tizayuca, Hgo., (CAAMTH).\n\n']},
                                            {text: [{text: 'Electrificación: ', bold: true},'Dotará al fraccionamiento de electricidad en forma que se especifica en el proyecto ejecutivo aprobado por la Comisión Federal de Electricidad (CFE), debiendo proporcionar iluminación a todas las calles y áreas de uso común, así mismo contará con la aprobación de los materiales a utilizar.\n\n']},
                                            {text: [{text: 'Nivel de rasantes: ', bold: true},'Previo a las obras de urbanización, deberá determinar los bancos de nivel necesarios de la zona aledaña al Fraccionamiento para obtener los niveles de rasante que permitirá el desagüe pluvial de la urbanización y de las vialidades existentes, así mismo ejecutará la construcción de la obra civil antes citada.\n\n']},
                                            {text: [{text: 'Vialidades: ', bold: true},'Deberá dar cumplimiento a las restricciones que en materia de vialidad y construcción le señale la Secretaria de Obras Publicas del Municipio de Tizayuca, Hgo. Realizará la conformación de calles, nivelación, compactación, sub-base y base de acuerdo a las especificaciones técnicas de los materiales a usarse, igualmente construirá las guarniciones y banquetas, lo anterior conforme a las secciones y dimensiones que se especifican en el plano de lotificación, una vez terminadas las obras de urbanización y puestas estas en servicio formaran parte de la vialidad pública, mismas que quedaran sujetas a los programas de Desarrollo Urbano vigentes, y en ningún momento podrán ser de utilidad privada y/o exclusiva, lo cual debe ser informado a los adquirientes del predio.\n\n']},
                                            {text: [{text: 'Servicios Públicos Municipales: ', bold: true},'Deberá realizar las acciones necesarias que indique la Secretaria de Obras Publicas del Municipio de Tizayuca, Hidalgo, a efecto de que ésta pueda tener una eficiencia en prestación de los servicios (recolección de basura, seguridad, entre otros) dentro del fraccionamiento, ajustándose a las dimensiones y características que se determinen.\n\n']},
                                        ]
                                    },
                                    {
                                        text: [{text: 'Segunda.- ', bold: true}, 'El fraccionador queda obligado a iniciar las obras de urbanización en un plazo no mayor de 90 días hábiles a partir de la fecha de expedición del presente documento, las cuales deberán quedar totalmente concluidas a más tardar en 12 meses, de lo contrario deberá solicitar la prórroga correspondiste.\n\n']
                                    },
                                    {
                                        text: [{text: 'Tercera.- ', bold: true}, 'Deberá informar a los adquirientes que están obligados a dejar 30% de la superficie neta de cada lote libre de construcción para absorción de agua pluvial, lo anterior estará asentado en los contratos de compra - venta, así mismo establecerán que son exclusivamente de uso habitacional interés medio.\n\n']
                                    },
                                    {
                                        text: [{text: 'Cuarta.- ', bold: true}, 'Una vez terminadas las obras de urbanización y puesto en servicio el fraccionamiento, está obligado a entregar al Municipio de Tizayuca, Hgo, (las obras de alumbrado público, vialidades, banquetas, guarniciones, las obras de agua potable, alcantarillado sanitario y pluvial), y a la Comisión Federal de Electricidad (electrificación), debiendo acompañar para dicho trámite una fianza a favor de este Municipio, suficiente para garantizar eventuales vicios ocultos, con vigencia mínima de dos años a partir de la entrega-recepción, con forme al artículo 159 de la Ley de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial del Estado de Hidalgo y su Reglamento,  cuyo monto no podrá ser menor del 25% del presupuesto de las obras de urbanización.\n\n']
                                    },
                                    {
                                        text: [{text: 'Quinta.- ', bold: true}, 'En términos del artículo 155 de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial del Estado de Hidalgo y su Reglamento, será responsable del mantenimiento de las obras de urbanización una vez concluidas éstas, hasta en tanto no sean recepcionadas en forma conjunta por el Instituto Municipal de Desarrollo Urbano y Vivienda, Secretaria de Obras Públicas, Secretaria General y la Comisión de Agua y Alcantarillado del Municipio de Tizayuca, Hidalgo.\n\n']
                                    },
                                    {
                                        text: [{text: 'Sexta.- ', bold: true}, 'Deberá elaborar el reglamento interno del fraccionamiento, que contemple la observancia y restricciones sobre tipología de vivienda (contexto urbano y natural), construcción y conservación de áreas verdes por lote, así como la anulación de micro servicios incompatibles al uso de suelo autorizado, entre otros, lo cual deberá quedar asentado en los contratos de compraventa de los lotes, autorizado por la Secretaría de Infraestructura Pública y Desarrollo Urbano Sostenible de Gobierno del Estado de Hidalgo.\n\n']
                                    },
                                    {
                                        text: [{text: 'Séptima.- ', bold: true}, 'La presente resolución y los planos autorizados que la integran, deberán ser mostrados al personal de este Instituto, cuando se constituyan en el lugar para realizar la Inspección establecida por la ley en la materia.\n\n']
                                    },
                                    {
                                        text: [{text: 'Octava.- ', bold: true}, 'El área de donación o equipamiento se deberá escriturar a favor del Municipio de Tizayuca, Hgo., de acuerdo al artículo 66 del Reglamento de la Ley Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial del Estado de Hidalgo y su Reglamento.']
                                    },
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
                            {text: "CONDICIONANTES", style: 'headTB', border: docUtils.borderless}
                        ],
                        [
                            {
                                style: 'regular',
                                stack: [
                                    {text: 'Deberá presentar la siguiente documentación y condicionantes en los plazos que a continuación se indica:\n\n'},
                                    {ul: lcDBObj.licenseSpecialData.conditions.join('\n\n*').split('*')}
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
                            {text: "PROHIBICIONES Y SANCIONES", style: 'headTB', border: docUtils.borderless}
                        ],
                        [
                            {
                                fontSize: 7,
                                alignment: 'justify',
                                stack: [
                                    {text: [
                                        {text: 'Primera.- ', bold: true},
                                        'De acuerdo a lo establecido en el artículo 94 del Reglamento de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial,',{text: ' no podrá enajenar ni celebrar contratos de promesa de enajenación de los lotes del fraccionamiento hasta en tanto no se concluyan totalmente las obras de urbanización, pudiendo disponer de los lotes en venta únicamente correspondientes a las etapas terminadas y sean aprobadas por el Instituto Municipal de Desarrollo Urbano y Vivienda, Tizayuca.', bold: true},' En caso de que se transfiera parte o la totalidad del inmueble la operación se realizará tomando en consideración todas y cada una de las obligaciones que se derivan de la presente resolución, debiendo notificar a este Instituto Municipal de Desarrollo Urbano y Vivienda, de Tizayuca, en un plazo no mayor a 5 días hábiles a partir de que se realice el cambio de propietario para los efectos legales y administrativos procedentes. En caso de hacer una o más ventas parciales, el Propietario será el responsable de la integración de cada uno de los conceptos señalados en el aspecto referente a la urbanización.\n\n'
                                    ]},
                                    {text: [
                                        {text: 'Segunda.- ', bold: true},
                                        'El fraccionador será responsable por la venta de los lotes a terceros y de los daños y perjuicios que de ellos se deriven, así como de la obra civil y/o vivienda ofertada, eximiendo a Instituto Municipal de Desarrollo Urbano y Vivienda, de Tizayuca de toda responsabilidad derivada de esas operaciones, quedando obligado en los términos del presente documento a informar al Registro Público de la Propiedad y del Comercio del Distrito Judicial de Tizayuca, de toda venta pactada.\n\n'
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
                pageBreak: lcDBObj.licenseSpecialData.pageBreak_7 == 1 ? 'before' : 'avoid',
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
                pageBreak: lcDBObj.licenseSpecialData.pageBreak_8 == 1 ? 'before' : 'avoid',
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
                                text: [{text: 'PRIMERO. ', bold: true},'El Instituto Municipal de Desarrollo Urbano y Vivienda, de Tizayuca, estado de Hidalgo,  resulto competente para conocer y dictaminar  en definitiva sobre la Resolución del Fraccionamiento denominado ',{text: `“${lcDBObj.colony}”`, bold: true},' que dio origen a este trámite.\n\n',

                                {text: 'SEGUNDO. ', bold: true},'A través de esta resolución se autoriza el fraccionamiento denominado ',{text: `“${lcDBObj.colony}”`, bold: true},', con ', {text: lcDBObj.licenseSpecialData.habitacionalLotes, bold: true}, ' ubicado en ',{text: lcDBObj.licenseSpecialData.totalManzanas, bold: true}, ' y ', {text: `${lcDBObj.licenseSpecialData.totalSurface} m²`, bold: true}, ' de área de donación, ubicado en ',{text: docUtils.arrayToText(lcDBObj.licenseSpecialData.location), bold: true},', del ejido de Tizayuca, perteneciente al Municipio de Tizayuca, estado de Hidalgo, de acuerdo al plano del fraccionamiento que se anexa y que ahora forma parte integral de esta resolución.\n\n',

                                {text: 'TERCERO. ', bold: true},'El uso de suelo autorizado es ',{text: lcDBObj.zone.licenseZone, bold: true},' de acuerdo al Programa Municipal de Desarrollo Urbano y Ordenamiento Territorial de Tizayuca, Hidalgo.\n\n',

                                {text: 'CUARTO. ', bold: true},'Esta resolución no lo autoriza a realizar edificaciones, por lo que deberá solicitar la licencia de construcción correspondiente.\n\n',

                                {text: 'QUINTO. ', bold: true},{text: lcDBObj.requestorName, bold: true},{
                                    text: lcDBObj.legalRepresentative ? [{text: ' a través del C. '}, {text: lcDBObj.legalRepresentative, bold: true}, { text: `, en su carácter de ${lcDBObj.licenseSpecialData.representativeAs}`}] : ''
                                },', se obliga a entregar los documentos que se obtendrán con posterioridad como consecuencia del cumplimiento de sus obligaciones, y la escritura del área de donación a favor del Municipio de Tizayuca, estado de Hidalgo, por una superficie de ', {text: `${lcDBObj.licenseSpecialData.totalSurface} m²`, bold: true},' y escritura de protocolización de la presene resolución.\n\n',

                                {text: 'SEXTO. ', bold: true},'Remítase copia de la presente resolución, adjuntando plano del Fraccionamiento denominado ',{text: `“${lcDBObj.colony}”`, bold: true},', autorizado, al Registro Público de la propiedad y del Comercio, del distrito judicial de Tizayuca, estado de Hidalgo, de conformidad al articulo 156 fracción V de la Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial del Estado de Hidalgo.\n\n',

                                {text: 'SÉPTIMO. ', bold: true},'Se le apercibe a ',{text: lcDBObj.requestorName, bold: true}, 
                                {
                                    text: lcDBObj.legalRepresentative ? [{text: ' a través del C. '}, {text: lcDBObj.legalRepresentative, bold: true}, { text: `, en su carácter de ${lcDBObj.licenseSpecialData.representativeAs}`}] : ''
                                },' que de no dar cumplimiento a cualquiera de las obligaciones y prohibiciones señaladas en el cuerpo de la presente resolución o pase por alto las previsiones de la ley de la materia, se le aplicaran las sanciones que procedan y que son previstas en el Titulo IV, Capítulo I sección IV, relativo a fraccionamientos de la Ley de Asentamientos Humanos, Desarrollo Humano y Ordenamiento Territorial del Estado de Hidalgo y su Reglamento; ',{text: 'no se omite que la inobservancia de lo anterior faculte a esta autoridad a revocar la autorización concedida.', bold: true}]
                            }
                        ]
                    ]
                },
                layout: docUtils.containerLayout
            },
            {
                pageBreak: lcDBObj.licenseSpecialData.pageBreak_9 == 1 ? 'before' : 'avoid',
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
                            {text: 'Vigencia: ', style: 'labelTC', colSpan: 2},
                            {},
                            docUtils.field(lcDBObj.validity.licenseValidity, docUtils.borderless, 2, 'center',7),
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
                        text:'NOTIFÍQUESE Y CÚMPLASE\nASÍ EN DEFINITIVA LO RESOLVIÓ Y AUTORIZÓ EL MAESTRO EN AUDITORÍA Y CONTROL INTERNO GUBERNAMENTAL HIPÓLITO ZAMORA SORIA,\nDIRECTOR GENERAL DEL INSTITUTO MUNICIPAL DE DESARROLLO URBANO Y VIVIENDA',
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