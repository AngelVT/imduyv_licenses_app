const appName = document.querySelector('#f-appName');
const appVersion = document.querySelector('#f-appVersion');
const appDescription = document.querySelector('#f-appDescription');
const appAuthor = document.querySelector('#f-appAuthor');

async function loadInfo() {
    await fetch('/app/appInfo', {
        method: 'GET',
        credentials: 'include'
    }).then(async res => {
        if (res.ok) {
            let response = await res.json();

            appName.innerText = response.appName;
            appVersion.innerText = response.version;
            appDescription.innerText = response.description;
            appAuthor.innerText = response.author;
        }
    }).catch(
        err => {
            console.log(err);
        }
    );
}

loadInfo();