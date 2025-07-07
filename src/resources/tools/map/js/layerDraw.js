const loadedPatterns = {};

function drawLayer(geojson, symbols, layerName) {
    try {
        let styles = symbols.symbols;
        let geoJsonLayer;

        loadPatterns(layerName, styles);
        geoJsonLayer = L.geoJson(geojson, {
            //renderer: L.canvas(),
            style: feature => {
                if (loadedPatterns[layerName][feature.properties.ZonSec2022]) {
                    return {
                        color: styles[feature.properties.ZonSec2022].borderColor,
                        fillPattern: loadedPatterns[layerName][feature.properties.ZonSec2022],
                        fillOpacity: 1,
                        weight: styles[feature.properties.ZonSec2022].borderWidth,
                        dashArray: styles[feature.properties.ZonSec2022].dashArray,
                        lineCap: styles[feature.properties.ZonSec2022].lineCap
                    };
                }
                return {
                    color: styles[feature.properties.ZonSec2022].borderColor,
                    fillColor: styles[feature.properties.ZonSec2022].fillColor,
                    fillOpacity: 1,
                    weight: styles[feature.properties.ZonSec2022].borderWidth,
                    dashArray: styles[feature.properties.ZonSec2022].dashArray,
                    lineCap: styles[feature.properties.ZonSec2022].lineCap
                };
            },
            onEachFeature: (feature, layer) => {
                layer.on("click", (e) => {
                    L.popup(e.latlng, {
                        content:  fillChart(feature.properties), 
                        className: 'zone-sec-popup',
                        minWidth: 150,
                        maxWidth: 390,
                        offset: L.point(0, -7),
                        autoPan: false
                    }).openOn(geoJsonLayer);
                });
            }
        });

        geoJsonLayer.addTo(map);

    } catch (error) {
        console.error("Error loading GeoJSON:", error);
        alert(`Ocurrió un error al cargar la capa ${layerName}`);
    }
}

function loadPatterns(layerName, symbols) {
    loadedPatterns[layerName] = {}
    for (const key in symbols) {
        if (symbols[key].pattern) {
            loadedPatterns[layerName][key] = new L.Pattern({
                angle: symbols[key].patternAngle,
                x: 0,
                y: 0,
                width: 20,
                height: 20
            });

            loadedPatterns[layerName][key].addShape(
                new L.PatternPath({
                    color: symbols[key].fillColor,
                    fillColor: symbols[key].patternFillColor,
                    d: symbols[key].patternPath,
                    fill: symbols[key].patternFill,
                    stroke: symbols[key].patternStroke,
                    weight: symbols[key].patternWeight,
                    fillOpacity: 1
                })
            );
            loadedPatterns[layerName][key].addTo(map)
        }
    }
}

function fillChart(properties) {
    const infoChart = document.createElement('div');

    let prop = document.createElement('p')
    prop.innerHTML = `<b>Zona:</b> ${properties.ZonSec2022}`
    infoChart.appendChild(prop);

    prop = document.createElement('p')
    prop.innerHTML = `<b>Clave:</b> ${properties.Clave}`
    infoChart.appendChild(prop);

    prop = document.createElement('p')
    prop.innerHTML = `<b>Plazo:</b> ${properties.Plazo}`
    infoChart.appendChild(prop);

    prop = document.createElement('p')
    prop.innerHTML = `<b>m² brutos:</b> ${properties.m2_bruto}`
    infoChart.appendChild(prop);

    prop = document.createElement('p')
    prop.innerHTML = `<b>m² netos:</b> ${properties.m2_neto}`
    infoChart.appendChild(prop);

    prop = document.createElement('p')
    prop.innerHTML = `<b>COS:</b> ${properties.COS}`
    infoChart.appendChild(prop);

    prop = document.createElement('p')
    prop.innerHTML = `<b>Altura maxima:</b> ${properties.alt_max}`
    infoChart.appendChild(prop);

    prop = document.createElement('p')
    prop.innerHTML = `<b>Niveles:</b> ${properties.niveles}`
    infoChart.appendChild(prop);

    return infoChart
}

function clickCenter() {
    const point = map.getCenter();

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

    createUserMarker(point.lat, point.lng);
}

async function loadLayers() {
    const res = await fetch(`/api/geographic/zoneSec`, {
        method: 'GET',
        credentials: 'include'
    });

    const response = await res.json();

    if (!res.ok) {
        alert(response.msg)
        return
    }

    drawLayer(response.layer.geojson, response.layer.layer_symbols, "ZoneSec2022");

    clickCenter();
}

loadLayers();