"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "../components/Sidebar"
import SupportSection from "../components/SupportSection"
import SupportPopup from "../components/SupportPopup"
import ExamCountdown from "../components/ExamCountdown"
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

          <div className="w-14 h-14 md:w-16 md:h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-5 text-zinc-400 text-base md:text-lg">
            Loading Defence Era...
          </p>

        </div>

      </main>

    )

  }

  return (

    <main className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* SUPPORT POPUP — admin controlled, checks Supabase on mount */}
      <SupportPopup />

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
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/80 border-b border-white/10 rounded-b-2xl shadow-[0_4px_20px_rgba(0,0,0,0.4)] relative">

        {/* ACCENT LINE */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-3 md:px-4 py-3 md:py-4 flex items-center justify-between gap-2">

          {/* LEFT */}
          <div className="flex items-center gap-2.5 md:gap-4 min-w-0">

            <button
              onClick={() =>
                setIsSidebarOpen(true)
              }
              className="w-9 h-9 md:w-14 md:h-14 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl flex items-center justify-center text-base md:text-2xl hover:border-yellow-500 hover:bg-yellow-500/5 hover:shadow-[0_0_20px_rgba(234,179,8,0.25)] transition-all shrink-0"
            >
              ☰
            </button>

            {/* LOGO */}
            <div className="flex items-center gap-2.5 md:gap-3 min-w-0">

              <div className="relative shrink-0">

                <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full"></div>

                <img
                  src="/logo.png"
                  className="relative w-9 h-9 md:w-14 md:h-14 object-contain"
                />

              </div>

              <div className="min-w-0">

                <h1 className="text-lg md:text-4xl font-black bg-gradient-to-r from-yellow-300 via-yellow-500 to-orange-400 bg-clip-text text-transparent truncate leading-tight drop-shadow-[0_0_20px_rgba(234,179,8,0.15)]">
                  Defence Era
                </h1>

                <p className="hidden sm:block text-zinc-500 text-[10px] md:text-xs tracking-[3px] uppercase font-semibold">
                  Dream • Prepare • Achieve
                </p>

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0">

            <div className="hidden md:flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-5 py-3 rounded-full font-black text-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
              </span>
              LIVE
            </div>

            <button
              onClick={async () => {

                await supabase.auth.signOut()

                router.push("/login")

              }}
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:scale-105 px-3.5 py-2 md:px-5 md:py-3 rounded-xl md:rounded-2xl font-bold text-xs md:text-base transition-all duration-300"
            >
              Logout
            </button>

          </div>

        </div>

      </nav>

      {/* MAIN */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 md:px-4 py-4 md:py-6">

        {/* HERO SECTION — minimal */}
        <div
          className="relative overflow-hidden rounded-[20px] md:rounded-[24px] p-4 sm:p-6 shadow-2xl ring-1 ring-white/10 border border-white/10 bg-gradient-to-br from-zinc-900 via-black to-purple-950/40"
        >

          {/* GLOW */}
          <div className="absolute top-0 right-0 w-56 h-56 bg-yellow-500/10 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-600/10 blur-[90px] rounded-full"></div>

          {/* TOP BORDER SHEEN */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-stretch justify-center gap-4 sm:gap-10">

            {/* LEFT — exam names */}
            <div className="flex flex-col justify-center">

              <p className="text-zinc-500 text-[10px] md:text-[11px] font-bold tracking-[3px] uppercase mb-2">
                Prepare For
              </p>

              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">

                {["NDA", "CDS", "AFCAT", "SSB"].map((exam) => (

                  <span
                    key={exam}
                    className="bg-gradient-to-br from-white/10 to-white/[0.02] border border-purple-500/30 hover:border-purple-400/60 text-white text-xs sm:text-base font-black px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.08)] transition-all"
                  >
                    {exam}
                  </span>

                ))}

              </div>

            </div>

            {/* DIVIDER */}
            <div className="hidden sm:block w-px bg-gradient-to-b from-transparent via-white/15 to-transparent"></div>
            <div className="sm:hidden h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>

            {/* RIGHT — stats */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-2.5">

              <div className="bg-black/40 backdrop-blur-md border border-yellow-500/20 hover:border-yellow-500/40 px-2.5 py-1.5 md:px-3 md:py-2 rounded-xl text-center w-[76px] md:w-[86px] transition-all">
                <h3 className="text-sm md:text-base font-black text-yellow-400">10K+</h3>
                <p className="text-zinc-500 text-[9px] md:text-[10px] font-medium">Students</p>
              </div>

              <div className="hidden sm:block bg-black/40 backdrop-blur-md border border-purple-500/20 hover:border-purple-500/40 px-2.5 py-1.5 md:px-3 md:py-2 rounded-xl text-center w-[76px] md:w-[86px] transition-all">
                <h3 className="text-sm md:text-base font-black text-purple-400">500+</h3>
                <p className="text-zinc-500 text-[9px] md:text-[10px] font-medium">Notes</p>
              </div>

              <div className="bg-black/40 backdrop-blur-md border border-blue-500/20 hover:border-blue-500/40 px-2.5 py-1.5 md:px-3 md:py-2 rounded-xl text-center w-[76px] md:w-[86px] transition-all">
                <h3 className="text-sm md:text-base font-black text-blue-400">50+</h3>
                <p className="text-zinc-500 text-[9px] md:text-[10px] font-medium">Mentors</p>
              </div>

              <div className="bg-black/40 backdrop-blur-md border border-green-500/20 hover:border-green-500/40 px-2.5 py-1.5 md:px-3 md:py-2 rounded-xl text-center w-[76px] md:w-[86px] transition-all">
                <h3 className="text-sm md:text-base font-black text-green-400">24/7</h3>
                <p className="text-zinc-500 text-[9px] md:text-[10px] font-medium">Support</p>
              </div>

            </div>

          </div>

        </div>

        {/* EXAM COUNTDOWN — target exam + days left */}
        <div className="mt-4 md:mt-6">
          <ExamCountdown />
        </div>

        {/* SUPPORT SECTION — compact, sits right below Hero, above Search */}
        <div className="mt-6 md:mt-10">
          <SupportSection />
        </div>

        

        {/* COURSES */}
        <div className="mt-6 md:mt-10">

          <div className="flex items-center justify-between mb-4 md:mb-6">

            <div>

              <h2 className="text-xl md:text-3xl font-black">
                Premium Courses
              </h2>

              <div className="h-1 w-10 md:w-14 mt-1.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></div>

            </div>

            <div className="text-zinc-400 text-xs md:text-sm font-semibold bg-white/5 border border-white/10 px-3 py-1.5 md:px-4 md:py-2 rounded-full">
              {filteredCourses.length} Courses
            </div>

          </div>

          {filteredCourses.length === 0 ? (

            <div className="bg-white/5 border border-white/10 rounded-[24px] md:rounded-[32px] p-8 md:p-10 text-center text-zinc-400">

              No Courses Found 

            </div>

          ) : (

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">

              {filteredCourses.map((course) => (

                <div
                  key={course.id}
                  className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-[32px] overflow-hidden hover:border-purple-500/40 hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(168,85,247,0.15)] transition-all duration-300"
                >

                  {/* IMAGE */}
                  <div className="relative overflow-hidden">

                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-48 md:h-60 object-cover object-top group-hover:scale-110 transition-all duration-500"
                    />

                    {/* BOTTOM FADE FOR CONTRAST */}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 to-transparent"></div>

                    <div className="absolute top-2.5 left-2.5 md:top-4 md:left-4 bg-black/70 backdrop-blur-md px-2.5 py-1 md:px-4 md:py-2 rounded-full text-[10px] md:text-xs font-bold border border-yellow-500/30 text-yellow-400 tracking-wide">
                      PREMIUM
                    </div>

                  </div>

                  {/* CONTENT */}
                  <div className="p-3.5 md:p-6">

                    <h3 className="text-base md:text-2xl font-black truncate group-hover:text-purple-300 transition-colors">
                      {course.title}
                    </h3>

                    <p className="text-zinc-400 mt-1 md:mt-2 text-xs md:text-base truncate">

                      {course.subtitle ||
                        "Premium Defence Course"}

                    </p>

                    <div className="flex items-center justify-between mt-3.5 md:mt-6">

                      <div className="flex items-center gap-1.5 text-green-400 font-bold text-xs md:text-base">
                        <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-green-400"></span>
                        </span>
                        LIVE
                      </div>

                      <Link
                        href={`/subjects?course=${course.title}`}
                      >
                        <button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-105 transition-all duration-300 px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl font-bold text-xs md:text-base">
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