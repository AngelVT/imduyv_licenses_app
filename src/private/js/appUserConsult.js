const resultContainer = document.getElementById('user_results');

const formSearchName = document.getElementById('form_by_name');
const formSearchUsername = document.getElementById('form_by_username');
const formSearchGroup = document.getElementById('form_by_group');

formSearchName.addEventListener('submit', event => {
    event.preventDefault();

    let name = Object.fromEntries(new FormData(formSearchName)).name;

    getUserByName(name);
});

formSearchUsername.addEventListener('submit', event => {
    event.preventDefault();

    let username = Object.fromEntries(new FormData(formSearchUsername)).username;

    getUserByUsername(username);
});

formSearchGroup.addEventListener('submit', event => {
    event.preventDefault();

    let group = Object.fromEntries(new FormData(formSearchGroup)).group;

    getUserByGroup(group);
});

async function getAllUsers() {
    fetch('/api/users', {
        method: 'GET',
        credentials: 'include'
    })
    .then(async res => {
        if(res.ok){
            let content = res.headers.get('Content-Type');
            if (content.includes('text/html')) {
                location.href = res.url;
                return;
            }
    
            let response = await res.json();
    
            if (response.users.length == 0) {
                alert('No hay resultados para mostrar');
                return;
            }
    
            resultContainer.innerHTML = '';
    
            response.users.forEach(element => {
                createUserResult(element, resultContainer);
            });
    
            return;
        }
    
        if (!res.ok) {
            let response = await res.json();
            alert(response.msg);
            return;
        }
    })
    .catch(error => {
        alert('An error ocurred:\n' + error);
        console.error('Error getting data: ', error)
    });
}

async function getUserByName(name) {
    const urlName = encodeURIComponent(name);
    
    fetch(`/api/users/byName/${urlName}`, {
        method: 'GET',
        credentials: 'include'
    })
    .then(async res => {
        if(res.ok){
            let content = res.headers.get('Content-Type');
            if (content.includes('text/html')) {
                location.href = res.url;
                return;
            }
    
            let response = await res.json();
    
            resultContainer.innerHTML = '';
    
            response.users.forEach(element => {
                createUserResult(element, resultContainer);
            });
            return;
        }
    
        if (!res.ok) {
            let response = await res.json();
            alert(response.msg);
            return;
        }
    })
    .catch(error => {
        alert('An error ocurred:\n' + error);
        console.error('Error getting data: ', error)
    });
}

async function getUserByUsername(username) {
    fetch(`/api/users/byUsername/${username}`, {
        method: 'GET',
        credentials: 'include'
    })
    .then(async res => {
        if(res.ok){
            let content = res.headers.get('Content-Type');
            if (content.includes('text/html')) {
                location.href = res.url;
                return;
            }
    
            let response = await res.json();
    
            resultContainer.innerHTML = '';
    
            createUserResult(response.user, resultContainer);
            return;
        }
    
        if (!res.ok) {
            let response = await res.json();
            alert(response.msg);
            return;
        }
    })
    .catch(error => {
        alert('An error ocurred:\n' + error);
        console.error('Error getting data: ', error)
    });
}

async function getUserByGroup(group) {
    fetch(`/api/users/byGroup/${group}`, {
        method: 'GET',
        credentials: 'include'
    })
    .then(async res => {
        if(res.ok){
            let content = res.headers.get('Content-Type');
            if (content.includes('text/html')) {
                location.href = res.url;
                return;
            }
    
            let response = await res.json();
    
            resultContainer.innerHTML = '';
    
            response.users.forEach(element => {
                createUserResult(element, resultContainer);
            });
    
            return;
        }
    
        if (!res.ok) {
            let response = await res.json();
            alert(response.msg);
            return;
        }
    })
    .catch(error => {
        alert('An error ocurred:\n' + error);
        console.error('Error getting data: ', error)
    });
}

async function updateResultField(form, id) {
    let registro = document.getElementById(`result_user_${id}`).innerText;
    let field = form.querySelector('label').innerText.toLowerCase().split(':')[0].replaceAll(':', '');

    if (!confirm(`Estas seguro de que quieres modificar el ${field} para el usuario ${registro}`)) {
        return;
    }

    const formFields = new FormData(form);

    const formData = Object.fromEntries(formFields);

    if (formData.password) {
        if (!validatePassword(formData.password)) {
            alert('La contraseña no cumple con los requisitos mínimos')
            return;
        }
    }

    await fetch(`/api/users/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
    })
    .then(async res => {
        if(res.ok) {
            let content = res.headers.get('Content-Type');
            if (content.includes('text/html')) {
                location.href = res.url;
                return;
            }

            if (form.querySelector('.input-interface')) {
                form.querySelector('input[type=hidden]').value = form.querySelector('.input-interface').value;
            }
            
            alert(`Cambios guardados exitosamente para el usuario ${registro}`);
            return;
        }

        if (!res.ok) {
            let response = await res.json();
            alert(response.msg);
            return;
        }
    })
    .catch(error => {
        alert('An error ocurred:\n' + error);
        console.error('Error updating data: ', error);
    });
}

//* Urban Result
function createUserResult(resObj, target) {
    let resultContent = generateUserFields(resObj, createResultContent(resObj.id, false));

    let newResult = createResult(
        resObj.id,
        createUserResultTop(resObj), 
        resultContent);

    target.appendChild(newResult);
}

function generateUserFields(resObj, resultContent) {
    let field;
    
    field = createResultField(resObj.id, 'Nombre del usuario', 'name', resObj.name, 'text');
    
    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Contraseña', 'password', '', 'password');
    
    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Grupo', 'group', resObj.groupId, 'select');

    field.querySelector('select').innerHTML = `
            <option value="1">Todos</option>
            <option value="2">Uso de suelo</option>
            <option value="3">Acciones urbanas</option>
            `

    field.querySelector('select').value = resObj.groupId;

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Role', 'role', resObj.roleId, 'select');

    field.querySelector('select').innerHTML = `
            <option value="1">Sistema</option>
            <option value="2">Administrador</option>
            <option value="3">Moderador</option>
            <option value="4">Usuario</option>
            `

    field.querySelector('select').value = resObj.roleId;

    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Requiere cambio de contraseña', 'requiredPasswordReset', resObj.requiredPasswordReset, 'checkbox');
    
    resultContent.appendChild(field);

    field = createResultField(resObj.id, 'Bloqueado', 'locked', resObj.locked, 'checkbox');
    
    resultContent.appendChild(field);

    return resultContent;
}

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