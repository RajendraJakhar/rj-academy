"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const [showRequestForm, setShowRequestForm] = useState(false)

  const [name, setName] = useState("")
  const [reqEmail, setReqEmail] = useState("")
  const [mobile, setMobile] = useState("")
  const [reqPassword, setReqPassword] = useState("")
  const [batch, setBatch] = useState("")
  const [message, setMessage] = useState("")

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

  const handleRequestAccess = async () => {
    if (!name || !reqEmail || !mobile || !reqPassword || !batch) {
      alert("Please fill all required fields 😭")
      return
    }

    const { error } = await supabase
      .from("access_requests")
      .insert([
        {
          name,
          email: reqEmail,
          mobile,
          password: reqPassword,
          batch,
          message,
        },
      ])

    if (error) {
      console.log(error)
      alert("Something went wrong 😭")
    } else {
      alert("Request sent 😎🔥 We will contact you within 1 hour.")
      setShowRequestForm(false)

      setName("")
      setReqEmail("")
      setMobile("")
      setReqPassword("")
      setBatch("")
      setMessage("")
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

        {/* Request Access Button */}
        <button
          onClick={() => setShowRequestForm(true)}
          className="w-full mt-4 bg-zinc-800 hover:bg-zinc-700 transition-all p-4 rounded-2xl font-bold text-lg"
        >
          Request Premium Access
        </button>

        {/* Footer */}
        <p className="text-center text-zinc-500 mt-6 text-sm">
          Secure Access • Powered by Rajendra Jakhar
        </p>

      </div>

      {/* Popup Form */}
      {showRequestForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">

          <div className="w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-3xl p-6 max-h-[90vh] overflow-y-auto">

            <h2 className="text-2xl font-bold text-purple-400 mb-6 text-center">
              Request Premium Access
            </h2>

            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black border border-zinc-700 rounded-2xl p-4 mb-4"
            />

            <input
              type="email"
              placeholder="Your Email"
              value={reqEmail}
              onChange={(e) => setReqEmail(e.target.value)}
              className="w-full bg-black border border-zinc-700 rounded-2xl p-4 mb-4"
            />

            <input
              type="text"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full bg-black border border-zinc-700 rounded-2xl p-4 mb-4"
            />

            <input
              type="password"
              placeholder="Choose Password"
              value={reqPassword}
              onChange={(e) => setReqPassword(e.target.value)}
              className="w-full bg-black border border-zinc-700 rounded-2xl p-4 mb-4"
            />

            <input
              type="text"
              placeholder="Which Batch do you want?"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              className="w-full bg-black border border-zinc-700 rounded-2xl p-4 mb-4"
            />

            <textarea
              placeholder="Message / Notes"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-black border border-zinc-700 rounded-2xl p-4 mb-4 h-28"
            />

            <button
              onClick={handleRequestAccess}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-500 p-4 rounded-2xl font-bold text-lg"
            >
              Submit Request
            </button>

            <button
              onClick={() => setShowRequestForm(false)}
              className="w-full mt-3 bg-red-600 p-4 rounded-2xl font-bold"
            >
              Close
            </button>

          </div>

        </div>
      )}

    </main>
  )
}