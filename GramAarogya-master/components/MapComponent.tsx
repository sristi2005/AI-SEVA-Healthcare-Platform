"use client";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function MapComponent() {
  useEffect(() => {
    const map = L.map("map").setView([20.5937, 78.9629], 5);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    L.marker([20.5937, 78.9629])
      .addTo(map)
      .bindPopup("GramArogya Location")
      .openPopup();

    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" style={{ height: "500px", width: "100%" }} />;
}