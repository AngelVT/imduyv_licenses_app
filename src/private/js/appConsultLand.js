const resultContainer = document.querySelector('#results_container');

async function getLicensesLand() {
    await fetch(`https://192.168.180.25:3091/api/landuse/`, {
            method: 'GET',
            credentials: 'include'
        })
        .then(async res => {
            if(res.ok){
                let response = await res.json();

                response.data.forEach(element => {
                    createLandResult(element, resultContainer);
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

async function updateResult(form) {

    if (!confirm("Seguro que quieres modificar el registro")) {
        return;
    }

    const formData = new FormData(form);
    
    let id = form.getAttribute('id');

    await fetch(`https://192.168.180.25:3091/api/landuse/${id}`, {
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
            console.error('Error uploading file: ', error)
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

    await fetch(`https://192.168.180.25:3091/api/landuse/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        })
        .then(async res => {
            if(res.ok){
                document.querySelector(`#result_${id}`).remove();
                return;
            }

            if (!res.ok) {
                let response = await res.json();
                alert(response.msg);
                return;
            }
        })
        .catch(error => {
            console.error('Error uploading file: ', error);
        });
}

//-------------------------------------------------------------------
getLicensesLand();
/*const resultContainer = document.querySelector('#results_container');

let obj = {
    "id": 2,
    "fullInvoice": "IMDUyV_DLyCU_DP_002_2024",
    "invoice": 2,
    "licenseType": 7,
    "year": 2024,
    "requestorName": "someone",
    "attentionName": "my brothar",
    "requestDate": "2024-05-21",
    "address": "here",
    "number": "S/N",
    "colony": "this colony",
    "surfaceTotal": "200 m2",
    "catastralKey": 14413080030325,
    "licenseTerm": 1,
    "geoReference": "somegeo, anothergeo",
    "zoneImage": "IMDUyV_DLyCU_DP_002_2024_zone.png",
    "licenseZone": 1,
    "authorizedUse": 1,
    "businessLinePrint": "print business line",
    "businessLineIntern": "some businessline",
    "expeditionDate": "2024-05-22",
    "licenseValidity": 2,
    "paymentInvoice": "1445",
    "expirationDate": "2024-05-23",
    "licenseExpeditionType": 1,
    "contactPhone": 7791042842,
    "cost": 1,
    "discount": 0,
    "paymentDone": 1,
    "inspector": "myself 3.0",
    "createdAt": "2024-05-22T15:44:09.000Z",
    "updatedAt": "2024-05-22T20:20:18.000Z",
    "type": {
      "licenseType": "DP"
    },
    "term": {
      "licenseTerm": "corto"
    },
    "zone": {
      "licenseZone": "Densidad muy baja (Unifamiliar)",
      "licenseKey": "H0.5"
    },
    "authUse": {
      "licenseAuthUse": "Unifamiliar, plurifamiliar o multifamiliar"
    },
    "validity": {
      "licenseValidity": "seis meses"
    },
    "expeditionType": {
      "licenseExpType": "nueva"
    }
  }

  let obj2 = {
    "id": 3,
    "fullInvoice": "IMDUyV_DLyCU_LC_001_2024",
    "invoice": 1,
    "licenseType": 3,
    "year": 2024,
    "requestorName": "someone",
    "attentionName": "my brothar",
    "requestDate": "2024-05-21",
    "address": "here",
    "number": "S/N",
    "colony": "this colony",
    "surfaceTotal": "200 m2",
    "catastralKey": 14413080030325,
    "licenseTerm": 1,
    "geoReference": "somegeo, anothergeo",
    "zoneImage": "IMDUyV_DLyCU_LC_001_2024_zone.png",
    "licenseZone": 1,
    "authorizedUse": 1,
    "businessLinePrint": "print business line",
    "businessLineIntern": "some businessline",
    "expeditionDate": "2024-05-22",
    "licenseValidity": 1,
    "paymentInvoice": "1445",
    "expirationDate": "2024-05-23",
    "licenseExpeditionType": 1,
    "contactPhone": 7791042842,
    "cost": 1,
    "discount": 0,
    "paymentDone": 1,
    "inspector": "myself 3.0",
    "createdAt": "2024-05-22T15:44:14.000Z",
    "updatedAt": "2024-05-22T20:23:10.000Z",
    "type": {
      "licenseType": "LC"
    },
    "term": {
      "licenseTerm": "corto"
    },
    "zone": {
      "licenseZone": "Densidad muy baja (Unifamiliar)",
      "licenseKey": "H0.5"
    },
    "authUse": {
      "licenseAuthUse": "Unifamiliar, plurifamiliar o multifamiliar"
    },
    "validity": {
      "licenseValidity": "doce meses"
    },
    "expeditionType": {
      "licenseExpType": "nueva"
    }
  }

createUrbanResult(obj, resultContainer);

createUrbanResult(obj2, resultContainer);*/