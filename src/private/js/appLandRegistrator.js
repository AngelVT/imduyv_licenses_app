const thaForm = document.getElementById('form_reg');

thaForm.addEventListener(
    'submit', async event => {
        event.preventDefault();

        const formData = new FormData(thaForm);

        await fetch(`/api/landuse/`, {
            method: 'POST',
            credentials: 'include',
            body: formData
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
                    Licencia registrada: ${response.fullInvoice}
                    Folio: ${response.dbInvoice}`);
                    thaForm.reset();
                    return;
                }
                alert("Registro no exitoso");
                return;
            })
            .catch(error => {
                console.error('Error uploading file: ', error)
            });
    }
);

const validityInputs = document.querySelectorAll('input[name="validity"]');

const requestDate = document.getElementById('req_date');
const expeditionDate = document.getElementById('exp_date');
const expirationDate = document.getElementById('end_date');

requestDate.addEventListener('change', () => {
    expeditionDate.value =  setExpeditionDate(requestDate.value);
});

validityInputs.forEach(e => {
    e.addEventListener('change', (event) => {
        expirationDate.value = setExpirationDate(event);
    });
});

function setExpeditionDate(reqDate) {
    let expDate = new Date(reqDate);
    expDate.setDate(expDate.getDate() +1);

    while(expDate.getDay() >= 5) {
        expDate.setDate(expDate.getDate() +1);
    }

    return expDate.toISOString().split('T')[0];
}

function setExpirationDate(event) {
    let expDate = expeditionDate.value

    if(!expDate || expDate == '') {
        alert('Es necesario establecer una fecha de expedición');
    }
    
    let endDate = new Date(expDate);
    
    if (event.target.value == 1) {
        endDate.setMonth(endDate.getMonth() + 6);
        return endDate.toISOString().split('T')[0];
    } else if (event.target.value == 2) {
        endDate.setMonth(endDate.getMonth() + 12)
        return endDate.toISOString().split('T')[0];
    }
}