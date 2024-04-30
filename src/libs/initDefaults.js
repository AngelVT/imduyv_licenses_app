import { User, Role, Group } from "../models/Users.models.js";
import { encryptPassword } from "./passwordCrypt.js";
import config from "../config.js";

export const setDefaultRoles = async () => {
    try {
        await Role.sync();

        const count = await Role.count();

        if (count > 0) return;

        const createdRoles = await Promise.all([
            Role.create({ role: 'admin'}),
            Role.create({ role: 'moderator'}),
            Role.create({ role: 'user'})
        ]);

        console.log("Default roles have been set: ");
        createdRoles.forEach(
            role => {
                console.log(`The following role was created: ${role.role}`);
            }
        );

    } catch (error) {
        console.log(`Error stablishing defaults: ${error}`);
    }
}

export const setDefaultGroups = async () => {
    try {
        await Group.sync();

        const count = await Group.count();

        if (count > 0) return;

        const createdGroup = await Promise.all([
            Group.create({ group: 'all'}),
            Group.create({ group: 'land_use'}),
            Group.create({ group: 'urban'})
        ]);

        console.log("Default groups have been set: ");
        createdGroup.forEach(
            group => {
                console.log(`The following group was created: ${group.group}`);
            }
        );

    } catch (error) {
        console.log(`Error stablishing defaults: ${error}`);
    }
}

export const setDefaultUsers = async () => {
    try {
        await User.sync();

        const count = await User.count();

        if (count > 0) return;

        const cryptPassword = await encryptPassword(config.SECRET);

        const createdUser = await User.create({
            name: "Usuario Admin",
            username: "dev",
            password: cryptPassword,
            roleId: 1,
            groupId: 1
        });

        console.log("Default user has been set");

    } catch (error) {
        console.log(`Error stablishing defaults: ${error}`);
    }
}