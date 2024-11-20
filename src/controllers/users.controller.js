import { User, Group, Role } from "../models/Users.models.js";
import * as logger from "../libs/loggerFunctions.js";
import { validateUserInfo } from '../libs/validate.js'
import * as passCrypt from '../libs/passwordCrypt.js';
import * as userService from '../services/user.service.js';


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
        logger.logConsoleError('User all records delete request failed due to server side error', error);
        logger.logRequestError('User all records delete request failed due to server side error', error);
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
        const id = req.params.userID;

        const deletedUser = await User.findByPk(id);

        if(deletedUser == null) {
            res.status(404).json({ msg: "The requested user does not exist or is unavailable" });
            return;
        }

        deletedUser.destroy();

        res.status(200).json({msg: "Record deleted successfully"});

        logger.logRequestInfo('User update request completed', 
        `Requestor ID -> ${req.userID}
        Requestor Name -> ${req.name}
        Requestor Username -> ${req.username}
        Deleted -> User:
                    Name -> ${deletedUser.name}
                    Username -> ${deletedUser.username}`);
    } catch (error) {
        logger.logConsoleError('User record delete request failed due to server side error', error);
        logger.logRequestError('User record delete request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const getUserInfo = async (req, res) => {
    try {
        const user = await User.findByPk(req.userID, {
            attributes: ['name'],
            include: {
                model: Group,
                attributes: ['group']
            }
        });

        if (user === null) {
            res.status(404).json({msg: "No user found"});
            return;
        }

        res.status(200).json({
            name: user.name,
            group: user.group.group
        });
    } catch (error) {
        logger.logConsoleError('User record request failed due to server side error', error);
        logger.logRequestError('User record request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}