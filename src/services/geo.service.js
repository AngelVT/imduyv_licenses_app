import { ZONE_DATA } from "../resources/data/appZonesData.js";
import { PCU_DATA } from "../resources/data/appPCUData.js";
import { Zone, Term } from "../models/License.models.js";
import * as geoRepo from '../repositories/geo.repository.js';
import ValidationError from '../errors/ValidationError.js';
import ResourceError from '../errors/ResourceError.js';

export async function requestCoordinateCheck(coordinates) {
    if (!coordinates) {
        throw new ValidationError('No coordinates were provided',
            'Point Info request failed due to no coordinate provided');
    }

    const COORDINATES = invertCheckCoords(coordinates);

    if (!COORDINATES) {
        throw new ValidationError('Invalid coordinates provided',
            'Point Info request failed due to invalid coordinates provided',
            `Provided coordinates -> ${coordinates}`);
    }

    //getting zone data
    const [resultsZone] = await geoRepo.findPointInfoZoneSec(COORDINATES);

    if (resultsZone.length === 0) {
        throw new ResourceError('The location requested does not exist in the database',
            'Point Info request failed due to coordinate out of zone sec',
            `Provided coordinates -> ${coordinates}`);
    }

    const [zoneData] = resultsZone;

    //getting PCU data
    const [resultsPCU] = await geoRepo.findPointInfoPCU(COORDINATES);

    const [pcuData] = resultsPCU;

    const TERM = await Term.findOne({
        where: {
            licenseTerm: zoneData.Plazo ? zoneData.Plazo.toLowerCase() : 'n/a'
        }
    });

    const ZONE = await Zone.findOne({
        where: {
            licenseKey: zoneData.Clave
        }
    });

    if (!ZONE) {
        throw new ResourceError('The location requested does not exist in the database',
            'Point Info request failed due to coordinate out of zone sec',
            `Provided coordinates -> ${coordinates}
            Coordinate info -> ${JSON.stringify(zoneData)}`);
    }

    return {
        msg: "Location found",
        georeference: COORDINATES.reverse(),
        data: {
            numericZone: ZONE.license_zone_id,
            zone: ZONE.licenseZone,
            key: ZONE.licenseKey,
            numericTerm: TERM.license_term_id,
            term: TERM.licenseTerm,
            COS: zoneData.COS,
            m2_neto: zoneData.m2_neto,
            alt_max: zoneData.alt_max,
            niveles: zoneData.niveles,
            PCU: pcuData ? pcuData.CALIF : 'U3'
        }
    }
}

function invertCheckCoords(coords) {
    const coordinatePattern = /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/;

    if (!coordinatePattern.test(coords))
        return undefined

    let point = coords.split(',');

    point.reverse();

    return point.map(coord => parseFloat(coord));
}