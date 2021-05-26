const latitude = document.querySelector('#latitude'),
      longitude = document.querySelector('#longitude');
let geolocation;

// получение текущего местоположения
async function getGeolocation() {
    const url = "https://ipinfo.io/json?token=f294cabe543ad1";
    const res = await fetch(url);
    geolocation = await res.json();
}

// получение карты
async function getMap(location) {
    let loc = location.split(',');
    const lat = loc[0];
    const lon = loc[1];
    updateLocationInfo(lat, lon);

    mapboxgl.accessToken = 'pk.eyJ1IjoidmV0ZXJvazIzMiIsImEiOiJja29yNWFjdXQxMXNiMm9wOWNxNDZoMGdwIn0.aK3O96k4YDtjBBBIU8u_Uw';

    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/outdoors-v11',
        center: [lon, lat],
        zoom: 9,
    });

    var marker = new mapboxgl.Marker().setLngLat([lon, lat]).addTo(map);
}

// обновление широты и долготы
async function updateLocationInfo(lat, lon) {
    let curr_language = localStorage.getItem('language');
    if (curr_language === '1') {
        latitude.textContent = `Latitude: ${Math.floor(lat)}°${Math.round((lat - Math.floor(lat)) * 60)}'`;
        longitude.textContent = `Longitude: ${Math.floor(lon)}°${Math.round((lon - Math.floor(lon)) * 60)}'`;
    }
    else if (curr_language === '2') {
        latitude.textContent = `Широта: ${Math.floor(lat)}°${Math.round((lat - Math.floor(lat)) * 60)}'`;
        longitude.textContent = `Долгота: ${Math.floor(lon)}°${Math.round((lon - Math.floor(lon)) * 60)}'`;
    }
}

// карта
async function locMap() {
    await getGeolocation();
    getMap(geolocation.loc);
}

locMap();