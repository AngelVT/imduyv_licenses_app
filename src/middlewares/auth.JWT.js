import jwt from 'jsonwebtoken';
import { findUserByIdUsername } from '../repositories/users.repository.js';
import * as userValid from '../validations/user.validations.js';
import * as logger from '../libs/loggerFunctions.js';

export const verifyToken = async (req, res, next) => {
    try {
        const clientToken = req.signedCookies.access_token;

        if (!clientToken) {
            res.redirect('/app/login');
            return;
        }

        const DECODED = jwt.verify(clientToken, process.env.SECRET);

        if(!DECODED.userID || !DECODED.username) {
            res.redirect('/app/login');
            return;
        }

        const USER = await findUserByIdUsername(DECODED.userID, DECODED.username);

        if(USER === null) {
            res.redirect('/app/login');
            return;
        }

        req.userID = USER.id;
        req.name = USER.name;
        req.username = USER.username;
        
        next();
    } catch (error) {
        logger.logConsoleError('Error during token verification', error);
        logger.logAccessError('Error during token verification', error);
        res.status(500).json({msg: "Access denied, error during authentication process"});
    }
}

export const isLandUser = async (req, res, next) => {
    try {
        if(await userValid.belongToGroup(req.userID, 'land_use')) {
            next();
            return;
        }
        
        if (await userValid.belongToGroup(req.userID, 'urban')) {
            res.redirect('/app/urbanMenu');
            return;
        }
    
        res.redirect('/app/login');
        return;
    } catch (error) {
        logger.logConsoleError('Error during group verification', error);
        logger.logAccessError('Error during group verification', error);
        res.status(500).json({msg: "Access denied, error during authentication process"});
    }
}

export const isUrbanUser = async (req, res, next) => {
    try {
        if(await userValid.belongToGroup(req.userID, 'urban')) {
            next();
            return;
        }
        
        if (await userValid.belongToGroup(req.userID, 'land_use')) {
            res.redirect('/app/landMenu');
            return;
        }
    
        res.redirect('/app/login');
        return;
    } catch (error) {
        logger.logConsoleError('Error during group verification', error);
        logger.logAccessError('Error during group verification', error);
        res.status(500).json({msg: "Access denied, error during authentication process"});
    }
}

export const isAllUser = async (req, res, next) => {
    try {
        if(await userValid.belongToGroup(req.userID, 'all')) {
            console.log('first filter')
            next();
            return;
        }
    
        if (await userValid.belongToGroup(req.userID, 'land_use')) {
            res.redirect('/app/landMenu');
            return;
        }
    
        if (await userValid.belongToGroup(req.userID, 'urban')) {
            res.redirect('/app/urbanMenu');
            return;
        }
        
        res.redirect('/app/login');
        return;
    } catch (error) {
        logger.logConsoleError('Error during group verification', error);
        logger.logAccessError('Error during group verification', error);
        res.status(500).json({msg: "Access denied, error during authentication process"});
    }
}

export const isModerator = async (req, res, next) => {
    try {
        if (await userValid.hasRole(req.userID, 4)) {
            next();
            return;
        }
    
        res.status(401).json({msg: "Access denied, elevated privileges required to perform this action"});
    } catch (error) {
        logger.logConsoleError('Error during role verification', error);
        logger.logAccessError('Error during role verification', error);
        res.status(500).json({msg: "Access denied, error during authentication process"});
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        if (await userValid.hasRole(req.userID, 2)) {
            next();
            return;
        }
    
        res.status(401).json({msg: "Access denied, elevated privileges required to perform this action"});
    } catch (error) {
        logger.logConsoleError('Error during role verification', error);
        logger.logAccessError('Error during role verification', error);
        res.status(500).json({msg: "Access denied, error during authentication process"});
    }
}

export const isSystemAdmin = async (req, res, next) => {
    try {
        if (await userValid.hasRole(req.userID, 1)) {
            next();
            return;
        }
    
        res.status(401).json({msg: "Access denied, elevated privileges required to perform this action"});
    } catch (error) {
        logger.logConsoleError('Error during role verification', error);
        logger.logAccessError('Error during role verification', error);
        res.status(500).json({msg: "Access denied, error during authentication process"});
    }
}