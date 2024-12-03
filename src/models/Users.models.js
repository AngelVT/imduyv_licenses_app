import { DataTypes } from 'sequelize';
import { pool } from '../database.js';

import * as logger from "../libs/loggerFunctions.js";

// TODO uncomment the email in preparation for public deployment
export const User = pool.define(
    'user', {
        name: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        /*email: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: true
        },*/
        username: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        requiredPasswordReset: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true
        },
    }
);

export const Role = pool.define(
    'role', {
        role: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true
    }
},{
        timestamps: false
});

export const Group = pool.define(
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

User.belongsTo(Role);
User.belongsTo(Group);

(async () => {
    try {
        await pool.sync();
    } catch (error) {
        logger.logConsoleWarning("Error synchronizing user models with DB", `     -${error}`);
        logger.logServerWarning('Error synchronizing user models with DB', `-${error}`);
    }
})();