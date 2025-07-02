const form = document.getElementById('loginForm');

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function sessionState() {
    const cookieRaw = getCookie('session_info');

    if (typeof cookieRaw === 'undefined') {
        return;
    }

    const cookie = JSON.parse(decodeURIComponent(cookieRaw));

    const { name, user, user_group, user_role } = cookie;

    if (!name || !user || !user_group || !user_role) {
        return;
    }

    switch (user_group) {
        case 'land_use':
            window.location.href = '/app/landMenu';
            break;

        case 'urban':
            window.location.href = '/app/urbanMenu';
            break;

        case 'all':
            window.location.href = '/app/mainMenu';
            break;

        default:
            return;
    }
}

sessionState();

form.addEventListener(
    'submit', async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData(form);

            const body = Object.fromEntries(formData);

            const res = await fetch(`/api/auth/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            const response = await res.json();
            const params = new URLSearchParams(window.location.search);
            const url = params.get('url');

            if (res.ok) {
                if (url) {
                    window.location.href = url;
                } else {
                    window.location.href = response.redirectTo;
                }
                return;
            }

            if (!res.ok) {
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