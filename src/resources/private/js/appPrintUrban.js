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

                const url = new URL(window.location.href);
                url.searchParams.set("type", type);
                url.searchParams.set("invoice", invoice);
                url.searchParams.set("year", year);
                window.history.replaceState({}, '', url);

                let response = await res.json();

                resultPrint.innerHTML = '';
                
                createUrbanResult(response.license, resultPrint, true);

                //PDF.setAttribute('src', `/api/urban/PDF/t/${type}/i/${invoice}/y/${year}?${new Date().getTime()}`);

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

                const url = new URL(window.location.href);
                url.searchParams.set("type", response.license.licenseType);
                url.searchParams.set("invoice", response.license.invoice);
                url.searchParams.set("year", response.license.year);
                window.history.replaceState({}, '', url);

                resultPrint.innerHTML = '';
                
                createUrbanResult(response.license, resultPrint, true);

                //PDF.setAttribute('src', `/api/urban/PDF/t/${response.license.licenseType}/i/${response.license.invoice}/y/${response.license.year}?${new Date().getTime()}`);

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
                    option.innerText = `${license.fullControlInvoice?.replaceAll('_', '/')} - ${license.fullInvoice?.replaceAll('_', '/')} - ${license.requestorName}`;
                    
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

                //let url = PDF.getAttribute('src').split('?')[0];
                //PDF.setAttribute('src', `${url}?${new Date().getTime()}`)
                
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

async function updateResultStatus(form, id) {
    if (!confirm('¿Seguro que quieres modificar el estatus para este registro registro?')) {
        return;
    }

    const statuses = form.querySelectorAll('input[name=statuses]');
    const formData = new FormData(form);
    const data = {}

    for (const s of statuses) {
        data[s.value] =  s.checked;
    }

    formData.set('statuses', JSON.stringify(data));

    console.log(Object.fromEntries(formData))

    const res =  await fetch(`/api/urban/${id}`, {
        method: 'PATCH',
        credentials: 'include',
        body: formData
    });

    const response = await res.json();

    if (!res.ok) {
        alert(response.msg);
        form.reset();
        return;
    }
}

async function approveLicense(id, button) {
    try {
        let registro = document.querySelector(`#result_invoice_${id}`).innerText;

        let mensaje = `¿Seguro que quieres aprobar el registro ${registro}?`

        if (!confirm(mensaje)) {
            return;
        }

        const res = await fetch(`/api/urban/approve/${id}`, {
            method: 'PATCH',
            credentials: 'include'
        });

        const response = await res.json();

        if (!res.ok) {
            alert(response.msg);
            return;
        }

        //let url = PDF.getAttribute('src').split('?')[0];
        //PDF.setAttribute('src', `${url}?${new Date().getTime()}`);

        alert(`Licencia ${registro}, aprobada exitosamente.`);

        const lockBtn = document.getElementById(`result_control_active_${id}`);

        lockBtn.setAttribute('onclick', `unlockLicense('${id}', this)`);
        lockBtn.classList.remove("bi-unlock");
        lockBtn.classList.add("bi-lock");

        button.classList.add("bi-building-check");
        button.classList.remove("bi-building-dash");
        button.removeAttribute('onclick');
    } catch (error) {
        console.log(error);
        alert('Solicitud fallida');
    }
}

/*async function lockLicense(id, button) {
    try {
        let registro = document.querySelector(`#result_invoice_${id}`).innerText;

        let mensaje = `¿Seguro que quieres bloquear el registro ${registro}?
        Una vez bloqueado solo podrá ser desbloqueada por un administrador autorizado.`

        if (!confirm(mensaje)) {
            return;
        }

        const res = await fetch(`/api/urban/lock/${id}`, {
            method: 'PATCH',
            credentials: 'include'
        });

        const response = await res.json();

        if (!res.ok) {
            alert(response.msg);
            return;
        }

        let url = PDF.getAttribute('src').split('?')[0];
        PDF.setAttribute('src', `${url}?${new Date().getTime()}`);

        alert(`Licencia ${registro}, bloqueada exitosamente.`);

        button.setAttribute('onclick', `unlockLicense('${id}', this)`);
        button.classList.toggle("bi-unlock");
        button.classList.toggle("bi-lock");
    } catch (error) {
        console.log(error);
        alert('Solicitud fallida');
    }
}*/

async function unlockLicense(id, button) {
    try {
        let registro = document.querySelector(`#result_invoice_${id}`).innerText;

        let mensaje = `¿Seguro que quieres desbloquear el registro ${registro}?
        Una vez desbloqueado el registro podrá ser modificado de nuevo en caso de ser modificado tendrá que ser aprobado de nuevo por un administrador autorizado.`

        if (!confirm(mensaje)) {
            return;
        }

        const res = await fetch(`/api/urban/unlock/${id}`, {
            method: 'PATCH',
            credentials: 'include'
        });

        const response = await res.json();

        if (!res.ok) {
            alert(response.msg);
            return;
        }

        //let url = PDF.getAttribute('src').split('?')[0];
        //PDF.setAttribute('src', `${url}?${new Date().getTime()}`);

        alert(`Licencia ${registro}, bloqueada exitosamente.`);

        //button.setAttribute('onclick', `lockLicense('${id}', this)`);
        const approvalBtn = document.getElementById(`result_control_approve_${id}`);

        approvalBtn.classList.remove("bi-building-check");
        approvalBtn.classList.add("bi-building-dash");
        approvalBtn.setAttribute('onclick', `approveLicense('${id}', this)`)

        button.classList.toggle("bi-unlock");
        button.classList.toggle("bi-lock");
        button.removeAttribute('onclick');
    } catch (error) {
        console.log(error);
        alert('Solicitud fallida');
    }
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

                //let url = PDF.getAttribute('src').split('?')[0];
                //PDF.setAttribute('src', `${url}?${new Date().getTime()}`)
                
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