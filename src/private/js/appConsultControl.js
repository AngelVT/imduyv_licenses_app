function hideShow(btn, id) {
    let resultTop = document.querySelector(`#result_top_${id}`);
    let resultSave = document.querySelector(`#result_control_save_${id}`);
    let resultDelete = document.querySelector(`#result_control_delete_${id}`);
    let resultPrint = document.querySelector(`#result_control_print_${id}`);
    let fields = document.querySelector(`#result_fields_${id}`);
    /*btn.classList.toggle("bi-chevron-bar-up");
    btn.classList.toggle("bi-chevron-bar-down");*/
    resultTop.classList.toggle("border-round");
    resultTop.classList.toggle("border-round-top");
    resultSave.classList.toggle("dis-none");
    resultDelete.classList.toggle("dis-none");
    resultPrint.classList.toggle("dis-none");
    fields.classList.toggle("dis-none");
    fields.classList.toggle("dis-grid");
}

function createResult(id, top, fields) {
    let result = document.createElement('div');
    result.setAttribute('id', `result_${id}`);
    result.setAttribute('class', 'w-100');

    result.appendChild(top);
    result.appendChild(fields);

    return result;
}

function createResultTop(obj) {
    let top = document.createElement('div');
    let topBtn = document.createElement('button');
    let topLabel = document.createElement('p');
    let topControls = document.createElement('div');
    let span;

    top.setAttribute('id', `result_top_${obj.id}`);
    top.setAttribute('class', 'w-100 dis-flex flex-between flex-center-v padding-small bg-complementary-alpha border-round controls');

    /*topBtn.setAttribute('onclick', `hideShow(this, ${obj.id})`);
    topBtn.setAttribute('class', 'bi-chevron-bar-down txt-medium color-primary result-control input-none');

    top.appendChild(topBtn);*/

    topLabel.setAttribute('class', 'color-white txt-bold w-100 txt-center result-label');
    topLabel.setAttribute('onclick', `hideShow(this, ${obj.id})`)
    topLabel.innerText = 'Folio: ';
    span = document.createElement('span');
    span.setAttribute('id', `result_invoice_${obj.id}`);
    span.innerText = obj.fullInvoice.replaceAll('_', '/');
    topLabel.appendChild(span);

    top.appendChild(topLabel);

    topControls.setAttribute('class', 'w-15 dis-flex flex-evenly');
    span = document.createElement('span');
    span.setAttribute('id', `result_control_save_${obj.id}`);
    span.setAttribute('onclick', `updateResultFull(${obj.id})`);
    span.setAttribute('class', 'bi-floppy txt-large color-primary dis-none result-control');
    topControls.appendChild(span);

    span = document.createElement('a');
    span.setAttribute('id', `result_control_print_${obj.id}`);
    span.setAttribute('target', '_blank');
    span.setAttribute('href', `/api/urban/PDF/${obj.licenseType}/${obj.invoice}/${obj.year}`);
    span.setAttribute('class', 'bi-printer txt-large color-primary dis-none result-control');
    topControls.appendChild(span);

    span = document.createElement('span');
    span.setAttribute('id', `result_control_delete_${obj.id}`);
    span.setAttribute('onclick', `deleteResult(${obj.id})`);
    span.setAttribute('class', 'bi-trash txt-large color-primary dis-none result-control');
    topControls.appendChild(span);

    top.appendChild(topControls);

    return top;
}

function createResultContent(id) {
    let content = document.createElement('div');
    content.setAttribute('id', `result_fields_${id}`);
    content.setAttribute('class', 'w-100 dis-none template-4cols-nogap bg-secondary-alpha padding-small border-round-bottom');
    return content;
}

function createResultField(id, tag, name, value, type) {
    let field = document.createElement('form');
    let label = document.createElement('label');
    let button = document.createElement('button');
    let input;
    let span;

    field.setAttribute('onsubmit', `updateResultField(this, ${id}); return false`);

    label.innerText = tag + ':';
    label.setAttribute('class', 'dis-flex flex-wrap color-primary')

    input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('value', value);

    label.appendChild(input);

    span = document.createElement('span');
    span.setAttribute('class', 'w-100');

    label.appendChild(span);

    if (type == 'select') {
        input = document.createElement('select');
        input.setAttribute('class', 'w-85 input input-interface input-round-left');
        input.setAttribute('name', name);
        input.setAttribute('required','');
    } else {
        input = document.createElement('input');
        if(type == 'file') {
            input.setAttribute('class', 'w-85 input-file');
            input.setAttribute('multiple', '');
        } else {
            input.setAttribute('class', 'w-85 input input-interface input-round-left');
        }

        if(type == 'number') {
            input.setAttribute('step', 'any');
        }

        input.setAttribute('type', type);
        input.setAttribute('name', name);
        input.setAttribute('value', value);
        input.setAttribute('required','');
    }

    label.appendChild(input);

    button.setAttribute('class', 'bi-floppy input-side-save w-10');

    label.appendChild(button);

    field.appendChild(label);

    return field;
}

function createResultTextArea(id, tag, name, value) {
    let field = document.createElement('form');
    let label = document.createElement('label');
    let button = document.createElement('button');
    let input;
    let span;

    field.setAttribute('onsubmit', `updateResultField(this, ${id}); return false`);
    field.setAttribute('class', 'field-span')

    label.innerText = tag + ':';
    label.setAttribute('class', 'dis-flex flex-wrap color-primary')

    input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('value', value);

    label.appendChild(input);

    span = document.createElement('span');
    span.setAttribute('class', 'w-100');

    label.appendChild(span);

    input = document.createElement('textarea');
    input.setAttribute('class', 'input input-interface input-round-left input-textarea-result');

    input.setAttribute('name', name);
    input.value = value;
    input.setAttribute('required','');

    label.appendChild(input);

    button.setAttribute('class', 'bi-floppy input-side-save ta w-10');

    label.appendChild(button);

    field.appendChild(label);

    return field;
}

