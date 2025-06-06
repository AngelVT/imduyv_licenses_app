import { requestPasswordReset, requestSignIn } from '../services/auth.service.js';
import * as logger from '../utilities/logger.utilities.js';
import config from '../configuration/general.configuration.js';

export const signIn = async (req, res) => {
    try {
        const response = await requestSignIn(req.body);

        if (response.data.token && response.data.redirection) {
            res.cookie("access_token", response.data.token, {httpOnly: true,
                secure: true,
                signed: true,
                sameSite: 'strict',
                maxAge: config.COOKIE_EXP
            }).status(response.status).json({redirectTo: response.data.redirection});
        } else {
            res.status(response.status).json(response.data);
        }

        logger.logAccessInfo('sign in completed', 
            `Sign in request -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('Sign in request failed due to server side error', error);
        logger.logRequestError('Sign in request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const passwordReset = async (req, res) => {
    try {
        const response = await requestPasswordReset(req);

        res.status(response.status).json(response.data);

        logger.logAccessInfo('Sign in completed', 
            `Requestor ID -> ${req.userID}
            Requestor Name -> ${req.name}
            Requestor Username -> ${req.username}
            Password reset request -> ${response.log}`);
    } catch (error) {
        logger.logConsoleError('Sign in request failed due to server side error', error);
        logger.logRequestError('Sign in request failed due to server side error', error);
        res.status(500).json({msg: "Internal server error"});
    }
}

export const logOut = (req, res) => {
    res.clearCookie("access_token", {httpOnly: true,
        secure: true,
        signed: true,
        sameSite: 'strict'
    }).status(302).json({redirectTo: '/app/login'});
    return;
}