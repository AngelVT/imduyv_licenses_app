let count = 1;

function resetSurfaceFields(inputField, unitField, outputField) {
    inputField.value = '';
    unitField.value = 'm2';
    outputField.value = '';
    count = 1;
    return;
}

function addSingleSurface(value, unit, target) {
    target.value = `${value} ${unit}`;
    return;
}

function addLocalSurface(value,unit,target) {
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