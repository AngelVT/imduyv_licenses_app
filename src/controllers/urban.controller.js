import { requestHandler } from '../utilities/request.utilities.js';
import * as logger from '../utilities/logger.utilities.js';
import { printerPDF } from "../utilities/pdf.utilities.js";
import * as urbanService from '../services/urban.service.js'

export const getLicenses = requestHandler(
    async function (req, res) {
        const response = await urbanService.requestAllUrbanLicenses();

        res.status(200).json(response);

        logger.logRequestInfo('Urban all record request completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Requested records -> All records requested`);
    }
);

export const getLicense = requestHandler(
    async function (req, res) {
        const ID = req.params.licenciaID;

        const response = await urbanService.requestUrbanLicenseById(ID);

        res.status(200).json(response);

        logger.logRequestInfo('Urban request by ID completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Requested record -> ${ID}:${response.license.fullInvoice} requested`);
    }
);

export const getLicenseByInvoice = requestHandler(
    async function (req, res) {
        const TYPE = req.params.type;
        const INVOICE = req.params.invoice;
        const YEAR = req.params.year;

        const response = await urbanService.requestUrbanLicenseByInvoice(TYPE, INVOICE, YEAR);

        res.status(200).json(response);

        logger.logRequestInfo('Urban request by full invoice completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Requested record -> ${response.license.public_urban_license_id}:${response.license.fullInvoice} requested`);
    }
);

export const getLicenseByType = requestHandler(
    async function (req, res) {
        const TYPE = req.params.type;
        const YEAR = req.params.year;

        const response = await urbanService.requestUrbanLicenseByType(TYPE, YEAR)

        res.status(200).json(response);

        logger.logRequestInfo('Urban request by type and year completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Requested records -> Type ${TYPE} from ${YEAR} requested`);
    }
);

export const getLicenseListByType = requestHandler(
    async function (req, res) {

        const TYPE = req.params.type;
        const YEAR = req.params.year;

        const response = await urbanService.requestUrbanLicenseListByType(TYPE, YEAR)

        res.status(200).json(response);

        logger.logRequestInfo('Urban list request by type and year completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Requested record list -> Type ${TYPE} from ${YEAR} requested`);
    }
);

export const getLicenseBy = requestHandler(
    async function (req, res) {
        const PARAMETER = req.params.getByParameter;
        const VALUE = req.params.value;

        const response = await urbanService.requestUrbanLicenseByParameter(PARAMETER, VALUE);

        res.status(200).json(response);

        logger.logRequestInfo('Urban request by parameter completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Requested records -> Records where ${PARAMETER} = ${VALUE}`);
    }
);

export const createLicense = requestHandler(
    async function (req, res) {
        const DATA = req.body;
        const FILES = req.files;
        const REQUESTOR = req.user.name;

        const response = await urbanService.requestUrbanLicenseCreate(DATA, FILES, REQUESTOR);

        res.status(200).json(response);

        logger.logRequestInfo('Urban create request completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Requested record creation -> ${response.license.public_urban_license_id}:${response.license.fullInvoice}
        Data -> ${JSON.stringify(DATA)}`);
    }
);

export const updateLicense = requestHandler(
    async function (req, res) {
        const ID = req.params.licenciaID;
        const DATA = req.body;
        const FILES = req.files;
        const REQUESTOR = req.name;

        const response = await urbanService.requestUrbanLicenseUpdate(ID, DATA, FILES, REQUESTOR);

        res.status(200).json(response);

        logger.logRequestInfo('Urban update request completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Requested record update -> ${response.license.public_urban_license_id}:${response.license.fullInvoice}
        Data -> ${JSON.stringify(DATA)}`);
    }
);

export const deleteLicense = requestHandler(
    async function (req, res) {
        const ID = req.params.licenciaID;

        const response = await urbanService.requestUrbanLicenseDelete(ID);

        res.status(200).json(response);

        logger.logRequestInfo('Urban delete request completed',
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

        const response = await urbanService.requestPDFDefinition(TYPE, INVOICE, YEAR);

        const pdfDoc = printerPDF.createPdfKitDocument(response.definition);

        res.setHeader('Content-Type', 'application/pdf');
        pdfDoc.info.Title = response.fullInvoice;
        pdfDoc.pipe(res);
        pdfDoc.end();

        logger.logRequestInfo('Urban PDF request completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Requested PDF record -> ${response.ID}:${response.fullInvoice}`);
    }
);

export const setLicenseStartInvoices = requestHandler(
    async function (req, res) {
        const DATA = req.body;

        const response = await urbanService.requestInvoiceSet(DATA);

        res.status(200).json(response);

        logger.logRequestInfo('Urban start invoices set request completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Set start invoices request -> Registered invoices
        ${response.invoices}`);
    }
);

export const checkInvoices = requestHandler(
    async function (req, res) {
        const response = await urbanService.requestInvoiceCheck();

        res.status(200).json(response);

        logger.logRequestInfo('Urban invoice check completed',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Urban invoice check request -> Urban records found`);
    }
);