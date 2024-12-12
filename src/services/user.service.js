import * as userRepo from "../repositories/users.repository.js";
import { encryptPassword } from '../libs/passwordCrypt.js';
import { validateUserPermissions, validateUserGroup, validateUserRole, validateName } from "../validations/user.validations.js";
import jwt from 'jsonwebtoken';

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

export async function requestUserByName(name) {
    const NAME = decodeURIComponent(name);

    console.log(NAME)

    const USERS = await userRepo.findUsersByName(NAME);

    if (USERS == null || USERS.length == 0) {
        return {
            status: 404,
            data: {
                msg: `There are no matching results with name: ${NAME}.`
            },
            log: `Request failed due to there are no users with name matching ${NAME}.`
        }
    }

    return {
        status: 200,
        data: {
            users: USERS
        },
        log: `Request completed:
            Users with name like -> ${NAME}`
    };
}

export async function requestUserByUsername(username) {
    const USER = await userRepo.findUserByUsername(username);

    if (USER == null) {
        return {
            status: 404,
            data: {
                msg: `The requested user ${username} does not exist.`
            },
            log: `Request failed due to requested user ${username} does not exist.`
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

export async function requestUserByGroup(group) {
    const GROUP_NAME = await userRepo.getGroupName(group);

    const USERS = await userRepo.findUsersByGroup(group);

    if (USERS == null || USERS.length == 0) {
        return {
            status: 404,
            data: {
                msg: `The there are no users from the requested group ${GROUP_NAME}.`
            },
            log: `Request failed due no records of users from group ${GROUP_NAME}.`
        }
    }

    return {
        status: 200,
        data: {
            users: USERS
        },
        log: `Request completed:
            Users from group -> ${GROUP_NAME}`
    };
}

export async function requestUserCreation(requestBody) {
    const { name, password, role, group } = requestBody;

    if (!name || !role || !group) {
        return {
            status: 400,
            data: {
                msg: "Required information for user creation was not provided."
            },
            log: "Request failed due to required information for user creation was not provided."
        }
    }

    if (!validateName(name)) {
        return {
            status: 400,
            data: {
                msg: "Invalid name provide a name with at least name first and last name"
            },
            log: "Request failed due to invalid name provided name must include name first name last name and middle name"
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

    const PASSWORD = password ? password : passwordGen();

    const ENCRYPTED_PASSWORD = await encryptPassword(PASSWORD);

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

    const QR_TOKEN = jwt.sign({name: NEW_USER.name, username: NEW_USER.username, password: PASSWORD}, process.env.SECRET , {
        expiresIn: '5m'
    });

    return {
        status: 200,
        data: {
            user: NEW_USER,
            userQR: QR_TOKEN
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
    const { name, password, role, group, requiredPasswordReset, locked } = requestBody;

    if (!name && !password && !role && !group && !requiredPasswordReset && !locked) {
        return {
            status: 400,
            data: {
                msg: "Required information for user modification was not provided."
            },
            log: "Request failed due to required information for user modification was not provided."
        }
    }

    if (name) {
        if (!validateName(name)) {
            return {
                status: 400,
                data: {
                    msg: "Invalid name provide a name with at least name first, and last name"
                },
                log: "Request failed due to invalid name provided name must include name first name last name and middle name"
            }
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
        if (!await validateUserGroup(group)) {
            return {
                status: 400,
                data: {
                    msg: "Invalid permission request, role is invalid."
                },
                log: "Request failed due to invalid permission request, role was invalid."
            }
        }
    }

    let ENCRYPTED_PASSWORD = undefined;

    if (password) {
        ENCRYPTED_PASSWORD = await encryptPassword(password);
    }

    const newData = {
        name: name ? capitalizeName(name) : undefined,
        password: ENCRYPTED_PASSWORD,
        requiredPasswordReset: ENCRYPTED_PASSWORD ? true : requiredPasswordReset ? requiredPasswordReset : undefined,
        locked: locked ? locked : undefined,
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
            msg: `User ${DELETED_USER.username} deleted successfully.`
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
            group: USER.group.group,
            role: USER.role.role
        }
    };
}

export async function requestUserQR(qrToken) {
    let USER_INFO;

    try {
        USER_INFO = jwt.decode(qrToken);
    } catch (error) {
        return {
            status: 400,
            data: {
                msg: "Invalid token"
            },
            log: `Request failed due to an invalid token was provided.`
        }
    }

    return {
        data: {
            def: generateUserQR(USER_INFO.name, USER_INFO.username, USER_INFO.password),
            user: USER_INFO.username
        },
        log: `Request completed:
            Name -> ${USER_INFO.name}
            Username -> ${USER_INFO.username}`
    }
}

function generateUserQR(name ,username, password) {
    return {
        pageSize: {
            width: 160,
            height: 160
        },
        pageMargins: [ 5, 5, 5, 5 ],
        content: [
            {
                qr: `Nombre: ${name}\nUsuario: ${username}\nContrasena: ${password}`,
                alignment: 'center',
                eccLevel: 'M',
                fit: 150,
            }
        ]
    };
}

async function generateUsername(name, n) {
    const NAME = name.split(' ');

    let username =(
        NAME[0].slice(0, 2) +
        NAME[1].charAt(0) +
        NAME[2].slice(0, 3) +
        (n == 0 ? '' : n.toString().padStart(3, '0'))
    ).toLowerCase();

    if (await userRepo.findUsername(username) == null) {
        return username;
    }

    return generateUsername(name, n + 1);
}

export function capitalizeName(name) {
    return name
        .split(' ')
        .map(word => word.charAt(0).toLocaleUpperCase() + word.slice(1).toLocaleLowerCase())
        .join(' ');
}

function passwordGen() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    return password;
}