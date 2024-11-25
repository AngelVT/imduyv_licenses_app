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

function changeStep(btn, step, form, checkFields) {
    let formElement = document.getElementById(form);
    let regSteps = formElement.querySelectorAll('.reg-step');
    let thisStep = document.getElementById(`reg_step_${step}`);
    let buttons = btn.parentElement.querySelectorAll('li');

    if (checkFields) {
        let fields = formElement.querySelectorAll('[required]');

        for (const e of fields) {
            if (e.value.trim() === '') {

                regSteps.forEach(
                    e => e.classList.add('dis-none')
                );

                let stepContainer = e.closest('.reg-step');

                let stepButton = parseInt(stepContainer.getAttribute('data-step')) - 1

                stepContainer.classList.remove('dis-none');

                buttons.forEach(
                    e => e.classList.remove('selected'));

                buttons[stepButton].classList.add('selected');

                e.focus();

                return;
            }
        }

        const formData = Object.fromEntries(new FormData(formElement));

        for (const key in formData) {
            document.getElementById(`field_${key}`).innerText = formData[key];
        }
    }

    buttons.forEach(
        e => e.classList.remove('selected'));

    btn.classList.toggle('selected');

    regSteps.forEach(e => e.classList.add('dis-none'));
    thisStep.classList.remove('dis-none');
}