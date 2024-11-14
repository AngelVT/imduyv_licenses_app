import { DataTypes } from "sequelize";
import { pool } from '../database.js';

import * as logger from "../libs/loggerFunctions.js";

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

(async () => {
    try {
        await pool.sync();
    } catch (error) {
        logger.logConsoleWarning("Error synchronizing administration models with DB", `     -${error}`);
        logger.logServerWarning('Error synchronizing administration models with DB', `-${error}`);
    }
})();