const thaForm = document.getElementById('form_reg');

thaForm.addEventListener(
    'submit', async event => {
        event.preventDefault();

        const formData = new FormData(thaForm);

        await fetch('https://192.168.180.25:3091/api/landuse/', {
            method: 'POST',
            credentials: 'include',
            body: formData
        })
        .then(res => {
            if(res.ok){
                console.log('All good');
            }
            return;
        })
        .catch(error => {
            console.error('Error uploading file: ', error)
        });
    }
);