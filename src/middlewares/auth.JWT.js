import jwt from 'jsonwebtoken';
import { User, Role, Group } from '../models/Users.models.js';
import * as logger from '../libs/loggerFunctions.js';

export const verifyToken = async (req, res, next) => {
    try {
        const clientToken = req.signedCookies.access_token;

        if (!clientToken) {
            res.redirect('/app/login');
            return;
        }

        const decoded = jwt.verify(clientToken, process.env.SECRET);

        if(!decoded.userID || !decoded.username) {
            res.redirect('/app/login');
            return;
        }

        const user = await User.findOne({
            where: { id: decoded.userID, username: decoded.username },
            attributes: ['id','name','username']
        });

        if(user === null) {
            res.redirect('/app/login');
            return;
        }

        req.userID = user.id;
        req.name = user.name;
        req.username = user.username;
        
        next();
    } catch (error) {
        logger.logConsoleError('Error during token verification', error);
        logger.logAccessError('Error during token verification', error);
        res.status(500).json({msg: "Access denied, error during authentication process"});
    }
}

export const isLandUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userID, {
            include: {
                model: Group,
                attributes:['group']
            }
        });
    
        if (user === null) {
            res.redirect('/app/login');
            return;
        }
    
        if(user.group.group == 'land_use' || user.group.group == 'all') {
            next();
            return;
        }
        
        if (user.group.group == 'urban') {
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
        const user = await User.findByPk(req.userID, {
            include: {
                model: Group,
                attributes:['group']
            }
        });
    
        if (user === null) {
            res.redirect('/app/login');
            return;
        }
    
        if(user.group.group == 'urban' || user.group.group == 'all') {
            next();
            return;
        }
        
        if (user.group.group == 'land_use') {
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
        const user = await User.findByPk(req.userID, {
            include: {
                model: Group,
                attributes:['group']
            }
        });
    
        if (user === null) {
            res.redirect('/app/login');
            return;
        }
    
        if(user.group.group == 'all') {
            next();
            return;
        }
    
        if (user.group.group == 'land_use') {
            res.redirect('/app/landMenu');
            return;
        }
    
        if (user.group.group == 'urban') {
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
        const user = await User.findByPk(req.userID, {
            include: {
                model: Role,
                attributes:['role']
            }
        });
    
        if (user.role.role == 'moderator' || user.role.role == 'admin' || user.role.role == 'system') {
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
        const user = await User.findByPk(req.userID, {
            include: {
                model: Role,
                attributes:['role']
            }
        });
    
        if (user.role.role == 'admin' || user.role.role == 'system') {
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
        const user = await User.findByPk(req.userID, {
            include: {
                model: Role,
                attributes:['role']
            }
        });
    
        if (user.role.role == 'system') {
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