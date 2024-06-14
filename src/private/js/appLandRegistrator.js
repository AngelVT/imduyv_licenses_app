const thaForm = document.getElementById('form_reg');

thaForm.addEventListener(
    'submit', async event => {
        event.preventDefault();

        const formData = new FormData(thaForm);

        await fetch(`${host}/api/landuse/`, {
            method: 'POST',
            credentials: 'include',
            body: formData
        })
        .then(res => {
            if(res.ok){
                response = res,json();
                alert(response);
            }
            return;
        })
        .catch(error => {
            console.error('Error uploading file: ', error)
        });
    }
);