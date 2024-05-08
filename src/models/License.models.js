import { DataTypes } from "sequelize";
import { pool } from '../database.js';

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
            allowNull: false
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
            type: DataTypes.BIGINT,
            allowNull: false
        },
        term: {
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
        zone: {
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
        validity: {
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
        expeditionType: {
            type: DataTypes.INTEGER,
            references: {
                model: ExpeditionType,
                key: 'id'
            },
            allowNull: false
        },
        contactPhone: {
            type: DataTypes.INTEGER,
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
        }
    }
);

(async () => {
    try {
        await pool.sync();
    } catch (error) {
        console.log("Error creating tables.");
    }
    
})();