"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

function ChaptersContent() {

  const router = useRouter()
  const searchParams = useSearchParams()

  const courseName = searchParams.get("course")
  const subjectName = searchParams.get("subject")

  const [chapters, setChapters] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    if (courseName && subjectName) {
      fetchChapters()
    }

  }, [courseName, subjectName])

  const fetchChapters = async () => {

    setLoading(true)

    const { data, error } = await supabase
      .from("chapters")
      .select("*")

    if (error) {

      console.log(error)

    } else {

      const filteredData = data?.filter(
        (item) =>
          item.course?.trim().toLowerCase() ===
            courseName?.trim().toLowerCase() &&
          item.subject?.trim().toLowerCase() ===
            subjectName?.trim().toLowerCase()
      )

      setChapters(filteredData || [])
    }

    setLoading(false)
  }

  return (

    <main className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* PREMIUM BACKGROUND */}
      <div className="absolute inset-0">

        <img
          src="/images/hero.jpg"
          className="w-full h-full object-cover opacity-[0.09] pointer-events-none"
        />

        <div className="absolute inset-0 bg-black/75"></div>

      </div>

      {/* PURPLE GLOW */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600 blur-[140px] opacity-20 rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600 blur-[140px] opacity-20 rounded-full"></div>

      <div className="relative z-10 px-4 pb-10">

        {/* HEADER */}
        <div className="sticky top-0 z-50 bg-black/70 backdrop-blur-xl border-b border-purple-500/20">

          <div className="max-w-7xl mx-auto py-4 flex items-center gap-4">

            {/* BACK BUTTON */}
            <button
              onClick={() => router.back()}
              className="w-14 h-14 rounded-2xl bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 flex items-center justify-center text-2xl hover:border-purple-500 transition-all shadow-lg"
            >
              ←
            </button>

            {/* TITLE */}
            <div className="flex-1">

              <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent tracking-wide">
                CHAPTERS
              </h1>

              <p className="text-zinc-400 tracking-[4px] text-xs md:text-sm mt-1 uppercase">
                {subjectName}
              </p>

            </div>

            {/* LOGO */}
            <img
              src="/images/logo.png"
              className="w-14 h-14 md:w-16 md:h-16 object-contain"
            />

          </div>

        </div>

        {/* LOADING */}
        {loading && (

          <div className="flex justify-center items-center py-20">

            <div className="w-14 h-14 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>

          </div>

        )}

        {/* CHAPTERS */}
        {!loading && (

          <div className="max-w-7xl mx-auto mt-8">

            {chapters.length === 0 ? (

              <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-10 text-center text-zinc-400 backdrop-blur-xl">
                No Chapters Found 😭
              </div>

            ) : (

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

                {chapters.map((item) => (

                  <Link
                    key={item.id}
                    href={`/lectures?course=${courseName}&subject=${subjectName}&chapter=${item.chapter}`}
                  >

                    <div className="group relative overflow-hidden rounded-[30px] border border-zinc-800 bg-black/60 backdrop-blur-xl hover:border-purple-500 transition-all duration-300 p-5 cursor-pointer">

                      {/* CARD GLOW */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-all"></div>

                      {/* TOP */}
                      <div className="relative flex items-start justify-between">

                        <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center text-3xl shadow-[0_0_25px_#7c3aed]">

                          📖

                        </div>

                        <div className="text-4xl text-purple-400 group-hover:translate-x-1 transition-all">
                          →
                        </div>

                      </div>

                      {/* TITLE */}
                      <div className="relative mt-6">

                        <h2 className="text-2xl font-black leading-tight text-white group-hover:text-purple-300 transition-all">

                          {item.chapter}

                        </h2>

                        <p className="text-zinc-400 text-sm mt-3 leading-relaxed">

                          Explore premium lectures, notes & important concepts.

                        </p>

                      </div>

                      {/* BOTTOM */}
                      <div className="relative mt-6 flex items-center justify-between">

                        <div className="px-4 py-2 rounded-full bg-zinc-800 text-[11px] tracking-[3px] text-zinc-300 uppercase border border-zinc-700">
                          Defence Era
                        </div>

                        <div className="text-green-400 font-bold text-sm">
                          Active
                        </div>

                      </div>

                    </div>

                  </Link>

                ))}

              </div>

            )}

          </div>

        )}

        {/* FOOTER */}
        <div className="text-center mt-16 pb-8">

          <p className="text-zinc-500 text-xs tracking-[8px] uppercase">
            Defence Era Premium Platform
          </p>

        </div>

      </div>

    </main>
  )
}

export default function ChaptersPage() {

  return (

    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">

          <div className="w-14 h-14 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>

        </div>
      }
    >

      <ChaptersContent />

    </Suspense>
  )
}