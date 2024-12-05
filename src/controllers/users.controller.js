import * as logger from "../libs/loggerFunctions.js";
import * as userService from '../services/user.service.js';
import { printerPDF } from "../libs/pdfUtil.js";

export const getUsers = async (req, res) => {
    try {
        const response = await userService.requestAllUsers();

        res.status(response.status).json(response.data);

        logger.logRequestInfo('User get request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Get request -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('User all records request failed due to server side error', error);
        logger.logRequestError('User all records request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const getUser = async (req, res) => {
    try {
        const response = await userService.requestUser(req.params.userID);

        res.status(response.status).json(response.data);

        logger.logRequestInfo('User get request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Get request -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('User record request failed due to server side error', error);
        logger.logRequestError('User record request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const getUserByName = async (req, res) => {
    try {
        const response = await userService.requestUserByName(req.params.name);

        res.status(response.status).json(response.data);

        logger.logRequestInfo('User get request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Get request -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('User record request failed due to server side error', error);
        logger.logRequestError('User record request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const getUserByUsername = async (req, res) => {
    try {
        const response = await userService.requestUserByUsername(req.params.username);

        res.status(response.status).json(response.data);

        logger.logRequestInfo('User get request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Get request -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('User record request failed due to server side error', error);
        logger.logRequestError('User record request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const getUserByGroup = async (req, res) => {
    try {
        const response = await userService.requestUserByGroup(req.params.group);

        res.status(response.status).json(response.data);

        logger.logRequestInfo('User get request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Get request -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('User record request failed due to server side error', error);
        logger.logRequestError('User record request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const createUser = async (req, res) => {
    try {
        const response = await userService.requestUserCreation(req.body);

        res.status(response.status).json(response.data);
        
        logger.logRequestInfo('User create request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Create Request -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('User record create request failed due to server side error', error);
        logger.logRequestError('User record create request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const updateUser = async (req, res) => {
    try {
        const response = await userService.requestUserModification(req.params.userID, req.body);

        res.status(response.status).json(response.data);

        logger.logRequestInfo('User update request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Update request -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('User record update request failed due to server side error', error);
        logger.logRequestError('User record update request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const deleteUser = async (req, res) => {
    try {
        const response = await userService.requestUserDeletion(req.params.userID);

        res.status(response.status).json(response.data);

        logger.logRequestInfo('User delete request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Delete request -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('User record delete request failed due to server side error', error);
        logger.logRequestError('User record delete request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const getUserQR = async (req, res) => {
    try {
        const response = await userService.requestUserQR(req.params.QR);

        if (response.data.def) {
            const pdfDoc = printerPDF.createPdfKitDocument(response.data.def);

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename="${response.data.user}.pdf"`);
        
            pdfDoc.info.Title = 'User QR';
            pdfDoc.pipe(res);
            pdfDoc.end();
        } else {
            res.status(response.status).json(response.data);
        }

        logger.logRequestInfo('User QR request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        QR request -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('User QR request failed due to server side error', error);
        logger.logRequestError('User QR request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const getUserInfo = async (req, res) => {
    try {
        const response = await userService.requestUserInfo(req.userID);

        res.status(response.status).json(response.data);
    } catch (error) {
        logger.logConsoleError('User info request failed due to server side error', error);
        logger.logRequestError('User info request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}