import fs from 'fs/promises';
import { __dirname, __dirstorage } from "../paths.js";
import path from "path";

import { Op, where } from 'sequelize';
import { LandUseLicense } from '../models/License.models.js'

export const test = async (req, res) => {
    try {
        const RES = await LandUseLicense.findOne(
            {
                where: {
                    [Op.and]: [
                        { requestDate: { [Op.lte]: '2025-06-09' } },
                        { expirationDate: { [Op.gte]: '2025-06-09' } }
                    ]
                }
            }
        );

        res.status(200).json(RES);
    } catch (error) {
        console.log('Tha error: ', error);
        res.status(500).json({ msg: "Error on server" });
    }
}

export const testFile = async (req, res, next) => {
    try {
        const filePath = path.join(__dirstorage, 'dddepth-293.jpg');

        res.sendFile(filePath);
    } catch (error) {
        console.log('Tha error: ', error);
        res.status(500).json({ msg: "Error on server" });
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
        res.status(500).json({ msg: "Error on server" });
    }
}