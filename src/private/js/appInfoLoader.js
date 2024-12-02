const labelUser = document.getElementById('user_name');

async function getUserData() {
    try {
        const res = await fetch(`/api/users/info`, { method: 'GET',});
        
        const response = await res.json();

        if (res.ok) {
            labelUser.innerHTML = ` ${response.name}`;
            const mm = document.getElementById('mm');
            const administration = document.getElementById('admin_link');
            const sysadmin = document.getElementById('sys_link');

            if(mm){
                if (response.group == 'all') {
                    mm.classList.remove('dis-none');
                }
            }

            if (administration) {
                if (response.role == 'admin' || response.role == 'system') {
                    administration.classList.remove('dis-none');
                }
            }

            if (sysadmin) {
                if (response.role == 'system') {
                    sysadmin.classList.remove('dis-none');
                }
            }
            return;
        }
        
        labelUser.innerHTML = ' Generic User';
        console.log(response.msg);
    } catch (error) {
        console.log(error);
    }
}

getUserData();