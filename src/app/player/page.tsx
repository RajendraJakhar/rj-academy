"use client"

import { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"

function PlayerContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const videoUrl = searchParams.get("video")

  return (
    <main className="min-h-screen bg-black text-white p-4 relative overflow-hidden w-full">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600 blur-[120px] opacity-10 rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-600 blur-[120px] opacity-10 rounded-full"></div>

      {/* Premium Header */}
      <div className="relative flex items-center gap-4 mb-8 sticky top-0 bg-black/90 backdrop-blur-md py-3 z-50">

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="w-14 h-14 flex items-center justify-center bg-zinc-900 border border-zinc-700 rounded-2xl text-3xl font-extrabold shadow-lg hover:border-purple-500 transition-all"
        >
          ⟵
        </button>

        {/* Title */}
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Lecture Player
          </h1>

          <p className="text-zinc-400 text-sm mt-1">
            RJ Academy Premium Access
          </p>
        </div>

      </div>

      {/* Premium Video Player */}
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-3xl overflow-hidden border border-zinc-700 shadow-2xl">

        {videoUrl ? (
          <iframe
            src={decodeURIComponent(videoUrl)}
            className="w-full aspect-video border-0"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        ) : (
          <div className="p-10 text-center text-zinc-400">
            No video found 😭
          </div>
        )}

      </div>

    </main>
  )
}

export default function PlayerPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"></div>
        </div>
      }
    >
      <PlayerContent />
    </Suspense>
  )
}