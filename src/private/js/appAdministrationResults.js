const municipalResults = document.getElementById('municipal_results');
const instituteResults = document.getElementById('institute_results');
const licenseResults = document.getElementById('license_results');

async function getMunicipalPeriods() {
    await fetch(`/api/administration/municipalPeriod`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
        .then(async res => {
            let response = await res.json();
            if (res.ok) {
                let content = res.headers.get('Content-Type');
                if (content.includes('text/html')) {
                    location.href = res.url;
                    return;
                }

                for (const element of response.periods) {
                    let p = document.createElement('p');
                    p.innerText = element.municipalPresident;

                    municipalResults.appendChild(p);
                }

                return;
            }
            alert(response.msg);
            return;
        })
        .catch(error => {
            console.error('Error during fetch: ', error)
        });
}

async function getInstitutePeriods() {
    await fetch(`/api/administration/institutePeriod`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
        .then(async res => {
            let response = await res.json();
            if (res.ok) {
                let content = res.headers.get('Content-Type');
                if (content.includes('text/html')) {
                    location.href = res.url;
                    return;
                }

                for (const element of response.periods) {
                    let p = document.createElement('p');
                    p.innerText = element.directorName;

                    instituteResults.appendChild(p);
                }

                return;
            }
            alert(response.msg);
            return;
        })
        .catch(error => {
            console.error('Error during fetch: ', error)
        });
}

async function getLicensesPeriods() {
    await fetch(`/api/administration/licensesPeriod`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
        .then(async res => {
            let response = await res.json();
            if (res.ok) {
                let content = res.headers.get('Content-Type');
                if (content.includes('text/html')) {
                    location.href = res.url;
                    return;
                }

                for (const element of response.periods) {
                    let p = document.createElement('p');
                    p.innerText = element.directorName;

                    licenseResults.appendChild(p);
                }

                return;
            }
            alert(response.msg);
            return;
        })
        .catch(error => {
            console.error('Error during fetch: ', error)
        });
}

getMunicipalPeriods();

getInstitutePeriods();

getLicensesPeriods();