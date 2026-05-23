"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function AdminChaptersPage() {
  const router = useRouter()

  const [course, setCourse] = useState("")
  const [subject, setSubject] = useState("")
  const [chapter, setChapter] = useState("")
  const [saving, setSaving] = useState(false)

  const [courses, setCourses] = useState<any[]>([])
  const [subjects, setSubjects] = useState<any[]>([])

  useEffect(() => {
    fetchCourses()
  }, [])

  useEffect(() => {
    if (course) {
      fetchSubjects()
      setSubject("")
    }
  }, [course])

  const fetchCourses = async () => {
    const { data, error } = await supabase
      .from("courses")
      .select("*")

    if (error) {
      console.log(error)
    } else {
      setCourses(data || [])
    }
  }

  const fetchSubjects = async () => {
    const { data, error } = await supabase
      .from("subjects")
      .select("*")
      .eq("course", course)

    if (error) {
      console.log(error)
    } else {
      setSubjects(data || [])
    }
  }

  const handleSave = async () => {
    if (!course || !subject || !chapter) {
      alert("Please fill all fields 😭")
      return
    }

    setSaving(true)

    const { error } = await supabase
      .from("chapters")
      .insert([
        {
          course,
          subject,
          chapter,
        },
      ])

    if (error) {
      alert("Error saving chapter 😭")
      console.log(error)
    } else {
      alert("Chapter Saved 😎🔥")

      setCourse("")
      setSubject("")
      setChapter("")
    }

    setSaving(false)
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
              Add Chapter
            </h1>

            <p className="text-zinc-400 text-sm mt-1">
              Add chapter inside subject
            </p>
          </div>

        </div>

        {/* Form Card */}
        <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 rounded-3xl p-5 shadow-xl space-y-5">

          {/* Course Dropdown */}
          <div className="w-full bg-black border border-zinc-700 hover:border-purple-500 focus-within:border-purple-500 rounded-2xl p-1 transition-all cursor-pointer">
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full bg-black text-white p-4 outline-none rounded-2xl cursor-pointer appearance-none"
            >
              <option value="" className="bg-zinc-900 text-white">
                📚 Select Course
              </option>

              {courses.map((item) => (
                <option
                  key={item.id}
                  value={item.title}
                  className="bg-zinc-900 text-white"
                >
                  {item.title}
                </option>
              ))}
            </select>
          </div>

          {/* Subject Dropdown */}
          <div className="w-full bg-black border border-zinc-700 hover:border-purple-500 focus-within:border-purple-500 rounded-2xl p-1 transition-all cursor-pointer">
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-black text-white p-4 outline-none rounded-2xl cursor-pointer appearance-none"
            >
              <option value="" className="bg-zinc-900 text-white">
                📘 Select Subject
              </option>

              {subjects.map((item) => (
                <option
                  key={item.id}
                  value={item.subject}
                  className="bg-zinc-900 text-white"
                >
                  {item.subject}
                </option>
              ))}
            </select>
          </div>

          {/* Chapter Input */}
          <div
            onClick={() => document.getElementById("chapter")?.focus()}
            className="w-full cursor-text bg-black border border-zinc-700 hover:border-purple-500 focus-within:border-purple-500 rounded-2xl p-1 transition-all"
          >
            <input
              id="chapter"
              type="text"
              placeholder="📖 Chapter Name"
              value={chapter}
              onChange={(e) => setChapter(e.target.value)}
              className="w-full bg-transparent p-4 outline-none text-white"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 active:scale-[0.98] transition-all p-4 rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center gap-3"
          >
            {saving ? (
              <>
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                Saving...
              </>
            ) : (
              "Save Chapter 😈🔥"
            )}
          </button>

        </div>

        {/* Footer */}
        <p className="text-center text-zinc-500 text-xs mt-8">
          RJ Academy • Premium Admin Chapter Panel
        </p>

      </div>
    </main>
  )
}