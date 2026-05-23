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
  const [clickedId, setClickedId] = useState<number | null>(null)

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

  const handleSubjectClick = (item: any) => {
    setClickedId(item.id)

    setTimeout(() => {
      router.push(`/chapters?course=${courseName}&subject=${item.subject}`)
    }, 500)
  }

  return (
    <main className="min-h-screen bg-black text-white p-4 max-w-md mx-auto relative overflow-hidden overflow-x-hidden w-screen">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600 blur-[120px] opacity-10 rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-600 blur-[120px] opacity-10 rounded-full pointer-events-none"></div>

      <div className="relative z-10">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8 sticky top-0 bg-black/90 backdrop-blur-md py-3 z-50">

          <button
            onClick={() => router.back()}
            className="w-14 h-14 flex items-center justify-center bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl text-2xl shadow-lg hover:border-purple-500 transition-all"
          >
            ←
          </button>

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

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="animate-pulse flex items-center justify-between bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 rounded-3xl px-4 py-4 shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-zinc-700"></div>

                    <div>
                      <div className="h-5 w-32 bg-zinc-700 rounded mb-2"></div>
                      <div className="h-3 w-24 bg-zinc-800 rounded"></div>
                    </div>
                  </div>

                  <div className="h-6 w-6 bg-zinc-700 rounded"></div>
                </div>
              ))}
            </div>

          ) : subjects.length === 0 ? (

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 text-center text-zinc-400">
              No Subjects Found 😭
            </div>

          ) : (

            subjects.map((item) => (

              <div
                key={item.id}
                onClick={() => handleSubjectClick(item)}
                className="w-full mb-4 cursor-pointer"
              >
                <div className="w-full flex items-center justify-between bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 hover:border-purple-500 active:scale-[0.98] transition-all rounded-3xl px-4 py-4 shadow-lg group">

                  {/* Left */}
                  <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-all">
                      📘
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-white leading-tight">
                        {item.subject}
                      </h2>

                      <p className="text-zinc-400 text-sm mt-1">
                        {clickedId === item.id ? "Opening..." : "Explore Chapters"}
                      </p>
                    </div>
                  </div>

                  {/* Right */}
                  {clickedId === item.id ? (
                    <div className="animate-spin w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full"></div>
                  ) : (
                    <div className="text-3xl text-purple-400 font-bold group-hover:translate-x-1 transition-all">
                      ›
                    </div>
                  )}

                </div>
              </div>

            ))
          )}

        </div>

        {/* Footer */}
        <p className="text-center text-zinc-500 text-xs mt-8">
          RJ Academy • Premium Subject Access
        </p>

      </div>
    </main>
  )
}

export default function SubjectsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">

          <div className="relative">
            <div className="animate-spin w-14 h-14 border-4 border-purple-500 border-t-transparent rounded-full"></div>
            <div className="absolute inset-0 animate-ping w-14 h-14 border border-purple-400 rounded-full opacity-30"></div>
          </div>

          <p className="text-zinc-400 text-sm tracking-widest animate-pulse">
            LOADING SUBJECTS...
          </p>

        </div>
      }
    >
      <SubjectsContent />
    </Suspense>
  )
}