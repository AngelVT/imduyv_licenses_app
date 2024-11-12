import { DataTypes } from "sequelize";
import { pool } from '../database.js';

import { consoleLogger, logger } from "../logger.js";

export const AdministrationDetails = pool.define(
    'administration_details', {
        municipalPresident: {
            type: DataTypes.STRING,
            allowNull: false
        },
        instituteDirector: {
            type: DataTypes.STRING,
            allowNull: false
        },
        instituteDTittle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        instituteDTittleShort: {
            type: DataTypes.STRING,
            allowNull: false
        },
        licensesDirector: {
            type: DataTypes.STRING,
            allowNull: false
        },
        administrationStart: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        administrationEnd: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    },{
        timestamps: false
    }
);

/*(async () => {
    try {
        await pool.sync();
    } catch (error) {
        consoleLogger.warning("\n  Error synchronizing user models with DB.");
        logger.error('Error synchronizing user models with DB.');
    }
})();*/