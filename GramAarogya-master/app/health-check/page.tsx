"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const translations = [
  { lang: "English", heading: "Health Check", placeholder: "Describe your symptoms..." },
  { lang: "हिन्दी", heading: "स्वास्थ्य जाँच", placeholder: "अपने लक्षणों का वर्णन करें..." },
 
  {lang: "తెలుగు", heading: "ఆరోగ్య పరీక్ష", placeholder: "మీ లక్షణాలను వివరించండి..."},

  { lang: "ગુજરાતી", heading: "આરોગ્ય ચકાસણી", placeholder: "તમારા લક્ષણો વર્ણવો..." },
  { lang: "বাংলা", heading: "স্বাস্থ্য পরীক্ষা", placeholder: "আপনার উপসর্গ বর্ণনা করুন..." },
  { lang: "मराठी", heading: "आरोग्य तपासणी", placeholder: "तुमच्या लक्षणांचे वर्णन करा..." },
  { lang: "தமிழ்", heading: "ஆரோக்கிய சோதனை", placeholder: "உங்கள் அறிகுறிகளை விவரிக்கவும்..." },
]

const loadingMessages = [
  "Processing...",
  "Analyzing symptoms...",
  "Generating advice...",
  "Almost there...",
  "Fetching data...",
]

export default function HealthCheck() {
  const [input, setInput] = useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)
  const [index, setIndex] = useState(0)
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0)
  const [currentMessage, setCurrentMessage] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  const router = useRouter()
  const messageRef = useRef<HTMLSpanElement | null>(null)

  // Language rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % translations.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Loading text rotation
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (loading) {
      interval = setInterval(() => {
        setLoadingMessageIndex((prev) => (prev + 1) % loadingMessages.length)
        setCurrentIndex(0)
        setCurrentMessage("")
      }, 3000)
    }
    return () => clearInterval(interval)
  }, [loading])

  // Typing animation
  useEffect(() => {
    if (!loading) return

    const message = loadingMessages[loadingMessageIndex]
    const timeout = setTimeout(() => {
      setCurrentMessage((prev) =>
        currentIndex < message.length ? message.substring(0, currentIndex + 1) : message
      )
      setCurrentIndex((prev) => prev + 1)
    }, 100)

    return () => clearTimeout(timeout)
  }, [loading, loadingMessageIndex, currentIndex])

  // 🔥 BACKEND CONNECTION (FLASK)
  const handleSubmit = async () => {
    if (!input.trim()) {
      alert("Please enter symptoms or a health question")
      return
    }

    setLoading(true)
    setResponse("")

    try {
      const res = await fetch("http://127.0.0.1:5000/health-query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: input }),
      })

      const data = await res.json()
      setResponse(data.answer || "No response received.")
    } catch (error) {
      console.error("Backend error:", error)
      setResponse("Error connecting to backend.")
    }

    setLoading(false)
  }

  return (
    <>
      <div className="relative z-10">
        <Navbar />

        <section className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto bg-dark shadow-lg rounded-lg p-4 sm:p-6 md:p-8">

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6">
              {translations[index].heading}
            </h1>

            <textarea
              className="w-full h-24 sm:h-32 md:h-48 p-3 sm:p-4 border border-gray-300 rounded-lg
                         text-xs sm:text-sm md:text-base mb-3 sm:mb-4
                         bg-black text-white placeholder-white"
              placeholder={translations[index].placeholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <Button
              className="w-full sm:w-auto mb-4 sm:mb-6 py-2 px-3 sm:px-4
                         bg-white text-black rounded-lg transition-all
                         hover:bg-[#b9b9b9]"
              size="lg"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <span ref={messageRef}>{currentMessage}</span> : "Get Health Advice"}
            </Button>

            {loading && (
              <div className="flex justify-center items-center space-x-2 my-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-200"></div>
              </div>
            )}

            {response && (
              <div className="mt-6 p-4 sm:p-6 bg-dark text-white rounded-lg">
                <h2 className="text-lg font-semibold pb-3">
                  AI Health Advice
                </h2>
                <div className="space-y-2 text-sm sm:text-base">
                  {response.split("\n").map((item, i) => (
                    <p key={i} className="before:content-['•'] before:mr-2">
                      {item.trim()}
                    </p>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:space-x-4 mt-6">
              <Button
                className="mb-3 sm:mb-0 bg-white text-black hover:bg-[#b9b9b9]"
                onClick={() => router.push("/find-doctor")}
              >
                Find Doctors
              </Button>

              <Button
                className="bg-white text-black hover:bg-[#b9b9b9]"
                onClick={() => router.push("/")}
              >
                Back to Home
              </Button>
            </div>

          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
