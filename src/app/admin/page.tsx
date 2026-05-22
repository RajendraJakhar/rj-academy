"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function AdminPage() {
  const router = useRouter()
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [adminPassword, setAdminPassword] = useState("")

  const [courses, setCourses] = useState(0)
  const [subjects, setSubjects] = useState(0)
  const [chapters, setChapters] = useState(0)
  const [lectures, setLectures] = useState(0)

  const [requests, setRequests] = useState<any[]>([])

  const SECRET_PASSWORD = "RJ@Admin2026"

  useEffect(() => {
    const unlocked = localStorage.getItem("adminUnlocked")

    if (unlocked === "true") {
      setIsUnlocked(true)
    }
    if (isUnlocked) {
      fetchStats()
      fetchRequests()
    }
  }, [isUnlocked])

  const handleUnlock = () => {
    if (adminPassword === SECRET_PASSWORD) {
      localStorage.setItem("adminUnlocked", "true")
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

  const fetchRequests = async () => {
    const { data, error } = await supabase
      .from("access_requests")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.log(error)
    } else {
      setRequests(data || [])
    }
  }
  const handleApprove = async (item: any) => {
  const { error } = await supabase
    .from("users")
    .insert([
      {
        name: item.name,
        email: item.email,
        mobile: item.mobile,
        batch: item.batch,
        is_blocked: false,
      },
    ])

  if (error) {
    alert("Approve failed 😭")
    console.log(error)
    return
  }

  await supabase
    .from("access_requests")
    .delete()
    .eq("id", item.id)

  alert("User Approved 😎🔥")
  fetchRequests()
}
  const handleDeleteRequest = async (id: number) => {
    const confirmDelete = confirm("Delete this request?")

    if (!confirmDelete) return

    const { error } = await supabase
      .from("access_requests")
      .delete()
      .eq("id", id)

    if (error) {
      alert("Delete failed 😭")
    } else {
      alert("Deleted 😎🔥")
      fetchRequests()
    }
  }

  const handleLogout = async () => {
    localStorage.removeItem("adminUnlocked")
    await supabase.auth.signOut()
    window.location.href = "/login"
  }

  /* PASSWORD LOCK SCREEN */
  if (!isUnlocked) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center p-4">

        <div className="w-full max-w-md bg-zinc-900 border border-purple-500 rounded-3xl p-15 text-center shadow-[0_0_10px_#a855f7]">

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
    <main className="min-h-screen bg-black text-white p-4 max-w-md mx-auto">
    
    {/* Premium Header */}
    <div className="relative flex items-center gap-4 mb-8 sticky top-0 bg-black/90 backdrop-blur-md py-3 z-50">

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="w-14 h-14 flex items-center justify-center bg-zinc-900 border border-zinc-700 rounded-2xl text-3xl font-extrabold shadow-lg hover:border-purple-500 transition-all"
      >
        ⟵
      </button>

      <div className="flex-1">
       <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
         Admin Dashboard
       </h1>

      
      </div>

      <button
        onClick={handleLogout}
        className="bg-gradient-to-r from-red-500 to-pink-500 px-4 py-3 rounded-2xl font-bold text-sm"
      >
       Logout
      </button>

    </div>

      {/* Analytics */}
      <div className="grid grid-cols-2 gap-4">

        <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-5 rounded-3xl">
          <h2 className="text-sm">Courses</h2>
          <p className="text-3xl font-bold mt-2">{courses}</p>
        </div>

        <div className="bg-gradient-to-r from-pink-500 to-red-500 p-5 rounded-3xl">
          <h2 className="text-sm">Subjects</h2>
          <p className="text-3xl font-bold mt-2">{subjects}</p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-5 rounded-3xl">
          <h2 className="text-sm">Chapters</h2>
          <p className="text-3xl font-bold mt-2">{chapters}</p>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-5 rounded-3xl">
          <h2 className="text-sm">Lectures</h2>
          <p className="text-3xl font-bold mt-2">{lectures}</p>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="mt-10">

        <h2 className="text-2xl font-bold text-purple-400 mb-6">
          ⚡ Quick Actions
        </h2>

          <Link href="/admin/courses" className="block mb-4">
            <button className="w-full bg-zinc-900 hover:border-purple-500 border border-zinc-800 transition-all p-4 rounded-3xl text-left font-bold shadow-lg">
              📚 Add / Manage Courses
            </button>
          </Link>

          <Link href="/admin/subjects" className="block mb-4">
            <button className="w-full bg-zinc-900 hover:border-blue-500 border border-zinc-800 transition-all p-4 rounded-3xl text-left font-bold shadow-lg">
              📘 Add / Manage Subjects
            </button>
          </Link>

          <Link href="/admin/chapters" className="block mb-4">
            <button className="w-full bg-zinc-900 hover:border-green-500 border border-zinc-800 transition-all p-4 rounded-3xl text-left font-bold shadow-lg">
              📖 Add / Manage Chapters
            </button>
          </Link>

          <Link href="/admin/lectures" className="block mb-4">
            <button className="w-full bg-zinc-900 hover:border-yellow-500 border border-zinc-800 transition-all p-4 rounded-3xl text-left font-bold shadow-lg">
              🎥 Add / Manage Lectures
            </button>
          </Link>

          <Link href="/admin/users" className="block mb-6">
            <button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 p-5 rounded-2xl font-bold text-xl mt-5">
              Manage Users
            </button>
          </Link>


      </div>

      {/* Premium Access Requests */}
      <div className="mt-10">

        <h2 className="text-2xl font-bold text-purple-400 mb-5">
          🔥 Premium Access Requests
        </h2>

        <div className="space-y-4">

          {requests.length === 0 ? (
            <div className="bg-zinc-900 p-5 rounded-3xl text-zinc-400 text-center">
              No requests yet 😭
            </div>
          ) : (
            requests.map((item) => (

              <div
                key={item.id}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5"
              >

                <p className="text-sm"><span className="text-purple-400">👤 Name:</span> {item.name}</p>
                <p className="text-sm mt-1"><span className="text-purple-400">📧 Email:</span> {item.email}</p>
                <p className="text-sm mt-1"><span className="text-purple-400">📱 Mobile:</span> {item.mobile}</p>
                <p className="text-sm mt-1"><span className="text-purple-400">🎓 Batch:</span> {item.batch}</p>
                <p className="text-sm mt-1"><span className="text-purple-400">🔑 Password:</span> {item.password}</p>
                <p className="text-sm mt-1"><span className="text-purple-400">💬 Message:</span> {item.message}</p>
                <p className="text-sm mt-1"><span className="text-purple-400">🕒 Time:</span> {item.created_at}</p>
                
                <button
                  onClick={() => handleApprove(item)}
                  className="w-full mt-4 bg-green-600 hover:bg-green-700 p-3 rounded-2xl font-bold"
>
                  ✅ Approve User
                </button>
                <button
                  onClick={() => handleDeleteRequest(item.id)}
                  className="w-full mt-4 bg-red-600 hover:bg-red-700 p-3 rounded-2xl font-bold"
                >
                  🗑 Delete Request
                </button>

              </div>

            ))
          )}

        </div>

      </div>

    </main>
  )
}