"use client"

import { useRouter } from "next/navigation"

export default function DeveloperPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-black text-white p-4 max-w-md mx-auto relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600 blur-[120px] opacity-20 rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-600 blur-[120px] opacity-20 rounded-full"></div>

      {/* Header */}
      <div className="relative flex items-center gap-4 mb-8 sticky top-0 bg-black/80 backdrop-blur-md py-3 z-50">

        <button
          onClick={() => router.back()}
          className="w-12 h-12 flex items-center justify-center
                     bg-zinc-900/90 backdrop-blur-md
                     border border-zinc-700
                     rounded-2xl
                     shadow-lg shadow-purple-500/20
                     hover:border-purple-500 hover:scale-105
                     transition-all duration-300"
          
        >
          ←
        </button>

        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Developer Profile
        </h1>

      </div>

      {/* Main Card */}
      <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-purple-500 rounded-[32px] p-6 text-center shadow-[0_0_40px_#7c3aed]">

        {/* Premium Badge */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs px-3 py-1 rounded-full font-bold shadow-lg">
          PREMIUM
        </div>

        {/* Avatar */}
        <div className="relative w-32 h-32 mx-auto mt-4">

          <div className="absolute inset-0 rounded-full bg-purple-600 blur-2xl opacity-40 animate-pulse"></div>

          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-zinc-900 shadow-[0_0_35px_#a855f7]">

          <img
            src="/images/profile.jpg"
            alt="Rajendra Profile"
            className="w-full h-full object-cover"
         />

          </div>

        </div>
       

        {/* Name */}
        <h1 className="text-4xl font-extrabold mt-6 text-white tracking-wide">
          Rajendra Jakhar
        </h1>

        {/* Role */}
        <p className="text-purple-400 mt-3 font-semibold text-sm leading-6">
          Founder • RJ Academy <br />
          Managed by Rajendra Jakhar & Piyush Chouhan
        </p>

        {/* Role Badge */}
        <div className="mt-5 inline-block bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-2 rounded-full text-sm font-bold shadow-lg">
          Full Stack Developer • AI Builder
        </div>

        {/* Description */}
        <p className="text-zinc-300 mt-6 leading-7 text-sm px-2">
          Building premium learning systems for serious students with
          automation, AI tools, modern education platforms and smart digital
          experiences.
        </p>

        {/* Quote Card */}
        <div className="mt-6 bg-black/40 border border-zinc-700 rounded-2xl p-4 shadow-inner">
          <p className="text-red-400 font-bold italic text-sm">
            “Code. Build. Dominate. 💀😈”
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mt-6">

          <div className="bg-zinc-800/70 border border-zinc-700 p-4 rounded-2xl shadow-lg">
            <p className="text-zinc-400 text-xs">Experience</p>
            <p className="text-xl font-bold text-purple-400 mt-1">
              Full Stack
            </p>
          </div>

          <div className="bg-zinc-800/70 border border-zinc-700 p-4 rounded-2xl shadow-lg">
            <p className="text-zinc-400 text-xs">Speciality</p>
            <p className="text-xl font-bold text-blue-400 mt-1">
              AI Systems
            </p>
          </div>

          <div className="bg-zinc-800/70 border border-zinc-700 p-4 rounded-2xl shadow-lg">
            <p className="text-zinc-400 text-xs">Projects</p>
            <p className="text-xl font-bold text-green-400 mt-1">
              Premium LMS
            </p>
          </div>

          <div className="bg-zinc-800/70 border border-zinc-700 p-4 rounded-2xl shadow-lg">
            <p className="text-zinc-400 text-xs">Mission</p>
            <p className="text-xl font-bold text-yellow-400 mt-1">
              Dominate 🚀
            </p>
          </div>

        </div>

        {/* Contact Card */}
        <div className="mt-6 bg-gradient-to-r from-zinc-800 to-zinc-900 border border-zinc-700 rounded-2xl p-4 shadow-lg">
          <p className="text-zinc-400 text-xs">Official Contact</p>
          <p className="text-lg font-bold text-white mt-1 break-all">
            rajendrajakharyt@gmail.com
          </p>
        </div>

      </div>

      {/* Footer */}
      <p className="text-center text-zinc-500 text-xs mt-8">
        RJ Academy • Premium Developer Profile
      </p>

    </main>
  )
}