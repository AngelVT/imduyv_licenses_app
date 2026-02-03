import * as urbanRepo from '../repositories/urban.repository.js';
import * as urbanValidate from '../validations/urban.validations.js';
import * as urbanUtils from '../utilities/urban.utilities.js';
import { validate as isUuid } from 'uuid';
import { specialDataToJSON } from '../utilities/json.utilities.js';
import { generateUrbanC } from "../models/documents/urban/licenciaCUS.js";
import { generateUrbanLUS } from "../models/documents/urban/licenciaLUS.js";
import { generateUrbanLSUB } from "../models/documents/urban/licenciaLSUB.js";
import { generateUrbanLFUS } from "../models/documents/urban/licenciaLFUS.js";
import { generateUrbanCRPC } from "../models/documents/urban/licenciaCRPC.js";
import { generateUrbanLF } from '../models/documents/urban/licenciaLF.js';
import { generateUrbanPLF } from '../models/documents/urban/licenciaPLF.js';
import { generateUrbanRLF } from '../models/documents/urban/licenciaRLF.js';
import { generateUrbanLUH } from '../models/documents/urban/licenciaLUH.js';
import ValidationError from '../errors/ValidationError.js';
import ResourceError from '../errors/ValidationError.js';
import FileSystemError from '../errors/FileSystemError.js';
import { validateDates } from '../validations/administration.validations.js';
import path from 'path';
import { __dirstorage } from '../path.configuration.js';
import { requestCoordinateCheck } from './geo.service.js';

export async function requestAllUrbanLicenses() {
    let LICENSES = await urbanRepo.findAllUrbanLicenses();

    if (!LICENSES || LICENSES.length === 0) {
        throw new ResourceError('There are no urban records to display.',
            'Urban request all records',
            'There are no urban records registered.');
    }

    LICENSES = specialDataToJSON(LICENSES);

    return {
        licenses: LICENSES
    }
}

export async function requestUrbanLicenseById(id) {
    if (!isUuid(id)) {
        throw new ValidationError('Request failed due to invalid ID.',
            'Urban request by ID',
            `Request failed due to ID ${id} is invalid.`
        );
    }

    let LICENSE = await urbanRepo.findUrbanLicense(id);

    if (!LICENSE) {
        throw new ResourceError('The requested urban record does not exist.',
            'Urban request by ID.',
            `Request completed record ${id} does not exist.`);
    }

    LICENSE = specialDataToJSON(LICENSE);

    return {
        license: LICENSE
    }
}

export async function requestUrbanLicenseByInvoice(type, invoice, year) {
    if (isNaN(parseInt(type)) ||
        isNaN(parseInt(invoice)) ||
        isNaN(parseInt(year))) {
        throw new ValidationError('Request failed due to invalid search parameters provided.',
            'Urban request by full invoice',
            `Search params /t/${type}/i/${invoice}/y/${year} are invalid.`);
    }

    let LICENSE = await urbanRepo.findUrbanLicenseInvoice(type, invoice, year);

    if (!LICENSE) {
        throw new ResourceError('The requested urban record does not exist',
            'Urban request by full invoice',
            `Search params /t/${type}/i/${invoice}/y/${year} not found.`);
    }

    LICENSE = specialDataToJSON(LICENSE);

    return {
        license: LICENSE
    }
}

export async function requestUrbanLicenseByType(type, year) {
    if (isNaN(parseInt(type)) ||
        isNaN(parseInt(year))) {
        throw new ValidationError('Request failed due to invalid search parameters provided.',
            'Urban request by type and year',
            `Search params /t/${type}/y/${year} are invalid.`);
    }

    let LICENSES = await urbanRepo.findUrbanLicenseType(type, year);

    if (!LICENSES || LICENSES.length === 0) {
        throw new ResourceError('The requested records do not exist.',
            'Urban request by type and year',
            `Search params /t/${type}/y/${year} not found.`);
    }

    LICENSES = specialDataToJSON(LICENSES);

    return {
        licenses: LICENSES
    }
}

export async function requestUrbanLicenseListByType(type, year) {
    if (isNaN(parseInt(type)) ||
        isNaN(parseInt(year))) {
        throw new ValidationError('Request failed due to invalid search parameters provided.',
            'Urban request by type and year',
            `Search params /t/${type}/y/${year} are invalid.`);
    }

    let LICENSES = await urbanRepo.findUrbanLicenseListByType(type, year);

    if (!LICENSES || LICENSES.length === 0) {
        throw new ResourceError('The requested records do not exist.',
            'Urban list request by type and year',
            `Search params /t/${type}/y/${year} not found.`);
    }

    LICENSES = specialDataToJSON(LICENSES);

    return {
        licenses: LICENSES
    }
}

export async function requestUrbanLicenseByParameter(parameter, value) {
    if (!urbanValidate.validateParameter(parameter)) {
        throw new ValidationError('Request failed due to invalid search parameters provided.',
            'Urban request by parameter',
            `Search param ${parameter} is invalid.`);
    }

    let LICENSES = await urbanRepo.findUrbanLicenseBy(parameter, value);

    if (!LICENSES || LICENSES.length === 0) {
        throw new ResourceError('There are no matching record results results',
            'Urban request by parameter',
            `Search by param ${parameter} not found.`);
    }

    LICENSES = specialDataToJSON(LICENSES);

    return {
        licenses: LICENSES
    }
}

