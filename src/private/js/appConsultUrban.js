const resultContainer = document.querySelector('#results_container');

const formSearchBy = document.querySelector('#form_urban_by');
const formSearchByInvoice = document.querySelector('#form_urban_byInvoice');
const formSearchByType = document.querySelector('#form_urban_byType');

formSearchBy.addEventListener('submit',
    event => {
        event.preventDefault();

        const formData = new FormData(formSearchBy);

        let data = Object.fromEntries(formData);

        getLicenseBy(data.by, data.value);
    }
);

formSearchByInvoice.addEventListener('submit',
    event => {
        event.preventDefault();

        const formData = new FormData(formSearchByInvoice);

        let data = Object.fromEntries(formData);

        getLicense(data.byInvoiceType, data.byInvoice, data.byInvoiceYear);
    }
);

formSearchByType.addEventListener('submit',
    event => {
        event.preventDefault();

        const formData = new FormData(formSearchByType);

        let data = Object.fromEntries(formData);

        getLicenseByType(data.byType, data.byTypeYear);
    }
);

async function getLicense(type, invoice, year) {
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

                resultContainer.innerHTML = '';

                response.data.forEach(element => {
                    createUrbanResult(element, resultContainer);
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

async function getLicenseByType(type, year) {
    await fetch(`/api/urban/${type}/${year}`, {
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

                resultContainer.innerHTML = '';

                response.data.forEach(element => {
                    createUrbanResult(element, resultContainer);
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

async function getLicenseBy(param, value) {
    await fetch(`/api/urban/${param}/value/${value}`, {
            method: 'GET',
            credentials: 'include'
        })
        .then(async res => {
            if(res.ok) {
                let response = await res.json();

                if (response.data.length == 0) {
                    alert('No hay resultados que coincida con la búsqueda');
                    return;
                }

                resultContainer.innerHTML = '';

                response.data.forEach(element => {
                    createUrbanResult(element, resultContainer);
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

async function getLicensesUrban() {
    await fetch(`/api/urban/`, {
            method: 'GET',
            credentials: 'include'
        })
        .then(async res => {
            if(res.ok){
                let response = await res.json();

                if (response.data.length == 0) {
                    alert('No hay resultados para mostrar');
                    return;
                }

                resultContainer.innerHTML = '';

                response.data.forEach(element => {
                    createUrbanResult(element, resultContainer);
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
                    img.setAttribute('src', `/urbanStorage/${form.querySelector('input[type=hidden]').value}/zone.png?${new Date().getTime()}`);
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

//-------------------------------------------------------------------
//getLicensesUrban();