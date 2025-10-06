const consultForm = document.getElementById('consultant_form');
const consultFormFiltered = document.getElementById('consultant_filtered');
const results = document.getElementById('results_container');

consultForm.addEventListener('submit', async event => {
    event.preventDefault();

    const formData =  new FormData(consultForm);

    const data = Object.fromEntries(formData);

    const { type, invoice, year } = data;

    const res = await fetch(`/api/consultant/t/${type}/i/${invoice}/y/${year}`, {
        method: 'GET',
        credentials: 'include'
    });

    const response = await res.json();

    if (!res.ok) {
        alert(response.msg);
        return;
    }

    const url = new URL(window.location.href);
    url.searchParams.set("type", type);
    url.searchParams.set("invoice", invoice);
    url.searchParams.set("year", year);
    window.history.replaceState({}, '', url);

    results.innerHTML = '';

    for (const license of response.licenses) {
        createLegacyResult(license, results, response.legacy);
    }
});

consultFormFiltered.addEventListener('submit', async event => {
    event.preventDefault();

    const formData =  new FormData(consultFormFiltered);

    const data = Object.fromEntries(formData);

    const params = new URLSearchParams();

    let paramCount = 0;

    for (const key in data) {
        if (data[key]) {
            params.append(key, data[key]);
            paramCount++;
        }
    }

    if (paramCount < 2) {
        alert("Necesitas proveer mas datos de búsqueda ademas del año");
        return;
    }

    const res = await fetch(`/api/consultant/filtered?${params.toString()}`, {
        method: 'GET',
        credentials: 'include'
    });

    const response = await res.json();

    if (!res.ok) {
        alert(response.msg);
        return;
    }

    results.innerHTML = '';

    for (const license of response.licenses) {
        createLegacyResult(license, results, false);
    }

    for (const license of response.legacyLicenses) {
        createLegacyResult(license, results, true);
    }
});

function createLegacyResult(resObj, target, legacy_box) {

    const resultContent = generateLegacyFields(resObj, createResultContent(resObj.legacy_license_uuid, false), legacy_box);

    const newResult = createResult(
        resObj.legacy_license_uuid,
        createLegacyTop(resObj, false),
        resultContent);

    target.appendChild(newResult);
}

