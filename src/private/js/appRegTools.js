let count = 1;

function resetSurfaceFields(inputField, unitField, outputField) {
    inputField.value = '';
    unitField.value = 'm2';
    outputField.value = '';
    count = 1;
    return;
}

function addSingleSurface(value, unit, target) {
    if(value == '' || value == null) {
        alert('Introduce una superficie valida');
        return;
    }
    count = 1;
    target.value = '';
    target.value = `${value} ${unit}`;
    return;
}

function addLocalSurface(value,unit,target) {
    if(value == '' || value == null) {
        alert('Introduce una superficie valida');
        return;
    }
    if (count == 1) {
        target.value = '';
        target.value += `L${count}: ${value} ${unit}`;
        count++;
        return;
    }
    target.value += ` | L${count}: ${value} ${unit}`;
    count++;
    return;
}

function setKey(zone, target) {
    switch (zone) {
        case "1":
            target.value = "H0.5";
            break;

        case "2":
            target.value = "H1";
            break;

        case "3":
            target.value = "H1.5";
            break;

        case "4":
            target.value = "H2";
            break;

        case "5":
            target.value = "H2.5";
            break;

        case "6":
            target.value = "H3";
            break;

        case "7":
            target.value = "H3.5";
            break;

        case "8":
            target.value = "H4";
            break;

        case "9":
            target.value = "H5";
            break;

        case "10":
            target.value = "MI";
            break;

        case "11":
            target.value = "CUMB";
            break;

        case "12":
            target.value = "CUMM";
            break;

        case "13":
            target.value = "IB";
            break;

        case "14":
            target.value = "IM";
            break;

        case "15":
            target.value = "IG";
            break;

        case "16":
            target.value = "EU";
            break;

        case "17":
            target.value = "IU";
            break;

        case "18":
            target.value = "RT";
            break;

        case "19":
            target.value = "AT";
            break;

        case "20":
            target.value = "AI";
            break;

        case "21":
            target.value = "CA";
            break;

        case "22":
            target.value = "CRA";
            break;

        case "23":
            target.value = "PH";
            break;

        default:
            target.value = "";
            break;
    }
}

async function setData(targets, coord) {
    let data = await getGeoInfo(coord.replaceAll('/',','));

    if(!data) {
        alert("Error al cargar la información asociada a la georeferencia solicitada");
        return;
    }

    targets.numericZone.value = data.data.numericZone;
    targets.zone.value = data.data.zone;
    targets.key.value = data.data.key;
    targets.tool.setAttribute('href', `/private/tools/maps/maps.html#20/${data.georeference.join('/')}`);

    if(document.querySelector('#georeference')) {
        document.querySelector('#georeference').value = data.georeference.join();
    }
}

async function getGeoInfo(georef) {
    try {
        let res = await fetch(`/app/georef/${georef}`);
        let response = await res.json();
        
        if(response.data) {
            return response;
        }
        return null;
    } catch (error) {
        console.error('Error getting georef data', error);
        return null;
    }
}

function setFormFields(formFieldSet) {
    switch (formFieldSet) {
        case 1:
            showCUS();
            break;

        case 2:
            showLUS();
            break;

        case 3:
            showLSUB();
            break;

        case 4:
            showLFUS();
            break;

        case 5:
            showPLF();
            break;

        case 6:
            showLF();
            break;

        case 7:
            showRLF();
            break;

        case 8:
            showCRPC();
            break;
    
        default:
            alert("Error cambiado formato");
            break;
    }
}

function showCUS() {
    document.querySelectorAll('.LUS').forEach(e => {
        e.classList.add("dis-none");
    });
    
    document.querySelectorAll('.LSUB').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.LFUS').forEach(e => {
        e.classList.add("dis-none");
    });
    
    document.querySelectorAll('.PLF').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.LF').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.RLF').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.CRPC').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.CUS').forEach(e => {
        e.classList.remove("dis-none");
    });
}

function showLUS() {
    document.querySelectorAll('.CUS').forEach(e => {
        e.classList.add("dis-none");
    });
    
    document.querySelectorAll('.LSUB').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.LFUS').forEach(e => {
        e.classList.add("dis-none");
    });
    
    document.querySelectorAll('.PLF').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.LF').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.RLF').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.CRPC').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.LUS').forEach(e => {
        e.classList.remove("dis-none");
    });
}

function showLSUB() {
    document.querySelectorAll('.LUS').forEach(e => {
        e.classList.add("dis-none");
    });
    
    document.querySelectorAll('.CUS').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.LFUS').forEach(e => {
        e.classList.add("dis-none");
    });
    
    document.querySelectorAll('.PLF').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.LF').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.RLF').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.CRPC').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.LSUB').forEach(e => {
        e.classList.remove("dis-none");
    });
}

function showLFUS() {
    document.querySelectorAll('.LUS').forEach(e => {
        e.classList.add("dis-none");
    });
    
    document.querySelectorAll('.LSUB').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.CUS').forEach(e => {
        e.classList.add("dis-none");
    });
    
    document.querySelectorAll('.PLF').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.LF').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.RLF').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.CRPC').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.LFUS').forEach(e => {
        e.classList.remove("dis-none");
    });
}

function showPLF() {
    document.querySelectorAll('.LUS').forEach(e => {
        e.classList.add("dis-none");
    });
    
    document.querySelectorAll('.LSUB').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.LFUS').forEach(e => {
        e.classList.add("dis-none");
    });
    
    document.querySelectorAll('.CUS').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.LF').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.RLF').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.CRPC').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.PLF').forEach(e => {
        e.classList.remove("dis-none");
    });
}

function showLF() {
    document.querySelectorAll('.LUS').forEach(e => {
        e.classList.add("dis-none");
    });
    
    document.querySelectorAll('.LSUB').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.LFUS').forEach(e => {
        e.classList.add("dis-none");
    });
    
    document.querySelectorAll('.PLF').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.CUS').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.RLF').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.CRPC').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.LF').forEach(e => {
        e.classList.remove("dis-none");
    });
}

function showRLF() {
    document.querySelectorAll('.LUS').forEach(e => {
        e.classList.add("dis-none");
    });
    
    document.querySelectorAll('.LSUB').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.LFUS').forEach(e => {
        e.classList.add("dis-none");
    });
    
    document.querySelectorAll('.PLF').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.LF').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.CUS').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.CRPC').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.RLF').forEach(e => {
        e.classList.remove("dis-none");
    });
}

function showCRPC() {
    document.querySelectorAll('.LUS').forEach(e => {
        e.classList.add("dis-none");
    });
    
    document.querySelectorAll('.LSUB').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.LFUS').forEach(e => {
        e.classList.add("dis-none");
    });
    
    document.querySelectorAll('.PLF').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.LF').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.RLF').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.CUS').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.CRPC').forEach(e => {
        e.classList.remove("dis-none");
    });
}