import { point, booleanPointInPolygon } from '@turf/turf';
import { ZONE_DATA } from "../private/js/appZonesData.js";

export function invertCoords(coords) {
    let point = coords.replaceAll('/', ',').replaceAll(' ', '').split(',');
    point.reverse();
    return point.map(c => parseFloat(c));
}

export function check(coord) {
    try {
        let pointCheck = point(coord);

        for (let element of ZONE_DATA.features) {
            let isInside = booleanPointInPolygon(pointCheck, element);
            if (isInside) {
                return {
                    "zone": element.properties.ZonSec2022,
                    "key": element.properties.Clave,
                    "term": element.properties.Plazo
                }
            }
        }
        return null
    } catch (error) {
        return null
    }
}

