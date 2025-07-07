function hideShow(id) {
    let resultTop = document.querySelector(`#result_top_${id}`);
    let resultDelete = document.querySelector(`#result_control_delete_${id}`);
    let resultPrint = document.querySelector(`#result_control_print_${id}`);
    let fields = document.querySelector(`#result_fields_${id}`);

    /*if (resultPrint) {
        resultPrint.classList.toggle("dis-none");
    }*/

    if (resultDelete) {
        resultDelete.classList.toggle("dis-none");
    }
    resultTop.classList.toggle("border-round");
    resultTop.classList.toggle("border-round-top");
    fields.classList.toggle("dis-none");
}

function hideShowPeriod(id, periodType) {
    let resultTop = document.querySelector(`#result_${periodType}_top_${id}`);
    let fields = document.querySelector(`#result_${periodType}_fields_${id}`);

    fields.classList.toggle("dis-none");
    resultTop.classList.toggle("border-round");
    resultTop.classList.toggle("border-round-top");
}

function createResult(id, top, fields) {
    let result = document.createElement('div');
    result.setAttribute('id', `result_${id}`);
    result.setAttribute('class', 'w-100');

    result.appendChild(top);
    result.appendChild(fields);

    return result;
}

function createResultNoUpdate(id, top) {
    let result = document.createElement('div');
    result.setAttribute('id', `result_${id}`);
    result.setAttribute('class', 'w-100');

    result.appendChild(top);

    return result;
}

function createResultTop(obj, isPrint, isLandUse) {
    let top = document.createElement('div');
    let topLabel = document.createElement('p');
    let topControls = document.createElement('div');
    let span;

    top.setAttribute('id', `result_top_${obj.id}`);
    top.setAttribute('class', `w-100 dis-flex flex-between flex-center-v padding-small bg-primary${isPrint ? ' border-round-top' : ' border-round controls'}`);

    topLabel.setAttribute('class', `color-white txt-bold w-100 txt-center ${isPrint ? '' : ' result-label'}`);

    if (!isPrint) {
        topLabel.setAttribute('onclick', `hideShow(${obj.id})`);
    }


    topLabel.innerText = 'Folio: ';
    span = document.createElement('span');
    span.setAttribute('id', `result_invoice_${obj.id}`);
    span.innerText = obj.fullInvoice.replaceAll('_', '/');
    topLabel.appendChild(span);

    top.appendChild(topLabel);

    topControls.setAttribute('class', 'w-15 dis-flex flex-evenly');

    span = document.createElement('a');
    span.setAttribute('id', `result_control_print_${obj.id}`);
    span.setAttribute('target', '_blank');
    span.setAttribute('href', `/api/${isLandUse ? 'landuse' : 'urban'}/PDF/t/${obj.licenseType}/i/${obj.invoice}/y/${obj.year}`);
    span.setAttribute('class', `bi-file-earmark-pdf txt-medium color-white${isPrint ? ' ' : ' dis-none '}result-control`);
    topControls.appendChild(span);

    if (isLandUse) {
        span = document.createElement('a');
        span.setAttribute('id', `result_control_approve_${obj.id}`);
        span.setAttribute('class', `${obj.approvalStatus ? 'bi-building-check' : "bi-building-dash"} txt-medium color-white result-control`);
        if (!obj.approvalStatus) {
            span.setAttribute('onclick', `approveLicense('${obj.id}', this)`)
        }
        topControls.appendChild(span);

        span = document.createElement('a');
        span.setAttribute('id', `result_control_active_${obj.id}`);

        if (obj.active) {
            span.setAttribute('class', `bi-unlock txt-medium color-white result-control`);
            //span.setAttribute('onclick', `lockLicense('${obj.id}', this)`)
        } else {
            span.setAttribute('class', `bi-lock txt-medium color-white result-control`);
            span.setAttribute('onclick', `unlockLicense('${obj.id}', this)`)
        }

        topControls.appendChild(span);
    }

    if(!isPrint) {
        span = document.createElement('span');
        span.setAttribute('id', `result_control_delete_${obj.id}`);
        span.setAttribute('onclick', `deleteResult('${obj.id}')`);
        span.setAttribute('class', 'bi-trash txt-medium color-white dis-none result-control');
        topControls.appendChild(span);
    }

    top.appendChild(topControls);

    return top;
}

