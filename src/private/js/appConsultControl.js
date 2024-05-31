function hideShow(btn, id) {
    let resultTop = document.querySelector(`#result_top_${id}`);
    let resultSave = document.querySelector(`#result_control_save_${id}`);
    let resultDelete = document.querySelector(`#result_control_delete_${id}`);
    let fields = document.querySelector(`#result_fields_${id}`);
    btn.classList.toggle("bi-chevron-bar-up");
    btn.classList.toggle("bi-chevron-bar-down");
    resultTop.classList.toggle("border-round");
    resultTop.classList.toggle("border-round-top");
    resultSave.classList.toggle("dis-none");
    resultDelete.classList.toggle("dis-none");
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

function createResultTop(id, invoice) {
    let top = document.createElement('div');
    let topBtn = document.createElement('button');
    let topLabel = document.createElement('p');
    let topControls = document.createElement('div');
    let span;

    top.setAttribute('id', `result_top_${id}`);
    top.setAttribute('class', 'w-100 dis-flex flex-between flex-center-v padding-small bg-complementary-alpha border-round');

    topBtn.setAttribute('onclick', `hideShow(this, ${id})`);
    topBtn.setAttribute('class', 'bi-chevron-bar-down txt-medium color-primary result-control input-none');

    top.appendChild(topBtn);

    topLabel.setAttribute('class', 'color-white txt-bold');
    topLabel.innerText = 'Folio: ';
    span = document.createElement('span');
    span.setAttribute('id', `result_invoice_${id}`);
    span.innerText = invoice.replaceAll('_', '/');
    topLabel.appendChild(span);

    top.appendChild(topLabel);

    topControls.setAttribute('class', 'w-10 dis-flex flex-evenly');
    span = document.createElement('span');
    span.setAttribute('id', `result_control_save_${id}`);
    span.setAttribute('onclick', `updateResultFull(${id})`);
    span.setAttribute('class', 'bi-floppy txt-large color-primary dis-none result-control');
    topControls.appendChild(span);
    span = document.createElement('span');
    span.setAttribute('id', `result_control_delete_${id}`);
    span.setAttribute('onclick', `deleteResult(${id})`);
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
        } else {
            input.setAttribute('class', 'w-85 input input-interface input-round-left');
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

function createUrbanResult(resObj, target) {
    let resultContent = createResultContent(resObj.id);
    let field;

    field = createResultField(resObj.id, 'Nombre del solicitante', 'requestorName', resObj.requestorName, 'text');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Representante legal', 'legalRepresentative', resObj.legalRepresentative, 'text');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Fecha de Solicitud', 'requestDate', resObj.requestDate, 'date');

    resultContent.appendChild(field);
    
    field = createResultField(resObj.id, 'Colonia/Asentamiento', 'colony', resObj.colony, 'text');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Calle', 'address', resObj.address, 'text');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Clave catastral', 'catastralKey', resObj.catastralKey, 'number');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Superficie de aprovechamiento', 'surface', resObj.surfaceTotal, 'text');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Zonificación', 'zoneIMG', resObj.zoneImage, 'file');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Zona', 'zone', resObj.licenseZone, 'select');

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

    field = createResultField(resObj.id, 'Fecha de expedición', 'expeditionDate', resObj.expeditionDate, 'date');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Orden de cobro', 'collectionOrde', resObj.collectionOrder, 'number');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Fecha de pago:', 'paymentDate', resObj.paymentDate, 'date');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Folio y serie de factura', 'billInvoice', resObj.billInvoice, 'number');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Monto autorizado', 'authorizedQuantity', resObj.authorizedquantity, 'number');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Fecha de entrega', 'deliveryDate', resObj.deliveryDate, 'date');

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Nombre de quien recibe', 'receiverName', resObj.receiverName, 'text');

    resultContent.appendChild(field);

    field = document.createElement('img');
    field.setAttribute('alt', 'Zonificación');
    field.setAttribute('src', `/urbanStorage/${resObj.zoneImage}`);
    field.setAttribute('class', 'urban-result-img');

    resultContent.appendChild(field);

    let newResult = createResult(
        resObj.id,
        createResultTop(resObj.id, resObj.fullInvoice), 
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

    field = createResultField(resObj.id, 'Superficie de aprovechamiento', 'surface', resObj.surfaceTotal, 'text');

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

    field = createResultField(resObj.id, 'Zonificación', 'zoneIMG', resObj.zoneImage, 'file');

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
    `;

    field.querySelector('select').value = resObj.licenseTerm;

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Vigencia', 'validity', resObj.licenseValidity, 'select');

    field.querySelector('select').innerHTML = `
    <option value="">Selecciona ...</option>
    <option value="1">12 Meses</option>
    <option value="2">6 Meses</option>
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

    field = document.createElement('img');
    field.setAttribute('alt', 'Zonificación');
    field.setAttribute('src', `/landUseStorage/${resObj.zoneImage}`);
    field.setAttribute('class', 'land-result-img');

    resultContent.appendChild(field);

    let newResult = createResult(
        resObj.id,
        createResultTop(resObj.id, resObj.fullInvoice), 
        resultContent);

    target.appendChild(newResult);
}