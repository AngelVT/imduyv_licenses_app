import { DataTypes } from "sequelize";
import { pool } from '../configuration/database.configuration.js';
import { User } from "./Users.models.js";

export const Notification = pool.define(
    'notification', {
        notification_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        notification_uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fullInvoice: {
            type: DataTypes.STRING,
            allowNull: false
        },
        internal: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        commenter: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'user_id'
            },
            allowNull: false
        }
    }, {
        schema: 'licenses'
    }
);

Notification.belongsTo(User, { foreignKey: 'commenter' });