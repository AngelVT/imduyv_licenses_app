import { requestHandler } from '../utilities/request.utilities.js';
import * as consultService from '../services/consultant.service.js';
import * as logger from '../utilities/logger.utilities.js';

export const getConsultFullInvoice = requestHandler(
    async function (req, res) {
        const { type, invoice, year, isLegacy } = req.params;

        const response = await consultService.requestConsultLicense(type, invoice, year, isLegacy);
    
        res.status(200).json(response);
    
        logger.logRequestInfo('Land use consultan license request',
            `Requestor ID -> ${req.user.uuid}
        Requestor Name -> ${req.user.name}
        Requestor Username -> ${req.user.username}
        Requested records -> COnsultant request for license /${type}/${invoice}/${year} legacy: ${isLegacy}`);
    }
);