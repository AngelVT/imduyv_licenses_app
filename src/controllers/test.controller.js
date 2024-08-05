import { User , Role , Group} from "../models/Users.models.js";
import { UrbanLicense, LandUseLicense, AuthUse, Type} from "../models/License.models.js";
import * as passCrypt from '../libs/passwordCrypt.js';
import jwt from 'jsonwebtoken';
import config from "../config.js";
import fs from 'fs/promises';
import { __dirname, __dirstorage } from "../paths.js";
import path from "path";
import { generateLandInvoice, generateUrbanInvoice } from "../libs/fullInvoiceGen.js";
import { consoleLogger, requestLogger } from "../logger.js";
import { statSync } from "fs";
import { request } from "http";

import { printerPDF } from "../libs/pdfUtil.js";
import { generateLandUseC } from "../models/docs/landUse/constanciaLU.js";
import { generateLandUseL } from "../models/docs/landUse/licenciaL.js";
import { generateLandUseDP } from "../models/docs/landUse/licenciaDP.js";
import * as docUtils from "../models/docs/docUtils/utils.js";
import { generateUrbanC } from "../models/docs/urban/constanciaU.js";
import { generateUrbanLUS } from "../models/docs/urban/licenciaLUS.js";
import { generateUrbanLSUB } from "../models/docs/urban/licenciaLSUB.js";
import { generateUrbanLFUS } from "../models/docs/urban/licenciaLFUS.js";
import { generateUrbanCRPC } from "../models/docs/urban/licenciaCRPC.js";
import { generateUrbanLF } from "../models/docs/urban/licenciaLF.js";

export const test = async (req, res) => {
    try {
        const def = generateUrbanLF(docUtils.recordExample);

        const pdfDoc = await printerPDF.createPdfKitDocument(def);

        res.setHeader('Content-Type', 'application/pdf');
        pdfDoc.info.Title = 'IMDUYV/DLYCU/C/001/2024';
        pdfDoc.pipe(res);
        pdfDoc.end();
    } catch (error) {
        console.log('Tha error: ', error);
        res.status(500).json({msg: "Error on server"});
    }
}

export const testFile = async (req, res, next) => {
    try {
        const filePath = path.join(__dirstorage, 'dddepth-293.jpg');

        res.sendFile(filePath);
    } catch (error) {
        console.log('Tha error: ', error);
        res.status(500).json({msg: "Error on server"});
    }
}


export const testScript = async (req, res, next) => {
    try {
        const destination = path.join(__dirstorage, 'test.js');

        const json = JSON.stringify({
                "type": "create:compacting",
                "heatRequirement": "heated",
                "ingredients": [
                    {
                        "item": "minecraft:gold_ingot"
                    },
                    {
                        "item": "minecraft:gold_ingot"
                    },
                    {
                        "item": "minecraft:netherite_scrap"
                    },
                    {
                        "item": "minecraft:netherite_scrap"
                    }
                ],
                "results": [
                    {
                        "item": "minecraft:netherite_ingot",
                        "count": 1
                    }
                ]
            });

        const script = `
ServerEvents.recipes(event => {
    event.custom(${json})
});
        `;

        const data = await fs.writeFile(destination, script, 'utf-8', err => {
            if (err) {
                console.log(err);
            }
        });

        console.log(data);

        res.status(200).sendFile(destination);
    } catch (error) {
        console.log('Tha error: ', error);
        res.status(500).json({msg: "Error on server"});
    }
}