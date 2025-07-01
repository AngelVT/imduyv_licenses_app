import path from "path";
import { __dirname } from "../path.configuration.js";
import pkg from '../../package.json' with {type: "json"};
import * as logger from "../utilities/logger.utilities.js";
import { requestCoordinateCheck } from "../services/app.service.js";

export const goInfo = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'resources', 'public', 'info.html'));
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
        res.sendFile(path.join(__dirname, 'resources', 'public', 'login.html'));
    } catch (error) {
        logger.logRequestError('Error loading page due to server side error', error);
        res.status(500).json({msg: "Error loading resource"});
    }
};

export const goPasswordReset = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'resources', 'private', 'password_reset.html'));
    } catch (error) {
        logger.logRequestError('Error loading page due to server side error', error);
        res.status(500).json({msg: "Error loading resource"});
    }
};

export const goLandMenu = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'resources', 'private', 'landuse_menu.html'));
    } catch (error) {
        logger.logRequestError('Error loading page due to server side error', error);
        res.status(500).json({msg: "Error loading resource"});
    }
};

export const goLandRegister = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'resources', 'private', 'landuse_reg.html'));
    } catch (error) {
        logger.logRequestError('Error loading page due to server side error', error);
        res.status(500).json({msg: "Error loading resource"});
    }
};

export const goLandConsult = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'resources', 'private', 'landuse_consult.html'));
    } catch (error) {
        logger.logRequestError('Error loading page due to server side error', error);
        res.status(500).json({msg: "Error loading resource"});
    }
};

export const goLandLegacy = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'resources', 'private', 'landuse_legacy.html'));
    } catch (error) {
        logger.logRequestError('Error loading page due to server side error', error);
        res.status(500).json({msg: "Error loading resource"});
    }
};

export const goLandPrint = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'resources', 'private', 'landuse_print.html'));
    } catch (error) {
        logger.logRequestError('Error loading page due to server side error', error);
        res.status(500).json({msg: "Error loading resource"});
    }
};

export const goUrbanMenu = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'resources', 'private', 'urban_menu.html'));
    } catch (error) {
        logger.logRequestError('Error loading page due to server side error', error);
        res.status(500).json({msg: "Error loading resource"});
    }
};

export const goUrbanRegister = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'resources', 'private', 'urban_reg.html'));
    } catch (error) {
        logger.logRequestError('Error loading page due to server side error', error);
        res.status(500).json({msg: "Error loading resource"});
    }
};

export const goUrbanConsult = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'resources', 'private', 'urban_consult.html'));
    } catch (error) {
        logger.logRequestError('Error loading page due to server side error', error);
        res.status(500).json({msg: "Error loading resource"});
    }
};

export const goUrbanPrint = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'resources', 'private', 'urban_print.html'));
    } catch (error) {
        logger.logRequestError('Error loading page due to server side error', error);
        res.status(500).json({msg: "Error loading resource"});
    }
};

export const goMainMenu = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'resources', 'private', 'main_menu.html'));
    } catch (error) {
        requestLogger.error('Page request failed due to server side error:\n    Error: %s', error);
        res.status(500).json({msg: "Error loading resource"});
    }
};

export const goSystemMenu = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'resources', 'private', 'sys_menu.html'));
    } catch (error) {
        logger.logRequestError('Error loading page due to server side error', error);
        res.status(500).json({msg: "Error loading resource"});
    }
};

export const goUserRegister = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'resources', 'private', 'user_reg.html'));
    } catch (error) {
        logger.logRequestError('Error loading page due to server side error', error);
        res.status(500).json({msg: "Error loading resource"});
    }
};

export const goUserConsult = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'resources', 'private', 'user_consult.html'));
    } catch (error) {
        logger.logRequestError('Error loading page due to server side error', error);
        res.status(500).json({msg: "Error loading resource"});
    }
};

export const goAdministrationMenu = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'resources', 'private', 'administration_panel.html'));
    } catch (error) {
        logger.logRequestError('Error loading page due to server side error', error);
        res.status(500).json({msg: "Error loading resource"});
    }
};

export const getZoneInfo = async (req, res) => {
    try {
        const response = await requestCoordinateCheck(req.params.coordinates);

        res.status(response.status).json(response.data);
    } catch (error) {
        logger.logConsoleError('Zone Info request failed due to server side error', error);
        logger.logRequestError('Zone Info request failed due to server side error', error);
        res.status(500).json({msg: "Error getting the requested zone information."});
    }
};