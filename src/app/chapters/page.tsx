"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

export default function ChaptersPage() {

  const router = useRouter()
  const searchParams = useSearchParams()

  const courseName = searchParams.get("course")
  const subjectName = searchParams.get("subject")

  const [chapters, setChapters] = useState<any[]>([])

  useEffect(() => {
    if (courseName && subjectName) {
      fetchChapters()
    }
  }, [courseName, subjectName])

  const fetchChapters = async () => {
    const { data, error } = await supabase
      .from("chapters")
      .select("*")
      .eq("course", courseName)
      .eq("subject", subjectName)

    if (error) {
      console.log(error)
    } else {
      setChapters(data)
    }
  }

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
            {subjectName} Chapters
          </h1>

          <p className="text-purple-400 tracking-[4px] mt-1">
            {courseName}
          </p>

        </div>

      </div>

      {/* Chapters */}
      <div className="mt-10 space-y-5">

        {chapters.map((item) => (

          <Link
            href={`/lectures?course=${courseName}&subject=${subjectName}&chapter=${item.chapter}`}
            key={item.id}
          >

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-purple-500 transition-all">

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-2xl font-bold">
                    {item.chapter}
                  </h2>

                  <p className="text-zinc-400 mt-2">
                    Explore Lectures
                  </p>

                </div>

                <div className="text-4xl text-zinc-500">
                  ›
                </div>

              </div>

            </div>

          </Link>

        ))}

      </div>

    </main>
  )
}