export async function requestUrbanLicenseCreate(body, files, requestor) {
    const DATE = new Date;

    const YEAR = DATE.getFullYear();

    /*for (const key in body) {
        if (key !== 'requestorAddress' &&
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
            key !== 'representativeAs') {
            
        }
    }*/

    const {
        licenseType,
        requestorName,
        requestDate,
        buildingAddress,
        georeference,
        collectionOrder,
        paymentDate,
        billInvoice,
        authorizedQuantity,
        expeditionDate,
        printInvoice,
        deliveryDate,
        receiverName,
        observations,
        //legalRepresentative,
        //colony,
        //catastralKey,
        //licenseTerm,
        //surface,
        //zone,
        //validity,
        //isFrac,
        //PCU,
        //occupationPercent,
        //surfacePerLote,
        //maximumHeight,
        //levels,
        //representativeAs,
        //requestorAddress,
        //non essential for registration special data
        //minimalFront,//CUS
        //frontalRestriction,//CUS
        //parkingLots,//LUS
        //conditions,//LUS
        //restrictions,//LUS
        //donationArea,//LUS
        //authUse,//LUS
        //activity,//LUS
        //authorizationResume,//LSUB
        //documents,//PLF
        //location,//PLF
        //integrity,//PLF
        //detailedUse,//PLF
        //urbanCUS,//LF
        //urbanLUS,//LF
        //habitacionalLotes,//LF
        //totalManzanas,//LF
        //totalSurface,//LF
        //lotes,//RLF
        //resultRelotification,//RLF
        //totalRelotification,//RLF
        //previousInvoice,//RLF
        //previousInvoiceDate,//RLF
        //manzanas,//CRPC
        //households,//CRPC
        //privateSurface,//CRPC
        //commonSurface,//CRPC
    } = body;

    if (!licenseType || !requestorName || !georeference/* || (licenseType == 2 && typeof isFrac === 'undefined')*/) {
        throw new ValidationError('Request failed due to missing information.',
            'Urban create request',
            `Request failed due to missing information.
            Provided data -> ${JSON.stringify(body)}`);
    }

    const coordinateInfo = await requestCoordinateCheck(georeference, {
        considerFrac: true,
        trowError: true
    });

    if ((requestDate && !validateDates(requestDate)) ||
        (expeditionDate && !validateDates(expeditionDate)) ||
        (paymentDate && !validateDates(paymentDate)) ||
        (deliveryDate && !validateDates(deliveryDate))/* ||
        (previousInvoiceDate && !validateDates(previousInvoiceDate))*/) {
        throw new ValidationError(
            'Request failed due to invalid information.',
            'Urban create request',
            `Request failed due to invalid information.
            Provided data -> Request date: ${requestDate}, Expedition date: ${expeditionDate}, Payment date: ${paymentDate}, Delivery date: ${deliveryDate}, Previous invoice date: ${previousInvoiceDate}`
        );
    }

    if (!await urbanValidate.validateModels({ type: licenseType/*, validity */ })) {
        throw new ValidationError('Request failed due to invalid information.',
            'Urban create request',
            `Request failed due to invalid information.
            Provided data -> License type: ${licenseType}, term: ${licenseTerm}, zone: ${zone}, validity: ${validity}`);
    }

    /*const INVOICE_INFO = await urbanUtils.generateInvoiceInformation(licenseType, YEAR);*/

    const CONTROL_INVOICE_INFO = await urbanUtils.generateControlInvoiceInformation(licenseType, YEAR);

    /*const SPECIAL_DATA = urbanUtils.generateSpecialData(licenseType);

    SPECIAL_DATA.PCU = coordinateInfo.data.PCU;
    SPECIAL_DATA.representativeAs = representativeAs ? representativeAs : SPECIAL_DATA.representativeAs;
    SPECIAL_DATA.colony = colony ? colony : SPECIAL_DATA.colony;
    SPECIAL_DATA.requestorAddress = requestorAddress ? requestorAddress : SPECIAL_DATA.requestorAddress;
    SPECIAL_DATA.occupationPercent = coordinateInfo.data.COS;
    SPECIAL_DATA.surfacePerLote = coordinateInfo.data.m2_neto;
    SPECIAL_DATA.maximumHeight = coordinateInfo.data.alt_max;
    SPECIAL_DATA.levels = coordinateInfo.data.niveles;
    SPECIAL_DATA.isFrac = licenseType == 2 ? urbanUtils.parseBool(isFrac, SPECIAL_DATA.isFrac) : undefined;

    //non essential for registration special data
    SPECIAL_DATA.minimalFront = minimalFront ? minimalFront : SPECIAL_DATA.minimalFront;
    SPECIAL_DATA.frontalRestriction = frontalRestriction ? frontalRestriction : SPECIAL_DATA.frontalRestriction;
    SPECIAL_DATA.parkingLots = parkingLots ? parkingLots : SPECIAL_DATA.parkingLots;
    SPECIAL_DATA.conditions = conditions ? conditions.replaceAll('\r', '').split('\n') : SPECIAL_DATA.conditions;
    SPECIAL_DATA.restrictions = restrictions ? restrictions.replaceAll('\r', '').split('\n') : SPECIAL_DATA.restrictions;
    SPECIAL_DATA.observations = observations ? observations.replaceAll('\r', '').split('\n') : SPECIAL_DATA.observations;
    SPECIAL_DATA.donationArea = donationArea ? donationArea.replaceAll('\r', '').split('\n') : SPECIAL_DATA.donationArea;
    SPECIAL_DATA.authUse = authUse ? authUse.toUpperCase() : SPECIAL_DATA.authUse;
    SPECIAL_DATA.activity = activity ? activity.toUpperCase() : SPECIAL_DATA.activity;
    SPECIAL_DATA.authorizationResume = authorizationResume ? authorizationResume : SPECIAL_DATA.authorizationResume;
    SPECIAL_DATA.documents = documents ? documents.replaceAll('\r', '').split('\n') : SPECIAL_DATA.documents;
    SPECIAL_DATA.location = location ? location.replaceAll('\r', '').split('\n') : SPECIAL_DATA.location;
    SPECIAL_DATA.integrity = integrity ? integrity : SPECIAL_DATA.integrity;
    SPECIAL_DATA.detailedUse = detailedUse ? detailedUse : SPECIAL_DATA.detailedUse;
    SPECIAL_DATA.urbanCUS = urbanCUS ? urbanCUS : SPECIAL_DATA.urbanCUS;
    SPECIAL_DATA.urbanLUS = urbanLUS ? urbanLUS : SPECIAL_DATA.urbanLUS;
    SPECIAL_DATA.habitacionalLotes = habitacionalLotes ? habitacionalLotes : SPECIAL_DATA.habitacionalLotes;
    SPECIAL_DATA.totalManzanas = totalManzanas ? totalManzanas : SPECIAL_DATA.totalManzanas;
    SPECIAL_DATA.totalSurface = totalSurface ? totalSurface : SPECIAL_DATA.totalSurface;
    SPECIAL_DATA.lotes = lotes ? lotes.replaceAll('\r', '').split('\n') : SPECIAL_DATA.lotes;
    SPECIAL_DATA.resultRelotification = resultRelotification ? resultRelotification.replaceAll('\r', '').split('\n') : SPECIAL_DATA.resultRelotification;
    SPECIAL_DATA.totalRelotification = totalRelotification ? totalRelotification : SPECIAL_DATA.totalRelotification;
    SPECIAL_DATA.previousInvoice = previousInvoice ? previousInvoice : SPECIAL_DATA.previousInvoice;
    SPECIAL_DATA.previousInvoiceDate = previousInvoiceDate ? previousInvoiceDate : SPECIAL_DATA.previousInvoiceDate;
    SPECIAL_DATA.manzanas = manzanas ? manzanas.replaceAll('\r', '').split('\n') : SPECIAL_DATA.manzanas;
    SPECIAL_DATA.households = households ? households : SPECIAL_DATA.households;
    SPECIAL_DATA.privateSurface = privateSurface ? privateSurface : SPECIAL_DATA.privateSurface;
    SPECIAL_DATA.commonSurface = commonSurface ? commonSurface : SPECIAL_DATA.commonSurface;*/

    const NEW_LICENSE_DATA = {
        fullControlInvoice: CONTROL_INVOICE_INFO.fullInvoice,
        controlInvoice: CONTROL_INVOICE_INFO.numericInvoice,
        licenseType: licenseType,
        controlYear: YEAR,
        requestDate: requestDate ? requestDate : null,
        requestorName: requestorName,
        //legalRepresentative: legalRepresentative ? legalRepresentative : null,
        printInvoice: printInvoice ? printInvoice : null,
        elaboratedBy: requestor,
        buildingAddress: buildingAddress ? buildingAddress : null,
        //catastralKey: catastralKey ? catastralKey : null,
        geoReference: georeference,
        //licenseTerm: coordinateInfo.data.numericTerm,
        //surfaceTotal: surface ? surface : null,
        //licenseZone: coordinateInfo.data.numericZone,
        expeditionDate: expeditionDate ? expeditionDate : null,
        //licenseValidity: validity ? validity : null,
        collectionOrder: collectionOrder ? collectionOrder : null,
        paymentDate: paymentDate ? paymentDate : null,
        billInvoice: billInvoice ? billInvoice : null,
        authorizedQuantity: authorizedQuantity ? authorizedQuantity : null,
        deliveryDate: deliveryDate ? deliveryDate : null,
        receiverName: receiverName ? receiverName : null,
        observations: observations ? observations : null,
        //licenseSpecialData: SPECIAL_DATA
    }

    /*if (files.zoneIMG) {
        if (!await urbanValidate.validateFile(files.zoneIMG)) {
            throw new ValidationError('Invalid files provided only png files are allowed.',
                'Urban create request',
                `Request failed due to invalid files provided.
            Provided file -> ${files.zoneIMG[0].originalname}`);
        }

        if (!await urbanUtils.saveZoneImage(files.zoneIMG, INVOICE_INFO.fullInvoice)) {
            throw new FileSystemError('Error saving files to server.',
                'Urban create request',
                `Request failed due to unexpected error saving files to server.
            Provided file -> ${files.zoneIMG[0].originalname}`);
        }
    }

    if (files.resumeTables) {
        if (!await urbanValidate.validateTableFiles(files.resumeTables)) {
            throw new ValidationError('Invalid files provided only png files are allowed.',
                'Urban create request',
                `Request failed due to invalid files provided.
            Provided files -> ${files.resumeTables.map(file => file.originalname).join(', ')}`);
        }

        if (!await urbanUtils.saveLicenseCharts(files.resumeTables, INVOICE_INFO.fullInvoice)) {
            throw new FileSystemError('Error saving files to server.',
                'Urban create request',
                `Request failed due to unexpected error saving files to server.
            Provided files -> ${files.resumeTables.map(file => file.originalname).join(', ')}`);
        }
    }*/

    if (files.unsignedFormat) {
        if (!await urbanValidate.validatePFFile(files.unsignedFormat[0])) {
            throw new ValidationError('Invalid files provided only png files are allowed.',
                'Urban create request',
                `Request failed due to invalid files provided.
            Provided file -> ${files.unsignedFormat[0].originalname}`);
        }

        if (!await urbanUtils.savePDF(files.unsignedFormat[0], CONTROL_INVOICE_INFO.fullInvoice, CONTROL_INVOICE_INFO.fullInvoice)) {
            throw new FileSystemError('Error saving files to server.',
                'Urban create request',
                `Request failed due to unexpected error saving files to server.
            Provided file -> ${files.unsignedFormat[0].originalname}`);
        }
    }

    const NEW_LICENSE = await urbanRepo.saveNewUrbanLicense(NEW_LICENSE_DATA);

    if (NEW_LICENSE == null) {
        throw new ValidationError('Unable to create, license already exist',
            'Urban create request',
            `Request failed due to the record already exist.
            Existing record details -> fullInvoice: ${CONTROL_INVOICE_INFO.fullInvoice}, invoice: ${CONTROL_INVOICE_INFO.numericInvoice}, licenseType: ${licenseType}, year: ${YEAR}`);
    }

    return {
        license: NEW_LICENSE
    }
}

