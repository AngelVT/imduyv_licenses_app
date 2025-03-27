const fieldKey = document.getElementById('field_key');
const fieldZone = document.getElementById('field_zone');
const fieldPCU = document.getElementById('pcu_field');
const fieldCOS = document.getElementById('COS');
const fieldALT = document.getElementById('alt_max');
const fieldNiveles = document.getElementById('niveles');
const fieldZonePlaceholder = document.getElementById('zone_placeholder')

const fieldSurfaceIn = document.getElementById('input_surface_in');
const fieldSurfaceOut = document.getElementById('input_surface_out');
const fieldMeasure = document.getElementById('input_measure');

const fieldGeoRef = document.querySelector('#f-geo_search');
const btnGeoSearch = document.querySelector('#b-geo_search');

const btnAddArea = document.getElementById('btn_add_area');
const btnAddLocalArea = document.getElementById('btn_add_local');
const btnClear = document.getElementById('btn_clear');

const toolMap = document.getElementById('map_tool');

const typeSelector = document.getElementById('license-type-selector');


fieldZone.addEventListener(
    'change', () => {
        setKey(fieldZone.value, fieldKey);
    }
);

try {
    btnAddArea.addEventListener(
        'click', () => {
            addSingleSurface(fieldSurfaceIn.value, fieldMeasure.value, fieldSurfaceOut);
        }
    );

    btnAddLocalArea.addEventListener(
        'click', () => {
            addLocalSurface(fieldSurfaceIn.value, fieldMeasure.value, fieldSurfaceOut)
        }
    );
    
    btnClear.addEventListener(
        'click', () => {
            resetSurfaceFields(fieldSurfaceIn,fieldMeasure,fieldSurfaceOut);
        }
    );
} catch (error) {
    console.log(error);
}

btnGeoSearch.addEventListener(
    'click', async () => {
        let targets = {
            numericZone: fieldZone,
            zone: fieldZonePlaceholder,
            key: fieldKey,
            COS: fieldCOS,
            alt_max: fieldALT,
            niveles: fieldNiveles,
            PCU: fieldPCU ? fieldPCU : undefined,
            tool: toolMap
        };
        await setData(targets, fieldGeoRef.value);
    }
);

if (typeSelector) {
    typeSelector.addEventListener(
        'change', () => {
            setFormFields(parseInt(typeSelector.value));
        }
    );
}