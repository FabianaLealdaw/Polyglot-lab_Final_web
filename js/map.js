document.addEventListener("DOMContentLoaded", () => {
  const mapElement = document.getElementById("map");
  const directionsLink = document.getElementById("directions-link");

  if (!mapElement || typeof L === "undefined") return;

  const masterD = [41.38535, 2.14672];
  const map = L.map(mapElement).setView(masterD, 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  const businessMarker = L.marker(masterD).addTo(map);
  businessMarker.bindPopup("MasterD Barcelona").openPopup();

  // Recalculate
  requestAnimationFrame(() => {
    map.invalidateSize();
  });

  if (directionsLink) {
    directionsLink.href =
          "https://www.google.com/maps/dir/?api=1&destination=41.38535,2.14672";
  }

  if (!navigator.geolocation) return;

  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      const client = [coords.latitude, coords.longitude];

      if (directionsLink) {
        directionsLink.href =
          `https://www.google.com/maps/dir/?api=1&origin=${client[0]},${client[1]}&destination=41.38535,2.14672`;
      }

      const userMarker = L.marker(client).addTo(map);
      userMarker.bindPopup("Your location").openPopup();
      L.polyline([client, masterD], {
        color: "#e86b63",
        weight: 5,
        opacity: 0.85,
      }).addTo(map);
      map.fitBounds([client, masterD], { padding: [40, 40] });

      requestAnimationFrame(() => {
        map.invalidateSize();
      });
    },
    () => {
      map.setView(masterD, 14);
      requestAnimationFrame(() => {
        map.invalidateSize();
      });
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
    },
  );
});
