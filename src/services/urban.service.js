import * as urbanRepo from '../repositories/urban.repository.js';
import * as urbanValidate from '../validations/urban.validations.js';
import * as urbanUtils from '../utilities/urban.utilities.js'
import { specialDataToJSON } from '../utilities/json.utilities.js';
import { generateUrbanC } from "../models/documents/urban/licenciaCUS.js";
import { generateUrbanLUS } from "../models/documents/urban/licenciaLUS.js";
import { generateUrbanLSUB } from "../models/documents/urban/licenciaLSUB.js";
import { generateUrbanLFUS } from "../models/documents/urban/licenciaLFUS.js";
import { generateUrbanCRPC } from "../models/documents/urban/licenciaCRPC.js";
import { generateUrbanLF } from '../models/documents/urban/licenciaLF.js';
import { generateUrbanPLF } from '../models/documents/urban/licenciaPLF.js';
import { generateUrbanRLF } from '../models/documents/urban/licenciaRLF.js';
import { generateUrbanLUH } from '../models/documents/urban/licenciaLUH.js'

export async function requestAllUrbanLicenses() {
    let LICENSES = await urbanRepo.findAllUrbanLicenses();

    if (LICENSES == null || LICENSES.length == 0) {
        return {
            status: 404,
            data: {
                msg: "There are no urban records to display"
            },
            log: "Request completed but there are no records to display"
        };
    }

    LICENSES = specialDataToJSON(LICENSES);

    return {
        status: 200,
        data: {
            licenses: LICENSES
        },
        log: "Request completed all records requested"
    };
}

export async function requestUrbanLicenseById(id) {
    let LICENSE = await urbanRepo.findUrbanLicense(id);

    if (LICENSE == null) {
        return {
            status: 404,
            data: {
                msg: "There requested urban record does not exist"
            },
            log: `Request completed record ${id} not found`
        };
    }

    LICENSE = specialDataToJSON(LICENSE);

    return {
        status: 200,
        data: {
            license: LICENSE
        },
        log: `Request completed record ${LICENSE.id}:${LICENSE.fullInvoice} requested`
    };
}

export async function requestUrbanLicenseByInvoice(type, invoice, year) {
    let LICENSE = await urbanRepo.findUrbanLicenseInvoice(type, invoice, year);

    if (LICENSE == null) {
        return {
            status: 404,
            data: {
                msg: "There requested urban record does not exist"
            },
            log: `Request completed record ${type}/${invoice}/${year} not found`
        };
    }

    LICENSE = specialDataToJSON(LICENSE);

    return {
        status: 200,
        data: {
            license: LICENSE
        },
        log: `Request completed record ${LICENSE.id}:${LICENSE.fullInvoice} requested`
    };
}

export async function requestUrbanLicenseByType(type, year) {
    let LICENSES = await urbanRepo.findUrbanLicenseType(type, year);

    if (LICENSES == null || LICENSES.length == 0) {
        return {
            status: 404,
            data: {
                msg: "There are no urban records to display"
            },
            log: `Request completed no records of type ${type} from ${year}`
        };
    }

    LICENSES = specialDataToJSON(LICENSES);

    return {
        status: 200,
        data: {
            licenses: LICENSES
        },
        log: `Request completed records of type ${type} from ${year} requested`
    };
}

export async function requestUrbanLicenseByParameter(parameter, value) {
    if (!urbanValidate.validateParameter(parameter)) {
        return {
            status: 400,
            data: {
                msg: "Invalid search parameter"
            },
            log: `Request not completed due to invalid parameter: ${parameter}`
        };
    }

    let LICENSES = await urbanRepo.findUrbanLicenseBy(parameter, value);

    if (LICENSES == null || LICENSES.length == 0) {
        return {
            status: 404,
            data: {
                msg: "There are no matching result for this search"
            },
            log: `Request completed no records where ${parameter} = ${value}`
        };
    }

    LICENSES = specialDataToJSON(LICENSES);

    return {
        status: 200,
        data: {
            licenses: LICENSES
        },
        log: `Request completed records where ${parameter} = ${value}`
    };
}