export async function requestUrbanLicenseUpdate(id, licenseData, files, requestor) {
    if (!isUuid(id)) {
        throw new ValidationError('Request failed due to invalid ID.',
            'Urban update request',
            `Request failed due to ID ${id} is invalid.`
        );
    }

    const SPECIAL_DATA = await urbanRepo.getLicenseEspecialData(id);

    if (!SPECIAL_DATA) {
        throw new ResourceError('Request failed due to the record to update do not exist.',
            'Urban update request',
            `Request failed due to record ${id} does not exist.`);
    }

    const {
        requestorName,
        requestDate,
        buildingAddress,
        georeference,
        collectionOrder,
        paymentDate,
        billInvoice,
        authorizedQuantity,
        expeditionDate,
        printInvoice,
        deliveryDate,
        receiverName,
        observations,
        statuses
        /*requestorName,
        legalRepresentative,
        requestDate,
        colony,
        catastralKey,
        surface,
        //zone,
        expeditionDate,
        collectionOrder,
        paymentDate,
        billInvoice,
        authorizedQuantity,
        deliveryDate,
        receiverName,
        validity,
        //term,
        //PCU,
        isFrac,
        representativeAs,
        requestorAddress,
        buildingAddress,
        //occupationPercent,
        //surfacePerLote,
        //maximumHeight,
        //levels,
        minimalFront,
        frontalRestriction,
        parkingLots,
        usePercent,
        activity,
        authUse,
        actualSituation,
        actualAuthorizedFS,
        authorizationResume,
        households,
        documents,
        lotes,
        manzanas,
        conditions,
        restrictions,
        observations,
        donationArea,
        privateSurface,
        commonSurface,
        location,
        authorizationFor,
        integrity,
        detailedUse,
        urbanLUS,
        urbanCUS,
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
        pageBreak_10*/
    } = licenseData;

    if (georeference) {
        await requestCoordinateCheck(georeference, {
            considerFrac: true,
            trowError: true
        });
    }

    if (files.signedFormat && !SPECIAL_DATA.approvalStatus && SPECIAL_DATA.active) {
        throw new ValidationError('El formato firmado solo se puede modificar cuando la licencia ha sido aprobada.',
                'Urban update request',
                `Request failed due to invalid files provided.
            Provided files -> ${files.signedFormat.map(file => file.originalname).join(', ')}`);
    }

    if (!SPECIAL_DATA.active && files.signedFormat && SPECIAL_DATA.approvalStatus && SPECIAL_DATA.fullInvoice && SPECIAL_DATA.fullControlInvoice) {
        if (!await urbanValidate.validatePFFile(files.signedFormat[0])) {
            throw new ValidationError('Invalid files provided only pdf files are allowed.',
                'Urban update request',
                `Request failed due to invalid files provided.
            Provided files -> ${files.signedFormat.map(file => file.originalname).join(', ')}`);
        }

        if (!await urbanUtils.savePDF(files.signedFormat[0], SPECIAL_DATA.fullControlInvoice, SPECIAL_DATA.fullInvoice)) {
            throw new FileSystemError('Error saving files to server.',
                'Urban update request',
                `Request failed due to unexpected error saving files to server.
            Provided files -> ${files.signedFormat.map(file => file.originalname).join(', ')}`);
        }

        return {
            license: SPECIAL_DATA
        }

    } else if (!SPECIAL_DATA.active && (printInvoice || receiverName || deliveryDate || statuses)) {
        const statusObj = JSON.parse(statuses);

        for (const key in statusObj) {
            if (!Object.hasOwn(statusObj, key)) continue;
            statusObj[key] = urbanValidate.validateParseBool(statusObj[key]);
        }

        const NEW_DATA = {
            deliveryDate: deliveryDate,
            receiverName: receiverName,
            printInvoice: printInvoice,
            statuses: statusObj,
            lastModifiedBy: requestor,
        }

        const MODIFIED_LICENSE = await urbanRepo.saveUrbanLicense(id, NEW_DATA);

        return {
            license: MODIFIED_LICENSE
        }
    } else if (!SPECIAL_DATA.active) {
        throw new ValidationError('Request failed due to resource is locked.',
            'Urban update request',
            `Request failed due to license locked.`);
    }

    /*for (const key in licenseData) {
        if (key !== 'requestorAddress' &&
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
            key !== 'representativeAs') {
            licenseData[key] = licenseData[key].toLowerCase();
        }
    }*/

    if (!requestorName && !requestDate && !expeditionDate && !collectionOrder && !paymentDate && !billInvoice && !authorizedQuantity && !deliveryDate && !receiverName && !buildingAddress && !observations && !georeference && !printInvoice && !files.signedFormat && !files.unsignedFormat && !statuses/*legalRepresentative &&*/ /* !colony && !catastralKey && !surface &&*//* && !validity && typeof isFrac === 'undefined'&& !representativeAs && !requestorAddress*/ /* !minimalFront && !frontalRestriction && !parkingLots && !usePercent, !authUse && !activity && !actualSituation && !actualAuthorizedFS && !authorizationResume && !households && !documents && !lotes && !manzanas && !conditions && !restrictions && *//* && !donationArea && !privateSurface && !commonSurface && !location && !authorizationFor && !integrity && !detailedUse && !urbanLUS && !urbanCUS && !habitacionalLotes && !totalManzanas && !totalSurface && !totalRelotification && !resultRelotification && !previousInvoice && !previousInvoiceDate && !layout && !pageBreak_1 && !pageBreak_2 && !pageBreak_3 && !pageBreak_4 && !pageBreak_5 && !pageBreak_6 && !pageBreak_7 && !pageBreak_8 && !pageBreak_9 && !pageBreak_10 && !files*/) {
        throw new ValidationError('Request failed due to missing information.',
            'Urban update request',
            `Request failed due to missing information.
            Provided data -> ${JSON.stringify(licenseData)}`);
    }

    if ((requestDate && !validateDates(requestDate)) ||
        (expeditionDate && !validateDates(expeditionDate)) ||
        (paymentDate && !validateDates(paymentDate)) ||
        (deliveryDate && !validateDates(deliveryDate))/* ||
        (previousInvoiceDate && !validateDates(previousInvoiceDate))*/) {
        throw new ValidationError(
            'Request failed due to invalid information.',
            'Urban update request',
            `Request failed due to invalid information.
            Provided data -> Request date: ${requestDate}, Expedition date: ${expeditionDate}, Payment date: ${paymentDate}, Delivery date: ${deliveryDate}, Previous invoice date: ${previousInvoiceDate}`
        );
    }

    const statusObj = JSON.parse(statuses);

    for (const key in statusObj) {
        if (!Object.hasOwn(statusObj, key)) continue;
        statusObj[key] = urbanValidate.validateParseBool(statusObj[key]);
    }

    /*if (!await urbanValidate.validateModels({ validity })) {
        throw new ValidationError('Request failed due to invalid information.',
            'Urban update request',
            `Request failed due to invalid information.
            Provided data -> Zone: ${zone}, validity: ${validity}`);
    }*/

    //let newSpecialData = specialDataToJSON(SPECIAL_DATA).licenseSpecialData;

    //newSpecialData.PCU = PCU ? PCU.toUpperCase() : newSpecialData.PCU;
    /*newSpecialData.isFrac = urbanUtils.parseBool(isFrac, newSpecialData.isFrac);
    newSpecialData.representativeAs = representativeAs ? representativeAs : newSpecialData.representativeAs;
    newSpecialData.requestorAddress = requestorAddress ? requestorAddress : newSpecialData.requestorAddress;
    newSpecialData.colony = colony ? colony : newSpecialData.colony;
    //newSpecialData.occupationPercent = occupationPercent ? occupationPercent : newSpecialData.occupationPercent;
    //newSpecialData.surfacePerLote = surfacePerLote ? surfacePerLote : newSpecialData.surfacePerLote;
    //newSpecialData.maximumHeight = maximumHeight ? maximumHeight : newSpecialData.maximumHeight;
    //newSpecialData.levels = levels ? levels : newSpecialData.levels;
    newSpecialData.minimalFront = minimalFront ? minimalFront : newSpecialData.minimalFront;
    newSpecialData.frontalRestriction = frontalRestriction ? frontalRestriction : newSpecialData.frontalRestriction;
    newSpecialData.parkingLots = parkingLots ? parkingLots : newSpecialData.parkingLots;
    newSpecialData.usePercent = usePercent ? usePercent : newSpecialData.usePercent;
    newSpecialData.authUse = authUse ? authUse.toUpperCase() : newSpecialData.authUse;
    newSpecialData.activity = activity ? activity.toUpperCase() : newSpecialData.activity;
    newSpecialData.actualSituation = actualSituation ? JSON.parse(actualSituation) : newSpecialData.actualSituation;
    newSpecialData.actualAuthorizedFS = actualAuthorizedFS ? JSON.parse(actualAuthorizedFS) : newSpecialData.actualAuthorizedFS;
    newSpecialData.authorizationResume = authorizationResume ? authorizationResume : newSpecialData.authorizationResume;
    newSpecialData.households = households ? households : newSpecialData.households;
    newSpecialData.documents = documents ? documents.replaceAll('\r', '').split('\n') : newSpecialData.documents;
    newSpecialData.lotes = lotes ? lotes.replaceAll('\r', '').split('\n') : newSpecialData.lotes;
    newSpecialData.donationArea = donationArea ? donationArea.replaceAll('\r', '').split('\n') : newSpecialData.donationArea;
    newSpecialData.manzanas = manzanas ? manzanas.replaceAll('\r', '').split('\n') : newSpecialData.manzanas;
    newSpecialData.conditions = conditions ? conditions.replaceAll('\r', '').split('\n') : newSpecialData.conditions;
    newSpecialData.restrictions = restrictions ? restrictions.replaceAll('\r', '').split('\n') : newSpecialData.restrictions;
    newSpecialData.observations = observations ? observations.replaceAll('\r', '').split('\n') : newSpecialData.observations;
    newSpecialData.privateSurface = privateSurface ? privateSurface : newSpecialData.privateSurface;
    newSpecialData.commonSurface = commonSurface ? commonSurface : newSpecialData.commonSurface;
    newSpecialData.location = location ? location.replaceAll('\r', '').split('\n') : newSpecialData.location;
    newSpecialData.authorizationFor = authorizationFor ? authorizationFor : newSpecialData.authorizationFor;
    newSpecialData.integrity = integrity ? integrity : newSpecialData.integrity;
    newSpecialData.detailedUse = detailedUse ? detailedUse : newSpecialData.detailedUse;
    newSpecialData.urbanCUS = urbanCUS ? urbanCUS : newSpecialData.urbanCUS;
    newSpecialData.urbanLUS = urbanLUS ? urbanLUS : newSpecialData.urbanLUS;
    newSpecialData.habitacionalLotes = habitacionalLotes ? habitacionalLotes : newSpecialData.habitacionalLotes;
    newSpecialData.totalManzanas = totalManzanas ? totalManzanas : newSpecialData.totalManzanas;
    newSpecialData.totalSurface = totalSurface ? totalSurface : newSpecialData.totalSurface;
    newSpecialData.totalRelotification = totalRelotification ? totalRelotification : newSpecialData.totalRelotification;
    newSpecialData.resultRelotification = resultRelotification ? resultRelotification.replaceAll('\r', '').split('\n') : newSpecialData.resultRelotification;
    newSpecialData.previousInvoice = previousInvoice ? previousInvoice : newSpecialData.previousInvoice;
    newSpecialData.previousInvoiceDate = previousInvoiceDate ? previousInvoiceDate : newSpecialData.previousInvoiceDate;

    newSpecialData.layout = layout ? layout.toUpperCase() : newSpecialData.layout;
    newSpecialData.pageBreak_1 = urbanUtils.parseBool(pageBreak_1, newSpecialData.pageBreak_1);
    newSpecialData.pageBreak_2 = urbanUtils.parseBool(pageBreak_2, newSpecialData.pageBreak_2);
    newSpecialData.pageBreak_3 = urbanUtils.parseBool(pageBreak_3, newSpecialData.pageBreak_3);
    newSpecialData.pageBreak_4 = urbanUtils.parseBool(pageBreak_4, newSpecialData.pageBreak_4);
    newSpecialData.pageBreak_5 = urbanUtils.parseBool(pageBreak_5, newSpecialData.pageBreak_5);
    newSpecialData.pageBreak_6 = urbanUtils.parseBool(pageBreak_6, newSpecialData.pageBreak_6);
    newSpecialData.pageBreak_7 = urbanUtils.parseBool(pageBreak_7, newSpecialData.pageBreak_7);
    newSpecialData.pageBreak_8 = urbanUtils.parseBool(pageBreak_8, newSpecialData.pageBreak_8);
    newSpecialData.pageBreak_9 = urbanUtils.parseBool(pageBreak_9, newSpecialData.pageBreak_9);
    newSpecialData.pageBreak_10 = urbanUtils.parseBool(pageBreak_10, newSpecialData.pageBreak_10);

    newSpecialData.antecedent = newSpecialData.antecedent == '-' ? null : newSpecialData.antecedent;*/

    const NEW_DATA = {
        requestDate: requestDate,
        requestorName: requestorName,
        //legalRepresentative: legalRepresentative == '-' || representativeAs == '-' ? null : legalRepresentative,
        buildingAddress: buildingAddress,
        //catastralKey: catastralKey,
        //surfaceTotal: surface,
        //licenseZone: zone,
        //licenseValidity: validity,
        //licenseTerm: term,
        georeference: georeference,
        printInvoice: printInvoice,
        expeditionDate: expeditionDate,
        collectionOrder: collectionOrder,
        paymentDate: paymentDate,
        billInvoice: billInvoice,
        authorizedQuantity: authorizedQuantity,
        deliveryDate: deliveryDate,
        receiverName: receiverName,
        lastModifiedBy: requestor,
        observations: observations,
        statuses: statusObj
        //licenseSpecialData: newSpecialData
    }

    /*if (files.zoneIMG) {
        if (!await urbanValidate.validateFile(files.zoneIMG)) {
            throw new ValidationError('Invalid files provided only png files are allowed.',
                'Urban update request',
                `Request failed due to invalid files provided.
            Provided file -> ${files.zoneIMG[0].originalname}`);
        }

        if (!await urbanUtils.saveZoneImage(files.zoneIMG, SPECIAL_DATA.fullInvoice)) {
            throw new FileSystemError('Error saving files to server.',
                'Urban update request',
                `Request failed due to unexpected error saving files to server.
            Provided file -> ${files.zoneIMG[0].originalname}`);
        }
    }*/

    /*if (files.resumeTables) {
        if (!await urbanValidate.validateTableFiles(files.resumeTables)) {
            throw new ValidationError('Invalid files provided only xhtml files are allowed.',
                'Urban update request',
                `Request failed due to invalid files provided.
            Provided files -> ${files.resumeTables.map(file => file.originalname).join(', ')}`);
        }

        if (!await urbanUtils.saveLicenseCharts(files.resumeTables, SPECIAL_DATA.fullInvoice)) {
            throw new FileSystemError('Error saving files to server.',
                'Urban update request',
                `Request failed due to unexpected error saving files to server.
            Provided files -> ${files.resumeTables.map(file => file.originalname).join(', ')}`);
        }
    }*/

    if (files.unsignedFormat) {
        if (!await urbanValidate.validatePFFile(files.unsignedFormat[0])) {
            throw new ValidationError('Invalid files provided only pdf files are allowed.',
                'Urban update request',
                `Request failed due to invalid files provided.
            Provided file -> ${files.unsignedFormat[0].originalname}`);
        }

        if (!await urbanUtils.savePDF(files.unsignedFormat[0], SPECIAL_DATA.fullControlInvoice, SPECIAL_DATA.fullControlInvoice)) {
            throw new FileSystemError('Error saving files to server.',
                'Urban update request',
                `Request failed due to unexpected error saving files to server.
            Provided file -> ${files.unsignedFormat[0].originalname}`);
        }
    }

    const MODIFIED_LICENSE = await urbanRepo.saveUrbanLicense(id, NEW_DATA);

    return {
        license: MODIFIED_LICENSE
    }
}

