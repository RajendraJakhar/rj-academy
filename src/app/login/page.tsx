"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function LoginPage() {

  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert("Invalid Email or Password 😭")
      setLoading(false)
    } else {
      alert("Login Success 😎🔥")
      window.location.href = "/"
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-4">

      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

        {/* Logo */}
        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-purple-400">
            RJ Academy
          </h1>

          <p className="text-zinc-400 mt-2">
            Premium Student Login Portal
          </p>

        </div>

        {/* Email */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-black border border-zinc-700 rounded-2xl p-4 outline-none mb-4"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-black border border-zinc-700 rounded-2xl p-4 outline-none mb-6"
        />

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 transition-all p-4 rounded-2xl font-bold text-lg"
        >
          {loading ? "Logging in..." : "Login to Dashboard"}
        </button>

        {/* Footer */}
        <p className="text-center text-zinc-500 mt-6 text-sm">
          Secure Access • Powered by Rajendra Jakhar
        </p>

      </div>

    </main>
  )
}