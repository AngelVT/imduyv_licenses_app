import jwt from 'jsonwebtoken';
import config from '../config.js';
import { User, Role, Group } from '../models/Users.models.js';
import { consoleLogger } from '../logger.js';

export const verifyToken = async (req, res, next) => {
    const clientToken = req.signedCookies.access_token;

    if (!clientToken) {
        consoleLogger.devInfo('\n  Token not provided');
        res.redirect('/app/login');
        return;
    }

    const decoded = jwt.verify(clientToken, config.SECRET)

    if(!decoded.userID || !decoded.username) {
        consoleLogger.devInfo('\n  invalid token provided');
        res.redirect('/app/login');
        return;
    }

    const user = await User.findOne({
        where: { id: decoded.userID, username: decoded.username },
        attributes: ['id','username']
    });

    if(user === null) {
        consoleLogger.devInfo('\n  no user found');
        res.redirect('/app/login');
        return;
    }

    req.userID = user.id;
    
    next();
}

export const isLandUser = async (req, res, next) => {
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
}

export const isUrbanUser = async (req, res, next) => {
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
}

export const isAllUser = async (req, res, next) => {
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
}

export const isModerator = async (req, res, next) => {

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
}

export const isAdmin = async (req, res, next) => {
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
}

export const isSystemAdmin = async (req, res, next) => {
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
}