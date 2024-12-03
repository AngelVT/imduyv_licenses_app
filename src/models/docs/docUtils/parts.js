import path from "path";

import * as docUtils from "../docUtils/utils.js";
import jwt from 'jsonwebtoken';
import { __dirname } from "../../../paths.js";

export async function generateTest(lcDBObj, host) {
    return {
        pageSize: {
            width: 160,
            height: 160
        },
        pageMargins: [ 5, 5, 5, 5 ],
        styles: docUtils.docStyles,
        content: [
            {
                qr: `Nombre: AngelVelazquez Garcia\nUsuario: angvar\nContrasena: 123456789012`,
                alignment: 'center',
                eccLevel: 'M',
                fit: 150,
            }
        ]
    };
}

function genDocToken() {
    const token = jwt.sign(
        {
            licenseDB: 1,
            licenseInvoice: 'IMDUYV/DLYCU/C/001/2024',
            expeditionDate: '2024-11-13',
            expirationDate: '2025-11-13',
            licenseInvoice: 1,
            licenseType: 1,
            licenseYear: 2024,
            requestor: 'angel velazquez garcia',
            billInvoice: 'C-1995'
        }, 
        process.env.SECRET_DOC);
        console.log(token);
    return token;
}