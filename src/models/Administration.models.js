import { DataTypes } from "sequelize";
import { pool } from '../database.js';

import * as logger from "../libs/loggerFunctions.js";

export const MunicipalAdministration = pool.define(
    'municipal_administration', {
        municipalPresident: {
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

export const InstituteAdministration = pool.define(
    'institute_administration', {
        directorName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        directorTittle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        directorTittleShort: {
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

export const LicensesAdministration = pool.define(
    'licenses_administration', {
        directorName: {
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