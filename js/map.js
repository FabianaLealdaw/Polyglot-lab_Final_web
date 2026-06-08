document.addEventListener("DOMContentLoaded", () => {
  const mapElement = document.getElementById("map");
  const directionsLink = document.getElementById("directions-link");

  if (!mapElement || typeof L === "undefined") return;

  const masterD = L.latLng(41.38535, 2.14672);
  const defaultOrigin = L.latLng(41.38702, 2.17005);
  const map = L.map(mapElement).setView(masterD, 13);
  let routeControl = null;

  // OpenStreetMap base layer used by Leaflet.
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  L.marker(masterD).addTo(map).bindPopup("MasterD Barcelona").openPopup();

  // Keep the external Google Maps route link synchronized with the origin.
  const updateDirectionsLink = (origin = defaultOrigin) => {
    if (!directionsLink) return;

    const base = "https://www.google.com/maps/dir/?api=1";
    const destination = "destination=41.38535,2.14672";

    directionsLink.href = origin
      ? `${base}&origin=${origin.lat},${origin.lng}&${destination}`
      : `${base}&${destination}`;
  };

  // Draw a real road route instead of a straight line.
  const drawRoadRoute = (origin) => {
    if (typeof L.Routing === "undefined") {
      map.fitBounds([origin, masterD], { padding: [40, 40] });
      return;
    }

    if (routeControl) {
      map.removeControl(routeControl);
    }

    routeControl = L.Routing.control({
      waypoints: [origin, masterD],
      routeWhileDragging: false,
      addWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
      lineOptions: {
        styles: [{ color: "#df6d69", opacity: 0.9, weight: 6 }],
      },
      createMarker: (index, waypoint) => {
        const label = index === 0 ? "Route start" : "MasterD Barcelona";
        return L.marker(waypoint.latLng).bindPopup(label);
      },
    }).addTo(map);
  };

  updateDirectionsLink();
  drawRoadRoute(defaultOrigin);

  requestAnimationFrame(() => {
    map.invalidateSize();
  });

  if (!navigator.geolocation) return;

  // Use the user's location when permission is granted; otherwise keep Barcelona.
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      const userLocation = L.latLng(coords.latitude, coords.longitude);
      updateDirectionsLink(userLocation);
      drawRoadRoute(userLocation);

      requestAnimationFrame(() => {
        map.invalidateSize();
      });
    },
    () => {
      updateDirectionsLink(defaultOrigin);
      drawRoadRoute(defaultOrigin);
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
