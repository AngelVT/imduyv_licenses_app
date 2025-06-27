import { Group, Permission, Role } from "../models/Users.models.js";
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

export async function validateUserActions(permissions) {
    const permission = await Permission.findAll({
        where: {
            permission: permissions
        },
        raw: true,
        nest: true
    });

    return permission.map(p => p.permission_id);
}

export async function validateUserPermissionArray(permissions) {
    if (!Array.isArray(permissions) || permissions.length === 0) {
        return false
    }

    for (const perm of permissions) {
        if (typeof perm !== 'string') {
            return false
        }
    }

    return true
}

export function validateName(name) {
    let nameLength = name.split(' ').length;
    if (nameLength <= 2) {
        return false;
    }

    return true
}