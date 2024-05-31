/*function takeScreenshot() {
	var screenshot = document.getElementById('map').cloneNode(true);
	screenshot.style.pointerEvents = 'none';
	screenshot.style.overflow = 'hidden';
	screenshot.style.webkitUserSelect = 'none';
	screenshot.style.mozUserSelect = 'none';
	screenshot.style.msUserSelect = 'none';
	screenshot.style.oUserSelect = 'none';
	screenshot.style.userSelect = 'none';
	screenshot.dataset.scrollX = window.scrollX;
	screenshot.dataset.scrollY = window.scrollY;
	var blob = new Blob([screenshot.outerHTML], {
		type: 'text/html'
	});
	return blob;
}

function capture() {
	window.URL = window.URL || window.webkitURL;
	window.open(window.URL
		.createObjectURL(takeScreenshot()));
}*/


/*function capture() {
    html2canvas(document.getElementById('map')).then(canvas => {
        let a = document.createElement("a");
        a.download = "ss.png";
        a.href = canvas.toDataURL("image/png");
        a.click(); // MAY NOT ALWAYS WORK!
    });
}*/


async function capture() {
    let panel = document.getElementsByClassName('leaflet-top leaflet-right');
    let panel_left = document.getElementsByClassName('leaflet-top leaflet-left');
    let panel_bottom = document.getElementsByClassName('leaflet-bottom leaflet-right');
    let capture = document.getElementById('btn');

    panel[0].style.display = 'none';
    panel_left[0].style.display = 'none';
    panel_bottom[0].style.display = 'none';
    capture.style.display = 'none';

    /*panel.forEach(
        element => {
            element.style.display = 'none';
        }
    );*/

    /*document.getElementsByClassName("leaflet-top leaflet-right").forEach(
        element => {
            element.style.display = 'none';
        }
    );*/

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
        capture.style.display = 'block';
    });

    // (D) GO!
    vid.srcObject = stream;
    vid.play();
}