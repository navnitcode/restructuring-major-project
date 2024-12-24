
mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [77.4126, 23.2599], // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9 // starting zoom
});

console.log(coordinates);

const marker = new mapboxgl.Marker()
    .setLngLat([12.554729, 55.70651]) //listing.geometry.coordinates
    .addTo(map);






