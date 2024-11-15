import { User, Group, Role } from "../models/Users.models.js";

export async function findAllUsers() {
    return await User.findAll({
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

export async function saveNewUSER(newUserData) {
    const [NEW_USER, CREATED] = await User.findOrCreate({
        where: { username: newUserData.username },
        defaults: newUserData,
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

    return CREATED ? NEW_USER : null;
}

export async function saveUser(id, newData) {
    const MODIFIED_USER = await findUserByID(id);
    
    if(MODIFIED_USER == null)
        return null;

    await MODIFIED_USER.update(newData);

    return MODIFIED_USER;
}

export async function deleteUser(id) {
    const DELETED_USER = await findUserByID(id);

    if(DELETED_USER == null)
        return null

    await DELETED_USER.destroy();

    return true;
}