const formSearchByInvoicePrint = document.querySelector('#form_land_byInvoicePrint');

const resultPrint = document.querySelector('#print_results');

const PDF = document.querySelector('#pdf_lc');

formSearchByInvoicePrint.addEventListener('submit',
    event => {
        event.preventDefault();

        const formData = new FormData(formSearchByInvoicePrint);

        let data = Object.fromEntries(formData);

        getLicensePrint(data.byInvoiceType, data.byInvoice, data.byInvoiceYear);
    }
);

async function getLicensePrint(type, invoice, year) {
    await fetch(`/api/landuse/${type}/${invoice}/${year}`, {
        method: 'GET',
        credentials: 'include'
    })
        .then(async res => {
            if (res.ok) {
                let response = await res.json();

                if (response.data.length == 0) {
                    alert('No hay resultados que coincida con la búsqueda');
                    return;
                }

                response.data.forEach(element => {
                    resultPrint.innerHTML = '';
                    createLandPrintResult(element, resultPrint);
                    PDF.setAttribute('src', `/api/landuse/PDF/${type}/${invoice}/${year}?${new Date().getTime()}`)
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

function fillDataPrint(element) {
    for (const key in element) {

        if (typeof element[key] === 'object') {
            for (const subKey in element[key]) {

                if (document.querySelector(`#f-${subKey}`)) {
                    document.querySelector(`#f-${subKey}`).innerText = element[key][subKey];
                }
            }
        } else {
            if (key == 'fullInvoice') {
                element[key] = element[key].replaceAll('_', '/');
            }

            if (key.match('Date')) {
                let date = new Date(element[key]);
                element[key] = `${date.getDate() + 1}/${(date.getMonth() + 1) < 10 ? '0'+(date.getMonth() + 1): (date.getMonth() + 1)}/${date.getFullYear()}`;
            }

            if (document.querySelector(`#f-${key}`)) {

                if (document.querySelector(`#f-${key}`).tagName == 'IMG') {
                    document.querySelector(`#f-${key}`).setAttribute('src', `/landUseStorage/${element[key]}`);
                } else {
                    document.querySelector(`#f-${key}`).innerText = element[key];
                }
            }

            if (document.querySelector(`.cf-${key}`)) {
                document.querySelectorAll(`.cf-${key}`).forEach(
                    item => {
                        if (item.tagName == "IMG") {
                            item.setAttribute('src', `/landUseStorage/${element[key]}`);
                        } else {
                            item.innerText = element[key];
                        }
                    }
                );
            }
        }
    }
}

function changeFormatLand(formatNo) {
    let totalPages = document.querySelector('#total-pages');

    if (formatNo == 1) {
        document.querySelector('#f-licenseType').textContent = "Constancia de uso de suelo";
        document.querySelectorAll('.formL').forEach(
            item => {
                item.classList.add('hidden');
            }
        );

        document.querySelectorAll('.formDP').forEach(
            item => {
                item.classList.add('hidden');
            }
        );

        document.querySelectorAll('.formC').forEach(
            item => {
                item.classList.remove('hidden');
            }
        );
        totalPages.innerText = 1;
        return;
    }

    if (formatNo >= 2 && formatNo <= 6) {
        document.querySelector('#f-licenseType').textContent = "Licencia de uso de suelo";
        document.querySelectorAll('.formC').forEach(
            item => {
                item.classList.add('hidden');
            }
        );

        document.querySelectorAll('.formDP').forEach(
            item => {
                item.classList.add('hidden');
            }
        );

        document.querySelectorAll('.formL').forEach(
            item => {
                item.classList.remove('hidden');
            }
        );
        totalPages.innerText = 2;
        return;
    }

    if (formatNo == 7) {
        document.querySelector('#f-licenseType').textContent = "Derecho de preferencia";
        document.querySelectorAll('.formC').forEach(
            item => {
                item.classList.add('hidden');
            }
        );

        document.querySelectorAll('.formL').forEach(
            item => {
                item.classList.add('hidden');
            }
        );

        document.querySelectorAll('.formDP').forEach(
            item => {
                item.classList.remove('hidden');
            }
        );
        totalPages.innerText = 2;
        return;
    }
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

    await fetch(`/api/landuse/${id}`, {
            method: 'PATCH',
            credentials: 'include',
            body: formData
        })
        .then(async res => {
            if(res.ok) {
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