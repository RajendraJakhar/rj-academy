"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function LecturesPage() {

  const router = useRouter()
  const searchParams = useSearchParams()

  const courseName = searchParams.get("course")
  const subjectName = searchParams.get("subject")
  const chapterName = searchParams.get("chapter")

  const [lectures, setLectures] = useState<any[]>([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (courseName && subjectName && chapterName) {
      fetchLectures()
    }
  }, [courseName, subjectName, chapterName])

  const fetchLectures = async () => {
    const { data, error } = await supabase
      .from("lectures")
      .select("*")

    if (error) {
      console.log(error)
    } else {

      const filtered = data.filter((item) =>
        item.course?.includes(courseName || "") &&
        item.subject?.includes(subjectName || "") &&
        item.chapter?.includes(chapterName || "")
      )

      setLectures(filtered)
    }
  }

  const filteredLectures = lectures.filter((item) =>
    item.title?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="min-h-screen bg-black text-white p-4">

      {/* Header */}
      <div className="flex items-center gap-4">

        <button
          className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl"
          onClick={() => router.back()}
        >
          ←
        </button>

        <div>
          <h1 className="text-4xl font-bold">
            Recorded Lectures
          </h1>

          <p className="text-green-400 mt-1">
            ● {filteredLectures.length} CLASSES FOUND
          </p>
        </div>

      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search class..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mt-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-4 outline-none"
      />

      {/* Lecture Cards */}
      <div className="mt-8 space-y-6">

        {filteredLectures.map((item) => (

          <div
            key={item.id}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden"
          >

            {/* Thumbnail */}
            <div className="relative">

              <img
                src={item.thumbnail || "/images/hotelbatch.jpg"}
                alt="lecture"
                className="w-full h-56 object-cover"
              />

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">

                <div className="w-20 h-20 rounded-full bg-purple-600 flex items-center justify-center text-3xl">
                  ▶
                </div>

              </div>

              {/* HD Badge */}
              <div className="absolute bottom-4 right-4 bg-black/80 px-3 py-1 rounded-xl text-sm">
                HD
              </div>

            </div>

            {/* Content */}
            <div className="p-5">

              <h2 className="text-2xl font-bold">
                {item.title}
              </h2>

              <p className="text-zinc-400 mt-2">
                RJ Academy
              </p>

              {/* Buttons */}
              <div className="mt-5 flex gap-3">

                {/* Watch Lecture */}
                <Link
                  href={`/player?video=${encodeURIComponent(item.video_url)}`}
                  className="flex-1"
                >
                  <button className="w-full bg-purple-600 hover:bg-purple-700 transition-all p-3 rounded-2xl font-bold">
                    ▶ Watch
                  </button>
                </Link>

                {/* PDF Notes */}
                {item.pdf_url && (
                  <a
                    href={item.pdf_url}
                    target="_blank"
                    className="flex-1"
                  >
                    <button className="w-full bg-zinc-800 hover:bg-zinc-700 transition-all p-3 rounded-2xl font-bold">
                      📄 Notes
                    </button>
                  </a>
                )}

              </div>

            </div>

          </div>

        ))}

      </div>

    </main>
  )
}