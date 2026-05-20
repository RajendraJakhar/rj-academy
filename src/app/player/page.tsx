"use client"

import { useSearchParams, useRouter } from "next/navigation"

export default function PlayerPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const videoUrl = searchParams.get("video")

  return (
    <main className="min-h-screen bg-black text-white p-4">

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">

        <button
          onClick={() => router.back()}
          className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl"
        >
          ←
        </button>

        <div>
          <h1 className="text-3xl font-bold">
            Lecture Video
          </h1>

          <p className="text-zinc-400">
            RJ Academy
          </p>
        </div>

      </div>

      {/* Google Drive / YouTube Player */}
      {videoUrl && (
        <iframe
          src={decodeURIComponent(videoUrl)}
          className="w-full aspect-video rounded-3xl"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      )}

    </main>
  )
}