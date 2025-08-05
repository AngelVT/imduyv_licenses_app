import { __dirstorage, __dirname } from "../path.configuration.js";
import path from "path";
import fs from 'fs';
import { load } from 'cheerio';
import css from 'css';
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

export const subTableB = {
    paddingLeft: () => 2,
    paddingRight: () => 2,
    paddingTop: () => 0,
    paddingBottom: () => 0,

    hLineWidth: (i, node) => {
        // Always show top and bottom lines
        if (i === 0 || i === node.table.body.length) {
            return 0.5;
        }
        // Show internal top borders between rows
        return 0.5;
    },

    vLineWidth: (i, node) => 0,
    hLineColor: () => '#757575',
    vLineColor: () => '#757575'
};

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
        fillColor: '#511D4E',
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
    },
    bold: {
        bold: true
    }
}

export function field(text, borders, span, style, fontSize) {
    return {
        colSpan: span,
        border: borders,
        table: { widths: ['*'], body: [[{ text: text, fontSize: fontSize, style: style }]] }, layout: cellLayout
    }
}

export function fieldLU(text, borders, span, style, fontSize, marginTop = 0) {
    return {
        colSpan: span,
        border: borders,
        margin: [0, marginTop, 0, 0],
        table: { widths: ['*'], body: [[{ text: text, fontSize: fontSize, style: style, margin: [3, 3, 3, 3] }]] }, layout: cellLayout
    }
}

export function voidCell(span) {
    return { colSpan: span, border: borderless, text: '' }
}

export async function loadChart(fullInvoice, sourcePattern) {
    let images = [];
    const DEFAULT_WIDTH = 550;
    const dir = path.join(__dirstorage, 'assets', 'urban', fullInvoice.replaceAll('/', '_'));
    const pattern = new RegExp(sourcePattern);

    try {
        const files = await fs.promises.readdir(dir);
        const matchedFiles = files.filter(file => pattern.test(file) && (file.endsWith('.png') || file.endsWith('.svg')));

        matchedFiles.sort((a, b) => {
            const numA = parseInt(a.match(/_(\d+)\.(png|svg)/)?.[1] ?? '0');
            const numB = parseInt(b.match(/_(\d+)\.(png|svg)/)?.[1] ?? '0');
            return numA - numB;
        });

        for (const file of matchedFiles) {
            const fullPath = path.join(dir, file);

            if (file.endsWith('.png')) {
                images.push({
                    image: fullPath,
                    width: DEFAULT_WIDTH,
                    alignment: 'center',
                    margin: [0, 0, 0, 5]
                });
            } else if (file.endsWith('.svg')) {
                const svgContent = await fs.promises.readFile(fullPath, 'utf8');
                images.push({
                    svg: svgContent,
                    width: DEFAULT_WIDTH,
                    alignment: 'center',
                    margin: [0, 0, 0, 5]
                });
            }
        }
    } catch (err) {
        images = [
            {
                text: [
                    { text: 'Nota: ', style: 'regular', bold: true },
                    { text: 'La información descrita corresponde y es responsabilidad del solicitante.', style: 'regular' }
                ]
            }
        ];
        return images;
    }

    images.push({
        text: [
            { text: 'Nota: ', style: 'regular', bold: true },
            { text: 'La información descrita corresponde y es responsabilidad del solicitante.', style: 'regular' }
        ]
    });

    return images;
}

function parseCssStyles(styleText) {
    const styleMap = {};

    const parsed = css.parse(styleText);

    parsed.stylesheet.rules.forEach(rule => {
        if (rule.type !== 'rule') return;

        rule.selectors.forEach(selector => {
            // Only map class selectors like `.className`
            if (!selector.startsWith('.')) return;

            const cleanSelector = selector.trim();
            styleMap[cleanSelector] = {};

            rule.declarations.forEach(decl => {
                if (decl.type !== 'declaration') return;
                const prop = decl.property.toLowerCase();
                const value = decl.value.toLowerCase();

                styleMap[cleanSelector][prop] = value;
            });
        });
    });

    return styleMap;
}

