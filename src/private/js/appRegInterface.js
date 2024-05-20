const fieldKey = document.getElementById('field_key');
const fieldZone = document.getElementById('field_zone');

const fieldSurfaceIn = document.getElementById('input_surface_in');
const fieldSurfaceOut = document.getElementById('input_surface_out');
const fieldMeasure = document.getElementById('input_measure');



const btnAddArea = document.getElementById('btn_add_area');
const btnAddLocalArea = document.getElementById('btn_add_local');
const btnClear = document.getElementById('btn_clear');


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