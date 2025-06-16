const resultContainer = document.querySelector('#results_container');

const formSearchBy = document.querySelector('#form_land_by');
const formSearchByInvoice = document.querySelector('#form_land_byInvoice');
const formSearchByPrintInvoice = document.querySelector('#form_byPrintInvoice');
const formSearchByType = document.querySelector('#form_land_byType');

formSearchBy.addEventListener('submit',
    event => {
        event.preventDefault();

        const formData = new FormData(formSearchBy);

        let data = Object.fromEntries(formData);

        getLicenseBy(data.by, data.value);
    }
);

formSearchByInvoice.addEventListener('submit',
    event => {
        event.preventDefault();

        const formData = new FormData(formSearchByInvoice);

        let data = Object.fromEntries(formData);

        getLicense(data.byInvoiceType, data.byInvoice, data.byInvoiceYear);
    }
);

formSearchByType.addEventListener('submit',
    event => {
        event.preventDefault();

        const formData = new FormData(formSearchByType);

        let data = Object.fromEntries(formData);

        getLicenseByType(data.byType, data.byTypeYear);
    }
);

formSearchByPrintInvoice.addEventListener('submit',
    event => {
        event.preventDefault();

        const formData = new FormData(formSearchByPrintInvoice);

        let data = Object.fromEntries(formData);

        getLicenseByPrintInvoice(data.byPrintInvoice);
    }
);

async function getLicense(type, invoice, year) {
    await fetch(`/api/landuse/t/${type}/i/${invoice}/y/${year}`, {
        method: 'GET',
        credentials: 'include'
    })
        .then(async res => {
            if (res.ok) {
                let content = res.headers.get('Content-Type');
                if (content.includes('text/html')) {
                    location.href = res.url;
                    return;
                }

                let response = await res.json();

                if (!response.license) {
                    alert('No hay resultados que coincida con la búsqueda');
                    return;
                }

                resultContainer.innerHTML = '';

                createLandResultNoUpdate(response.license, resultContainer);

                return;
            }

            if (!res.ok) {
                let response = await res.json();
                alert(response.msg);
                return;
            }
        })
        .catch(error => {
            alert('An error ocurred:\n' + error);
            console.error('Error getting data: ', error)
        });
}

async function getLicenseByType(type, year) {
    await fetch(`/api/landuse/t/${type}/y/${year}`, {
        method: 'GET',
        credentials: 'include'
    })
        .then(async res => {
            if (res.ok) {
                let content = res.headers.get('Content-Type');
                if (content.includes('text/html')) {
                    location.href = res.url;
                    return;
                }

                let response = await res.json();

                if (response.licenses.length == 0) {
                    alert('No hay resultados que coincida con la búsqueda');
                    return;
                }

                resultContainer.innerHTML = '';

                response.licenses.forEach(element => {
                    createLandResultNoUpdate(element, resultContainer);
                });

                return;
            }

            if (!res.ok) {
                let response = await res.json();
                alert(response.msg);
                return;
            }
        })
        .catch(error => {
            alert('An error ocurred:\n' + error);
            console.error('Error getting data: ', error)
        });
}

async function getLicenseBy(param, value) {
    await fetch(`/api/landuse/param/${param}/value/${value}`, {
        method: 'GET',
        credentials: 'include'
    })
        .then(async res => {
            if (res.ok) {
                let content = res.headers.get('Content-Type');
                if (content.includes('text/html')) {
                    location.href = res.url;
                    return;
                }

                let response = await res.json();

                if (response.licenses.length == 0) {
                    alert('No hay resultados que coincida con la búsqueda');
                    return;
                }

                resultContainer.innerHTML = '';

                response.licenses.forEach(element => {
                    createLandResultNoUpdate(element, resultContainer);
                });
                return;
            }

            if (!res.ok) {
                let response = await res.json();
                alert(response.msg);
                return;
            }
        })
        .catch(error => {
            alert('An error ocurred:\n' + error);
            console.error('Error getting data: ', error)
        });
}

