// type this in terminal to get data: python -m http.server 8080 --bind 127.0.0.1

d3.json("team_venuej2.json").then((importedData) => {
  var data = importedData;
  
  console.log(data);
  

// An array that will store the created venueMarkers
  var venueMarkers = [];
  

  for (var i = 0; i < data.length; i++) {
 
    venueMarkers.push(
      L.marker(data[i].Location).bindPopup(`<h2>${data[i].Team_Name} </h2> <hr> <h3>Venue: ${data[i].Team_Venue}</h3> <hr> <h4>Capacity: ${data[i].Venue_Capacity}</h4>`)
     );
  }


  var venueLayer = L.layerGroup(venueMarkers);

    

// Define variables for our tile layers.

  
  var street =L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri'
  });


  var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

// Only one base layer can be shown at a time.
  var baseMaps = {
   Street: street,
   Topography: topo
  };

// Overlays that can be toggled on or off
  var overlayMaps = {
   Venues: venueLayer
  
  };

// Create a map object, and set the default layers.
  var myMap = L.map("map", {
   center: [37.09, -95.71],
   zoom: 4,
   layers: [street, venueLayer]
  });

// Pass our map layers into our layer control.
// Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps).addTo(myMap)
  });

