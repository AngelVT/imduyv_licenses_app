const btnLogOut = document.getElementById('logout');

btnLogOut.addEventListener(
    'click', async () => {
        try {
            const res = await fetch('https://192.168.180.25:3091/api/auth/logout', {
                method: 'POST',
                headers:  {
                    'Content-Type': 'application/json'
                }
            });

            if(res.ok) {
                window.location.href = res.url;
                return;
            }

            alert("Error closing the session");

        } catch (error) {
            console.log(error);
        }
    }
);