import { __dirstorage } from "../../../paths.js";
import * as docUtils from "../docUtils/utils.js";

export async function generateTest(lcDBObj) {

    lcDBObj = docUtils.prepareData(lcDBObj);

    var definition = {
        pageMargins: [ 5, 60, 5, 70 ],
        styles: docUtils.docStyles,
        content: [
            {
                style: 'formRow',
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
        ],
        footer: function(currentPage, pageCount) {
            return {
                svg: `
                    <svg width="30" height="66">
                        <text x="16" y="33" transform="rotate(-90, 15, 33)" text-anchor="middle" font-size="4" font-weight="bold">
                            <tspan x="16" dy="1.2em">${lcDBObj.fullInvoice}</tspan>
                            <tspan x="16" dy="1.2em">Pagina ${currentPage} de ${pageCount}</tspan>
                        </text>
                    </svg>`,
                alignment: 'right'
            };
        }
    };
    return definition;
}