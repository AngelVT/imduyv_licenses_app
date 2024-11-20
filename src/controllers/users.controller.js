import { User, Group, Role } from "../models/Users.models.js";
import * as logger from "../libs/loggerFunctions.js";
import { validateUserInfo } from '../libs/validate.js'
import * as passCrypt from '../libs/passwordCrypt.js';
import * as userService from '../services/user.service.js';
import { response } from "express";


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
        const response = await userService.requestUserDeletion(req.params.userID);

        res.status(response.status).json(response.data);

        logger.logRequestInfo('User update request completed', 
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