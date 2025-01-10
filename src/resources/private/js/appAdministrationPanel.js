const invoiceBtn = document.getElementById('invoice_btn');
const municipalBtn = document.getElementById('municipal_btn');
const instituteBtn = document.getElementById('institute_btn');
const licenseBtn = document.getElementById('license_btn');

const menuBtns = document.getElementById('top_menu').querySelectorAll('li');
const menuPanels = document.getElementById('panel_container').querySelectorAll('article');

const landForm = document.getElementById('invoice_form_land');
const urbanForm = document.getElementById('invoice_form_urban');
const municipalForm = document.getElementById('municipal_form');
const instituteForm = document.getElementById('institute_form');
const licenseForm = document.getElementById('license_form');

const invoicePanel = document.getElementById('admin_invoices');
const municipalPanel = document.getElementById('admin_municipal');
const institutePanel = document.getElementById('admin_institute');
const licensePanel = document.getElementById('admin_direction');

invoiceBtn.addEventListener('click', () => {
    hideAndUnselectAll();
    invoiceBtn.classList.add('selected');
    invoicePanel.classList.remove('dis-none');
});

municipalBtn.addEventListener('click', () => {
    hideAndUnselectAll();
    municipalBtn.classList.add('selected');
    municipalPanel.classList.remove('dis-none');
});

instituteBtn.addEventListener('click', () => {
    hideAndUnselectAll();
    instituteBtn.classList.add('selected');
    institutePanel.classList.remove('dis-none');
});

licenseBtn.addEventListener('click', () => {
    hideAndUnselectAll();
    licenseBtn.classList.add('selected');
    licensePanel.classList.remove('dis-none');
});

landForm.addEventListener('submit', async event => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(landForm));

    await fetch(`/api/landuse/setInvoices`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
        .then(async res => {
            let response = await res.json();
            if (res.ok) {
                let content = res.headers.get('Content-Type');
                if (content.includes('text/html')) {
                    location.href = res.url;
                    return;
                }

                alert(`
                Folios iniciales establecidos exitosamente:
                ${response.invoices}`);
                landForm.reset();
                landForm.classList.add('dis-none');
                return;
            }
            alert(response.msg);
            return;
        })
        .catch(error => {
            console.error('Error during fetch: ', error)
        });
});

urbanForm.addEventListener('submit', async event => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(urbanForm));

    await fetch(`/api/urban/setInvoices`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
        .then(async res => {
            let response = await res.json();
            if (res.ok) {
                let content = res.headers.get('Content-Type');
                if (content.includes('text/html')) {
                    location.href = res.url;
                    return;
                }

                alert(`
                Folios iniciales establecidos exitosamente:
                ${response.invoices}`);
                urbanForm.reset();
                urbanForm.classList.add('dis-none');
                return;
            }
            alert(response.msg);
            return;
        })
        .catch(error => {
            console.error('Error during fetch: ', error)
        });
});

municipalForm.addEventListener('submit', async event => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(municipalForm));

    if (!validatePeriod(data.administrationStart, data.administrationEnd)) {
        alert('La fecha de finalización debe ser posterior a la fecha de inicio.')
        return;
    }


    await fetch(`/api/administration/municipalPeriod`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
        .then(async res => {
            if (res.ok) {
                let content = res.headers.get('Content-Type');
                if (content.includes('text/html')) {
                    location.href = res.url;
                    return;
                }
                
                let response = await res.json();

                alert(`
                Periodo municipal registrado:
                Presidenta(e): ${response.period.municipalPresident}
                Inicio: ${response.period.administrationStart}
                Finalización: ${response.period.administrationEnd}`);
                municipalForm.reset();
                return;
            }
            alert('Registro fallido');
            return;
        })
        .catch(error => {
            console.error('Error during fetch: ', error)
        });
});

instituteForm.addEventListener('submit', async event => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(instituteForm));

    if (!validatePeriod(data.administrationStart, data.administrationEnd)) {
        alert('La fecha de finalización debe ser posterior a la fecha de inicio.')
        return;
    }

    await fetch(`/api/administration/institutePeriod`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
        .then(async res => {
            let response = await res.json();
            if (res.ok) {
                let content = res.headers.get('Content-Type');
                if (content.includes('text/html')) {
                    location.href = res.url;
                    return;
                }

                alert(`
                Periodo institucional registrado:
                Director(a): ${response.period.directorName}
                Titulo: ${response.period.directorTittle}
                Titulo abreviado: ${response.period.directorTittleShort}
                Inicio: ${response.period.administrationStart}
                Finalización: ${response.period.administrationEnd}`);
                instituteForm.reset();
                return;
            }
            alert(response.msg);
            return;
        })
        .catch(error => {
            console.error('Error during fetch: ', error)
        });
});

licenseForm.addEventListener('submit', async event => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(licenseForm));

    if (!validatePeriod(data.administrationStart, data.administrationEnd)) {
        alert('La fecha de finalización debe ser posterior a la fecha de inicio,verifica la validez de las fechas proporcionadas.')
        return;
    }

    await fetch(`/api/administration/licensesPeriod`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
        .then(async res => {
            let response = await res.json();
            if (res.ok) {
                let content = res.headers.get('Content-Type');
                if (content.includes('text/html')) {
                    location.href = res.url;
                    return;
                }

                alert(`
                Periodo institucional registrado:
                Director(a): ${response.period.directorName}
                Inicio: ${response.period.administrationStart}
                Finalización: ${response.period.administrationEnd}`);
                licenseForm.reset();
                return;
            }
            alert(response.msg);
            return;
        })
        .catch(error => {
            console.error('Error during fetch: ', error)
        });
});

function hideAndUnselectAll() {
    menuBtns.forEach(btn => {
        btn.classList.remove('selected')
    });
    menuPanels.forEach(panel => {
        panel.classList.add('dis-none')
    })
}

function validatePeriod(start, end) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(start) || !dateRegex.test(end)) {
        return false;
    }

    const START_DATE = new Date(start);
    const END_DATE = new Date(end);

    if (isNaN(START_DATE.getTime()) || isNaN(END_DATE.getTime())) {
        return false;
    }

    return START_DATE < END_DATE;
}