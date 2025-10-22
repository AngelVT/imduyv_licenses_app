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

                const url = new URL(window.location.href);
                url.searchParams.set("type", type);
                url.searchParams.set("invoice", invoice);
                url.searchParams.set("year", year);
                window.history.replaceState({}, '', url);

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

    if (currentValue == data) {
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
            const response = await res.json();
            if (res.ok) {
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
                PDF.setAttribute('src', `${url}?${new Date().getTime()}`);

                const approvalBtn = document.getElementById(`result_control_approve_${id}`);

                if (response.license.approvalStatus) {
                    approvalBtn.classList.add('bi-building-check');
                    approvalBtn.classList.remove('bi-building-dash');
                } else {
                    approvalBtn.classList.remove('bi-building-check');
                    approvalBtn.classList.add('bi-building-dash');
                    approvalBtn.setAttribute('onclick', `approveLicense('${id}', this)`);
                }

                alert(`Cambios guardados exitosamente para el registro: ${registro}`);
                return;
            }

            if (!res.ok) {
                if (form.querySelector('.input-interface')) {
                    form.querySelector('.input-interface').value = form.querySelector('input[type=hidden]').value;
                }

                alert(response.msg);
                return;
            }
        })
        .catch(error => {
            console.error('Error updating data: ', error);
        });
}

async function submitObservation(form, id) {
    const formData = new FormData(form);

    const data = Object.fromEntries(formData);

    const res = await fetch(`/api/landuse/comment/${id}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const response = await res.json();

    if (!res.ok) {
        alert(response.msg);
        return;
    }

    const comments = document.getElementById(`comments-${id}`);
    comments.innerHTML = '';

    response.comments?.forEach(comment => {
        const commentBubble = document.createElement('p');
        const date = document.createElement('span');
        const message = document.createElement('span');

        if (comment.imduyv) {
            commentBubble.classList.add('imduyv')
        }

        message.innerHTML = comment.message.replaceAll('\n', '<br>')

        date.innerText = `Fecha: ${new Date(comment.date).toLocaleString()}\n`;

        commentBubble.appendChild(date);
        commentBubble.appendChild(message);

        comments.appendChild(commentBubble);
    });

    comments.scrollTop = comments.scrollHeight;

    form.reset();
}

async function approveLicense(id, button) {
    try {
        let registro = document.querySelector(`#result_invoice_${id}`).innerText;

        let mensaje = `¿Seguro que quieres aprobar el registro ${registro}?`

        if (!confirm(mensaje)) {
            return;
        }

        const res = await fetch(`/api/landuse/approve/${id}`, {
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

        const res = await fetch(`/api/landuse/lock/${id}`, {
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

        const res = await fetch(`/api/landuse/unlock/${id}`, {
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