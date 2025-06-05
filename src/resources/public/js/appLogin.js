const form = document.getElementById('loginForm');

form.addEventListener(
    'submit', async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData(form);

            const body = Object.fromEntries(formData);

            const res = await fetch(`/api/auth/signin`, {
                method: 'POST',
                headers:  {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            const response = await res.json();
            const params = new URLSearchParams(window.location.search);
            const url = params.get('url');

            if(res.ok) {
                if (url) {
                    window.location.href = url;
                } else {
                    window.location.href = response.redirectTo;
                }
                return;
            }

            if(!res.ok){
                alert(`Access denied\n${response.msg}`);
                document.querySelector('#in_pass').value = '';
                return;
            }

            alert("Access denied");

        } catch (error) {
            console.log(error)
        }
    }
);