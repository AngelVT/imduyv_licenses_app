import { findUserByUsername, findUserByIdUsername, saveUser } from "../repositories/users.repository.js";
import { comparePassword, encryptPassword } from "../libs/passwordCrypt.js";
import config from "../config.js";
import jwt from 'jsonwebtoken';
import * as authValidations from "../validations/auth.valudation.js";

export async function requestSignIn(requestBody) {
    const { username, password } = requestBody;

    if (!username || !password) {
        return {
            status: 400,
            data: {
                msg: "Required information was not provided."
            },
            log: `Access attempt with no account details:
                    User provided -> ${!username ? 'No' : username}
                    Password Provided -> ${!password ? 'No' : 'Yes'}`
        }
    }

    const USER = await findUserByUsername(username);

    if (USER == null) {
        return {
            status: 401,
            data: {
                msg: "Incorrect username or password"
            },
            log: `Access attempt with a not existent account
                User provided -> "${username}`
        };
    }

    if (await comparePassword(password, USER.password)) {
        let redirection = authValidations.validateRedirection(USER.group.group, USER.requiredPasswordReset);

        const TOKEN = jwt.sign({ userID: USER.id, username: USER.username }, process.env.SECRET, {
            expiresIn: config.TOKENS_EXP
        });

        return {
            status: 200,
            data: {
                token: TOKEN,
                redirection: redirection
            },
            log: `Request completed:
                    ID -> ${USER.id}
                    Name -> ${USER.name}
                    Username -> ${USER.username}`
        };
    }

    return {
        status: 401,
        data: {
            msg: "Incorrect username or password!"
        },
        log: `Access denied due to unable to authenticate account
            Account ID -> ${USER.id}
            Account -> ${USER.username}`
    };
}

export async function requestPasswordReset(request) {
    const { currentPassword, newPassword} = request.body;

    if (!currentPassword || !newPassword) {
        return {
            status: 400,
            data: {
                msg: "Required information was not provided."
            },
            log: `Password reset attempt:
                    User -> ${!username ? 'No' : username}
                    Current password Provided -> ${!currentPassword ? 'No' : 'Yes'}
                    New password Provided -> ${!newPassword ? 'No' : 'Yes'}`
        }
    }

    const USER = await findUserByIdUsername(request.userID, request.username);

    if (USER == null) {
        return {
            status: 400,
            data: {
                msg: "Required user does not exist."
            },
            log: `Password reset failed due to required user does not exist`
        }
    }

    if (!await comparePassword(currentPassword, USER.password)) {
        return {
            status: 401,
            data: {
                msg: "Current password is not correct please try again."
            },
            log: `Password reset attempt with an invalid password:
                    User id -> ${USER.id}
                    Username -> ${USER.username}`
        }
    }

    if(!authValidations.validatePassword(newPassword)) {
        return {
            status: 400,
            data: {
                msg: "The new password does not meet the minimum requirements."
            },
            log: `Password reset attempt with a invalid new password:
                    User id -> ${USER.id}
                    Username -> ${USER.username}`
        }
    }

    const NEW_PASSWORD = await encryptPassword(newPassword);

    const NEW_DATA = { password: NEW_PASSWORD, requiredPasswordReset: false }

    await saveUser(USER.id, NEW_DATA);

    return {
        status: 200,
        data: {
            msg: "Password reset successful."
        },
        log: `Password reset completed:
                User id -> ${USER.id}
                Username -> ${USER.username}`
    }
}