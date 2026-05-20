"use client"

import { useRouter } from "next/navigation"

export default function DeveloperPage() {

  const router = useRouter()

  return (
    <main className="min-h-screen bg-black text-white p-4">

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">

        <button
          onClick={() => router.back()}
          className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl"
        >
          ←
        </button>

        <h1 className="text-3xl font-bold text-purple-400">
          Developer Info
        </h1>

      </div>

      {/* Developer Card */}
      <div className="bg-zinc-900 border border-purple-500 rounded-3xl p-6 text-center shadow-[0_0_25px_#a855f7]">

        <div className="w-24 h-24 mx-auto rounded-full bg-purple-600 flex items-center justify-center text-3xl font-bold shadow-[0_0_25px_#a855f7]">
          RJ
        </div>

        <h1 className="text-3xl font-bold mt-4 text-white">
          Rajendra Jakhar
        </h1>

        <p className="text-purple-400 mt-2 font-semibold">
          Founder of RJ Academy
        </p>

        <p className="text-zinc-400 mt-4">
          Full Stack Developer • AI Builder
        </p>

        <p className="text-zinc-500 mt-2 text-sm">
          Building premium learning systems for serious students.
        </p>

        <p className="text-red-400 mt-5 font-bold italic">
          “Code. Build. Dominate. 💀😈”
        </p>

      </div>

    </main>
  )
}