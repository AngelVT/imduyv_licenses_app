const thaForm = document.getElementById('form_reg');

thaForm.addEventListener(
    'submit', async event => {
        event.preventDefault();

        const formData = new FormData(thaForm);

        await fetch(`/api/urban/`, {
            method: 'POST',
            credentials: 'include',
            body: formData
        })
            .then(async res => {
                if (res.ok) {
                    let content = res.headers.get('Content-Type');
                    if (content.includes('text/html')) {
                        location.href = res.url;
                        return;
                    }
                    
                    let response = await res.json();

                    alert(`
                    Licencia registrada: ${response.license.fullInvoice}
                    Folio: ${response.license.invoice}`);
                    resetFormAuto(thaForm);
                    return;
                }
                let response = await res.json();
                alert(`Registro no exitoso\n${response.msg}`);
                return;
            })
            .catch(error => {
                console.error('Error uploading file: ', error)
            });
    }
);

const licenseTypes = [
    "Constancia de uso de suelo",
    "Licencia de uso de suelo",
    "Licencia de subdivisión",
    "Licencia de Fusion",
    "Prórroga de licencia de fraccionamiento",
    "Licencia de fraccionamiento",
    "Relotificación de fraccionamiento",
    "Régimen de propiedad en condominio"
];

const zones = [
    "Densidad muy baja (Unifamiliar)",
    "Densidad baja (Unifamiliar)",
    "Densidad media baja (Unifamiliar)",
    "Densidad media (Unifamiliar)",
    "Densidad media alta (Unifamiliar)",
    "Densidad alta (Unifamiliar)",
    "Densidad alta (multifamiliar dúplex, tríplex y cuádruplex)",
    "Densidad muy alta 1 (multifamiliar)",
    "Densidad muy alta 2",
    "Mixto",
    "Corredor urbano mixto de baja densidad",
    "Corredor urbano mixto de media densidad",
    "Industria de bajo impacto",
    "Industria de medio impacto",
    "Industria de gran impacto",
    "Equipamiento Urbano",
    "Infraestructura urbana",
    "Reserva territorial futura",
    "Agricultura tecnificada",
    "Agroindustria",
    "Cuerpos de agua",
    "Conservación y restauración ambiental",
    "Parque Hídrico"
];

const terms = [
    "Corto",
    "Mediano",
    "Largo"
];

const validities = [
    "6 Meses",
    "12 Meses"
];

function changeStep(btn, step, form, checkFields) {
    let formElement = document.getElementById(form);
    let regSteps = formElement.querySelectorAll('.reg-step');
    let thisStep = document.getElementById(`reg_step_${step}`);
    let buttons = btn.parentElement.querySelectorAll('li');

    if (checkFields) {
        let fields = formElement.querySelectorAll('[required]');

        for (const field of fields) {
            if (field.value.trim() === '') {

                regSteps.forEach(
                    step => step.classList.add('dis-none')
                );

                let stepContainer = field.closest('.reg-step');

                let stepButton = parseInt(stepContainer.getAttribute('data-step')) - 1

                stepContainer.classList.remove('dis-none');

                buttons.forEach(
                    button => button.classList.remove('selected'));

                buttons[stepButton].classList.add('selected');

                field.focus();

                return;
            }
        }

        let formData = Object.fromEntries(new FormData(formElement));

        formData.licenseType = licenseTypes[formData.licenseType - 1];

        formData.zone = zones[formData.zone - 1] ? zones[formData.zone - 1] : '';

        formData.term = terms[formData.term - 1] ? terms[formData.term - 1] : '';

        formData.validity = validities[formData.validity -1] ? validities[formData.validity -1] : '';

        formData.zoneIMG = formData.zoneIMG.size <= 0 ? 'No cargada' : 'Cargada';

        formData.resumeTables = formData.resumeTables.size <= 0 ? 'No cargadas' : 'Cargadas';

        formData.requestDate = formData.requestDate ? dateFormatFull(formData.requestDate) : '';

        formData.expeditionDate = formData.expeditionDate ? dateFormatFull(formData.expeditionDate) : '';

        formData.deliveryDate = formData.deliveryDate ? dateFormatFull(formData.deliveryDate) : '';
        
        for (const key in formData) {
            document.getElementById(`check_${key}`).innerText = formData[key];
        }
    }

    buttons.forEach(
        button => button.classList.remove('selected'));

    btn.classList.toggle('selected');

    regSteps.forEach(e => e.classList.add('dis-none'));
    thisStep.classList.remove('dis-none');
}

function resetForm(form) {
    if(confirm('Seguro que quieres reiniciar el formulario?')) {
        document.getElementById(form).reset();

        changeStep(document.getElementById('reg_nav').firstChild, 1, form, true);
    }
}

function resetFormAuto(form){
    form.reset();

    changeStep(document.getElementById('reg_nav').firstChild, 1, form.getAttribute('id'), true);
}
