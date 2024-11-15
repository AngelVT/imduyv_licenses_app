import { Group, Role } from "../models/Users.models.js";
import { findUserByID } from "../repositories/users.repository.js";

export async function validateUserPermissions(role, group) {
    const ROLE = await Role.findByPk(role);

    if (ROLE == null) {
        return false;
    }

    const GROUP = await Group.findByPk(group);

    if (GROUP == null) {
        return false;
    }

    return true;
}

export async function hasRole(id, requiredPermission) {
    const USER = await findUserByID(id);

    if (USER.roleId <= requiredPermission) {
        return true;
    }

    return false;
}

export async function belongToGroup(id, requiredGroup) {
    const USER = await findUserByID(id);

    if (USER.groupId == requiredGroup || USER.groupId == 1) {
        return true;
    }

    return false;
}