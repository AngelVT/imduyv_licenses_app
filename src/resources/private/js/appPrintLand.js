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
    await fetch(`/api/landuse/t/${type}/i/${invoice}/y/${year}`, {
            method: 'GET',
            credentials: 'include'
        })
        .then(async res => {
            if (res.ok) {
                let content = res.headers.get('Content-Type');
                if (content.includes('text/html')) {
                    location.href = res.url;
                    return;
                }

                const response = await res.json();

                resultPrint.innerHTML = '';

                createLandResult(response.license, resultPrint, true, true);

                PDF.setAttribute('src', `/api/landuse/PDF/t/${type}/i/${invoice}/y/${year}?${new Date().getTime()}`);
                return;
            }

            if (!res.ok) {
                const response = await res.json();
                alert(response.msg);
                return;
            }
        })
        .catch(error => {
            alert('An error occurred:\n' + error);
            console.error('Error getting data: ', error)
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

    await fetch(`/api/landuse/${id}`, {
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

                if (form.querySelector('.input-file')) {
                    let img = document.querySelector(`#result_fields_${id}`).querySelector('img');
                    img.setAttribute('src', `/landUseStorage/${form.querySelector('input[type=hidden]').value}/zone.png?${new Date().getTime()}`);
                }

                let url = PDF.getAttribute('src').split('?')[0];
                PDF.setAttribute('src', `${url}?${new Date().getTime()}`)
                
                alert(`Cambios guardados exitosamente para el registro: ${registro}`);
                return;
            }

            if (!res.ok) {
                let response = await res.json();

                form.querySelector('.input-interface').value = form.querySelector('input[type=hidden]').value;

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