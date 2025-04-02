import { DataTypes } from "sequelize";
import { pool } from '../configuration/database.configuration.js';

export const MunicipalAdministration = pool.define(
    'municipal_administration', {
    municipalPresident: {
        type: DataTypes.STRING,
        allowNull: false
    },
    administrationStart: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        unique: true
    },
    administrationEnd: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: false,
    schema: 'administration'
});

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
        allowNull: false,
        unique: true
    },
    administrationEnd: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: false,
    schema: 'administration'
});

export const LicensesAdministration = pool.define(
    'licenses_administration', {
    directorName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    administrationStart: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        unique: true
    },
    administrationEnd: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: false,
    schema: 'administration'
});

export const YearOf = pool.define(
    'year_of', {
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    year_legend: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: false,
    schema: 'administration'
});