"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

// ─── COLOR PRESETS — admin panel se "color" field ka mapping ─────────
const COLORS: Record<string, { grad: string; glowRgb: string }> = {
  purple: { grad: "from-purple-600 to-blue-500", glowRgb: "168,85,247" },
  emerald: { grad: "from-emerald-500 to-teal-500", glowRgb: "16,185,129" },
  sky: { grad: "from-sky-500 to-cyan-500", glowRgb: "14,165,233" },
  pink: { grad: "from-pink-500 to-rose-500", glowRgb: "236,72,153" },
  amber: { grad: "from-amber-500 to-orange-500", glowRgb: "245,158,11" },
  fuchsia: { grad: "from-fuchsia-500 to-violet-500", glowRgb: "217,70,239" },
}

// ─── MOTIVATIONAL LINES — roz apne aap badalti hai ───────────────────
const QUOTES = [
  "Your Family is Waiting for Your Success.",
  "The Uniform is Earned, Not Given.",
  "Every Page You Study is a Step Closer to the Academy.",
  "Sacrifice Today. Salute Tomorrow.",
  "Your Only Competition is Who You Were Yesterday.",
  "Dream in Olive Green. Work in Silence.",
  "The Nation Needs Officers. Why Not You?",
]

const STORAGE_KEY = "defence_era_target_exam"

