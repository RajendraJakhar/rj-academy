"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function UsersPage() {

  const router = useRouter()

  const [users, setUsers] = useState<any[]>(([]))
  const [loading, setLoading] = useState(true)

  const [totalUsers, setTotalUsers] = useState(0)
  const [activeUsers, setActiveUsers] = useState(0)
  const [blockedUsers, setBlockedUsers] = useState(0)

  useEffect(() => {
    const isAdmin = localStorage.getItem("adminAccess")
    if (isAdmin !== "true") {
      router.push("/login")
      return
    }

    fetchUsers()

  }, [])

  // FETCH USERS
  const fetchUsers = async () => {

    setLoading(true)

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {

      console.log(error)

    } else {

      setUsers(data || [])

      setTotalUsers(data?.length || 0)

      const active = data?.filter(
        (u) => u.is_blocked === false
      )

      const blocked = data?.filter(
        (u) => u.is_blocked === true
      )

      setActiveUsers(active?.length || 0)
      setBlockedUsers(blocked?.length || 0)

    }

    setLoading(false)

  }

  // BLOCK USER
  const handleBlock = async (id: number) => {

    const confirmBlock = confirm(
      "Block this user? 🚫"
    )

    if (!confirmBlock) return

    const { error } = await supabase
      .from("users")
      .update({
        is_blocked: true
      })
      .eq("id", id)

    if (error) {

      alert("Failed 😭")

    } else {

      alert("User Blocked 🚫")
      fetchUsers()

    }

  }

  // UNBLOCK USER
  const handleUnblock = async (id: number) => {

    const confirmUnblock = confirm(
      "Unblock this user? 😈"
    )

    if (!confirmUnblock) return

    const { error } = await supabase
      .from("users")
      .update({
        is_blocked: false
      })
      .eq("id", id)

    if (error) {

      alert("Failed 😭")

    } else {

      alert("User Active 😈🔥")
      fetchUsers()

    }

  }

  // DELETE USER
  const handleDelete = async (id: number) => {

    const confirmDelete = confirm(
      "Delete this user permanently? 🗑"
    )

    if (!confirmDelete) return

    const { error } = await supabase
      .from("users")
      .delete()
      .eq("id", id)

    if (error) {

      alert("Delete Failed 😭")

    } else {

      alert("User Deleted 😈")
      fetchUsers()

    }

  }

  return (

    <main className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-purple-600/20 blur-[140px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/20 blur-[140px] rounded-full"></div>

      {/* MAIN */}
      <div className="relative z-10 p-4 lg:p-8 max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">

          <div className="flex items-center gap-4">

            <button
              onClick={() => router.back()}
              className="w-14 h-14 flex items-center justify-center bg-zinc-900 border border-zinc-700 rounded-2xl text-2xl hover:border-purple-500 transition-all"
            >
              ←
            </button>

            <div>

              <h1 className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Defence Era Users
              </h1>

              <p className="text-zinc-400 mt-1">
                Premium User Management System
              </p>

            </div>

          </div>

          <button
            onClick={fetchUsers}
            className="bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-4 rounded-2xl font-bold"
          >
            🔄 Refresh
          </button>

        </div>

        {/* ANALYTICS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6 rounded-[28px] shadow-2xl">

            <p className="text-sm opacity-80">
              Total Students
            </p>

            <h2 className="text-5xl font-black mt-3">
              {totalUsers}
            </h2>

          </div>

          <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 rounded-[28px] shadow-2xl">

            <p className="text-sm opacity-80">
              Active Students
            </p>

            <h2 className="text-5xl font-black mt-3">
              {activeUsers}
            </h2>

          </div>

          <div className="bg-gradient-to-r from-red-500 to-pink-500 p-6 rounded-[28px] shadow-2xl">

            <p className="text-sm opacity-80">
              Blocked Students
            </p>

            <h2 className="text-5xl font-black mt-3">
              {blockedUsers}
            </h2>

          </div>

        </div>

        {/* USERS */}
        {loading ? (

          <div className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-10 text-center text-zinc-400">

            Loading Users...

          </div>

        ) : users.length === 0 ? (

          <div className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-10 text-center text-zinc-400">

            No Users Found 😭

          </div>

        ) : (

          <div className="grid lg:grid-cols-2 gap-5">

            {users.map((user) => (

              <div
                key={user.id}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 shadow-2xl hover:border-purple-500/40 transition-all"
              >

                {/* TOP */}
                <div className="flex items-start justify-between gap-3">

                  <div>

                    <h2 className="text-2xl font-bold">
                      {user.name}
                    </h2>

                    <p className="text-zinc-400 mt-1 break-all">
                      {user.email}
                    </p>

                  </div>

                  {user.is_blocked ? (

                    <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-2 rounded-2xl text-sm font-bold">
                      🔴 Blocked
                    </div>

                  ) : (

                    <div className="bg-green-500/20 border border-green-500 text-green-400 px-4 py-2 rounded-2xl text-sm font-bold">
                      🟢 Active
                    </div>

                  )}

                </div>

                {/* INFO */}
                <div className="mt-6 space-y-3">

                  <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-4">

                    <p className="text-zinc-400 text-sm">
                      Mobile Number
                    </p>

                    <h3 className="font-bold mt-1">
                      {user.mobile}
                    </h3>

                  </div>

                  <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-4">

                    <p className="text-zinc-400 text-sm">
                      Batch
                    </p>

                    <h3 className="font-bold mt-1">
                      {user.batch}
                    </h3>

                  </div>

                </div>

                {/* BUTTONS */}
                <div className="grid grid-cols-2 gap-4 mt-6">

                  {user.is_blocked ? (

                    <button
                      onClick={() =>
                        handleUnblock(user.id)
                      }
                      className="bg-green-600 hover:bg-green-700 transition-all p-4 rounded-2xl font-bold"
                    >
                      ✅ Unblock
                    </button>

                  ) : (

                    <button
                      onClick={() =>
                        handleBlock(user.id)
                      }
                      className="bg-yellow-500 hover:bg-yellow-600 transition-all p-4 rounded-2xl font-bold text-black"
                    >
                      🚫 Block
                    </button>

                  )}

                  <button
                    onClick={() =>
                      handleDelete(user.id)
                    }
                    className="bg-red-600 hover:bg-red-700 transition-all p-4 rounded-2xl font-bold"
                  >
                    🗑 Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

        {/* FOOTER */}
        <div className="text-center text-zinc-500 text-sm mt-10">

          Defence Era • Premium User Management

        </div>

      </div>

    </main>

  )

}