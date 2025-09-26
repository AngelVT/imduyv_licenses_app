import { pool } from "../configuration/database.configuration.js";
import { DataTypes } from "sequelize";

export const LegacyType = pool.define(
    'legacy_type', {
        legacy_type_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        licenseType: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        schema: 'legacy'
    }
);

export const LegacyLicense = pool.define(
    'legacy_licenses', {
        legacy_license_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        legacy_license_uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true
        },
        licencia: {
            type: DataTypes.STRING
        },
        legacy_type_id: {
            type: DataTypes.INTEGER,
            references: {
                model: LegacyType,
                key: 'legacy_type_id'
            },
            allowNull: false
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nombre:{
            type: DataTypes.STRING
        },
        en_atencion: {
            type: DataTypes.STRING
        },
        fecha_solicitud: {
            type: DataTypes.DATEONLY
        },
        calle: {
            type: DataTypes.STRING
        },
        numero: {
            type: DataTypes.STRING
        },
        colonia: {
            type: DataTypes.STRING
        },
        superficie_total: {
            type: DataTypes.STRING
        },
        clave_catastral: {
            type: DataTypes.STRING
        },
        plazo: {
            type: DataTypes.STRING
        },
        georeferencia: {
            type: DataTypes.STRING
        },
        zona: {
            type: DataTypes.STRING
        },
        clave: {
            type: DataTypes.STRING
        },
        uso_suelo: {
            type: DataTypes.STRING
        },
        giro: {
            type: DataTypes.STRING
        },
        superficie: {
            type: DataTypes.STRING
        },
        COS: {
            type: DataTypes.STRING
        },
        altura_maxima: {
            type: DataTypes.STRING
        },
        niveles: {
            type: DataTypes.STRING
        },
        fecha_expedicion: {
            type: DataTypes.DATEONLY
        },
        vigencia: {
            type: DataTypes.STRING
        },
        folio_pago: {
            type: DataTypes.STRING
        },
        vencimiento: {
            type: DataTypes.STRING
        },
        tipo_tramite: {
            type: DataTypes.STRING
        },
        giro_2: {
            type: DataTypes.STRING
        },
        telefono_contacto: {
            type: DataTypes.STRING
        },
        costo: {
            type: DataTypes.STRING
        },
        descuento: {
            type: DataTypes.STRING
        },
        monto_pagado: {
            type: DataTypes.STRING
        },
        inspector: {
            type: DataTypes.STRING
        },
        folio_membrete: {
            type: DataTypes.STRING
        }
}, {
    schema: 'legacy'
});

LegacyLicense.belongsTo(LegacyType, { foreignKey: 'legacy_type_id' });