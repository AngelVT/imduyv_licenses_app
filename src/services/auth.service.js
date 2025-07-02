import { findUsername, findUserByIdUsername, saveUser } from "../repositories/users.repository.js";
import { comparePassword, encryptPassword } from "../utilities/password.utilities.js";
import config from "../configuration/general.configuration.js";
import jwt from 'jsonwebtoken';
import * as authValidations from "../validations/auth.validation.js";
import AuthenticationError from "../errors/AuthenticationError.js";

export async function requestSignIn(username, password) {
    if (!username || !password) {
        throw new AuthenticationError('Username or password not provided.',
            'Access attempt:',
            `Access attempt with no account details:
                    User provided -> ${!username ? 'No' : username}
                    Password Provided -> ${!password ? 'No' : 'Yes'}`,
            400);
    }

    const USER = await findUsername(username);

    if (USER === null) {
        throw new AuthenticationError('Incorrect username or password.',
            'Access attempt:',
            `Access attempt with a not existent account
                User provided -> "${username}`);
    }

    if (USER.locked) {
        throw new AuthenticationError('The account is currently locked.',
            'Access attempt:',
            `Access denied due to unable to authenticate account
                Account ID -> ${USER.public_user_id}
                Account -> ${USER.username}`
        );
    }

    if (!await comparePassword(password, USER.password)) {
        throw new AuthenticationError('Incorrect username or password.',
            'Access attempt:',
            `Access denied due to unable to authenticate account, incorrect password
                Account ID -> ${USER.public_user_id}
                Account -> ${USER.username}`
        );
    }

    let redirection = authValidations.validateRedirection(USER.group.group, USER.requiredPasswordReset);

    const TOKEN = jwt.sign({ userID: USER.public_user_id, username: USER.username }, process.env.SECRET, {
        algorithm: 'HS256',
        expiresIn: config.TOKENS_EXP
    });

    return {
        TOKEN,
        redirection,
        user_info: {
            ID: USER.public_user_id,
            name: USER.name,
            user: USER.username,
            user_group: USER.group.group,
            user_role: USER.role.role
        }
    }
}

export async function requestPasswordReset(currentPassword, newPassword, details = {
    userID: '',
    username: ''
}) {


    if (!currentPassword || !newPassword) {
        throw new AuthenticationError('Required information was not provided.',
            'Password reset attempt.',
            `Details:
                Failed due to missing information:
                    User -> ${!username ? 'No' : username}
                    Current password Provided -> ${!currentPassword ? 'No' : 'Yes'}
                    New password Provided -> ${!newPassword ? 'No' : 'Yes'}`,
            400);
    }

    const USER = await findUserByIdUsername(details.userID, details.username);

    if (USER === null) {
        throw new AuthenticationError('Incorrect user name or user ID',
            'Password reset attempt.',
            `Details:
                    Failed due to user does not exist.
                    User id -> ${details.userID}
                    Username -> ${details.username}`);
    }

    if (!await comparePassword(currentPassword, USER.password)) {
        throw new AuthenticationError('Incorrect current password.',
            'Password reset attempt.',
            `Details: 
                Failed due to incorrect current password:
                User id -> ${USER.public_user_id}
                Username -> ${USER.username}`);
    }

    if (await comparePassword(newPassword, USER.password)) {
        throw new AuthenticationError('The new password cannot be the current one.',
            'Password reset attempt.',
            `Details: 
                Failed due to new password is the same as the current one:
                    User id -> ${USER.public_user_id}
                    Username -> ${USER.username}`);
    }

    if (!authValidations.validatePassword(newPassword)) {
        throw new AuthenticationError('The new password does not meet the minimum requirements.',
            'Password reset attempt.',
            `Details: 
                Failed due to new password does not meet the minimum requirements:
                    User id -> ${USER.public_user_id}
                    Username -> ${USER.username}`,
                400);
    }

    const NEW_PASSWORD = await encryptPassword(newPassword);

    const NEW_DATA = { password: NEW_PASSWORD, requiredPasswordReset: false }

    await saveUser(USER.public_user_id, NEW_DATA);

    return {
        msg: "Password reset successful.",
        userInfo: {
            ID: USER.public_user_id,
            name: USER.name,
            username: USER.username
        }
    }
}