export async function requestUrbanLicenseApprove(id, requestor) {
    const DATE = new Date;

    const YEAR = DATE.getFullYear();

    if (!isUuid(id)) {
        throw new ValidationError('Request failed due to invalid ID.',
            'Urban approval request',
            `Request failed due to ID ${id} is invalid.`
        );
    }

    const licenseApproval = await urbanRepo.getLicenseApprovalStatus(id);

    if (!licenseApproval) {
        throw new ResourceError('Request failed due to the record to approve does not exist.',
            'Urban approval request',
            `Request failed due to record ${id} does not exist.`);
    }

    if (licenseApproval.approvalStatus) {
        return {
            msg: `The license ${licenseApproval.fullInvoice} is already approved`,
            license: {
                id,
                fullInvoice: licenseApproval.fullInvoice
            }
        }
    }

    let INVOICE_INFO;

    if (!licenseApproval.fullInvoice) {
        INVOICE_INFO = await urbanUtils.generateInvoiceInformation(licenseApproval.licenseType, YEAR);
    }

    const approvedLicense = await urbanRepo.saveUrbanLicense(id, {
        fullInvoice: INVOICE_INFO?.fullInvoice,
        invoice: INVOICE_INFO?.numericInvoice,
        year: YEAR,
        lastModifiedBy: requestor,
        approvalStatus: true,
        active: false
    });

    /*if (!await urbanUtils.generateArchivePDF(approvedLicense)) {
        throw new FileSystemError('Error saving files to server.',
            'Urban approval request',
            `Request failed due to unexpected error saving files to server.
            File creation for -> ${id}:${licenseApproval.fullInvoice}`);
    }*/

    return {
        msg: `The license ${approvedLicense.fullInvoice} was approved`,
        license: {
            id,
            fullInvoice: approvedLicense.fullInvoice
        }
    }
}

