import { DataTypes } from 'sequelize';
import { pool } from '../database.js';

import { consoleLogger, logger } from '../logger.js';

export const User = pool.define(
    'user', {
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
        consoleLogger.warning("\n  Error synchronizing user models with DB.");
        logger.error('Error synchronizing user models with DB.');
    }
})();