function createUrbanResult(resObj, target) {
    let resultContent = createResultContent(resObj.id);
    let field;

    field = createResultField(resObj.id, 'Nombre del solicitante', 'requestorName', resObj.requestorName, 'text');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Colonia/Asentamiento', 'colony', resObj.colony, 'text');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Fecha de Solicitud', 'requestDate', resObj.requestDate, 'date');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Fecha de expedición', 'expeditionDate', resObj.expeditionDate, 'date');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Fecha de entrega', 'deliveryDate', resObj.deliveryDate, 'date');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Monto autorizado', 'authorizedQuantity', resObj.authorizedQuantity, 'number');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Orden de cobro', 'collectionOrder', resObj.collectionOrder, 'number');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Folio y serie de factura', 'billInvoice', resObj.billInvoice, 'text');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Fecha de pago:', 'paymentDate', resObj.paymentDate, 'date');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Nombre de quien recibe', 'receiverName', resObj.receiverName, 'text');

    resultContent.appendChild(field);

    switch(resObj.licenseType) {
        case 1:
            field = createResultField(resObj.id, 'Calle', 'address', resObj.address, 'text');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Numero', 'number', resObj.address, 'text');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Clave catastral', 'catastralKey', resObj.catastralKey, 'text');

            resultContent.appendChild(field);

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

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Superficie total', 'surface', resObj.surfaceTotal, 'number');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Zonificación/División o subdivisión', 'zoneIMG', resObj.fullInvoice, 'file');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'P.C.U.', 'PCU', resObj.licenseSpecialData.PCU, 'text');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Plazo', 'term', resObj.licenseTerm, 'select');

            field.querySelector('select').innerHTML = `
            <option value="">Selecciona ...</option>
            <option value="1">Corto</option>
            <option value="2">Mediano</option>
            <option value="3">Largo</option>
            `;

            field.querySelector('select').value = resObj.licenseTerm;

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Vigencia', 'validity', resObj.licenseValidity, 'select');

            field.querySelector('select').innerHTML = `
            <option value="">Selecciona ...</option>
            <option value="1">6 Meses</option>
            <option value="2">12 Meses</option>
            `;

            field.querySelector('select').value = resObj.licenseValidity;

            resultContent.appendChild(field);
            break;
        case 2:
            field = createResultField(resObj.id, 'Representante', 'legalRepresentative', resObj.legalRepresentative, 'text');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Caracter del representante', 'representativeAs', resObj.licenseSpecialData.representativeAs, 'text');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Domicilio del solicitante', 'requestorAddress', resObj.licenseSpecialData.requestorAddress, 'text');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Domicilio del inmueble', 'buildingAddress', resObj.licenseSpecialData.buildingAddress, 'text');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Clave catastral', 'catastralKey', resObj.catastralKey, 'text');

            resultContent.appendChild(field);

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

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Superficie total', 'surface', resObj.surfaceTotal, 'number');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Zonificación/División o subdivisión', 'zoneIMG', resObj.fullInvoice, 'file');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Vigencia', 'validity', resObj.licenseValidity, 'select');

            field.querySelector('select').innerHTML = `
            <option value="">Selecciona ...</option>
            <option value="1">6 Meses</option>
            <option value="2">12 Meses</option>
            `;

            field.querySelector('select').value = resObj.licenseValidity;

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Porcentaje de ocupación', 'occupationPercent', resObj.licenseSpecialData.occupationPercent, 'number');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Superficie minima por lote', 'surfacePerLote', resObj.licenseSpecialData.surfacePerLote, 'number');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Altura maxima', 'maximumHeight', resObj.licenseSpecialData.maximumHeight, 'text');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Frente mínimo', 'minimalFront', resObj.licenseSpecialData.minimalFront, 'number');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Restricción frontal', 'frontalRestriction', resObj.licenseSpecialData.frontalRestriction, 'number');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Estacionamientos', 'parkingLots', resObj.licenseSpecialData.parkingLots, 'text');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Porcentaje de uso', 'usePercent', resObj.licenseSpecialData.usePercent, 'number');
            resultContent.appendChild(field);
            break;
        case 3:
            field = createResultField(resObj.id, 'Representante', 'legalRepresentative', resObj.legalRepresentative, 'text');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Caracter del representante', 'representativeAs', resObj.licenseSpecialData.representativeAs, 'text');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Domicilio del solicitante', 'requestorAddress', resObj.licenseSpecialData.requestorAddress, 'text');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Domicilio del inmueble', 'buildingAddress', resObj.licenseSpecialData.buildingAddress, 'text');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Clave catastral', 'catastralKey', resObj.catastralKey, 'text');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Superficie total', 'surface', resObj.surfaceTotal, 'number');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Zonificación/División o subdivisión', 'zoneIMG', resObj.fullInvoice, 'file');

            resultContent.appendChild(field);


            field = generateTableForm(resObj);
            resultContent.appendChild(field);

            field = document.createElement('div');
            field.setAttribute('class', 'field-span border-round preview-container');
            field.setAttribute('id', `tha-preview-${resObj.id}`);
            field.appendChild(generateTableFrom(resObj.licenseSpecialData.actualSituation));

            resultContent.appendChild(field);

            field = createResultTextArea(resObj.id, 'Resumen de autorización', 'authorizationResume', resObj.licenseSpecialData.authorizationResume);
            field.style.marginBottom = '10px';
            resultContent.appendChild(field);
            break;
        case 4:
            field = createResultField(resObj.id, 'Representante', 'legalRepresentative', resObj.legalRepresentative, 'text');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Caracter del representante', 'representativeAs', resObj.licenseSpecialData.representativeAs, 'text');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Domicilio del solicitante', 'requestorAddress', resObj.licenseSpecialData.requestorAddress, 'text');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Domicilio del inmueble', 'buildingAddress', resObj.licenseSpecialData.buildingAddress, 'text');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Clave catastral', 'catastralKey', resObj.catastralKey, 'text');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Superficie total', 'surface', resObj.surfaceTotal, 'number');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Zonificación/División o subdivisión', 'zoneIMG', resObj.fullInvoice, 'file');

            resultContent.appendChild(field);

            field = generateTableForm(resObj);
            resultContent.appendChild(field);

            field = document.createElement('div');
            field.setAttribute('class', 'field-span border-round preview-container');
            field.setAttribute('id', `tha-preview-${resObj.id}`);
            field.appendChild(generateTableFrom(resObj.licenseSpecialData.actualSituation));

            resultContent.appendChild(field);

            field = createResultTextArea(resObj.id, 'Resumen de autorización', 'authorizationResume', resObj.licenseSpecialData.authorizationResume);
            field.style.marginBottom = '10px';
            resultContent.appendChild(field);
            break;
        case 5:
            field = createResultField(resObj.id, 'Representante', 'legalRepresentative', resObj.legalRepresentative, 'text');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Caracter del representante', 'representativeAs', resObj.licenseSpecialData.representativeAs, 'text');

            resultContent.appendChild(field);
            
            field = createResultField(resObj.id, 'Domicilio del solicitante', 'requestorAddress', resObj.licenseSpecialData.requestorAddress, 'text');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Domicilio del inmueble', 'buildingAddress', resObj.licenseSpecialData.buildingAddress, 'text');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Clave catastral', 'catastralKey', resObj.catastralKey, 'text');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Superficie total', 'surface', resObj.surfaceTotal, 'number');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Tablas/Cuadros resumen', 'resumeTables', resObj.fullInvoice, 'file');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Vigencia', 'validity', resObj.licenseValidity, 'select');

            field.querySelector('select').innerHTML = `
            <option value="">Selecciona ...</option>
            <option value="1">6 Meses</option>
            <option value="2">12 Meses</option>
            `;

            field.querySelector('select').value = resObj.licenseValidity;

            resultContent.appendChild(field);

            field = createResultTextArea(resObj.id, 'Documentos', 'documents', resObj.licenseSpecialData.documents.join('\n'));
            resultContent.appendChild(field);

            field = createResultTextArea(resObj.id, 'Ubicación', 'location', resObj.licenseSpecialData.location.join('\n'));
            resultContent.appendChild(field);

            field = createResultTextArea(resObj.id, 'Integridad', 'integrity', resObj.licenseSpecialData.integrity);
            resultContent.appendChild(field);

            field = createResultTextArea(resObj.id, 'Condicionantes', 'conditions', resObj.licenseSpecialData.conditions.join('\n'));
            resultContent.appendChild(field);

            field = createResultTextArea(resObj.id, 'Uso autorizado', 'detailedUse', resObj.licenseSpecialData.detailedUse);
            resultContent.appendChild(field);

            break;
        case 6:
            field = createResultField(resObj.id, 'Representante', 'legalRepresentative', resObj.legalRepresentative, 'text');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Caracter del representante', 'representativeAs', resObj.licenseSpecialData.representativeAs, 'text');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Domicilio del solicitante', 'requestorAddress', resObj.licenseSpecialData.requestorAddress, 'text');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Domicilio del inmueble', 'buildingAddress', resObj.licenseSpecialData.buildingAddress, 'text');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Clave catastral', 'catastralKey', resObj.catastralKey, 'text');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Superficie total', 'surface', resObj.surfaceTotal, 'number');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Tablas/Cuadros resumen', 'resumeTables', resObj.fullInvoice, 'file');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Vigencia', 'validity', resObj.licenseValidity, 'select');

            field.querySelector('select').innerHTML = `
            <option value="">Selecciona ...</option>
            <option value="1">6 Meses</option>
            <option value="2">12 Meses</option>
            `;

            field.querySelector('select').value = resObj.licenseValidity;

            resultContent.appendChild(field);

            field = createResultTextArea(resObj.id, 'Constancia de Uso de Suelo', 'urbanCUS', resObj.licenseSpecialData.urbanCUS);
            resultContent.appendChild(field);

            field = createResultTextArea(resObj.id, 'Licencia de Uso de Suelo', 'urbanLUS', resObj.licenseSpecialData.urbanLUS);
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Altura maxima', 'maximumHeight', resObj.licenseSpecialData.maximumHeight, 'text');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Frente mínimo', 'minimalFront', resObj.licenseSpecialData.minimalFront, 'number');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Restricción frontal', 'frontalRestriction', resObj.licenseSpecialData.frontalRestriction, 'number');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Estacionamientos', 'parkingLots', resObj.licenseSpecialData.parkingLots, 'text');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Porcentaje de uso', 'usePercent', resObj.licenseSpecialData.usePercent, 'number');
            resultContent.appendChild(field);

            field = createResultTextArea(resObj.id, 'Ubicación', 'location', resObj.licenseSpecialData.location.join('\n'));
            resultContent.appendChild(field);

            field = createResultTextArea(resObj.id, 'Documentos', 'documents', resObj.licenseSpecialData.documents.join('\n'));
            resultContent.appendChild(field);

            field = createResultTextArea(resObj.id, 'Condicionantes', 'conditions', resObj.licenseSpecialData.conditions.join('\n'));
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Lotes Totales', 'habitacionalLotes', resObj.licenseSpecialData.habitacionalLotes, 'text');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Manzanas Totales', 'totalManzanas', resObj.licenseSpecialData.totalManzanas, 'text');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Superficie de donación', 'totalSurface', resObj.licenseSpecialData.totalSurface, 'text');
            resultContent.appendChild(field);
            break;
        case 7:
            field = createResultField(resObj.id, 'Representante', 'legalRepresentative', resObj.legalRepresentative, 'text');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Caracter del representante', 'representativeAs', resObj.licenseSpecialData.representativeAs, 'text');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Domicilio del solicitante', 'requestorAddress', resObj.licenseSpecialData.requestorAddress, 'text');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Domicilio del inmueble', 'buildingAddress', resObj.licenseSpecialData.buildingAddress, 'text');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Tablas/Cuadros resumen', 'resumeTables', resObj.fullInvoice, 'file');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Relotificación', 'totalRelotification', resObj.licenseSpecialData.totalRelotification, 'text');
            resultContent.appendChild(field);

            field = createResultTextArea(resObj.id, 'Relotificación para', 'lotes', resObj.licenseSpecialData.lotes.join('\n'));
            resultContent.appendChild(field);

            field = createResultTextArea(resObj.id, 'Documentos', 'documents', resObj.licenseSpecialData.documents.join('\n'));
            resultContent.appendChild(field);

            field = createResultTextArea(resObj.id, 'Ubicación', 'location', resObj.licenseSpecialData.location.join('\n'));
            resultContent.appendChild(field);

            field = createResultTextArea(resObj.id, 'Condicionantes', 'conditions', resObj.licenseSpecialData.conditions.join('\n'));
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Folio previo', 'previousInvoice', resObj.licenseSpecialData.previousInvoice, 'text');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Fecha de folio previo', 'previousInvoiceDat', resObj.licenseSpecialData.previousInvoiceDate, 'date');
            resultContent.appendChild(field);

            field = createResultTextArea(resObj.id, 'Relotificación resultante', 'resultRelotification', resObj.licenseSpecialData.resultRelotification.join('\n'));
            resultContent.appendChild(field);

            field = createResultTextArea(resObj.id, 'Uso autorizado', 'detailedUse', resObj.licenseSpecialData.detailedUse);
            resultContent.appendChild(field);

            break;
        case 8:
            field = createResultField(resObj.id, 'Representante', 'legalRepresentative', resObj.legalRepresentative, 'text');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Caracter del representante', 'representativeAs', resObj.licenseSpecialData.representativeAs, 'text');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Domicilio del solicitante', 'requestorAddress', resObj.licenseSpecialData.requestorAddress, 'text');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Domicilio del inmueble', 'buildingAddress', resObj.licenseSpecialData.buildingAddress, 'text');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Tablas/Cuadros resumen', 'resumeTables', resObj.fullInvoice, 'file');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Viviendas', 'households', resObj.licenseSpecialData.households, 'text');
            resultContent.appendChild(field);

            field = createResultTextArea(resObj.id, 'Documentos', 'documents', resObj.licenseSpecialData.documents.join('\n'));
            resultContent.appendChild(field);

            field = createResultTextArea(resObj.id, 'Lotes', 'lotes', resObj.licenseSpecialData.lotes.join('\n'));
            resultContent.appendChild(field);

            field = createResultTextArea(resObj.id, 'Manzanas', 'manzanas', resObj.licenseSpecialData.manzanas.join('\n'));
            resultContent.appendChild(field);

            field = createResultTextArea(resObj.id, 'Condicionantes', 'conditions', resObj.licenseSpecialData.conditions.join('\n'));
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Superficie privativa', 'privateSurface', resObj.licenseSpecialData.privateSurface, 'number');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Superficie común', 'commonSurface', resObj.licenseSpecialData.commonSurface, 'number');
            resultContent.appendChild(field);
            break;
    }

    if(resObj.licenseType <= 4) {
        field = document.createElement('img');
        field.setAttribute('alt', 'Zonificación');
        field.setAttribute('src', `/urbanStorage/${resObj.fullInvoice}/zone.png?${new Date().getTime()}`);
        field.setAttribute('class', 'urban-print-result-img ');

        resultContent.appendChild(field);
    }

    let newResult = createResult(
        resObj.id,
        createResultTop(resObj), 
        resultContent);

    target.appendChild(newResult);
}

