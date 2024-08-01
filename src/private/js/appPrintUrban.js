const formSearchByInvoicePrint = document.querySelector('#form_urban_byInvoicePrint');

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
    await fetch(`/api/urban/${type}/${invoice}/${year}`, {
            method: 'GET',
            credentials: 'include'
        })
        .then(async res => {
            if(res.ok){
                let response = await res.json();

                if (response.data.length == 0) {
                    alert('No hay resultados que coincida con la búsqueda');
                    return;
                }

                response.data.forEach(element => {
                    resultPrint.innerHTML = '';
                    createUrbanPrintResult(element, resultPrint);
                    PDF.setAttribute('src', `/api/urban/PDF/${type}/${invoice}/${year}?${new Date().getTime()}`)
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
                if (form.querySelector('.input-interface')) {
                    form.querySelector('input[type=hidden]').value = form.querySelector('.input-interface').value;
                }

                if (form.querySelector('.input-file')) {
                    let img = document.querySelector(`#result_fields_${id}`).querySelector('img');
                    if(img) {
                        img.setAttribute('src', `/urbanStorage/${form.querySelector('input[type=hidden]').value}/zone.png?${new Date().getTime()}`);
                    }
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

async function deleteResult(id) {
    let registro = document.querySelector(`#result_invoice_${id}`).innerText;
    let mensaje = `
    ¿Seguro que quieres eliminar el registro ${registro}?\n
    El esta acción no se puede deshacer.`

    if (!confirm(mensaje)) {
        return;
    }

    await fetch(`/api/urban/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        })
        .then(res => {
            if(res.ok){
                document.querySelector(`#result_${id}`).remove();
                return;
            }

            if (!res.ok) {
                let response = res.json();
                alert(response.msg);
                return;
            }
        })
        .catch(error => {
            alert('An error ocurred:\n' + error);
            console.error('Error deleting registry: ', error)
        });
}