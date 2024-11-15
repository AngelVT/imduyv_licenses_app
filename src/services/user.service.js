import * as userRepo from "../repositories/users.repository.js";
import { encryptPassword } from '../libs/passwordCrypt.js';
import { validateUserPermissions } from "../validations/user.validations.js";

export async function requestAllUsers() {
    const USERS = await userRepo.findAllUsers();

    if (USERS == null) {
        return {
            status: 400,
            responseData: {
                msg: "There are no records to display."
            }
        }
    }

    return {
        status: 200,
        responseData: {
            users: USERS
        }
    };
}

export async function requestUser(id) {
    const USER = await userRepo.findUserByID(id);

    if (USER == null) {
        return {
            status: 400,
            responseData: {
                msg: "The requested user does not exist or is unavailable"
            }
        }
    }

    return {
        status: 200,
        responseData: {
            user: USER
        }
    };
}

export async function requestUserCreation(requestBody) {

    const {NAME, USERNAME, PASSWORD, ROLE, GROUP} = requestBody;

    if (!NAME || !USERNAME || !PASSWORD || !ROLE || !GROUP) {
        return {
            status: 400,
            responseData: {
                msg: "Required information for user creation was not provided."
            }
        }
    }

    if (validateUserPermissions()) {
        return {
            status: 400,
            responseData: {
                msg: "Invalid permission request, role or group is invalid."
            }
        }
    }

    const ENCRYPTED_PASSWORD = await encryptPassword(PASSWORD);

    const NEW_USER= await userRepo.saveNewUSER({
        name: NAME,
        username: USERNAME,
        password: ENCRYPTED_PASSWORD,
        roleId: ROLE,
        groupId: GROUP
    });

    if(NEW_USER == null) {
        return {
            status: 400,
            responseData: {
                msg: "User was not created due to user already exist."
            }
        }
    }

    return {
        status: 200,
        responseData: {
            user: NEW_USER
        }
    }
}