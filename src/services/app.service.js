import { point, booleanPointInPolygon } from '@turf/turf';
import { ZONE_DATA } from "../private/js/appZonesData.js";
import { Zone } from "../models/License.models.js";

export async function requestCoordinateCheck(coordinates) {
    if (!coordinates) {
        console.log('No coordinates');
        return {
            status: 400,
            data: {
                msg: "No information provided for coordinate checkout"
            }
        }
    }

    const COORDINATES = invertCheckCoords(coordinates);

    if (!COORDINATES) {
        return {
            status: 400,
            data: {
                msg: "Invalid coordinate provided"
            }
        }
    }

    const POINT_CHECK = point(COORDINATES);

    let coordinateData;

    for (let element of ZONE_DATA.features) {
        let isInside = booleanPointInPolygon(POINT_CHECK, element);
        if (isInside) {
            coordinateData = element.properties;
        }
    }

    if (!coordinateData) {
        return {
            status: 404,
            data: {
                msg: "The location requested does not exist in the database"
            }
        }
    }

    const ZONE = await Zone.findOne({
        where: {
            licenseKey: coordinateData.Clave
        }
    });

    if (!ZONE) {
        return {
            status: 404,
            data: {
                msg: "The location seems to be out of scope"
            }
        }
    }

    return {
        status: 200,
        data: {
            msg: "Location found",
            georeference: COORDINATES.reverse(),
            data: {
                numericZone: ZONE.id,
                zone: ZONE.licenseZone,
                key: ZONE.licenseKey
            }
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