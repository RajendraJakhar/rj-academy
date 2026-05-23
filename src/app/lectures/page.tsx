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

  useEffect(() => {
    if (courseName && subjectName && chapterName) {
      fetchLectures()
    }
  }, [courseName, subjectName, chapterName])

  const fetchLectures = async () => {
    const { data, error } = await supabase
      .from("lectures")
      .select("*")
      .eq("course", courseName?.trim())
      .eq("subject", subjectName?.trim())
      .eq("chapter", chapterName?.trim())
      .order("lecture_number", { ascending: true })

    if (error) {
      console.log(error)
    } else {
      console.log("Lectures:", data)
      setLectures(data || [])
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-4 max-w-md mx-auto relative overflow-hidden overflow-x-hidden w-screen">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600 blur-[120px] opacity-10 rounded-full"></div>

      {/* Premium Header */}
      <div className="relative flex items-center gap-4 mb-8 sticky top-0 bg-black/90 backdrop-blur-md py-3 z-50">

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="w-14 h-14 flex items-center justify-center bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl text-2xl shadow-lg hover:border-purple-500 transition-all"
        >
          ←
        </button>

        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Recorded Lectures
          </h1>

          <p className="text-green-400 text-sm mt-1 font-semibold">
            ● {lectures.length} CLASSES FOUND
          </p>
        </div>

      </div>

      {/* Lecture Cards */}
      <div>

        {lectures.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 text-center text-zinc-400">
            No Lectures Found 😭
          </div>
        ) : (
          lectures.map((item) => (

            <div
              key={item.id}
              className="bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 rounded-3xl overflow-hidden mb-5 shadow-lg"
            >

              {/* Thumbnail */}
              <div className="relative">

                <img
                  src={item.thumbnail || "/images/hotelbatch.jpg"}
                  alt="lecture"
                  className="w-full h-48 object-cover"
                />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-2xl shadow-lg">
                    ▶
                  </div>
                </div>

                {/* HD Badge */}
                <div className="absolute bottom-3 right-3 bg-black/80 px-3 py-1 rounded-xl text-xs font-bold">
                  HD
                </div>

              </div>

              {/* Content */}
              <div className="p-4">

                <h2 className="text-xl font-bold text-white">
                  {item.title}
                </h2>

                <p className="text-zinc-400 text-sm mt-1">
                  RJ Academy
                </p>

                {/* Buttons */}
                <div className="mt-4 grid grid-cols-2 gap-3">

                  <Link
                    href={`/player?video=${encodeURIComponent(item.video_url)}`}
                  >
                    <button className="w-full bg-purple-600 hover:bg-purple-700 transition-all p-3 rounded-2xl font-bold text-sm shadow-lg">
                      ▶ Watch
                    </button>
                  </Link>

                  {item.pdf_url ? (
                    <a
                      href={item.pdf_url}
                      target="_blank"
                    >
                      <button className="w-full bg-zinc-800 hover:bg-zinc-700 transition-all p-3 rounded-2xl font-bold text-sm border border-zinc-700">
                        📄 Notes
                      </button>
                    </a>
                  ) : (
                    <button
                      disabled
                      className="w-full bg-zinc-800 p-3 rounded-2xl font-bold text-sm text-zinc-500 border border-zinc-700"
                    >
                      📄 No Notes
                    </button>
                  )}

                </div>

              </div>

            </div>

          ))
        )}

      </div>

      {/* Footer */}
      <p className="text-center text-zinc-500 text-xs mt-8">
        RJ Academy • Premium Lecture Access
      </p>

    </main>
  )
}

export default function LecturesPage() {
  return (
    <Suspense fallback={<div className="text-white p-10">Loading...</div>}>
      <LecturesContent />
    </Suspense>
  )
}