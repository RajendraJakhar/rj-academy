"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function AdminSubjectsPage() {

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
      setCourses(data)
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
    <main className="min-h-screen bg-black text-white p-4">

      <h1 className="text-4xl font-bold text-purple-400">
        Add Subject
      </h1>

      <p className="text-zinc-400 mt-2">
        Add subject inside a course
      </p>

      <div className="mt-10 space-y-5">

        {/* Course Dropdown */}
        <select
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4 outline-none"
        >
          <option value="">
            Select Course
          </option>

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
          placeholder="Subject Name"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4 outline-none"
        />

        {/* Save */}
        <button
          onClick={handleSave}
          className="w-full bg-purple-600 hover:bg-purple-700 p-4 rounded-2xl font-bold"
        >
          Save Subject
        </button>

      </div>

    </main>
  )
}