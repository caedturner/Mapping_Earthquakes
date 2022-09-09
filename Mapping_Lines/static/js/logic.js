// Add console.log to ccheck to see if our code is working
console.log("working");

// create the map object with a center and zoom level
let map = L.map('mapid').setView([37.6509, -97.4287],5);

// Mapping Lines
// Placing 2 cities lng and lat in an array for leaflet
// Coordinates for each point to be used in the polyline.
let line = [
  [37.6213, -122.3790],
  [45.5898, -122.5951],
  [30.1975, -97.6664],
  [43.6777, -79.6248],
  [40.6413, -73.7781]
];

// Create a polyline using the line coordinates and make the line red.
L.polyline(line, {
  color:"blue",
  weight: 4,
  dashArray: '10, 10', dashOffset: '0',
  opacity: 0.5 
}).addTo(map);

// We create the tile layer that will be the background of our map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href= "https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map
streets.addTo(map);

