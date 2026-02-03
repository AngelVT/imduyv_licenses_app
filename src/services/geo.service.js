import { ZONE_SYMBOLS } from "../resources/data/appZoneSecSymbols.js";
import { FRAC_SYMBOLS } from "../resources/data/appFracDataSymbols.js";
import { Zone, Term } from "../models/License.models.js";
import * as geoRepo from '../repositories/geo.repository.js';
import ValidationError from '../errors/ValidationError.js';
import ResourceError from '../errors/ResourceError.js';

export async function requestCoordinateCheck(coordinates, {
    considerFrac = false,
    trowError = false
} = {}) {
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

    let warning;
    let fracData;

    if (considerFrac) {
        const [resultsFrac] = await geoRepo.findPointInFrac(COORDINATES);
        fracData = resultsFrac[0];
        if (resultsFrac.length === 0) {
            if (trowError) {
                throw new ResourceError('El punto dado no se encuentra dentro de un polígono de fraccionamiento valido',
            'Point Info request failed due to coordinate out of frac',
            `Provided coordinates -> ${coordinates}`);
            }

            warning = 'El punto dado no se encuentra dentro de un polígono de fraccionamiento valido';
        }
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
        warning,
        georeference: COORDINATES.reverse(),
        data: {
            numericZone: ZONE.license_zone_id,
            zone: ZONE.licenseZone,
            key: ZONE.licenseKey,
            numericTerm: TERM ? TERM.license_term_id : 4,
            term: TERM ? TERM.licenseTerm : 'n/a',
            COS: zoneData.COS,
            m2_neto: zoneData.m2_neto,
            alt_max: zoneData.alt_max,
            niveles: zoneData.niveles,
            PCU: pcuData ? pcuData.CALIF : 'U3',
            settlement: fracData ? {
                name: fracData.NOMBRE_DEL,
                status: fracData.ESTATUS
            } : undefined
        }
    }
}

export async function requestZoneSecLayer() {
    const geojson = await geoRepo.findLayerZoneSec();

    return {
        layer: {
            geojson,
            layer_symbols: ZONE_SYMBOLS
        }
    }
}

export async function requestFracLayer() {
    const geojson = await geoRepo.findFracLayer();

    return {
        layer: {
            geojson,
            layer_symbols: FRAC_SYMBOLS
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