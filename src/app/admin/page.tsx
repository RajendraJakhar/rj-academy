"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

export default function AdminPage() {

  const [isUnlocked, setIsUnlocked] = useState(false)
  const [adminPassword, setAdminPassword] = useState("")

  const [courses, setCourses] = useState(0)
  const [subjects, setSubjects] = useState(0)
  const [chapters, setChapters] = useState(0)
  const [lectures, setLectures] = useState(0)

  const SECRET_PASSWORD = "RJ@Admin2026"

  useEffect(() => {
    if (isUnlocked) {
      fetchStats()
    }
  }, [isUnlocked])

  const handleUnlock = () => {
    if (adminPassword === SECRET_PASSWORD) {
      setIsUnlocked(true)
    } else {
      alert("Wrong Admin Password 😭")
    }
  }

  const fetchStats = async () => {
    const { data: courseData } = await supabase
      .from("courses")
      .select("*")

    const { data: subjectData } = await supabase
      .from("subjects")
      .select("*")

    const { data: chapterData } = await supabase
      .from("chapters")
      .select("*")

    const { data: lectureData } = await supabase
      .from("lectures")
      .select("*")

    setCourses(courseData?.length || 0)
    setSubjects(subjectData?.length || 0)
    setChapters(chapterData?.length || 0)
    setLectures(lectureData?.length || 0)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = "/login"
  }

  /* PASSWORD LOCK SCREEN */
  if (!isUnlocked) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center p-4">

        <div className="w-full max-w-md bg-zinc-900 border border-purple-500 rounded-3xl p-8 text-center shadow-[0_0_25px_#a855f7]">

          <h1 className="text-4xl font-bold text-purple-400">
            🔐 Admin Lock
          </h1>

          <p className="text-zinc-400 mt-3">
            Enter Admin Secret Password
          </p>

          <input
            type="password"
            placeholder="Admin Password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            className="w-full bg-black border border-zinc-700 rounded-2xl p-4 mt-6 outline-none"
          />

          <button
            onClick={handleUnlock}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 p-4 rounded-2xl font-bold mt-5"
          >
            Unlock Admin Panel
          </button>

        </div>

      </main>
    )
  }

  /* REAL DASHBOARD */
  return (
    <main className="min-h-screen bg-black text-white p-4">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-4xl font-bold text-purple-400">
            👑 Admin Dashboard
          </h1>

          <p className="text-zinc-400 mt-2">
            RJ Academy Premium Control Panel
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-red-500 to-pink-500 px-5 py-3 rounded-2xl font-bold"
        >
          Logout
        </button>

      </div>

      {/* Analytics */}
      <div className="grid grid-cols-2 gap-4">

        <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-6 rounded-3xl">
          <h2>Courses</h2>
          <p className="text-4xl font-bold mt-2">{courses}</p>
        </div>

        <div className="bg-gradient-to-r from-pink-500 to-red-500 p-6 rounded-3xl">
          <h2>Subjects</h2>
          <p className="text-4xl font-bold mt-2">{subjects}</p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 rounded-3xl">
          <h2>Chapters</h2>
          <p className="text-4xl font-bold mt-2">{chapters}</p>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-6 rounded-3xl">
          <h2>Lectures</h2>
          <p className="text-4xl font-bold mt-2">{lectures}</p>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="mt-10 space-y-4">

        <Link href="/admin/courses">
          <button className="w-full bg-zinc-900 p-5 rounded-3xl text-left text-xl font-bold">
            📚 Add / Manage Courses
          </button>
        </Link>

        <Link href="/admin/subjects">
          <button className="w-full bg-zinc-900 p-5 rounded-3xl text-left text-xl font-bold">
            📘 Add / Manage Subjects
          </button>
        </Link>

        <Link href="/admin/chapters">
          <button className="w-full bg-zinc-900 p-5 rounded-3xl text-left text-xl font-bold">
            📖 Add / Manage Chapters
          </button>
        </Link>

        <Link href="/admin/lectures">
          <button className="w-full bg-zinc-900 p-5 rounded-3xl text-left text-xl font-bold">
            🎥 Add / Manage Lectures
          </button>
        </Link>

      </div>

    </main>
  )
}