"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";
import dynamic from "next/dynamic";

// Load Map without SSR
const MapComponent = dynamic(
  () => import("../components/MapComponent"),
  { ssr: false }
);

export default function FindDoctor() {
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFindDoctors = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:5000/doctors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ condition, location }),
      });

      const data = await res.json();
      setApiResponse(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setApiResponse({ error: "Failed to fetch doctors." });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />

      {/* Search Section */}
      <div className="bg-black py-8 px-4 shadow-md">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Find Nearby Doctors
          </h1>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              className="flex-1 px-4 py-3 rounded-lg bg-black text-white border border-gray-700"
              placeholder="Enter your health condition..."
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            />

            <input
              className="flex-1 px-4 py-3 rounded-lg bg-black text-white border border-gray-700"
              placeholder="Enter your location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <Button
              onClick={handleFindDoctors}
              disabled={loading}
              className="flex items-center gap-2"
            >
              <Search size={18} />
              {loading ? "Searching..." : "Find Doctors"}
            </Button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="flex-grow px-4 py-10">
        <div className="max-w-6xl mx-auto">

          {apiResponse && apiResponse.doctorsData ? (
            <>
              <h2 className="text-2xl font-semibold mb-6 border-b border-gray-700 pb-2">
                Doctors Found
              </h2>

              {/* Doctor Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {apiResponse.doctorsData.map((doctor: any, index: number) => (
                  <div
                    key={index}
                    className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700"
                  >
                    <h3 className="text-xl font-semibold text-blue-400 mb-2">
                      {doctor.name}
                    </h3>

                    <span className="inline-block bg-blue-900 text-blue-200 px-3 py-1 rounded-full text-sm mb-3">
                      {doctor.specialization}
                    </span>

                    <p className="text-gray-300">
                      <strong>Experience:</strong> {doctor.experience}
                    </p>
                    <p className="text-gray-300">
                      <strong>Fee:</strong> {doctor.fee}
                    </p>
                    <p className="text-gray-300">
                      <strong>Location:</strong> {doctor.location}
                    </p>

                    {doctor.profile && (
                      <div className="mt-4 border-t border-gray-700 pt-3">
                        <Link
                          href={doctor.profile}
                          target="_blank"
                          className="text-blue-400 hover:text-blue-300 text-sm"
                        >
                          View Profile
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Map Section */}
              <div className="mt-10">
                <MapComponent doctors={apiResponse.doctorsData} />
              </div>
            </>
          ) : (
            <div className="border border-gray-700 rounded-lg p-12 text-center">
              <Search size={48} className="mx-auto text-gray-500 mb-4" />
              <p className="text-gray-400">
                Enter your condition and location to find doctors.
              </p>
            </div>
          )}

        </div>
      </div>

      {/* Back Button */}
      <div className="pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          <Button
            variant="outline"
            onClick={() => router.push("/")}
          >
            Back to Home
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
