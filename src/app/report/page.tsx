"use client"

import { useState } from "react"

export default function ReportPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    const response = await fetch("https://formspree.io/f/maqkjeyv", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
      }),
    })

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
    <main className="min-h-screen bg-black text-white p-4 flex items-center justify-center">

      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-xl">

        {/* Header */}
        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-red-400">
            🚨 Report Problem
          </h1>

          <p className="text-zinc-400 mt-2 text-sm">
            Facing any issue? Send it directly to RJ Academy support
          </p>

        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full bg-black border border-zinc-700 rounded-2xl p-4 outline-none"
          />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-black border border-zinc-700 rounded-2xl p-4 outline-none"
          />

          <textarea
            placeholder="Write your problem here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={5}
            className="w-full bg-black border border-zinc-700 rounded-2xl p-4 outline-none resize-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90 transition-all p-4 rounded-2xl font-bold text-lg"
          >
            {loading ? "Sending..." : "Send Problem"}
          </button>

        </form>

      </div>

    </main>
  )
}