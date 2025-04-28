import { __dirstorage, __dirname } from "../path.configuration.js";
import path from "path";
import fs from 'fs';
import { getMunicipalPeriodByDate, getInstitutePeriodByDate, getLicensesPeriodByDate, getYearLegendByYear } from "../repositories/administration.repository.js";

export const borderless = [false, false, false, false];

export const formLayout = {
    paddingLeft: function (i, node) { return 1; },
    paddingRight: function (i, node) { return 1; },
    paddingTop: function (i, node) { return 1; },
    paddingBottom: function (i, node) { return 1; },
    hLineWidth: function (i, node) { return 0.5; },
    vLineWidth: function (i, node) { return 0.5; },
    hLineColor: function (i, node) { return '#000'; },
    vLineColor: function (i, node) { return '#000'; }
}

export const containerLayout = {
    paddingLeft: function (i, node) { return 2; },
    paddingRight: function (i, node) { return 2; },
    paddingTop: function (i, node) { return 2; },
    paddingBottom: function (i, node) { return 2; },
    hLineWidth: function (i, node) { return 0.5; },
    vLineWidth: function (i, node) { return 0.5; },
    hLineColor: function (i, node) { return '#000'; },
    vLineColor: function (i, node) { return '#000'; }
}

export const noBorderNoPadding = {
    paddingLeft: function (i, node) { return 0; },
    paddingRight: function (i, node) { return 0; },
    paddingTop: function (i, node) { return 0; },
    paddingBottom: function (i, node) { return 0; },
    hLineWidth: function (i, node) { return 0; },
    vLineWidth: function (i, node) { return 0; },
    hLineColor: function (i, node) { return '#000'; },
    vLineColor: function (i, node) { return '#000'; }
}

export const NoPadding = {
    paddingLeft: function (i, node) { return 0; },
    paddingRight: function (i, node) { return 0; },
    paddingTop: function (i, node) { return 0; },
    paddingBottom: function (i, node) { return 0; },
    hLineWidth: function (i, node) { return 0.5; },
    vLineWidth: function (i, node) { return 0.5; },
    hLineColor: function (i, node) { return '#000'; },
    vLineColor: function (i, node) { return '#000'; }
}

export const DMCLayout = {
    paddingLeft: function (i, node) { return 0; },
    paddingRight: function (i, node) { return 0; },
    paddingTop: function (i, node) { return 0; },
    paddingBottom: function (i, node) { return 2; },
    hLineWidth: function (i, node) { return 0.5; },
    vLineWidth: function (i, node) { return 0.5; },
    hLineColor: function (i, node) { return '#000'; },
    vLineColor: function (i, node) { return '#000'; }
}

export const subTable = {
    paddingLeft: function (i, node) { return 0; },
    paddingRight: function (i, node) { return 0; },
    paddingTop: function (i, node) { return 0; },
    paddingBottom: function (i, node) { return 0; },
    hLineWidth: function (i, node) { return 0.5; },
    vLineWidth: function (i, node) { return 0.5; },
    hLineColor: function (i, node) { return '#757575'; },
    vLineColor: function (i, node) { return '#757575'; }
}

export const cellLayout = {
    paddingLeft: function (i, node) { return 2; },
    paddingRight: function (i, node) { return 2; },
    paddingTop: function (i, node) { return 1; },
    paddingBottom: function (i, node) { return 1; },
    hLineWidth: function (i, node) { return 0.5; },
    vLineWidth: function (i, node) { return 0.5; },
    hLineColor: function (i, node) { return '#000'; },
    vLineColor: function (i, node) { return '#000'; }
}

export const docStyles = {
    headT: {
        color: 'white',
        fillColor: '#832339',
        fontSize: 7,
        bold: true,
        alignment: 'center',
    },
    headTB: {
        color: 'white',
        fillColor: '#757575',
        fontSize: 7,
        bold: true,
        alignment: 'center',
    },
    labelT: {
        fontSize: 7,
        bold: true
    },
    labelTC: {
        fontSize: 7,
        bold: true,
        alignment: 'center'
    },
    boldCenter: {
        bold: true,
        alignment: 'center'
    },
    center: {
        alignment: 'center'
    },
    justify: {
        alignment: 'justify'
    },
    formRow: {
        margin: [0, 0, 0, 5]
    },
    regular: {
        fontSize: 7
    },
    regularSmall: {
        fontSize: 5
    },
    headST: {
        color: '#fff',
        fillColor: '#757575',
        fontSize: 5,
        alignment: 'center',
    }
}

