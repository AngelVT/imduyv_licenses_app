const resultContainer = document.getElementById('user_results');

const formSearchName = document.getElementById('form_by_name');
const formSearchUsername = document.getElementById('form_by_username');
const formSearchGroup = document.getElementById('form_by_group');
const btnGetAll = document.getElementById('get_all');

const permissions = [
    "license:manage",
    "license:approve",
    "license:lock",
    "license:unlock",
    "license:read",
    "license:create",
    "license:update",
    "license:delete",
    "user:manage",
    "user:read",
    "user:create",
    "user:update",
    "user:delete",
    "administration:manage",
    "administration:read",
    "administration:create",
    "administration:update",
    "administration:delete",
    "consultant:manage",
    "consultant:read"
];

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

btnGetAll.addEventListener('click', () => {
    getAllUsers();
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

    const formFields = new FormData(form);

    let selectedPermissions = formFields.getAll('permissions');

    if (selectedPermissions.length === 0 || !selectedPermissions) {
        selectedPermissions = undefined;
    }

    const formData = Object.fromEntries(formFields);

    formData.permissions = selectedPermissions;

    if (!confirm(`Estas seguro de que quieres modificar el ${field} para el usuario ${registro}`)) {
        return;
    }

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

async function deleteResult(id) {
    let registro = document.getElementById(`result_user_${id}`).innerText;

    if (!confirm(`Estas seguro de que quieres eliminar el usuario ${registro}, esta acción es irreversible.`)) {
        return;
    }

    await fetch(`/api/users/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    .then(async res => {
        if(res.ok) {
            const response = await res.json();
            let content = res.headers.get('Content-Type');
            if (content.includes('text/html')) {
                location.href = res.url;
                return;
            }
            
            console.log(response);
            document.getElementById(`result_${id}`).remove();
            alert(`Usuario ${registro} eliminado exitosamente`);
            return;
        }

        if (!res.ok) {
            const response = await res.json();
            alert(response.msg);
            return;
        }
    })
    .catch(error => {
        alert('An error ocurred:\n' + error);
        console.error('Error updating data: ', error);
    });
}

//* User Result
function createUserResult(resObj, target) {
    resObj.id = resObj.public_user_id;
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
            <option value="4">Externo</option>
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

    let permissionContainer = document.createElement('form');
    let permissionLabel = document.createElement('label');

    permissionLabel.setAttribute('class', 'w-100 txt-center color-primary');
    permissionLabel.innerText = "Permisos:";

    permissionContainer.appendChild(permissionLabel);

    permissionContainer.setAttribute('onsubmit', `updateResultField(this, '${resObj.id}'); return false`);

    permissionContainer.setAttribute('class', 'w-100 dis-flex flex-center flex-wrap');

    let permissionSet = resObj.permissions.map(p => p.permission);

    for (const p of permissions) {
        let checkbox;
        if (permissionSet.includes(p)) {
            checkbox = createCheckbox('permissions', p, true);
            permissionContainer.appendChild(checkbox);
            continue;
        }

        checkbox = createCheckbox('permissions', p);
        permissionContainer.appendChild(checkbox);
    }

    let button = document.createElement('button');

    button.setAttribute('class', 'bi-floppy margin-vertical-small input-save w-25');

    permissionContainer.appendChild(button);

    resultContent.appendChild(permissionContainer);

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