const thaForm = document.getElementById('tha_form');
const fileInput = document.getElementById('file_input');

thaForm.addEventListener(
    'submit', async event => {
        event.preventDefault();

        const file = fileInput.files[0];

        const formData = new FormData(thaForm);

        await fetch('https://192.168.180.25:3091/api/users/test', {
            method: 'POST',
            credentials: 'include',
            body: formData
        })
        .then(res => {
            if(res.ok){
                console.log('All good');
            }
            return
        })
        .catch(error => {
            console.error('Error uploading file: ', error)
        });
    }
);