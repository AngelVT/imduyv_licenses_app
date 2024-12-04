import path from "path";
import { __dirname } from "../paths.js";
import pkg from '../../package.json' with {type: "json"};
import * as logger from "../libs/loggerFunctions.js";
import * as geoTool from "../libs/coordinateChecker.js";
import { Zone } from "../models/License.models.js";

export const goInfo = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'public', 'info.html'));
    } catch (error) {
        logger.logRequestError('Error loading page due to server side error', error);
        res.status(500).json({msg: "Error loading resource"});
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
        logger.logRequestError('Error loading page due to server side error', error);
        res.status(500).json({msg: "Error loading resource"});
    }
};

export const goLogIn = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'public', 'login.html'));
    } catch (error) {
        logger.logRequestError('Error loading page due to server side error', error);
        res.status(500).json({msg: "Error loading resource"});
    }
};

export const goPasswordReset = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'private', 'password_reset.html'));
    } catch (error) {
        logger.logRequestError('Error loading page due to server side error', error);
        res.status(500).json({msg: "Error loading resource"});
    }
};

export const goLandMenu = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'private', 'landuse_menu.html'));
    } catch (error) {
        logger.logRequestError('Error loading page due to server side error', error);
        res.status(500).json({msg: "Error loading resource"});
    }
};

export const goLandRegister = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'private', 'landuse_reg.html'));
    } catch (error) {
        logger.logRequestError('Error loading page due to server side error', error);
        res.status(500).json({msg: "Error loading resource"});
    }
};

export const goLandConsult = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'private', 'landuse_consult.html'));
    } catch (error) {
        logger.logRequestError('Error loading page due to server side error', error);
        res.status(500).json({msg: "Error loading resource"});
    }
};

export const goLandPrint = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'private', 'landuse_print.html'));
    } catch (error) {
        logger.logRequestError('Error loading page due to server side error', error);
        res.status(500).json({msg: "Error loading resource"});
    }
};

export const goUrbanMenu = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'private', 'urban_menu.html'));
    } catch (error) {
        logger.logRequestError('Error loading page due to server side error', error);
        res.status(500).json({msg: "Error loading resource"});
    }
};

export const goUrbanRegister = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'private', 'urban_reg.html'));
    } catch (error) {
        logger.logRequestError('Error loading page due to server side error', error);
        res.status(500).json({msg: "Error loading resource"});
    }
};

export const goUrbanConsult = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'private', 'urban_consult.html'));
    } catch (error) {
        logger.logRequestError('Error loading page due to server side error', error);
        res.status(500).json({msg: "Error loading resource"});
    }
};

export const goUrbanPrint = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'private', 'urban_print.html'));
    } catch (error) {
        logger.logRequestError('Error loading page due to server side error', error);
        res.status(500).json({msg: "Error loading resource"});
    }
};

export const goMainMenu = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'private', 'main_menu.html'));
    } catch (error) {
        requestLogger.error('Page request failed due to server side error:\n    Error: %s', error);
        res.status(500).json({msg: "Error loading resource"});
    }
};

export const goSystemMenu = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'private', 'sys_menu.html'));
    } catch (error) {
        logger.logRequestError('Error loading page due to server side error', error);
        res.status(500).json({msg: "Error loading resource"});
    }
};

export const goUserRegister = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'private', 'user_reg.html'));
    } catch (error) {
        logger.logRequestError('Error loading page due to server side error', error);
        res.status(500).json({msg: "Error loading resource"});
    }
};

export const goUserConsult = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'private', 'user_consult.html'));
    } catch (error) {
        logger.logRequestError('Error loading page due to server side error', error);
        res.status(500).json({msg: "Error loading resource"});
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
        logger.logConsoleError('Zone Info request failed due to server side error', error);
        logger.logRequestError('Zone Info request failed due to server side error', error);
        res.status(500).json({msg: "Error getting the requested zone information."});
    }
};