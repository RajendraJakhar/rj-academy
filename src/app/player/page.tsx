"use client"

import { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"

function PlayerContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const videoUrl = searchParams.get("video")

  const getEmbedUrl = (url: string) => {
    if (!url) return ""

    /* Google Drive */
    if (url.includes("drive.google.com")) {
      const match = url.match(/\/d\/(.*?)\//)
      if (match && match[1]) {
        return `https://drive.google.com/file/d/${match[1]}/preview`
      }
    }

    /* YouTube watch link */
    if (url.includes("youtube.com/watch?v=")) {
      const match = url.match(/v=([^&]+)/)
      if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}`
      }
    }

    /* YouTube live link */
    if (url.includes("youtube.com/live/")) {
      const match = url.match(/live\/([^?&]+)/)
      if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}`
      }
    }

    /* youtu.be short link */
    if (url.includes("youtu.be/")) {
      const match = url.match(/youtu\.be\/([^?&]+)/)
      if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}`
      }
    }

    return url
  }

  return (
    <main className="min-h-screen bg-black text-white p-4 max-w-md mx-auto relative overflow-hidden overflow-x-hidden w-screen">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600 blur-[120px] opacity-10 rounded-full"></div>

      {/* Premium Header */}
      <div className="relative flex items-center gap-4 mb-8 sticky top-0 bg-black/90 backdrop-blur-md py-3 z-50">

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="w-14 h-14 flex items-center justify-center bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl text-2xl shadow-lg hover:border-purple-500 transition-all"
        >
          ←
        </button>

        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Lecture Player
          </h1>

          <p className="text-zinc-400 text-sm mt-1">
            Premium HD Streaming
          </p>
        </div>

      </div>

      {/* Video Player */}
      <div className="rounded-3xl overflow-hidden border border-zinc-800 shadow-lg">

        {videoUrl ? (
          <iframe
            src={getEmbedUrl(decodeURIComponent(videoUrl))}
            className="w-full h-[500px]"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : (
          <div className="p-10 text-center text-zinc-400">
            No video found 😭
          </div>
        )}

      </div>

      {/* Footer Info */}
      <div className="mt-6 text-center">
        <h1 className="text-2xl font-bold">Lecture Video</h1>
        <p className="text-zinc-400 mt-2">RJ Academy • Premium Learning</p>
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