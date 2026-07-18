"use client"

import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase"

// Cycling premium color themes — every lecture card feels distinct
const THEMES = [
  { grad: "from-purple-600 to-blue-500", glowRgb: "168,85,247", ring: "hover:border-purple-500" },
  { grad: "from-pink-500 to-rose-500", glowRgb: "236,72,153", ring: "hover:border-pink-500" },
  { grad: "from-emerald-500 to-teal-500", glowRgb: "16,185,129", ring: "hover:border-emerald-500" },
  { grad: "from-amber-500 to-orange-500", glowRgb: "245,158,11", ring: "hover:border-amber-500" },
  { grad: "from-sky-500 to-cyan-500", glowRgb: "14,165,233", ring: "hover:border-sky-500" },
  { grad: "from-fuchsia-500 to-violet-500", glowRgb: "217,70,239", ring: "hover:border-fuchsia-500" },
]

function LecturesContent() {

  const router = useRouter()
  const searchParams = useSearchParams()

  const courseName = searchParams.get("course")
  const subjectName = searchParams.get("subject")
  const chapterName = searchParams.get("chapter")

  const [lectures, setLectures] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    if (
      courseName &&
      subjectName &&
      chapterName
    ) {
      fetchLectures()
    }

  }, [courseName, subjectName, chapterName])

  // FETCH LECTURES
  const fetchLectures = async () => {

    setLoading(true)

    const { data, error } = await supabase
      .from("lectures")
      .select("*")
      .order("lecture_number", { ascending: true })

    if (error) {

      console.log(error)

    } else {

      const filteredData = data?.filter(
        (item) =>
          item.course
            ?.trim()
            .toLowerCase() ===
            courseName
              ?.trim()
              .toLowerCase() &&

          item.subject
            ?.trim()
            .toLowerCase() ===
            subjectName
              ?.trim()
              .toLowerCase() &&

          item.chapter
            ?.trim()
            .toLowerCase() ===
            chapterName
              ?.trim()
              .toLowerCase()
      )

      setLectures(filteredData || [])

    }

    setLoading(false)

  }

  return (

    <main className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-black"></div>

      {/* GLOW */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-purple-600 blur-[140px] opacity-20 rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-blue-600 blur-[140px] opacity-20 rounded-full"></div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-pink-600 blur-[160px] opacity-[0.06] rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-5 pb-24">

        {/* HEADER */}
        <div className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl md:rounded-3xl px-3 md:px-5 py-2.5 md:py-4 flex items-center justify-between mb-5 md:mb-8 shadow-[0_4px_25px_rgba(168,85,247,0.1)]">

          {/* LEFT */}
          <div className="flex items-center gap-3 md:gap-4">

            <button
              onClick={() => router.back()}
              className="w-9 h-9 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-black/40 backdrop-blur-xl border border-zinc-700 hover:border-purple-500 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all text-lg md:text-xl shrink-0"
            >
              ←
            </button>

            <div>

              <h1 className="text-lg md:text-3xl font-black bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent tracking-wide drop-shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                LECTURES
              </h1>

              <p className="text-green-400 text-[10px] md:text-xs tracking-[3px] uppercase font-bold">
                ● {lectures.length} Classes Found
              </p>

            </div>

          </div>

          {/* RIGHT */}
          <div className="relative shrink-0">

            <div className="absolute inset-0 bg-purple-500/20 blur-lg rounded-full"></div>

            <img
              src="/images/logo.png"
              alt="logo"
              className="relative w-9 h-9 md:w-12 md:h-12 object-contain"
            />

          </div>

        </div>

        {/* LOADING */}
        {loading ? (

          <div className="flex justify-center items-center py-24">

            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>

          </div>

        ) : lectures.length === 0 ? (

          <div className="mt-2 bg-black/40 backdrop-blur-xl border border-zinc-800 rounded-[32px] p-10 text-center">

            <h2 className="text-3xl font-bold text-zinc-300">
              No Lectures Found
            </h2>

            <p className="text-zinc-500 mt-3">
              Lectures not uploaded yet.
            </p>

          </div>

        ) : (

          <div className="flex flex-col gap-3 md:gap-4">

            {lectures.map((item, index) => {

              const theme = THEMES[index % THEMES.length]

              return (

                <div
                  key={item.id}
                  className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.04] to-white/[0.01] backdrop-blur-xl ${theme.ring} hover:-translate-y-0.5 transition-all duration-500 px-3.5 py-3 md:px-5 md:py-4 animate-[fadeSlideIn_0.4s_ease-out_both]`}
                  style={{ animationDelay: `${index * 60}ms` }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 8px 30px -8px rgba(${theme.glowRgb},0.35)`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none"
                  }}
                >

                  {/* TOP SHEEN */}
                  <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                  {/* HOVER GLOW WASH */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                    style={{ background: `linear-gradient(120deg, transparent, rgba(${theme.glowRgb},0.1), transparent)` }}
                  ></div>

                  <div className="relative flex flex-col md:flex-row md:items-center gap-3">

                    <div className="flex items-center gap-3 md:gap-4 md:flex-1 min-w-0">

                      {/* ICON */}
                      <div
                        className={`w-9 h-9 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${theme.grad} flex items-center justify-center text-base md:text-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shrink-0`}
                        style={{ boxShadow: `0 0 15px rgba(${theme.glowRgb},0.45)` }}
                      >

                        🎥

                      </div>

                      {/* TITLE */}
                      <h2 className="flex-1 min-w-0 text-sm md:text-lg font-bold text-white leading-tight transition-all truncate">

                        {item.title}

                      </h2>

                    </div>

                    {/* BUTTONS */}
                    <div className="grid grid-cols-2 md:flex md:items-center gap-2 md:gap-3 shrink-0">

                      {/* WATCH */}
                      <Link
                        href={`/player?video=${encodeURIComponent(item.video_url)}`}
                      >

                        <button
                          className={`w-full bg-gradient-to-r ${theme.grad} hover:scale-105 transition-all duration-300 px- py-2.5 md:px-5 md:py-2.5 rounded-xl text-xs md:text-sm font-bold whitespace-nowrap`}
                          style={{ boxShadow: `0 0 15px rgba(${theme.glowRgb},0.3)` }}
                        >

                          ▶ Watch

                        </button>

                      </Link>

                      {/* NOTES */}
                      {item.pdf_url &&
                      item.pdf_url !== "A" ? (

                        <a
                          href={item.pdf_url}
                          target="_blank"
                        >

                          <button className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-all duration-300 px-3 py-2 md:px-5 md:py-2.5 rounded-xl text-xs md:text-sm font-bold whitespace-nowrap">

                            📄 Notes

                          </button>

                        </a>

                      ) : (

                        <button
                          disabled
                          className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 md:px-5 md:py-2.5 rounded-xl text-xs md:text-sm font-bold text-zinc-500 whitespace-nowrap"
                        >

                          📄 No Notes

                        </button>

                      )}

                    </div>

                  </div>

                </div>

              )

            })}

          </div>

        )}

        {/* FOOTER */}
        <div className="text-center mt-16">

          <div className="inline-flex items-center gap-2">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-zinc-700"></span>
            <p className="text-zinc-500 text-xs tracking-[8px] uppercase">
              Defence Era Premium Platform
            </p>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-zinc-700"></span>
          </div>

        </div>

      </div>

      {/* Keyframes for card entrance (pure CSS, no external animation library) */}
      <style jsx global>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

    </main>

  )
}

export default function LecturesPage() {

  return (

    <Suspense
      fallback={

        <div className="min-h-screen bg-black flex items-center justify-center">

          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>

        </div>

      }
    >

      <LecturesContent />

    </Suspense>

  )
}