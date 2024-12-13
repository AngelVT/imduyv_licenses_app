import PdfPrinter from 'pdfmake';
import { __dirname } from '../path.configuration.js';
import path from 'path';

const fonts = {
    Roboto: {
        normal: path.join(__dirname, 'public', 'css', 'fonts', 'Montserrat-Regular.ttf'),
        bold: path.join(__dirname, 'public', 'css', 'fonts', 'Montserrat-Bold.ttf'),
        italics: path.join(__dirname, 'public', 'css', 'fonts', 'Montserrat-Italic.ttf'),
        bolditalics: path.join(__dirname, 'public', 'css', 'fonts', 'Montserrat-BoldItalic.ttf')
    }
};

export const printerPDF = new PdfPrinter(fonts);