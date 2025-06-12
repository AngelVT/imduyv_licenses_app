const municipalResults = document.getElementById('municipal_results');
const instituteResults = document.getElementById('institute_results');
const licenseResults = document.getElementById('license_results');
const yearLegendResults = document.getElementById('year_legend_results');

async function getMunicipalPeriods() {
    await fetch(`/api/administration/municipalPeriod`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
        .then(async res => {
            let response = await res.json();
            if (res.ok) {
                let content = res.headers.get('Content-Type');
                if (content.includes('text/html')) {
                    location.href = res.url;
                    return;
                }

                for (const element of response.periods) {
                    createMunicipalResult(element, municipalResults)
                }

                return;
            }
            console.log(response.msg);
            return;
        })
        .catch(error => {
            console.error('Error during fetch: ', error)
        });
}

async function getInstitutePeriods() {
    await fetch(`/api/administration/institutePeriod`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
        .then(async res => {
            let response = await res.json();
            if (res.ok) {
                let content = res.headers.get('Content-Type');
                if (content.includes('text/html')) {
                    location.href = res.url;
                    return;
                }

                for (const element of response.periods) {
                    createInstituteResult(element, instituteResults);
                }

                return;
            }
            console.log(response.msg);
            return;
        })
        .catch(error => {
            console.error('Error during fetch: ', error)
        });
}

async function getLicensesPeriods() {
    await fetch(`/api/administration/licensesPeriod`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
        .then(async res => {
            let response = await res.json();
            if (res.ok) {
                let content = res.headers.get('Content-Type');
                if (content.includes('text/html')) {
                    location.href = res.url;
                    return;
                }

                for (const element of response.periods) {
                    createLicenseResult(element, licenseResults)
                }

                return;
            }
            console.log(response.msg);
            return;
        })
        .catch(error => {
            console.error('Error during fetch: ', error)
        });
}

async function getYearLegends() {
    await fetch(`/api/administration/yearLegend`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
        .then(async res => {
            let response = await res.json();
            if (res.ok) {
                let content = res.headers.get('Content-Type');
                if (content.includes('text/html')) {
                    location.href = res.url;
                    return;
                }

                for (const element of response.legends) {
                    createYearLegendResult(element, yearLegendResults)
                }

                return;
            }
            console.log(response.msg);
            return;
        })
        .catch(error => {
            console.error('Error during fetch: ', error)
        });
}

getMunicipalPeriods();

getInstitutePeriods();

getLicensesPeriods();

getYearLegends();

async function updateResultField(form, id, url, periodType) {
    let registro = document.querySelector(`#result_period_${periodType}_${id}`).innerText;
    let field = form.querySelector('label').innerText.toLowerCase().replaceAll(':', '');
    let currentValue = form.querySelector('input[type="hidden"]').value;

    const formData = new FormData(form);

    let data = Object.fromEntries(formData);
    let body = Object.fromEntries(formData);

    for (const key in data) {
        data = data[key];
    }

    let mensaje = `
    ¿Seguro que quieres modificar el ${field} para el periodo ${registro}?\n
    El valor actual es: "${currentValue}"
    Cambiara a: "${data}"`

    if(currentValue == data) {
        alert("No se ha realizado ningún cambio");
        return;
    }

    if (!confirm(mensaje)) {
        return;
    }

    await fetch(`${url}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(body)
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
                
                alert(`Cambios guardados exitosamente para el periodo: ${registro}`);
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

// * -----------------------------------------------------------------------------------
function createMunicipalResult(resObj, target) {
    resObj.id = resObj.municipal_administration_uuid;
    let resultContent = generateMunicipalFields(resObj, createResultPeriodContent(resObj.id, 'municipal'));

    let newResult = createResult(
        resObj.id,
        createResultPeriodTop(resObj, 'municipal'), 
        resultContent);

    target.appendChild(newResult);
}

function generateMunicipalFields(resObj, resultContent) {
    let field;

    field = createResultPeriodField(resObj.id, 'Nombre de presidenta(e)', 'municipalPresident', resObj.municipalPresident, 'text', '/api/administration/municipalPeriod', 'municipal');
    resultContent.appendChild(field);

    field = createResultPeriodField(resObj.id, 'Fecha de inicio', 'administrationStart', resObj.administrationStart, 'date', '/api/administration/municipalPeriod', 'municipal');
    resultContent.appendChild(field);

    field = createResultPeriodField(resObj.id, 'Fecha de finalización', 'administrationEnd', resObj.administrationEnd, 'date', '/api/administration/municipalPeriod', 'municipal');
    resultContent.appendChild(field);

    return resultContent;
}

// * -----------------------------------------------------------------------------------
function createInstituteResult(resObj, target) {
    resObj.id = resObj.institute_administration_uuid;
    let resultContent = generateInstituteFields(resObj, createResultPeriodContent(resObj.id, 'institute'));

    let newResult = createResult(
        resObj.id,
        createResultPeriodTop(resObj, 'institute'), 
        resultContent);

    target.appendChild(newResult);
}

function generateInstituteFields(resObj, resultContent) {
    let field;

    field = createResultPeriodField(resObj.id, 'Nombre de director(a)', 'directorName', resObj.directorName, 'text', '/api/administration/institutePeriod', 'institute');
    resultContent.appendChild(field);

    field = createResultPeriodField(resObj.id, 'Titulo', 'directorTittle', resObj.directorTittle, 'text', '/api/administration/institutePeriod', 'institute');
    resultContent.appendChild(field);

    field = createResultPeriodField(resObj.id, 'Titulo abreviado', 'directorTittleShort', resObj.directorTittleShort, 'text', '/api/administration/institutePeriod', 'institute');
    resultContent.appendChild(field);

    field = createResultPeriodField(resObj.id, 'Fecha de inicio', 'administrationStart', resObj.administrationStart, 'date', '/api/administration/institutePeriod', 'institute');
    resultContent.appendChild(field);

    field = createResultPeriodField(resObj.id, 'Fecha de finalización', 'administrationEnd', resObj.administrationEnd, 'date', '/api/administration/institutePeriod', 'institute');
    resultContent.appendChild(field);

    return resultContent;
}

// * -----------------------------------------------------------------------------------
function createLicenseResult(resObj, target) {
    resObj.id = resObj.licenses_administration_uuid;
    let resultContent = generateLicenseFields(resObj, createResultPeriodContent(resObj.id, 'license'));

    let newResult = createResult(
        resObj.id,
        createResultPeriodTop(resObj, 'license'), 
        resultContent);

    target.appendChild(newResult);
}

function generateLicenseFields(resObj, resultContent) {
    let field;

    field = createResultPeriodField(resObj.id, 'Nombre del director(a)', 'directorName', resObj.directorName, 'text', '/api/administration/licensesPeriod', 'license');
    resultContent.appendChild(field);

    field = createResultPeriodField(resObj.id, 'Fecha de inicio', 'administrationStart', resObj.administrationStart, 'date', '/api/administration/licensesPeriod', 'license');
    resultContent.appendChild(field);

    field = createResultPeriodField(resObj.id, 'Fecha de finalización', 'administrationEnd', resObj.administrationEnd, 'date', '/api/administration/licensesPeriod', 'license');
    resultContent.appendChild(field);

    return resultContent;
}

// * -----------------------------------------------------------------------------------
function createYearLegendResult(resObj, target) {
    resObj.id = resObj.year_legend_uuid;
    let resultContent = generateYearLegendFields(resObj, createResultPeriodContent(resObj.id, 'year_legend'));

    let newResult = createResult(
        resObj.id,
        createResultYearLegendTop(resObj, 'year_legend'), 
        resultContent);

    target.appendChild(newResult);
}

function generateYearLegendFields(resObj, resultContent) {
    let field;

    field = createResultPeriodField(resObj.id, 'Leyenda del año', 'year_legend', resObj.year_legend, 'text', '/api/administration/yearLegend', 'year_legend');
    resultContent.appendChild(field);

    return resultContent;
}