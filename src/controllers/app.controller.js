import path from "path";
import { __dirname } from "../paths.js";
import pkg from '../../package.json' with {type: "json"};
import { consoleLogger, requestLogger } from "../logger.js";
import * as geoTool from "../libs/coordinateChecker.js";
import { Zone } from "../models/License.models.js";

export const goInfo = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'public', 'info.html'));
    } catch (error) {
        console.log('The following error ocurred: ', error);
        res.status(500).json({msg: "Error on server"});
    }
};

export const getInfo =(req, res) => {
    try {
        res.status(200).json({
            appName: pkg.name,
            version: pkg.version,
            description: pkg.description,
            author: pkg.author
        });
    } catch (error) {
        console.log('The following error ocurred: ', error);
        res.status(500).json({msg: "Error on server"});
    }
};

export const goLogIn = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'public', 'login.html'));
    } catch (error) {
        console.log('The following error ocurred: ', error);
        res.status(500).json({msg: "Error on server"});
    }
};

export const goLandMenu = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'private', 'landuse_menu.html'));
    } catch (error) {
        console.log('The following error ocurred: ', error);
        res.status(500).json({msg: "Error on server"});
    }
};

export const goLandRegister = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'private', 'landuse_reg.html'));
    } catch (error) {
        console.log('The following error ocurred: ', error);
        res.status(500).json({msg: "Error on server"});
    }
};

export const goLandConsult = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'private', 'landuse_consult.html'));
    } catch (error) {
        console.log('The following error ocurred: ', error);
        res.status(500).json({msg: "Error on server"});
    }
};

export const goLandPrint = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'private', 'landuse_print.html'));
    } catch (error) {
        console.log('The following error ocurred: ', error);
        res.status(500).json({msg: "Error on server"});
    }
};

export const goUrbanMenu = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'private', 'urban_menu.html'));
    } catch (error) {
        console.log('The following error ocurred: ', error);
        res.status(500).json({msg: "Error on server"});
    }
};

export const goUrbanRegister = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'private', 'urban_reg.html'));
    } catch (error) {
        console.log('The following error ocurred: ', error);
        res.status(500).json({msg: "Error on server"});
    }
};

export const goUrbanConsult = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'private', 'urban_consult.html'));
    } catch (error) {
        console.log('The following error ocurred: ', error);
        res.status(500).json({msg: "Error on server"});
    }
};

export const goUrbanPrint = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'private', 'urban_print.html'));
    } catch (error) {
        console.log('The following error ocurred: ', error);
        res.status(500).json({msg: "Error on server"});
    }
};

export const goMainMenu = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'private', 'main_menu.html'));
    } catch (error) {
        console.log('The following error ocurred: ', error);
        res.status(500).json({msg: "Error on server"});
    }
};

export const getZoneInfo = async (req, res) => {
    try {
        const georeference = req.params.coordinates;

        let coord = geoTool.invertCoords(georeference);

        let result = geoTool.check(coord);

        if (!result) {
            res.status(404).json({ msg: "The location requested does not exist in the database" });
            return;
        }

        const zone = await Zone.findOne({
            where: {
                licenseKey: result.key
            }
        });

        if (!zone) {
            res.status(404).json({ msg: "The location seems to be out of scope" });
            return;
        }

        const data = {
            numericZone: zone.id,
            zone: zone.licenseZone,
            key: zone.licenseKey,
            term: result.term
        }

        res.status(200).json({ msg: "Location found", georeference: coord.reverse(), data });
        return;
    } catch (error) {
        consoleLogger.error('\n  Request failed due to server side error:\n  Error: %s', error)
        requestLogger.error('Request failed due to server side error:\n    Error: %s', error);
        res.status(500).json({msg: "Internal server error"});
    }
};