import * as userRepo from "../repositories/users.repository.js";
import { encryptPassword } from '../libs/passwordCrypt.js';
import { validateUserPermissions, validateUserGroup, validateUserRole } from "../validations/user.validations.js";

export async function requestAllUsers() {
    const USERS = await userRepo.findAllUsers();

    if (USERS == null) {
        return {
            status: 404,
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
            status: 404,
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
        name: capitalizeName(name),
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

    if (role && group) {
        if (!await validateUserPermissions(role, group)) {
            return {
                status: 400,
                data: {
                    msg: "Invalid permission request, role or group is invalid."
                },
                log: "Request failed due to invalid permission request, role or group was invalid."
            }
        }
    }

    if (role) {
        if (!await validateUserRole(role)) {
            return {
                status: 400,
                data: {
                    msg: "Invalid permission request, role is invalid."
                },
                log: "Request failed due to invalid permission request, role was invalid."
            }
        }
    }

    if (group) {
        if (!await validateUserRole(role)) {
            return {
                status: 400,
                data: {
                    msg: "Invalid permission request, role is invalid."
                },
                log: "Request failed due to invalid permission request, role was invalid."
            }
        }
    }

    let ENCRYPTED_PASSWORD = '';

    if (password) {
        ENCRYPTED_PASSWORD = await encryptPassword(password);
    }

    const newData = {
        name: capitalizeName(name),
        password: ENCRYPTED_PASSWORD,
        roleId: role,
        groupId: group
    }

    const MODIFIED_USER = await userRepo.saveUser(id, newData);

    if (MODIFIED_USER == null) {
        return {
            status: 404,
            data: {
                msg: "The requested user does not exist."
            },
            log: `Request failed due to requested user ${id} does not exist.`
        }
    }

    return {
        status: 200,
        data: {
            user: MODIFIED_USER
        },
        log: `Request completed:
            ID -> ${MODIFIED_USER.id}
            Name -> ${MODIFIED_USER.name}
            Username -> ${MODIFIED_USER.username}
            Role -> ${MODIFIED_USER.roleId}
            Group -> ${MODIFIED_USER.groupId}`
    }
}

export async function requestUserDeletion(id) {
    const DELETED_USER = await userRepo.deleteUser(id);

    if (DELETED_USER == null) {
        return {
            status: 404,
            data: {
                msg: "The requested user does not exist."
            },
            log: `Request failed due to requested user ${id} does not exist.`
        }
    }

    return {
        status: 200,
        data: {
            msg: `User ${id} deleted successfully.`
        },
        log: `Request completed:
            ID -> ${DELETED_USER.id}
            Name -> ${DELETED_USER.name}
            Username -> ${DELETED_USER.username}
            Role -> ${DELETED_USER.roleId}
            Group -> ${DELETED_USER.groupId}`
    }
}

export async function requestUserInfo(id) {
    const USER = await userRepo.findUserByID(id);

    if (USER == null) {
        return {
            status: 404,
            data: {
                msg: "The requested user does not exist."
            }
        }
    }

    return {
        status: 200,
        data: {
            name: USER.name,
            group: USER.group.group
        }
    };
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

function capitalizeName(name) {
    return name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}