function getDaysLeft(dateStr: string) {

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const examDate = new Date(dateStr + "T00:00:00")

  const diff = examDate.getTime() - today.getTime()

  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

// Quote of the day — day-of-year se rotate hoti hai
function getQuoteOfTheDay() {

  const now = new Date()

  const start = new Date(now.getFullYear(), 0, 0)

  const dayOfYear = Math.floor(
    (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  )

  return QUOTES[dayOfYear % QUOTES.length]
}

export default function ExamCountdown() {

  const [exams, setExams] = useState<any[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showPicker, setShowPicker] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {

    setMounted(true)

    fetchExams()

  }, [])

  // FETCH EXAMS from Supabase (admin-managed)
  const fetchExams = async () => {

    const { data, error } = await supabase
      .from("exams")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })

    if (error) {

      console.log(error)

    } else {

      setExams(data || [])

      // Restore saved selection (only if it still exists & active)
      const saved = localStorage.getItem(STORAGE_KEY)

      if (saved && data?.find((e) => e.id === saved)) {
        setSelectedId(saved)
      }

    }

  }

  const selectExam = (id: string) => {

    localStorage.setItem(STORAGE_KEY, id)
    setSelectedId(id)
    setShowPicker(false)
  }

  // Avoid rendering until mounted (localStorage is client-only)
  if (!mounted) return null

  // Agar admin ne koi exam add hi nahi kiya, component chupchaap gayab
  if (exams.length === 0) return null

  const exam = exams.find((e) => e.id === selectedId)

  const color = exam ? COLORS[exam.color] || COLORS.purple : COLORS.purple

  const daysLeft = exam ? getDaysLeft(exam.exam_date) : 0

  const quote = getQuoteOfTheDay()

  return (

    <>

      {/* ─── COUNTDOWN CARD / SELECT PROMPT ─── */}
      {exam ? (

        <div
          className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.05] via-white/[0.02] to-white/[0.05] backdrop-blur-xl px-4 py-4 md:px-6 md:py-5"
          style={{ boxShadow: `0 8px 30px -10px rgba(${color.glowRgb},0.2)` }}
        >

          {/* TOP SHEEN */}
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>

          {/* SOFT CORNER GLOW */}
          <div
            className="pointer-events-none absolute -top-16 -left-16 w-48 h-48 rounded-full blur-[90px] opacity-10"
            style={{ background: `rgb(${color.glowRgb})` }}
          ></div>

          <div className="relative flex items-center gap-3 md:gap-5">

            {/* ICON */}
            <div
              className={`relative w-11 h-11 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${color.grad} flex items-center justify-center text-xl md:text-3xl shrink-0`}
              style={{ boxShadow: `0 0 16px rgba(${color.glowRgb},0.3)` }}
            >

              {exam.icon}

            </div>

            {/* EXAM INFO */}
            <div className="min-w-0 shrink-0">

              <p className="text-zinc-500 text-[10px] md:text-xs tracking-[3px] uppercase font-semibold truncate">
                Target Exam
              </p>

              <h3 className="text-white font-black text-sm md:text-xl leading-tight truncate">
                {exam.name}
              </h3>

              <p className="text-zinc-500 text-[10px] md:text-xs mt-0.5">
                {new Date(exam.exam_date + "T00:00:00").toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>

            </div>

            {/* CENTER QUOTE — desktop */}
            <div className="hidden lg:flex flex-1 items-center justify-center px-4 min-w-0">

              <div className="text-center min-w-0">

                <p className="text-zinc-600 text-[9px] tracking-[4px] uppercase font-bold mb-1.5">
                  Remember Why You Started
                </p>

                <p className="italic font-semibold text-base xl:text-lg text-zinc-300 leading-snug">
                  "{quote}"
                </p>

              </div>

            </div>

            {/* SPACER for smaller screens without center quote */}
            <div className="flex-1 lg:hidden"></div>

            {/* DAYS LEFT */}
            <div className="relative text-right shrink-0">

              {daysLeft > 0 ? (

                <>

                  <p
                    className={`text-4xl md:text-5xl font-black bg-gradient-to-br ${color.grad} bg-clip-text text-transparent leading-none`}
                  >
                    {daysLeft}
                  </p>

                  <p className="text-zinc-500 text-[10px] md:text-xs tracking-[2px] uppercase font-semibold mt-1">
                    Days Left
                  </p>

                </>

              ) : daysLeft === 0 ? (

                <p className="text-xl md:text-2xl font-black text-white">
                  Exam Today! 🔥
                </p>

              ) : (

                <p className="text-sm md:text-base font-bold text-zinc-400">
                  Exam Done ✅
                </p>

              )}

            </div>

            {/* CHANGE BUTTON */}
            <button
              onClick={() => setShowPicker(true)}
              className="relative shrink-0 w-8 h-8 md:w-9 md:h-9 rounded-lg bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all text-zinc-400 hover:text-white text-sm"
              title="Change exam"
            >
              ✏️
            </button>

          </div>

          {/* QUOTE — mobile/tablet (below main row) */}
          <div className="lg:hidden relative mt-3 pt-3 border-t border-white/5 text-center">

            <p className="italic font-semibold text-xs md:text-sm text-zinc-300 leading-snug">
              "{quote}"
            </p>

          </div>

        </div>

      ) : (

        <button
          onClick={() => setShowPicker(true)}
          className="w-full relative overflow-hidden rounded-2xl md:rounded-3xl border border-dashed border-purple-500/40 bg-black/40 backdrop-blur-xl px-4 py-4 md:px-6 md:py-5 hover:border-purple-500 hover:bg-purple-600/5 transition-all group"
        >

          <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3">

            <span className="text-2xl group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">🎯</span>

            <span className="font-black text-base md:text-lg bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent tracking-wide">
              SELECT YOUR DREAM
            </span>

          </div>

          <p className="text-zinc-500 text-[10px] md:text-xs tracking-[2px] uppercase font-semibold mt-1.5">
            Choose Your Target &amp; Start The Countdown
          </p>

        </button>

      )}

      {/* ─── PICKER MODAL ─── */}
      {showPicker && (

        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowPicker(false)}
        >

          <div
            className="w-full max-w-md bg-zinc-950 border border-purple-500/30 rounded-3xl p-5 md:p-6 shadow-[0_0_60px_rgba(168,85,247,0.2)]"
            onClick={(e) => e.stopPropagation()}
          >

            <h3 className="text-lg md:text-xl font-black bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent tracking-wide mb-1">
              SELECT YOUR DREAM
            </h3>

            <p className="text-zinc-500 text-xs mb-5">
              Dashboard pe countdown isi exam ka dikhega.
            </p>

            <div className="flex flex-col gap-3">

              {exams.map((e) => {

                const c = COLORS[e.color] || COLORS.purple

                const d = getDaysLeft(e.exam_date)

                return (

                  <button
                    key={e.id}
                    onClick={() => selectExam(e.id)}
                    className={`relative flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all hover:-translate-y-0.5 ${
                      selectedId === e.id
                        ? "border-purple-500 bg-purple-600/10"
                        : "border-white/10 bg-white/[0.03] hover:border-white/30"
                    }`}
                  >

                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.grad} flex items-center justify-center text-lg shrink-0`}
                      style={{ boxShadow: `0 0 15px rgba(${c.glowRgb},0.3)` }}
                    >
                      {e.icon}
                    </div>

                    <div className="min-w-0 flex-1">

                      <p className="text-white font-bold text-sm truncate">
                        {e.name}
                      </p>

                      <p className="text-zinc-500 text-xs">
                        {new Date(e.exam_date + "T00:00:00").toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>

                    </div>

                    <p className="text-zinc-400 text-xs font-bold shrink-0">
                      {d > 0 ? `${d}d left` : d === 0 ? "Today!" : "Done"}
                    </p>

                  </button>

                )

              })}

            </div>

            <button
              onClick={() => setShowPicker(false)}
              className="mt-5 w-full rounded-xl border border-zinc-800 py-2.5 text-zinc-400 text-sm hover:text-white hover:border-zinc-600 transition-all"
            >
              Cancel
            </button>

          </div>

        </div>

      )}

    </>

  )
}