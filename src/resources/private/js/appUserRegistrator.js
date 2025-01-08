const form = document.getElementById('user_reg_form');
const downloader = document.getElementById('downloader');

form.addEventListener('submit', async event => {
    event.preventDefault();

    const formFields = new FormData(form);

    const formData = Object.fromEntries(formFields);

    await fetch(`/api/users/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
    })
        .then(async res => {
            if (res.ok) {
                let content = res.headers.get('Content-Type');
                if (content.includes('text/html')) {
                    location.href = res.url;
                    return;
                }

                let response = await res.json();

                downloader.setAttribute('href', `/api/users/QR/${response.userQR}`);
                downloader.click();

                alert(`
                Usuario registrado
                Nombre: ${response.user.name}
                Usuario: ${response.user.username}`);
                form.reset();
                return;
            }

            let response = await res.json();

            alert(response.msg)
            return;
        })
        .catch(error => {
            console.error('Error completing request: ', error)
        });
});