export async function requestUrbanLicenseLock(id, requestor) {
    if (!isUuid(id)) {
        throw new ValidationError('Request failed due to invalid ID.',
            'Urban lock request',
            `Request failed due to ID ${id} is invalid.`
        );
    }

    const licenseLock = await urbanRepo.findUrbanLicense(id);

    if (!licenseLock) {
        throw new ResourceError('Request failed due to the record to approve does not exist.',
            'Urban lock request',
            `Request failed due to record ${id} does not exist.`);
    }

    if (!licenseLock.approvalStatus) {
        throw new ValidationError('Request failed due to license not approved.',
            'Urban lock request',
            `Request failed due to the license is has not been approved.`
        );
    }

    if (!licenseLock.active) {
        return {
            msg: `The license ${licenseLock.fullInvoice} is already locked`,
            license: {
                id,
                fullInvoice: licenseLock.fullInvoice
            }
        }
    }

    if (!await urbanUtils.generateArchivePDF(licenseLock)) {
        throw new FileSystemError('Error saving files to server.',
            'Urban lock request',
            `Request failed due to unexpected error saving files to server.
            File creation for -> ${id}:${licenseLock.fullInvoice}`);
    }

    const lockedLicense = await urbanRepo.saveUrbanLicense(id, {
        lastModifiedBy: requestor,
        active: false
    });

    return {
        msg: `The license ${lockedLicense.fullInvoice} was locked`,
        license: {
            id,
            fullInvoice: lockedLicense.fullInvoice
        }
    }
}

