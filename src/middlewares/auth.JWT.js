import jwt from 'jsonwebtoken';
import config from '../config.js';
import { User, Role, Group } from '../models/Users.models.js';
import { consoleLogger } from '../logger.js';

export const verifyToken = async (req, res, next) => {
    const clientToken = req.signedCookies.access_token;

    if (!clientToken) {
        consoleLogger.devInfo('\n  Token not provided');
        next();
        return;
    } else {
        consoleLogger.devInfo('\n  Token provided: %s', clientToken);
    }

    const decoded = jwt.verify(clientToken, config.SECRET)

    if(!decoded.userID || !decoded.username) {
        consoleLogger.devInfo('\n  invalid token provided');
        next();
        return;
    } else {
        console.log(decoded.userID , decoded.username);
    }

    const user = await User.findOne({
        where: { id: decoded.userID, username: decoded.username },
        attributes: ['id','username']
    });

    if(user === null) {
        consoleLogger.devInfo('\n  no user found');
        next();
        return;
    }

    console.log(JSON.stringify(user));

    req.userID = user.id;
    
    next();
}

export const isModerator = async (req, res, next) => {
    console.log("Verifying Moderator Role");
    console.log(req.userID);

    const user = await User.findByPk(req.userID);

    console.log(JSON.stringify(user));

    next();
}

export const isAdmin = async (req, res, next) => {
    console.log("Verifying Admin role");
    console.log(req.userID);

    const user = await User.findByPk(req.userID);

    console.log(JSON.stringify(user));

    next();
}

export const isLandUser = async (req, res, next) => {
    console.log("Verifying Land user group");
    console.log(req.userID);

    const user = await User.findByPk(req.userID, {
        include: {
            model: Group,
            attributes:['group']
        }
    });

    if (user === null) {
        console.log('no user found');
        next();
        return;
    }

    if(user.group.group == 'land_use' || user.group.group == 'all') {
        console.log('User belongs to this group');
        console.log(user.group.group);
        next();
        return;
    }
    
    console.log('User does not belong to this group');
    next();
}

export const isUrbanUser = async (req, res, next) => {
    console.log("Verifying Urban user group");
    console.log(req.userID);

    const user = await User.findByPk(req.userID, {
        include: {
            model: Group,
            attributes:['group']
        }
    });

    if (user === null) {
        console.log('no user found');
        next();
        return;
    }

    if(user.group.group == 'urban' || user.group.group == 'all') {
        console.log('User belongs to this group');
        console.log(user.group.group);
        next();
        return;
    }
    
    console.log('User does not belong to this group');
    next();
}

export const isAllUser = async (req, res, next) => {
    console.log("Verifying all user group");
    console.log(req.userID);

    const user = await User.findByPk(req.userID, {
        include: {
            model: Group,
            attributes:['group']
        }
    });

    if (user === null) {
        console.log('no user found');
        next();
        return;
    }

    if(user.group.group == 'all') {
        console.log('User belongs to this group');
        console.log(user.group.group);
        next();
        return;
    }
    
    console.log('User does not belong to this group');
    next();
}