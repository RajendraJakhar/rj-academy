"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import Sidebar from "../components/Sidebar"
import BottomNav from "../components/BottomNav"
import { supabase } from "@/lib/supabase"

export default function Home() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [courses, setCourses] = useState<any[]>([])

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    const { data, error } = await supabase
      .from("courses")
      .select("*")

    if (error) {
      console.log(error)
    } else {
      setCourses(data)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Navbar */}
      <nav className="flex items-center justify-between p-4 border-b border-zinc-800 sticky top-0 bg-black/80 backdrop-blur-md z-50">

        {/* Left */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="bg-zinc-900 p-3 rounded-2xl border border-zinc-700"
        >
          ☰
        </button>

        {/* Center */}
        <div>
          <h1 className="text-xl font-bold text-purple-400">
            RJ Academy
          </h1>

          <p className="text-xs text-zinc-400">
            Powered By Rajendra Jakhar
          </p>
        </div>

        {/* Right */}
        <div className="bg-green-500 text-black px-4 py-2 rounded-full font-bold text-sm">
          LIVE
        </div>

      </nav>

      {/* Main Content */}
      <div className="max-w-md mx-auto p-4">

        {/* Search */}
        <input
          type="text"
          placeholder="Search your batch..."
          className="w-full bg-zinc-900 border border-purple-500 rounded-2xl p-4 outline-none mt-4"
        />

        {/* Banner */}
        <div className="mt-6 bg-gradient-to-r from-purple-600 to-blue-500 rounded-3xl p-6">

          <h2 className="text-3xl font-bold">
            Welcome to RJ Academy
          </h2>

          <p className="text-zinc-200 mt-2">
            Premium educational content.
          </p>

        </div>

        {/* Dynamic Courses */}
        <div className="mt-6 space-y-6">

          {courses.map((course) => (

            <div
              key={course.id}
              className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800"
            >

              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-52 object-cover"
              />

              <div className="p-4">

                <h2 className="text-2xl font-bold">
                  {course.title}
                </h2>

                <p className="text-zinc-400 mt-1">
                  {course.subtitle || "Premium Course"}
                </p>

               <Link href={`/subjects?course=${course.title}`}>       

                  <button className="mt-4 w-full bg-purple-600 hover:bg-purple-700 transition-all p-3 rounded-2xl font-bold">
                    Explore Course
                  </button>

                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>

      <BottomNav />

    </main>
  )
}