export async function requestUrbanLicenseUnlock(id, requestor) {
    if (!isUuid(id)) {
        throw new ValidationError('Request failed due to invalid ID.',
            'Urban unlock request',
            `Request failed due to ID ${id} is invalid.`
        );
    }

    const licenseLock = await urbanRepo.getLicenseApprovalStatus(id);

    if (!licenseLock) {
        throw new ResourceError('Request failed due to the record to approve does not exist.',
            'Urban unlock request',
            `Request failed due to record ${id} does not exist.`);
    }

    if (licenseLock.active) {
        return {
            msg: `The license ${licenseLock.fullInvoice} is already unlocked`,
            license: {
                id,
                fullInvoice: licenseLock.fullInvoice
            }
        }
    }

    const unlockedLicense = await urbanRepo.saveUrbanLicense(id, {
        lastModifiedBy: requestor,
        active: true,
        approvalStatus: false
    });

    return {
        msg: `The license ${unlockedLicense.fullInvoice} was unlocked`,
        license: {
            id,
            fullInvoice: unlockedLicense.fullInvoice
        }
    }
}

export async function requestUrbanLicenseDelete(id) {
    if (!isUuid(id)) {
        throw new ValidationError('Request failed due to invalid ID.',
            'Urban delete request',
            `Request failed due to ID ${id} is invalid.`
        );
    }

    const DELETED_LICENSE = await urbanRepo.deleteUrbanLicense(id);

    if (!DELETED_LICENSE) {
        throw new ResourceError('Request failed due to the record to update do not exist.',
            'Urban delete request',
            `Request failed due to record ${id} does not exist.`);
    }

    return {
        data: {
            msg: `User ${DELETED_LICENSE.fullInvoice} deleted successfully.`
        },
        license: DELETED_LICENSE
    }
}