export async function requestUrbanLicenseCreate(body, files, requestor) {
    const DATE = new Date;

    const YEAR = DATE.getFullYear();

    for (const key in body) {
        body[key] = body[key].toLowerCase();
    }

    const {
        licenseType,
        requestorName,
        legalRepresentative,
        requestDate,
        colony,
        catastralKey,
        georeference,
        licenseTerm,
        surface,
        zone,
        expeditionDate,
        licenseValidity,
        collectionOrder,
        paymentDate,
        billInvoice,
        authorizedQuantity,
        deliveryDate,
        receiverName,
        PCU,
        representativeAs,
        requestorAddress,
        buildingAddress
    } = body;
    
    if (!licenseType || !requestorName || !georeference) {
        return {
            status: 400,
            data: {
                msg: "Unable to create due to missing information"
            },
            log: `Request not completed due to missing information`
        };
    }

    if (!await urbanValidate.validateModels({type: licenseType, zone, licenseTerm, licenseValidity})) {
        return {
            status: 400,
            data: {
                msg: "Unable to create due to invalid information provided"
            },
            log: `Request not completed due to invalid information`
        };
    }

    const INVOICE_INFO = await urbanUtils.generateInvoiceInformation(licenseType, YEAR);

    const SPECIAL_DATA = urbanUtils.generateSpecialData(licenseType);

    SPECIAL_DATA.PCU = PCU ? PCU : SPECIAL_DATA.PCU;
    SPECIAL_DATA.representativeAs = representativeAs ? representativeAs : SPECIAL_DATA.representativeAs;
    SPECIAL_DATA.requestorAddress = requestorAddress ? requestorAddress : SPECIAL_DATA.requestorAddress;
    SPECIAL_DATA.buildingAddress = buildingAddress ? buildingAddress : SPECIAL_DATA.buildingAddress;

    const NEW_LICENSE_DATA = {
        fullInvoice: INVOICE_INFO.fullInvoice,
        invoice: INVOICE_INFO.numericInvoice,
        licenseType: licenseType,
        year: YEAR,
        requestDate: requestDate,
        requestorName: requestorName,
        legalRepresentative: legalRepresentative,
        elaboratedBy: requestor,
        colony: colony,
        catastralKey: catastralKey,
        geoReference: georeference,
        licenseTerm: licenseTerm,
        surfaceTotal: surface,
        licenseZone: zone,
        expeditionDate: expeditionDate,
        licenseValidity: licenseValidity,
        collectionOrder: collectionOrder,
        paymentDate: paymentDate,
        billInvoice: billInvoice,
        authorizedQuantity: authorizedQuantity,
        deliveryDate: deliveryDate,
        receiverName: receiverName,
        observations: 'none',
        licenseSpecialData: SPECIAL_DATA
    }

    if (files.zoneIMG) {
        if (!await urbanUtils.saveZoneImage(files.zoneIMG, INVOICE_INFO.fullInvoice)) {
            return {
                status: 400,
                data: {
                    msg: "Error saving files to server"
                },
                log: `Error saving files in the server`
            };
        }
    }

    if (files.resumeTables) {
        if (!await urbanUtils.saveLicenseCharts(files.resumeTables, INVOICE_INFO.fullInvoice)) {
            return {
                status: 400,
                data: {
                    msg: "Error saving files to server"
                },
                log: `Error saving files in the server`
            };
        }
    }

    const NEW_LICENSE = await urbanRepo.saveNewUrbanLicense(NEW_LICENSE_DATA);

    if (NEW_LICENSE == null) {
        return {
            status: 400,
            data: {
                msg: "Unable to create, license already exist"
            },
            log: `Request not completed, record already exist`
        };
    }

    return {
        status: 200,
        data: {
            license: NEW_LICENSE
        },
        log: `Request completed records where ${NEW_LICENSE.id}
            ${NEW_LICENSE.fullInvoice}`
    };
}