function createResultTopNoUpdate(obj, isLandUse) {
    let top = document.createElement('div');
    let topLabel = document.createElement('p');
    let topControls = document.createElement('div');
    let span;
    top.setAttribute('class', `w-100 dis-flex flex-between flex-center-v padding-small bg-primary border-round`);

    topLabel.setAttribute('class', `color-white txt-bold w-100 txt-center  result-label`);
    topLabel.innerText = 'Folio: ';
    span = document.createElement('span');
    span.setAttribute('id', `result_invoice_${obj.id}`);
    span.innerText = obj.fullInvoice.replaceAll('_', '/');
    topLabel.appendChild(span);

    top.appendChild(topLabel);

    topControls.setAttribute('class', 'w-15 dis-flex flex-evenly');

    span = document.createElement('a');
    span.setAttribute('id', `result_control_pdf_${obj.id}`);
    span.setAttribute('target', '_blank');
    span.setAttribute('href', `/api/${isLandUse ? 'landuse' : 'urban'}/PDF/t/${obj.licenseType}/i/${obj.invoice}/y/${obj.year}`);
    span.setAttribute('class', `bi-file-earmark-pdf txt-medium color-white result-control`);

    topControls.appendChild(span);

    span = document.createElement('a');
    span.setAttribute('id', `result_control_edit_${obj.id}`);
    span.setAttribute('href', `/app/${isLandUse ? 'landPrint' : 'urbanPrint'}?type=${obj.licenseType}&invoice=${obj.invoice}&year=${obj.year}`);
    span.setAttribute('class', `bi-pencil-square txt-medium color-white result-control`);
    
    topControls.appendChild(span);

    top.appendChild(topControls);
    
    return top;
}

function createUserResultTop(obj) {
    let top = document.createElement('div');
    let topLabel = document.createElement('p');
    let topControls = document.createElement('div');
    let span;

    top.setAttribute('id', `result_top_${obj.id}`);
    top.setAttribute('class', `w-100 dis-flex flex-between flex-center-v padding-small bg-primary border-round controls`);

    topLabel.setAttribute('class', `${obj.locked ? 'bi-lock-fill ' : 'bi-unlock-fill '}color-white txt-bold w-100 txt-center result-label`);

    topLabel.setAttribute('onclick', `hideShow('${obj.id}')`);
    topLabel.setAttribute('id', `result_user_${obj.id}`);

    topLabel.innerText = `${obj.name} | ${obj.username}`;

    top.appendChild(topLabel);

    topControls.setAttribute('class', 'w-15 dis-flex flex-evenly');

    span = document.createElement('span');
    span.setAttribute('id', `result_control_delete_${obj.id}`);
    span.setAttribute('onclick', `deleteResult('${obj.id}')`);
    span.setAttribute('class', 'bi-trash txt-medium color-white dis-none result-control');
    topControls.appendChild(span);

    top.appendChild(topControls);

    return top;
}

function createResultPeriodTop(obj, periodType) {
    let top = document.createElement('div');
    let topLabel = document.createElement('p');
    let span;

    top.setAttribute('id', `result_${periodType}_top_${obj.id}`);
    top.setAttribute('class', `w-100 dis-flex flex-between flex-center-v padding-small bg-primary border-round controls`);

    topLabel.setAttribute('class', `color-white txt-bold w-100 txt-center result-label`);

    topLabel.setAttribute('onclick', `hideShowPeriod('${obj.id}', '${periodType}')`);

    topLabel.innerText = 'Periodo: ';
    span = document.createElement('span');
    span.setAttribute('id', `result_period_${periodType}_${obj.id}`);
    span.innerText = `${obj.administrationStart.replaceAll('-', '/')} - ${obj.administrationEnd.replaceAll('-', '/')}`;
    topLabel.appendChild(span);

    top.appendChild(topLabel);

    return top;
}

function createResultYearLegendTop(obj, periodType) {
    let top = document.createElement('div');
    let topLabel = document.createElement('p');
    let span;

    top.setAttribute('id', `result_${periodType}_top_${obj.id}`);
    top.setAttribute('class', `w-100 dis-flex flex-between flex-center-v padding-small bg-primary border-round controls`);

    topLabel.setAttribute('class', `color-white txt-bold w-100 txt-center result-label`);

    topLabel.setAttribute('onclick', `hideShowPeriod('${obj.id}', '${periodType}')`);

    topLabel.innerText = 'Leyenda: ';
    span = document.createElement('span');
    span.setAttribute('id', `result_period_${periodType}_${obj.id}`);
    span.innerText = `${obj.year}, ${obj.year_legend}`;
    topLabel.appendChild(span);

    top.appendChild(topLabel);

    return top;
}

function createLegacyTop(obj) {
    let top = document.createElement('div');
    let topLabel = document.createElement('p');
    let topControls = document.createElement('div');
    let span;

    top.setAttribute('id', `result_top_${obj.legacy_license_uuid}`);
    top.setAttribute('class', `w-100 dis-flex flex-between flex-center-v padding-small bg-primary border-round controls`);

    topLabel.setAttribute('class', `color-white txt-bold w-100 txt-center result-label`);

    topLabel.setAttribute('onclick', `hideShow('${obj.legacy_license_uuid}')`);
    topLabel.setAttribute('id', `result_user_${obj.legacy_license_uuid}`);

    topLabel.innerText = `${obj.licencia}`;

    top.appendChild(topLabel);

    topControls.setAttribute('class', 'w-15 dis-flex flex-evenly');

    span = document.createElement('a');
    span.setAttribute('id', `result_control_print_${obj.legacy_license_uuid}`);
    span.setAttribute('target', '_blank');
    span.setAttribute('href', `/legacyStorage/${obj.licencia.replaceAll('/','_')}.pdf`);
    span.setAttribute('class', 'bi-file-earmark-pdf txt-medium color-white result-control');
    topControls.appendChild(span);

    top.appendChild(topControls);

    return top;
}

