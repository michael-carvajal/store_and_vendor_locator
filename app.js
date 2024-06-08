// Initialize the map
var map = L.map("map").setView([37.7749, -122.4194], 13); // Default to San Francisco

// Add OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
}).addTo(map);

// Store and vendor data
var stores = [
  { storeNumber: "001", name: "Store 1", location: [37.7749, -122.4194] },
  { storeNumber: "002", name: "Store 2", location: [34.0522, -118.2437] },
  // Add more stores as needed
];

var vendors = [
  { name: "Vendor 1", location: [37.8044, -122.2711] },
  { name: "Vendor 2", location: [34.0522, -118.2437] },
  // Add more vendors as needed
];

// Search and display functionality
document.getElementById("searchButton").addEventListener("click", function () {
  var storeNumber = document.getElementById("storeNumber").value;
  var store = stores.find((s) => s.storeNumber === storeNumber);

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
