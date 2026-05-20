"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function AdminChaptersPage() {

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
      setCourses(data)
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
      setSubjects(data)
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
    <main className="min-h-screen bg-black text-white p-4">

      <h1 className="text-4xl font-bold text-purple-400">
        Add Chapter
      </h1>

      <p className="text-zinc-400 mt-2">
        Add chapter inside subject
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

        {/* Subject Dropdown */}
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4 outline-none"
        >
          <option value="">
            Select Subject
          </option>

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
          placeholder="Chapter Name"
          value={chapter}
          onChange={(e) => setChapter(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4 outline-none"
        />

        {/* Save */}
        <button
          onClick={handleSave}
          className="w-full bg-purple-600 hover:bg-purple-700 p-4 rounded-2xl font-bold"
        >
          Save Chapter
        </button>

      </div>

    </main>
  )
}