export function field(text, borders, span, style, fontSize) {
    return {
        colSpan: span,
        border: borders,
        table: { widths: ['*'], body: [[{ text: text, fontSize: fontSize, style: style }]] }, layout: cellLayout
    }
}

export function voidCell(span) {
    return { colSpan: span, border: borderless, text: '' }
}

export async function loadChart(fullInvoice, sourcePattern) {
    let images = [];
    const dir = path.join(__dirstorage, 'assets', 'urban', fullInvoice.replaceAll('/', '_'));
    const pattern = new RegExp(sourcePattern);

    return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, files) => {
            if (err) {
                images = [
                    {
                        text: [
                            { text: 'Nota: ', style: 'regular', bold: true },
                            { text: 'La información descrita corresponde y es responsabilidad del solicitante.', style: 'regular' }
                        ]
                    }
                ]
                return resolve(images);
            }

            const matchedFiles = files.filter(file => pattern.test(file));

            matchedFiles.sort((a, b) => {
                const numA = parseInt(a.match(/_(\d+)\.png/)[1]);
                const numB = parseInt(b.match(/_(\d+)\.png/)[1]);

                return numA - numB;
            });

            for (let e of matchedFiles) {
                images.push({
                    image: path.join(dir, e),
                    width: 550,
                    alignment: 'center',
                    margin: [0, 0, 0, 5]
                });
            }

            images.push({
                text: [
                    { text: 'Nota: ', style: 'regular', bold: true },
                    { text: 'La información descrita corresponde y es responsabilidad del solicitante.', style: 'regular' }
                ]
            });

            resolve(images);
        });
    });
}

export async function fileExist(location, group, width) {
    /*let fileDirectory = path.join(__dirstorage, 'assets', group, location.replaceAll('/', '_'), 'zone.png');

    const defaultPath = path.join(__dirname, 'resources', 'public', 'img', '404.jpg');

    return new Promise((resolve, reject) => {
        fs.access(fileDirectory, (err) => {
            if (err) {
                return resolve(defaultPath);
            }

            return resolve(fileDirectory);
        });
    });*/
    const DEFAULT_WIDTH = 586;
    const extensions = ['.png', '.jpg', '.jpeg', '.svg']; // add more if needed
    const basePath = path.join(__dirstorage, 'assets', group, location.replaceAll('/', '_'));
    const defaultPath = path.join(__dirname, 'resources', 'public', 'img', '404.jpg');

    for (const ext of extensions) {
        const filePath = path.join(basePath, `zone${ext}`);
        try {
            await fs.promises.access(filePath);
            if (ext === '.svg') {
                const svgText = await fs.promises.readFile(filePath, 'utf8');
                return {
                    border: [true, true, true,false],
                    svg: svgText,
                    width: width ? width : DEFAULT_WIDTH
                };
            }

            return {
                border: [true, true, true,false],
                image: filePath,
                width: width ? width : DEFAULT_WIDTH,
                alignment: 'center'
            };
        } catch (err) {
            // File doesn't exist, try the next extension
        }
    }

    return {
        border: [true, true, true,false],
        image: defaultPath,
        width: width ? width : DEFAULT_WIDTH,
        alignment: 'center'
    };
}

export function prepareData(lcDBObj) {
    lcDBObj.fullInvoice = lcDBObj.fullInvoice.replaceAll('_', '/');

    for (const key in lcDBObj) {
        if (typeof lcDBObj[key] == 'string') {
            lcDBObj[key] = lcDBObj[key].toUpperCase();
        }
    }

    if (lcDBObj.term && lcDBObj.term.licenseTerm !== null) {
        lcDBObj.term.licenseTerm = lcDBObj.term.licenseTerm.toUpperCase();
    }

    if (lcDBObj.validity && lcDBObj.validity.licenseValidity !== null) {
        lcDBObj.validity.licenseValidity = lcDBObj.validity.licenseValidity.toUpperCase();
    }

    if (lcDBObj.expeditionType && lcDBObj.expeditionType.licenseExpType !== null) {
        lcDBObj.expeditionType.licenseExpType = lcDBObj.expeditionType.licenseExpType.toUpperCase();
    }

    if (lcDBObj.licenseSpecialData.requestorAddress) {
        lcDBObj.licenseSpecialData.requestorAddress = lcDBObj.licenseSpecialData.requestorAddress.toUpperCase();
    }

    if (lcDBObj.licenseSpecialData.buildingAddress) {
        lcDBObj.licenseSpecialData.buildingAddress = lcDBObj.licenseSpecialData.buildingAddress.toUpperCase();
    }

    if (lcDBObj.licenseSpecialData.representativeAs) {
        lcDBObj.licenseSpecialData.representativeAs = lcDBObj.licenseSpecialData.representativeAs.toLowerCase();
    }

    return lcDBObj;
}

