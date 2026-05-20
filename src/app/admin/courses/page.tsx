"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function AdminCoursesPage() {

  const [title, setTitle] = useState("")
  const [subtitle, setSubtitle] = useState("")
  const [thumbnail, setThumbnail] = useState("")

  const handleSave = async () => {

    const { error } = await supabase
      .from("courses")
      .insert([
        {
          title,
          subtitle,
          thumbnail,
        },
      ])

    if (error) {
      alert("Error saving course 😭")
      console.log(error)
    } else {
      alert("Course Saved to Database 😎🔥")

      setTitle("")
      setSubtitle("")
      setThumbnail("")
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-4">

      {/* Header */}
      <h1 className="text-4xl font-bold text-purple-400">
        Add Course
      </h1>

      <p className="text-zinc-400 mt-2">
        Create a new premium course
      </p>

      {/* Form */}
      <div className="mt-10 space-y-5">

        {/* Course Title */}
        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4 outline-none"
        />

        {/* Subtitle */}
        <input
          type="text"
          placeholder="Course Subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4 outline-none"
        />

        {/* Thumbnail */}
        <input
          type="text"
          placeholder="Thumbnail URL"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4 outline-none"
        />

        {/* Preview */}
        {thumbnail && (
          <img
            src={thumbnail}
            alt="preview"
            className="w-full h-56 object-cover rounded-3xl"
          />
        )}

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-purple-600 hover:bg-purple-700 transition-all p-4 rounded-2xl font-bold"
        >
          Save Course
        </button>

      </div>

    </main>
  )
}