import * as userRepo from "../repositories/users.repository.js";
import { encryptPassword } from '../libs/passwordCrypt.js';
import { validateUserPermissions, validateUserGroup, validateUserRole } from "../validations/user.validations.js";

export async function requestAllUsers() {
    const USERS = await userRepo.findAllUsers();

    if (USERS == null) {
        return {
            status: 200,
            data: {
                msg: "There are no records to display."
            },
            log: "Request completed but there are no records to display."
        }
    }

    return {
        status: 200,
        data: {
            users: USERS
        },
        log: "Request completed all records requested"
    };
}

export async function requestUser(id) {
    const USER = await userRepo.findUserByID(id);

    if (USER == null) {
        return {
            status: 400,
            data: {
                msg: "The requested user does not exist."
            },
            log: `Request failed due to requested user ${id} does not exist.`
        }
    }

    return {
        status: 200,
        data: {
            user: USER
        },
        log: `Request completed:
            ID -> ${USER.id}
            Name -> ${USER.name}
            Username -> ${USER.username}`
    };
}

export async function requestUserCreation(requestBody) {

    const { name, password, role, group } = requestBody;

    if (!name || !password || !role || !group) {
        return {
            status: 400,
            data: {
                msg: "Required information for user creation was not provided."
            },
            log: "Request failed due to required information for user creation was not provided."
        }
    }

    if (!await validateUserPermissions(role, group)) {
        return {
            status: 400,
            data: {
                msg: "Invalid permission request, role or group is invalid."
            },
            log: "Request failed due to invalid permission request, role or group was invalid."
        }
    }

    const USERNAME = await generateUsername(name, 0);

    const ENCRYPTED_PASSWORD = await encryptPassword(password);

// TODO this block in the future should also add an email to the object provided to the function
    const NEW_USER = await userRepo.saveNewUSER({
        name: name,
        username: USERNAME,
        password: ENCRYPTED_PASSWORD,
        roleId: role,
        groupId: group
    });

    if (NEW_USER == null) {
        return {
            status: 400,
            data: {
                msg: "User was not created due to user already exist."
            },
            log: `Request failed due to user ${USERNAME} already exist.`
        }
    }

    return {
        status: 200,
        data: {
            user: NEW_USER
        },
        log: `Request completed:
            ID -> ${NEW_USER.id}
            Name -> ${NEW_USER.name}
            Username -> ${NEW_USER.username}
            Role -> ${NEW_USER.roleId}
            Group -> ${NEW_USER.groupId}`
    }
}

export async function requestUserModification(id, requestBody) {
    const { name, password, role, group } = requestBody;

    if (!name && !password && !role && !group) {
        return {
            status: 400,
            data: {
                msg: "Required information for user modification was not provided."
            },
            log: "Request failed due to required information for user modification was not provided."
        }
    }

    if (!await validateUserPermissions(role, group)) {
        return {
            status: 400,
            data: {
                msg: "Invalid permission request, role or group is invalid."
            },
            log: "Request failed due to invalid permission request, role or group was invalid."
        }
    }

    const MODIFIED_USER = await userRepo.saveUser(id, newData);

    if (MODIFIED_USER == null) {
        return {
            status: 400,
            data: {
                msg: "The requested user does not exist."
            },
            log: `Request failed due to requested user ${id} does not exist.`
        }
    }
}

async function generateUsername(name, n) {
    const NAME = name.split(' ');

    let username =(
        NAME[0].slice(0, 2) +
        NAME[1].charAt(0) +
        NAME[2].slice(0, 3) +
        (n == 0 ? '' : n <= 9 ? '0' + n : n)
    ).toLowerCase();

    if (await userRepo.findUserByUsername(username) == null) {
        return username;
    }

    return generateUsername(name, n + 1);
}