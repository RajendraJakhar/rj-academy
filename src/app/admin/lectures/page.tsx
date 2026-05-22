"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function AdminLecturesPage() {
  const router = useRouter()

  const [course, setCourse] = useState("")
  const [subject, setSubject] = useState("")
  const [chapter, setChapter] = useState("")

  const [lectureNo, setLectureNo] = useState("")
  const [title, setTitle] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const [pdfUrl, setPdfUrl] = useState("")
  const [thumbnail, setThumbnail] = useState("")

  const [courses, setCourses] = useState<any[]>([])
  const [subjects, setSubjects] = useState<any[]>([])
  const [chapters, setChapters] = useState<any[]>([])

  useEffect(() => {
    fetchCourses()
  }, [])

  useEffect(() => {
    if (course) {
      fetchSubjects()
      setSubject("")
      setChapter("")
    }
  }, [course])

  useEffect(() => {
    if (course && subject) {
      fetchChapters()
      setChapter("")
    }
  }, [subject])

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

  const fetchChapters = async () => {
    const { data, error } = await supabase
      .from("chapters")
      .select("*")
      .eq("course", course)
      .eq("subject", subject)

    if (error) {
      console.log(error)
    } else {
      setChapters(data || [])
    }
  }

  const handleSave = async () => {
    if (
      !course ||
      !subject ||
      !chapter ||
      !lectureNo ||
      !title ||
      !videoUrl
    ) {
      alert("Please fill required fields 😭")
      return
    }

    const finalTitle = `Lecture ${lectureNo} - ${title}`

    const { error } = await supabase
      .from("lectures")
      .insert([
        {
          course,
          subject,
          chapter,
          title: finalTitle,
          video_url: videoUrl,
          pdf_url: pdfUrl,
          thumbnail,
        },
      ])

    if (error) {
      console.log(error)
      alert("Error saving lecture 😭")
    } else {
      alert("Lecture Saved 😎🔥")

      setCourse("")
      setSubject("")
      setChapter("")
      setLectureNo("")
      setTitle("")
      setVideoUrl("")
      setPdfUrl("")
      setThumbnail("")
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-4 max-w-md mx-auto relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-600 blur-[120px] opacity-10 rounded-full"></div>

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
            Add Lecture
          </h1>

          <p className="text-zinc-400 text-sm mt-1">
            Add lecture inside chapter
          </p>
        </div>

      </div>

      {/* Form Card */}
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 rounded-3xl p-5 shadow-lg space-y-5">

        {/* Course */}
        <select
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="w-full bg-black border border-zinc-700 rounded-2xl p-4 outline-none text-white"
        >
          <option value="">📚 Select Course</option>

          {courses.map((item) => (
            <option key={item.id} value={item.title}>
              {item.title}
            </option>
          ))}
        </select>

        {/* Subject */}
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full bg-black border border-zinc-700 rounded-2xl p-4 outline-none text-white"
        >
          <option value="">📘 Select Subject</option>

          {subjects.map((item) => (
            <option key={item.id} value={item.subject}>
              {item.subject}
            </option>
          ))}
        </select>

        {/* Chapter */}
        <select
          value={chapter}
          onChange={(e) => setChapter(e.target.value)}
          className="w-full bg-black border border-zinc-700 rounded-2xl p-4 outline-none text-white"
        >
          <option value="">📖 Select Chapter</option>

          {chapters.map((item) => (
            <option key={item.id} value={item.chapter}>
              {item.chapter}
            </option>
          ))}
        </select>

        {/* Lecture No */}
        <input
          type="number"
          placeholder="🎥 Lecture Number (1,2,3...)"
          value={lectureNo}
          onChange={(e) => setLectureNo(e.target.value)}
          className="w-full bg-black border border-zinc-700 rounded-2xl p-4 outline-none text-white"
        />

        {/* Lecture Title */}
        <input
          type="text"
          placeholder="📝 Lecture Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-black border border-zinc-700 rounded-2xl p-4 outline-none text-white"
        />

        {/* Video URL */}
        <input
          type="text"
          placeholder="▶ Video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="w-full bg-black border border-zinc-700 rounded-2xl p-4 outline-none text-white"
        />

        {/* PDF URL */}
        <input
          type="text"
          placeholder="📄 PDF URL (optional)"
          value={pdfUrl}
          onChange={(e) => setPdfUrl(e.target.value)}
          className="w-full bg-black border border-zinc-700 rounded-2xl p-4 outline-none text-white"
        />

        {/* Thumbnail */}
        <input
          type="text"
          placeholder="🖼 Thumbnail URL (optional)"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          className="w-full bg-black border border-zinc-700 rounded-2xl p-4 outline-none text-white"
        />

        {/* Thumbnail Preview */}
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
          Save Lecture 😈🔥
        </button>

      </div>

      {/* Footer */}
      <p className="text-center text-zinc-500 text-xs mt-8">
        RJ Academy • Premium Admin Lecture Panel
      </p>

    </main>
  )
}