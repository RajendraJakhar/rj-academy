"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function AdminPage() {

  const router = useRouter()

  const [isUnlocked, setIsUnlocked] = useState(false)
  const [adminPassword, setAdminPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const [courses, setCourses] = useState(0)
  const [subjects, setSubjects] = useState(0)
  const [chapters, setChapters] = useState(0)
  const [lectures, setLectures] = useState(0)

  const [totalUsers, setTotalUsers] = useState(0)
  const [activeUsers, setActiveUsers] = useState(0)
  const [blockedUsers, setBlockedUsers] = useState(0)

  // ✅ ADMIN PASSWORD
  const SECRET_PASSWORD = "RJ@Admin2026"

  // ✅ ADMIN EMAILS
  const ADMIN_EMAILS = [
    "rajendrajakhar1322@gmail.com",
    "rajendrajakharyt@gmail.com",
    "cricketnews1322@gmail.com",
  ]

  useEffect(() => {

    const unlocked =
      localStorage.getItem("adminAccess")

    if (unlocked === "true") {

      setIsUnlocked(true)

      fetchStats()

    }

  }, [])

  // ✅ FETCH STATS
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

    const { data: usersData } = await supabase
      .from("users")
      .select("*")

    setCourses(courseData?.length || 0)
    setSubjects(subjectData?.length || 0)
    setChapters(chapterData?.length || 0)
    setLectures(lectureData?.length || 0)

    setTotalUsers(usersData?.length || 0)

    const active = usersData?.filter(
      (u) => u.is_blocked === false
    )

    const blocked = usersData?.filter(
      (u) => u.is_blocked === true
    )

    setActiveUsers(active?.length || 0)
    setBlockedUsers(blocked?.length || 0)

  }

  // ✅ SECURE ADMIN UNLOCK
  const handleUnlock = async () => {

    setLoading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    // ❌ NOT LOGGED IN
    if (!user) {

      alert("Login Required 😭")
      router.push("/login")

      setLoading(false)
      return

    }

    // ❌ WRONG PASSWORD
    if (adminPassword !== SECRET_PASSWORD) {

      alert("Wrong Password 😭")

      setLoading(false)
      return

    }

    // ❌ NOT ADMIN EMAIL
    if (!ADMIN_EMAILS.includes(user.email || "")) {

      alert("Access Denied 🤡")

      setLoading(false)
      return

    }

    // ✅ ACCESS GRANTED
    localStorage.setItem("adminAccess", "true")

    setIsUnlocked(true)

    fetchStats()

    setLoading(false)

  }

  // ✅ LOGOUT
  const handleLogout = async () => {

    localStorage.removeItem("adminAccess")

    await supabase.auth.signOut()

    window.location.href = "/login"

  }

  // ✅ LOCK SCREEN
  if (!isUnlocked) {

    return (

      <main className="min-h-screen bg-black text-white flex items-center justify-center p-4">

        <div className="w-full max-w-md bg-zinc-900 border border-purple-500/30 rounded-[32px] p-8 shadow-2xl">

          <h1 className="text-4xl font-black text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Defence Era
          </h1>

          <p className="text-center text-zinc-400 mt-3">
            Premium Admin Access
          </p>

          <input
            type="password"
            placeholder="Enter Admin Password"
            value={adminPassword}
            onChange={(e) =>
              setAdminPassword(e.target.value)
            }
            className="w-full mt-6 bg-black border border-zinc-700 rounded-2xl p-4 outline-none"
          />

          <button
            onClick={handleUnlock}
            disabled={loading}
            className="w-full mt-5 bg-gradient-to-r from-purple-600 to-pink-500 p-4 rounded-2xl font-bold"
          >
            {loading ? "Checking..." : "Unlock Dashboard"}
          </button>

        </div>

      </main>

    )

  }

  // ✅ REAL DASHBOARD
  return (

    <main className="min-h-screen bg-black text-white p-4 lg:p-8">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between mb-8">

        <div>

          <h1 className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Defence Era Admin
          </h1>

          <p className="text-zinc-400 mt-2">
            Premium Control Dashboard
          </p>

        </div>

        <div className="flex gap-3">

          <button
            onClick={() => router.back()}
            className="bg-zinc-900 border border-zinc-700 px-5 py-3 rounded-2xl"
          >
            ← Back
          </button>

          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-pink-500 px-5 py-3 rounded-2xl font-bold"
          >
            Logout
          </button>

        </div>

      </div>

      {/* ANALYTICS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-5 rounded-3xl">
          <p className="text-sm">Courses</p>
          <h2 className="text-4xl font-black mt-2">
            {courses}
          </h2>
        </div>

        <div className="bg-gradient-to-r from-pink-500 to-red-500 p-5 rounded-3xl">
          <p className="text-sm">Subjects</p>
          <h2 className="text-4xl font-black mt-2">
            {subjects}
          </h2>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-5 rounded-3xl">
          <p className="text-sm">Chapters</p>
          <h2 className="text-4xl font-black mt-2">
            {chapters}
          </h2>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-5 rounded-3xl">
          <p className="text-sm">Lectures</p>
          <h2 className="text-4xl font-black mt-2">
            {lectures}
          </h2>
        </div>

      </div>

      {/* USER ANALYTICS */}
      <div className="grid grid-cols-3 gap-4 mt-4">

        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-5 rounded-3xl">
          <p className="text-sm">Students</p>
          <h2 className="text-3xl font-black mt-2">
            {totalUsers}
          </h2>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-5 rounded-3xl">
          <p className="text-sm">Active</p>
          <h2 className="text-3xl font-black mt-2">
            {activeUsers}
          </h2>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-pink-500 p-5 rounded-3xl">
          <p className="text-sm">Blocked</p>
          <h2 className="text-3xl font-black mt-2">
            {blockedUsers}
          </h2>
        </div>

      </div>

      {/* QUICK ACTIONS */}
      <div className="mt-10">

        <h2 className="text-2xl font-bold text-purple-400 mb-5">
          ⚡ Quick Actions
        </h2>

        <div className="grid lg:grid-cols-2 gap-4">

          <Link href="/admin/courses">
            <button className="w-full bg-zinc-900 border border-zinc-800 hover:border-purple-500 p-5 rounded-3xl text-left font-bold">
              📚 Manage Courses
            </button>
          </Link>

          <Link href="/admin/subjects">
            <button className="w-full bg-zinc-900 border border-zinc-800 hover:border-blue-500 p-5 rounded-3xl text-left font-bold">
              📘 Manage Subjects
            </button>
          </Link>

          <Link href="/admin/chapters">
            <button className="w-full bg-zinc-900 border border-zinc-800 hover:border-green-500 p-5 rounded-3xl text-left font-bold">
              📖 Manage Chapters
            </button>
          </Link>

          <Link href="/admin/lectures">
            <button className="w-full bg-zinc-900 border border-zinc-800 hover:border-yellow-500 p-5 rounded-3xl text-left font-bold">
              🎥 Manage Lectures
            </button>
          </Link>

          <Link href="/admin/users">
            <button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 p-5 rounded-3xl font-bold text-lg">
              👥 Manage Users
            </button>
          </Link>

        </div>

      </div>

    </main>

  )

}