function createLandResult(resObj, target) {
    let resultContent = createResultContent(resObj.id);
    let field;

    field = createResultField(resObj.id, 'Nombre del solicitante', 'requestorName', resObj.requestorName, 'text');

    resultContent.appendChild(field);
    
    field = createResultField(resObj.id, 'En atención', 'attentionName', resObj.attentionName, 'text');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Calle', 'address', resObj.address, 'text');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Numero', 'number', resObj.number, 'text');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Colonia', 'colony', resObj.colony, 'text');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Teléfono de contacto', 'contactPhone', resObj.contactPhone, 'number');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Clave castastral', 'catastralKey', resObj.catastralKey, 'number');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Superficie de aprovechamiento', 'surface', resObj.surfaceTotal, 'number');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Georeferencia', 'georeference', resObj.geoReference, 'text');

    resultContent.appendChild(field);

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

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Zonificación', 'zoneIMG', resObj.fullInvoice, 'file');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Giro impresión', 'businessLinePrint', resObj.businessLinePrint, 'text');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Giro interno', 'businessLineIntern', resObj.businessLineIntern, 'text');

    resultContent.appendChild(field);

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

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Tipo de expedición', 'expeditionType', resObj.licenseExpeditionType, 'select');

    field.querySelector('select').innerHTML = `
    <option value="">Selecciona ...</option>
    <option value="1">Nueva</option>
    <option value="2">Renovación</option>
    `;

    field.querySelector('select').value = resObj.licenseExpeditionType;

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Plazo', 'term', resObj.licenseTerm, 'select');

    field.querySelector('select').innerHTML = `
    <option value="">Selecciona ...</option>
    <option value="1">Corto</option>
    <option value="2">Mediano</option>
    <option value="3">Largo</option>
    `;

    field.querySelector('select').value = resObj.licenseTerm;

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Vigencia', 'validity', resObj.licenseValidity, 'select');

    field.querySelector('select').innerHTML = `
    <option value="">Selecciona ...</option>
    <option value="1">6 Meses</option>
    <option value="2">12 Meses</option>
    `;

    field.querySelector('select').value = resObj.licenseValidity;

    resultContent.appendChild(field);

    field = document.createElement('div');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Fecha de solicitud', 'requestDate', resObj.requestDate, 'date');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Fecha de expedición', 'expeditionDate', resObj.expeditionDate, 'date');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Fecha de vencimiento', 'expirationDate', resObj.expirationDate, 'date');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Folio de pago', 'paymentInvoice', resObj.paymentInvoice, 'number');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Costo', 'cost', resObj.cost, 'number');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Descuento', 'discount', resObj.discount, 'number');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Monto pagado', 'paymentDone', resObj.paymentDone, 'number');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Inspector', 'inspector', resObj.inspector, 'text');

    resultContent.appendChild(field);

    if (resObj.licenseType == 1) {
        field = createResultField(resObj.id, 'Anexo', 'anexo', resObj.licenseSpecialData.anexo, 'text');

        resultContent.appendChild(field);
    }

    if (resObj.licenseType >= 2 && resObj.licenseType <=6) {
        field = createResultTextArea(resObj.id, 'Restricciones', 'restrictions', resObj.licenseSpecialData.restrictions);
        resultContent.appendChild(field);

        field = createResultTextArea(resObj.id, 'Condicionantes', 'conditions', resObj.licenseSpecialData.conditions.join('\n'));
        resultContent.appendChild(field);

        field = createResultField(resObj.id, 'Anexo', 'anexo', resObj.licenseSpecialData.anexo, 'text');

        resultContent.appendChild(field);
    }

    if (resObj.licenseType == 7) {
        field = createResultField(resObj.id, 'Anexo', 'anexo', resObj.licenseSpecialData.anexo, 'text');

        resultContent.appendChild(field);

        field = createResultField(resObj.id, 'Parcela', 'parcela', resObj.licenseSpecialData.parcela, 'text');

        resultContent.appendChild(field);

        field = createResultField(resObj.id, 'Numero de propiedad', 'propertyNo', resObj.licenseSpecialData.propertyNo, 'text');

        resultContent.appendChild(field);

        field = createResultField(resObj.id, 'Fecha de propiedad', 'propertyDate', resObj.licenseSpecialData.propertyDate, 'date');

        resultContent.appendChild(field);
    }

    field = document.createElement('img');
    field.setAttribute('alt', 'Zonificación');
    field.setAttribute('src', `/landUseStorage/${resObj.fullInvoice}/zone.png`);
    field.setAttribute('class', 'land-result-img');

    resultContent.appendChild(field);

    let newResult = createResult(
        resObj.id,
        createResultTop(resObj), 
        resultContent);

    target.appendChild(newResult);
}

