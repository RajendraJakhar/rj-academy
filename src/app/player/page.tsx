"use client"

import { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"

function PlayerContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const videoUrl = searchParams.get("video")

  return (
    <main className="min-h-screen bg-black text-white p-4">

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="bg-zinc-900 border border-zinc-800 px-5 py-3 rounded-2xl mb-6"
      >
        ← Back
      </button>

      {/* Video Player */}
      <div className="rounded-3xl overflow-hidden border border-zinc-800">

        {videoUrl ? (
          <iframe
            src={decodeURIComponent(videoUrl)}
            className="w-full h-[500px]"
            allow="autoplay"
            allowFullScreen
          />
        ) : (
          <div className="p-10 text-center text-zinc-400">
            No video found
          </div>
        )}

      </div>

      {/* Info */}
      <div className="mt-6">
        <h1 className="text-3xl font-bold">Lecture Video</h1>
        <p className="text-zinc-400 mt-2">RJ Academy</p>
      </div>

    </main>
  )
}

export default function PlayerPage() {
  return (
    <Suspense fallback={<div className="text-white p-10">Loading...</div>}>
      <PlayerContent />
    </Suspense>
  )
}