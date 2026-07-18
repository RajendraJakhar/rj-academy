"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase"

// Cycling premium color themes + icons — every card feels distinct
const THEMES = [
  { grad: "from-purple-600 to-blue-500", glowRgb: "168,85,247", ring: "hover:border-purple-500", icon: "📘" },
  { grad: "from-pink-500 to-rose-500", glowRgb: "236,72,153", ring: "hover:border-pink-500", icon: "📕" },
  { grad: "from-emerald-500 to-teal-500", glowRgb: "16,185,129", ring: "hover:border-emerald-500", icon: "📗" },
  { grad: "from-amber-500 to-orange-500", glowRgb: "245,158,11", ring: "hover:border-amber-500", icon: "📙" },
  { grad: "from-sky-500 to-cyan-500", glowRgb: "14,165,233", ring: "hover:border-sky-500", icon: "📔" },
  { grad: "from-fuchsia-500 to-violet-500", glowRgb: "217,70,239", ring: "hover:border-fuchsia-500", icon: "📓" },
]

function SubjectsContent() {

  const router = useRouter()
  const searchParams = useSearchParams()

  const courseName = searchParams.get("course")

  const [subjects, setSubjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [navigating, setNavigating] = useState(false)

  useEffect(() => {

    if (courseName) {
      fetchSubjects()
    }

  }, [courseName])

  const fetchSubjects = async () => {

    setLoading(true)

    const { data, error } = await supabase
      .from("subjects")
      .select("*")
      .eq("course", courseName)

    if (error) {

      console.log(error)

    } else {

      setSubjects(data || [])

    }

    setLoading(false)

  }

  return (

    <main className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* NAVIGATION LOADING OVERLAY */}
      {navigating && (

        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center">

          <div className="flex flex-col items-center gap-5">

            <div className="relative">

              <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>

              <div className="absolute inset-0 w-16 h-16 rounded-full bg-purple-500 blur-2xl opacity-30"></div>

            </div>

            <p className="text-zinc-300 tracking-[6px] uppercase text-sm animate-pulse">
              Loading Chapters
            </p>

          </div>

        </div>

      )}

      {/* PREMIUM BACKGROUND */}
      <div className="absolute inset-0">

        <img
          src="/images/hero.jpg"
          className="w-full h-full object-cover opacity-[0.1] pointer-events-none"
        />

        <div className="absolute inset-0 bg-black/75"></div>

      </div>

      {/* GLOW */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600 blur-[140px] opacity-20 rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 blur-[140px] opacity-20 rounded-full"></div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-600 blur-[160px] opacity-[0.07] rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-5">

        {/* HEADER */}
        <div className="sticky top-0 z-50 bg-black/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl md:rounded-3xl px-3 md:px-5 py-2.5 md:py-4 flex items-center justify-between mb-5 md:mb-8 shadow-[0_4px_25px_rgba(168,85,247,0.1)]">

          {/* LEFT */}
          <div className="flex items-center gap-3 md:gap-4 min-w-0">

            <button
              onClick={() => router.back()}
              className="w-9 h-9 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-black/40 backdrop-blur-xl border border-zinc-700 hover:border-purple-500 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all text-lg md:text-xl shrink-0"
            >
              ←
            </button>

            <div className="min-w-0">

              <h1 className="text-lg md:text-3xl font-black bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent tracking-wide truncate drop-shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                SUBJECTS
              </h1>

              {!loading && (
                <p className="text-zinc-500 text-[10px] md:text-xs tracking-[3px] uppercase font-semibold">
                  {subjects.length} Available
                </p>
              )}

            </div>

          </div>

          {/* RIGHT */}
          <div className="relative shrink-0">

            <div className="absolute inset-0 bg-purple-500/20 blur-lg rounded-full"></div>

            <img
              src="/images/logo.png"
              alt="Defence Era"
              className="relative w-9 h-9 md:w-12 md:h-12 object-contain"
            />

          </div>

        </div>

        {/* LOADING */}
        {loading ? (

          <div className="flex flex-col gap-3">

            {[1,2,3,4,5,6].map((item) => (

              <div
                key={item}
                className="animate-pulse bg-black/40 backdrop-blur-xl border border-zinc-800 rounded-2xl p-3 md:p-4 h-[60px] md:h-[76px] flex items-center gap-3 md:gap-4"
              >

                <div className="w-9 h-9 md:w-12 md:h-12 rounded-xl bg-zinc-800 shrink-0"></div>

                <div className="h-4 md:h-5 w-40 md:w-56 bg-zinc-800 rounded"></div>

              </div>

            ))}

          </div>

        ) : subjects.length === 0 ? (

          <div className="bg-black/40 backdrop-blur-xl border border-zinc-800 rounded-[32px] p-10 text-center">

            <h2 className="text-3xl font-bold text-zinc-300">
              No Subjects Found 😭
            </h2>

            <p className="text-zinc-500 mt-3">
              Subjects not uploaded yet.
            </p>

          </div>

        ) : (

          <div className="flex flex-col gap-3">

            {subjects.map((item, index) => {

              const theme = THEMES[index % THEMES.length]

              return (

                <div
                  key={item.id}
                  onClick={() => {
                    setNavigating(true)
                    router.push(
                      `/chapters?course=${courseName}&subject=${item.subject}`
                    )
                  }}
                  className="group cursor-pointer animate-[fadeSlideIn_0.4s_ease-out_both]"
                  style={{ animationDelay: `${index * 60}ms` }}
                >

                  {/* CARD */}
                  <div
                    className={`relative flex items-center gap-3 md:gap-4 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.04] to-white/[0.01] backdrop-blur-xl ${theme.ring} transition-all duration-500 px-3.5 py-2.5 md:px-5 md:py-4 hover:-translate-y-0.5`}
                    style={{
                      boxShadow: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 8px 30px -8px rgba(${theme.glowRgb},0.5)`
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
                      style={{ background: `linear-gradient(120deg, transparent, rgba(${theme.glowRgb},0.12), transparent)` }}
                    ></div>

                    {/* ICON */}
                    <div
                      className={`relative w-9 h-9 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${theme.grad} flex items-center justify-center text-base md:text-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shrink-0`}
                      style={{ boxShadow: `0 0 18px rgba(${theme.glowRgb},0.5)` }}
                    >

                      {theme.icon}

                    </div>

                    {/* NAME */}
                    <h2 className="relative text-sm md:text-lg font-bold text-white leading-tight transition-all truncate flex-1">

                      {item.subject}

                    </h2>

                    {/* INDEX BADGE */}
                    <div className="relative shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] md:text-xs font-bold text-zinc-500 group-hover:text-white group-hover:border-white/30 transition-all">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                  </div>

                </div>

              )

            })}

          </div>

        )}

        {/* FOOTER */}
        <div className="mt-16 text-center pb-8">

          <div className="inline-flex items-center gap-2">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-zinc-700"></span>
            <p className="text-zinc-500 tracking-[6px] uppercase text-xs">
              Defence Era Premium Platform
            </p>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-zinc-700"></span>
          </div>

        </div>

      </div>

      {/* Keyframes for card entrance (no external animation library needed) */}
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

export default function SubjectsPage() {

  return (

    <Suspense
      fallback={

        <div className="min-h-screen bg-black flex items-center justify-center">

          <div className="flex flex-col items-center gap-5">

            <div className="relative">

              <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>

              <div className="absolute inset-0 w-16 h-16 rounded-full bg-purple-500 blur-2xl opacity-30"></div>

            </div>

            <p className="text-zinc-300 tracking-[6px] uppercase text-sm animate-pulse">
              Loading Subjects
            </p>

          </div>

        </div>

      }
    >

      <SubjectsContent />

    </Suspense>

  )
}