"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const MapComponent = dynamic(() => import("../components/MapComponent"), {
    ssr: false,
});

export default function TestMapPage() {
    const dummyDoctors = [
        {
            name: "Dr. Smith",
            specialization: "Cardiology",
            location: "123 Heart St",
            lat: 51.505,
            lng: -0.09,
        },
        {
            name: "Dr. Jones",
            specialization: "Dermatology",
            location: "456 Skin Ave",
            lat: 51.51,
            lng: -0.1,
        },
    ];

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-4">Map Component Test</h1>
            <div className="mb-8 border p-4 rounded">
                <h2 className="text-xl font-semibold mb-2">With Data</h2>
                <MapComponent doctors={dummyDoctors} />
            </div>

            <div className="mt-10 border p-4 rounded">
                <h2 className="text-xl font-semibold mb-2">Empty Data</h2>
                <MapComponent doctors={[]} />
            </div>
        </div>
    );
}
