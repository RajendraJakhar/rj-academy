"use client"

import { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"

function PlayerContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const videoUrl = searchParams.get("video")

  return (
    <main className="min-h-screen bg-black text-white p-4 max-w-md mx-auto relative overflow-hidden overflow-x-hidden w-screen">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-56 h-56 bg-purple-600 blur-[100px] opacity-10 rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-56 h-56 bg-pink-600 blur-[100px] opacity-10 rounded-full"></div>

      {/* Premium Header */}
      <div className="relative flex items-center gap-3 mb-5 sticky top-0 bg-black/90 backdrop-blur-md py-3 z-50">

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="w-12 h-12 flex items-center justify-center bg-zinc-900 border border-zinc-700 rounded-2xl text-2xl font-extrabold shadow-lg"
        >
          ⟵
        </button>

        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Lecture Player
          </h1>

          <p className="text-zinc-400 text-xs mt-1">
            RJ Academy Premium Access
          </p>
        </div>

      </div>

      {/* Premium Video Player */}
      <div className="w-full bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-3xl overflow-hidden border border-zinc-700 shadow-2xl">

        {videoUrl ? (
          <iframe
            src={decodeURIComponent(videoUrl)}
            className="w-full h-[500px] border-0"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        ) : (
          <div className="p-8 text-center text-zinc-400">
            No video found 
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
          <div className="animate-spin w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full"></div>
        </div>
      }
    >
      <PlayerContent />
    </Suspense>
  )
}