export function dateFormatFull(dateNumeric) {
    let months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"];
    if (!dateNumeric) {
        return "Fecha no definida";
    }
    let date = dateNumeric.split('-');
    return `${date[2]} de ${months[parseInt(date[1]) - 1]} del ${date[0]}`;
}

export function arrayToText(array) {
    let newArray = Array.from(array);
    if (newArray.length === 0 || !newArray) return '';
    if (newArray.length === 1) return newArray[0];

    const lastItem = newArray.pop();
    return `${newArray.join(', ')} y ${lastItem}`;
}

export function signaturePresident(status) {
    if (status) {
        return {
            image: path.join(__dirstorage, 'official', 'firmaB.png'),
            fit: ['*', 70],
            alignment: 'center',
            margin: [0, 10, 0, 0]
        }
    }
    return {
        image: path.join(__dirstorage, 'official', 'firma_blank.png'),
        fit: ['*', 70],
        alignment: 'center',
        margin: [0, 10, 0, 0]
    }
}

export function signatureDirector(status) {
    if (status) {
        return {
            image: path.join(__dirstorage, 'official', 'firma.png'),
            fit: ['*', 70],
            alignment: 'center',
            margin: [0, 10, 0, 0]
        }
    }
    return {
        image: path.join(__dirstorage, 'official', 'firma_blank.png'),
        fit: ['*', 70],
        alignment: 'center',
        margin: [0, 10, 0, 0]
    }
}

export function signatureSeal(status) {
    if (status) {
        return {
            image: path.join(__dirstorage, 'official', 'sello.png'),
            fit: ['*', 70],
            alignment: 'center',
            margin: [0, 10, 0, 0]
        }
    }
    return {
        image: path.join(__dirstorage, 'official', 'sello_blank.png'),
        fit: ['*', 70],
        alignment: 'center',
        margin: [0, 10, 0, 0]
    }
}

export function madeBy(name) {
    let nameArr = name.split(' ');

    nameArr = nameArr.map(e => e.charAt(0) + '.');

    return nameArr.join('');
}

export function generateDSMCTable(situationArray, subject) {

    let body = [
        [
            {
                text: subject,
                colSpan: 4,
                style: 'headST',
                border: borderless
            }, {}, {}, {}
        ],
        [
            { text: 'DESCRIPCIÓN', style: ['boldCenter', 'regularSmall'], border: [false, true, true, true] },
            { text: 'SUPERFICIE', style: ['boldCenter', 'regularSmall'] },
            { text: 'MEDIDAS', style: ['boldCenter', 'regularSmall'] },
            { text: 'COLINDANCIAS', style: ['boldCenter', 'regularSmall'], border: [true, true, false, true] }
        ]
    ]

    for (let i of situationArray) {
        let arr = [
            { text: i.description, style: ['boldCenter', 'regularSmall'], margin: [0, 3, 0, 0], border: [false, true, false, true] },
            { text: i.surface, style: ['boldCenter', 'regularSmall'], margin: [0, 3, 0, 0], border: [false, true, false, true] },
            {
                colSpan: 2,
                table: {
                    widths: [130, '*'],
                    body: generateSubTable(i.table)
                },
                layout: subTable,
                border: [false, false, false, true]
            },
            {}
        ]

        body.push(arr)
    }

    return body;
}

export function generateLegalRepresentativeField(representative, representativeAs) {
    if (representative) {
        return [
            { text: `${capitalize(representativeAs)}: `, style: 'labelT', border: borderless },
            field(representative, borderless, null, 'center', 7)
        ];
    }

    return [{ text: '', border: borderless }, { text: '', border: borderless }];
}

