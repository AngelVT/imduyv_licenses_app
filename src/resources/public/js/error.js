const url = window.location.href;
const image = document.getElementById('image');
const message = document.getElementById('message')

const params = new URLSearchParams(new URL(url).search);

const msg = params.get('msg');
const code = params.get('code');

if (msg) {
    message.innerText = msg;
    
    if (code == 401) {
        image.setAttribute('src', '/public/img/locked.png');
        image.setAttribute('class', 'w-25 margin-bottom-large img-shadow');
    }
}