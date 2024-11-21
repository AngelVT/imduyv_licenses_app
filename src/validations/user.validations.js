import { Group, Role } from "../models/Users.models.js";
import { findUserByID } from "../repositories/users.repository.js";

export async function validateUserPermissions(role, group) {
    const ROLE = await Role.findByPk(role);

    if (ROLE == null)
        return false;

    const GROUP = await Group.findByPk(group);

    if (GROUP == null)
        return false;

    return true;
}

export async function validateUserRole(role) {
    const ROLE = await Role.findByPk(role);

    if (ROLE == null)
        return false;

    return true;
}

export async function validateUserGroup(group) {
    const GROUP = await Group.findByPk(group);

    if (GROUP == null)
        return false;

    return true;
}

export async function hasRole(id, requiredPermission) {
    const USER = await findUserByID(id);

    if (USER.roleId <= requiredPermission && requiredPermission > 0 && USER.roleId > 0) {
        return true;
    }

    return false;
}

export async function belongToGroup(id, requiredGroup) {
    const USER = await findUserByID(id);

    console.log('provided: ',USER.group.group, 'vs required: ', requiredGroup);

    if (USER.group.group === requiredGroup || USER.group.group === 'all') {
        return true;
    }

    return false;
}