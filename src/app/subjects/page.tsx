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
      setSubjects(data)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-4">

      {/* Header */}
      <div className="flex items-center gap-4">

        <button
          onClick={() => router.back()}
          className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl"
        >
          ←
        </button>

        <div>
          <h1 className="text-4xl font-bold">
            Select Subject
          </h1>

          <p className="text-purple-400 tracking-[4px] mt-1">
            {courseName}
          </p>
        </div>

      </div>

      {/* Subject Cards */}
      <div className="mt-10 space-y-5">

        {subjects.map((item) => (

          <Link
            href={`/chapters?course=${courseName}&subject=${item.subject}`}
            key={item.id}
          >

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 flex items-center justify-between hover:border-purple-500 transition-all">

              <div className="flex items-center gap-4">

                <div className="w-20 h-20 bg-zinc-800 rounded-2xl flex items-center justify-center">
                  📘
                </div>

                <div>
                  <h2 className="text-2xl font-bold">
                    {item.subject}
                  </h2>

                  <p className="text-zinc-400 mt-1">
                    Explore Chapters
                  </p>
                </div>

              </div>

              <div className="text-3xl text-zinc-500">
                ›
              </div>

            </div>

          </Link>

        ))}

      </div>

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