import { DataTypes } from 'sequelize';
import { pool } from '../database.js';

async function setUserModel() {
    try {
        const userModel = pool.define(
            "user", {
                name: {
                    type: DataTypes.STRING(45),
                    allowNull: false,
                },
                username: {
                    type: DataTypes.STRING(45),
                    allowNull: false,
                },
                password: DataTypes.STRING
            }
        );
        return userModel;
    } catch (error) {
        console.log('Error creating Model');
        return new Object;
    }
}

async function setRoleModel() {
    try {
        const roleModel = pool.define(
            'role', {
                role: {
                    type: DataTypes.STRING(45),
                    allowNull: false,
                    unique: true
                }
            },{
                timestamps: false
            }
        );
        return roleModel;
    } catch (error) {
        console.log('Error creating Model');
        return new Object;
    }
}

async function setGroupModel() {
    try {
        const groupModel = pool.define(
            'group', {
                group: {
                    type: DataTypes.STRING(45),
                    allowNull: false,
                    unique:true
                }
            },{
                timestamps: false
            }
        );
        return groupModel;
    } catch (error) {
        console.log('Error creating Model');
        return new Object;
    }
}

export const User = await setUserModel();

export const Role = await setRoleModel();

export const Group = await setGroupModel();

try {
    User.belongsTo(Role);
    User.belongsTo(Group);
} catch (error) {
    console.log("Error creating relations");
}


(async () => {
    try {
        await pool.sync();
    } catch (error) {
        console.log("Error creating tables.");
    }
    
})();