import { requestHandler } from '../utilities/request.utilities.js';
import * as logger from '../utilities/logger.utilities.js';
import { printerPDF } from "../utilities/pdf.utilities.js";
import * as landService from '../services/landuse.service.js';

export const getLicenses = requestHandler(
    async function (req, res) {

        const response = await landService.requestAllLandLicenses();

        res.status(200).json(response);

        logger.logRequestInfo('Land use all record request completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Requested records -> All records requested`);
    }
);

export const getLicense = requestHandler(
    async function (req, res) {
        const ID = req.params.licenciaID;

        const response = await landService.requestLandLicenseById(ID);

        res.status(200).json(response.data);

        logger.logRequestInfo('Land use request by ID completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Requested record -> ${ID}:${response.license.fullInvoice}`);
    }
);

export const getLicenseByInvoice = requestHandler(
    async function (req, res) {
        const TYPE = req.params.type;
        const INVOICE = req.params.invoice;
        const YEAR = req.params.year;

        const response = await landService.requestLandLicenseByInvoice(TYPE, INVOICE, YEAR);

        res.status(200).json(response);

        logger.logRequestInfo('Land use request by full invoice completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Requested record -> ${response.license.public_land_license_id}:${response.license.fullInvoice}`);
    }
);

export const getLicenseByType = requestHandler(
    async function (req, res) {
        const TYPE = req.params.type;
        const YEAR = req.params.year;

        const response = await landService.requestLandLicenseByType(TYPE, YEAR)

        res.status(200).json(response);

        logger.logRequestInfo('Land use request by type and year completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Requested records -> Type ${TYPE} from ${YEAR}`);
    }
)

export const getLicenseBy = requestHandler(
    async function (req, res) {
        const PARAMETER = req.params.getByParameter;
        const VALUE = req.params.value;

        console.log(PARAMETER, VALUE)

        const response = await landService.requestLandLicenseByParameter(PARAMETER, VALUE);

        res.status(200).json(response);

        logger.logRequestInfo('Land use request by parameter completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Requested records -> Records where ${PARAMETER} = ${VALUE}`);
    }
);

export const getLicenseByPrintInvoice = requestHandler(
    async function (req, res) {
        const PRINT_INVOICE = decodeURIComponent(req.params.printInvoice);

        const response = await landService.requestLandLicenseByPrintInvoice(PRINT_INVOICE);

        res.status(200).json(response);

        logger.logRequestInfo('Land use request by print invoice completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Requested record -> ${response.license.public_land_license_id}:${response.license.fullInvoice}`);
    }
);

export const getLicensesUnapproved = requestHandler(
    async function (req, res) {

        const response = await landService.requestUnapprovedLandLicenses();

        res.status(200).json(response);

        logger.logRequestInfo('Land use all record request completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Requested records -> All records requested`);
    }
);

export const createLicense = requestHandler(
    async function (req, res) {
        const DATA = req.body;
        const FILES = req.files;
        const REQUESTOR = req.user.name;

        const response = await landService.requestLandLicenseCreate(DATA, FILES, REQUESTOR);

        res.status(201).json(response);

        logger.logRequestInfo('Land use create request completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Requested record creation -> ${response.license.public_land_license_id}:${response.license.fullInvoice}
        Data -> ${JSON.stringify(DATA)}`);
    }
);

export const updateLicense = requestHandler(
    async function (req, res) {
        const ID = req.params.licenciaID;
        const DATA = req.body;
        const FILES = req.files;
        const REQUESTOR = req.user.name;

        const response = await landService.requestLandLicenseUpdate(ID, DATA, FILES, REQUESTOR);

        res.status(200).json(response);

        logger.logRequestInfo('Land use update request completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Requested record update -> ${response.license.public_land_license_id}:${response.license.fullInvoice}
        Data -> ${JSON.stringify(DATA)}`);
    }
);

export const approveLicense = requestHandler(
    async function (req, res) {
        const ID = req.params.licenciaID;
        const REQUESTOR = req.user.name;

        const response = await landService.requestLandLicenseApprove(ID, REQUESTOR);

        res.status(200).json(response.msg);

        logger.logRequestInfo('Land use license approval request completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Requested record approval -> ${response.license.id}:${response.license.fullInvoice}`);
    }
);

export const lockLicense = requestHandler(
    async function (req, res) {
        const ID = req.params.licenciaID;
        const REQUESTOR = req.user.name;

        const response = await landService.requestLandLicenseLock(ID, REQUESTOR);

        res.status(200).json(response.msg);

        logger.logRequestInfo('Land use license lock request completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Requested record lock -> ${response.license.public_land_license_id}:${response.license.fullInvoice}`);
    }
);

export const unlockLicense = requestHandler(
    async function (req, res) {
        const ID = req.params.licenciaID;
        const REQUESTOR = req.user.name;

        const response = await landService.requestLandLicenseUnlock(ID, REQUESTOR);

        res.status(200).json(response);

        logger.logRequestInfo('Land use license unlock request completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Requested record unlock -> ${response.license.public_land_license_id}:${response.license.fullInvoice}`);
    }
);

export const deleteLicense = requestHandler(
    async function (req, res) {
        const ID = req.params.licenciaID;

        const response = await landService.requestLandLicenseDelete(ID);

        res.status(200).json(response.data);

        logger.logRequestInfo('Land use delete request completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Requested record deletion -> ${ID}:${response.license.fullInvoice}`);
    }
);

export const getLicensePDF = requestHandler(
    async function (req, res) {
        const TYPE = parseInt(req.params.type);
        const INVOICE = parseInt(req.params.invoice);
        const YEAR = parseInt(req.params.year);

        const response = await landService.requestPDFDefinition(TYPE, INVOICE, YEAR);

        if (response.file) {
            res.sendFile(response.file);
        } else {
            const pdfDoc = printerPDF.createPdfKitDocument(response.definition);

            res.setHeader('Content-Type', 'application/pdf');
            pdfDoc.info.Title = response.fullInvoice;
            pdfDoc.pipe(res);
            pdfDoc.end();
        }

        logger.logRequestInfo('Land use PDF request completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Requested PDF record -> ${response.ID}:${response.fullInvoice}`);
    }
);

export const setLicenseStartInvoices = requestHandler(
    async function (req, res) {
        const BODY = req.body;

        const response = await landService.requestInvoiceSet(BODY);

        res.status(200).json(response);

        logger.logRequestInfo('Land use start invoices set request completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Set start invoices request -> Registered invoices
        ${response.invoices}`);
    }
);

export const checkInvoices = requestHandler(
    async function (req, res) {
        const response = await landService.requestInvoiceCheck();

        res.status(200).json(response);

        logger.logRequestInfo('Land use invoice check completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Land use invoice check request -> Land use records found`);
    }
);