import { LandUseLicense, UrbanLicense, Type, UrbanType } from "../models/License.models.js";

export const generateLandInvoice = async (licenseType, year) => {
    let invoice;
    let type;
    let lcID;

    const invoices = await LandUseLicense.findAll({
        where: {
            licenseType: licenseType,
            year: year
        },
        order: [
            ['invoice', 'DESC']
        ],
        attributes: ['invoice', 'year'],
        include: {
            model: Type,
            attributes: ['licenseType']
        }
    });

    if(invoices.length == 0) {
        invoice = 1;

        const types = await Type.findByPk(licenseType, {
            attributes: ['licenseType']
        });

        if(types == null) {
            return null;
        }

        type = types.licenseType;
    } else {
        invoice = invoices[0].invoice + 1;
        type = invoices[0].type.licenseType;
    }
    
    if (invoice <= 9) {
        lcID = `IMDUyV_DLyCU_${type}_00${invoice}_${year}`;
    }

    if (invoice >= 10 && invoice <= 99) {
        lcID = `IMDUyV_DLyCU_${type}_0${invoice}_${year}`;
    }

    if (invoice >= 100) {
        lcID = `IMDUyV_DLyCU_${type}_${invoice}_${year}`;
    }

    return { invoice, lcID }
}

export const generateUrbanInvoice = async (licenseType, year) => {
    let invoice;
    let type;
    let lcID;

    const invoices = await UrbanLicense.findAll({
        where: {
            licenseType: licenseType,
            year: year
        },
        order: [
            ['invoice', 'DESC']
        ],
        attributes: ['invoice', 'year'],
        include: {
            model: UrbanType,
            attributes: ['licenseType']
        }
    });

    if(invoices.length == 0) {
        invoice = 1;

        const types = await UrbanType.findByPk(licenseType, {
            attributes: ['licenseType']
        });

        if(types == null) {
            return null;
        }

        type = types.licenseType;
    } else {
        invoice = invoices[0].invoice + 1;
        type = invoices[0].type.licenseType;
    }
    
    if (invoice <= 9) {
        lcID = `IMDUyV_DLyCU_${type}_00${invoice}_${year}`;
    }

    if (invoice >= 10 && invoice <= 99) {
        lcID = `IMDUyV_DLyCU_${type}_0${invoice}_${year}`;
    }

    if (invoice >= 100) {
        lcID = `IMDUyV_DLyCU_${type}_${invoice}_${year}`;
    }

    return { invoice, lcID }
}