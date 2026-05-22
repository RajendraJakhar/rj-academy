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

              {/* Profile Image */}
              <div className="relative w-16 h-16 flex-shrink-0">

                <div className="absolute inset-0 rounded-full bg-purple-600 blur-xl opacity-30"></div>

                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-purple-200 shadow-[0_0_1px_#a855f7]">

                  <img
                    src="/images/profile.jpg"
                    alt="Rajendra Profile"
                    className="w-full h-full object-cover"
                  />

                </div>

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
              <button className="w-full mt-4 bg-zinc-900 hover:bg-zinc-800 transition-all py-4 rounded-2xl font-bold text-lg">
                View Developer Profile
              </button>
            </Link>

          </div>

          {/* Menu */}
          <div className="flex-1 px-4 py-4">

            <div className="space-y-1">

              {/* WhatsApp */}
              <Link
                href="https://whatsapp.com/channel/0029VbDYZFFAjPXOkyYSID3K"
                target="_blank"
                onClick={onClose}
              >
                <button className="w-full flex items-center gap-2 px-4 py-4 rounded-2xl hover:bg-zinc-900 transition-all text-green-500 text-lg font-medium">
                <span className="text-2xl w-8 text-center">💬</span>
                <span>WhatsApp Group</span>
                </button>
              </Link>
             
              {/* Report */}
              <Link href="/report" onClick={onClose}>
                <button className="w-full flex items-center gap-2 px-4 py-4 rounded-2xl hover:bg-zinc-900 transition-all text-red-400 text-lg font-medium">
                <span className="text-2xl w-8 text-center">🚨</span>
                <span>Report Problem</span>
              </button>
              </Link>

              {/* Admin */}
              <Link href="/admin" onClick={onClose}>
                <button className="w-full flex items-center gap-2 px-3 py-3 rounded-2xl hover:bg-zinc-900 transition-all text-blue-400 text-lg font-medium">
                  <span className="text-2xl w-8 text-center">👑</span>
                  <span>Admin Panel</span>
                </button>
              </Link>

              {/* Developer */}
              <Link href="/developer" onClick={onClose}>
                <button className="w-full flex items-center gap-2 px-3 py-3 rounded-2xl hover:bg-zinc-900 transition-all text-purple-400 text-lg font-medium">
                  <span className="text-2xl w-8 text-center">💀</span>
                  <span>Developer Info</span>
                </button>
              </Link>

            </div>

          </div>

          {/* Footer */}
          <div className="p-3 border-t border-zinc-800">

            <button
              onClick={handleLogout}
              className="px-17 mx-auto block bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90 transition-all py-3.5 rounded-2xl font-bold text-lg shadow-lg"
            >
              <span >Logout</span>
            </button>

            <div className="mt-6 text-center">
              <div className="inline-block px-5 py-3 rounded-2xl bg-gradient-to-r from-zinc-900 to-black border border-zinc-800 shadow-xl">

                <p className="text-xs text-gray-400 tracking-widest uppercase">
                Team RJ Academy
                </p>

                <p className="text-sm font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mt-1">
                 Rajendra Jakhar ✦ Piyush Chouhan
                </p>

              </div>
            </div>
            
          </div>

        </div>

      </div>
    </>
  )
}