function createPrintResultTop(id, invoice) {
    let top = document.createElement('div');
    let topLabel = document.createElement('p');
    let span;

    top.setAttribute('id', `result_top_${id}`);
    top.setAttribute('class', 'w-100 dis-flex flex-between flex-center-v padding-small bg-complementary-alpha border-round-top');

    topLabel.setAttribute('class', 'color-white txt-bold w-100 txt-center');
    topLabel.innerText = 'Folio: ';
    span = document.createElement('span');
    span.setAttribute('id', `result_invoice_${id}`);
    span.innerText = invoice.replaceAll('_', '/');
    topLabel.appendChild(span);

    top.appendChild(topLabel);

    return top;
}

function createPrintResultContent(id) {
    let content = document.createElement('div');
    content.setAttribute('id', `result_fields_${id}`);
    content.setAttribute('class', 'w-100 dis-grid template-4cols-nogap bg-secondary-alpha padding-small border-round-bottom');
    return content;
}

function createUrbanPrintResult(resObj, target) {
    let resultContent = createPrintResultContent(resObj.id);
    let field;

    field = createResultField(resObj.id, 'Nombre del solicitante', 'requestorName', resObj.requestorName, 'text');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Colonia/Asentamiento', 'colony', resObj.colony, 'text');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Fecha de Solicitud', 'requestDate', resObj.requestDate, 'date');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Fecha de expedición', 'expeditionDate', resObj.expeditionDate, 'date');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Fecha de entrega', 'deliveryDate', resObj.deliveryDate, 'date');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Monto autorizado', 'authorizedQuantity', resObj.authorizedQuantity, 'number');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Orden de cobro', 'collectionOrder', resObj.collectionOrder, 'number');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Folio y serie de factura', 'billInvoice', resObj.billInvoice, 'text');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Fecha de pago:', 'paymentDate', resObj.paymentDate, 'date');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Nombre de quien recibe', 'receiverName', resObj.receiverName, 'text');

    resultContent.appendChild(field);

    switch(resObj.licenseType) {
        case 1:
            field = createResultField(resObj.id, 'Calle', 'address', resObj.address, 'text');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Numero', 'number', resObj.address, 'text');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Clave catastral', 'catastralKey', resObj.catastralKey, 'text');

            resultContent.appendChild(field);

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

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Superficie total', 'surface', resObj.surfaceTotal, 'number');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Zonificación/División o subdivisión', 'zoneIMG', resObj.fullInvoice, 'file');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'P.C.U.', 'PCU', resObj.licenseSpecialData.PCU, 'text');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Plazo', 'term', resObj.licenseTerm, 'select');

            field.querySelector('select').innerHTML = `
            <option value="">Selecciona ...</option>
            <option value="1">Corto</option>
            <option value="2">Mediano</option>
            <option value="3">Largo</option>
            `;

            field.querySelector('select').value = resObj.licenseTerm;

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Vigencia', 'validity', resObj.licenseValidity, 'select');

            field.querySelector('select').innerHTML = `
            <option value="">Selecciona ...</option>
            <option value="1">6 Meses</option>
            <option value="2">12 Meses</option>
            `;

            field.querySelector('select').value = resObj.licenseValidity;

            resultContent.appendChild(field);
            break;
        case 2:
            field = createResultField(resObj.id, 'Representante', 'legalRepresentative', resObj.legalRepresentative, 'text');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Caracter del representante', 'representativeAs', resObj.licenseSpecialData.representativeAs, 'text');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Domicilio del solicitante', 'requestorAddress', resObj.licenseSpecialData.requestorAddress, 'text');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Domicilio del inmueble', 'buildingAddress', resObj.licenseSpecialData.buildingAddress, 'text');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Clave catastral', 'catastralKey', resObj.catastralKey, 'text');

            resultContent.appendChild(field);

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

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Superficie total', 'surface', resObj.surfaceTotal, 'number');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Zonificación/División o subdivisión', 'zoneIMG', resObj.fullInvoice, 'file');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Vigencia', 'validity', resObj.licenseValidity, 'select');

            field.querySelector('select').innerHTML = `
            <option value="">Selecciona ...</option>
            <option value="1">6 Meses</option>
            <option value="2">12 Meses</option>
            `;

            field.querySelector('select').value = resObj.licenseValidity;

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Porcentaje de ocupación', 'occupationPercent', resObj.licenseSpecialData.occupationPercent, 'number');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Superficie minima por lote', 'surfacePerLote', resObj.licenseSpecialData.surfacePerLote, 'number');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Altura maxima', 'maximumHeight', resObj.licenseSpecialData.maximumHeight, 'text');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Frente mínimo', 'minimalFront', resObj.licenseSpecialData.minimalFront, 'number');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Restricción frontal', 'frontalRestriction', resObj.licenseSpecialData.frontalRestriction, 'number');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Estacionamientos', 'parkingLots', resObj.licenseSpecialData.parkingLots, 'text');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Porcentaje de uso', 'usePercent', resObj.licenseSpecialData.usePercent, 'number');
            resultContent.appendChild(field);
            break;
        case 3:
            field = createResultField(resObj.id, 'Representante', 'legalRepresentative', resObj.legalRepresentative, 'text');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Caracter del representante', 'representativeAs', resObj.licenseSpecialData.representativeAs, 'text');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Domicilio del solicitante', 'requestorAddress', resObj.licenseSpecialData.requestorAddress, 'text');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Domicilio del inmueble', 'buildingAddress', resObj.licenseSpecialData.buildingAddress, 'text');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Clave catastral', 'catastralKey', resObj.catastralKey, 'text');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Superficie total', 'surface', resObj.surfaceTotal, 'number');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Zonificación/División o subdivisión', 'zoneIMG', resObj.fullInvoice, 'file');

            resultContent.appendChild(field);

            field = generateTableForm(resObj);
            resultContent.appendChild(field);

            field = document.createElement('div');
            field.setAttribute('class', 'field-span border-round preview-container');
            field.setAttribute('id', `tha-preview-${resObj.id}`);
            field.appendChild(generateTableFrom(resObj.licenseSpecialData.actualSituation));

            resultContent.appendChild(field);

            field = createResultTextArea(resObj.id, 'Resumen de autorización', 'authorizationResume', resObj.licenseSpecialData.authorizationResume);
            field.style.marginBottom = '10px';
            resultContent.appendChild(field);
            break;
        case 4:
            field = createResultField(resObj.id, 'Representante', 'legalRepresentative', resObj.legalRepresentative, 'text');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Caracter del representante', 'representativeAs', resObj.licenseSpecialData.representativeAs, 'text');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Domicilio del solicitante', 'requestorAddress', resObj.licenseSpecialData.requestorAddress, 'text');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Domicilio del inmueble', 'buildingAddress', resObj.licenseSpecialData.buildingAddress, 'text');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Clave catastral', 'catastralKey', resObj.catastralKey, 'text');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Superficie total', 'surface', resObj.surfaceTotal, 'number');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Zonificación/División o subdivisión', 'zoneIMG', resObj.fullInvoice, 'file');

            resultContent.appendChild(field);

            field = generateTableForm(resObj);
            resultContent.appendChild(field);

            field = document.createElement('div');
            field.setAttribute('class', 'field-span border-round preview-container');
            field.setAttribute('id', `tha-preview-${resObj.id}`);
            field.appendChild(generateTableFrom(resObj.licenseSpecialData.actualSituation));

            resultContent.appendChild(field);

            field = createResultTextArea(resObj.id, 'Resumen de autorización', 'authorizationResume', resObj.licenseSpecialData.authorizationResume);
            field.style.marginBottom = '10px';
            resultContent.appendChild(field);
            break;
        case 5:
            field = createResultField(resObj.id, 'Representante', 'legalRepresentative', resObj.legalRepresentative, 'text');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Caracter del representante', 'representativeAs', resObj.licenseSpecialData.representativeAs, 'text');

            resultContent.appendChild(field);
            
            field = createResultField(resObj.id, 'Domicilio del solicitante', 'requestorAddress', resObj.licenseSpecialData.requestorAddress, 'text');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Domicilio del inmueble', 'buildingAddress', resObj.licenseSpecialData.buildingAddress, 'text');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Clave catastral', 'catastralKey', resObj.catastralKey, 'text');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Superficie total', 'surface', resObj.surfaceTotal, 'number');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Tablas/Cuadros resumen', 'resumeTables', resObj.fullInvoice, 'file');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Vigencia', 'validity', resObj.licenseValidity, 'select');

            field.querySelector('select').innerHTML = `
            <option value="">Selecciona ...</option>
            <option value="1">6 Meses</option>
            <option value="2">12 Meses</option>
            `;

            field.querySelector('select').value = resObj.licenseValidity;

            resultContent.appendChild(field);

            field = createResultTextArea(resObj.id, 'Documentos', 'documents', resObj.licenseSpecialData.documents.join('\n'));
            resultContent.appendChild(field);

            field = createResultTextArea(resObj.id, 'Ubicación', 'location', resObj.licenseSpecialData.location.join('\n'));
            resultContent.appendChild(field);

            field = createResultTextArea(resObj.id, 'Integridad', 'integrity', resObj.licenseSpecialData.integrity);
            resultContent.appendChild(field);

            field = createResultTextArea(resObj.id, 'Condicionantes', 'conditions', resObj.licenseSpecialData.conditions.join('\n'));
            resultContent.appendChild(field);

            field = createResultTextArea(resObj.id, 'Uso autorizado', 'detailedUse', resObj.licenseSpecialData.detailedUse);
            resultContent.appendChild(field);

            break;
        case 6:
            field = createResultField(resObj.id, 'Representante', 'legalRepresentative', resObj.legalRepresentative, 'text');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Caracter del representante', 'representativeAs', resObj.licenseSpecialData.representativeAs, 'text');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Domicilio del solicitante', 'requestorAddress', resObj.licenseSpecialData.requestorAddress, 'text');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Domicilio del inmueble', 'buildingAddress', resObj.licenseSpecialData.buildingAddress, 'text');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Clave catastral', 'catastralKey', resObj.catastralKey, 'text');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Superficie total', 'surface', resObj.surfaceTotal, 'number');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Tablas/Cuadros resumen', 'resumeTables', resObj.fullInvoice, 'file');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Vigencia', 'validity', resObj.licenseValidity, 'select');

            field.querySelector('select').innerHTML = `
            <option value="">Selecciona ...</option>
            <option value="1">6 Meses</option>
            <option value="2">12 Meses</option>
            `;

            field.querySelector('select').value = resObj.licenseValidity;

            resultContent.appendChild(field);

            field = createResultTextArea(resObj.id, 'Constancia de Uso de Suelo', 'urbanCUS', resObj.licenseSpecialData.urbanCUS);
            resultContent.appendChild(field);

            field = createResultTextArea(resObj.id, 'Licencia de Uso de Suelo', 'urbanLUS', resObj.licenseSpecialData.urbanLUS);
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Porcentaje de uso', 'usePercent', resObj.licenseSpecialData.usePercent, 'number');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Superficie minima por lote', 'surfacePerLote', resObj.licenseSpecialData.surfacePerLote, 'number');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Altura maxima', 'maximumHeight', resObj.licenseSpecialData.maximumHeight, 'text');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Frente mínimo', 'minimalFront', resObj.licenseSpecialData.minimalFront, 'number');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Restricción frontal', 'frontalRestriction', resObj.licenseSpecialData.frontalRestriction, 'number');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Estacionamientos', 'parkingLots', resObj.licenseSpecialData.parkingLots, 'text');
            resultContent.appendChild(field);

            field = createResultTextArea(resObj.id, 'Ubicación', 'location', resObj.licenseSpecialData.location.join('\n'));
            resultContent.appendChild(field);

            field = createResultTextArea(resObj.id, 'Documentos', 'documents', resObj.licenseSpecialData.documents.join('\n'));
            resultContent.appendChild(field);

            field = createResultTextArea(resObj.id, 'Condicionantes', 'conditions', resObj.licenseSpecialData.conditions.join('\n'));
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Lotes Totales', 'habitacionalLotes', resObj.licenseSpecialData.habitacionalLotes, 'text');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Manzanas Totales', 'totalManzanas', resObj.licenseSpecialData.totalManzanas, 'text');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Superficie de donación', 'totalSurface', resObj.licenseSpecialData.totalSurface, 'number');
            resultContent.appendChild(field);
            break;
        case 7:
            field = createResultField(resObj.id, 'Representante', 'legalRepresentative', resObj.legalRepresentative, 'text');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Caracter del representante', 'representativeAs', resObj.licenseSpecialData.representativeAs, 'text');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Domicilio del solicitante', 'requestorAddress', resObj.licenseSpecialData.requestorAddress, 'text');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Domicilio del inmueble', 'buildingAddress', resObj.licenseSpecialData.buildingAddress, 'text');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Tablas/Cuadros resumen', 'resumeTables', resObj.fullInvoice, 'file');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Relotificación', 'totalRelotification', resObj.licenseSpecialData.totalRelotification, 'text');
            resultContent.appendChild(field);

            field = createResultTextArea(resObj.id, 'Relotificación para', 'lotes', resObj.licenseSpecialData.lotes.join('\n'));
            resultContent.appendChild(field);

            field = createResultTextArea(resObj.id, 'Documentos', 'documents', resObj.licenseSpecialData.documents.join('\n'));
            resultContent.appendChild(field);

            field = createResultTextArea(resObj.id, 'Ubicación', 'location', resObj.licenseSpecialData.location.join('\n'));
            resultContent.appendChild(field);

            field = createResultTextArea(resObj.id, 'Condicionantes', 'conditions', resObj.licenseSpecialData.conditions.join('\n'));
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Folio previo', 'previousInvoice', resObj.licenseSpecialData.previousInvoice, 'text');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Fecha de folio previo', 'previousInvoiceDat', resObj.licenseSpecialData.previousInvoiceDate, 'date');
            resultContent.appendChild(field);

            field = createResultTextArea(resObj.id, 'Relotificación resultante', 'resultRelotification', resObj.licenseSpecialData.resultRelotification.join('\n'));
            resultContent.appendChild(field);

            field = createResultTextArea(resObj.id, 'Uso autorizado', 'detailedUse', resObj.licenseSpecialData.detailedUse);
            resultContent.appendChild(field);

            break;
        case 8:
            field = createResultField(resObj.id, 'Representante', 'legalRepresentative', resObj.legalRepresentative, 'text');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Caracter del representante', 'representativeAs', resObj.licenseSpecialData.representativeAs, 'text');

            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Domicilio del solicitante', 'requestorAddress', resObj.licenseSpecialData.requestorAddress, 'text');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Domicilio del inmueble', 'buildingAddress', resObj.licenseSpecialData.buildingAddress, 'text');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Tablas/Cuadros resumen', 'resumeTables', resObj.fullInvoice, 'file');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Viviendas', 'households', resObj.licenseSpecialData.households, 'text');
            resultContent.appendChild(field);

            field = createResultTextArea(resObj.id, 'Documentos', 'documents', resObj.licenseSpecialData.documents.join('\n'));
            resultContent.appendChild(field);

            field = createResultTextArea(resObj.id, 'Lotes', 'lotes', resObj.licenseSpecialData.lotes.join('\n'));
            resultContent.appendChild(field);

            field = createResultTextArea(resObj.id, 'Manzanas', 'manzanas', resObj.licenseSpecialData.manzanas.join('\n'));
            resultContent.appendChild(field);

            field = createResultTextArea(resObj.id, 'Condicionantes', 'conditions', resObj.licenseSpecialData.conditions.join('\n'));
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Superficie privativa', 'privateSurface', resObj.licenseSpecialData.privateSurface, 'number');
            resultContent.appendChild(field);

            field = createResultField(resObj.id, 'Superficie común', 'commonSurface', resObj.licenseSpecialData.commonSurface, 'number');
            resultContent.appendChild(field);
            break;
    }

    if(resObj.licenseType <= 4) {
        field = document.createElement('img');
        field.setAttribute('alt', 'Zonificación');
        field.setAttribute('src', `/urbanStorage/${resObj.fullInvoice}/zone.png?${new Date().getTime()}`);
        field.setAttribute('class', 'urban-print-result-img ');

        resultContent.appendChild(field);
    }

    let newResult = createResult(
        resObj.id,
        createPrintResultTop(resObj.id, resObj.fullInvoice), 
        resultContent);

    target.appendChild(newResult);
}

