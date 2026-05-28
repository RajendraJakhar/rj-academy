"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { motion } from "framer-motion"

import {
  Lock,
  Mail,
  Users,
  Sparkles,
} from "lucide-react"

export default function LoginPage() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  // ✅ LOGIN
  const handleLogin = async () => {

    if (!email || !password) {

      alert("Enter Email & Password 😭")
      return

    }

    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {

      alert("Invalid Email or Password 😭")
      setLoading(false)

    } else {

      alert("Welcome to Defence Era 😈🔥")
      window.location.href = "/"

    }

  }

  // ✅ CREATE ACCOUNT
  const handleSignup = async () => {

    if (!email || !password) {

      alert("Enter Email & Password 😭")
      return

    }

    setLoading(true)

    // ✅ CREATE AUTH ACCOUNT
    const { data, error } = await supabase.auth.signUp({

      email,
      password,

    })

    // ❌ ERROR
    if (error) {

      alert(error.message)
      setLoading(false)
      return

    }

    // ✅ INSERT INTO USERS TABLE
    const { error: insertError } = await supabase
      .from("users")
      .insert([
        {
          email: email,
          is_blocked: false,
        },
      ])

    if (insertError) {

      console.log(insertError)

    }

    alert("Account Created Successfully 😎🔥")

    setLoading(false)

  }

  return (

    <main className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center px-4 py-10">

      {/* BACKGROUND */}
      <div className="absolute inset-0">

        <div className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] bg-purple-700/20 blur-[150px] rounded-full"></div>

        <div className="absolute bottom-[-150px] right-[-150px] w-[500px] h-[500px] bg-blue-700/20 blur-[150px] rounded-full"></div>

        <div className="absolute inset-0 bg-[url('/images/hero.jpg')] bg-cover bg-center opacity-[0.08]"></div>

      </div>

      {/* MAIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md bg-black/60 backdrop-blur-2xl border border-purple-500/20 rounded-[35px] p-6 sm:p-8 shadow-[0_0_60px_rgba(168,85,247,0.15)]"
      >

        {/* TOP BADGE */}
        <div className="flex justify-center mb-6">

          <div className="flex items-center gap-2 bg-zinc-900/80 border border-purple-500/20 px-4 py-2 rounded-full">

            <Sparkles className="text-purple-400" size={16} />

            <span className="text-sm text-zinc-300 font-semibold tracking-wide">
              INDIA'S PREMIUM DEFENCE PLATFORM
            </span>

          </div>

        </div>

        {/* LOGO */}
        <div className="text-center mb-8">

          <div className="flex justify-center mb-5">

            <div className="relative">

              <div className="absolute inset-0 bg-purple-600 blur-3xl opacity-30 rounded-full"></div>

              <img
                src="/images/logo.png"
                alt="logo"
                className="relative w-28 h-28 object-contain drop-shadow-[0_0_25px_rgba(168,85,247,0.6)]"
              />

            </div>

          </div>

          <h1 className="text-5xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Defence Era
          </h1>

          <p className="text-zinc-400 mt-3 text-base tracking-wide">
            Dream • Prepare • Achieve
          </p>

        </div>

        {/* EMAIL */}
        <div className="relative mb-4">

          <Mail
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            size={20}
          />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-zinc-950/80 text-white placeholder:text-zinc-500 border border-zinc-800 focus:border-purple-500 rounded-2xl p-4 pl-12 outline-none transition-all"
          />

        </div>

        {/* PASSWORD */}
        <div className="relative mb-6">

          <Lock
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            size={20}
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-zinc-950/80 text-white placeholder:text-zinc-500 border border-zinc-800 focus:border-purple-500 rounded-2xl p-4 pl-12 outline-none transition-all"
          />

        </div>

        {/* LOGIN */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 hover:scale-[1.02] active:scale-[0.98] transition-all p-4 rounded-2xl font-bold text-lg shadow-[0_0_30px_rgba(168,85,247,0.4)]"
        >
          {loading ? "Accessing..." : "Login to Dashboard"}
        </button>

        {/* CREATE ACCOUNT */}
        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full mt-4 bg-zinc-900 border border-zinc-700 hover:border-purple-500 hover:bg-zinc-800 transition-all p-4 rounded-2xl font-bold text-lg text-white"
        >
          Create New Account
        </button>

        {/* WHATSAPP */}
        <a
          href="https://whatsapp.com/channel/0029VbDYZFFAjPXOkyYSID3K/320"
          target="_blank"
          className="w-full mt-4 flex items-center justify-center gap-3 bg-green-600 hover:bg-green-500 transition-all p-4 rounded-2xl font-bold text-lg"
        >

          <Users size={20} />

          Join WhatsApp Channel

        </a>

        {/* FOOTER */}
        <div className="mt-8 text-center">

          <p className="text-zinc-500 text-sm tracking-[5px] uppercase">
            Defence Era Premium
          </p>

        </div>

      </motion.div>

    </main>

  )

}