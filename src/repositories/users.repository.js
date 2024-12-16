import { User, Group, Role } from "../models/Users.models.js";
import { Op } from "sequelize";

const USER_ATTRIBUTES = { exclude: ['password'] };

const USER_MODELS = [
    {
        model: Role,
        attributes: ['role']
    },
    {
        model: Group,
        attributes: ['group']
    }
]

export async function findAllUsers() {
    return await User.findAll({
        attributes: USER_ATTRIBUTES,
        include: USER_MODELS,
        raw: true,
        nest: true
    });
}

export async function findUserByID(id) {
    return await User.findByPk(id, {
        attributes: USER_ATTRIBUTES,
        include: USER_MODELS,
        raw: true,
        nest: true
    });
}

export async function findUsersByName(name) {
    return await User.findAll({
        where: {
            name: {
                [Op.like]: `%${name}%`
            }
        },
        attributes: USER_ATTRIBUTES,
        include: USER_MODELS,
        raw: true,
        nest: true
    });
}

export async function findUserByUsername(username) {
    return await User.findOne({
        where: {username: username},
        attributes: USER_ATTRIBUTES,
        include: USER_MODELS,
        raw: true,
        nest: true
    });
}

export async function findUsersByGroup(group) {
    return await User.findAll({
        where: { groupId: group },
        attributes: USER_ATTRIBUTES,
        include: USER_MODELS,
        raw: true,
        nest: true
    });
}

export async function findUsername(username) {
    return await User.findOne({
        where: {username: username},
        include: {
            model: Group,
            attributes: ['group']
        },
        raw: true,
        nest: true
    });
}

export async function findUserByIdUsername(id, username) {
    return await User.findOne({
        where: { id: id, username: username },
        raw: true,
        nest: true
    });
}

// TODO in the future this should look for existing combinations of name and email, implement when the project is being prepared for deployment for public access
export async function saveNewUSER(newUserData) {
    const [NEW_USER, CREATED] = await User.findOrCreate({
        where: { username: newUserData.username },
        attributes: USER_ATTRIBUTES,
        include: USER_MODELS,
        defaults: newUserData
    });

    return CREATED ? NEW_USER : null;
}

export async function saveUser(id, newData) {
    const MODIFIED_USER = await User.findByPk(id, {
        attributes: USER_ATTRIBUTES,
        include: USER_MODELS
    });
    
    if(MODIFIED_USER == null) return null;

    await MODIFIED_USER.update(newData);

    if (newData.groupId || newData.roleId)
        await MODIFIED_USER.reload({include: USER_MODELS});

    return MODIFIED_USER;
}

export async function deleteUser(id) {
    const DELETED_USER = await User.findByPk(id, {
        attributes: USER_ATTRIBUTES,
        include: USER_MODELS
    });

    if(DELETED_USER == null)
        return null

    await DELETED_USER.destroy();

    return DELETED_USER;
}

export async function userInfo(id) {
    return await User.findByPk(id, {
        attributes: ['name'],
        include: {
            model: Group,
            attributes: ['group']
        },
        raw: true,
        nest: true
    });
}

export async function getGroupName(group) {
    const GROUP = await Group.findByPk(group, { raw: true});

    if (GROUP == null) {
        return 'invalid'
    }

    return GROUP.group;
}