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
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[998]"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[85%] sm:w-[380px] md:w-[400px] lg:w-[420px] max-w-[420px] bg-[#050505] border-r border-purple-500/20 z-[999] transform transition-all duration-500 overflow-y-auto ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        {/* Background Glow */}
        <div className="absolute top-0 left-0 w-56 h-56 sm:w-72 sm:h-72 bg-purple-600 blur-[100px] sm:blur-[120px] opacity-20 rounded-full"></div>

        <div className="relative h-full flex flex-col">

          {/* Top */}
          <div className="p-4 sm:p-6 border-b border-zinc-800">

            {/* Close Button */}
            <div className="flex justify-end">

              <button
                onClick={onClose}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-zinc-900 border border-zinc-700 text-white text-xl sm:text-2xl hover:border-purple-500 transition-all"
              >
                ✕
              </button>

            </div>

            {/* Logo */}
            <div className="flex flex-col items-center text-center mt-1 sm:mt-2">

              <div className="relative">

                <div className="absolute inset-0 bg-purple-600 blur-2xl sm:blur-3xl opacity-30 rounded-full"></div>

                <img
                  src="/images/logo.png"
                  alt="Defence Era"
                  className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain"
                />

              </div>

              <h1 className="mt-3 sm:mt-4 text-2xl sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-yellow-300 via-white to-yellow-500 bg-clip-text text-transparent">
                DEFENCE ERA
              </h1>

              <p className="text-zinc-400 text-[10px] sm:text-xs mt-2 tracking-[3px] sm:tracking-[5px] uppercase">
                Dream • Prepare • Achieve
              </p>

            </div>

          </div>

          {/* Menu */}
          <div className="flex-1 px-4 sm:px-5 py-6 sm:py-8 pb-8 sm:pb-10">

            <div className="flex flex-col gap-4 sm:gap-6">

              {/* Support */}
              <Link href="/support" onClick={onClose}>

                <button className="w-full flex items-center gap-3 sm:gap-4 bg-gradient-to-r from-pink-950/40 to-zinc-950 hover:border-pink-500 border border-pink-500/30 transition-all px-4 sm:px-5 py-4 sm:py-5 rounded-[24px] sm:rounded-[28px] text-pink-400 shadow-[0_0_20px_rgba(255,0,80,0.15)]">

                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-black flex items-center justify-center text-2xl sm:text-3xl shrink-0">
                    ❤️
                  </div>

                  <div className="text-left">
                    <p className="text-base sm:text-lg font-bold">
                      Support Defence Era
                    </p>

                    <p className="text-[11px] sm:text-xs text-zinc-500 mt-1">
                      Help Keep Education Free
                    </p>
                  </div>

                </button>

              </Link>

              {/* WhatsApp */}
              <Link
                href="https://whatsapp.com/channel/0029VbDYZFFAjPXOkyYSID3K"
                target="_blank"
                onClick={onClose}
              >

                <button className="w-full flex items-center gap-3 sm:gap-4 bg-gradient-to-r from-zinc-900 to-zinc-950 hover:border-green-500 border border-zinc-800 transition-all px-4 sm:px-5 py-4 sm:py-5 rounded-[24px] sm:rounded-[28px] text-green-400 shadow-xl">

                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-black flex items-center justify-center text-2xl sm:text-3xl shrink-0">
                    💬
                  </div>

                  <div className="text-left">
                    <p className="text-base sm:text-lg font-bold">
                      WhatsApp Channel
                    </p>

                    <p className="text-[11px] sm:text-xs text-zinc-500 mt-1">
                      Daily Updates & Notes
                    </p>
                  </div>

                </button>

              </Link>

              {/* Report */}
              <Link href="/report" onClick={onClose}>

                <button className="w-full flex items-center gap-3 sm:gap-4 bg-gradient-to-r from-zinc-900 to-zinc-950 hover:border-red-500 border border-zinc-800 transition-all px-4 sm:px-5 py-4 sm:py-5 rounded-[24px] sm:rounded-[28px] text-red-400 shadow-xl">

                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-black flex items-center justify-center text-2xl sm:text-3xl shrink-0">
                    🚨
                  </div>

                  <div className="text-left">
                    <p className="text-base sm:text-lg font-bold">
                      Report Problem
                    </p>

                    <p className="text-[11px] sm:text-xs text-zinc-500 mt-1">
                      Technical Issue Support
                    </p>
                  </div>

                </button>

              </Link>

              {/* Admin */}
              <Link href="/admin" onClick={onClose}>

                <button className="w-full flex items-center gap-3 sm:gap-4 bg-gradient-to-r from-zinc-900 to-zinc-950 hover:border-blue-500 border border-zinc-800 transition-all px-4 sm:px-5 py-4 sm:py-5 rounded-[24px] sm:rounded-[28px] text-blue-400 shadow-xl">

                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-black flex items-center justify-center text-2xl sm:text-3xl shrink-0">
                    👑
                  </div>

                  <div className="text-left">
                    <p className="text-base sm:text-lg font-bold">
                      Admin Panel
                    </p>

                    <p className="text-[11px] sm:text-xs text-zinc-500 mt-1">
                      Manage Defence Era
                    </p>
                  </div>

                </button>

              </Link>

              {/* Developer */}
              <Link href="/developer" onClick={onClose}>

                <button className="w-full flex items-center gap-3 sm:gap-4 bg-gradient-to-r from-zinc-900 to-zinc-950 hover:border-purple-500 border border-zinc-800 transition-all px-4 sm:px-5 py-4 sm:py-5 rounded-[24px] sm:rounded-[28px] text-purple-400 shadow-xl">

                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-black flex items-center justify-center text-2xl sm:text-3xl shrink-0">
                    💀
                  </div>

                  <div className="text-left">
                    <p className="text-base sm:text-lg font-bold">
                      Developer Info
                    </p>

                    <p className="text-[11px] sm:text-xs text-zinc-500 mt-1">
                      About Platform
                    </p>
                  </div>

                </button>

              </Link>

            </div>

          </div>

          {/* Footer */}
          <div className="p-4 sm:p-5 border-t border-zinc-800 bg-black">

            <button
              onClick={handleLogout}
              className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90 transition-all py-3 sm:py-4 rounded-2xl sm:rounded-3xl font-bold text-base sm:text-lg shadow-[0_0_20px_rgba(255,0,80,0.3)]"
            >
              Logout
            </button>

            <div className="mt-4 sm:mt-6 text-center">

              <div className="rounded-2xl sm:rounded-3xl bg-zinc-900 border border-zinc-800 p-3 sm:p-4">

                <p className="text-[10px] sm:text-xs text-zinc-500 tracking-[3px] sm:tracking-[4px] uppercase">
                  Defence Era
                </p>

                <p className="mt-2 text-xs sm:text-sm font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
                  Dream • Prepare • Achieve
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  )
}