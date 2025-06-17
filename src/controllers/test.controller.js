import { __dirname, __dirstorage } from "../path.configuration.js";
import { printerPDF } from "../utilities/pdf.utilities.js";
import * as docUtils from '../utilities/document.utilities.js';
import { load } from 'cheerio';
import path from 'path';
import fs from 'fs';
import css from 'css';

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

function generateTableBody() {
    const html = fs.readFileSync(path.join(__dirstorage, 'test.xhtml'), 'utf-8');
    const $ = load(html);

    const styleText = $('style').html() || '';
    const cssClassMap = parseCssStyles(styleText);

    const table = $('table').first();
    const rows = table.find('tr');
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
            //const cellText = $cell.text().trim();
            const cellText = parseSimpleFormatting($cell.text().trim());
            const colSpan = parseInt($cell.attr('colspan')) || 1;
            const rowSpan = parseInt($cell.attr('rowspan')) || 1;

            const finalCss = {};

            // Get inline styles
            const inlineStyle = $cell.attr('style') || '';
            inlineStyle.split(';').forEach(rule => {
                const [prop, value] = rule.split(':').map(s => s?.trim()?.toLowerCase());
                if (!prop || !value) return;
                finalCss[prop] = value;
            });

            // Get class-based styles
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
                fontSize: 5,
            };

            currentRow[colPointer] = cellObj;

            // Add colspan placeholders
            for (let i = 1; i < colSpan; i++) {
                currentRow[colPointer + i] = {};
            }

            // Mark rowspan for future rows
            for (let r = 1; r < rowSpan; r++) {
                for (let c = 0; c < colSpan; c++) {
                    spanMap[`${rowIndex + r},${colPointer + c}`] = true;
                }
            }

            colPointer += colSpan;
        });

        // Track max column count
        if (currentRow.length > maxCols) maxCols = currentRow.length;

        matrix.push(currentRow);
    });

    // Normalize all rows to same length (pdfMake requirement)
    matrix.forEach(row => {
        while (row.length < maxCols) {
            row.push({});
        }
    });

    const widths = Array(maxCols).fill('auto');

    return {
        body: matrix,
        widths
    };
}

export const test = async (req, res) => {
    try {
        const tableData = generateTableBody();
        const tableDataB = generateTableBody();

        const definition = {
            pageMargins: [5, 60, 5, 60],
            content: [
                {
                    layout: docUtils.NoPadding,
                    table: {
                        widths: ['*'],
                        body: [
                            [
                                { text: "CUADROS TESTING", style: 'headT', border: docUtils.borderless, margin: [2, 2, 2, 2] }
                            ],
                            [
                                {
                                    border: [true, false, true, false],
                                    margin: [0, 5, 0, 5],
                                    columns: [
                                        {},
                                        {
                                            width: 'auto',
                                            //layout: docUtils.formLayout,
                                            layout: 'lightHorizontalLines',
                                            table: {
                                                headerRows: 1,
                                                widths: tableData.widths,
                                                body: tableData.body
                                            }
                                        },
                                        {}
                                    ]
                                }
                            ],
                            [
                                {
                                    border: [true, false, true, false],
                                    margin: [0, 5, 0, 5],
                                    layout: docUtils.subTable,
                                    table: {
                                        widths: [90, 90, '*', '*'],
                                        body: tableDataB.body
                                    }
                                }
                            ],
                            [
                                {
                                    border: [true, false, true, true],
                                    margin: [2, 2, 2, 2],
                                    text: [
                                        { text: 'Nota: ', style: 'regular', bold: true },
                                        { text: 'La información descrita corresponde y es responsabilidad del solicitante.', style: 'regular' }
                                    ]
                                }
                            ]
                        ]
                    }
                }
            ],
            styles: docUtils.docStyles
        };

        const pdfDoc = printerPDF.createPdfKitDocument(definition);

        res.setHeader('Content-Type', 'application/pdf');
        pdfDoc.info.Title = 'IMDUyV/DLyCU/SYS/000/2025';
        pdfDoc.pipe(res);
        pdfDoc.end();
    } catch (error) {
        console.log('Tha error: ', error);
        res.status(500).json({ msg: "Error on server" });
    }
}

export const testFile = async (req, res) => {
    try {
        res.status(200).json({ msg: "Pong" });
    } catch (error) {
        console.log('Tha error: ', error);
        res.status(500).json({ msg: "Error on server" });
    }
}


export const testScript = async (req, res) => {
    try {
        res.status(200).json({ msg: "Pong" });
    } catch (error) {
        console.log('Tha error: ', error);
        res.status(500).json({ msg: "Error on server" });
    }
}