async function getLicenseByPrintInvoice(printInvoice) {
    printInvoice = encodeURIComponent(printInvoice)
    await fetch(`/api/landuse/pi/${printInvoice}`, {
        method: 'GET',
        credentials: 'include'
    })
        .then(async res => {
            if (res.ok) {
                let content = res.headers.get('Content-Type');
                if (content.includes('text/html')) {
                    location.href = res.url;
                    return;
                }

                let response = await res.json();

                if (!response.license) {
                    alert('No hay resultados que coincida con la búsqueda');
                    return;
                }

                resultContainer.innerHTML = '';

                createLandResultNoUpdate(response.license, resultContainer);

                return;
            }

            if (!res.ok) {
                let response = await res.json();
                alert(response.msg);
                return;
            }
        })
        .catch(error => {
            alert('An error ocurred:\n' + error);
            console.error('Error getting data: ', error);
        });
}

async function getLicensesLand() {
    await fetch(`/api/landuse/`, {
        method: 'GET',
        credentials: 'include'
    })
        .then(async res => {
            if (res.ok) {
                let content = res.headers.get('Content-Type');
                if (content.includes('text/html')) {
                    location.href = res.url;
                    return;
                }

                let response = await res.json();

                if (response.licenses.length == 0) {
                    alert('No hay resultados que coincida con la búsqueda');
                    return;
                }

                resultContainer.innerHTML = '';

                response.licenses.forEach(element => {
                    createLandResultNoUpdate(element, resultContainer);
                });

                return;
            }

            if (!res.ok) {
                let response = await res.json();
                alert(response.msg);
                return;
            }
        })
        .catch(error => {
            alert('An error ocurred', error);
            console.error('Error getting data: ', error)
        });
}

/*async function updateResultField(form, id) {
    let registro = document.querySelector(`#result_invoice_${id}`).innerText;
    let field = form.querySelector('label').innerText.toLowerCase().replaceAll(':', '');
    let currentValue = form.querySelector('input[type="hidden"]').value;

    const formData = new FormData(form);

    let data = Object.fromEntries(formData);

    for (const key in data) {
        data = data[key];
    }

    let mensaje = `
    ¿Seguro que quieres modificar el ${field} para el registro ${registro}?\n
    El valor actual es: "${currentValue}"
    Cambiara a: "${data}"`

    if(currentValue == data) {
        alert("No se ha realizado ningún cambio");
        return;
    }

    if (!confirm(mensaje)) {
        return;
    }

    await fetch(`/api/landuse/${id}`, {
            method: 'PATCH',
            credentials: 'include',
            body: formData
        })
        .then(async res => {
            if(res.ok) {
                let content = res.headers.get('Content-Type');
                if (content.includes('text/html')) {
                    location.href = res.url;
                    return;
                }

                if (form.querySelector('.input-interface')) {
                    form.querySelector('input[type=hidden]').value = form.querySelector('.input-interface').value;
                }

                if (form.querySelector('.input-file')) {
                    let img = document.querySelector(`#result_fields_${id}`).querySelector('img');
                    img.setAttribute('src', `/landUseStorage/${form.querySelector('input[type=hidden]').value}/zone.png?${new Date().getTime()}`);
                }
                
                alert(`Cambios guardados exitosamente para el registro: ${registro}`);
                return;
            }

            if (!res.ok) {
                let response = await res.json();
                alert(response.msg);
                return;
            }
        })
        .catch(error => {
            console.error('Error updating data: ', error);
        });
}

async function updateResultFull(id) {
    console.log('updating everything');
    let fields = document.querySelector(`#result_fields_${id}`).children;

    for (let index = 0; index < fields.length; index++) {
        fields[index].querySelector('label').querySelector('button').click();
    }
}

async function deleteResult(id) {
    let registro = document.querySelector(`#result_invoice_${id}`).innerText;
    let mensaje = `
    ¿Seguro que quieres eliminar el registro ${registro}?\n
    El esta acción no se puede deshacer.`

    if (!confirm(mensaje)) {
        return;
    }

    await fetch(`/api/landuse/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        })
        .then(async res => {
            if(res.ok){
                let content = res.headers.get('Content-Type');
                if (content.includes('text/html')) {
                    location.href = res.url;
                    return;
                }
                
                document.querySelector(`#result_${id}`).remove();
                return;
            }

            if (!res.ok) {
                let response = await res.json();
                alert(response.msg);
                return;
            }
        })
        .catch(error => {
            console.error('Error uploading file: ', error);
        });
}*/