export async function requestUrbanLicenseUpdate(id, licenseData, files, requestor) {
    for (const key in licenseData) {
        if (key !== 'requestorAddress' &&
            key !== 'buildingAddress' &&
            key !== 'maximumHeight' &&
            key !== 'parkingLots' &&
            key !== 'authorizationResume' &&
            key !== 'households' &&
            key !== 'documents' &&
            key !== 'conditions' &&
            key !== 'lotes' &&
            key !== 'manzanas' &&
            key !== 'actualSituation' &&
            key !== 'actualAuthorizedFS' &&
            key !== 'representativeAs' &&
            key !== 'antecedent' &&
            key !== 'PCU') {
                licenseData[key] = licenseData[key].toLowerCase();
        }
    }

    const {
        requestorName,
        legalRepresentative,
        requestDate,
        colony,
        catastralKey,
        surface,
        zone,
        expeditionDate,
        collectionOrder,
        paymentDate,
        billInvoice,
        authorizedQuantity,
        deliveryDate,
        receiverName,
        validity,
        term,
        PCU,
        representativeAs,
        requestorAddress,
        buildingAddress,
        occupationPercent,
        surfacePerLote,
        maximumHeight,
        minimalFront,
        frontalRestriction,
        parkingLots,
        usePercent,
        actualSituation,
        actualAuthorizedFS,
        authorizationResume,
        households,
        documents,
        lotes,
        manzanas,
        conditions,
        privateSurface,
        commonSurface,
        location,
        authorizationFor,
        integrity,
        detailedUse,
        urbanLUS,
        urbanCUS,
        antecedent,
        antecedentType,
        habitacionalLotes,
        totalManzanas,
        totalSurface,
        totalRelotification,
        resultRelotification,
        previousInvoice,
        previousInvoiceDate,
        layout,
        pageBreak_1,
        pageBreak_2,
        pageBreak_3,
        pageBreak_4,
        pageBreak_5,
        pageBreak_6,
        pageBreak_7,
        pageBreak_8,
        pageBreak_9,
        pageBreak_10
    } = licenseData;

    if (!requestorName && legalRepresentative && !requestDate && !colony && !catastralKey && !surface && !zone && !expeditionDate && !collectionOrder && !paymentDate && !billInvoice && !authorizedQuantity && !deliveryDate && !receiverName && !validity && !term && !PCU && !representativeAs && !requestorAddress && !buildingAddress && !occupationPercent && !surfacePerLote && !maximumHeight && !minimalFront && !frontalRestriction && !parkingLots && !usePercent && !actualSituation && !actualAuthorizedFS && !authorizationResume && !households && !documents && !lotes && !manzanas && !conditions && !privateSurface && !commonSurface && !location && !authorizationFor && !integrity && !detailedUse && !urbanLUS && !urbanCUS && !antecedent && !antecedentType && !habitacionalLotes && !totalManzanas && !totalSurface && !totalRelotification && !resultRelotification && !previousInvoice && !previousInvoiceDate && !layout && !pageBreak_1 && !pageBreak_2 && !pageBreak_3 && !pageBreak_4 && !pageBreak_5 && !pageBreak_6 && !pageBreak_7 && !pageBreak_8 && !pageBreak_9 && !pageBreak_10 && !files) {
        return {
            status: 400,
            data: {
                msg: "Unable to update record due to missing information"
            },
            log: `Request not completed due to missing information`
        };
    }

    if (!await urbanValidate.validateModels({zone,term, validity})) {
        return {
            status: 400,
            data: {
                msg: "Unable to create due to invalid information provided"
            },
            log: `Request not completed due to invalid information`
        };
    }

    const SPECIAL_DATA = await urbanRepo.getLicenseEspecialData(id);

    if (SPECIAL_DATA == null) {
        return {
            status: 404,
            data: {
                msg: "There requested land use record does not exist"
            },
            log: `Request not completed record ${id} not found`
        };
    }

    let newSpecialData = specialDataToJSON(SPECIAL_DATA).licenseSpecialData;

    newSpecialData.PCU = PCU ? PCU.toUpperCase() : newSpecialData.PCU;
    newSpecialData.representativeAs = representativeAs ? representativeAs : newSpecialData.representativeAs;
    newSpecialData.requestorAddress = requestorAddress ? requestorAddress : newSpecialData.requestorAddress;
    newSpecialData.buildingAddress = buildingAddress ? buildingAddress : newSpecialData.buildingAddress;
    newSpecialData.occupationPercent = occupationPercent ? occupationPercent : newSpecialData.occupationPercent;
    newSpecialData.surfacePerLote = surfacePerLote ? surfacePerLote : newSpecialData.surfacePerLote;
    newSpecialData.maximumHeight = maximumHeight ? maximumHeight : newSpecialData.maximumHeight;
    newSpecialData.minimalFront = minimalFront ? minimalFront : newSpecialData.minimalFront;
    newSpecialData.frontalRestriction = frontalRestriction ? frontalRestriction : newSpecialData.frontalRestriction;
    newSpecialData.parkingLots = parkingLots ? parkingLots : newSpecialData.parkingLots;
    newSpecialData.usePercent = usePercent ? usePercent : newSpecialData.usePercent;
    newSpecialData.actualSituation = actualSituation ? JSON.parse(actualSituation) : newSpecialData.actualSituation;
    newSpecialData.actualAuthorizedFS = actualAuthorizedFS ? JSON.parse(actualAuthorizedFS) : newSpecialData.actualAuthorizedFS;
    newSpecialData.authorizationResume = authorizationResume ? authorizationResume : newSpecialData.authorizationResume;
    newSpecialData.households = households ? households : newSpecialData.households;
    newSpecialData.documents = documents ? documents.replaceAll('\r', '').split('\n') : newSpecialData.documents;
    newSpecialData.lotes = lotes ? lotes.replaceAll('\r', '').split('\n') : newSpecialData.lotes;
    newSpecialData.manzanas = manzanas ? manzanas.replaceAll('\r', '').split('\n') : newSpecialData.manzanas;
    newSpecialData.conditions = conditions ? conditions.replaceAll('\r', '').split('\n') : newSpecialData.conditions;
    newSpecialData.privateSurface = privateSurface ? privateSurface : newSpecialData.privateSurface;
    newSpecialData.commonSurface = commonSurface ? commonSurface : newSpecialData.commonSurface;
    newSpecialData.location = location ? location.replaceAll('\r', '').split('\n') : newSpecialData.location;
    newSpecialData.authorizationFor = authorizationFor ? authorizationFor : newSpecialData.authorizationFor;
    newSpecialData.integrity = integrity ? integrity : newSpecialData.integrity;
    newSpecialData.detailedUse = detailedUse ? detailedUse : newSpecialData.detailedUse;
    newSpecialData.urbanCUS = urbanCUS ? urbanCUS : newSpecialData.urbanCUS;
    newSpecialData.urbanLUS = urbanLUS ? urbanLUS : newSpecialData.urbanLUS;
    newSpecialData.antecedent = antecedent ? antecedent : newSpecialData.antecedent;
    newSpecialData.antecedentType = antecedentType ? antecedentType : newSpecialData.antecedentType;
    newSpecialData.habitacionalLotes = habitacionalLotes ? habitacionalLotes : newSpecialData.habitacionalLotes;
    newSpecialData.totalManzanas = totalManzanas ? totalManzanas : newSpecialData.totalManzanas;
    newSpecialData.totalSurface = totalSurface ? totalSurface : newSpecialData.totalSurface;
    newSpecialData.totalRelotification = totalRelotification ? totalRelotification : newSpecialData.totalRelotification;
    newSpecialData.resultRelotification = resultRelotification ? resultRelotification.replaceAll('\r', '').split('\n') : newSpecialData.resultRelotification;
    newSpecialData.previousInvoice = previousInvoice ? previousInvoice : newSpecialData.previousInvoice;
    newSpecialData.previousInvoiceDate = previousInvoiceDate ? previousInvoiceDate : newSpecialData.previousInvoiceDate;

    newSpecialData.layout = layout ? layout.toUpperCase() : newSpecialData.layout;
    newSpecialData.pageBreak_1 = pageBreak_1 ? parseInt(pageBreak_1) : newSpecialData.pageBreak_1;
    newSpecialData.pageBreak_2 = pageBreak_2 ? parseInt(pageBreak_2) : newSpecialData.pageBreak_2;
    newSpecialData.pageBreak_3 = pageBreak_3 ? parseInt(pageBreak_3) : newSpecialData.pageBreak_3;
    newSpecialData.pageBreak_4 = pageBreak_4 ? parseInt(pageBreak_4) : newSpecialData.pageBreak_4;
    newSpecialData.pageBreak_5 = pageBreak_5 ? parseInt(pageBreak_5) : newSpecialData.pageBreak_5;
    newSpecialData.pageBreak_6 = pageBreak_6 ? parseInt(pageBreak_6) : newSpecialData.pageBreak_6;
    newSpecialData.pageBreak_7 = pageBreak_7 ? parseInt(pageBreak_7) : newSpecialData.pageBreak_7;
    newSpecialData.pageBreak_8 = pageBreak_8 ? parseInt(pageBreak_8) : newSpecialData.pageBreak_8;
    newSpecialData.pageBreak_9 = pageBreak_9 ? parseInt(pageBreak_9) : newSpecialData.pageBreak_9;
    newSpecialData.pageBreak_10 = pageBreak_10 ? parseInt(pageBreak_10) : newSpecialData.pageBreak_10;

    newSpecialData.antecedent = newSpecialData.antecedent == '-' ? null : newSpecialData.antecedent;

    const NEW_DATA ={
        requestDate: requestDate,
        requestorName: requestorName,
        legalRepresentative: legalRepresentative == '-' || representativeAs == '-' ? null : legalRepresentative,
        colony: colony,
        catastralKey: catastralKey,
        surfaceTotal: surface,
        licenseZone: zone,
        licenseValidity: validity,
        licenseTerm: term,
        expeditionDate: expeditionDate,
        collectionOrder: collectionOrder,
        paymentDate: paymentDate,
        billInvoice: billInvoice,
        authorizedQuantity: authorizedQuantity,
        deliveryDate: deliveryDate,
        receiverName: receiverName,
        lastModifiedBy: requestor,
        licenseSpecialData: newSpecialData
    }

    if (files.zoneIMG) {
        if (!await urbanUtils.saveZoneImage(files.zoneIMG, INVOICE_INFO.fullInvoice)) {
            return {
                status: 400,
                data: {
                    msg: "Error saving files to server"
                },
                log: `Error saving files in the server`
            };
        }
    }

    if (files.resumeTables) {
        if (!await urbanUtils.saveLicenseCharts(files.resumeTables, INVOICE_INFO.fullInvoice)) {
            return {
                status: 400,
                data: {
                    msg: "Error saving files to server"
                },
                log: `Error saving files in the server`
            };
        }
    }
    
    const MODIFIED_LICENSE = await urbanRepo.saveUrbanLicense(id, NEW_DATA);

    return {
        status: 200,
        data: {
            license: MODIFIED_LICENSE
        },
        log: `Request completed record modified ${MODIFIED_LICENSE.id}:${MODIFIED_LICENSE.fullInvoice}`
    };
}

