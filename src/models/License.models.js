import { DataTypes } from "sequelize";
import { pool } from '../configuration/database.configuration.js';

//models for licenses go here

export const Type = pool.define(
    'type', {
    license_type_id: {
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
    schema: 'licenses'
});

export const Term = pool.define(
    'term', {
    license_term_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    licenseTerm: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    schema: 'licenses'
});

export const Zone = pool.define(
    'zone', {
    license_zone_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    licenseZone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    licenseKey: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    timestamps: false,
    schema: 'licenses'
});

export const AuthUse = pool.define(
    'authorized_use', {
    license_authUse_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    licenseAuthUse: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    schema: 'licenses'
});

export const Validity = pool.define(
    'validity', {
    license_validity_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    licenseValidity: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    schema: 'licenses'
});

export const ExpeditionType = pool.define(
    'expedition_type', {
    license_expedition_type_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    licenseExpType: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    schema: 'licenses'
});

export const LandUseLicense = pool.define(
    'landUse_license', {
    land_license_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    public_land_license_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true
    },
    fullInvoice: {
        type: DataTypes.STRING,
        allowNull: false
    },
    invoice: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    licenseType: {
        type: DataTypes.INTEGER,
        references: {
            model: Type,
            key: 'license_type_id'
        },
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    licensePrintInvoice: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    requestorName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    attentionName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    elaboratedBy: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastModifiedBy: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'New record'
    },
    requestDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    number: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'S/N'
    },
    colony: {
        type: DataTypes.STRING,
        allowNull: false
    },
    surfaceTotal: {
        type: DataTypes.STRING,
        allowNull: false
    },
    catastralKey: {
        type: DataTypes.STRING,
        allowNull: false
    },
    licenseTerm: {
        type: DataTypes.INTEGER,
        references: {
            model: Term,
            key: 'license_term_id'
        },
        allowNull: false
    },
    geoReference: {
        type: DataTypes.STRING,
        allowNull: false
    },
    licenseZone: {
        type: DataTypes.INTEGER,
        references: {
            model: Zone,
            key: 'license_zone_id'
        },
        allowNull: false
    },
    authorizedUse: {
        type: DataTypes.INTEGER,
        references: {
            model: AuthUse,
            key: 'license_authUse_id'
        },
        allowNull: false
    },
    businessLinePrint: {
        type: DataTypes.STRING,
        allowNull: false
    },
    businessLineIntern: {
        type: DataTypes.STRING,
        allowNull: false
    },
    expeditionDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    licenseValidity: {
        type: DataTypes.INTEGER,
        references: {
            model: Validity,
            key: 'license_validity_id'
        },
        allowNull: false
    },
    paymentInvoice: {
        type: DataTypes.STRING,
        allowNull: false
    },
    expirationDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    licenseExpeditionType: {
        type: DataTypes.INTEGER,
        references: {
            model: ExpeditionType,
            key: 'license_expedition_type_id'
        },
        allowNull: false
    },
    contactPhone: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    cost: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    discount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    paymentDone: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    inspector: {
        type: DataTypes.STRING,
        allowNull: false
    },
    licenseSpecialData: {
        type: DataTypes.JSONB,
        allowNull: true
    },
    approvalStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    }
}, {
    schema: 'licenses'
});

LandUseLicense.belongsTo(Type, { foreignKey: 'licenseType' });
LandUseLicense.belongsTo(Term, { foreignKey: 'licenseTerm' });
LandUseLicense.belongsTo(Zone, { foreignKey: 'licenseZone' });
LandUseLicense.belongsTo(AuthUse, { foreignKey: 'authorizedUse' });
LandUseLicense.belongsTo(Validity, { foreignKey: 'licenseValidity' });
LandUseLicense.belongsTo(ExpeditionType, { foreignKey: 'licenseExpeditionType' });

export const UrbanType = pool.define(
    'urban_type', {
    license_urban_type_id: {
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
    schema: 'licenses'
});

/*export const UrbanLicense = pool.define(
    'urban_license', {
    urban_license_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    public_urban_license_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true
    },
    fullInvoice: {
        type: DataTypes.STRING,
        allowNull: false
    },
    invoice: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    licenseType: {
        type: DataTypes.INTEGER,
        references: {
            model: UrbanType,
            key: 'license_urban_type_id'
        },
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    requestDate: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    requestorName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    legalRepresentative: {
        type: DataTypes.STRING,
        allowNull: true
    },
    elaboratedBy: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastModifiedBy: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'New record'
    },
    buildingAddress: {
        type: DataTypes.STRING,
        allowNull: true
    },
    catastralKey: {
        type: DataTypes.STRING,
        allowNull: true
    },
    geoReference: {
        type: DataTypes.STRING,
        allowNull: false
    },
    licenseTerm: {
        type: DataTypes.INTEGER,
        references: {
            model: Term,
            key: 'license_term_id'
        },
        defaultValue: 1,
        allowNull: true
    },
    surfaceTotal: {
        type: DataTypes.STRING,
        allowNull: true
    },
    licenseZone: {
        type: DataTypes.INTEGER,
        references: {
            model: Zone,
            key: 'license_zone_id'
        },
        defaultValue: 1,
        allowNull: true
    },
    expeditionDate: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    licenseValidity: {
        type: DataTypes.INTEGER,
        references: {
            model: Validity,
            key: 'license_validity_id'
        },
        defaultValue: 1,
        allowNull: true
    },
    collectionOrder: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    paymentDate: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    billInvoice: {
        type: DataTypes.STRING,
        allowNull: true
    },
    authorizedQuantity: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    deliveryDate: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    receiverName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    observations: {
        type: DataTypes.STRING,
        allowNull: true
    },
    licenseSpecialData: {
        type: DataTypes.JSONB,
        allowNull: true
    },
    approvalStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    }
}, {
    schema: 'licenses'
});*/

export const UrbanLicense = pool.define(
    'urban_license', {
    urban_license_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    public_urban_license_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true
    },
    fullControlInvoice: {
        type: DataTypes.STRING,
        allowNull: false
    },
    controlInvoice: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    controlYear: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fullInvoice: {
        type: DataTypes.STRING,
        allowNull: true
    },
    invoice: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    licenseType: {
        type: DataTypes.INTEGER,
        references: {
            model: UrbanType,
            key: 'license_urban_type_id'
        },
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    elaboratedBy: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastModifiedBy: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'New record'
    },
    requestorName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    requestDate: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    buildingAddress: {
        type: DataTypes.STRING,
        allowNull: true
    },
    geoReference: {
        type: DataTypes.STRING,
        allowNull: false
    },
    collectionOrder: {
        type: DataTypes.STRING,
        allowNull: true
    },
    paymentDate: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    billInvoice: {
        type: DataTypes.STRING,
        allowNull: true
    },
    authorizedQuantity: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    expeditionDate: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    printInvoice: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    deliveryDate: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    receiverName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    statuses: {
        type: DataTypes.JSONB,
            allowNull: true,
            defaultValue: {
            payment_pending: true,
            imduyv_signature_pending: true,
            in_progress: false,
            delivered: false,
            municipal_signature_pending: true,
            on_review: false
        }
    },
    observations: {
        type: DataTypes.STRING,
        allowNull: true
    },
    approvalStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    }
}, {
    schema: 'licenses'
});

UrbanLicense.belongsTo(UrbanType, { foreignKey: 'licenseType' });
//UrbanLicense.belongsTo(Zone, { foreignKey: 'licenseZone' });
//UrbanLicense.belongsTo(Term, { foreignKey: 'licenseTerm' });
//UrbanLicense.belongsTo(Validity, { foreignKey: 'licenseValidity' });