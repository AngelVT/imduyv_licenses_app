import jwt from 'jsonwebtoken';
import { findUserByIdUsername } from '../repositories/users.repository.js';
import * as userValid from '../validations/user.validations.js';
import * as logger from '../utilities/logger.utilities.js';

export const verifyToken = async (req, res, next) => {
    try {
        const clientToken = req.signedCookies.access_token;
        const destination = encodeURI(req.originalUrl);

        if (!clientToken) {
            res.redirect(`/app/login?url=${destination}`);
            return;
        }

        const DECODED = jwt.verify(clientToken, process.env.SECRET);

        if (!DECODED.userID || !DECODED.username) {
            res.redirect(`/app/login?url=${destination}`);
            return;
        }

        const USER = await findUserByIdUsername(DECODED.userID, DECODED.username);

        if (USER === null) {
            res.redirect(`/app/login?url=${destination}`);
            return;
        }

        req.userID = USER.user_id;
        req.userUUID = USER.public_user_id;
        req.name = USER.name;
        req.username = USER.username;
        req.userRole = USER.role.role;
        req.userGroup = USER.group.group;
        req.isPasswordResetRequired = Boolean(USER.requiredPasswordReset);
        req.isLocked = Boolean(USER.locked);

        next();
    } catch (error) {
        logger.logConsoleError('Error during token verification', error);
        logger.logAccessError('Error during token verification', error);
        res.status(500).json({ msg: "Access denied, error during authentication process" });
    }
}

export const accountIntegrity = async (req, res, next) => {
    try {
        if (typeof req.isPasswordResetRequired !== 'boolean' || typeof req.isLocked !== 'boolean') {
            return res.redirect('/?msg=Acceso invalido&code=401');
        }

        if (req.isLocked) {
            return res.clearCookie("access_token", {
                httpOnly: true,
                secure: true,
                signed: true,
                sameSite: 'strict'
            }).status(401).redirect('/?msg=Tu cuenta esta bloqueada&code=401');
        }

        if (req.isPasswordResetRequired)
            return res.redirect('/app/passwordReset');

        next();
    } catch (error) {
        logger.logConsoleError('Error during password change required verification', error);
        logger.logAccessError('Error during password change required verification', error);
        res.status(500).json({ msg: "Access denied, error during authentication process" });
    }
}

/*export const isLandUser = async (req, res, next) => {
    try {
        if (await userValid.belongToGroup(req.userID, 'land_use')) {
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
        res.status(500).json({ msg: "Access denied, error during authentication process" });
    }
}

export const isUrbanUser = async (req, res, next) => {
    try {
        if (await userValid.belongToGroup(req.userID, 'urban')) {
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
        res.status(500).json({ msg: "Access denied, error during authentication process" });
    }
}

export const isAllUser = async (req, res, next) => {
    try {
        if (await userValid.belongToGroup(req.userID, 'all')) {
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
        res.status(500).json({ msg: "Access denied, error during authentication process" });
    }
}

export const isModerator = async (req, res, next) => {
    try {
        if (await userValid.hasRole(req.userID, 3)) {
            next();
            return;
        }

        res.status(401).json({ msg: "Access denied, elevated privileges required to perform this action" });
    } catch (error) {
        logger.logConsoleError('Error during role verification', error);
        logger.logAccessError('Error during role verification', error);
        res.status(500).json({ msg: "Access denied, error during authentication process" });
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        if (await userValid.hasRole(req.userID, 2)) {
            next();
            return;
        }

        res.status(401).json({ msg: "Access denied, elevated privileges required to perform this action" });
    } catch (error) {
        logger.logConsoleError('Error during role verification', error);
        logger.logAccessError('Error during role verification', error);
        res.status(500).json({ msg: "Access denied, error during authentication process" });
    }
}

export const isSystemAdmin = async (req, res, next) => {
    try {
        if (await userValid.hasRole(req.userID, 1)) {
            next();
            return;
        }

        res.status(401).json({ msg: "Access denied, elevated privileges required to perform this action" });
    } catch (error) {
        logger.logConsoleError('Error during role verification', error);
        logger.logAccessError('Error during role verification', error);
        res.status(500).json({ msg: "Access denied, error during authentication process" });
    }
}*/

export function verifyGroup(allowedGroups = [], options = { isMenu: false }) {
    return function (req, res, next) {
        const userGroup = req.userGroup;

        if (!userGroup) {
            return res.status(403).json({ msg: 'Access denied: No group membership.' });
        }

        if (allowedGroups.includes(userGroup)) {
            return next();
        }

        if (options.isMenu) {
            return redirectToMenu(userGroup, res);
        }

        return res.status(403).json({ msg: 'Access denied: Insufficient group privileges.' });
    }
}

export function verifyRole(allowedRoles = [], options = { isMenu: false }) {
    return function (req, res, next) {
        const userRole = req.userRole;

        if (!userRole) {
            return res.status(403).json({ msg: 'Access denied: No role associated with user' });
        }

        if (allowedRoles.includes(userRole)) {
            return next();
        }

        if (options.isMenu) {
            return redirectToMenu(req.userGroup, res);
        }

        return res.status(403).json({ msg: 'Access denied: Insufficient role privileges.' });
    }
}

function redirectToMenu(userGroup, res) {
    if (userGroup === 'land_use') {
        return res.redirect('/app/landMenu');
    }

    if (userGroup === 'urban') {
        return res.redirect('/app/urbanMenu');
    }

    if (userGroup === 'all') {
        return res.redirect('/app/mainMenu');
    }
}