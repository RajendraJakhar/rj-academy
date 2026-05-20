"use client"

import Link from "next/link"
import { supabase } from "@/lib/supabase"

type SidebarProps = {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({
  isOpen,
  onClose,
}: SidebarProps) {

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = "/login"
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/70 z-[998]"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[85%] max-w-[320px] bg-black border-r border-zinc-800 z-[999] transform transition-transform duration-300 ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        <div className="h-full flex flex-col">

          {/* Top Section */}
          <div className="p-6 border-b border-zinc-800">

            <div className="flex items-center gap-4">

              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center text-2xl font-bold shadow-lg">
                RJ
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">
                  Rajendra Jakhar
                </h2>

                <p className="text-zinc-400 text-sm">
                  Founder • RJ Academy
                </p>
              </div>

            </div>

            {/* Developer Button */}
            <Link href="/developer" onClick={onClose}>
              <button className="w-full mt-6 bg-zinc-900 hover:bg-zinc-800 transition-all py-4 rounded-2xl font-bold text-lg">
                View Developer Profile
              </button>
            </Link>

          </div>

          {/* Menu */}
          <div className="flex-1 px-6 py-6">

            <div className="space-y-1">

              {/* WhatsApp */}
              <button className="w-full flex items-center gap-3 px-3 py-3 rounded-2xl hover:bg-zinc-900 transition-all text-green-500 text-lg font-medium">
                <span className="text-2xl w-8 text-center">💬</span>
                <span>WhatsApp Group</span>
              </button>

              {/* Report */}
              <button className="w-full flex items-center gap-3 px-3 py-3 rounded-2xl hover:bg-zinc-900 transition-all text-red-400 text-lg font-medium">
                <span className="text-2xl w-8 text-center">🚨</span>
                <span>Report Problem</span>
              </button>

              {/* Admin */}
              <Link href="/admin" onClick={onClose}>
                <button className="w-full flex items-center gap-3 px-3 py-3 rounded-2xl hover:bg-zinc-900 transition-all text-blue-400 text-lg font-medium">
                  <span className="text-2xl w-8 text-center">👑</span>
                  <span>Admin Panel</span>
                </button>
              </Link>

              {/* Developer */}
              <Link href="/developer" onClick={onClose}>
                <button className="w-full flex items-center gap-3 px-3 py-3 rounded-2xl hover:bg-zinc-900 transition-all text-purple-400 text-lg font-medium">
                  <span className="text-2xl w-8 text-center">💀</span>
                  <span>Developer Info</span>
                </button>
              </Link>

            </div>

          </div>

          {/* Footer */}
          <div className="p-6 border-t border-zinc-800">

            <button
              onClick={handleLogout}
              className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90 transition-all py-4 rounded-2xl font-bold text-lg shadow-lg"
            >
              <span >Logout</span>
            </button>

            <p className="text-center text-zinc-500 text-sm mt-5">
              Rajendra Jakhar
            </p>

          </div>

        </div>

      </div>
    </>
  )
}