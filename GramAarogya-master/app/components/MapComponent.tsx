"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for Leaflet marker icons in Next.js
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function MapComponent({ doctors }: any) {
  if (!doctors || doctors.length === 0) {
    return (
      <div className="flex items-center justify-center bg-gray-100 rounded-lg" style={{ height: "400px", width: "100%" }}>
        <p className="text-gray-500">No doctors location data available</p>
      </div>
    );
  }

  const center = [doctors[0].lat, doctors[0].lng] as [number, number];

  return (
    <MapContainer center={center} zoom={12} style={{ height: "400px", width: "100%", zIndex: 0 }}>
      {/* 
          IMPORTANT: zIndex: 0 is crucial here. 
          Without it, the map tiles might overlap with other UI elements (like modals or dropdowns) 
          because Leaflet sets a high z-index by default. 
      */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {doctors.map((doc: any, index: number) => (
        <Marker key={index} position={[doc.lat, doc.lng]}>
          <Popup>
            <div className="text-sm">
              <b className="block text-base mb-1">{doc.name}</b>
              <span className="block text-gray-600 mb-1">{doc.specialization}</span>
              <span className="block text-gray-500">{doc.location}</span>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
