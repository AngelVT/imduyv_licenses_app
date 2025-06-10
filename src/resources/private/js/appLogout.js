const btnLogOut = document.getElementById('logout');

btnLogOut.addEventListener(
    'click', async () => {
        try {
            const res = await fetch(`/api/auth/logout`, {
                method: 'POST',
                headers:  {
                    'Content-Type': 'application/json'
                }
            });

            const response = await res.json();

            if(res.ok) {
                window.location.href = response.redirectTo;
                return;
            }

            alert("Error closing the session");

        } catch (error) {
            console.log(error);
        }
    }
);