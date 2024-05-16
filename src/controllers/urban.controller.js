import { consoleLogger, requestLogger, accessLogger} from "../logger.js";


export const getLicenses = (req, res) => {
    try {
        res.status(200).json({ msg: "Getting all"});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Error on server"});
    }
}

export const getLicense = (req, res) => {
    try {
        res.status(200).json({ msg: "Getting single"});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Error on server"});
    }
}

export const createLicense = async (req, res) => {
    try {
        const file = req.file.buffer;
        const body = req.body;

        consoleLogger.devInfo('\n   Request file: ');
        console.log(file);
        consoleLogger.devInfo('\n   Request body: ');
        console.log(body);

        requestLogger.create('Created urban license %s', req.body.requestorName);
        accessLogger.access('accesso');

        res.status(200).json({ msg: "Creating"});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Error on server"});
    }
}

export const updateLicense= (req, res) => {
    try {
        res.status(200).json({ msg: "Updating"});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Error on server"});
    }
    
}

export const deleteLicense = (req, res) => {
    try {
        res.status(200).json({ msg: "Deleting"});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Error on server"});
    }
    
}