import * as geoService from '../services/geo.service.js';
import { requestHandler } from '../utilities/request.utilities.js';
import ValidationError from '../errors/ValidationError.js';

const FRAC_TYPES = [5,6,7,8];

export const getPointInfo = requestHandler(
    async function (req, res) {
        const coordinates = req.params.coordinates;
        const { type } = req.query;

        let considerFrac = false;

        if (type) {
            if (isNaN(parseInt(type))) {
                throw new ValidationError('Tipo de licencia invalido',
            'Point Info request failed due to invalid license type provided');
            }

            const licenseType = parseInt(type);

            considerFrac = FRAC_TYPES.includes(licenseType)
        }

        const response = await geoService.requestCoordinateCheck(coordinates, {
            considerFrac,
            trowError: true
        });

        res.status(200).json(response);
    }
);

export const getZoneSecLayer = requestHandler(
    async function (req, res) {
        const response = await geoService.requestZoneSecLayer();

        res.status(200).json(response);
    }
);

export const getFracLayer = requestHandler(
    async function (req, res) {
        const response = await geoService.requestFracLayer();

        res.status(200).json(response);
    }
);