function createLandPrintResult(resObj, target) {
    let resultContent = createPrintResultContent(resObj.id);
    let field;

    field = createResultField(resObj.id, 'Nombre del solicitante', 'requestorName', resObj.requestorName, 'text');

    resultContent.appendChild(field);
    
    field = createResultField(resObj.id, 'En atención', 'attentionName', resObj.attentionName, 'text');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Calle', 'address', resObj.address, 'text');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Numero', 'number', resObj.number, 'text');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Colonia', 'colony', resObj.colony, 'text');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Teléfono de contacto', 'contactPhone', resObj.contactPhone, 'number');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Clave castastral', 'catastralKey', resObj.catastralKey, 'number');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Superficie de aprovechamiento', 'surface', resObj.surfaceTotal, 'number');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Georeferencia', 'georeference', resObj.geoReference, 'text');

    resultContent.appendChild(field);

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

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Zonificación', 'zoneIMG', resObj.fullInvoice, 'file');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Giro impresión', 'businessLinePrint', resObj.businessLinePrint, 'text');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Giro interno', 'businessLineIntern', resObj.businessLineIntern, 'text');

    resultContent.appendChild(field);

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

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Tipo de expedición', 'expeditionType', resObj.licenseExpeditionType, 'select');

    field.querySelector('select').innerHTML = `
    <option value="">Selecciona ...</option>
    <option value="1">Nueva</option>
    <option value="2">Renovación</option>
    `;

    field.querySelector('select').value = resObj.licenseExpeditionType;

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Plazo', 'term', resObj.licenseTerm, 'select');

    field.querySelector('select').innerHTML = `
    <option value="">Selecciona ...</option>
    <option value="1">Corto</option>
    <option value="2">Mediano</option>
    <option value="3">Largo</option>
    `;

    field.querySelector('select').value = resObj.licenseTerm;

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Vigencia', 'validity', resObj.licenseValidity, 'select');

    field.querySelector('select').innerHTML = `
    <option value="">Selecciona ...</option>
    <option value="1">6 Meses</option>
    <option value="2">12 Meses</option>
    `;

    field.querySelector('select').value = resObj.licenseValidity;

    resultContent.appendChild(field);

    field = document.createElement('div');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Fecha de solicitud', 'requestDate', resObj.requestDate, 'date');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Fecha de expedición', 'expeditionDate', resObj.expeditionDate, 'date');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Fecha de vencimiento', 'expirationDate', resObj.expirationDate, 'date');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Folio de pago', 'paymentInvoice', resObj.paymentInvoice, 'number');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Costo', 'cost', resObj.cost, 'number');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Descuento', 'discount', resObj.discount, 'number');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Monto pagado', 'paymentDone', resObj.paymentDone, 'number');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Inspector', 'inspector', resObj.inspector, 'text');

    resultContent.appendChild(field);

    if (resObj.licenseType == 1) {
        field = createResultField(resObj.id, 'Anexo', 'anexo', resObj.licenseSpecialData.anexo, 'text');

        resultContent.appendChild(field);
    }

    if (resObj.licenseType >= 2 && resObj.licenseType <=6) {
        field = createResultTextArea(resObj.id, 'Restricciones', 'restrictions', resObj.licenseSpecialData.restrictions);
        resultContent.appendChild(field);

        field = createResultTextArea(resObj.id, 'Condicionantes', 'conditions', resObj.licenseSpecialData.conditions.join('\n'));
        resultContent.appendChild(field);

        field = createResultField(resObj.id, 'Anexo', 'anexo', resObj.licenseSpecialData.anexo, 'text');

        resultContent.appendChild(field);
    }

    if (resObj.licenseType == 7) {
        field = createResultField(resObj.id, 'Anexo', 'anexo', resObj.licenseSpecialData.anexo, 'text');

        resultContent.appendChild(field);

        field = createResultField(resObj.id, 'Parcela', 'parcela', resObj.licenseSpecialData.parcela, 'text');

        resultContent.appendChild(field);

        field = createResultField(resObj.id, 'Numero de propiedad', 'propertyNo', resObj.licenseSpecialData.propertyNo, 'text');

        resultContent.appendChild(field);

        field = createResultField(resObj.id, 'Fecha de propiedad', 'propertyDate', resObj.licenseSpecialData.propertyDate, 'date');

        resultContent.appendChild(field);
    }

    field = document.createElement('img');
    field.setAttribute('alt', 'Zonificación');
    field.setAttribute('src', `/landUseStorage/${resObj.fullInvoice}/zone.png`);
    field.setAttribute('class', 'land-result-img');

    resultContent.appendChild(field);

    let newResult = createResult(
        resObj.id,
        createPrintResultTop(resObj.id, resObj.fullInvoice), 
        resultContent);

    target.appendChild(newResult);
}

