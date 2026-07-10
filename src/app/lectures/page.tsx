"use client"

import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase"

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

      <div className="relative z-10 px-4 pb-24">

        {/* HEADER */}
        <div className="sticky top-0 z-50 bg-black/70 backdrop-blur-xl border-b border-purple-500/20">

          <div className="max-w-7xl mx-auto py-4 flex items-center gap-4">

            {/* BACK */}
            <button
              onClick={() => router.back()}
              className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-700 hover:border-purple-500 transition-all text-2xl"
            >
              ←
            </button>

            {/* TITLE */}
            <div className="flex-1">

              <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                LECTURES
              </h1>

              <p className="text-green-400 text-xs md:text-sm tracking-[4px] uppercase mt-1 font-bold">
                ● {lectures.length} Classes Found
              </p>

            </div>

            {/* LOGO */}
            <img
              src="/images/logo.png"
              alt="logo"
              className="w-14 h-14 object-contain"
            />

          </div>

        </div>

        {/* LOADING */}
        {loading ? (

          <div className="flex justify-center items-center py-24">

            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>

          </div>

        ) : lectures.length === 0 ? (

          <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-[32px] p-10 text-center">

            <h2 className="text-3xl font-bold text-zinc-300">
              No Lectures Found
            </h2>

            <p className="text-zinc-500 mt-3">
              Lectures not uploaded yet.
            </p>

          </div>

        ) : (

          <div className="max-w-7xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {lectures.map((item) => (

              <div
                key={item.id}
                className="group overflow-hidden rounded-[32px] border border-zinc-800 bg-gradient-to-br from-zinc-900 to-black hover:border-purple-500 hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(168,85,247,0.35)] transition-all duration-500"
              >

                {/* THUMBNAIL */}
                <div className="relative overflow-hidden">

                  <img
                    src={
                      item.thumbnail ||
                      "/images/hotelbatch.jpg"
                    }
                    alt="lecture"
                    className="w-full h-56 object-cover group-hover:scale-110 transition-all duration-700"
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-black/35"></div>

                  {/* PLAY BUTTON */}
                  <div className="absolute inset-0 flex items-center justify-center">

                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(168,85,247,0.6)] group-hover:scale-110 transition-all duration-500">

                      ▶

                    </div>

                  </div>

                  {/* HD BADGE */}
                  <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-2xl text-xs font-bold tracking-[2px]">

                    HD

                  </div>

                </div>

                {/* CONTENT */}
                <div className="p-5">

                  <h2 className="text-2xl font-black text-white leading-tight group-hover:text-purple-300 transition-all">

                    {item.title}

                  </h2>

                  <p className="text-zinc-400 text-sm mt-3">

                    Premium Defence Lecture

                  </p>

                  {/* BUTTONS */}
                  <div className="grid grid-cols-2 gap-4 mt-6">

                    {/* WATCH */}
                    <Link
                      href={`/player?video=${encodeURIComponent(item.video_url)}`}
                    >

                      <button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:scale-105 transition-all duration-300 py-4 rounded-2xl font-bold shadow-[0_0_25px_rgba(168,85,247,0.35)]">

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

                        <button className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-all duration-300 py-4 rounded-2xl font-bold">

                          📄 Notes

                        </button>

                      </a>

                    ) : (

                      <button
                        disabled
                        className="w-full bg-zinc-900 border border-zinc-800 py-4 rounded-2xl font-bold text-zinc-500"
                      >

                        📄 No Notes

                      </button>

                    )}

                  </div>

                  {/* FOOTER */}
                  <div className="mt-6 flex items-center justify-between">

                    <div className="px-4 py-2 rounded-full bg-zinc-800 border border-zinc-700 text-[11px] tracking-[3px] uppercase text-zinc-300">

                      Defence Era

                    </div>

                    <div className="text-green-400 font-bold text-sm">

                      Active

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

        {/* FOOTER */}
        <div className="text-center mt-16">

          <p className="text-zinc-500 text-xs tracking-[8px] uppercase">

            Defence Era Premium Platform

          </p>

        </div>

      </div>

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