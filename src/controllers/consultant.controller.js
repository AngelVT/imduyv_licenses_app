import { requestHandler } from '../utilities/request.utilities.js';
import * as consultService from '../services/consultant.service.js';
import * as logger from '../utilities/logger.utilities.js';

export const getConsultFullInvoice = requestHandler(
    async function (req, res) {
        const { type, invoice, year } = req.params;

        const response = await consultService.requestConsultLicense(type, invoice, year);
    
        res.status(200).json(response);
    
        logger.logRequestInfo('Land use consultan license request',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Requested records -> Consultant request for license /${type}/${invoice}/${year}`);
    }
);

export const getConsultFiltered = requestHandler(
    async function (req, res) {
        const searchParams = req.query;

        const response = await consultService.requestConsultLicenseFiltered(searchParams);
    
        res.status(200).json(response);
    
        logger.logRequestInfo('Land use consultan license request',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Requested records -> Consultant request for filter ${searchParams}`);
    }
);