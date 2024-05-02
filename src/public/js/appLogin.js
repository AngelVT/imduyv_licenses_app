const form = document.getElementById('loginForm');

form.addEventListener(
    'submit', async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData(form);

            const body = Object.fromEntries(formData);

            const res = await fetch('https://192.168.180.25:3091/api/auth/signin', {
                method: 'POST',
                headers:  {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if(res.ok) {
                window.location.href = res.url;
                return;
            }

            if(!res.ok){
                const response = await res.json();
                alert(`${response.msgType} \n ${response.msg}`);
                return;
            }

            alert("Access denied");

        } catch (error) {
            console.log(error)
        }
    }
);