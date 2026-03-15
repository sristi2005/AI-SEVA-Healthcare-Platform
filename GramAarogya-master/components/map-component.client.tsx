"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Fix for default marker icon in Leaflet with Next.js
const iconUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png"
const iconRetinaUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png"
const shadowUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png"

const defaultIcon = L.icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
})

// Component to update map center when location changes
function ChangeView({ center }: { center: [number, number] }) {
    const map = useMap()
    map.setView(center)
    return null
}

interface Place {
    name: string
    lat: number
    lng: number
    vicinity: string
    distance: number
}

interface MapComponentProps {
    location: { lat: number; lng: number } | null
    places: Place[]
}

export default function MapComponent({ location, places }: MapComponentProps) {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted || !location) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-gray-900 border border-gray-700 rounded-lg text-gray-400">
                Map Loading...
            </div>
        )
    }

    const center: [number, number] = [location.lat, location.lng]

    return (
        <MapContainer
            center={center}
            zoom={14}
            style={{ height: "100%", width: "100%", borderRadius: "0.5rem" }}
            className="z-0"
        >
            <ChangeView center={center} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* User Location Marker */}
            <Marker position={center} icon={defaultIcon}>
                <Popup>
                    <div className="text-black">
                        <strong>Your Location</strong>
                    </div>
                </Popup>
            </Marker>

            {/* Places Markers */}
            {places.map((place, index) => (
                <Marker
                    key={index}
                    position={[place.lat, place.lng]}
                    icon={defaultIcon}
                >
                    <Popup>
                        <div className="text-black text-sm">
                            <strong className="block text-base mb-1">{place.name}</strong>
                            <p className="m-0 mb-1">{place.vicinity}</p>
                            <p className="m-0 text-gray-600">{place.distance.toFixed(2)} km away</p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}
