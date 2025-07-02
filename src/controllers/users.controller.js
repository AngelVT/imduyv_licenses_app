import { requestHandler } from "../utilities/request.utilities.js";
import * as logger from "../utilities/logger.utilities.js";
import * as userService from '../services/user.service.js';
import { printerPDF } from "../utilities/pdf.utilities.js";

export const getUsers = requestHandler(
    async function (req, res) {
        const response = await userService.requestAllUsers();

        res.status(200).json(response);

        logger.logRequestInfo('User get request completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        User request -> All users requested`);
    }
);

export const getUser = requestHandler(
    async function (req, res) {
        const id = req.params.userID;

        const response = await userService.requestUser(id);

        res.status(200).json(response);

        logger.logRequestInfo('User get request completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Requested record -> ${id}:${response.user.username}`);
    }
);

export const getUserByName = requestHandler(
    async function (req, res) {
        const name = decodeURIComponent(req.params.name);

        const response = await userService.requestUserByName(name);

        res.status(200).json(response);

        logger.logRequestInfo('User get request completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Requested records -> Where name is like ${name}`);
    }
);

export const getUserByUsername = requestHandler(
    async function (req, res) {
        const username = decodeURIComponent(req.params.username);

        const response = await userService.requestUserByUsername(username);

        res.status(200).json(response);

        logger.logRequestInfo('User get request completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Requested record -> ${response.user.public_user_id}:${username}`);
    }
);

export const getUserByGroup = requestHandler(
    async function (req, res) {
        const group = req.params.group;

        const response = await userService.requestUserByGroup(group);

        res.status(200).json(response);

        logger.logRequestInfo('User get request completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Requested records -> Users of group ${group}`);
    }
);

export const createUser = requestHandler(
    async function (req, res) {
        const data = req.body;

        const response = await userService.requestUserCreation(data);

        res.status(200).json(response);

        logger.logRequestInfo('User create request completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Requested record creation -> ${response.user.public_user_id}:${response.user.username}
        Data -> ${JSON.stringify(data)}`);
    }
);

export const updateUser = requestHandler(
    async function (req, res) {
        const id = req.params.userID;
        const data = req.body;

        const response = await userService.requestUserModification(id, data);

        res.status(200).json(response);

        logger.logRequestInfo('User update request completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Requested record update -> ${id}:${response.user.username}
        Data -> ${JSON.stringify(data)}`);
    }
);

export const deleteUser = requestHandler(
    async function (req, res) {
        const id = req.params.userID;

        const response = await userService.requestUserDeletion(id);

        res.status(200).json(response.data);

        logger.logRequestInfo('User delete request completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Requested record deletion -> ${id}:${response.user.username}`);
    }
);

export const getUserQR = requestHandler(
    async function (req, res) {
        const QRtoken = req.params.QR;

        const response = await userService.requestUserQR(QRtoken);

        const pdfDoc = printerPDF.createPdfKitDocument(response.definition);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${response.user}.pdf"`);

        pdfDoc.info.Title = 'User QR';
        pdfDoc.pipe(res);
        pdfDoc.end();

        logger.logRequestInfo('User QR request completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Requested QR -> ${response.user}`);
    }
);