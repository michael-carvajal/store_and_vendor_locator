// Initialize the map
var map = L.map("map").setView([41.214370549784554, -73.71971866138134], 13); // Default to San Francisco

// Add OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
}).addTo(map);

var popup = L.popup();

// function onMapClick(e) {
//   popup
//     .setLatLng(e.latlng)
//     .setContent("You clicked the map at " + e.latlng.toString())
//     .openOn(map);
// }

// map.on("click", onMapClick);
// Store and vendor data

var vendors = [
  { name: "Vendor 1", location: [37.8044, -122.2711] },
  { name: "Vendor 2", location: [34.0522, -118.2437] },
  // Add more vendors as needed
];
let storeData;
// Fetch store data and add markers
fetch("storeData.json")
  .then((response) => response.json())
  .then((stores) => {
    storeData = stores;
    for (const key in stores) {
      const store = stores[key];
      L.marker(store.location)
        .addTo(map)
        .bindPopup(`<b>${store.name}</b><br>Store Number: ${key}`);
    }
  });
// Search and display functionality
document.getElementById("storeSelect").addEventListener("submit", function (e) {
  e.preventDefault();
  var storeNumber = document.getElementById("storeNumber").value;
  var store = storeData[storeNumber];

  if (store) {
    // Center the map on the store location
    map.setView(store.location, 13);

    // Add a marker for the store
    L.marker(store.location)
      .addTo(map)
      .bindPopup(`<b>${store.name}</b><br>Store Number: ${store.storeNumber}`)
      .openPopup();

    // Add markers for the vendors
    vendors.forEach((vendor) => {
      L.marker(vendor.location).addTo(map).bindPopup(`<b>${vendor.name}</b>`);
    });
  } else {
    alert("Store not found");
  }
});
