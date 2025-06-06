const resultContainer = document.querySelector('#results_container');

const formSearchBy = document.querySelector('#form_urban_by');
const formSearchByInvoice = document.querySelector('#form_urban_byInvoice');
const formSearchByType = document.querySelector('#form_urban_byType');

if (formSearchBy) {
    formSearchBy.addEventListener('submit',
        event => {
            event.preventDefault();
    
            const formData = new FormData(formSearchBy);
    
            let data = Object.fromEntries(formData);
    
            getLicenseBy(data.by, data.value);
        }
    );
}

if (formSearchByInvoice) {
    formSearchByInvoice.addEventListener('submit',
        event => {
            event.preventDefault();
    
            const formData = new FormData(formSearchByInvoice);
    
            let data = Object.fromEntries(formData);
    
            getLicense(data.byInvoiceType, data.byInvoice, data.byInvoiceYear);
        }
    );
}

if (formSearchByType) {
    formSearchByType.addEventListener('submit',
        event => {
            event.preventDefault();
    
            const formData = new FormData(formSearchByType);
    
            let data = Object.fromEntries(formData);
    
            getLicenseByType(data.byType, data.byTypeYear);
        }
    );
}

async function getLicense(type, invoice, year) {
    await fetch(`/api/urban/t/${type}/i/${invoice}/y/${year}`, {
            method: 'GET',
            credentials: 'include'
        })
        .then(async res => {
            if(res.ok){
                let content = res.headers.get('Content-Type');
                if (content.includes('text/html')) {
                    location.href = res.url;
                    return;
                }

                let response = await res.json();

                resultContainer.innerHTML = '';

                createUrbanResultNoUpdate(response.license, resultContainer);

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
    await fetch(`/api/urban/t/${type}/y/${year}`, {
            method: 'GET',
            credentials: 'include'
        })
        .then(async res => {
            if(res.ok){
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
                    console.log(element.specialData);
                    createUrbanResultNoUpdate(element, resultContainer);
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
    await fetch(`/api/urban/param/${param}/value/${value}`, {
            method: 'GET',
            credentials: 'include'
        })
        .then(async res => {
            if(res.ok) {
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
                    createUrbanResultNoUpdate(element, resultContainer);
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

async function getLicensesUrban() {
    await fetch(`/api/urban/`, {
            method: 'GET',
            credentials: 'include'
        })
        .then(async res => {
            if(res.ok){
                let content = res.headers.get('Content-Type');
                if (content.includes('text/html')) {
                    location.href = res.url;
                    return;
                }

                let response = await res.json();

                if (response.licenses.length == 0) {
                    alert('No hay resultados para mostrar');
                    return;
                }

                resultContainer.innerHTML = '';

                response.licenses.forEach(element => {
                    createUrbanResultNoUpdate(element, resultContainer);
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

/*async function deleteResult(id) {
    let registro = document.querySelector(`#result_invoice_${id}`).innerText;
    let mensaje = `
    ¿Seguro que quieres eliminar el registro ${registro}?\n
    El esta acción no se puede deshacer.`

    if (!confirm(mensaje)) {
        return;
    }

    await fetch(`/api/urban/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        })
        .then(res => {
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
                let response = res.json();
                alert(response.msg);
                return;
            }
        })
        .catch(error => {
            alert('An error ocurred:\n' + error);
            console.error('Error deleting registry: ', error)
        });
}*/

//-------------------------------------------------------------------
//* Urban Result
function createUrbanResultNoUpdate(resObj, target) {
    resObj.id = resObj.public_urban_license_id;
    let newResult = createResultNoUpdate(
        resObj.id,
        createResultTopNoUpdate(resObj, false));

    target.appendChild(newResult);
}

function createUrbanResult(resObj, target, isPrint, isLandUse) {
    resObj.id = resObj.public_urban_license_id;
    let resultContent = generateUrbanFields(resObj, createResultContent(resObj.id, isPrint));

    let newResult = createResult(
        resObj.id,
        createResultTop(resObj, isPrint, isLandUse), 
        resultContent);

    target.appendChild(newResult);
}

function generateUrbanFields(resObj, resultContent) {
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
    navButton.setAttribute('class', `tooltip bi-plus-circle btn ${resObj.licenseType == 1 || resObj.licenseType == 2 || resObj.licenseType == 9 ? 'dis-none' : ''}`);
    navButton.setAttribute('onclick', `resultNavigation(this, '${resObj.id}', 6, 6)`);
    navButtonTooltip = document.createElement('span');
    navButtonTooltip.setAttribute('class', 'tooltip-text');
    navButtonTooltip.innerText = 'Datos de formato';
    navButton.appendChild(navButtonTooltip);
    navButtons.appendChild(navButton);

    resultNav.appendChild(navButtons);

    resultContent.appendChild(resultNav);


    //requestor section start
    fieldGroup = document.createElement('div');
    fieldGroup.setAttribute('class', 'w-100 dis-flex flex-wrap flex-evenly');
    fieldGroup.setAttribute('id', `result_${resObj.id}_group_1`);

    fieldGroupTittle = document.createElement('h3');
    fieldGroupTittle.setAttribute('class', 'w-100 txt-center txt-medium color-primary txt-bold border-only-bottom border-white txt-uppercase margin-bottom-medium');
    fieldGroupTittle.innerText = 'Información del solicitante';

    fieldGroup.appendChild(fieldGroupTittle);

    if (resObj.licenseType == 2 ) {
        field = createResultField(resObj.id, "Es LUS de fraccionamiento", "isFrac", resObj.licenseSpecialData.isFrac, 'checkbox');

        fieldGroup.appendChild(field);
    }

    field = createResultField(resObj.id, 'Nombre del solicitante', 'requestorName', resObj.requestorName, 'text');

    fieldGroup.appendChild(field);

    if (resObj.licenseType > 1 && resObj.licenseType <= 8) {
        field = createResultField(resObj.id, 'Domicilio del solicitante', 'requestorAddress', resObj.licenseSpecialData.requestorAddress, 'text');
        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Representante', 'legalRepresentative', resObj.legalRepresentative, 'text');

        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Carácter del representante', 'representativeAs', resObj.licenseSpecialData.representativeAs, 'text');

        fieldGroup.appendChild(field);
    }

    resultContent.appendChild(fieldGroup);
    //requestor section end

    //building section start-------------------------------------------
    fieldGroup = document.createElement('div');
    fieldGroup.setAttribute('class', 'w-100 dis-flex flex-wrap flex-evenly dis-none');
    fieldGroup.setAttribute('id', `result_${resObj.id}_group_2`);

    fieldGroupTittle = document.createElement('h3');
    fieldGroupTittle.setAttribute('class', 'w-100 txt-center txt-medium color-primary txt-bold border-only-bottom border-white txt-uppercase margin-bottom-medium');
    fieldGroupTittle.innerText = 'Información del inmueble';

    fieldGroup.appendChild(fieldGroupTittle);

    field = createResultField(resObj.id, 'Domicilio del inmueble', 'buildingAddress', resObj.buildingAddress, 'text');
        
    fieldGroup.appendChild(field);

    if (resObj.licenseType >= 5 && resObj.licenseType <= 8) {
        field = createResultField(resObj.id, 'Colonia/Asentamiento', 'colony', resObj.licenseSpecialData.colony, 'text');

        fieldGroup.appendChild(field);
    }

    if (resObj.licenseType >= 1 && resObj.licenseType <= 6 || resObj.licenseType == 9) {
        field = createResultField(resObj.id, 'Clave catastral', 'catastralKey', resObj.catastralKey, 'text');

        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Superficie total', 'surface', resObj.surfaceTotal, 'number');

        fieldGroup.appendChild(field);
    }

    resultContent.appendChild(fieldGroup);
    //building section end--------------------------------------------

    //authorization section start-------------------------------------------
    fieldGroup = document.createElement('div');
    fieldGroup.setAttribute('class', 'w-100 dis-flex flex-wrap flex-evenly dis-none');
    fieldGroup.setAttribute('id', `result_${resObj.id}_group_3`);

    fieldGroupTittle = document.createElement('h3');
    fieldGroupTittle.setAttribute('class', 'w-100 txt-center txt-medium color-primary txt-bold border-only-bottom border-white txt-uppercase margin-bottom-medium');
    fieldGroupTittle.innerText = 'Zonificación y autorización';

    fieldGroup.appendChild(fieldGroupTittle);

    if(resObj.licenseType <= 4 || resObj.licenseType == 9) {
        field = createResultField(resObj.id, 'Zonificación/División o subdivisión', 'zoneIMG', resObj.fullInvoice, 'file');

        fieldGroup.appendChild(field);
    }

    if (resObj.licenseType == 1 || resObj.licenseType == 2 || resObj.licenseType == 6 || resObj.licenseType == 9) {
        field = createResultField(resObj.id, 'Zona', 'zone', resObj.licenseZone, 'select');

        field.querySelector('select').innerHTML = `
            <option value="">Seleccione zona ...</option>
            <option value="19">Agricultura tecnificada</option>
            <option value="20">Agroindustria</option>
            <option value="21">Cuerpos de agua</option>
            <option value="22">Conservación y restauración ambiental</option>
            <option value="11">Corredor urbano mixto de baja densidad</option>
            <option value="12">Corredor urbano mixto de media densidad</option>
            <option value="1">Densidad muy baja (Unifamiliar)</option>
            <option value="6">Densidad alta (Unifamiliar)</option>
            <option value="7">Densidad alta (multifamiliar dúplex, tríplex y cuádruplex)</option>
            <option value="2">Densidad baja (Unifamiliar)</option>
            <option value="3">Densidad media baja (Unifamiliar)</option>
            <option value="4">Densidad media (Unifamiliar)</option>
            <option value="5">Densidad media alta (Unifamiliar)</option>
            <option value="8">Densidad muy alta 1 (multifamiliar)</option>
            <option value="9">Densidad muy alta 2</option>
            <option value="16">Equipamiento Urbano</option>
            <option value="13">Industria de bajo impacto</option>
            <option value="15">Industria de gran impacto</option>
            <option value="14">Industria de medio impacto</option>
            <option value="17">Infraestructura urbana</option>
            <option value="10">Mixto</option>
            <option value="23">Parque Hídrico</option>
            <option value="18">Reserva territorial futura</option>
            `

        field.querySelector('select').value = resObj.licenseZone;

        fieldGroup.appendChild(field);
    }

    if (resObj.licenseType >= 5 && resObj.licenseType <= 8) {
        field = createResultField(resObj.id, 'Tablas/Cuadros resumen', 'resumeTables', resObj.fullInvoice, 'file');
        fieldGroup.appendChild(field);
    }

    if (resObj.licenseType == 3 || resObj.licenseType == 4) {
        field = createResultTextArea(resObj.id, 'Resumen de autorización', 'authorizationResume', resObj.licenseSpecialData.authorizationResume);
        field.style.marginBottom = '10px';
        fieldGroup.appendChild(field);
    }

    if (resObj.licenseType >= 5 && resObj.licenseType <= 8) {
        field = createResultTextArea(resObj.id, 'Documentos', 'documents', resObj.licenseSpecialData ? resObj.licenseSpecialData.documents.join('\n') : '');
        fieldGroup.appendChild(field);
    }

    if (resObj.licenseType >= 5 && resObj.licenseType <= 7) {
        field = createResultTextArea(resObj.id, 'Ubicación', 'location', resObj.licenseSpecialData ? resObj.licenseSpecialData.location.join('\n') : '');
        fieldGroup.appendChild(field);
    }

    if (resObj.licenseType >= 2 && resObj.licenseType <= 8) {
        field = createResultTextArea(resObj.id, 'Condicionantes', 'conditions', resObj.licenseSpecialData.conditions ? resObj.licenseSpecialData.conditions.join('\n') : '');
        fieldGroup.appendChild(field);
    }

    if (resObj.licenseType == 2) {
        field = createResultTextArea(resObj.id, 'Restricciones y Sanciones', 'restrictions', resObj.licenseSpecialData.restrictions ? resObj.licenseSpecialData.restrictions.join('\n') : '');
        fieldGroup.appendChild(field);

        field = createResultTextArea(resObj.id, 'Observaciones', 'observations', resObj.licenseSpecialData.observations ? resObj.licenseSpecialData.observations.join('\n') : '');
        fieldGroup.appendChild(field);

        field = createResultTextArea(resObj.id, 'Area de donación', 'donationArea', resObj.licenseSpecialData.donationArea ? resObj.licenseSpecialData.donationArea.join('\n') : '');
        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Uso de suelo autorizado', 'authUse', resObj.licenseSpecialData.authUse, 'text');
        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Actividad', 'activity', resObj.licenseSpecialData.activity, 'text');
        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'P.C.U.', 'PCU', resObj.licenseSpecialData.PCU, 'text');

        fieldGroup.appendChild(field);
    }

    if (resObj.licenseType == 5) {
        field = createResultTextArea(resObj.id, 'Integridad', 'integrity', resObj.licenseSpecialData.integrity);
        fieldGroup.appendChild(field);

        field = createResultTextArea(resObj.id, 'Uso autorizado', 'detailedUse', resObj.licenseSpecialData.detailedUse);
        fieldGroup.appendChild(field);
    }

    if (resObj.licenseType == 9) {
        field = createResultField(resObj.id, 'P.C.U.', 'PCU', resObj.licenseSpecialData.PCU, 'text');

        fieldGroup.appendChild(field);
    }

    if (resObj.licenseType == 1) {
        field = createResultField(resObj.id, 'P.C.U.', 'PCU', resObj.licenseSpecialData.PCU, 'text');

        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Porcentaje de ocupación', 'occupationPercent', resObj.licenseSpecialData.occupationPercent, 'number');
        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Superficie minima por lote', 'surfacePerLote', resObj.licenseSpecialData.surfacePerLote, 'number');
        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Altura maxima', 'maximumHeight', resObj.licenseSpecialData.maximumHeight, 'text');
        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Niveles', 'levels', resObj.licenseSpecialData.levels, 'text');
        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Frente mínimo', 'minimalFront', resObj.licenseSpecialData.minimalFront, 'number');
        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Restricción frontal', 'frontalRestriction', resObj.licenseSpecialData.frontalRestriction, 'number');
        fieldGroup.appendChild(field);
    }

    if (resObj.licenseType == 6) {
        field = createResultTextArea(resObj.id, 'Constancia de Uso de Suelo', 'urbanCUS', resObj.licenseSpecialData.urbanCUS);
        fieldGroup.appendChild(field);

            field = createResultTextArea(resObj.id, 'Licencia de Uso de Suelo', 'urbanLUS', resObj.licenseSpecialData.urbanLUS);
        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Lotes Totales', 'habitacionalLotes', resObj.licenseSpecialData.habitacionalLotes, 'text');
        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Manzanas Totales', 'totalManzanas', resObj.licenseSpecialData.totalManzanas, 'text');
        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Superficie de donación', 'totalSurface', resObj.licenseSpecialData.totalSurface, 'number');
        fieldGroup.appendChild(field);
    }

    if (resObj.licenseType == 2 || resObj.licenseType == 6 || resObj.licenseType == 9) {
        field = createResultField(resObj.id, 'Porcentaje de ocupación', 'occupationPercent', resObj.licenseSpecialData.occupationPercent, 'number');
        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Superficie minima por lote', 'surfacePerLote', resObj.licenseSpecialData.surfacePerLote, 'number');
        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Altura maxima', 'maximumHeight', resObj.licenseSpecialData.maximumHeight, 'text');
        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Frente mínimo', 'minimalFront', resObj.licenseSpecialData.minimalFront, 'number');
        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Niveles', 'levels', resObj.licenseSpecialData.levels, 'text');
        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Restricción frontal', 'frontalRestriction', resObj.licenseSpecialData.frontalRestriction, 'number');
        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Estacionamientos', 'parkingLots', resObj.licenseSpecialData.parkingLots, 'text');
        fieldGroup.appendChild(field);
    }

    if (resObj.licenseType == 9) {
        field = createResultTextArea(resObj.id, 'Condicionantes', 'conditions', resObj.licenseSpecialData.conditions ? resObj.licenseSpecialData.conditions.join('\n') : '');
        fieldGroup.appendChild(field);
    }

    if (resObj.licenseType == 7) {
        field = createResultTextArea(resObj.id, 'Relotificación para', 'lotes', resObj.licenseSpecialData.lotes.join('\n'));
        fieldGroup.appendChild(field);

        field = createResultTextArea(resObj.id, 'Relotificación resultante', 'resultRelotification', resObj.licenseSpecialData.resultRelotification.join('\n'));
        fieldGroup.appendChild(field);

        field = createResultTextArea(resObj.id, 'Uso autorizado', 'detailedUse', resObj.licenseSpecialData.detailedUse);
        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Relotificación', 'totalRelotification', resObj.licenseSpecialData.totalRelotification, 'text');
        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Folio previo', 'previousInvoice', resObj.licenseSpecialData.previousInvoice, 'text');
        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Fecha de folio previo', 'previousInvoiceDate', resObj.licenseSpecialData.previousInvoiceDate, 'date');
        fieldGroup.appendChild(field);
    }

    if (resObj.licenseType == 8) {
        field = createResultTextArea(resObj.id, 'Lotes', 'lotes', resObj.licenseSpecialData.lotes.join('\n'));
        fieldGroup.appendChild(field);

        field = createResultTextArea(resObj.id, 'Manzanas', 'manzanas', resObj.licenseSpecialData.manzanas.join('\n'));
        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Viviendas', 'households', resObj.licenseSpecialData.households, 'text');
        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Superficie privativa', 'privateSurface', resObj.licenseSpecialData.privateSurface, 'number');
        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Superficie común', 'commonSurface', resObj.licenseSpecialData.commonSurface, 'number');
        fieldGroup.appendChild(field);
    }

    resultContent.appendChild(fieldGroup);
    //authorization section end--------------------------------------------

    //validities and terms section start-------------------------------------------
    fieldGroup = document.createElement('div');
    fieldGroup.setAttribute('class', 'w-100 dis-flex flex-wrap flex-evenly dis-none');
    fieldGroup.setAttribute('id', `result_${resObj.id}_group_4`);

    fieldGroupTittle = document.createElement('h3');
    fieldGroupTittle.setAttribute('class', 'w-100 txt-center txt-medium color-primary txt-bold border-only-bottom border-white txt-uppercase margin-bottom-medium');
    fieldGroupTittle.innerText = 'Vigencias y plazos';

    fieldGroup.appendChild(fieldGroupTittle);

    field = createResultField(resObj.id, 'Fecha de Solicitud', 'requestDate', resObj.requestDate, 'date');

    fieldGroup.appendChild(field);

    field = createResultField(resObj.id, 'Fecha de expedición', 'expeditionDate', resObj.expeditionDate, 'date');

    fieldGroup.appendChild(field);

    field = createResultField(resObj.id, 'Fecha de entrega', 'deliveryDate', resObj.deliveryDate, 'date');

    fieldGroup.appendChild(field);

    field = createResultField(resObj.id, 'Nombre de quien recibe', 'receiverName', resObj.receiverName, 'text');

    fieldGroup.appendChild(field);

    if (resObj.licenseType == 1 || resObj.licenseType == 2 || resObj.licenseType == 5 || resObj.licenseType == 6 || resObj.licenseType == 9) {
        field = createResultField(resObj.id, 'Vigencia', 'validity', resObj.licenseValidity, 'select');

            field.querySelector('select').innerHTML = `
            <option value="">Selecciona ...</option>
            <option value="1">6 Meses</option>
            <option value="2">12 Meses</option>
            `;

        field.querySelector('select').value = resObj.licenseValidity;

        fieldGroup.appendChild(field);
    }

    if (resObj.licenseType == 1 || resObj.licenseType == 2 || resObj.licenseType == 9) {
        field = createResultField(resObj.id, 'Plazo', 'term', resObj.licenseTerm, 'select');

        field.querySelector('select').innerHTML = `
            <option value="">Selecciona ...</option>
            <option value="1">Corto</option>
            <option value="2">Mediano</option>
            <option value="3">Largo</option>
            `;

        field.querySelector('select').value = resObj.licenseTerm;

        fieldGroup.appendChild(field);
    }

    resultContent.appendChild(fieldGroup);
    //validities and terms section end--------------------------------------------

    //payment section start-------------------------------------------
    fieldGroup = document.createElement('div');
    fieldGroup.setAttribute('class', 'w-100 dis-flex flex-wrap flex-evenly dis-none');
    fieldGroup.setAttribute('id', `result_${resObj.id}_group_5`);

    fieldGroupTittle = document.createElement('h3');
    fieldGroupTittle.setAttribute('class', 'w-100 txt-center txt-medium color-primary txt-bold border-only-bottom border-white txt-uppercase margin-bottom-medium');
    fieldGroupTittle.innerText = 'Información de pago';

    fieldGroup.appendChild(fieldGroupTittle);

    field = createResultField(resObj.id, 'Monto autorizado', 'authorizedQuantity', resObj.authorizedQuantity, 'number');

    fieldGroup.appendChild(field);

    field = createResultField(resObj.id, 'Orden de cobro', 'collectionOrder', resObj.collectionOrder, 'number');

    fieldGroup.appendChild(field);

    field = createResultField(resObj.id, 'Folio y serie de factura', 'billInvoice', resObj.billInvoice, 'text');

    fieldGroup.appendChild(field);

    field = createResultField(resObj.id, 'Fecha de pago', 'paymentDate', resObj.paymentDate, 'date');

    fieldGroup.appendChild(field);

    resultContent.appendChild(fieldGroup);
    //payment section end--------------------------------------------

    //extras section start-------------------------------------------
    fieldGroup = document.createElement('div');
    fieldGroup.setAttribute('class', 'w-100 dis-flex flex-wrap flex-evenly dis-none');
    fieldGroup.setAttribute('id', `result_${resObj.id}_group_6`);

    fieldGroupTittle = document.createElement('h3');
    fieldGroupTittle.setAttribute('class', 'w-100 txt-center txt-medium color-primary txt-bold border-only-bottom border-white txt-uppercase margin-bottom-medium');
    fieldGroupTittle.innerText = 'Información de formato';

    fieldGroup.appendChild(fieldGroupTittle);

    if (resObj.licenseType == 3 || resObj.licenseType == 4) {
        field = generateTableForm(resObj);
        fieldGroup.appendChild(field);

        field = document.createElement('div');
        field.setAttribute('class', 'field-span border-round preview-container w-100');
        field.setAttribute('id', `tha-preview-${resObj.id}`);
        field.appendChild(generateTableFrom(resObj.licenseSpecialData.actualSituation));

        fieldGroup.appendChild(field);
    }

//saltos de pagina y distribuciones
    if (resObj.licenseType >= 3 && resObj.licenseType <= 8) {
        fieldGroupTittle = document.createElement('h3');
        fieldGroupTittle.setAttribute('class', 'w-100 txt-center txt-regular color-primary txt-bold txt-uppercase margin-vertical-small');
        fieldGroupTittle.innerText = 'Distribución y saltos de pagina';

        fieldGroup.appendChild(fieldGroupTittle);
    }

    if (resObj.licenseType == 3 || resObj.licenseType == 4) {
        field = createResultField(resObj.id, 'Distribución', 'layout', resObj.licenseSpecialData.layout, 'select');

        field.querySelector('select').innerHTML = `
            <option value="">Selecciona ...</option>
            <option value="A">Condicionantes y Restricciones antes de firmas</option>
            <option value="B">Condicionantes y Restricciones después de firmas</option>
            <option value="C">Firmas al final</option>
            `;
        field.querySelector('select').value = resObj.licenseSpecialData.layout;

        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Salto de pagina antes de Condicionantes', 'pageBreak_1', resObj.licenseSpecialData.pageBreak_1, 'checkbox');

        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Salto de pagina antes de Restricciones y Sanciones', 'pageBreak_2', resObj.licenseSpecialData.pageBreak_2, 'checkbox');

        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Salto de pagina antes de Subdivisión que se Autoriza', 'pageBreak_3', resObj.licenseSpecialData.pageBreak_3, 'checkbox');

        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Salto de pagina antes de Fundamento Jurídico', 'pageBreak_4', resObj.licenseSpecialData.pageBreak_4, 'checkbox');

        fieldGroup.appendChild(field);
    }

    if (resObj.licenseType == 5) {
        field = createResultField(resObj.id, 'Salto antes de cuadro de superficies por uso de suelo', 'pageBreak_1', resObj.licenseSpecialData.pageBreak_1, 'checkbox');

        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Salto antes de resumen de manzanas', 'pageBreak_2', resObj.licenseSpecialData.pageBreak_2, 'checkbox');

        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Salto antes de resumen de por uso', 'pageBreak_3', resObj.licenseSpecialData.pageBreak_3, 'checkbox');

        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Salto antes de obligaciones', 'pageBreak_4', resObj.licenseSpecialData.pageBreak_4, 'checkbox');

        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Salto antes de condicionantes', 'pageBreak_5', resObj.licenseSpecialData.pageBreak_5, 'checkbox');

        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Salto antes de prohibiciones y sanciones', 'pageBreak_6', resObj.licenseSpecialData.pageBreak_6, 'checkbox');

        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Salto antes de medidas preventivas', 'pageBreak_7', resObj.licenseSpecialData.pageBreak_7, 'checkbox');

        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Salto antes de resuelve', 'pageBreak_8', resObj.licenseSpecialData.pageBreak_8, 'checkbox');

        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Salto antes de fundamento jurídico', 'pageBreak_9', resObj.licenseSpecialData.pageBreak_9, 'checkbox');

        fieldGroup.appendChild(field);
    }

    if (resObj.licenseType == 6) {
        field = createResultField(resObj.id, 'Salto antes de cuadro de superficies por uso de suelo', 'pageBreak_1', resObj.licenseSpecialData.pageBreak_1, 'checkbox');

        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Salto antes de cuadro de distribución por manzanas', 'pageBreak_2', resObj.licenseSpecialData.pageBreak_2, 'checkbox');

        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Salto antes de donaciones', 'pageBreak_3', resObj.licenseSpecialData.pageBreak_3, 'checkbox');

        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Salto antes de obligaciones', 'pageBreak_4', resObj.licenseSpecialData.pageBreak_4, 'checkbox');

        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Salto antes de condicionantes', 'pageBreak_5', resObj.licenseSpecialData.pageBreak_5, 'checkbox');

        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Salto antes de prohibiciones y sanciones', 'pageBreak_6', resObj.licenseSpecialData.pageBreak_6, 'checkbox');

        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Salto antes de medidas preventivas', 'pageBreak_7', resObj.licenseSpecialData.pageBreak_7, 'checkbox');

        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Salto antes de resuelve', 'pageBreak_8', resObj.licenseSpecialData.pageBreak_8, 'checkbox');

        fieldGroup.appendChild(field);

        field = createResultField(resObj.id, 'Salto antes de fundamento jurídico', 'pageBreak_9', resObj.licenseSpecialData.pageBreak_9, 'checkbox');

        fieldGroup.appendChild(field);
    }

    if (resObj.licenseType == 7) {
        field = createResultField(resObj.id, 'Salto antes de datos generales', 'pageBreak_1', resObj.licenseSpecialData.pageBreak_1, 'checkbox');

            fieldGroup.appendChild(field);

            field = createResultField(resObj.id, 'Salto antes de resumen de relotificacion', 'pageBreak_2', resObj.licenseSpecialData.pageBreak_2, 'checkbox');

            fieldGroup.appendChild(field);

            field = createResultField(resObj.id, 'Salto antes de obligaciones', 'pageBreak_3', resObj.licenseSpecialData.pageBreak_3, 'checkbox');

            fieldGroup.appendChild(field);

            field = createResultField(resObj.id, 'Salto antes de condicionantes', 'pageBreak_4', resObj.licenseSpecialData.pageBreak_4, 'checkbox');

            fieldGroup.appendChild(field);

            field = createResultField(resObj.id, 'Salto antes de prohibiciones y sanciones', 'pageBreak_5', resObj.licenseSpecialData.pageBreak_5, 'checkbox');

            fieldGroup.appendChild(field);

            field = createResultField(resObj.id, 'Salto antes de medidas preventivas', 'pageBreak_6', resObj.licenseSpecialData.pageBreak_6, 'checkbox');

            fieldGroup.appendChild(field);

            field = createResultField(resObj.id, 'Salto antes de resuelve', 'pageBreak_7', resObj.licenseSpecialData.pageBreak_7, 'checkbox');

            fieldGroup.appendChild(field);

            field = createResultField(resObj.id, 'Salto antes de fundamento jurídico', 'pageBreak_8', resObj.licenseSpecialData.pageBreak_8, 'checkbox');

            fieldGroup.appendChild(field);
    }

    if (resObj.licenseType == 8) {
        field = createResultField(resObj.id, 'Salto antes de resumen de areas', 'pageBreak_1', resObj.licenseSpecialData.pageBreak_1, 'checkbox');

            fieldGroup.appendChild(field);

            field = createResultField(resObj.id, 'Salto antes de resumen de lotes', 'pageBreak_2', resObj.licenseSpecialData.pageBreak_2, 'checkbox');

            fieldGroup.appendChild(field);

            field = createResultField(resObj.id, 'Salto antes de resumen por lote', 'pageBreak_3', resObj.licenseSpecialData.pageBreak_3, 'checkbox');

            fieldGroup.appendChild(field);

            field = createResultField(resObj.id, 'Salto antes de considerandos parte 2', 'pageBreak_4', resObj.licenseSpecialData.pageBreak_4, 'checkbox');

            fieldGroup.appendChild(field);

            field = createResultField(resObj.id, 'Salto antes de prohibiciones y sanciones', 'pageBreak_5', resObj.licenseSpecialData.pageBreak_5, 'checkbox');

            fieldGroup.appendChild(field);

            field = createResultField(resObj.id, 'Salto antes de obligaciones', 'pageBreak_6', resObj.licenseSpecialData.pageBreak_6, 'checkbox');

            fieldGroup.appendChild(field);

            field = createResultField(resObj.id, 'Salto antes de condicionantes', 'pageBreak_7', resObj.licenseSpecialData.pageBreak_7, 'checkbox');

            fieldGroup.appendChild(field);

            field = createResultField(resObj.id, 'Salto antes de medidas preventivas', 'pageBreak_8', resObj.licenseSpecialData.pageBreak_8, 'checkbox');

            fieldGroup.appendChild(field);

            field = createResultField(resObj.id, 'Salto antes de resuelve', 'pageBreak_9', resObj.licenseSpecialData.pageBreak_9, 'checkbox');

            fieldGroup.appendChild(field);

            field = createResultField(resObj.id, 'Salto antes de fundamento jurídico', 'pageBreak_10', resObj.licenseSpecialData.pageBreak_10, 'checkbox');

            fieldGroup.appendChild(field);
    }

    resultContent.appendChild(fieldGroup);
    //extras section end--------------------------------------------

    return resultContent;
}