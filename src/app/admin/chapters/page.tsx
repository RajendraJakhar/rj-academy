"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function AdminChaptersPage() {
  const router = useRouter()

  const [course, setCourse] = useState("")
  const [subject, setSubject] = useState("")
  const [chapter, setChapter] = useState("")

  const [courses, setCourses] = useState<any[]>([])
  const [subjects, setSubjects] = useState<any[]>([])

  useEffect(() => {
    fetchCourses()
  }, [])

  useEffect(() => {
    if (course) {
      fetchSubjects()
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
            Add Chapter
          </h1>

          <p className="text-zinc-400 text-sm mt-1">
            Add chapter inside subject
          </p>
        </div>

      </div>

      {/* Form Card */}
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 rounded-3xl p-5 shadow-lg space-y-5">

        {/* Course Dropdown */}
        <select
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="w-full bg-black border border-zinc-700 rounded-2xl p-4 outline-none text-white"
        >
          <option value="">📚 Select Course</option>

          {courses.map((item) => (
            <option
              key={item.id}
              value={item.title}
            >
              {item.title}
            </option>
          ))}
        </select>

        {/* Subject Dropdown */}
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full bg-black border border-zinc-700 rounded-2xl p-4 outline-none text-white"
        >
          <option value="">📘 Select Subject</option>

          {subjects.map((item) => (
            <option
              key={item.id}
              value={item.subject}
            >
              {item.subject}
            </option>
          ))}
        </select>

        {/* Chapter Name */}
        <input
          type="text"
          placeholder="📖 Chapter Name"
          value={chapter}
          onChange={(e) => setChapter(e.target.value)}
          className="w-full bg-black border border-zinc-700 rounded-2xl p-4 outline-none text-white"
        />

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 transition-all p-4 rounded-2xl font-bold text-lg shadow-lg"
        >
          Save Chapter 😈🔥
        </button>

      </div>

      {/* Footer */}
      <p className="text-center text-zinc-500 text-xs mt-8">
        RJ Academy • Premium Admin Chapter Panel
      </p>

    </main>
  )
}