function mapCssToPdfMake(styleObj) {
    const pdfStyle = {};

    for (const [prop, rawValue] of Object.entries(styleObj)) {

        // Strip !important
        const value = rawValue.replace(/\s*!\s*important\s*/gi, '').trim();

        switch (prop) {
            case 'font-weight':
                if (value === 'bold') pdfStyle.bold = true;
                break;
            case 'color':
                pdfStyle.color = value;
                break;
            case 'background-color':
                pdfStyle.fillColor = value;
                break;
            case 'text-align':
                if (['left', 'right', 'center', 'justify'].includes(value))
                    pdfStyle.alignment = value;
                break;
        }
    }

    return pdfStyle;
}

function parseSimpleFormatting(text) {
    //text = text.replace(/[\[\]\|]/g, '');
    const fragments = [];
    let remaining = text;

    const pattern = /(\*[^*]+\*|_[^_]+_|~[^~]+~)/g;
    let match;
    let lastIndex = 0;

    while ((match = pattern.exec(remaining)) !== null) {
        const index = match.index;
        const matchedText = match[0];

        // Add plain text before the match
        if (index > lastIndex) {
            fragments.push({ text: remaining.slice(lastIndex, index) });
        }

        const content = matchedText.slice(1, -1); // Remove wrapping symbol
        const symbol = matchedText[0];

        const style = { text: content };
        if (symbol === '*') style.bold = true;
        else if (symbol === '_') style.italics = true;
        else if (symbol === '~') style.decoration = 'underline';

        fragments.push(style);
        lastIndex = index + matchedText.length;
    }

    // Add any remaining plain text
    if (lastIndex < remaining.length) {
        fragments.push({ text: remaining.slice(lastIndex) });
    }

    return fragments;
}

function generateTableBodies(fileName, fontSize) {
    const html = fs.readFileSync(path.join(fileName), 'utf-8');
    const $ = load(html);

    const styleText = $('style').html() || '';
    const cssClassMap = parseCssStyles(styleText);

    const tables = $('table');
    const allTables = [];

    tables.each((tableIndex, tableElem) => {
        const rows = $(tableElem).find('tr');
        const matrix = [];
        const spanMap = {};
        let maxCols = 0;

        rows.each((rowIndex, rowElem) => {
            const cells = $(rowElem).find('th, td');
            const currentRow = [];
            let colPointer = 0;

            while (spanMap[`${rowIndex},${colPointer}`]) {
                currentRow.push({});
                colPointer++;
            }

            cells.each((_, cell) => {
                const $cell = $(cell);
                const cellText = parseSimpleFormatting($cell.text().trim());
                const colSpan = parseInt($cell.attr('colspan')) || 1;
                const rowSpan = parseInt($cell.attr('rowspan')) || 1;

                const finalCss = {};

                // Inline styles
                const inlineStyle = $cell.attr('style') || '';
                inlineStyle.split(';').forEach(rule => {
                    const [prop, value] = rule.split(':').map(s => s?.trim()?.toLowerCase());
                    if (!prop || !value) return;
                    finalCss[prop] = value;
                });

                // Class-based styles
                const classes = ($cell.attr('class') || '').split(/\s+/).filter(Boolean);
                for (const className of classes) {
                    const classStyles = cssClassMap[`.${className}`];
                    if (classStyles) Object.assign(finalCss, classStyles);
                }

                const pdfStyles = mapCssToPdfMake(finalCss);
                const cellObj = {
                    text: cellText,
                    colSpan,
                    rowSpan,
                    ...pdfStyles,
                    margin: [0, 4, 0, 4],
                    fontSize
                };

                currentRow[colPointer] = cellObj;

                for (let i = 1; i < colSpan; i++) {
                    currentRow[colPointer + i] = {};
                }

                for (let r = 1; r < rowSpan; r++) {
                    for (let c = 0; c < colSpan; c++) {
                        spanMap[`${rowIndex + r},${colPointer + c}`] = true;
                    }
                }

                colPointer += colSpan;
            });

            if (currentRow.length > maxCols) maxCols = currentRow.length;

            matrix.push(currentRow);
        });

        matrix.forEach(row => {
            while (row.length < maxCols) {
                row.push({});
            }
        });

        let headerRows = 1;
        if (matrix.length > 0) {
            const firstRow = matrix[0];
            headerRows = Math.max(
                ...firstRow.map(cell => cell?.rowSpan || 1)
            );
        }

        const widths = Array(maxCols).fill('auto');
        allTables.push({ body: matrix, widths, headerRows });
    });

    return allTables;
}