function generateLegacyFields(resObj, resultContent, legacy_box) {
    if(legacy_box) {
        const status = document.createElement('div');
        let statusSpan = document.createElement('span');

        status.setAttribute('class', 'w-100 dis-flex flex-evenly flex-wrap margin-bottom-medium');

        statusSpan.setAttribute('class', `w-30 txt-center txt-bold status-indicator ${resObj.expired ? 'failed bi-x-circle' : 'ok bi-check-circle'}`);
        statusSpan.innerText = resObj.expired ? ' Vencida' : ' Vigente';

        status.appendChild(statusSpan);

        resultContent.appendChild(status);

        for (const key in resObj) {
            if (key === 'legacy_license_uuid' ||
                key === 'legacy_type' ||
                key === 'legacy_type_id' || 
                key === 'expired'
            ) {
                continue;
            }

            const text = document.createTextNode(`${key.replaceAll('_', ' ')}: `);
            const p = document.createElement('p');
            const span = document.createElement('span');

            if (key === 'georeferencia') {
                const geoRefLink = document.createElement('a');
                const latLng = resObj.georeferencia.split(',');

                p.setAttribute('class', 'w-25 legacy-field ');

                geoRefLink.innerText = resObj.georeferencia;
                geoRefLink.href = `/tool/map/?lat=${latLng[0]}&lng=${latLng[1]}&zoom=19`;
                geoRefLink.target = '_blank';

                p.appendChild(text);
                p.appendChild(geoRefLink);

                resultContent.appendChild(p);
            } else {
                p.setAttribute('class', 'w-25 legacy-field ');

                span.innerText = resObj[key];

                p.appendChild(text);
                p.appendChild(span);

                resultContent.appendChild(p);
            }
        }
    } else {
        const status = document.createElement('div');
        let statusSpan;

        status.setAttribute('class', 'w-100 dis-flex flex-evenly flex-wrap margin-bottom-medium');

        if (resObj.approvalStatus) {
            statusSpan = document.createElement('span');

            statusSpan.setAttribute('class', `w-30 txt-center txt-bold status-indicator ${resObj.expired ? 'failed bi-x-circle' : 'ok bi-check-circle'}`);
            statusSpan.innerText = resObj.expired ? ' Vencida' : ' Vigente';

            status.appendChild(statusSpan);
        }

        statusSpan = document.createElement('span');

        statusSpan.setAttribute('class', `w-30 txt-center txt-bold status-indicator ${resObj.approvalStatus ? 'ok bi-check-circle' : 'pending bi-dash-circle'}`);
        statusSpan.innerText = resObj.approvalStatus ? ' Aprobada' : ' En revisión';

        status.appendChild(statusSpan);

        resultContent.appendChild(status);

        // ! -------------------------------------------------------
        let text = document.createTextNode('Licencia:');
        let p = document.createElement('p');
        let span = document.createElement('span');

        p.setAttribute('class', 'w-25 legacy-field ');

        span.innerText = resObj.fullInvoice.replaceAll('_', '/');

        p.appendChild(text);
        p.appendChild(span);

        resultContent.appendChild(p);

        // ! -------------------------------------------------------
        text = document.createTextNode('Nombre del solicitante:');
        p = document.createElement('p');
        span = document.createElement('span');

        p.setAttribute('class', 'w-25 legacy-field ');

        span.innerText = resObj.requestorName;

        p.appendChild(text);
        p.appendChild(span);

        resultContent.appendChild(p);

        // ! -------------------------------------------------------
        text = document.createTextNode('En atención:');
        p = document.createElement('p');
        span = document.createElement('span');

        p.setAttribute('class', 'w-25 legacy-field ');

        span.innerText = resObj.attentionName;

        p.appendChild(text);
        p.appendChild(span);

        resultContent.appendChild(p);

        // ! -------------------------------------------------------
        text = document.createTextNode('Calle:');
        p = document.createElement('p');
        span = document.createElement('span');

        p.setAttribute('class', 'w-25 legacy-field ');

        span.innerText = resObj.address;

        p.appendChild(text);
        p.appendChild(span);

        resultContent.appendChild(p);

        // ! -------------------------------------------------------
        text = document.createTextNode('Numero:');
        p = document.createElement('p');
        span = document.createElement('span');

        p.setAttribute('class', 'w-25 legacy-field ');

        span.innerText = resObj.number;

        p.appendChild(text);
        p.appendChild(span);

        resultContent.appendChild(p);

        // ! -------------------------------------------------------
        text = document.createTextNode('Colonia:');
        p = document.createElement('p');
        span = document.createElement('span');

        p.setAttribute('class', 'w-25 legacy-field ');

        span.innerText = resObj.colony;

        p.appendChild(text);
        p.appendChild(span);

        resultContent.appendChild(p);

        // ! -------------------------------------------------------
        text = document.createTextNode('Clave catastral:');
        p = document.createElement('p');
        span = document.createElement('span');

        p.setAttribute('class', 'w-25 legacy-field ');

        span.innerText = resObj.catastralKey;

        p.appendChild(text);
        p.appendChild(span);

        resultContent.appendChild(p);

        // ! -------------------------------------------------------
        let geoRefLink = document.createElement('a');
        let latLng = resObj.geoReference.split(',');
        text = document.createTextNode('Georeferencia:');
        p = document.createElement('p');

        p.setAttribute('class', 'w-25 legacy-field ');

        geoRefLink.innerText = resObj.geoReference;
        geoRefLink.href = `/tool/map/?lat=${latLng[0]}&lng=${latLng[1]}&zoom=19`;
        geoRefLink.target = '_blank';

        p.appendChild(text);
        p.appendChild(geoRefLink);

        resultContent.appendChild(p);

        // ! -------------------------------------------------------
        text = document.createTextNode('Superficie Total:');
        p = document.createElement('p');
        span = document.createElement('span');

        p.setAttribute('class', 'w-25 legacy-field ');

        span.innerText = resObj.surfaceTotal;

        p.appendChild(text);
        p.appendChild(span);

        resultContent.appendChild(p);

        // ! -------------------------------------------------------
        text = document.createTextNode('Zona:');
        p = document.createElement('p');
        span = document.createElement('span');

        p.setAttribute('class', 'w-25 legacy-field ');

        span.innerText = resObj.zone.licenseZone;

        p.appendChild(text);
        p.appendChild(span);

        resultContent.appendChild(p);

        // ! -------------------------------------------------------
        text = document.createTextNode('Clave:');
        p = document.createElement('p');
        span = document.createElement('span');

        p.setAttribute('class', 'w-25 legacy-field ');

        span.innerText = resObj.zone.licenseKey;

        p.appendChild(text);
        p.appendChild(span);

        resultContent.appendChild(p);

        // ! -------------------------------------------------------
        text = document.createTextNode('Uso suelo:');
        p = document.createElement('p');
        span = document.createElement('span');

        p.setAttribute('class', 'w-25 legacy-field ');

        span.innerText = resObj.authorized_use.licenseAuthUse;

        p.appendChild(text);
        p.appendChild(span);

        resultContent.appendChild(p);

        // ! -------------------------------------------------------
        text = document.createTextNode('COS:');
        p = document.createElement('p');
        span = document.createElement('span');

        p.setAttribute('class', 'w-25 legacy-field ');

        span.innerText = `${resObj.COS} %`;

        p.appendChild(text);
        p.appendChild(span);

        resultContent.appendChild(p);

        // ! -------------------------------------------------------
        text = document.createTextNode('Altura Maxima:');
        p = document.createElement('p');
        span = document.createElement('span');

        p.setAttribute('class', 'w-25 legacy-field ');

        span.innerText = resObj.alt_max;

        p.appendChild(text);
        p.appendChild(span);

        resultContent.appendChild(p);

        // ! -------------------------------------------------------
        text = document.createTextNode('Niveles:');
        p = document.createElement('p');
        span = document.createElement('span');

        p.setAttribute('class', 'w-25 legacy-field ');

        span.innerText = resObj.niveles;

        p.appendChild(text);
        p.appendChild(span);

        resultContent.appendChild(p);

        // ! -------------------------------------------------------
        text = document.createTextNode('Vencimiento:');
        p = document.createElement('p');
        span = document.createElement('span');

        p.setAttribute('class', 'w-25 legacy-field ');

        span.innerText = resObj.expirationDate;

        p.appendChild(text);
        p.appendChild(span);

        resultContent.appendChild(p);

        // ! -------------------------------------------------------
        text = document.createTextNode('Tipo de tramite:');
        p = document.createElement('p');
        span = document.createElement('span');

        p.setAttribute('class', 'w-25 legacy-field ');

        span.innerText = resObj.expedition_type.licenseExpType;

        p.appendChild(text);
        p.appendChild(span);

        resultContent.appendChild(p);
    }

    return resultContent;
}