//-------------------------------------------------------------------
//* Land Result
function createLandResultNoUpdate(resObj, target) {
    resObj.id = resObj.public_land_license_id;
    let newResult = createResultNoUpdate(
        resObj.id,
        createResultTopNoUpdate(resObj, true));

    target.appendChild(newResult);
}

function createLandResult(resObj, target, isPrint, isLandUse) {
    resObj.id = resObj.public_land_license_id;
    let resultContent = generateLandFields(resObj, createResultContent(resObj.id, isPrint));

    let newResult = createResult(
        resObj.id,
        createResultTop(resObj, isPrint, isLandUse),
        resultContent);

    target.appendChild(newResult);
}

function generateLandFields(resObj, resultContent) {
    let field;
    let fieldGroup;
    let fieldGroupTittle;

    let resultNav = document.createElement('div');
    let navButtons = document.createElement('ul');
    let navButton;
    let navButtonTooltip;

    resultNav.setAttribute('class', 'w-100 step-controls result dis-flex flex-center margin-bottom-medium');
    resultNav.setAttribute('id', `result_${resObj.id}_nav`);
    navButtons.setAttribute('class', 'dis-flex flex-evenly w-100 txt-center txt-medium');

    // * Nav button
    navButton = document.createElement('li');
    navButton.setAttribute('class', 'tooltip selected bi-person btn');
    navButton.setAttribute('onclick', `resultNavigation(this, '${resObj.id}', 1, 6)`);
    navButtonTooltip = document.createElement('span');
    navButtonTooltip.setAttribute('class', 'tooltip-text');
    navButtonTooltip.innerText = 'Datos del solicitante';
    navButton.appendChild(navButtonTooltip);
    navButtons.appendChild(navButton);

    // * Nav button
    navButton = document.createElement('li');
    navButton.setAttribute('class', 'tooltip bi-building btn');
    navButton.setAttribute('onclick', `resultNavigation(this, '${resObj.id}', 2, 6)`);
    navButtonTooltip = document.createElement('span');
    navButtonTooltip.setAttribute('class', 'tooltip-text');
    navButtonTooltip.innerText = 'Datos del inmueble';
    navButton.appendChild(navButtonTooltip);
    navButtons.appendChild(navButton);

    // * Nav button
    navButton = document.createElement('li');
    navButton.setAttribute('class', 'tooltip bi-shield-check btn');
    navButton.setAttribute('onclick', `resultNavigation(this, '${resObj.id}', 3, 6)`);
    navButtonTooltip = document.createElement('span');
    navButtonTooltip.setAttribute('class', 'tooltip-text');
    navButtonTooltip.innerText = 'Zonificación y autorización';
    navButton.appendChild(navButtonTooltip);
    navButtons.appendChild(navButton);

    // * Nav button
    navButton = document.createElement('li');
    navButton.setAttribute('class', 'tooltip bi-calendar-week btn');
    navButton.setAttribute('onclick', `resultNavigation(this, '${resObj.id}', 4, 6)`);
    navButtonTooltip = document.createElement('span');
    navButtonTooltip.setAttribute('class', 'tooltip-text');
    navButtonTooltip.innerText = 'Vigencias y plazos';
    navButton.appendChild(navButtonTooltip);
    navButtons.appendChild(navButton);

    // * Nav button
    navButton = document.createElement('li');
    navButton.setAttribute('class', 'tooltip bi-cash-coin btn');
    navButton.setAttribute('onclick', `resultNavigation(this, '${resObj.id}', 5, 6)`);
    navButtonTooltip = document.createElement('span');
    navButtonTooltip.setAttribute('class', 'tooltip-text');
    navButtonTooltip.innerText = 'Información de pago';
    navButton.appendChild(navButtonTooltip);
    navButtons.appendChild(navButton);

    // * Nav button
    navButton = document.createElement('li');
    navButton.setAttribute('class', 'tooltip bi-plus-circle btn');
    navButton.setAttribute('onclick', `resultNavigation(this, '${resObj.id}', 6, 6)`);
    navButtonTooltip = document.createElement('span');
    navButtonTooltip.setAttribute('class', 'tooltip-text');
    navButtonTooltip.innerText = 'Datos de especiales';
    navButton.appendChild(navButtonTooltip);
    navButtons.appendChild(navButton);

    resultNav.appendChild(navButtons);

    resultContent.appendChild(resultNav);

    // * creating field group for requestor information
    fieldGroup = document.createElement('div');
    fieldGroup.setAttribute('class', 'w-100 dis-flex flex-wrap flex-evenly');
    fieldGroup.setAttribute('id', `result_${resObj.id}_group_1`);

    fieldGroupTittle = document.createElement('h3');
    fieldGroupTittle.setAttribute('class', 'w-100 txt-center txt-medium color-primary txt-bold border-only-bottom border-white txt-uppercase margin-bottom-medium');
    fieldGroupTittle.innerText = 'Información del solicitante';

    fieldGroup.appendChild(fieldGroupTittle);

    field = createResultField(resObj.id, 'Folio de impresión', 'licensePrintInvoice', resObj.licensePrintInvoice, 'text');

    fieldGroup.appendChild(field);

    field = createResultField(resObj.id, 'Nombre del solicitante', 'requestorName', resObj.requestorName, 'text');

    fieldGroup.appendChild(field);

    field = createResultField(resObj.id, 'En atención', 'attentionName', resObj.attentionName, 'text');

    fieldGroup.appendChild(field);

    field = createResultField(resObj.id, 'Teléfono de contacto', 'contactPhone', resObj.contactPhone, 'number');

    fieldGroup.appendChild(field);

    resultContent.appendChild(fieldGroup);

    // ! end of requestor field group

    // * creating field group for building information
    fieldGroup = document.createElement('div');
    fieldGroup.setAttribute('class', 'w-100 dis-flex flex-wrap flex-evenly dis-none');
    fieldGroup.setAttribute('id', `result_${resObj.id}_group_2`);

    fieldGroupTittle = document.createElement('h3');
    fieldGroupTittle.setAttribute('class', 'w-100 txt-center txt-medium color-primary txt-bold border-only-bottom border-white txt-uppercase  margin-bottom-medium');
    fieldGroupTittle.innerText = 'Información del inmueble';

    fieldGroup.appendChild(fieldGroupTittle);

    field = createResultField(resObj.id, 'Calle', 'address', resObj.address, 'text');

    fieldGroup.appendChild(field);

    field = createResultField(resObj.id, 'Numero', 'number', resObj.number, 'text');

    fieldGroup.appendChild(field);

    field = createResultField(resObj.id, 'Colonia', 'colony', resObj.colony, 'text');

    fieldGroup.appendChild(field);

    field = createResultField(resObj.id, 'Clave castastral', 'catastralKey', resObj.catastralKey, 'text');

    fieldGroup.appendChild(field);

    field = createResultField(resObj.id, 'Superficie de aprovechamiento', 'surface', resObj.surfaceTotal, 'text');

    fieldGroup.appendChild(field);

    resultContent.appendChild(fieldGroup);

    // ! end of building field group

    // * creating field group for zone and authorization information
    fieldGroup = document.createElement('div');
    fieldGroup.setAttribute('class', 'w-100 dis-flex flex-wrap flex-evenly dis-none');
    fieldGroup.setAttribute('id', `result_${resObj.id}_group_3`);

    fieldGroupTittle = document.createElement('h3');
    fieldGroupTittle.setAttribute('class', 'w-100 txt-center txt-medium color-primary txt-bold border-only-bottom border-white txt-uppercase margin-bottom-medium');
    fieldGroupTittle.innerText = 'Zonificación y autorización';

    fieldGroup.appendChild(fieldGroupTittle);

    let imgDiv = document.createElement('div');
    imgDiv.setAttribute('class', 'w-100 dis-flex flex-center');

    field = document.createElement('img');
    field.setAttribute('alt', 'Zonificación');
    field.setAttribute('src', `/landUseStorage/${resObj.fullInvoice}/zone.png`);
    field.setAttribute('class', 'w-40 margin-bottom-small');

    imgDiv.appendChild(field)

    fieldGroup.appendChild(imgDiv);

    field = createResultField(resObj.id, 'Georeferencia', 'georeference', resObj.geoReference, 'text');

    fieldGroup.appendChild(field);

    field = createResultField(resObj.id, 'Zona', 'zone', resObj.zone, 'select');

    field.querySelector('select').innerHTML = `
    <option value="">Seleccione zona ...</option>
    <option value="1">Densidad muy baja (Unifamiliar)</option>
    <option value="2">Densidad baja (Unifamiliar)</option>
    <option value="3">Densidad media baja (Unifamiliar)</option>
    <option value="4">Densidad media (Unifamiliar)</option>
    <option value="5">Densidad media alta (Unifamiliar)</option>
    <option value="6">Densidad alta (Unifamiliar)</option>
    <option value="7">Densidad alta (multifamiliar dúplex, tríplex y cuádruplex)</option>
    <option value="8">Densidad muy alta 1 (multifamiliar)</option>
    <option value="9">Densidad muy alta 2</option>
    <option value="10">Mixto</option>
    <option value="11">Corredor urbano mixto de baja densidad</option>
    <option value="12">Corredor urbano mixto de media densidad</option>
    <option value="13">Industria de bajo impacto</option>
    <option value="14">Industria de medio impacto</option>
    <option value="15">Industria de gran impacto</option>
    <option value="16">Equipamiento Urbano</option>
    <option value="17">Infraestructura urbana</option>
    <option value="18">Reserva territorial futura</option>
    <option value="19">Agricultura tecnificada</option>
    <option value="20">Agroindustria</option>
    <option value="21">Cuerpos de agua</option>
    <option value="22">Conservación y restauración ambiental</option>
    <option value="23">Parque Hídrico</option>
    `

    field.querySelector('select').value = resObj.licenseZone;

    fieldGroup.appendChild(field);

    field = createResultField(resObj.id, 'Giro impresión', 'businessLinePrint', resObj.businessLinePrint, 'text');

    fieldGroup.appendChild(field);

    field = createResultField(resObj.id, 'Giro interno', 'businessLineIntern', resObj.businessLineIntern, 'text');

    fieldGroup.appendChild(field);

    field = createResultField(resObj.id, 'COS', 'COS', resObj.licenseSpecialData.COS, 'text');

    fieldGroup.appendChild(field);

    field = createResultField(resObj.id, 'Altura Maxima', 'alt_max', resObj.licenseSpecialData.COS, 'text');

    fieldGroup.appendChild(field);

    field = createResultField(resObj.id, 'Niveles', 'niveles', resObj.licenseSpecialData.niveles, 'text');

    fieldGroup.appendChild(field);

    field = createResultField(resObj.id, 'Uso autorizado', 'authorizedUse', resObj.authorizedUse, 'select');

    field.querySelector('select').innerHTML = `
    <option value="">Selecciona ...</option>
    <option value="1">Unifamiliar, plurifamiliar o multifamiliar</option>
    <option value="2">Vivienda campestre o aislada</option>
    <option value="3">Comercio básico</option>
    <option value="4">Comercio especializado</option>
    <option value="5">Comercio de medio impacto</option>
    <option value="6">Comercio de impacto</option>
    <option value="7">Centros comerciales</option>
    <option value="8">Comercio de abasto</option>
    <option value="9">Comercio temporal</option>
    <option value="10">Servicios básicos</option>
    <option value="11">Servicios especializados</option>
    <option value="12">Servicios profesionales, técnicos y personales</option>
    <option value="13">Talleres de servicio, reparación y mantenimiento</option>
    <option value="14">Servicios colectivos</option>
    <option value="15">Servicios de publicidad exterior</option>
    <option value="16">Oficinas de pequeña escala</option>
    <option value="17">Oficinas en general</option>
    <option value="18">Centro recreativos y de espectáculos</option>
    <option value="19">Centros sociales</option>
    <option value="20">Centros deportivos y ecuestres</option>
    <option value="21">Turismo</option>
    <option value="22">Alojamiento</option>
    <option value="23">Salud</option>
    <option value="24">Educación</option>
    <option value="25">Cultura</option>
    <option value="26">Transporte</option>
    <option value="27">Áreas verdes y deportivas</option>
    <option value="28">Comunicaciones</option>
    <option value="29">Servicios urbanos</option>
    <option value="30">Religioso</option>
    <option value="31">Equipamiento Regional</option>
    <option value="32">Asistencia pública</option>
    <option value="33">Comercio y abasto</option>
    <option value="34">Equipamiento especial</option>
    <option value="35">Industria casera</option>
    <option value="36">Industria de bajo impacto</option>
    <option value="37">Industria de medio impacto</option>
    <option value="38">Industria textil</option>
    <option value="39">Industria a base de minerales no metálicos</option>
    <option value="40">Manufactura de sustancias químicas, productos derivados del petróleo y carbón</option>
    <option value="41">Industria no contaminante</option>
    <option value="42">Industria grande y/o pesada</option>
    <option value="43">Almacenamientos, bodegas y depósitos</option>
    <option value="44">Hidráulica</option>
    <option value="45">Sanitaria</option>
    <option value="46">Electricidad</option>
    <option value="47">Gas natural y gas LP</option>
    <option value="48">Estaciones de servicio</option>
    <option value="49">Telecomunicaciones</option>
    <option value="50">Vial</option>
    <option value="51">Aprovechamiento Agropecuario</option>
    <option value="52">Silvicultura</option>
    <option value="53">Minería y extracción</option>
    `;

    field.querySelector('select').value = resObj.authorizedUse;

    fieldGroup.appendChild(field);

    field = createResultField(resObj.id, 'Zonificación', 'zoneIMG', resObj.fullInvoice, 'file');

    fieldGroup.appendChild(field);

    field = createResultField(resObj.id, 'Inspector', 'inspector', resObj.inspector, 'text');

    fieldGroup.appendChild(field);

    resultContent.appendChild(fieldGroup);

    // ! end of zone field group

    // * creating field group for terms and validities information
    fieldGroup = document.createElement('div');
    fieldGroup.setAttribute('class', 'w-100 dis-flex flex-wrap flex-evenly dis-none');
    fieldGroup.setAttribute('id', `result_${resObj.id}_group_4`);

    fieldGroupTittle = document.createElement('h3');
    fieldGroupTittle.setAttribute('class', 'w-100 txt-center txt-medium color-primary txt-bold border-only-bottom border-white txt-uppercase margin-bottom-medium');
    fieldGroupTittle.innerText = 'Vigencias y plazos';

    fieldGroup.appendChild(fieldGroupTittle);

    field = createResultField(resObj.id, 'Tipo de expedición', 'expeditionType', resObj.licenseExpeditionType, 'select');

    field.querySelector('select').innerHTML = `
    <option value="">Selecciona ...</option>
    <option value="1">Nueva</option>
    <option value="2">Renovación</option>
    `;

    field.querySelector('select').value = resObj.licenseExpeditionType;

    fieldGroup.appendChild(field);

    field = createResultField(resObj.id, 'Plazo', 'term', resObj.licenseTerm, 'select');

    field.querySelector('select').innerHTML = `
    <option value="">Selecciona ...</option>
    <option value="1">Corto</option>
    <option value="2">Mediano</option>
    <option value="3">Largo</option>
    `;

    field.querySelector('select').value = resObj.licenseTerm;

    fieldGroup.appendChild(field);

    field = createResultField(resObj.id, 'Vigencia', 'validity', resObj.licenseValidity, 'select');

    field.querySelector('select').innerHTML = `
    <option value="">Selecciona ...</option>
    <option value="1">6 Meses</option>
    <option value="2">12 Meses</option>
    `;

    field.querySelector('select').value = resObj.licenseValidity;

    fieldGroup.appendChild(field);

    field = createResultField(resObj.id, 'Fecha de solicitud', 'requestDate', resObj.requestDate, 'date');

    fieldGroup.appendChild(field);

    field = createResultField(resObj.id, 'Fecha de expedición', 'expeditionDate', resObj.expeditionDate, 'date');

    fieldGroup.appendChild(field);

    field = createResultField(resObj.id, 'Fecha de vencimiento', 'expirationDate', resObj.expirationDate, 'date');

    fieldGroup.appendChild(field);

    resultContent.appendChild(fieldGroup);

    // ! end of terms and validities field group

    // * creating field group for payment information
    fieldGroup = document.createElement('div');
    fieldGroup.setAttribute('class', 'w-100 dis-flex flex-wrap flex-evenly dis-none');
    fieldGroup.setAttribute('id', `result_${resObj.id}_group_5`);

    fieldGroupTittle = document.createElement('h3');
    fieldGroupTittle.setAttribute('class', 'w-100 txt-center txt-medium color-primary txt-bold border-only-bottom border-white txt-uppercase margin-bottom-medium');
    fieldGroupTittle.innerText = 'Información de pago';

    fieldGroup.appendChild(fieldGroupTittle);

    field = createResultField(resObj.id, 'Folio de pago', 'paymentInvoice', resObj.paymentInvoice, 'text');

    fieldGroup.appendChild(field);

    field = createResultField(resObj.id, 'Costo', 'cost', resObj.cost, 'number');

    fieldGroup.appendChild(field);

    field = createResultField(resObj.id, 'Descuento', 'discount', resObj.discount, 'number');

    fieldGroup.appendChild(field);

    field = createResultField(resObj.id, 'Monto pagado', 'paymentDone', resObj.paymentDone, 'number');

    fieldGroup.appendChild(field);

    resultContent.appendChild(fieldGroup)

    // ! end of payment field group

    // * creating field group for extra information
    fieldGroup = document.createElement('div');
    fieldGroup.setAttribute('class', 'w-100 dis-flex flex-wrap flex-evenly dis-none');
    fieldGroup.setAttribute('id', `result_${resObj.id}_group_6`);

    fieldGroupTittle = document.createElement('h3');
    fieldGroupTittle.setAttribute('class', 'w-100 txt-center txt-medium color-primary txt-bold border-only-bottom border-white txt-uppercase margin-bottom-medium');
    fieldGroupTittle.innerText = 'Información especial';

    fieldGroup.appendChild(fieldGroupTittle);

    if (resObj.licenseType == 1) {
        field = createResultTextArea(resObj.id, 'Restricciones', 'restrictions', resObj.licenseSpecialData.restrictions.join('\n'));
        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Anexo', 'anexo', resObj.licenseSpecialData.anexo, 'text');

        fieldGroup.appendChild(field);
    }

    if (resObj.licenseType >= 2 && resObj.licenseType <= 5) {
        field = createResultTextArea(resObj.id, 'Restricciones', 'restrictions', resObj.licenseSpecialData.restrictions.join('\n'));
        fieldGroup.appendChild(field);

        field = createResultTextArea(resObj.id, 'Condicionantes', 'conditions', resObj.licenseSpecialData.conditions.join('\n'));
        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Anexo', 'anexo', resObj.licenseSpecialData.anexo, 'text');

        fieldGroup.appendChild(field);
    }

    if (resObj.licenseType == 6) {
        field = createResultTextArea(resObj.id, 'Restricciones', 'restrictions', resObj.licenseSpecialData.restrictions.join('\n'));
        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Anexo', 'anexo', resObj.licenseSpecialData.anexo, 'text');

        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Parcela', 'parcela', resObj.licenseSpecialData.parcela, 'text');

        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Numero de propiedad', 'propertyNo', resObj.licenseSpecialData.propertyNo, 'text');

        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Fecha de propiedad', 'propertyDate', resObj.licenseSpecialData.propertyDate, 'date');

        fieldGroup.appendChild(field);
    }

    resultContent.appendChild(fieldGroup);

    // ! end of extras field group

    return resultContent;
}