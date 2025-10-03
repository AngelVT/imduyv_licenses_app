const reportForm = document.getElementById('report_form');

const incomeBtn = document.getElementById('income_btn');

const textArea = document.getElementById('income_results');

//const georefBox = document.getElementById('georef_box');
const radios = document.querySelectorAll('input[name="report_type"]');

radios.forEach(radio => {
    radio.addEventListener('change', () => {
        if (radio.value === 'quarter' && radio.checked) {
            textArea.setAttribute('required', '');
        } else if (radio.checked) {
            textArea.removeAttribute('required');
        }
    });
});

reportForm.addEventListener('submit', async event => {
    event.preventDefault();

    const formData = new FormData(reportForm);
    const selectedTypes = formData.getAll('types');

    if (selectedTypes.length === 0 || !selectedTypes) {
        alert('Debes seleccionar al menos un tipo de licencia');
        return;
    }

    const dataBody = Object.fromEntries(formData);

    dataBody.types = selectedTypes.map(n => parseInt(n));
    //dataBody.isGeoRef = georefBox.checked;

    const res = await fetch(`/api/landuse/report`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(dataBody)
    });

    if (!res.ok) {
        const response = await res.json();

        alert(response.msg);
    }

    const blob = await res.blob();
    const disposition = res.headers.get("Content-Disposition");
    let filename = "reporte.pdf";
    if (disposition && disposition.includes("filename=")) {
        filename = disposition
        .split("filename=")[1]
        .replace(/["']/g, "");
    }

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);

    reportForm.reset();

    textArea.setAttribute('required', '');
});

incomeBtn.addEventListener('click', async () => {
    const formData = new FormData(reportForm);
    const selectedTypes = formData.getAll('types');

    const dataBody = Object.fromEntries(formData);

    if (!dataBody.periodStart || !dataBody.periodEnd) {
        alert('Debes seleccionar una fecha de inicio y una de final');
        return;
    }

    if (selectedTypes.length === 0 || !selectedTypes) {
        alert('Debes seleccionar al menos un tipo de licencia');
        return;
    }

    dataBody.types = selectedTypes.map(n => parseInt(n));

    const res = await fetch(`/api/landuse/income`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(dataBody)
    });

    const response = await res.json();

    if (!res.ok) {
        alert(response.msg);
    }

    textArea.value = `
    Periodo: ${response.period}

    Tipos de licencias Cortejados:
    - ${response.types.join('\n    - ')}

    Total: $ ${response.totalPeriodIncome.toLocaleString()}
    `;
});