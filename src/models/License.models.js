import { DataTypes } from "sequelize";
import { pool } from '../database.js';

import { consoleLogger } from "../logger.js";

//models for licenses go here

export const Type = pool.define(
    'type', {
        licenseType: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        timestamps: false
    }
);

export const Term = pool.define(
    'term', {
        licenseTerm: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        timestamps: false
    }
);

export const Zone = pool.define(
    'zone', {
        licenseZone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        licenseKey: {
            type: DataTypes.STRING,
            allowNull: false
        }

    },{
        timestamps: false
    }
);

export const AuthUse = pool.define(
    'authUse', {
        licenseAuthUse: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        timestamps: false
    }
);

export const Validity = pool.define(
    'validity', {
        licenseValidity: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        timestamps: false
    }
);

export const ExpeditionType = pool.define(
    'expeditionType', {
        licenseExpType: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        timestamps: false
    }
);

export const LandUseLicense = pool.define(
    'landUseLicense',{
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
                key: 'id'
            },
            allowNull: false
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        requestorName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        attentionName: {
            type: DataTypes.STRING,
            allowNull: false
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
                key: 'id'
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
                key: 'id'
            },
            allowNull: false
        },
        authorizedUse: {
            type: DataTypes.INTEGER,
            references: {
                model: AuthUse,
                key:'id'
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
                key: 'id'
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
                key: 'id'
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
            type: DataTypes.JSON,
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
    }
);

LandUseLicense.belongsTo(Type, {foreignKey: 'licenseType'});
LandUseLicense.belongsTo(Term, {foreignKey: 'licenseTerm'});
LandUseLicense.belongsTo(Zone, {foreignKey: 'licenseZone'});
LandUseLicense.belongsTo(AuthUse, {foreignKey: 'authorizedUse'});
LandUseLicense.belongsTo(Validity, {foreignKey: 'licenseValidity'});
LandUseLicense.belongsTo(ExpeditionType, {foreignKey: 'licenseExpeditionType'});

export const UrbanType = pool.define(
    'urbanType', {
        licenseType: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        timestamps: false
    }
);

export const UrbanLicense = pool.define(
    'urbanLicense', {
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
                key: 'id'
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
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        number: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'S/N'
        },
        colony: {
            type: DataTypes.STRING,
            allowNull: true
        },
        catastralKey: {
            type: DataTypes.STRING,
            allowNull: true
        },
        licenseTerm: {
            type: DataTypes.INTEGER,
            references: {
                model: Term,
                key: 'id'
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
                key: 'id'
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
                key: 'id'
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
            type: DataTypes.INTEGER,
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
            type: DataTypes.JSON,
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
    }
);

UrbanLicense.belongsTo(UrbanType, {foreignKey: 'licenseType'});
UrbanLicense.belongsTo(Zone, {foreignKey: 'licenseZone'});
UrbanLicense.belongsTo(Term, {foreignKey: 'licenseTerm'});
UrbanLicense.belongsTo(Validity, {foreignKey: 'licenseValidity'});

(async () => {
    try {
        await pool.sync();
    } catch (error) {
        consoleLogger.warning("\n  Error synchronizing licenses with DB.");
    }
})();