export async function loadChartXHTML(fullInvoice, sourcePattern, fontSize, tittle) {
    const tableBody = []
    const dir = path.join(__dirstorage, 'assets', 'urban', fullInvoice.replaceAll('/', '_'), sourcePattern);

    tableBody.push([
        { text: tittle, style: 'headT', border: borderless, margin: [2,2,2,2] }
    ]);

    if (fs.existsSync(dir)) {
        const tables = generateTableBodies(dir, fontSize);

        for (const t of tables) {
            tableBody.push([
                {
                    //border: [true, false, true, false],
                    margin: [0, 5, 0, 5],
                    columns: [
                        {},
                        {
                            width: 'auto',
                            layout: formLayout,
                            table: {
                                headerRows: t.headerRows,
                                widths: t.widths,
                                body: t.body
                            }
                        },
                        {}
                    ]
                }
            ])
        }
    }

    tableBody.push([
        {
            margin: [5, 5, 5, 5],
            //border: [true, false, true, true],
            text: [
                { text: 'Nota: ', style: 'regular', bold: true },
                { text: 'La información descrita corresponde y es responsabilidad del solicitante.', style: 'regular' }
            ]
        }
    ]);

    return tableBody;
}

export async function fileExist(location, group, width) {
    const DEFAULT_WIDTH = 586;
    const extensions = ['.png', '.svg']; // add more if needed
    const basePath = path.join(__dirstorage, 'assets', group, location.replaceAll('/', '_'));
    const defaultPath = path.join(__dirname, 'resources', 'public', 'img', '404.jpg');

    for (const ext of extensions) {
        const filePath = path.join(basePath, `zone${ext}`);
        try {
            await fs.promises.access(filePath);
            if (ext === '.svg') {
                const svgText = await fs.promises.readFile(filePath, 'utf8');
                return {
                    border: [true, true, true, false],
                    svg: svgText,
                    width: width ? width : DEFAULT_WIDTH
                };
            }

            return {
                border: [true, true, true, false],
                image: filePath,
                width: width ? width : DEFAULT_WIDTH,
                alignment: 'center'
            };
        } catch (err) {
            // File doesn't exist, try the next extension
        }
    }

    return {
        border: [true, true, true, false],
        image: defaultPath,
        width: width ? width : DEFAULT_WIDTH,
        alignment: 'center'
    };
}

export function prepareData(lcDBObj) {
    lcDBObj.fullInvoice = lcDBObj.fullInvoice.replaceAll('_', '/');

    if (lcDBObj.surfaceTotal) {
        const number = Number(lcDBObj.surfaceTotal).toLocaleString();
        lcDBObj.surfaceTotal = number !== 'NaN' ? number : lcDBObj.surfaceTotal;
    }

    if (!lcDBObj.licenseSpecialData.marginName) {
        lcDBObj.licenseSpecialData.marginName = 0;
    }

    if (!lcDBObj.licenseSpecialData.marginAttention) {
        lcDBObj.licenseSpecialData.marginAttention = 0;
    }

    for (const key in lcDBObj) {
        if (typeof lcDBObj[key] == 'string' && key !== 'fullInvoice') {
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

    if (lcDBObj.licenseSpecialData.colony) {
        lcDBObj.licenseSpecialData.colony = lcDBObj.licenseSpecialData.colony.toUpperCase();
    }

    if (lcDBObj.licenseSpecialData.representativeAs) {
        lcDBObj.licenseSpecialData.representativeAs = lcDBObj.licenseSpecialData.representativeAs.toLowerCase();
    }

    return lcDBObj;
}

export function anexoFn(anexo) {
    anexo = anexo.trim();
    if (anexo !== '-') {
        return  {text: `Anexo: ${anexo}`, style: 'labelT' }
    }
    else {
        return undefined
    }
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

export function dateFormatDMY(isoDate) {
    let date = isoDate.split('-');
    return date.reverse().join('-');
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
        const numberOfNewlines = Math.ceil((i.table.distribution.length / 2) - 1);
        const newlines = '\n'.repeat(numberOfNewlines);
        let arr = [
            { text: newlines + i.description, style: ['boldCenter', 'regularSmall'], margin: [0, 3, 0, 0], border: [false, true, false, true] },
            { text: newlines + i.surface, style: ['boldCenter', 'regularSmall'], margin: [0, 3, 0, 0], border: [false, true, false, true] },
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
        return `"${year}, leyenda del año no definida."`
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