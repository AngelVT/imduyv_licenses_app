const thaButton = document.querySelector('#tha_button');
const thaP = document.querySelector('#tha_json');


/*thaButton.addEventListener(
    'click', async () => {
        await fetch('https://192.168.180.25:3091/api/users/test', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                x: "LOL",
                y: 600,
                z: [12, 23]
            }),
            
        })
        .then(async res => {
            if(res.ok){
                console.log('All good');
                const response = await res.json();
                let obj = JSON.parse(response.data[2].licenseState);
                thaP.textContent = obj.z[1];
                console.log(obj)
            }
            return;
        })
        .catch(error => {
            console.error('Error uploading file: ', error)
        });
    }
)*/

thaButton.addEventListener(
    'click', async () => {
        try {
            let thaBody = {}

            for (let element of document.querySelectorAll('.dynamic')) {
                thaBody[element.id] = element.innerHTML;
            }

            let res = await fetch('https://192.168.180.25:3091/api/users/test', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: "myself",
                    stat: thaBody
                })
            })

            if (!res.ok) {
                console.log("Valió vrg carnal")
            }
            let response = await res.json();
            
            console.log(response);

            

            for(let e of response.data) {
                e.landState.licenseState = JSON.parse(e.landState.licenseState);
            }

            response.data.forEach(element => {
                console.log(element.landState.licenseState)
            });

            console.log(response.data[0].landState.licenseState.bolin2)

        } catch (error) {
            console.error('Error with test: ', error)
        }
    }
);