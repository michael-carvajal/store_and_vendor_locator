// Initialize the map
var map = L.map("map").setView([41.214370549784554, -73.71971866138134], 13);

// Add OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
}).addTo(map);

var popup = L.popup();

var vendors = [
  { name: "Vendor 1", location: [37.8044, -122.2711] },
  { name: "Vendor 2", location: [34.0522, -118.2437] },
  // Add more vendors as needed
];

let storeData;
let storeMarkers = [];

// Fetch store data and add markers
fetch("storeData.json")
  .then((response) => response.json())
  .then((stores) => {
    storeData = stores;
    addStoreMarkers(stores);
  });

function addStoreMarkers(stores) {
  // Remove existing markers
  storeMarkers.forEach((marker) => map.removeLayer(marker));
  storeMarkers = [];

  for (const key in stores) {
    const store = stores[key];
    const marker = L.marker(store.location)
      .addTo(map)
      .bindPopup(`<b>${store.name}</b><br>Store Number: ${key}`);
    storeMarkers.push(marker);
  }
}

// Search and display functionality
document.getElementById("storeSelect").addEventListener("submit", function (e) {
  e.preventDefault();
  var storeNumber = document.getElementById("storeNumber").value;
  var store = storeData[storeNumber];

  if (store) {
    // Center the map on the store location
    map.setView(store.location, 13);

    // Add a marker for the store
    L.popup()
      .setLatLng(store.location)
      .setContent(`<b>${store.name}</b><br>Store Number: ${storeNumber}`)
      .openOn(map);

    // Add markers for the vendors
    vendors.forEach((vendor) => {
      L.marker(vendor.location).addTo(map).bindPopup(`<b>${vendor.name}</b>`);
    });
  } else {
    alert("Store not found");
  }
});

// Filter stores to show only open ones
document.getElementById("filterButton").addEventListener("click", function () {
  const openStores = {};
  for (const key in storeData) {
    if (!storeData[key].name.toLowerCase().includes("closed")) {
      openStores[key] = storeData[key];
    }
  }
  addStoreMarkers(openStores);
});
