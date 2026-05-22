"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function UsersPage() {
  const router = useRouter()
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.log(error)
    } else {
      setUsers(data || [])
    }
  }

  const handleBlock = async (id: number) => {
    const confirmBlock = confirm(
      "Are you sure you want to block this user? 🚫"
    )

    if (!confirmBlock) return

    const { error } = await supabase
      .from("users")
      .update({ is_blocked: true })
      .eq("id", id)

    if (error) {
      alert("Failed 😭")
    } else {
      alert("User Blocked 🚫")
      fetchUsers()
    }
  }

  const handleUnblock = async (id: number) => {
    const confirmUnblock = confirm(
      "Are you sure you want to unblock this user? 😎🔥"
    )

    if (!confirmUnblock) return

    const { error } = await supabase
      .from("users")
      .update({ is_blocked: false })
      .eq("id", id)

    if (error) {
      alert("Failed 😭")
    } else {
      alert("User Unblocked 😎🔥")
      fetchUsers()
    }
  }

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm(
      "Vastav mai aap is user ko delete karna chahte hain? 🗑"
    )

    if (!confirmDelete) return

    const { error } = await supabase
      .from("users")
      .delete()
      .eq("id", id)

    if (error) {
      alert("Delete failed 😭")
    } else {
      alert("User Deleted 😈")
      fetchUsers()
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-4 max-w-md mx-auto relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-600 blur-[120px] opacity-10 rounded-full"></div>

      {/* Premium Header */}
      <div className="relative flex items-center gap-4 mb-8 sticky top-0 bg-black/90 backdrop-blur-md py-3 z-50">

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="w-14 h-14 flex items-center justify-center bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl text-2xl shadow-lg hover:border-purple-500 transition-all"
        >
          ←
        </button>

        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Manage Users
          </h1>

          <p className="text-zinc-400 text-sm mt-1">
            RJ Academy Premium User Control Panel
          </p>
        </div>

      </div>

      {/* Users */}
      <div className="space-y-5">

        {users.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl text-center text-zinc-400">
            No users found 😭
          </div>
        ) : (
          users.map((user) => (

            <div
              key={user.id}
              className="bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 rounded-3xl p-5 shadow-lg"
            >

              {/* User Info */}
              <div className="space-y-2 text-sm">

                <p>
                  <span className="text-purple-400 font-medium">Name:</span>{" "}
                  {user.name}
                </p>

                <p>
                  <span className="text-purple-400 font-medium">Email:</span>{" "}
                  {user.email}
                </p>

                <p>
                  <span className="text-purple-400 font-medium">Mobile:</span>{" "}
                  {user.mobile}
                </p>

                <p>
                  <span className="text-purple-400 font-medium">Batch:</span>{" "}
                  {user.batch}
                </p>

                <p>
                  <span className="text-purple-400 font-medium">Status:</span>{" "}
                  {user.is_blocked ? (
                    <span className="text-red-400 font-bold">
                      🔴 Blocked
                    </span>
                  ) : (
                    <span className="text-green-400 font-bold">
                      🟢 Active
                    </span>
                  )}
                </p>

              </div>

              {/* Buttons */}
              <div className="mt-5 grid grid-cols-2 gap-3">

                {user.is_blocked ? (
                  <button
                    onClick={() => handleUnblock(user.id)}
                    className="bg-green-600 hover:bg-green-700 p-3 rounded-2xl font-bold text-sm"
                  >
                    ✅ Unblock
                  </button>
                ) : (
                  <button
                    onClick={() => handleBlock(user.id)}
                    className="bg-yellow-500 hover:bg-yellow-600 p-3 rounded-2xl font-bold text-sm text-black"
                  >
                    🚫 Block
                  </button>
                )}

                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-600 hover:bg-red-700 p-3 rounded-2xl font-bold text-sm"
                >
                  🗑 Delete
                </button>

              </div>

            </div>

          ))
        )}

      </div>

      {/* Footer */}
      <p className="text-center text-zinc-500 text-xs mt-8">
        RJ Academy • Premium User Manager
      </p>

    </main>
  )
}