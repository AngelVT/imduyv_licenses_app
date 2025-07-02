import { requestHandler } from '../utilities/request.utilities.js';
import { requestPasswordReset, requestSignIn } from '../services/auth.service.js';
import * as logger from '../utilities/logger.utilities.js';
import config from '../configuration/general.configuration.js';

export const signIn = requestHandler(async (req, res) => {
    const { username, password } = req.body;

    const userInfo = await requestSignIn(username, password);

    const { name, user, user_group, user_role } = userInfo.user_info;

    res.cookie("access_token", userInfo.TOKEN, {
        httpOnly: true,
        secure: true,
        signed: true,
        sameSite: 'strict',
        maxAge: config.COOKIE_EXP
    });

    res.cookie("session_info", JSON.stringify({
        name,
        user,
        user_group,
        user_role
    }), {
        secure: true,
        sameSite: 'strict',
        path: '/app',
        maxAge: config.COOKIE_EXP
    });

    res.status(200).json({ redirectTo: userInfo.redirection });

    logger.logAccessInfo('Sign In completed',
        `Access details:
            ID -> ${userInfo.user_info.ID}
            Name -> ${userInfo.user_info.name}
            Username -> ${userInfo.user_info.username}`);
});

export const logOut = (req, res) => {
    res.clearCookie("access_token", {
        httpOnly: true,
        secure: true,
        signed: true,
        sameSite: 'strict'
    });

    res.clearCookie("session_info", {
        secure: true,
        sameSite: 'strict',
        path: '/app'
    });

    return res.status(200).json({ redirectTo: '/app/login' });
}

export const passwordReset = requestHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    const response = await requestPasswordReset(currentPassword, newPassword, { userID: req.user.uuid, username: req.user.username });

    res.status(200).json(response.msg);

    logger.logAccessInfo('Password reset attempt',
        `Details:
            Successful, password changed
                Requestor ID -> ${response.userInfo.ID}
                Requestor Name -> ${response.userInfo.name}
                Requestor Username -> ${response.userInfo.username}`);
}
);