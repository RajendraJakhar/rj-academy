"use client"

import { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"

function PlayerContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const videoUrl = searchParams.get("video")

  return (
    <main className="min-h-screen bg-black text-white p-4 max-w-md mx-auto relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600 blur-[120px] opacity-10 rounded-full"></div>

      {/* Premium Header */}
      <div className="relative flex items-center gap-4 mb-8 sticky top-0 bg-black/90 backdrop-blur-md py-3 z-50">

        {/* Premium Back Button */}
        <button
          onClick={() => router.back()}
          className="w-14 h-14 flex items-center justify-center bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl text-2xl shadow-lg hover:border-purple-500 transition-all"
        >
          ←
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

      {/* Video Player */}
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-3xl overflow-hidden border border-zinc-700 shadow-lg">

        {videoUrl ? (
          <iframe
            src={decodeURIComponent(videoUrl)}
            className="w-full h-[420px]"
            allow="autoplay"
            allowFullScreen
          />
        ) : (
          <div className="p-10 text-center text-zinc-400">
            No video found 😭
          </div>
        )}

      </div>

      {/* Info Card */}
      <div className="mt-6 bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 rounded-3xl p-5 shadow-lg">

        <h1 className="text-2xl font-bold text-white">
          🎥 Lecture Video
        </h1>

        <p className="text-zinc-400 mt-2 text-sm">
          Watch premium lecture content in HD quality.
        </p>

        <div className="mt-4 flex items-center justify-between">

          <div className="bg-zinc-800 px-4 py-2 rounded-2xl text-sm text-green-400 font-bold">
            ● LIVE ACCESS
          </div>

          <