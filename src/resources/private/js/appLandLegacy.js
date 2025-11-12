const resultContainer = document.getElementById('results_container');

const fromTypeYear = document.getElementById('form_type_year');
const formCatastral = document.getElementById('form_catastral');
const formRequestor = document.getElementById('form_requestor');
const formPeriod = document.getElementById('form_period');
const formInvoice = document.getElementById('form_invoice');
const formParameter = document.getElementById('form_parameter');

fromTypeYear.addEventListener('submit', async event => {
    try {
        event.preventDefault();

        const { typeSelect, yearSelect } = getParams(fromTypeYear);

        const res = await fetch(`/api/landLegacy/t/${typeSelect}/y/${yearSelect}`, {
            method: 'GET',
            credentials: 'include'
        });

        const response = await res.json();

        if (!res.ok) {
            alert(response.msg);
            return;
        }

        resultContainer.innerHTML = '';

        response.licenses.forEach(l => {
            createLegacyResult(l, resultContainer);
        });

    } catch (error) {
        console.log(error);
        alert("Request failed")
    }
});

formCatastral.addEventListener('submit', async event => {
    try {
        event.preventDefault();

        const { catastralKey } = getParams(formCatastral);

        const res = await fetch(`/api/landLegacy/catastral/${catastralKey}`, {
            method: 'GET',
            credentials: 'include'
        });

        const response = await res.json();

        if (!res.ok) {
            alert(response.msg);
            return;
        }

        resultContainer.innerHTML = '';

        response.licenses.forEach(l => {
            createLegacyResult(l, resultContainer);
        });

    } catch (error) {
        console.log(error);
        alert("Request failed")
    }
});

formRequestor.addEventListener('submit', async event => {
    try {
        event.preventDefault();

        const { requestorName } = getParams(formRequestor);

        const cleanValue = requestorName
            .replace(/[\u00A0\u2000-\u200D\u3000]/g, ' ')
            .trim()
            .replace(/\s+/g, ' '); 

        const res = await fetch(`/api/landLegacy/name/${cleanValue}`, {
            method: 'GET',
            credentials: 'include'
        });

        const response = await res.json();

        if (!res.ok) {
            alert(response.msg);
            return;
        }

        resultContainer.innerHTML = '';

        response.licenses.forEach(l => {
            createLegacyResult(l, resultContainer);
        });

    } catch (error) {
        console.log(error);
        alert("Request failed")
    }
});

formPeriod.addEventListener('submit', async event => {
    try {
        event.preventDefault();

        const { periodStart, periodEnd } = getParams(formPeriod)

        const res = await fetch(`/api/landLegacy/period/start/${periodStart}/end/${periodEnd}`, {
            method: 'GET',
            credentials: 'include'
        });

        const response = await res.json();

        if (!res.ok) {
            alert(response.msg);
            return;
        }

        resultContainer.innerHTML = '';

        response.licenses.forEach(l => {
            createLegacyResult(l, resultContainer);
        });

    } catch (error) {
        console.log(error);
        alert("Request failed")
    }
});

formInvoice.addEventListener('submit', async event => {
    try {
        event.preventDefault();

        const { licencia } = getParams(formInvoice);

        const res = await fetch(`/api/landLegacy/invoice/${encodeURIComponent(licencia)}`, {
            method: 'GET',
            credentials: 'include'
        });

        const response = await res.json();

        if (!res.ok) {
            alert(response.msg);
            return;
        }

        resultContainer.innerHTML = '';

        response.licenses.forEach(l => {
            createLegacyResult(l, resultContainer);
        });

    } catch (error) {
        console.log(error);
        alert("Request failed")
    }
});

formParameter.addEventListener('submit', async event => {
    try {
        event.preventDefault();

        const { criteria, value } = getParams(formParameter);

        const res = await fetch(`/api/landLegacy/${criteria}/${value}`, {
            method: 'GET',
            credentials: 'include'
        });

        const response = await res.json();

        if (!res.ok) {
            alert(response.msg);
            return;
        }

        resultContainer.innerHTML = '';

        response.licenses.forEach(l => {
            createLegacyResult(l, resultContainer);
        });

    } catch (error) {
        console.log(error);
        alert("Request failed")
    }
});

function getParams(form) {
    const params = new FormData(form);

    return Object.fromEntries(params);
}

async function uploadPDF(id, form) {
    try {
        const formData = new FormData(form);

        const res = await fetch(`/api/landLegacy/upload/${id}`, {
            method: 'PATCH',
            credentials: 'include',
            body: formData
        });

        const response = await res.json();

        alert(response.msg)

    } catch (error) {
        console.log(error);
        alert("Request failed")
    }
}

//* Land Result
function createLegacyResult(resObj, target) {

    const resultContent = generateLegacyFields(resObj, createResultContent(resObj.legacy_license_uuid, false));

    const newResult = createResult(
        resObj.legacy_license_uuid,
        createLegacyTop(resObj),
        resultContent);

    target.appendChild(newResult);
}

function generateLegacyFields(resObj, resultContent) {
    for (const key in resObj) {
        if (key === 'legacy_license_uuid' ||
            key === 'legacy_type' ||
            key === 'legacy_type_id'
        ) {
            continue;
        }

        const text = document.createTextNode(`${key.replaceAll('_', ' ')}: `);
        const p = document.createElement('p');
        const span = document.createElement('span');

        p.setAttribute('class', 'w-25 legacy-field ');

        span.innerText = resObj[key];

        p.appendChild(text);
        p.appendChild(span);

        resultContent.appendChild(p);
    }

    const form = document.createElement('form');
    const label = document.createElement('label');
    const fileInput = document.createElement('input');
    const button = document.createElement('button');

    form.setAttribute('onsubmit', `uploadPDF('${resObj.legacy_license_uuid}', this); return false`);
    form.setAttribute('class', 'w-50 dis-flex flex-column flex-center-v');

    label.innerText = 'Cargar PDF:';
    label.setAttribute('class', 'w-100 dis-flex flex-column flex-center-v txt-bold color-primary');

    fileInput.type = 'file';
    fileInput.name = 'legacyPDF';
    fileInput.accept = '.pdf';
    fileInput.required = true;
    fileInput.setAttribute('class', 'w-25 margin-top-small');

    button.type = 'submit';
    button.innerText = 'Cargar'
    button.setAttribute('class', 'btn btn-primary margin-top-small')

    label.appendChild(fileInput);
    form.appendChild(label);
    form.appendChild(button);

    resultContent.appendChild(form);

    return resultContent;
}