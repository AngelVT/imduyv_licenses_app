import * as geoService from '../services/geo.service.js';
import { requestHandler } from '../utilities/request.utilities.js';

export const getPointInfo = requestHandler(
    async function (req, res) {
        const coordinates = req.params.coordinates;

        const response = await geoService.requestCoordinateCheck(coordinates);

        res.status(200).json(response);
    }
);

export const getZoneSecLayer = requestHandler(
    async function (req, res) {
        const response = await geoService.requestZoneSecLayer();

        res.status(200).json(response);
    }
);