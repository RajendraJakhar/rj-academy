"use client"

import { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"

function PlayerContent() {

  const router = useRouter()
  const searchParams = useSearchParams()

  const videoUrl = searchParams.get("video")

  // CONVERT LINKS
  const getEmbedUrl = (url: string) => {

    if (!url) return ""

    /* GOOGLE DRIVE */
    if (url.includes("drive.google.com")) {

      const match = url.match(/\/d\/(.*?)\//)

      if (match && match[1]) {

        return `https://drive.google.com/file/d/${match[1]}/preview`

      }

    }

    /* YOUTUBE WATCH */
    if (url.includes("youtube.com/watch?v=")) {

      const match = url.match(/v=([^&]+)/)

      if (match && match[1]) {

        return `https://www.youtube.com/embed/${match[1]}`

      }

    }

    /* YOUTUBE LIVE */
    if (url.includes("youtube.com/live/")) {

      const match = url.match(/live\/([^?&]+)/)

      if (match && match[1]) {

        return `https://www.youtube.com/embed/${match[1]}`

      }

    }

    /* SHORT LINK */
    if (url.includes("youtu.be/")) {

      const match = url.match(/youtu\.be\/([^?&]+)/)

      if (match && match[1]) {

        return `https://www.youtube.com/embed/${match[1]}`

      }

    }

    return url

  }

  return (

    <main className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-black"></div>

      {/* GLOW */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-purple-600 blur-[150px] opacity-20 rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-blue-600 blur-[150px] opacity-20 rounded-full"></div>

      <div className="relative z-10 px-4 pb-20">

        {/* HEADER */}
        <div className="sticky top-0 z-50 bg-black/70 backdrop-blur-xl border-b border-purple-500/20">

          <div className="max-w-7xl mx-auto py-4 flex items-center gap-4">

            {/* BACK */}
            <button
              onClick={() => router.back()}
              className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-700 hover:border-purple-500 transition-all text-2xl"
            >
              ←
            </button>

            {/* TITLE */}
            <div className="flex-1">

              <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                PLAYER
              </h1>

              <p className="text-zinc-400 text-xs md:text-sm tracking-[5px] uppercase mt-1">
                Premium HD Streaming
              </p>

            </div>

            {/* LOGO */}
            <img
              src="/images/logo.png"
              alt="logo"
              className="w-14 h-14 object-contain"
            />

          </div>

        </div>

        {/* PLAYER */}
        <div className="max-w-6xl mx-auto mt-8">

          <div className="relative overflow-hidden rounded-[35px] border border-zinc-800 bg-gradient-to-br from-zinc-900 to-black shadow-[0_0_40px_rgba(168,85,247,0.15)]">

            {/* PLAYER BG */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-500/10"></div>

            {/* VIDEO */}
            <div className="relative aspect-video">

              {videoUrl ? (

                <iframe
                  src={getEmbedUrl(decodeURIComponent(videoUrl))}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />

              ) : (

                <div className="w-full h-full flex items-center justify-center text-zinc-400 text-xl">

                  No video found 😭

                </div>

              )}

            </div>

          </div>

          {/* INFO CARD */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* QUALITY */}
            <div className="rounded-[28px] border border-zinc-800 bg-gradient-to-br from-zinc-900 to-black p-6">

              <div className="text-4xl">
                🎥
              </div>

              <h2 className="text-2xl font-black mt-5">
                HD Quality
              </h2>

              <p className="text-zinc-400 mt-2 text-sm">
                Premium smooth streaming experience.
              </p>

            </div>

            {/* ACCESS */}
            <div className="rounded-[28px] border border-zinc-800 bg-gradient-to-br from-zinc-900 to-black p-6">

              <div className="text-4xl">
                🔐
              </div>

              <h2 className="text-2xl font-black mt-5">
                Secure Access
              </h2>

              <p className="text-zinc-400 mt-2 text-sm">
                Defence Era protected content system.
              </p>

            </div>

            {/* SUPPORT */}
            <div className="rounded-[28px] border border-zinc-800 bg-gradient-to-br from-zinc-900 to-black p-6">

              <div className="text-4xl">
                ⚡
              </div>

              <h2 className="text-2xl font-black mt-5">
                Fast Servers
              </h2>

              <p className="text-zinc-400 mt-2 text-sm">
                Optimized for all devices & networks.
              </p>

            </div>

          </div>

          {/* FOOTER */}
          <div className="text-center mt-16">

            <p className="text-zinc-500 text-xs tracking-[8px] uppercase">

              Defence Era Premium Platform

            </p>

          </div>

        </div>

      </div>

    </main>

  )
}

export default function PlayerPage() {

  return (

    <Suspense
      fallback={

        <div className="min-h-screen bg-black flex items-center justify-center">

          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>

        </div>

      }
    >

      <PlayerContent />

    </Suspense>

  )
}