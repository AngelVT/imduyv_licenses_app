const formSearchByInvoicePrint = document.querySelector('#form_urban_byInvoicePrint');

const formSearchByIDPrint = document.querySelector('#form_license_selector');

const licenseSelect = document.getElementById('license_selector');
const typeSelect = document.getElementById('list_type');
const yearSelect = document.getElementById('list_year');

const resultPrint = document.querySelector('#print_results');

const PDF = document.querySelector('#pdf_lc');

const types = ["CUS", "LUS", "LSUB", "LFUS", "PLF", "LF", "RLF", "CRPC", "LUH"]

formSearchByInvoicePrint.addEventListener('submit',
    event => {
        event.preventDefault();

        const formData = new FormData(formSearchByInvoicePrint);

        let data = Object.fromEntries(formData);

        getLicensePrint(data.byInvoiceType, data.byInvoice, data.byInvoiceYear);
    }
);

typeSelect.addEventListener('change', () => {
    if (!typeSelect.value || !yearSelect.value) {
        return;
    }
    getLicenseList(typeSelect.value, yearSelect.value);
});

yearSelect.addEventListener('change', () => {
    if (!typeSelect.value || !yearSelect.value) {
        return;
    }
    getLicenseList(typeSelect.value, yearSelect.value);
});

formSearchByIDPrint.addEventListener('submit', event => {
    event.preventDefault();
    getLicensePrintId(licenseSelect.value);
});

async function getLicensePrint(type, invoice, year) {
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

                resultPrint.innerHTML = '';
                
                createUrbanResult(response.license, resultPrint, true);

                PDF.setAttribute('src', `/api/urban/PDF/t/${type}/i/${invoice}/y/${year}?${new Date().getTime()}`);

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
            console.log(error.message)
            console.error('Error getting data: ', error);
        });
}

async function getLicensePrintId(id) {
    await fetch(`/api/urban/id/${id}`, {
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

                const response = await res.json();

                resultPrint.innerHTML = '';
                
                createUrbanResult(response.license, resultPrint, true);

                PDF.setAttribute('src', `/api/urban/PDF/t/${response.license.licenseType}/i/${response.license.invoice}/y/${response.license.year}?${new Date().getTime()}`);

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
            console.log(error.message)
            console.error('Error getting data: ', error);
        });
}

async function getLicenseList(type, year) {
    await fetch(`/api/urban/list/t/${type}/y/${year}`, {
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

                licenseSelect.innerHTML = `<option value="" selected>${types[parseInt(type) - 1]} ...</option>`
                
                response.licenses.forEach(license => {
                    let option = document.createElement('option');
                    option.value = license.public_urban_license_id;
                    option.innerText = `${license.fullInvoice.replaceAll('_', '/')} - ${license.requestorName}`;
                    
                    licenseSelect.appendChild(option);
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
            console.log(error.message)
            console.error('Error getting data: ', error);
        });
}

async function updateResultField(form, id) {
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

    await fetch(`/api/urban/${id}`, {
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

                let url = PDF.getAttribute('src').split('?')[0];
                PDF.setAttribute('src', `${url}?${new Date().getTime()}`)
                
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
            alert('An error ocurred:\n' + error);
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

async function updateResultTables(form, id) {
    let registro = document.querySelector(`#result_invoice_${id}`).innerText;

    const formData = new FormData(form);

    let data = Object.fromEntries(formData);

    for (const key in data) {
        data = data[key];
    }

    let mensaje = `¿Seguro que quieres modificar las tablas de situación actual y subdivisión o fusión que se autoriza para el registro ${registro}?`

    if (!confirm(mensaje)) {
        return;
    }

    await fetch(`/api/urban/${id}`, {
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

                let url = PDF.getAttribute('src').split('?')[0];
                PDF.setAttribute('src', `${url}?${new Date().getTime()}`)
                
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
            alert('An error ocurred:\n' + error);
            console.error('Error updating data: ', error);
        });
}