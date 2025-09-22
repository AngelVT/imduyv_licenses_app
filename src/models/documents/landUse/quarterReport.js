import * as docUtils from "../../../utilities/document.utilities.js";
import { generateTableBody, generateTableBodyGeoRef } from "../../../utilities/reporting.utilities.js";
import { __dirname } from "../../../path.configuration.js";
import path from "path";

export async function generateLandQuarterReport(start, end, types, observations) {
    const definition = {
        styles: docUtils.docStyles,
        pageOrientation: 'landscape',
        pageMargins: [50, 100, 50, 100],
        header: {
            image: path.join(__dirname, 'resources', 'public', 'img', 'membrete_header.png'),
            alignment: 'center',
            width: 745,
            margin: [0, 25, 0, 0]
        },
        content: [
            {
                table: {
                    widths: [150, '*', '*', '*', '*', '*', '*'],
                    body: await generateTableBody(types, start, end, observations)
                }
            }
        ],
        background: {
            margin: [0, 490, 0, 0],
            stack: [
                {
                    image: path.join(__dirname, 'resources', 'public', 'img', 'membrete_footer.png'),
                    alignment: 'center',
                    width: 745
                },
                {
                    margin: [50,5,50,0],
                    columns: [
                        {width: '15%', text: 'tizayuca.gob.mx', bold: true, color: '#511D4E'},
                        {
                            width: '85%',
                            text: 'Calle Lázaro Cárdenas #101, Col. Pedregal, Tizayuca, Hidalgo C.P. 43802',
                            color: '#511D4E',
                            alignment: 'right'
                        }
                    ]
                }
            ]
        }
    }

    return definition;
}

export async function generateLandGeoRefReport(start, end, types, observations) {
    const definition = {
        styles: docUtils.docStyles,
        pageOrientation: 'landscape',
        pageMargins: [50, 100, 50, 100],
        header: {
            image: path.join(__dirname, 'resources', 'public', 'img', 'membrete_header.png'),
            alignment: 'center',
            width: 745,
            margin: [0, 25, 0, 0]
        },
        content: [
            {
                table: {
                    widths: [150, '*', '*', '*', '*', '*', '*'],
                    body: await generateTableBodyGeoRef(types, start, end, observations)
                }
            }
        ],
        background: {
            margin: [0, 490, 0, 0],
            stack: [
                {
                    image: path.join(__dirname, 'resources', 'public', 'img', 'membrete_footer.png'),
                    alignment: 'center',
                    width: 745
                },
                {
                    margin: [50,5,50,0],
                    columns: [
                        {width: '15%', text: 'tizayuca.gob.mx', bold: true, color: '#511D4E'},
                        {
                            width: '85%',
                            text: 'Calle Lázaro Cárdenas #101, Col. Pedregal, Tizayuca, Hidalgo C.P. 43802',
                            color: '#511D4E',
                            alignment: 'right'
                        }
                    ]
                }
            ]
        }
    }

    return definition;
}