const fieldKey = document.getElementById('field_key');
const fieldZone = document.getElementById('field_zone');
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


fieldZone.addEventListener(
    'change', () => {
        setKey(fieldZone.value, fieldKey);
    }
);

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

btnGeoSearch.addEventListener(
    'click', async () => {
        let targets = {
            numericZone: fieldZone,
            zone: fieldZonePlaceholder,
            key: fieldKey,
            tool: toolMap
        };
        await setData(targets, fieldGeoRef.value);
    }
)