function createResultContent(id, isPrint) {
    let content = document.createElement('div');
    content.setAttribute('id', `result_fields_${id}`);
    content.setAttribute('class', `w-100${isPrint ? ' ' : ' dis-none '}dis-flex flex-center flex-wrap border-all border-primary padding-medium border-round-bottom`);
    return content;
}

function createResultPeriodContent(id, periodType) {
    let content = document.createElement('div');
    content.setAttribute('id', `result_${periodType}_fields_${id}`);
    content.setAttribute('class', `w-100 dis-none dis-flex flex-center flex-wrap border-all border-primary padding-medium border-round-bottom`);
    return content;
}

function createResultField(id, tag, name, value, type) {
    let field = document.createElement('form');
    let label = document.createElement('label');
    let button = document.createElement('button');
    let input;
    let span;

    field.setAttribute('onsubmit', `updateResultField(this, '${id}'); return false`);
    field.setAttribute('class', 'w-30 margin-bottom-small');

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
            input.setAttribute('accept', '.png, .svg, .xhtml')
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

        if (type == 'checkbox') {
            input.checked = Boolean(value);
            
            input.removeAttribute('name');
            input.removeAttribute('value');
            input.removeAttribute('required');

            input.setAttribute('class', 'w-85 input input-interface');
            input.setAttribute('onchange', `document.getElementById('${name}_${id}').value = this.checked`);

            let trueInput = document.createElement('input');

            trueInput.setAttribute('type', 'hidden');
            trueInput.setAttribute('value', value);
            trueInput.setAttribute('name', name);
            trueInput.setAttribute('id', `${name}_${id}`);

            label.appendChild(trueInput);
        }
    }

    label.appendChild(input);

    button.setAttribute('class', 'bi-floppy input-side-save w-10');

    if (type ==  'file' || type == 'checkbox')
        button.style.borderRadius =  '15px';
    
    label.appendChild(button);

    field.appendChild(label);

    return field;
}

function createResultPeriodField(id, tag, name, value, type, url, periodType) {
    let field = document.createElement('form');
    let label = document.createElement('label');
    let button = document.createElement('button');
    let input;
    let span;

    field.setAttribute('onsubmit', `updateResultField(this, '${id}', '${url}', '${periodType}'); return false`);
    field.setAttribute('class', 'w-30 margin-bottom-small');

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

        if (type == 'checkbox') {
            input.checked = Boolean(value);
            
            input.removeAttribute('name');
            input.removeAttribute('value');
            input.removeAttribute('required');

            input.setAttribute('class', 'w-85');
            input.setAttribute('onchange', `document.getElementById('${name}_${id}').value = this.checked`);

            let trueInput = document.createElement('input');

            trueInput.setAttribute('type', 'hidden');
            trueInput.setAttribute('value', value);
            trueInput.setAttribute('name', name);
            trueInput.setAttribute('id', `${name}_${id}`);

            label.appendChild(trueInput);
        }
    }

    label.appendChild(input);

    button.setAttribute('class', 'bi-floppy input-side-save w-10');

    if (type ==  'file' || type == 'checkbox')
        button.style.borderRadius =  '15px';
    
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

    field.setAttribute('onsubmit', `updateResultField(this, '${id}'); return false`);
    field.setAttribute('class', 'w-100')

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
    input.setAttribute('class', 'input input-interface input-round-left input-textarea-result w-95');

    input.setAttribute('name', name);
    input.value = value;
    input.setAttribute('required','');

    label.appendChild(input);

    button.setAttribute('class', 'bi-floppy input-side-save ta w-5');

    label.appendChild(button);

    field.appendChild(label);

    return field;
}

function createCheckbox(name, value, checked = false) {
    const checkbox = document.createElement('input');
    const label = document.createElement('label');

    label.setAttribute('class', 'w-25 margin-vertical-small');

    checkbox.name = name;
    checkbox.value = value;
    checkbox.checked = checked;
    checkbox.type = 'checkbox';

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(` ${value}`));

    return label;
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
        firstMeasure.textContent = `${item.table.distribution[0]} ${item.table.measures[0]}`;
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

function resultNavigation(btn, resultId, groupNumber, totalGroups) {
    let navButtons = document.getElementById(`result_${resultId}_nav`);

    navButtons.querySelectorAll('li').forEach(e => {
        e.classList.remove('selected');
    });

    for (let i = 1; i <= totalGroups; i++) {
        document.getElementById(`result_${resultId}_group_${i}`).classList.add('dis-none');
    }

    document.getElementById(`result_${resultId}_group_${groupNumber}`).classList.remove('dis-none');
    btn.classList.add('selected');
}