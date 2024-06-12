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

//Editable section
const restrictions = document.querySelector('#restrictions');
const restrictionsInput = document.querySelector('#i-restrictions');

restrictions.addEventListener(
    'click', () => {
        restrictionsInput.classList.toggle('hidden');
        editable(restrictions, restrictionsInput);
    }
);

restrictionsInput.addEventListener(
    'focusout', () => {
        restrictionsInput.classList.toggle('hidden');
    }
);

const parcela = document.querySelectorAll('.parcela');
const parcelaLabel = document.querySelectorAll('.l-parcela');
const parcelaInput = document.querySelector('#i-parcela');

parcelaLabel[0].addEventListener(
    'click', () => {
        editable(parcela, parcelaInput);
    }
);

parcelaLabel[1].addEventListener(
    'click', () => {
        editable(parcela, parcelaInput);
    }
);

const property = document.querySelector('#prop');
const propertyLabel = document.querySelector('#l-prop');
const propertyInput = document.querySelector('#i-prop');

propertyLabel.addEventListener(
    'click', () => {
        editable(property, propertyInput);
    }
);


const annex = document.querySelectorAll('.annex');
const annexLabel = document.querySelectorAll('.l-annex');
const annexInput = document.querySelectorAll('.i-annex');

annexLabel[0].addEventListener(
    'click', () => {
        editable(annex[0], annexInput[0]);
    }
);

annexLabel[1].addEventListener(
    'click', () => {
        editable(annex[1], annexInput[1]);
    }
);

const dpDate = document.querySelector('#dpDate');
const dpDateLabel = document.querySelector('#l-dpDate');
const dpDateInput = document.querySelector('#i-dpDate');

dpDateLabel.addEventListener(
    'click', () => {
        editableDateES(dpDate, dpDateInput);
    }
);

function editable(target, input) {
    input.focus();

    if (target.length) {
        input.value = target[0].innerHTML;
        input.addEventListener(
            'input', () => {
                target.forEach(
                    element => {
                        element.innerHTML = input.value;
                        if (input.value == '') {
                            target.innerText = '*'
                        }
                    }
                );
            }
        );
    } else {
        input.value = target.innerHTML;
        input.addEventListener(
            'input', () => {
                target.innerHTML = input.value;
                if (input.value == '') {
                    target.innerText = '*'
                }
            }
        );
    }
}

function editableDateES(target, input) {
    input.focus();

    let months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

    input.addEventListener(
        'input', () => {
            let date = new Date(input.value);
            
            target.innerText = `${date.getDate() + 1} de ${months[date.getMonth()]} del ${date.getFullYear()}`
        }
    );

    
}

const conditions = document.querySelector('#conditions');
const addCondition = document.querySelector('#add_condition');

addCondition.addEventListener(
    'click', () => {
        createEntry(conditions);
    }
);

function createEntry(target) {
    let totalEntries = document.querySelectorAll('.li-item').length + 1;

    let liElement;
    let content;
    let btn;
    let input;


    liElement = document.createElement('li');
    liElement.setAttribute('class', 'li-item');
    liElement.setAttribute('id', `entry_${totalEntries}`);

    content = document.createElement('span');
    content.setAttribute('id', `content_${totalEntries}`);
    content.setAttribute('onclick', `editEntry(${totalEntries})`);
    content.innerText = '*';

    liElement.appendChild(content);

    btn = document.createElement('span');
    btn.setAttribute('class', 'bi bi-x-circle input_delete');
    btn.setAttribute('onclick', `deleteEntry(${totalEntries})`);

    liElement.appendChild(btn);

    input = document.createElement('textarea');
    input.setAttribute('class', 'invissible');
    input.setAttribute('id', `input_${totalEntries}`);
    input.setAttribute('onclick', `deleteEntry(${totalEntries})`);

    liElement.appendChild(input)

    target.appendChild(liElement);
}


function deleteEntry(entry) {
    document.querySelector(`#entry_${entry}`).remove();
}

function editEntry(entry) {
    let target = document.querySelector(`#content_${entry}`);
    let input = document.querySelector(`#input_${entry}`);
    editable(target, input);
}