const latitude = document.querySelector('#latitude'),
      longitude = document.querySelector('#longitude');

let geolocation;

const delay = async (ms) => await new Promise(resolve => setTimeout(resolve, ms));

async function getGeolocation() {
    const url = "https://ipinfo.io/json?token=f294cabe543ad1";
    const res = await fetch(url);
    geolocation = await res.json();
}

async function getMap(location) {
    let loc = location.split(',');
    console.log(loc);
    const lat = loc[0];
    const lon = loc[1];
    updateLocationInfo(lat, lon);

    mapboxgl.accessToken = 'pk.eyJ1IjoidmV0ZXJvazIzMiIsImEiOiJja29yNWFjdXQxMXNiMm9wOWNxNDZoMGdwIn0.aK3O96k4YDtjBBBIU8u_Uw';

    let map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/outdoors-v11', // style URL
        center: [lon, lat], // starting position [lng, lat]
        zoom: 9, // starting zoom
    });
}

async function updateLocationInfo(lat, lon) {
    latitude.textContent = `Latitude: ${Math.floor(lat)}°${Math.round((lat - Math.floor(lat)) * 60)}'`;
    longitude.textContent = `Longitude: ${Math.floor(lon)}°${Math.round((lon - Math.floor(lon)) * 60)}'`;
}

async function locMap() {
    await getGeolocation();
    getMap(geolocation.loc);
}

locMap();