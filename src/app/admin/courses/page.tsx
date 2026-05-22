"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function AdminCoursesPage() {
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [subtitle, setSubtitle] = useState("")
  const [thumbnail, setThumbnail] = useState("")

  const handleSave = async () => {
    if (!title || !subtitle || !thumbnail) {
      alert("Please fill all fields 😭")
      return
    }

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

        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Add Course
          </h1>

          <p className="text-zinc-400 text-sm mt-1">
            Create a new premium course
          </p>
        </div>

      </div>

      {/* Form Card */}
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 rounded-3xl p-5 shadow-lg space-y-5">

        {/* Course Title */}
        <input
          type="text"
          placeholder="📚 Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-black border border-zinc-700 rounded-2xl p-4 outline-none text-white"
        />

        {/* Subtitle */}
        <input
          type="text"
          placeholder="📝 Course Subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          className="w-full bg-black border border-zinc-700 rounded-2xl p-4 outline-none text-white"
        />

        {/* Thumbnail */}
        <input
          type="text"
          placeholder="🖼 Thumbnail URL"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          className="w-full bg-black border border-zinc-700 rounded-2xl p-4 outline-none text-white"
        />

        {/* Preview */}
        {thumbnail && (
          <div className="rounded-3xl overflow-hidden border border-zinc-700">
            <img
              src={thumbnail}
              alt="preview"
              className="w-full h-48 object-cover"
            />
          </div>
        )}

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 transition-all p-4 rounded-2xl font-bold text-lg shadow-lg"
        >
          Save Course 😈🔥
        </button>

      </div>

      {/* Footer */}
      <p className="text-center text-zinc-500 text-xs mt-8">
        RJ Academy • Premium Admin Course Panel
      </p>

    </main>
  )
}