function generateTableForm(resObj) {
    let field = document.createElement('form');
    let label = document.createElement('span');
    let button = document.createElement('button');
    let input;
    let span;

    field.setAttribute('onsubmit', `updateResultTables(this, ${resObj.id}); return false`);
    field.setAttribute('class', 'field-span table-result')

    label.innerText = 'Situación actual/Subdivisión o fusión que se autoriza:';
    label.setAttribute('class', 'dis-flex flex-wrap color-primary')

    input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', `actualSituation`);
    input.setAttribute('id', `current_actual_situation_${resObj.id}`)
    input.setAttribute('value', JSON.stringify(resObj.licenseSpecialData.actualSituation));

    label.appendChild(input);

    input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', `actualAuthorizedFS`);
    input.setAttribute('id', `current_actual_authorized_fs_${resObj.id}`)
    input.setAttribute('value', JSON.stringify(resObj.licenseSpecialData.actualAuthorizedFS));

    label.appendChild(input);

    span = document.createElement('span');
    span.setAttribute('class', 'w-100');

    label.appendChild(span);

    input = document.createElement('select');
    input.setAttribute('class', 'w-35 input input-interface input-round-left');
    input.setAttribute('onchange', `selector(${resObj.id})`);
    input.innerHTML = `
    <option value="1">Situación Actual</option>
    <option value="2">Subdivisión o fusión que se autoriza</option>`;
    input.setAttribute('id',`editor_table_${resObj.id}`);

    label.appendChild(input);

    //colums
    span = document.createElement('span');
    span.setAttribute('class', 'text-like-field');
    span.innerText = 'Numero de filas: ';

    label.appendChild(span);

    input = document.createElement('input');
    input.setAttribute('class', 'w-10 input input-interface');
    input.setAttribute('type','number');
    input.setAttribute('id',`editor_rows_${resObj.id}`);
    input.value = resObj.licenseSpecialData.actualSituation.length;
    input.setAttribute('onchange', `defineTotalRows(${resObj.id})`);

    label.appendChild(input);

    span = document.createElement('span');
    span.setAttribute('class', 'text-like-field');
    span.innerText = 'Fila objetivo: ';

    label.appendChild(span);

    input = document.createElement('input');
    input.setAttribute('class', 'w-10 input input-interface input-round-right');
    input.setAttribute('type','number');
    input.setAttribute('id',`editor_rowT_${resObj.id}`);
    input.setAttribute('oninput', `checkTargetRow(${resObj.id})`);
    input.value = 1;

    label.appendChild(input);

    span = document.createElement('span');
    span.setAttribute('class', 'w-100 margin-bottom-small');

    label.appendChild(span);

    span = document.createElement('span');
    span.innerText = 'Descripción:';
    span.setAttribute('class', 'w-10');

    label.appendChild(span);

    span = document.createElement('span');
    span.innerText = 'Superficie:';
    span.setAttribute('class', 'w-10');

    label.appendChild(span);

    span = document.createElement('span');
    span.innerText = 'Orientación:';
    span.setAttribute('class', 'w-15');

    label.appendChild(span);

    span = document.createElement('span');
    span.innerText = 'Medidas:';
    span.setAttribute('class', 'w-10');

    label.appendChild(span);

    span = document.createElement('span');
    span.innerText = 'Colindancias:';
    span.setAttribute('class', 'w-55');

    label.appendChild(span);

    //inputs
    input = document.createElement('input');
    input.style.borderRadius = '15px 0 0 0'
    input.setAttribute('class', 'input input-interface input-textarea-table w-10');
    input.setAttribute('id', `table_editor_description_${resObj.id}`)
    input.value = resObj.licenseSpecialData.actualSituation[0].description;
    input.setAttribute('oninput', `updateDescription(${resObj.id}, this.value)`);

    label.appendChild(input);

    input = document.createElement('input');
    input.setAttribute('class', 'input input-interface input-textarea-table w-10');
    input.setAttribute('id', `table_editor_surface_${resObj.id}`)
    input.value = resObj.licenseSpecialData.actualSituation[0].surface;
    input.setAttribute('oninput', `updateSurface(${resObj.id}, this.value)`);

    label.appendChild(input);

    input = document.createElement('textarea');
    input.setAttribute('class', 'input input-interface input-textarea-table w-15');
    input.setAttribute('id', `table_editor_distribution_${resObj.id}`)
    input.value = resObj.licenseSpecialData.actualSituation[0].table.distribution.join('\n');
    input.setAttribute('oninput', `updateDistribution(${resObj.id}, this.value)`);

    label.appendChild(input);

    input = document.createElement('textarea');
    input.setAttribute('class', 'input input-interface input-textarea-table w-10');
    input.setAttribute('id', `table_editor_measures_${resObj.id}`)
    input.value = resObj.licenseSpecialData.actualSituation[0].table.measures.join('\n');
    input.setAttribute('oninput', `updateMeasures(${resObj.id}, this.value)`);

    label.appendChild(input);

    input = document.createElement('textarea');
    input.style.borderRadius = '0 15px 0 0'
    input.setAttribute('class', 'input input-interface input-textarea-table w-55');
    input.setAttribute('id', `table_editor_adjoining_${resObj.id}`)
    input.value = resObj.licenseSpecialData.actualSituation[0].table.adjoining.join('\n');
    input.setAttribute('oninput', `updateAdjoining(${resObj.id}, this.value)`);

    label.appendChild(input);

    button.setAttribute('class', 'bi-floppy input-bottom-save w-100');

    label.appendChild(button);

    field.appendChild(label);

    return field;
}

