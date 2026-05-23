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
  const [loading, setLoading] = useState(true)

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
      .eq("course", courseName)
      .eq("subject", subjectName)

    if (error) {
      console.log(error)
    } else {
      setChapters(data || [])
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-black text-white p-4 max-w-md mx-auto relative overflow-hidden">

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
              Select Chapter
            </h1>

            <p className="text-blue-400 tracking-[3px] text-xs mt-1 font-semibold">
              {subjectName?.toUpperCase()}
            </p>
          </div>
        </div>

        {/* Chapter Cards */}
        <div className="px-1">

          {/* Premium Skeleton Loading */}
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

          ) : chapters.length === 0 ? (

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 text-center text-zinc-400">
              No Chapters Found 😭
            </div>

          ) : (

            chapters.map((item) => (

              <Link
                key={item.id}
                href={`/lectures?course=${courseName}&subject=${subjectName}&chapter=${item.chapter}`}
                className="block w-full mb-4"
              >
                <div className="w-full flex items-center justify-between bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 hover:border-purple-500 active:scale-[0.98] transition-all rounded-3xl px-4 py-4 shadow-lg cursor-pointer group">

                  {/* Left */}
                  <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-all">
                      📖
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-white leading-tight">
                        {item.chapter}
                      </h2>

                      <p className="text-zinc-400 text-sm mt-1">
                        Explore Lectures
                      </p>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="text-3xl text-purple-400 font-bold group-hover:translate-x-1 transition-all">
                    ›
                  </div>

                </div>
              </Link>

            ))
          )}

        </div>

        {/* Footer */}
        <p className="text-center text-zinc-500 text-xs mt-8">
          RJ Academy • Premium Chapter Access
        </p>

      </div>
    </main>
  )
}

export default function ChaptersPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"></div>
        </div>
      }
    >
      <ChaptersContent />
    </Suspense>
  )
}