// Add console.log to ccheck to see if our code is working
console.log("working");

// create the map object with a center and zoom level
// let map = L.map('mapid').setView([30, 30],2);

// We create the tile layer that will be the background of our map
// We create the dark view tile layer that will be an option for our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href= "https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
}); 

// Create a Baselayer that holds both maps.
let baseMaps = {
  "Streets": streets,
  "Satellite Streets": satelliteStreets
};

// create the map object with a center and zoom level
let map = L.map('mapid', {
  center: [44.0, -80.0],
  zoom: 4
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the airport GeoJSON URL
let torontoHoods = "https://raw.githubusercontent.com/caedturner/Mapping_Earthquakes/Mapping_GeoJSON_Polygons/Mapping_GeoJSON_Polygons/torontoNeighborhoods.json"

// Grabbing the GeoJSON data.
d3.json(torontoHoods).then(function(data) {
  console.log(data);

  //Createing a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    weight: 1,
    fillColor: "yellow",
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h2> Neighborhood: " + feature.properties.AREA_NAME + "</h2>" )
    }
  }).addTo(map);
  
});

// Then we add our 'graymap' tile layer to the map
streets.addTo(map);
