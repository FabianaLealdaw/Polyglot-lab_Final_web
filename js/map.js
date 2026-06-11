document.addEventListener("DOMContentLoaded", () => {
  const mapElement = document.getElementById("map");
  const directionsLink = document.getElementById("directions-link");

  if (!mapElement || typeof L === "undefined") return;

  const masterD = L.latLng(41.38535, 2.14672);
  const map = L.map(mapElement).setView(masterD, 13);
  let routeControl = null;

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  L.marker(masterD).addTo(map).bindPopup("MasterD Barcelona").openPopup();

  const updateDirectionsLink = (origin = null) => {
    if (!directionsLink) return;

    const base = "https://www.google.com/maps/dir/?api=1";
    const destination = "destination=41.38535,2.14672";

    directionsLink.href = origin
      ? `${base}&origin=${origin.lat},${origin.lng}&${destination}`
      : `${base}&${destination}`;
  };

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

  const showMasterDLocation = () => {
    if (routeControl) {
      map.removeControl(routeControl);
      routeControl = null;
    }

    map.setView(masterD, 15);
    updateDirectionsLink();
  };

  showMasterDLocation();

  requestAnimationFrame(() => {
    map.invalidateSize();
  });

  if (!navigator.geolocation) return;

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
      showMasterDLocation();
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
