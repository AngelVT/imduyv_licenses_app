const formSearchByInvoicePrint = document.querySelector('#form_land_byInvoicePrint');
const formatter = document.querySelector('#formatter');



formatter.addEventListener(
    'change', () => {
        changeFormatLand(formatter.value);
    }
);

formSearchByInvoicePrint.addEventListener('submit',
    event => {
        event.preventDefault();

        const formData = new FormData(formSearchByInvoicePrint);

        let data = Object.fromEntries(formData);

        getLicensePrint(data.byInvoiceType, data.byInvoice, data.byInvoiceYear);
    }
);

async function getLicensePrint(type, invoice, year) {
    await fetch(`https://192.168.180.25:3091/api/landuse/${type}/${invoice}/${year}`, {
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
                    fillDataPrint(element);
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
                element[key] = element[key].replaceAll('_','/');
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