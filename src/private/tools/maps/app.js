const panel = document.getElementsByClassName('leaflet-top leaflet-right');
const panel_left = document.getElementsByClassName('leaflet-top leaflet-left');
const panel_bottom = document.getElementsByClassName('leaflet-bottom leaflet-right');
const captureBtn = document.getElementById('btn');

document.addEventListener('DOMContentLoaded', () => {
    // Obtener el centro de la ventana
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Crear un nuevo evento de clic
    const clickEvent = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: centerX,
        clientY: centerY
    });

    // Función para disparar el evento de clic en el elemento
    const triggerClick = () => {
        // Obtener el elemento en las coordenadas del centro de la página
        const element = document.elementFromPoint(centerX, centerY);

        // Disparar el evento de clic en el elemento
        if (element) {
            element.dispatchEvent(clickEvent);
        }
    };

    // Hacer una pausa de 2 segundos antes de simular el clic
    setTimeout(triggerClick, 500);
});

async function capture() {
    panel[0].style.display = 'none';
    panel_left[0].style.display = 'none';
    panel_bottom[0].style.display = 'none';
    captureBtn.style.display = 'none';

    // (A) GET MEDIA STREAM
    const stream = await navigator.mediaDevices.getDisplayMedia({
        preferCurrentTab: true
    });

    // (B) STREAM TO VIDEO
    const vid = document.createElement("video");

    // (C) VIDEO TO CANVAS
    vid.addEventListener("loadedmetadata", function () {
        // (C1) CAPTURE VIDEO FRAME ON CANVAS
        const canvas = document.createElement("canvas"),
            ctx = canvas.getContext("2d");
        ctx.canvas.width = vid.videoWidth;
        ctx.canvas.height = vid.videoHeight;
        ctx.drawImage(vid, 0, 0, vid.videoWidth, vid.videoHeight);

        // (C2) STOP MEDIA STREAM
        stream.getVideoTracks()[0].stop();
        // (C3) "FORCE DOWNLOAD"
        let a = document.createElement("a");
        a.download = "zonificacion.png";
        a.href = canvas.toDataURL("image/png");
        a.click(); // MAY NOT ALWAYS WORK!

        panel[0].style.display = 'block';
        panel_left[0].style.display = 'block';
        panel_bottom[0].style.display = 'block';
        captureBtn.style.display = 'flex';
    });

    // (D) GO!
    vid.srcObject = stream;
    vid.play();
}

document.querySelector('#btn').addEventListener(
    'click', async () => {
        try {
            await capture();
        } catch (error) {
            console.log(error);
            panel[0].style.display = 'block';
            panel_left[0].style.display = 'block';
            panel_bottom[0].style.display = 'block';
            captureBtn.style.display = 'flex';
        }
    }
);