export async function requestUrbanLicenseDelete(id) {
    const DELETED_LICENSE = await urbanRepo.deleteUrbanLicense(id);

    if (DELETED_LICENSE == null) {
        return {
            status: 404,
            data: {
                msg: "There requested urban record does not exist"
            },
            log: `Request not completed record ${id} not found`
        };
    }

    return {
        status: 200,
        data: {
            msg: `User ${DELETED_LICENSE.fullInvoice} deleted successfully.`
        },
        log: `Request completed:
            ID -> ${DELETED_LICENSE.id}
            Invoice -> ${DELETED_LICENSE.fullInvoice}`
    }
}

export async function requestPDFDefinition(type, invoice, year) {
    let LICENSE = await urbanRepo.findUrbanLicenseInvoice(type, invoice, year);

    if (LICENSE == null) {
        return {
            status: 404,
            data: {
                msg: "There requested urban record does not exist"
            },
            log: `Request completed record ${type}/${invoice}/${year} not found`
        };
    }

    LICENSE = specialDataToJSON(LICENSE);

    let DEFINITION

    switch (parseInt(type)) {
        case 1:
            DEFINITION = await generateUrbanC(LICENSE);
            break;
        case 2:
            DEFINITION = await generateUrbanLUS(LICENSE);
            break;
        case 3:
            DEFINITION = await generateUrbanLSUB(LICENSE);
            break;
        case 4:
            DEFINITION = await generateUrbanLFUS(LICENSE);
            break;
        case 5:
            DEFINITION = await generateUrbanPLF(LICENSE);
            break;
        case 6:
            DEFINITION = await generateUrbanLF(LICENSE);
            break;
        case 7:
            DEFINITION = await generateUrbanRLF(LICENSE);
            break;
        case 8:
            DEFINITION = await generateUrbanCRPC(LICENSE);
            break;
        case 9:
            DEFINITION = await generateUrbanLUH(LICENSE);
            break;
    }

    return {
        status: 200,
        data: {
            fullInvoice: LICENSE.fullInvoice,
            definition: DEFINITION
        },
        log: `Request completed, PDF generated for record ${LICENSE.id}:${LICENSE.fullInvoice}`
    };
}

