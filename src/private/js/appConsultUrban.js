const resultContainer = document.querySelector('#results_container');

async function getLicensesUrban() {
    await fetch(`https://192.168.180.25:3091/api/urban/`, {
            method: 'GET',
            credentials: 'include'
        })
        .then(async res => {
            if(res.ok){
                let response = await res.json();

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
            alert('An error ocurred', error);
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

    

    if (!confirm(mensaje)) {
        return;
    }

    await fetch(`https://192.168.180.25:3091/api/urban/${id}`, {
            method: 'PATCH',
            credentials: 'include',
            body: formData
        })
        .then(async res => {
            if(res.ok){
                if (form.querySelector('.input-interface')) {
                    form.querySelector('input[type=hidden]').value = form.querySelector('.input-interface').value;
                }

                if (form.querySelector('.input-file')) {
                    let img = document.querySelector(`#result_fields_${id}`).querySelector('img');
                    img.setAttribute('src', `/urbanStorage/${form.querySelector('input[type=hidden]').value}?${new Date().getTime()}`);
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
            console.error('Error updating data: ', error)
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

    await fetch(`https://192.168.180.25:3091/api/urban/${id}`, {
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
            console.error('Error deleting registry: ', error)
        });
}

//-------------------------------------------------------------------

getLicensesUrban();

/*let obj = {
    "id": 1,
    "fullInvoice": "IMDUyV_DLyCU_LUS_001_2024",
    "invoice": 1,
    "licenseType": 2,
    "year": 2024,
    "requestDate": "2024-05-22",
    "requestorName": "alguien",
    "legalRepresentative": "alguien legal",
    "elaboratedBy": "someone",
    "address": "Calle Aqui",
    "colony": "Aqui",
    "catastralKey": 14413080030325,
    "surfaceTotal": "34 m2",
    "zoneImage": "IMDUyV_DLyCU_LUS_001_2024_zone.png",
    "licenseZone": 3,
    "expeditionDate": "2024-05-23",
    "collectionOrder": 1,
    "paymentDate": "2024-05-23",
    "billInvoice": 12,
    "authorizedquantity": 14456,
    "deliveryDate": "2024-05-24",
    "receiverName": "someone who receives",
    "observations": "none",
    "createdAt": "2024-05-22T23:00:41.000Z",
    "updatedAt": "2024-05-27T22:48:16.000Z",
    "urbanType": {
      "licenseType": "LUS"
    },
    "zone": {
      "licenseZone": "Densidad media baja (Unifamiliar)",
      "licenseKey": "H1.5"
    }
  }

  let obj2 = {
    "id": 2,
    "fullInvoice": "IMDUyV_DLyCU_LUS_001_2024",
    "invoice": 1,
    "licenseType": 2,
    "year": 2024,
    "requestDate": "2024-05-22",
    "requestorName": "alguien",
    "legalRepresentative": "alguien legal",
    "elaboratedBy": "someone",
    "address": "Calle Aqui",
    "colony": "Aqui",
    "catastralKey": 14413080030325,
    "surfaceTotal": "34 m2",
    "zoneImage": "IMDUyV_DLyCU_LUS_001_2024_zone.png",
    "licenseZone": 3,
    "expeditionDate": "2024-05-23",
    "collectionOrder": 1,
    "paymentDate": "2024-05-23",
    "billInvoice": 12,
    "authorizedquantity": 14456,
    "deliveryDate": "2024-05-24",
    "receiverName": "someone who receives",
    "observations": "none",
    "createdAt": "2024-05-22T23:00:41.000Z",
    "updatedAt": "2024-05-27T22:48:16.000Z",
    "urbanType": {
      "licenseType": "LUS"
    },
    "zone": {
      "licenseZone": "Densidad media baja (Unifamiliar)",
      "licenseKey": "H1.5"
    }
  }

createUrbanResult(obj, resultContainer);

createUrbanResult(obj2, resultContainer);

/*let resultContent = createResultContent(12);
let field = createResultField(12, 'Nombre del solicitante', 'requestorName', 'Someone', 'text')

resultContent.appendChild(field);

document.querySelector('#results_container').appendChild(createResult(
    12,
    createResultTop(12, 'IMDUyV/DLyCU/LSUB/007/2024'), 
    resultContent
));*/