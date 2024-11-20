import { __dirstorage } from "../../../paths.js";
import * as docUtils from "../docUtils/utils.js";
import jwt from 'jsonwebtoken';

export async function generateTest(lcDBObj, host) {

    lcDBObj = docUtils.prepareData(lcDBObj);

    var definition = {
        pageMargins: [ 5, 60, 5, 70 ],
        styles: docUtils.docStyles,
        content: [
            {
                qr: genDocToken(),
                alignment: 'center',
                fit: 150,
                margin: [0,0,0, 5]

            }
        ]
    };
    return definition;
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