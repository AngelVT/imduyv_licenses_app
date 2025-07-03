import { pool } from "../configuration/database.configuration.js";

export async function createZoneDataTable(features) {
    const check = await pool.query(`
        SELECT EXISTS (
            SELECT 1 FROM information_schema.tables 
            WHERE table_schema = 'geographic' 
            AND table_name = 'zone_sec'
        ) AS exists;`);

    const [status] = check;

    const exists = status[0].exists;

    if (exists) {
        return;
    }

    const table = await pool.query(`CREATE TABLE geographic.zone_sec (id SERIAL PRIMARY KEY, "ZonSec2022" TEXT, "Clave" TEXT, "Plazo" TEXT, "hab_ha" INTEGER, "viv_ha" TEXT, "m2_bruto" INTEGER, "m2_neto" INTEGER, "COS" INTEGER, "alt_max" INTEGER, "niveles" INTEGER, "Superf" TEXT, geom GEOMETRY);`);

    for (const feature of features) {
        const properties = feature.properties;
        const geometry = JSON.stringify(feature.geometry);

        let values = Object.values(properties).map(value => `'${typeof value === 'string' ? value.replaceAll("'", "`") : value
            }'`).join(', ');

        await pool.query(`INSERT INTO geographic.zone_sec ("ZonSec2022", "Clave", "Plazo", "hab_ha", "viv_ha", "m2_bruto", "m2_neto", "COS", "alt_max", "niveles", "Superf", geom) VALUES (${values}, ST_GeomFromGeoJSON(:geom));`,
            {
                replacements: { geom: geometry }
            });
    }

    return true
}

export async function findPointInfoZoneSec(point) {
    return await pool.query(`SELECT * FROM geographic.zone_sec WHERE ST_Contains(geom, ST_SetSRID(ST_Point( :point ), 4326));`,
    {
        replacements: { point: point }
    });
}
export async function findPointInfoPCU(point) {
    return await pool.query(`SELECT * FROM geographic.pcu WHERE ST_Contains(geom, ST_SetSRID(ST_Point( :point ), 4326));`,
    {
        replacements: { point: point }
    });
}

export async function createPCUDataTable(features) {
    const check = await pool.query(`
        SELECT EXISTS (
            SELECT 1 FROM information_schema.tables 
            WHERE table_schema = 'geographic' 
            AND table_name = 'pcu'
        ) AS exists;`);

    const [status] = check;

    const exists = status[0].exists;

    if (exists) {
        return;
    }

    const table = await pool.query(`CREATE TABLE geographic.PCU (id SERIAL PRIMARY KEY, "ACTUALIZAC" DATE, "CALIF" TEXT, "CALIF_CLAS" TEXT, "ID_RUV_1" INTEGER, "LAYER" TEXT, "VERSION1" INTEGER, geom GEOMETRY);`);

    for (const feature of features) {
        const properties = feature.properties;
        const geometry = JSON.stringify(feature.geometry);

        let values = Object.values(properties).map(value => `'${typeof value === 'string' ? value.replaceAll("'", "`") : value
            }'`).join(', ');

        await pool.query(`INSERT INTO geographic.pcu ("ACTUALIZAC", "CALIF", "CALIF_CLAS", "ID_RUV_1", "LAYER", "VERSION1", geom) VALUES (${values}, ST_GeomFromGeoJSON(:geom));`,
            {
                replacements: { geom: geometry }
            });
    }

    return true
}