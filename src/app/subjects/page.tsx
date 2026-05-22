"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

function SubjectsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const courseName = searchParams.get("course")

  const [subjects, setSubjects] = useState<any[]>([])

  useEffect(() => {
    if (courseName) {
      fetchSubjects()
    }
  }, [courseName])

  const fetchSubjects = async () => {
    const { data, error } = await supabase
      .from("subjects")
      .select("*")
      .eq("course", courseName)

    if (error) {
      console.log(error)
    } else {
      setSubjects(data || [])
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-4 max-w-md mx-auto relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600 blur-[120px] opacity-10 rounded-full"></div>

      {/* Premium Header */}
      <div className="relative flex items-center gap-4 mb-8 sticky top-0 bg-black/90 backdrop-blur-md py-3 z-50">

        {/* Premium Back Button */}
        <button
          onClick={() => router.back()}
          className="w-14 h-14 flex items-center justify-center bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl text-2xl shadow-lg hover:border-purple-500 transition-all"
        >
          ←
        </button>

        {/* Title */}
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Select Subject
          </h1>

          <p className="text-blue-400 tracking-[3px] text-xs mt-1 font-semibold">
            {courseName?.toUpperCase()}
          </p>
        </div>

      </div>

      {/* Subject Cards */}
      <div className="px-1">

        {subjects.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 text-center text-zinc-400">
            No Subjects Found 😭
          </div>
        ) : (
          subjects.map((item) => (

            <Link
              href={`/chapters?course=${courseName}&subject=${item.subject}`}
              key={item.id}
              className="block mb-4"
            >
              <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 hover:border-purple-500 transition-all rounded-3xl px-4 py-4 shadow-lg">

                <div className="flex items-center justify-between">

                  {/* Left */}
                  <div className="flex items-center gap-4">

                    {/* Icon Box */}
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center text-2xl shadow-md">
                      📘
                    </div>

                    {/* Text */}
                    <div>
                      <h2 className="text-xl font-bold text-white leading-tight">
                        {item.subject}
                      </h2>

                      <p className="text-zinc-400 text-sm mt-1">
                        Explore Chapters
                      </p>
                    </div>

                  </div>

                  {/* Arrow */}
                  <div className="text-2xl text-purple-400 font-bold">
                    ›
                  </div>

                </div>

              </div>
            </Link>

          ))
        )}

      </div>

      {/* Footer */}
      <p className="text-center text-zinc-500 text-xs mt-8">
        RJ Academy • Premium Subject Access
      </p>

    </main>
  )
}

export default function SubjectsPage() {
  return (
    <Suspense fallback={<div className="text-white p-10">Loading...</div>}>
      <SubjectsContent />
    </Suspense>
  )
}