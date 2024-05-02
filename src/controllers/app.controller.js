import path from "path";
import { __dirname } from "../paths.js";
import pkg from '../../package.json' with {type: "json"};

export const goInfo = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'pages', 'info.html'));
    } catch (error) {
        console.log('The following error ocurred: ', error);
        res.status(200).json({msg: "Error on server"});
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
        res.status(200).json({msg: "Error on server"});
    }
};

export const goLogIn = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'pages', 'login.html'));
    } catch (error) {
        console.log('The following error ocurred: ', error);
        res.status(200).json({msg: "Error on server"});
    }
};

export const goLandMenu = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'pages', 'landuse_menu.html'));
    } catch (error) {
        console.log('The following error ocurred: ', error);
        res.status(200).json({msg: "Error on server"});
    }
};

export const goLandRegister = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'pages', 'landuse_reg.html'));
    } catch (error) {
        console.log('The following error ocurred: ', error);
        res.status(200).json({msg: "Error on server"});
    }
};

export const goLandConsult = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'pages', 'landuse_consult.html'));
    } catch (error) {
        console.log('The following error ocurred: ', error);
        res.status(200).json({msg: "Error on server"});
    }
};

export const goLandPrint = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'pages', 'landuse_print.html'));
    } catch (error) {
        console.log('The following error ocurred: ', error);
        res.status(200).json({msg: "Error on server"});
    }
};

export const goUrbanMenu = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'pages', 'urban_menu.html'));
    } catch (error) {
        console.log('The following error ocurred: ', error);
        res.status(200).json({msg: "Error on server"});
    }
};

export const goUrbanRegister = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'pages', 'urban_reg.html'));
    } catch (error) {
        console.log('The following error ocurred: ', error);
        res.status(200).json({msg: "Error on server"});
    }
};

export const goUrbanConsult = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'pages', 'urban_consult.html'));
    } catch (error) {
        console.log('The following error ocurred: ', error);
        res.status(200).json({msg: "Error on server"});
    }
};

export const goUrbanPrint = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'pages', 'urban_print.html'));
    } catch (error) {
        console.log('The following error ocurred: ', error);
        res.status(200).json({msg: "Error on server"});
    }
};

export const goMainMenu = (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'main_menu.html'));
};