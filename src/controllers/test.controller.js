import { User , Role , Group} from "../models/Users.models.js";
import { UrbanLicense, LandUseLicense, AuthUse, Type, LandLicenseStatus, LandTestReg } from "../models/License.models.js";
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

export const test = async (req, res) => {
    try {

        /*const {name, stat} = req.body;

        const reg = await LandTestReg.create({
            name: name
        });
        reg.createLandState({
            licenseState: stat
        })*/

        /*const target = await LandTestReg.findByPk(1);
        target.update({
            name: "Bolines"
        });

        const targetStatus = await target.getLandState();
        await targetStatus.update({
            licenseState: {
                bolin1: "Bolin izquierdo",
                bolin2: "Bolin derecho",
            }
        })*/
        /*target.destroy();*/
        var lcId = "IMDUyV/DLyCU/###/###/####";

        var definition = {
            content: [
                {
                    text: "\"2024, año de Felipe Carrillo Puerto, Benemérito, Revolucionario y defensor del Mayab\"",
                    alignment: 'center',
                    fontSize: 8,
                    margin: [0,0,0,10]
                },
                {
                    text: "CONSTANCIA DE USO DE SUELO",
                    alignment: 'center',
                    fontSize: 16,
                    bold: true
                },
                {
                    text: lcId,
                    alignment: 'center',
                    fontSize: 12,
                    bold: true
                },
                {
                    columns: [
                        { 
                            table: {
                                body: [
                                    ['c1','c2','c3'],
                                    ['1','2','3']
                                ]
                                
                            }
                        },
                        { text: "xd"}
                    ]
                }
            ]
        };
        
        const pdfDoc = await printerPDF.createPdfKitDocument(definition);

        res.setHeader('Content-Type', 'application/pdf');
        pdfDoc.info.Title = 'Ejemplo';
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