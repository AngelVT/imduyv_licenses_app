import { accessLogger,consoleLogger, requestLogger } from "../logger.js";


export const getLicenses = (req, res) => {
    res.status(200).json({ msg: "Getting all"});
}

export const getLicense = (req, res) => {
    res.status(200).json({ msg: "Getting single"});
}

export const createLicense = (req, res) => {
    const file = req.file.buffer;
    const body = req.body;

    consoleLogger.devInfo('\n   Request file: ');
    console.log(file);
    consoleLogger.devInfo('\n   Request body: ');
    console.log(body);

    requestLogger.create('Created land license %s', req.body.requestorName);
    accessLogger.access('accesso');

    res.status(200).json({ msg: "Creating"});
}

export const updateLicense= (req, res) => {
    res.status(200).json({ msg: "Updating"});
}

export const deleteLicense = (req, res) => {
    res.status(200).json({ msg: "Deleting"});
}