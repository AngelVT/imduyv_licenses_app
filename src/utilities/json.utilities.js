export function specialDataToJSON(OBJ) {
    
    if (OBJ.length > 0) {
        for (const element of OBJ) {
            if (typeof element.licenseSpecialData !== 'string') continue;
            element.licenseSpecialData = JSON.parse(element.licenseSpecialData);
        }
        return OBJ;
    }
    if (typeof OBJ.licenseSpecialData !== 'string') return OBJ;
    OBJ.licenseSpecialData = JSON.parse(OBJ.licenseSpecialData);

    return OBJ;
}