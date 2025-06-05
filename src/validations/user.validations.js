import { Group, Role } from "../models/Users.models.js";
import { findUserByID } from "../repositories/users.repository.js";

export async function validateUserPermissions(role, group) {
    if (isNaN(parseInt(role)) || isNaN(parseInt(group))) {
        return false
    }

    const ROLE = await Role.findByPk(role);

    if (ROLE == null)
        return false;

    const GROUP = await Group.findByPk(group);

    if (GROUP == null)
        return false;

    return true;
}

export async function validateUserRole(role) {
    if (isNaN(parseInt(role))) {
        return false
    }

    const ROLE = await Role.findByPk(role);

    if (ROLE == null)
        return false;

    return true;
}

export async function validateUserGroup(group) {
    if (isNaN(parseInt(group))) {
        return false
    }

    const GROUP = await Group.findByPk(group);

    if (GROUP == null)
        return false;

    return true;
}

/*export async function hasRole(id, requiredPermission) {
    const USER = await findUserByID(id);

    if (USER.roleId <= requiredPermission && requiredPermission > 0 && USER.roleId > 0) {
        return true;
    }

    return false;
}

export async function belongToGroup(id, requiredGroup) {
    const USER = await findUserByID(id);

    if (USER.group.group === requiredGroup || USER.group.group === 'all') {
        return true;
    }

    return false;
}*/

export function validateName(name) {
    let nameLength = name.split(' ').length;
    if (nameLength <= 2) {
        return false;
    }

    return true
}