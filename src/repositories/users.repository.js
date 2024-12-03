import { User, Group, Role } from "../models/Users.models.js";

const USER_ATTRIBUTES = ['id', 'name', 'username', 'requiredPasswordReset', 'roleId', 'groupId', 'createdAt'];

export async function findAllUsers() {
    return await User.findAll({
        attributes: USER_ATTRIBUTES,
        include:[
            {
                model: Role,
                attributes: ['role']
            },
            {
                model: Group,
                attributes: ['group']
            }
        ]
    });
}

export async function findUserByID(id) {
    return await User.findByPk(id, {
        attributes: USER_ATTRIBUTES,
        include:[
            {
                model: Role,
                attributes: ['role']
            },
            {
                model: Group,
                attributes: ['group']
            }
        ]
    });
}

export async function findUserByUsername(username) {
    return await User.findOne({
        where: {username: username},
        include: {
            model: Group,
            attributes: ['group']
        }
    });
}

export async function findUserByIdUsername(id, username) {
    return await User.findOne({
        where: { id: id, username: username },
    });
}

// TODO in the future this should look for existing combinations of name and email, implement when the project is being prepared for deployment for public access
export async function saveNewUSER(newUserData) {
    const [NEW_USER, CREATED] = await User.findOrCreate({
        where: { username: newUserData.username },
        defaults: newUserData
    });

    return CREATED ? await findUserByID(NEW_USER.id) : null;
}

export async function saveUser(id, newData) {
    const MODIFIED_USER = await findUserByID(id);
    
    if(MODIFIED_USER == null)
        return null;

    await MODIFIED_USER.update(newData);

    return await findUserByID(MODIFIED_USER.id);
}

export async function deleteUser(id) {
    const DELETED_USER = await findUserByID(id);

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
        }
    });
}