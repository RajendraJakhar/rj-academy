"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase"

function SubjectsContent() {

  const router = useRouter()
  const searchParams = useSearchParams()

  const courseName = searchParams.get("course")

  const [subjects, setSubjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

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

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-5">

        {/* HEADER */}
        <div className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-3xl px-4 py-4 flex items-center justify-between mb-8">

          {/* LEFT */}
          <div className="flex items-center gap-4">

            <button
              onClick={() => router.back()}
              className="w-14 h-14 rounded-2xl bg-black/40 backdrop-blur-xl border border-zinc-700 hover:border-purple-500 hover:-translate-y-1 transition-all text-2xl"
            >
              ←
            </button>

            <div>

              <h1 className="text-2xl md:text-5xl font-black bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent tracking-wide">
                SUBJECTS
              </h1>

              <p className="text-zinc-300 text-xs md:text-sm tracking-[4px] uppercase mt-1">
                {courseName}
              </p>

            </div>

          </div>

          {/* RIGHT */}
          <img
            src="/images/logo.png"
            alt="Defence Era"
            className="w-14 h-14 md:w-16 md:h-16 object-contain"
          />

        </div>

        {/* LOADING */}
        {loading ? (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {[1,2,3,4,5,6].map((item) => (

              <div
                key={item}
                className="animate-pulse bg-black/40 backdrop-blur-xl border border-zinc-800 rounded-[32px] p-6 h-[200px]"
              >

                <div className="w-16 h-16 rounded-3xl bg-zinc-800"></div>

                <div className="h-6 w-40 bg-zinc-800 rounded mt-8"></div>

                <div className="h-4 w-28 bg-zinc-800 rounded mt-3"></div>

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

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {subjects.map((item) => (

              <div
                key={item.id}
                onClick={() =>
                  router.push(
                    `/chapters?course=${courseName}&subject=${item.subject}`
                  )
                }
                className="group cursor-pointer"
              >

                {/* CARD */}
                <div className="relative h-full overflow-hidden rounded-[32px] border border-purple-500/20 bg-black/40 backdrop-blur-xl hover:border-purple-500 transition-all duration-500 p-6 hover:-translate-y-1">

                  {/* GLOW */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-purple-600/10"></div>

                  {/* TOP */}
                  <div className="relative flex items-center justify-between">

                    <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center text-3xl shadow-[0_0_25px_rgba(168,85,247,0.5)] group-hover:scale-110 transition-all duration-500">

                      📘

                    </div>

                    <div className="text-4xl text-purple-400 group-hover:translate-x-2 transition-all duration-500">
                      →
                    </div>

                  </div>

                  {/* CONTENT */}
                  <div className="relative mt-8">

                    <h2 className="text-2xl font-bold text-white leading-tight group-hover:text-purple-300 transition-all">

                      {item.subject}

                    </h2>

                    <p className="text-zinc-300 mt-3 text-sm leading-relaxed">

                      Explore premium chapters, notes & lectures.

                    </p>

                  </div>

                  {/* BOTTOM */}
                  <div className="relative mt-8 flex items-center justify-between">

                    <div className="px-4 py-2 rounded-full bg-zinc-900/80 text-xs tracking-[3px] uppercase text-zinc-300 border border-zinc-700">

                      Defence Era

                    </div>

                    <div className="text-green-400 text-sm font-semibold">

                      Active

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

        {/* FOOTER */}
        <div className="mt-16 text-center pb-8">

          <p className="text-zinc-400 tracking-[6px] uppercase text-xs">
            Defence Era Premium Platform
          </p>

        </div>

      </div>

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