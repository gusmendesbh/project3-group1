// An array of cities and their locations


// var results = Papa.parse(csv);
//   console.log(results.data)
// Papa.parse(csv, {
//   header: true,
//   complete: function(data) {
//     console.log(data.data);
//   }
// });
d3.json("team_venuej1.json").then((importedData) => {
  let data = importedData;
  console.log(data);
});
// // An array that will store the created cityMarkers
// var venueMarkers = [];

// for (var i = 0; i < data.length; i++) {
//   // loop through the cities array, create a new marker, and push it to the cityMarkers array
//   location=[data[i].Latitude,data[i].Longitude]
//   venueMarkers.push(
//     L.marker(location.bindPopup(`<h1>Team: ${data[i].Abbreviation} </h1> <hr> <h2>Venue: ${data[i].Team_Venue}</h2> <hr> <h3>Capacity: ${data[i].Venue_Capacity}</h3>`)
//     ));
// }

// // Add all the cityMarkers to a new layer group.
// // Now, we can handle them as one group instead of referencing each one individually.
// var venueLayer = L.layerGroup(venueMarkers);

// // Define variables for our tile layers.
// var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// })

// var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
// 	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
// });

// // Only one base layer can be shown at a time.
// var baseMaps = {
//   Street: street,
//   Topography: topo
// };

// // Overlays that can be toggled on or off
// var overlayMaps = {
//   Venues: venueLayer
// };

// // Create a map object, and set the default layers.
// var myMap = L.map("map", {
//   center: [46.2276, 2.2137],
//   zoom: 6,
//   layers: [street, venueLayer]
// });

// // Pass our map layers into our layer control.
// // Add the layer control to the map.
// L.control.layers(baseMaps, overlayMaps).addTo(myMap)});
