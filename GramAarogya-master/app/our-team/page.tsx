"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const teamMembers = [
  {
    name: "Pardhi Sadam",
    role: "Full Stack Developer",
    description:
      "Designed and implemented the frontend using Next.js and integrated it with a Flask backend for health advisory services."
  },
  {
    name: "Suresh Babu Velpula",
    role: "Backend Developer",
    description:
      "Developed REST APIs using Flask and implemented logic for health advice and emergency detection."
  },
  {
    name: "Sristi",
    role: "Frontend Developer",
    description:
      "Worked on UI components, page layouts, and user interaction using React and Tailwind CSS."
  },
  {
    name: "Vaishnavi",
    role: "Research & Documentation",
    description:
      "Handled research, testing, documentation, and project presentation preparation."
  }
]

export default function OurTeam() {
  return (
    <>
      <Navbar />

      <section className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-center mb-2">
          Project Team
        </h1>

        <p className="text-center text-gray-400 mb-10">
          Academic Project – Developed for learning and demonstration purposes
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-dark rounded-lg shadow-lg p-6 text-center"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-700 flex items-center justify-center text-2xl font-bold">
                👤
              </div>

              <h2 className="text-lg font-semibold">
                {member.name}
              </h2>

              <p className="text-sm text-gray-400 mb-3">
                {member.role}
              </p>

              <p className="text-sm">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}
