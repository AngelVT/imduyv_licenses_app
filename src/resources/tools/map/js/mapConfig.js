let isInteractingWithControl = false;
const map = L.map('map', { zoomControl: false }).setView([19.851412229333601, -98.958063125610352], 13);
let marker;

let userMarker = L.BeautifyIcon.icon({
    prefix: 'bi',
    icon: 'pin-angle-fill',
    innerIconStyle: 'font-size: 32px',
    iconSize: [32, 32],
    iconAnchor: [4, 26],
    borderWidth: 0,
    backgroundColor: 'transparent',
    customClasses: 'marker-center',
    textColor: '#FF0000'
});

function createUserMarker(lat, lng) {
    lat = parseFloat(lat);
    lng = parseFloat(lng);
    if (marker) {
        map.removeLayer(marker);
    }

    marker = L.marker([lat, lng], { icon: userMarker, pane: 'topPane' }).addTo(map);
    marker.bindTooltip(`${lat.toFixed(6)}, ${lng.toFixed(6)}`, { permanent: true, direction: "bottom", className: 'tooltip-userMarker', pane: 'topPane' })

    marker.on('click', function () {
        map.removeLayer(marker);
        marker = null;
    });

    marker.on('contextmenu', function () {
        navigator.clipboard.writeText(`${lat},${lng}`);
    });
}

map.on('click', function (e) {
    if (!isInteractingWithControl) {
        createUserMarker(e.latlng.lat, e.latlng.lng);
    }
});

function loadMapView() {
    let params = new URLSearchParams(window.location.search);
    let lat = parseFloat(params.get("lat"));
    let lng = parseFloat(params.get("lng"));
    let zoom = parseInt(params.get("zoom"));

    if (!isNaN(lat) && !isNaN(lng) && !isNaN(zoom)) {
        map.setView([lat, lng], zoom);
    }
}

map.on("moveend", function () {
    let newUrl = new URL(window.location);
    let center = map.getCenter();
    let zoom = map.getZoom();

    newUrl.searchParams.set("lat", center.lat.toFixed(15));
    newUrl.searchParams.set("lng", center.lng.toFixed(15));
    newUrl.searchParams.set("zoom", zoom);

    window.history.pushState({}, "", newUrl);
});

loadMapView();

const baseMap = L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://www.google.com/">Google</a>',
});

baseMap.addTo(map);

map.createPane("topPane");

map.getPane("topPane").style.zIndex = "650";

const limitLayer = L.geoJson(limit, {
    style: {
        color: '#832339',
        fillColor: 'none',
        weight: 3,
        dashArray: "20, 7, 1, 7, 1, 7",
        lineCap: "square",
        opacity: 1,
        interactive: false,
        pane: "topPane"
    }
}).addTo(map);

function setControlInteraction(value) {
    isInteractingWithControl = value;
}

const renderedPolygons = document.querySelector('.leaflet-overlay-pane');

renderedPolygons.style.opacity = 0.5;

L.Control.search = L.Control.extend({
    onAdd: function (map) {
        let searchContainer = L.DomUtil.create("form", "");
        searchContainer.id = 'search-form';

        let searchBar = L.DomUtil.create("input", "search-bar", searchContainer);
        searchBar.id = "search-bar";
        searchBar.type = "text";

        L.DomEvent.on(searchBar, "focus", function () {
            searchBar.value = '';
        });

        let searchBtn = L.DomUtil.create("button", "bi-search search-btn", searchContainer);
        searchBtn.id = "search-btn";
        searchBtn.type = "submit";

        L.DomEvent.on(searchContainer, "submit", function (event) {
            event.preventDefault();
            const coordinatePattern = /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/;
            const coordinate = searchBar.value;

            if (!coordinatePattern.test(coordinate)) return alert('Coordenada invalida')

            const point = coordinate.split(',');

            map.setView(point, 19);

            if (marker)
                map.removeLayer(marker)

            const click = map.latLngToContainerPoint(point);

            const el = document.elementFromPoint(click.x, click.y);
            if (el) {
                el.dispatchEvent(new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                    clientX: click.x,
                    clientY: click.y
                }));
            }

            createUserMarker(point[0], point[1]);
        });

        L.DomEvent.on(searchContainer, "mouseenter", function () {
            map.scrollWheelZoom.disable();
            map.dragging.disable();
            setControlInteraction(true);
        });

        L.DomEvent.on(searchContainer, "mouseleave", function () {
            map.scrollWheelZoom.enable();
            map.dragging.enable();
            setControlInteraction(false);
        });

        return searchContainer;
    }
});

L.control.search = function (opts) {
    return new L.Control.search(opts);
};

map.addControl(L.control.search({ position: "topleft" }));

async function capture() {
    const stream = await navigator.mediaDevices.getDisplayMedia({
        preferCurrentTab: true
    });

    const vid = document.createElement("video");

    vid.addEventListener("loadedmetadata", function () {

        const canvas = document.createElement("canvas"),
            ctx = canvas.getContext("2d");
        ctx.canvas.width = vid.videoWidth;
        ctx.canvas.height = vid.videoHeight;
        ctx.drawImage(vid, 0, 0, vid.videoWidth, vid.videoHeight);

        stream.getVideoTracks()[0].stop();

        let a = document.createElement("a");
        a.download = "zonificacion.png";
        a.href = canvas.toDataURL("image/png");
        a.click();
    });

    vid.srcObject = stream;
    vid.play();
}

document.addEventListener("keydown", async (e) => {
    const searchForm = document.getElementById('search-form');

    if (e.key === "c") {
        try {
            searchForm.classList.add('dis-none');

            await capture();

            searchForm.classList.remove('dis-none');
        } catch (error) {
            searchForm.classList.remove('dis-none');
        }
    }
});

