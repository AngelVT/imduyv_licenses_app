export function specialDataToJSON(OBJ) {
    if (OBJ.length > 0) {
        for (const element of OBJ) {
            element.licenseSpecialData = JSON.parse(element.licenseSpecialData);
        }
        return OBJ;
    }

    OBJ.licenseSpecialData = JSON.parse(OBJ.licenseSpecialData);

    return OBJ;
}