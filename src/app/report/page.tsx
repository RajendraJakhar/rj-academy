"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function ReportPage() {

  const router = useRouter()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  // SUBMIT
  const handleSubmit = async (e: any) => {

    e.preventDefault()

    setLoading(true)

    const response = await fetch(
      "https://formspree.io/f/maqkjeyv",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      }
    )

    if (response.ok) {

      alert("Problem sent successfully 😎🔥")

      setName("")
      setEmail("")
      setMessage("")

    } else {

      alert("Failed 😭 Try again")

    }

    setLoading(false)

  }

  return (

    <main className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-black"></div>

      {/* GLOW */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-red-600 blur-[150px] opacity-20 rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-pink-600 blur-[150px] opacity-20 rounded-full"></div>

      <div className="relative z-10 px-4 py-6">

        {/* HEADER */}
        <div className="max-w-5xl mx-auto">

          <div className="sticky top-0 z-50 bg-black/70 backdrop-blur-xl border border-zinc-800 rounded-[30px] px-4 py-4 flex items-center gap-4">

            {/* BACK */}
            <button
              onClick={() => router.back()}
              className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-700 hover:border-red-500 transition-all text-2xl"
            >
              ←
            </button>

            {/* TITLE */}
            <div className="flex-1">

              <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-red-400 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                REPORT ISSUE
              </h1>

              <p className="text-zinc-400 text-xs md:text-sm tracking-[5px] uppercase mt-1">
                Defence Era Support Center
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

        {/* MAIN */}
        <div className="max-w-5xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* LEFT CARD */}
          <div className="rounded-[35px] border border-zinc-800 bg-gradient-to-br from-zinc-900 to-black p-8 overflow-hidden relative">

            {/* BG */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-pink-500/10"></div>

            <div className="relative z-10">

              <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center text-4xl shadow-[0_0_35px_rgba(255,0,100,0.4)]">

                🚨

              </div>

              <h2 className="text-4xl font-black mt-8 leading-tight">

                Facing Any
                <br />

                Technical Problem?

              </h2>

              <p className="text-zinc-400 mt-5 text-lg leading-relaxed">

                Report bugs, streaming issues,
                loading errors, login problems
                or anything related to Defence Era.

              </p>

              {/* FEATURES */}
              <div className="mt-10 space-y-5">

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center text-2xl">
                    ⚡
                  </div>

                  <div>

                    <h3 className="font-bold">
                      Fast Support
                    </h3>

                    <p className="text-zinc-500 text-sm">
                      Quick issue resolution
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center text-2xl">
                    🔐
                  </div>

                  <div>

                    <h3 className="font-bold">
                      Secure System
                    </h3>

                    <p className="text-zinc-500 text-sm">
                      Your data remains protected
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center text-2xl">
                    🎯
                  </div>

                  <div>

                    <h3 className="font-bold">
                      Dedicated Team
                    </h3>

                    <p className="text-zinc-500 text-sm">
                      Defence Era technical support
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* FORM CARD */}
          <div className="rounded-[35px] border border-zinc-800 bg-gradient-to-br from-zinc-900 to-black p-8">

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* NAME */}
              <div>

                <label className="text-sm text-zinc-400 mb-2 block">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  required
                  className="w-full bg-black/50 border border-zinc-700 focus:border-red-500 rounded-2xl p-5 outline-none transition-all"
                />

              </div>

              {/* EMAIL */}
              <div>

                <label className="text-sm text-zinc-400 mb-2 block">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                  className="w-full bg-black/50 border border-zinc-700 focus:border-red-500 rounded-2xl p-5 outline-none transition-all"
                />

              </div>

              {/* MESSAGE */}
              <div>

                <label className="text-sm text-zinc-400 mb-2 block">
                  Describe Problem
                </label>

                <textarea
                  placeholder="Write your issue here..."
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                  required
                  rows={7}
                  className="w-full bg-black/50 border border-zinc-700 focus:border-red-500 rounded-2xl p-5 outline-none resize-none transition-all"
                />

              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:scale-[1.02] active:scale-95 transition-all duration-300 py-5 rounded-2xl font-black text-lg shadow-[0_0_35px_rgba(255,0,100,0.35)]"
              >

                {loading
                  ? "Sending..."
                  : "Send Report"}

              </button>

            </form>

          </div>

        </div>

        {/* FOOTER */}
        <div className="text-center mt-16">

          <p className="text-zinc-500 text-xs tracking-[8px] uppercase">

            Defence Era Premium Platform

          </p>

        </div>

      </div>

    </main>

  )
}