export async function requestPDFDefinition(type, invoice, year) {
    if (isNaN(parseInt(type)) ||
        isNaN(parseInt(invoice)) ||
        isNaN(parseInt(year))) {
        throw new ValidationError('Request failed due to invalid search parameters provided.',
            'Urban PDF request by full invoice',
            `Search params /t/${type}/i/${invoice}/y/${year} are invalid.`);
    }

    let LICENSE = await urbanRepo.findUrbanLicenseInvoice(type, invoice, year);

    if (!LICENSE) {
        throw new ResourceError('The requested urban record does not exist',
            'Urban PDF request by full invoice',
            `Search params /t/${type}/i/${invoice}/y/${year} not found.`);
    }

    if (!LICENSE.active) {
        return {
            ID: LICENSE.public_urban_license_id,
            fullInvoice: LICENSE.fullInvoice,
            file: path.join(__dirstorage, 'assets', 'urban', LICENSE.fullInvoice, `${LICENSE.fullInvoice}.pdf`)
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
        ID: LICENSE.public_urban_license_id,
        fullInvoice: LICENSE.fullInvoice,
        definition: DEFINITION
    }
}

export async function requestInvoiceSet(body) {
    const { CUS, LUS, LSUB, LFUS, PLF, LF, RLF, CRPC, LUH } = body;

    if (isNaN(parseInt(CUS)) ||
        isNaN(parseInt(LUS)) ||
        isNaN(parseInt(LSUB)) ||
        isNaN(parseInt(LFUS)) ||
        isNaN(parseInt(PLF)) ||
        isNaN(parseInt(LF)) ||
        isNaN(parseInt(RLF)) ||
        isNaN(parseInt(CRPC)) ||
        isNaN(parseInt(LUH))) {
        throw new ValidationError('Request failed due to invalid invoice parameters provided.',
            'Urban set start invoices request',
            `Failed due to invalid parameters provided.
                Provided invoices -> ${JSON.stringify(body)}`
        );
    }

    if (!CUS && !LUS && !LSUB && !LFUS && !PLF && !LF && !RLF && !CRPC && !LUH) {
        throw new ValidationError('Unable to set invoices due to missing information.',
            'Urban set start invoices request',
            `Unable to set invoices due to missing information.
                Provided invoices -> ${JSON.stringify(body)}`
        );
    }

    if (await urbanValidate.existingLicenses()) {
        throw new ValidationError('Unable to set invoices due to there are invoices already registered.',
            ' set start invoices request',
            `Unable to set invoices due to already existing records.`
        );
    }

    for (const key in body) {
        if (urbanValidate.checkType(key)) {
            await urbanRepo.saveStartInvoice(body[key], key, new Date().getFullYear());
        }
    }

    return {
        invoices: `CUS: ${CUS}
        LUS: ${LUS}
        LSUB: ${LSUB}
        LFUS: ${LFUS}
        PLF: ${PLF}
        LF: ${LF}
        RLF: ${RLF}
        CRPC: ${CRPC}
        LUH: ${LUH}`
    }
}

export async function requestInvoiceCheck() {
    if (!await urbanValidate.existingLicenses()) {
        throw new ResourceError('No land use record registered.',
            'Urban invoice check request.',
            `No land use records registered`);
    }

    return {
        existing: true
    }
}