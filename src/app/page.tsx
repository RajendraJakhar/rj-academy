"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "../components/Sidebar"
import { supabase } from "@/lib/supabase"

export default function Home() {

  const router = useRouter()

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const [courses, setCourses] = useState<any[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    checkUser()

  }, [])

  // CHECK USER
  const checkUser = async () => {

    const { data } =
      await supabase.auth.getSession()

    if (!data.session) {

      router.push("/login")

    } else {

      fetchCourses()

    }

  }

  // FETCH COURSES
  const fetchCourses = async () => {

    const { data, error } =
      await supabase
        .from("courses")
        .select("*")

    if (error) {

      console.log(error)

    } else {

      setCourses(data || [])

    }

    setLoading(false)

  }

  // FILTER
  const filteredCourses =
    courses.filter((course) =>
      course.title
        .toLowerCase()
        .includes(search.toLowerCase())
    )

  // LOADING
  if (loading) {

    return (

      <main className="min-h-screen bg-black flex items-center justify-center text-white">

        <div className="text-center">

          <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-5 text-zinc-400 text-lg">
            Loading Defence Era...
          </p>

        </div>

      </main>

    )

  }

  return (

    <main className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-700/20 blur-[150px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-700/20 blur-[150px] rounded-full"></div>

      {/* SIDEBAR */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() =>
          setIsSidebarOpen(false)
        }
      />

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/70 border-b border-white/10">

        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-4">

            <button
              onClick={() =>
                setIsSidebarOpen(true)
              }
              className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-2xl hover:border-yellow-500 transition-all"
            >
              ☰
            </button>

            {/* LOGO */}
            <div className="flex items-center gap-3">

              <img
                src="/logo.png"
                className="w-14 h-14 object-contain"
              />

              <div>

                <h1 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-yellow-300 via-yellow-500 to-orange-400 bg-clip-text text-transparent">
                  Defence Era
                </h1>

                <p className="text-zinc-400 text-xs tracking-[3px] uppercase">
                  Dream • Prepare • Achieve
                </p>

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">

            <div className="hidden md:flex bg-green-500 text-black px-5 py-3 rounded-full font-black text-sm animate-pulse">
              ● LIVE
            </div>

            <button
              onClick={async () => {

                await supabase.auth.signOut()

                router.push("/login")

              }}
              className="bg-gradient-to-r from-red-500 to-pink-500 px-5 py-3 rounded-2xl font-bold"
            >
              Logout
            </button>

          </div>

        </div>

      </nav>

      {/* MAIN */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-6">

        {/* HERO SECTION */}
        <div
          className="relative overflow-hidden rounded-[40px] p-8 lg:p-14 shadow-2xl border border-white/10 bg-cover bg-center"

          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.92), rgba(0,0,0,0.45)), url('/hero.jpg')"
          }}
        >

          {/* GLOW */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-500/10 blur-[120px] rounded-full"></div>

          <div className="relative z-10 max-w-3xl">

            {/* TOP TAG */}
            <div className="inline-block bg-black/40 border border-yellow-500/30 px-5 py-2 rounded-full text-sm font-bold mb-6 backdrop-blur-md">

              INDIA'S TRUSTED DEFENCE PLATFORM

            </div>

            {/* MAIN TITLE */}
            <h2 className="text-5xl md:text-7xl font-black leading-tight">

              <span className="text-white">
                DREAM UNIFORM.
              </span>

              <br />

              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                BUILD YOUR ERA.
              </span>

            </h2>

            {/* SUBTITLE */}
            <p className="text-zinc-300 mt-6 text-lg md:text-2xl leading-relaxed max-w-2xl">

              Comprehensive preparation for NDA,
              CDS, AFCAT, SSB Interview and all
              Defence Exams.

            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-4 mt-10">

              {/* COURSE BUTTON */}
              <button
                className="bg-gradient-to-r from-purple-600 to-blue-500 hover:scale-105 transition-all px-8 py-4 rounded-2xl font-black shadow-[0_0_30px_rgba(168,85,247,0.5)]"
              >
                EXPLORE COURSES
              </button>

              {/* WHATSAPP */}
              <a
                href="https://whatsapp.com/channel/0029VbDYZFFAjPXOkyYSID3K/320"
                target="_blank"
                className="bg-black/40 border border-purple-500 hover:bg-purple-500/10 transition-all px-8 py-4 rounded-2xl font-black"
              >
                JOIN WHATSAPP
              </a>

            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">

              <div className="bg-black/40 backdrop-blur-md border border-white/10 p-5 rounded-3xl">

                <h3 className="text-4xl font-black text-yellow-400">
                  10K+
                </h3>

                <p className="text-zinc-300 mt-2">
                  Students
                </p>

              </div>

              <div className="bg-black/40 backdrop-blur-md border border-white/10 p-5 rounded-3xl">

                <h3 className="text-4xl font-black text-purple-400">
                  500+
                </h3>

                <p className="text-zinc-300 mt-2">
                  Notes
                </p>

              </div>

              <div className="bg-black/40 backdrop-blur-md border border-white/10 p-5 rounded-3xl">

                <h3 className="text-4xl font-black text-blue-400">
                  50+
                </h3>

                <p className="text-zinc-300 mt-2">
                  Mentors
                </p>

              </div>

              <div className="bg-black/40 backdrop-blur-md border border-white/10 p-5 rounded-3xl">

                <h3 className="text-4xl font-black text-green-400">
                  24/7
                </h3>

                <p className="text-zinc-300 mt-2">
                  Support
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* SEARCH */}
        <div className="mt-10">

          <div className="bg-white/5 border border-purple-500/20 backdrop-blur-xl rounded-[30px] p-3">

            <input
              type="text"
              placeholder="Search your batch..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full bg-transparent text-white placeholder:text-zinc-500 outline-none px-4 py-4 text-lg"
            />

          </div>

        </div>

        {/* COURSES */}
        <div className="mt-10">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-3xl font-black">
              Premium Courses
            </h2>

            <div className="text-zinc-400">
              {filteredCourses.length} Courses
            </div>

          </div>

          {filteredCourses.length === 0 ? (

            <div className="bg-white/5 border border-white/10 rounded-[32px] p-10 text-center text-zinc-400">

              No Courses Found 

            </div>

          ) : (

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">

              {filteredCourses.map((course) => (

                <div
                  key={course.id}
                  className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] overflow-hidden hover:border-purple-500/40 hover:-translate-y-2 transition-all duration-300"
                >

                  {/* IMAGE */}
                  <div className="relative overflow-hidden">

                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-60 object-cover group-hover:scale-110 transition-all duration-500"
                    />

                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold border border-white/10">
                      PREMIUM
                    </div>

                  </div>

                  {/* CONTENT */}
                  <div className="p-6">

                    <h3 className="text-2xl font-black">
                      {course.title}
                    </h3>

                    <p className="text-zinc-400 mt-2">

                      {course.subtitle ||
                        "Premium Defence Course"}

                    </p>

                    <div className="flex items-center justify-between mt-6">

                      <div className="text-green-400 font-bold">
                        ● LIVE
                      </div>

                      <Link
                        href={`/subjects?course=${course.title}`}
                      >
                        <button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:scale-105 transition-all px-6 py-3 rounded-2xl font-bold">
                          Explore
                        </button>
                      </Link>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </main>

  )

}