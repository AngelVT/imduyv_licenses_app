const thaForm = document.getElementById('form_reg');

thaForm.addEventListener(
    'submit', async event => {
        event.preventDefault();

        const formData = new FormData(thaForm);

        await fetch(`/api/urban/`, {
            method: 'POST',
            credentials: 'include',
            body: formData
        })
            .then(async res => {
                if (res.ok) {
                    let content = res.headers.get('Content-Type');
                    if (content.includes('text/html')) {
                        location.href = res.url;
                        return;
                    }
                    
                    let response = await res.json();

                    alert(`
                    Licencia registrada: ${response.fullInvoice}
                    Folio: ${response.dbInvoice}`);
                    thaForm.reset();
                    return;
                }
                alert("Registro no exitoso");
                return;
            })
            .catch(error => {
                console.error('Error uploading file: ', error)
            });
    }
);