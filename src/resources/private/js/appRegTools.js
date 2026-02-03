let count = 1;

function resetSurfaceFields(inputField, unitField, outputField) {
    inputField.value = '';
    unitField.value = 'm2';
    outputField.value = '';
    count = 1;
    return;
}

function addSingleSurface(value, unit, target) {
    if(value == '' || value == null  || !/^[0-9.-]+$/.test(value)) {
        alert('Introduce una superficie valida');
        return;
    }

    count = 1;
    target.value = '';
    target.value = `${value.toLocaleString()} ${unit}`;
    return;
}

function addLocalSurface(value,unit,target) {
    if(value == '' || value == null || !/^[0-9.-]+$/.test(value)) {
        alert('Introduce una superficie valida');
        return;
    }

    if (count == 1) {
        target.value = '';
        target.value += `L${count}: ${value.toLocaleString()} ${unit}`;
        count++;
        return;
    }
    target.value += ` | L${count}: ${value.toLocaleString()} ${unit}`;
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
    let geoRefData = await getGeoInfo(coord.replaceAll('/',','));

    if(!geoRefData) return;

    if (targets.numericZone) {
        targets.numericZone.value = geoRefData.data.numericZone;
    }
    
    if (targets.zone) {
        targets.zone.value = geoRefData.data.zone;
    }
    
    if (targets.key) {
        targets.key.value = geoRefData.data.key;
    }

    if (targets.term) {
        targets.term.value = geoRefData.data.numericTerm;
    }
    if (targets.COS) {
        targets.COS.value = geoRefData.data.COS;
    }
    if(targets.m2_neto) {
        targets.m2_neto.value = geoRefData.data.m2_neto;
    }
    if(targets.alt_max) {
        targets.alt_max.value = geoRefData.data.alt_max;
    }
    if (targets.niveles) {
        targets.niveles.value = geoRefData.data.niveles;
    }
    if(targets.PCU) {
        targets.PCU.value = geoRefData.data.PCU
    }

    const { origin } = window.location;

    const href = targets.tool.getAttribute('href');
    
    const url = new URL(`${origin}${href}`);

    const params = url.searchParams;

    params.set('lat', geoRefData.georeference[0])
    params.set('lng', geoRefData.georeference[1])

    targets.tool.setAttribute('href', url);

    if(document.querySelector('#georeference')) {
        document.querySelector('#georeference').value = geoRefData.georeference.join();
    }
}

async function getGeoInfo(georef) {
    try {
        let res = await fetch(`/api/geographic/pointInfo/${georef}`);
        let response = await res.json();

        if (res.ok) {
            if (response.warning && URBAN_GEO_INFO) {
                alert(response.warning);
                return;
            }
            return response;
        }
        
        if (response.msg) {
            alert(response.msg)
            return;
        }
    } catch (error) {
        console.error('Error getting georef data', error);
        alert("Error al consultar georeferencia", error);
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

        case 9:
            showLUH();
            break;
    
        default:
            alert("Error cambiado formato");
            break;
    }
}

function showCUS() {
    isFracHidden.removeAttribute('value');
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

    document.querySelectorAll('.LUH').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.CUS').forEach(e => {
        e.classList.remove("dis-none");
    });
}

function showLUS() {
    isFracHidden.removeAttribute('value');
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

    document.querySelectorAll('.LUH').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.LUS').forEach(e => {
        e.classList.remove("dis-none");
    });
}

function showLSUB() {
    isFracHidden.removeAttribute('value');
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

    document.querySelectorAll('.LUH').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.LSUB').forEach(e => {
        e.classList.remove("dis-none");
    });
}

function showLFUS() {
    isFracHidden.removeAttribute('value');
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

    document.querySelectorAll('.LUH').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.LFUS').forEach(e => {
        e.classList.remove("dis-none");
    });
}

function showPLF() {
    isFracHidden.removeAttribute('value');
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

    document.querySelectorAll('.LUH').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.PLF').forEach(e => {
        e.classList.remove("dis-none");
    });
}

function showLF() {
    isFracHidden.removeAttribute('value');
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

    document.querySelectorAll('.LUH').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.LF').forEach(e => {
        e.classList.remove("dis-none");
    });
}

function showRLF() {
    isFracHidden.removeAttribute('value');
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

    document.querySelectorAll('.LUH').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.RLF').forEach(e => {
        e.classList.remove("dis-none");
    });
}

function showCRPC() {
    isFracHidden.removeAttribute('value');
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

    document.querySelectorAll('.LUH').forEach(e => {
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.CRPC').forEach(e => {
        e.classList.remove("dis-none");
    });
}

function showLUH() {
    isFracHidden.removeAttribute('value');
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
        e.classList.add("dis-none");
    });

    document.querySelectorAll('.LUH').forEach(e => {
        e.classList.remove("dis-none");
    });
}

function dateFormatFull(dateNumeric) {
    let months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril", 
        "Mayo", 
        "Junio", 
        "Julio", 
        "Agosto", 
        "Septiembre", 
        "Octubre", 
        "Noviembre", 
        "Diciembre"];
    let date = dateNumeric.split('-');
    return `${date[2]} de ${months[parseInt(date[1])-1]} del ${date[0]}`;
}