const labelUser = document.getElementById('user_name');

async function getUserData() {
    try {
        const res = await fetch('https://192.168.180.25:3091/api/users/info', { method: 'GET',});
        
        const response = await res.json();

        if (res.ok) {
            labelUser.innerHTML = ` ${response.name}`;
            const mm = document.getElementById('mm');

            if(mm){
                if (response.group == 'all') {
                    mm.style.display = 'inline-block'
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