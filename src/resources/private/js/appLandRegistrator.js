const thaForm = document.getElementById('form_reg');

thaForm.addEventListener(
    'submit', async event => {
        event.preventDefault();

        const formData = new FormData(thaForm);

        await fetch(`/api/landuse/`, {
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

                    const goToPrint = confirm(`
                    Licencia registrada: ${response.license.fullInvoice}
                    Folio: ${response.license.invoice}
                    Ir a pagina de impresión?`);
                    if (goToPrint) {
                        location.href = `/app/landPrint?type=${response.license.licenseType}&invoice=${response.license.invoice}&year=${response.license.year}`;
                    } else {
                        resetFormAuto(thaForm);
                    }
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

const validityInputs = document.querySelectorAll('input[name="validity"]');

const requestDate = document.getElementById('req_date');
const expeditionDate = document.getElementById('exp_date');
const expirationDate = document.getElementById('end_date');

resetFormAuto(thaForm);

requestDate.addEventListener('change', () => {
    expeditionDate.value =  setExpeditionDate(requestDate.value);
    setCustomExpirationDate();
});

validityInputs.forEach(e => {
    e.addEventListener('change', (event) => {
        expirationDate.value = setExpirationDate(event);
    });
});

expeditionDate.addEventListener('change', ()=> {
    setCustomExpirationDate();
});

function setExpeditionDate(reqDate) {
    let expDate = new Date(reqDate);
    expDate.setDate(expDate.getDate() +1);

    while(expDate.getDay() >= 5) {
        expDate.setDate(expDate.getDate() +1);
    }

    return expDate.toISOString().split('T')[0];
}

function setCustomExpirationDate() {
    let formData = Object.fromEntries(new FormData(thaForm));

    if(formData.validity){
        let endDate = new Date(expeditionDate.value);

        formData.validity == 1 ? 
        endDate.setMonth(endDate.getMonth() + 6) : 
        endDate.setMonth(endDate.getMonth() + 12);

        expirationDate.value = endDate.toISOString().split('T')[0];
    }
}

function setExpirationDate(event) {
    let expDate = expeditionDate.value

    if(!expDate || expDate == '') {
        expeditionDate.focus();
        return;
    }
    
    let endDate = new Date(expDate);
    
    if (event.target.value == 1) {
        endDate.setMonth(endDate.getMonth() + 6);
        return endDate.toISOString().split('T')[0];
    } else if (event.target.value == 2) {
        endDate.setMonth(endDate.getMonth() + 12)
        return endDate.toISOString().split('T')[0];
    }
}

const licenseTypes =[
    "Constancia",
    "Licencia Servicios",
    "Licencia Comercial",
    "Licencia Industria",
    "Licencia Habitacional",
    "Segregado",
    "Derecho de Preferencia"
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

const authUses = [
    "Unifamiliar, plurifamiliar o multifamiliar",
    "Vivienda campestre o aislada",
    "Comercio básico",
    "Comercio especializado",
    "Comercio de medio impacto",
    "Comercio de impacto",
    "Centros comerciales",
    "Comercio de abasto",
    "Comercio temporal",
    "Servicios básicos",
    "Servicios especializados",
    "Servicios profesionales, técnicos y personales",
    "Talleres de servicio, reparación y mantenimiento",
    "Servicios colectivos",
    "Servicios de publicidad exterior",
    "Oficinas de pequeña escala",
    "Oficinas en general",
    "Centro recreativos y de espectáculos",
    "Centros sociales",
    "Centros deportivos y ecuestres",
    "Turismo",
    "Alojamiento",
    "Salud",
    "Educación",
    "Cultura",
    "Transporte",
    "Áreas verdes y deportivas",
    "Comunicaciones",
    "Servicios urbanos",
    "Religioso",
    "Equipamiento Regional",
    "Asistencia pública",
    "Comercio y abasto",
    "Equipamiento especial",
    "Industria casera",
    "Industria de bajo impacto",
    "Industria de medio impacto",
    "Industria textil",
    "Industria a base de minerales no metálicos",
    "Manufactura de sustancias químicas, productos derivados del petróleo y carbón",
    "Industria no contaminante",
    "Industria grande y/o pesada",
    "Almacenamientos, bodegas y depósitos",
    "Hidráulica",
    "Sanitaria",
    "Electricidad",
    "Gas natural y gas LP",
    "Estaciones de servicio",
    "Telecomunicaciones",
    "Vial",
    "Aprovechamiento Agropecuario",
    "Silvicultura",
    "Minería y extracción",
    "Sanitaria"
];

const expTypes = [
    "Nueva",
    "Renovación"
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

        let formData = Object.fromEntries(new FormData(formElement));

        const focusMissing = (field) => {
            regSteps.forEach(
                steps => steps.classList.add('dis-none')
            );

            let stepContainer = field.closest('.reg-step');

            let stepButton = parseInt(stepContainer.getAttribute('data-step')) - 1

            stepContainer.classList.remove('dis-none');

            buttons.forEach(
                buttons => buttons.classList.remove('selected'));

            buttons[stepButton].classList.add('selected');

            field.focus();
        }

        for (const field of fields) {
            if (field.value.trim() === '') {
                focusMissing(field);
                return;
            }

            if (!formData.validity && field.getAttribute('name') == 'validity') {
                focusMissing(field);
                field.closest('div').classList.add('missing-field');
                return;
            } else {
                field.closest('div').classList.remove('missing-field');
            }

            if (!formData.expeditionType && field.getAttribute('name') == 'expeditionType') {
                focusMissing(field);
                field.closest('div').classList.add('missing-field');
                return;
            } else {
                field.closest('div').classList.remove('missing-field');
            }

            if (!formData.term && field.getAttribute('name') == 'term') {
                focusMissing(field);
                field.closest('div').classList.add('missing-field');
                return;
            } else {
                field.closest('div').classList.remove('missing-field');
            }
        }

        formData.licenseType = licenseTypes[formData.licenseType - 1];

        formData.zone = zones[formData.zone - 1];

        formData.authorizedUse = authUses[formData.authorizedUse - 1];

        formData.term = terms[formData.term - 1];

        formData.validity = validities[formData.validity -1];

        formData.expeditionType = expTypes[formData.expeditionType - 1];

        formData.zoneIMG = formData.zoneIMG.size <= 0 ? 'No cargada' : 'Cargada';

        formData.requestDate = dateFormatFull(formData.requestDate);

        formData.expeditionDate = dateFormatFull(formData.expeditionDate);

        formData.expirationDate = dateFormatFull(formData.expirationDate);
        
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

        changeStep(document.getElementById('reg_nav').firstChild , 1, form, true);
    }
}

function resetFormAuto(form){
    form.reset();

    changeStep(document.getElementById('reg_nav').firstChild , 1, form.getAttribute('id'), true);
}

const cost = document.getElementById('cost');
const discount = document.getElementById('discount');
const total = document.getElementById('total');

cost.addEventListener('input', () => {
    updateTotalCost();
});

discount.addEventListener('input', () => {
    updateTotalCost();
});

function updateTotalCost() {
    total.value = parseFloat(cost.value) - parseFloat(discount.value);
}