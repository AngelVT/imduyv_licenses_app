import { __dirname, __dirstorage } from "../path.configuration.js";
import { printerPDF } from "../utilities/pdf.utilities.js";
import * as docUtils from '../utilities/document.utilities.js';
import { load } from 'cheerio';
import path from 'path';
import fs from 'fs';

function generateTableBody() {
    const html = fs.readFileSync(path.join(__dirstorage, 'test.xhtml'), 'utf-8');
    const $ = load(html);

    const table = $('table').first();
    const rows = table.find('tr');
    const matrix = []; // Final table structure
    const spanMap = {}; // Track rowspan leftovers

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
            const cellText = $cell.text().trim();
            const colSpan = parseInt($cell.attr('colspan')) || 1;
            const rowSpan = parseInt($cell.attr('rowspan')) || 1;

            // Place cell in currentRow at correct position
            const cellObj = {
                text: cellText,
                colSpan,
                rowSpan
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

    // Generate the widths array
    const widths = Array(maxCols).fill('*');

    return {
        body: matrix,
        widths
    };
}

export const test = async (req, res) => {
    try {
        const tableData = generateTableBody();

        console.log(tableData.widths)

        const definition = {
            content: [
                {
                    table: {
                        widths: ['*'],
                        body: [
                            [
                                { text: "NORMAS DE COMPATIBILIDADES Y APROVECHAMIENTO", style: 'headT', border: docUtils.borderless }
                            ],
                            [
                                {
                                    table: {
                                        widths: tableData.widths,
                                        body: tableData.body
                                    },
                                    layout: docUtils.formLayout
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