export function generateDistributionTable(lotes, manzanas) {
    let table = [
        [
            { text: "CUADRO DE DISTRIBUCIÓN POR MANZANAS", style: 'headT', border: borderless, colSpan: 2 }, {}
        ],
        [
            { text: "LOTE", style: 'labelTC' },
            { text: "MANZANA", style: 'labelTC' }
        ]
    ]

    for (let i = 0; i < lotes.length; i++) {
        table.push([
            { text: lotes[i], style: ['center', 'regular'] },
            { text: manzanas[i], style: ['left', 'regular'] }
        ]);
    }

    return table
}

export async function getPresidentName(date) {
    const PERIOD = await getMunicipalPeriodByDate(date);

    if (PERIOD == null) {
        return "No definido"
    }

    return PERIOD.municipalPresident.toUpperCase();
}

export async function getDirectorNameTittle(date) {
    const PERIOD = await getInstitutePeriodByDate(date);

    if (PERIOD == null) {
        return "No definido"
    }

    return `${PERIOD.directorTittle} ${PERIOD.directorName}`.toUpperCase();
}

export async function getDirectorNameSignature(date) {
    const PERIOD = await getInstitutePeriodByDate(date);

    if (PERIOD == null) {
        return "No definido"
    }

    return `${PERIOD.directorTittleShort} ${PERIOD.directorName}`.toUpperCase();
}

export async function getDirectorNameShort(date) {
    const PERIOD = await getInstitutePeriodByDate(date);

    if (PERIOD == null) {
        return "No definido"
    }

    return madeBy(capitalize(PERIOD.directorName));
}

export async function getLicensesDirectorName(date) {
    const PERIOD = await getLicensesPeriodByDate(date);

    if (PERIOD == null) {
        return "No definido"
    }

    return madeBy(capitalize(PERIOD.directorName));
}

export async function getYearLegend(year) {
    const LEGEND = await getYearLegendByYear(year);

    if (!LEGEND) {
        return `"${year}, legenda del año no definida."`
    }

    return `"${LEGEND.year}, ${LEGEND.year_legend}"`
}

function capitalize(str) {
    return str
        .split(' ')
        .map(word => {
            return word.charAt(0).toLocaleUpperCase() +
                word.slice(1).toLocaleLowerCase();
        })
        .join(' ');
}

function generateSubTable(tableObj) {
    let subBody = []
    let hasBottomBorder = true;

    for (let i = 0; i < tableObj.distribution.length; i++) {
        let row;
        hasBottomBorder = tableObj.distribution[i].includes('*') ? false : true;
        tableObj.distribution[i] = tableObj.distribution[i].replaceAll('*', '');

        if (!tableObj.adjoining[i]) {
            tableObj.adjoining[i] = '';
        }

        if (tableObj.adjoining[i].includes('/')) {
            tableObj.adjoining[i] = tableObj.adjoining[i].replaceAll('/', '\n')
        }

        if (i == 0) {
            row = [
                {
                    text: [
                        {
                            text: `${tableObj.distribution[i]} `,
                            bold: true
                        }, { text: `${tableObj.measures[i]}` }
                    ],
                    style: 'regularSmall', border: [false, false, false, hasBottomBorder],
                    margin: [2, 0, 0, 0]
                },
                { text: `${tableObj.adjoining[i]}`, style: 'regularSmall', border: [false, false, false, hasBottomBorder], margin: [2, 0, 0, 0] }
            ]
        } else if (i == tableObj.distribution.length - 1) {
            row = [
                {
                    text: [
                        {
                            text: `${tableObj.distribution[i]} `,
                            bold: true
                        }, { text: `${tableObj.measures[i]}` }
                    ], style: 'regularSmall', border: [false, false, false, false], margin: [2, 0, 0, 0]
                },
                { text: `${tableObj.adjoining[i]}`, style: 'regularSmall', border: [false, false, false, false], margin: [2, 0, 0, 0] }
            ]
        } else {
            row = [
                {
                    text: [
                        {
                            text: `${tableObj.distribution[i]} `,
                            bold: true
                        }, { text: `${tableObj.measures[i]}` }
                    ], style: 'regularSmall', border: [false, false, false, hasBottomBorder], margin: [2, 0, 0, 0]
                },
                { text: `${tableObj.adjoining[i]}`, style: 'regularSmall', border: [false, false, false, hasBottomBorder], margin: [2, 0, 0, 0] }
            ]
        }
        subBody.push(row);
    }

    return subBody
}