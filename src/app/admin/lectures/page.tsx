"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function AdminLecturesPage() {

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

  const fetchChapters = async () => {
    const { data, error } = await supabase
      .from("chapters")
      .select("*")
      .eq("course", course)
      .eq("subject", subject)

    if (error) {
      console.log(error)
    } else {
      setChapters(data)
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
    <main className="min-h-screen bg-black text-white p-4">

      <h1 className="text-4xl font-bold text-purple-400">
        Add Lecture
      </h1>

      <p className="text-zinc-400 mt-2">
        Add lecture inside chapter
      </p>

      <div className="mt-10 space-y-5">

        {/* Course */}
        <select
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4"
        >
          <option value="">Select Course</option>

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
          className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4"
        >
          <option value="">Select Subject</option>

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
          className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4"
        >
          <option value="">Select Chapter</option>

          {chapters.map((item) => (
            <option key={item.id} value={item.chapter}>
              {item.chapter}
            </option>
          ))}
        </select>

        {/* Lecture No */}
        <input
          type="number"
          placeholder="Lecture Number (1,2,3...)"
          value={lectureNo}
          onChange={(e) => setLectureNo(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4"
        />

        {/* Lecture Title */}
        <input
          type="text"
          placeholder="Lecture Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4"
        />

        {/* Video URL */}
        <input
          type="text"
          placeholder="Video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4"
        />

        {/* PDF URL */}
        <input
          type="text"
          placeholder="PDF URL (optional)"
          value={pdfUrl}
          onChange={(e) => setPdfUrl(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4"
        />

        {/* Thumbnail */}
        <input
          type="text"
          placeholder="Thumbnail URL (optional)"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4"
        />

        {/* Preview */}
        {thumbnail && (
          <img
            src={thumbnail}
            alt="preview"
            className="w-full h-56 object-cover rounded-3xl"
          />
        )}

        {/* Save */}
        <button
          onClick={handleSave}
          className="w-full bg-purple-600 hover:bg-purple-700 p-4 rounded-2xl font-bold"
        >
          Save Lecture
        </button>

      </div>

    </main>
  )
}