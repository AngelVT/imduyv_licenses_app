const form = document.getElementById('pwr_form');
const passwordField = document.getElementById('new_password_field');
const passwordConfirm = document.getElementById('password_confirm');

form.addEventListener('submit', async event => {
    event.preventDefault();

    if (!passwordConfirm.value) {
        alert('Es necesario confirmar tu nueva contraseña');
        passwordConfirm.focus()
        return;
    }

    if (passwordField.value !== passwordConfirm.value) {
        alert('La contraseña nueva y la confirmación no coinciden');
        return;
    }

    if (!validatePassword(passwordField.value)) {
        alert('La contraseña nueva no cumple con los requisitos mínimos');
        return
    }

    const formFields = new FormData(form);

    const formData = Object.fromEntries(formFields);

    await fetch(`/api/auth/passwordReset`, {
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

                alert('Cambio de contraseña exitoso');
                location.href = '/app/mainMenu';
                return;
            }

            let response = await res.json();

            alert(response.msg);
            return;
        })
        .catch(error => {
            console.error('Error completing request: ', error)
        });
});

function validatePassword(password) {
    if (password.length < 12) {
        return false;
    }

    if (!/[A-Z]/.test(password)) {
        return false;
    }

    if (!/[a-z]/.test(password)) {
        return false;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return false;
    }

    return true;
}