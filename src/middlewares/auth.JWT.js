import jwt from 'jsonwebtoken';
import { findUserByIdUsername } from '../repositories/users.repository.js';
import * as logger from '../utilities/logger.utilities.js';

export function verifyToken(options = { redirect: false, logInPath: '/app/login' }) {
    return async function (req, res, next) {
        const destination = encodeURI(req.originalUrl);
        const logInDestination = `${options.logInPath}?url=${destination}`;
        const failedResponse = () => options.redirect
            ? res.redirect(logInDestination)
            : res.status(401).json({ msg: 'An invalid token was provided', redirectTo: options.logInPath });

        try {
            const clientToken = req.signedCookies.access_token;

            if (!clientToken) return failedResponse();

            let decoded;
            try {
                decoded = jwt.verify(clientToken, process.env.SECRET, { algorithms: ['HS256'] });
            } catch (err) {
                return failedResponse();
            }

            const { userID, username } = decoded;

            if (!userID || !username) return failedResponse();

            const USER = await findUserByIdUsername(userID, username);

            if (!USER) return failedResponse();

            if (USER.locked) {
                res.clearCookie("access_token", {
                    httpOnly: true,
                    secure: true,
                    signed: true,
                    sameSite: 'strict'
                });

                return options.redirect
                    ? res.status(401).redirect('/?msg=Tu cuenta esta bloqueada&code=401')
                    : res.status(401).json({ msg: 'Your account is locked. Please contact your system administrator.' });
            }

            req.user = {
                id: USER.user_id,
                uuid: USER.public_user_id,
                name: USER.name,
                username: USER.username,
                role: USER.role.role,
                group: USER.group.group,
                isPasswordResetRequired: USER.requiredPasswordReset
            };

            next();
        } catch (error) {
            logger.logConsoleError('Error during token verification', error);
            logger.logAccessError('Error during token verification', error);
            return res.status(500).json({ msg: "Access denied, error during authentication process" });
        }
    }
}

export const accountIntegrity = async (req, res, next) => {
    try {
        if (typeof req.user.isPasswordResetRequired !== 'boolean'/* || typeof req.isLocked !== 'boolean'*/) {
            return res.redirect('/?msg=Acceso invalido&code=401');
        }

        /*if (req.isLocked) {
            return res.clearCookie("access_token", {
                httpOnly: true,
                secure: true,
                signed: true,
                sameSite: 'strict'
            }).status(401).redirect('/?msg=Tu cuenta esta bloqueada&code=401');
        }*/

        if (req.user.isPasswordResetRequired)
            return res.redirect('/app/passwordReset');

        next();
    } catch (error) {
        logger.logConsoleError('Error during password change required verification', error);
        logger.logAccessError('Error during password change required verification', error);
        res.status(500).json({ msg: "Access denied, error during authentication process" });
    }
}

export function verifyGroup(allowedGroups = [], options = { isMenu: false }) {
    return function (req, res, next) {
        const userGroup = req.user.group;

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
        const userRole = req.user.role;

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