function selector(target) {
    let table = document.querySelector(`#editor_table_${target}`);
    let rows = document.querySelector(`#editor_rows_${target}`);
    let row = document.querySelector(`#editor_rowT_${target}`);

    let currentActualSituation = JSON.parse(document.querySelector(`#current_actual_situation_${target}`).value);
    let currentActualAuthorizedFS = JSON.parse(document.querySelector(`#current_actual_authorized_fs_${target}`).value);

    row.value = 1;

    if (table.value  == 1) {
        rows.value = currentActualSituation.length;
    } else if (table.value  == 2) {
        rows.value = currentActualAuthorizedFS.length;
    }

    updatePreview(target);
    checkTargetRow(target);
}

function updatePreview(target) {
    let preview = document.querySelector(`#tha-preview-${target}`);
    let table = document.querySelector(`#editor_table_${target}`);

    let currentActualSituation = JSON.parse(document.querySelector(`#current_actual_situation_${target}`).value);
    let currentActualAuthorizedFS = JSON.parse(document.querySelector(`#current_actual_authorized_fs_${target}`).value);

    if (table.value  == 1) {
        preview.innerHTML = '';
        preview.appendChild(generateTableFrom(currentActualSituation));
    } else if (table.value  == 2) {
        preview.innerHTML = '';
        preview.appendChild(generateTableFrom(currentActualAuthorizedFS));
    }
}

function updateDistribution(target, value) {
    let table = document.querySelector(`#editor_table_${target}`);
    let row = document.querySelector(`#editor_rowT_${target}`).value;

    let currentActualSituation = JSON.parse(document.querySelector(`#current_actual_situation_${target}`).value);
    let currentActualAuthorizedFS = JSON.parse(document.querySelector(`#current_actual_authorized_fs_${target}`).value);

    if (table.value  == 1) {
        currentActualSituation[row - 1].table.distribution = value.split('\n');
    } else if (table.value  == 2) {
        currentActualAuthorizedFS[row - 1].table.distribution = value.split('\n');
    }

    document.querySelector(`#current_actual_situation_${target}`).value = JSON.stringify(currentActualSituation);
    document.querySelector(`#current_actual_authorized_fs_${target}`).value = JSON.stringify(currentActualAuthorizedFS);

    updatePreview(target);
}

function updateMeasures(target, value) {
    let table = document.querySelector(`#editor_table_${target}`);
    let row = document.querySelector(`#editor_rowT_${target}`).value;
    let currentActualSituation = JSON.parse(document.querySelector(`#current_actual_situation_${target}`).value);
    let currentActualAuthorizedFS = JSON.parse(document.querySelector(`#current_actual_authorized_fs_${target}`).value);

    if (table.value  == 1) {
        currentActualSituation[row - 1].table.measures = value.split('\n');
    } else if (table.value  == 2) {
        currentActualAuthorizedFS[row - 1].table.measures = value.split('\n');
    }

    document.querySelector(`#current_actual_situation_${target}`).value = JSON.stringify(currentActualSituation);
    document.querySelector(`#current_actual_authorized_fs_${target}`).value = JSON.stringify(currentActualAuthorizedFS);

    updatePreview(target);
}

function updateAdjoining(target, value) {
    let table = document.querySelector(`#editor_table_${target}`);
    let row = document.querySelector(`#editor_rowT_${target}`).value;

    let currentActualSituation = JSON.parse(document.querySelector(`#current_actual_situation_${target}`).value);
    let currentActualAuthorizedFS = JSON.parse(document.querySelector(`#current_actual_authorized_fs_${target}`).value);

    if (table.value  == 1) {
        currentActualSituation[row - 1].table.adjoining = value.split('\n');
    } else if (table.value  == 2) {
        currentActualAuthorizedFS[row - 1].table.adjoining = value.split('\n');
    }

    document.querySelector(`#current_actual_situation_${target}`).value = JSON.stringify(currentActualSituation);
    document.querySelector(`#current_actual_authorized_fs_${target}`).value = JSON.stringify(currentActualAuthorizedFS);

    updatePreview(target);
}

function updateDescription(target, value) {
    let table = document.querySelector(`#editor_table_${target}`);
    let row = document.querySelector(`#editor_rowT_${target}`).value;

    let currentActualSituation = JSON.parse(document.querySelector(`#current_actual_situation_${target}`).value);
    let currentActualAuthorizedFS = JSON.parse(document.querySelector(`#current_actual_authorized_fs_${target}`).value);

    if (table.value  == 1) {
        currentActualSituation[row - 1].description = value;
    } else if (table.value  == 2) {
        currentActualAuthorizedFS[row - 1].description = value;
    }

    document.querySelector(`#current_actual_situation_${target}`).value = JSON.stringify(currentActualSituation);
    document.querySelector(`#current_actual_authorized_fs_${target}`).value = JSON.stringify(currentActualAuthorizedFS);

    updatePreview(target);
}

