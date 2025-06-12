import * as userRepo from "../repositories/users.repository.js";
import { validate as isUuid } from 'uuid';
import { encryptPassword } from '../utilities/password.utilities.js';
import { validateUserPermissions, validateUserGroup, validateUserRole, validateName } from "../validations/user.validations.js";
import jwt from 'jsonwebtoken';
import ValidationError from "../errors/ValidationError.js";
import ResourceError from "../errors/ResourceError.js";

export async function requestAllUsers() {
    const USERS = await userRepo.findAllUsers();

    if (!USERS) {
        throw new ResourceError('There are no users to display.',
            'User request all records',
            'There are no users registered.');
    }

    return {
        users: USERS
    }
}

export async function requestUser(id) {
    if (!isUuid(id)) {
        throw new ValidationError('Request failed due to invalid ID.',
            'User request by ID',
            `Request failed due to ID ${id} is invalid.`
        );
    }

    const USER = await userRepo.findUserByID(id);

    if (!USER) {
        throw new ResourceError('The requested user does not exist.',
            'User request by ID.',
            `Request completed record ${id} does not exist.`);
    }

    return {
        user: USER
    }
}

export async function requestUserByName(name) {
    const USERS = await userRepo.findUsersByName(name);

    if (!USERS || USERS.length === 0) {
        throw new ResourceError('The requested user does not exist',
            'User request by name',
            `Search params name/${name} not found.`);
    }

    return {
        users: USERS
    }
}

export async function requestUserByUsername(username) {
    const USER = await userRepo.findUserByUsername(username);

    if (!USER) {
        throw new ResourceError('The requested user does not exist',
            'User request by username',
            `Search params username/${username} not found.`);
    }

    return {
        user: USER
    }
}

export async function requestUserByGroup(group) {
    if (isNaN(parseInt(group))) {
        throw new ValidationError('Request failed due to invalid search parameters provided.',
            'User request by group',
            `Search params group/${group} is invalid.`);
    }

    const GROUP_NAME = await userRepo.getGroupName(group);

    const USERS = await userRepo.findUsersByGroup(group);

    if (!USERS || USERS.length === 0) {
        throw new ResourceError('The requested user does not exist',
            'User request by group',
            `Search params group/${GROUP_NAME} not found.`);
    }

    return {
        users: USERS
    }
}

export async function requestUserCreation(userData) {
    const { name, password, role, group } = userData;

    if (!name || !role || !group) {
        throw new ValidationError('Request failed due to missing information.',
            'User create request',
            `Request failed due to missing information.
            Provided data -> ${JSON.stringify(userData)}`);
    }

    if (!validateName(name)) {
        throw new ValidationError('Invalid name provide a name with at least name, first name and last name.',
            'User create request',
            `Request failed due to invalid name.
            Provided name -> ${name}`);
    }

    if (!await validateUserPermissions(role, group)) {
        throw new ValidationError('Invalid name provide a name with at least name, first name and last name.',
            'User create request',
            `Request failed due to invalid group or role.
            Provided data -> group/${group}, role/${role}`);
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

    if (!NEW_USER) {
        throw new ValidationError('User was not created due to user already exist.',
            'User create request',
            `Request failed due to user already exist.
            Existing user -> ${USERNAME}`);
    }

    // TODO here instead it should send the login details to the email
    const QR_TOKEN = jwt.sign({ name: NEW_USER.name, username: NEW_USER.username, password: PASSWORD }, process.env.SECRET, {
        expiresIn: '5m'
    });

    return {
        user: NEW_USER,
        userQR: QR_TOKEN
    }
}

export async function requestUserModification(id, userData) {
    if (!isUuid(id)) {
        throw new ValidationError('Request failed due to invalid ID.',
            'User update request',
            `Request failed due to ID ${id} is invalid.`
        );
    }

    const { name, password, role, group, requiredPasswordReset, locked } = userData;

    if (!name && !password && !role && !group && !requiredPasswordReset && !locked) {
        throw new ValidationError('Request failed due to missing information.',
            'User update request',
            `Request failed due to missing information.
            Provided data -> ${JSON.stringify(userData)}`);
    }

    if (name) {
        if (!validateName(name)) {
            throw new ValidationError('Invalid name provide a name with at least name, first name and last name.',
                'User update request',
                `Request failed due to invalid name.
            Provided name -> ${name}`);
        }
    }

    if (role && group) {
        if (!await validateUserPermissions(role, group)) {
            throw new ValidationError('Invalid name provide a name with at least name, first name and last name.',
                'User update request',
                `Request failed due to invalid group or role.
            Provided data -> group/${group}, role/${role}`);
        }
    }

    if (role) {
        if (!await validateUserRole(role)) {
            throw new ValidationError('Invalid name provide a name with at least name, first name and last name.',
                'User update request',
                `Request failed due to invalid role.
            Provided data -> role/${role}`);
        }
    }

    if (group) {
        if (!await validateUserGroup(group)) {
            throw new ValidationError('Invalid name provide a name with at least name, first name and last name.',
                'User update request',
                `Request failed due to invalid group or role.
            Provided data -> group/${group}`);
        }
    }

    let ENCRYPTED_PASSWORD;

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

    if (!MODIFIED_USER) {
        throw new ResourceError('The requested user does not exist.',
            'User update request.',
            `Request completed record ${id} does not exist.`);
    }

    return {
        user: MODIFIED_USER
    }
}

export async function requestUserDeletion(id) {
    if (!isUuid(id)) {
        throw new ValidationError('Request failed due to invalid ID.',
            'User delete request',
            `Request failed due to ID ${id} is invalid.`
        );
    }

    const DELETED_USER = await userRepo.deleteUser(id);

    if (!DELETED_USER) {
        throw new ResourceError('The requested user does not exist.',
            'User delete request.',
            `Request completed record ${id} does not exist.`);
    }

    return {
        data: {
            msg: `User ${DELETED_USER.username} deleted successfully.`
        },
        user: DELETED_USER
    }
}

export async function requestUserInfo(id) {
    if (!isUuid(id)) {
        return {
            status: 400,
            data: {
                msg: "Request failed due to invalid ID."
            },
            log: `Request failed due to invalid ID ${id} invalid.`
        };
    }

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
        throw new ValidationError('Request failed due to invalid QR token.',
            'User QR request',
            `Request failed due to QR token is invalid.`
        );
    }

    return {
        definition: generateUserQR(USER_INFO.name, USER_INFO.username, USER_INFO.password),
        user: USER_INFO.username
    }
}

function generateUserQR(name, username, password) {
    return {
        pageSize: {
            width: 160,
            height: 160
        },
        pageMargins: [5, 5, 5, 5],
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

    let username = (
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