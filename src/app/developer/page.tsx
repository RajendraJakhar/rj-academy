"use client"

import { useRouter } from "next/navigation"

export default function DeveloperPage() {

  const router = useRouter()

  return (

    <main className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* PREMIUM BACKGROUND */}
      <div className="absolute inset-0">

        <img
          src="/images/hero.jpg"
          alt="bg"
          className="w-full h-full object-cover opacity-[0.08]"
        />

        <div className="absolute inset-0 bg-black/85"></div>

      </div>

      {/* PURPLE GLOW */}
      <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-purple-700 blur-[150px] opacity-20 rounded-full"></div>

      {/* BLUE GLOW */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-700 blur-[150px] opacity-20 rounded-full"></div>

      {/* MAIN CONTAINER */}
      <div className="relative z-10 w-full max-w-md mx-auto px-4 pt-24 pb-12">

        {/* HEADER */}
        <div className="sticky top-4 z-50 mb-10">

          <div className="bg-black/70 backdrop-blur-2xl border border-zinc-800 rounded-[32px] px-4 py-4 flex items-center gap-4 shadow-[0_0_35px_rgba(168,85,247,0.12)]">

            {/* BACK BUTTON */}
            <button
              onClick={() => router.back()}
              className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-700 hover:border-purple-500 transition-all text-2xl shadow-lg flex items-center justify-center"
            >
              ←
            </button>

            {/* TITLE */}
            <div className="flex-1">

              <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent leading-tight">

                Developer Profile

              </h1>

              <p className="text-zinc-500 text-xs tracking-[5px] uppercase mt-1">

                Defence Era System

              </p>

            </div>

          </div>

        </div>

        {/* MAIN PREMIUM CARD */}
        <div className="relative overflow-hidden bg-black/40 backdrop-blur-2xl border border-purple-500/20 rounded-[42px] p-7 text-center shadow-[0_0_90px_rgba(168,85,247,0.18)]">

          {/* CARD BACKGROUND */}
          <img
            src="/images/hero.jpg"
            alt="bg"
            className="absolute inset-0 w-full h-full object-cover opacity-[0.06]"
          />

          <div className="absolute inset-0 bg-black/82"></div>

          {/* CONTENT */}
          <div className="relative z-10">

            {/* SECRET BADGE */}
            <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-[11px] px-5 py-2 rounded-full font-black tracking-[3px] shadow-lg">

              SECRET

            </div>

            {/* PROFILE IMAGE */}
            <div className="relative w-36 h-36 mx-auto mt-5">

              {/* OUTER GLOW */}
              <div className="absolute inset-0 rounded-full bg-purple-600 blur-3xl opacity-60 animate-pulse"></div>

              {/* IMAGE */}
              <div className="relative w-36 h-36 rounded-full overflow-hidden border-[4px] border-zinc-900 shadow-[0_0_70px_rgba(168,85,247,0.7)]">

                <img
                  src="/images/profile.jpg"
                  alt="profile"
                  className="w-full h-full object-cover"
                />

              </div>

            </div>

            {/* NAME */}
            <h1 className="text-[52px] leading-[58px] font-black mt-10 bg-gradient-to-r from-white via-purple-300 to-blue-400 bg-clip-text text-transparent tracking-wide">

              PAGAL
              <br />
              IITIAN ⚡

            </h1>

            {/* SUBTITLE */}
            <p className="text-purple-400 mt-6 font-semibold text-sm leading-8 tracking-wide">

              Anonymous Developer • Defence Era
              <br />

              Building Digital Empires Silently 💀

            </p>

            {/* STATUS */}
            <div className="mt-6 text-green-400 text-xs tracking-[7px] uppercase font-black animate-pulse">

              ● SYSTEM ACTIVE

            </div>

            {/* ROLE BADGE */}
            <div className="mt-7 inline-block bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 px-7 py-4 rounded-full text-sm font-black shadow-[0_0_40px_rgba(168,85,247,0.45)] tracking-[1px]">

              AI Architect • Cyber Systems

            </div>

            {/* DESCRIPTION */}
            <div className="mt-10 bg-zinc-900/50 border border-zinc-800 rounded-[30px] p-6">

              <p className="text-zinc-300 leading-8 text-sm">

                Building premium AI systems,
                futuristic learning platforms,
                private digital ecosystems and
                powerful cyber experiences.

                <br />
                <br />

                Silent moves.
                Massive impact. ⚡

              </p>

            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-4 mt-8">

              {/* CARD */}
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-[28px] p-5 shadow-xl">

                <p className="text-zinc-500 text-[10px] tracking-[4px] uppercase">
                  Experience
                </p>

                <p className="text-xl font-black text-purple-400 mt-3">
                  AI Systems
                </p>

              </div>

              {/* CARD */}
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-[28px] p-5 shadow-xl">

                <p className="text-zinc-500 text-[10px] tracking-[4px] uppercase">
                  Specialty
                </p>

                <p className="text-xl font-black text-blue-400 mt-3">
                  Cyber Tech
                </p>

              </div>

              {/* CARD */}
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-[28px] p-5 shadow-xl">

                <p className="text-zinc-500 text-[10px] tracking-[4px] uppercase">
                  Projects
                </p>

                <p className="text-lg font-black text-green-400 mt-3">
                  Private Apps
                </p>

              </div>

              {/* CARD */}
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-[28px] p-5 shadow-xl">

                <p className="text-zinc-500 text-[10px] tracking-[4px] uppercase">
                  Mission
                </p>

                <p className="text-lg font-black text-yellow-400 mt-3">
                  Build Empire ⚡
                </p>

              </div>

            </div>

            {/* SECURE CONTACT */}
            <div className="mt-8 bg-gradient-to-r from-zinc-900 to-black border border-purple-500/20 rounded-[32px] p-6 shadow-[0_0_40px_rgba(168,85,247,0.12)]">

              <p className="text-zinc-500 text-[10px] tracking-[6px] uppercase">

                Secure Channel

              </p>

              <p className="text-lg font-black bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mt-4 break-all">

                shadowcore@protonx.dev

              </p>

            </div>

          </div>

        </div>

        {/* FOOTER */}
        <div className="text-center mt-10">

          <p className="text-zinc-600 text-[10px] tracking-[8px] uppercase">

            Defence Era • Anonymous Developer System

          </p>

        </div>

      </div>

    </main>

  )
}