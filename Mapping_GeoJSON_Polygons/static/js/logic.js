// Add console.log to ccheck to see if our code is working
console.log("working");

// create the map object with a center and zoom level
// let map = L.map('mapid').setView([30, 30],2);

// We create the tile layer that will be the background of our map
// We create the dark view tile layer that will be an option for our map.
let day = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-day-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href= "https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let night = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a Baselayer that holds both maps.
let baseMaps = {
  "Navigation Day": day,
  "Navigation Night": night
};

// create the map object with a center and zoom level
let map = L.map('mapid', {
  center: [44.0, -80.0],
  zoom: 4
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the airport GeoJSON URL
let torontoData = "https://raw.githubusercontent.com/caedturner/Mapping_Earthquakes/Mapping_GeoJSON_Linestrings/Mapping_GeoJSON_Linestrings/js/torontoRoutes.json"


// Grabbing the GeoJSON data.
d3.json(torontoData).then(function(data) {
  console.log(data);

  //Createing a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    color: "#FFFFC2",
    weight: 2,
    onEachFeature: function(feature, layer) {
      
      layer.bindPopup("<h2> Airline: " + feature.properties.airline + "</h2> <hr> <h3> Destination: " + feature.properties.dst + "</h3>");
    }
  }).addTo(map);
  
});

// Then we add our 'graymap' tile layer to the map
day.addTo(map);