export async function requestInvoiceSet(body) {
    const { CUS, LUS, LSUB, LFUS, PLF, LF, RLF, CRPC, LUH } = body

    if (!CUS && !LUS && !LSUB && !LFUS && !PLF && !LF && !RLF && !CRPC && !LUH) {
        return {
            status: 400,
            data: {
                msg: "Unable to set invoices due to missing information"
            },
            log: `Request not completed due to missing information`
        };
    }

    if (await urbanValidate.existingLicenses()) {
        return {
            status: 400,
            data: {
                msg: "Unable to set invoices due to there are invoices already registered."
            },
            log: `Request not completed due to there are invoices already registered`
        };
    }

    for (const key in body) {
        if (urbanValidate.checkType(key)) {
            await urbanRepo.saveStartInvoice(body[key], key, new Date().getFullYear());
        }
    }

    return {
        status: 200,
        data: {
            invoices: `CUS: ${CUS}
                LUS: ${LUS}
                LSUB: ${LSUB}
                LFUS: ${LFUS}
                PLF: ${PLF}
                LF: ${LF}
                RLF: ${RLF}
                CRPC: ${CRPC}
                LUH: ${LUH}`
        },
        log: `Request completed start invoices set:
            CUS  --> ${CUS}
            LUS  --> ${LUS}
            LSUB --> ${LSUB}
            LFUS --> ${LFUS}
            PLF  --> ${PLF}
            LF   --> ${LF}
            RLF  --> ${RLF}
            CRPC --> ${CRPC}
            LUH --> ${LUH}`
    };
}

export async function requestInvoiceCheck() {
    if (await urbanValidate.existingLicenses()) {
        return {
            status: 200,
            data: {
                existing: true
            },
            log: `Request completed invoices already registered`
        };
    }

    return {
        status: 400,
        data: {
            existing: false
        },
        log: `Request completed no invoices invoices registered`
    };
}