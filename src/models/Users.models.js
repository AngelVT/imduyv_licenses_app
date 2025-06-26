import { DataTypes } from 'sequelize';
import { pool } from '../configuration/database.configuration.js';

export const Role = pool.define(
    'role', {
    role_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    role: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true
    }
}, {
    timestamps: false,
    schema: 'users'
});

export const Group = pool.define(
    'group', {
    group_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    group: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true
    }
}, {
    timestamps: false,
    schema: 'users'
});

export const Permission = pool.define(
    'permission', {
        permission_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        permission: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        timestamps: false,
        schema: 'users'
    }
);

export const UserPermissions = pool.define('UserPermissions', {
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'User',
            key: 'user_id'
        }
    },
    permission_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Permission',
            key: 'permission_id'
        }
    }
}, {
    schema: 'users'
});

// TODO uncomment the email in preparation for public deployment
export const User = pool.define(
    'user', {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    public_user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true
    },
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
    roleId: {
        type: DataTypes.INTEGER,
        references: {
            model: Role,
            key: 'role_id'
        },
        allowNull: false
    },
    groupId: {
        type: DataTypes.INTEGER,
        references: {
            model: Group,
            key: 'group_id'
        },
        allowNull: false
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
    locked: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    }
}, {
    schema: 'users'
});

User.belongsTo(Role, { foreignKey: 'roleId' });
User.belongsTo(Group, { foreignKey: 'groupId' });

User.belongsToMany(Permission, { through: UserPermissions, foreignKey: 'user_id' });
Permission.belongsToMany(User, { through: UserPermissions, foreignKey: 'permission_id' });