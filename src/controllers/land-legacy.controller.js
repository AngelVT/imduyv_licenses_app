import { requestHandler } from "../utilities/request.utilities.js";
import * as legacyService from "../services/land-legacy.service.js";

export const getLicense = requestHandler(
    async (req, res) => {
        const { legacyID } = req.params;

        const response = await legacyService.requestLegacyLicenseByUUID(legacyID);

        res.status(200).json(response);
    }
);

export const getLicenseByTypeYear = requestHandler(
    async (req, res) => {
        const { type, year } = req.params;

        const response = await legacyService.requestLegacyLicenseByTypeYear(type, year);

        res.status(200).json(response);
    }
);

export const getLicenseByCatastralKey = requestHandler(
    async (req, res) => {
        const { catastralKey } = req.params;

        const response = await legacyService.requestLegacyLicenseByCatastralKey(catastralKey);

        res.status(200).json(response);
    }
);

export const getLicenseByRequestorName = requestHandler(
    async (req, res) => {
        const { name } = req.params;

        const response = await legacyService.requestLegacyLicenseByRequestor(name);

        res.status(200).json(response);
    }
);

export const getLicenseByPeriod = requestHandler(
    async (req, res) => {
        const { startDate, endDate } = req.params;

        const response = await legacyService.requestLegacyLicenseByPeriod(startDate, endDate);

        res.status(200).json(response);
    }
);