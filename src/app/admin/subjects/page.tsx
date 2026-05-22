"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function AdminSubjectsPage() {
  const router = useRouter()

  const [subject, setSubject] = useState("")
  const [course, setCourse] = useState("")
  const [courses, setCourses] = useState<any[]>([])

  useEffect(() => {
    fetchCourses()
  }, [])

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

  const handleSave = async () => {
    if (!course || !subject) {
      alert("Please fill all fields 😭")
      return
    }

    const { error } = await supabase
      .from("subjects")
      .insert([
        {
          course,
          subject,
        },
      ])

    if (error) {
      alert("Error saving subject 😭")
      console.log(error)
    } else {
      alert("Subject Saved 😎🔥")

      setCourse("")
      setSubject("")
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
            Add Subject
          </h1>

          <p className="text-zinc-400 text-sm mt-1">
            Add subject inside a course
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

        {/* Subject Name */}
        <input
          type="text"
          placeholder="📘 Subject Name"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full bg-black border border-zinc-700 rounded-2xl p-4 outline-none text-white"
        />

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 transition-all p-4 rounded-2xl font-bold text-lg shadow-lg"
        >
          Save Subject 😈🔥
        </button>

      </div>

      {/* Footer */}
      <p className="text-center text-zinc-500 text-xs mt-8">
        RJ Academy • Premium Admin Subject Panel
      </p>

    </main>
  )
}