function updateSurface(target, value) {
    let table = document.querySelector(`#editor_table_${target}`);
    let row = document.querySelector(`#editor_rowT_${target}`).value;

    let currentActualSituation = JSON.parse(document.querySelector(`#current_actual_situation_${target}`).value);
    let currentActualAuthorizedFS = JSON.parse(document.querySelector(`#current_actual_authorized_fs_${target}`).value);

    if (table.value  == 1) {
        currentActualSituation[row - 1].surface = value;
    } else if (table.value  == 2) {
        currentActualAuthorizedFS[row - 1].surface = value;
    }

    document.querySelector(`#current_actual_situation_${target}`).value = JSON.stringify(currentActualSituation);
    document.querySelector(`#current_actual_authorized_fs_${target}`).value = JSON.stringify(currentActualAuthorizedFS);

    updatePreview(target);
}

function checkTargetRow(target) {
    let table = document.querySelector(`#editor_table_${target}`);
    let row = document.querySelector(`#editor_rowT_${target}`);

    let currentActualSituation = JSON.parse(document.querySelector(`#current_actual_situation_${target}`).value);
    let currentActualAuthorizedFS = JSON.parse(document.querySelector(`#current_actual_authorized_fs_${target}`).value);

    if (table.value  == 1) {
        if(row.value > currentActualSituation.length) {
            row.value = 1
        } else if (row.value < 1) {
            row.value = currentActualSituation.length
        }
    } else {
        if(row.value > currentActualAuthorizedFS.length) {
            row.value = 1
        } else if (row.value < 1) {
            row.value = currentActualAuthorizedFS.length
        }
    }
    updateRowFields(target);
}

function defineTotalRows(target) {
    let table = document.querySelector(`#editor_table_${target}`);
    let row = document.querySelector(`#editor_rows_${target}`);
    let rowT = document.querySelector(`#editor_rowT_${target}`);

    let currentActualSituation = JSON.parse(document.querySelector(`#current_actual_situation_${target}`).value);
    let currentActualAuthorizedFS = JSON.parse(document.querySelector(`#current_actual_authorized_fs_${target}`).value);

    if (table.value  == 1) {
        if(row.value <= 0) {
            row.value = 1;
            return;
        }

        if(row.value > currentActualSituation.length) {
            currentActualSituation.length = row.value 
            for (let i = 0; i < currentActualSituation.length; i++) {
                if(currentActualSituation[i] == undefined) {
                    currentActualSituation[i] = {
                        "description": `Fila ${i+1}*`,
                        "surface": "########",
                        "table": {
                            "distribution": ["Oeste","Noroeste","Norte", "Noreste", "Este", "Sureste","Sur", "Suroeste"],
                            "measures": ["15.00 m","15.00 m","15.00 m", "15.00 m", "15.00 m", "15.00 m","15.00 m", "15.00 m"],
                            "adjoining": ["LOTE 8","LOTE 6","LOTE 50", "CALLE PORVENIR", "LOTE 8", "LOTE 6","LOTE 50", "CALLE PORVENIR"]
                        }
                    }
                }
            }
        } else if (row.value < currentActualSituation.length) {
            currentActualSituation = currentActualSituation.slice(0, row.value);
        }

        rowT.value = currentActualSituation.length;

    } else if (table.value  == 2) {
        if(row.value <= 0) {
            row.value = 1;
            return;
        }

        if(row.value > currentActualAuthorizedFS.length) {
            currentActualAuthorizedFS.length = row.value 
            for (let i = 0; i < currentActualAuthorizedFS.length; i++) {
                if(currentActualAuthorizedFS[i] == undefined) {
                    currentActualAuthorizedFS[i] = {
                        "description": `Fila ${i+1}*`,
                        "surface": "########",
                        "table": {
                            "distribution": ["Oeste","Noroeste","Norte", "Noreste", "Este", "Sureste","Sur", "Suroeste"],
                            "measures": ["15.00 m","15.00 m","15.00 m", "15.00 m", "15.00 m", "15.00 m","15.00 m", "15.00 m"],
                            "adjoining": ["LOTE 8","LOTE 6","LOTE 50", "CALLE PORVENIR", "LOTE 8", "LOTE 6","LOTE 50", "CALLE PORVENIR"]
                        }
                    }
                }
            }
        } else if (row.value < currentActualAuthorizedFS.length) {
            currentActualAuthorizedFS = currentActualAuthorizedFS.slice(0, row.value);
        }

        rowT.value = currentActualAuthorizedFS.length;
    }

    document.querySelector(`#current_actual_situation_${target}`).value = JSON.stringify(currentActualSituation);
    document.querySelector(`#current_actual_authorized_fs_${target}`).value = JSON.stringify(currentActualAuthorizedFS);

    updatePreview(target);
}

function updateRowFields(target) {
    let table = document.querySelector(`#editor_table_${target}`);
    let row = document.querySelector(`#editor_rowT_${target}`).value;

    let currentActualSituation = JSON.parse(document.querySelector(`#current_actual_situation_${target}`).value);
    let currentActualAuthorizedFS = JSON.parse(document.querySelector(`#current_actual_authorized_fs_${target}`).value);

    if (table.value  == 1) {
        document.querySelector(`#table_editor_description_${target}`).value = currentActualSituation[row-1].description;
        document.querySelector(`#table_editor_surface_${target}`).value = currentActualSituation[row-1].surface;
        document.querySelector(`#table_editor_distribution_${target}`).value = currentActualSituation[row-1].table.distribution.join('\n');
        document.querySelector(`#table_editor_measures_${target}`).value = currentActualSituation[row-1].table.measures.join('\n');
        document.querySelector(`#table_editor_adjoining_${target}`).value = currentActualSituation[row-1].table.adjoining.join('\n');
    } else if (table.value  == 2) {
        document.querySelector(`#table_editor_description_${target}`).value = currentActualAuthorizedFS[row-1].description;
        document.querySelector(`#table_editor_surface_${target}`).value = currentActualAuthorizedFS[row-1].surface;
        document.querySelector(`#table_editor_distribution_${target}`).value = currentActualAuthorizedFS[row-1].table.distribution.join('\n');
        document.querySelector(`#table_editor_measures_${target}`).value = currentActualAuthorizedFS[row-1].table.measures.join('\n');
        document.querySelector(`#table_editor_adjoining_${target}`).value = currentActualAuthorizedFS[row-1].table.adjoining.join('\n');
    }

    document.querySelector(`#current_actual_situation_${target}`).value = JSON.stringify(currentActualSituation);
    document.querySelector(`#current_actual_authorized_fs_${target}`).value = JSON.stringify(currentActualAuthorizedFS);
}

function generateTableFrom(obj) {
    let table = document.createElement('table');
    table.setAttribute('class', 'preview-table')

    let headerRow = document.createElement('tr');
    let headers = ['Descripción', 'Superficie', 'Medidas', 'Colindancias'];
    headers.forEach(headerText => {
        let header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });
    table.appendChild(headerRow);

    obj.forEach(item => {
        let row = document.createElement('tr');

        let descriptionCell = document.createElement('td');
        descriptionCell.textContent = item.description;
        descriptionCell.rowSpan = item.table.distribution.length;
        row.appendChild(descriptionCell);

        let surfaceCell = document.createElement('td');
        surfaceCell.textContent = item.surface;
        surfaceCell.rowSpan = item.table.distribution.length;
        row.appendChild(surfaceCell);

        let firstMeasure = document.createElement('td');
        firstMeasure.textContent = item.table.distribution[0];
        row.appendChild(firstMeasure);

        let firstAdjoining = document.createElement('td');
        firstAdjoining.textContent = item.table.adjoining[0];
        row.appendChild(firstAdjoining);
        
        table.appendChild(row);

        for (let i = 1; i < item.table.distribution.length; i++) {
            let row = document.createElement('tr');

            let distributionCell = document.createElement('td');
            distributionCell.textContent = `${item.table.distribution[i]} ${item.table.measures[i]}`;
            distributionCell.style.whiteSpace = 'pre-wrap';
            row.appendChild(distributionCell);

            let adjoiningCell = document.createElement('td');
            adjoiningCell.textContent = item.table.adjoining[i];
            adjoiningCell.style.whiteSpace = 'pre-wrap';
            row.appendChild(adjoiningCell);

            table.appendChild(row);
        }
    });

    return table;
}
