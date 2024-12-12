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

    console.log(data);
});

urbanForm.addEventListener('submit', async event => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(urbanForm));

    console.log(data);
});

municipalForm.addEventListener('submit', async event => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(municipalForm));

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
                Finalización: ${response.period.administrationStart}`);
                municipalForm.reset();
                return;
            }
            alert(res.msg);
            return;
        })
        .catch(error => {
            console.error('Error during fetch: ', error)
        });
});

instituteForm.addEventListener('submit', async event => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(instituteForm));

    console.log(data);
});

licenseForm.addEventListener('submit', async event => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(licenseForm));

    console.log(data);
});

function hideAndUnselectAll() {
    menuBtns.forEach(btn => {
        btn.classList.remove('selected')
    });
    menuPanels.forEach(panel => {
        panel.classList.add('dis-none')
    })
}

