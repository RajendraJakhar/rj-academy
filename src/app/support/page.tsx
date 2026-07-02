"use client"

import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Heart,
  Gift,
  Send,
  Video,
  Server,
  Wifi,
  Sparkles,
  Code2,
  Megaphone,
  ShieldCheck,
  Infinity as InfinityIcon,
} from "lucide-react"

const TELEGRAM_LINK = "https://t.me/+fb_amz94Q_o5Njk1"

const features = [
  {
    icon: Video,
    label: "High Quality Video",
    sub: "Recording & editing",
    color: "bg-gradient-to-br from-sky-500 to-blue-600",
  },
  {
    icon: Server,
    label: "Website & Server",
    sub: "Hosting & maintenance",
    color: "bg-gradient-to-br from-orange-500 to-red-600",
  },
  {
    icon: Megaphone,
    label: "Study Materials",
    sub: "E-books & resources",
    color: "bg-gradient-to-br from-amber-500 to-orange-600",
  },
  {
    icon: Sparkles,
    label: "Premium Tools",
    sub: "For better content",
    color: "bg-gradient-to-br from-pink-500 to-fuchsia-600",
  },
  {
    icon: Wifi,
    label: "Internet & Utilities",
    sub: "Smooth platform access",
    color: "bg-gradient-to-br from-cyan-500 to-sky-600",
  },
  {
    icon: Code2,
    label: "Future Development",
    sub: "New features & updates",
    color: "bg-gradient-to-br from-pink-500 to-rose-600",
  },
]

const amounts = [100, 200, 300, 500, 1000]

const promises = [
  {
    icon: InfinityIcon,
    title: "Always Free",
    desc: "100% free education, no hidden charges, forever.",
  },
  {
    icon: ShieldCheck,
    title: "Made With Passion",
    desc: "Built and run by someone who cares about your goal.",
  },
  {
    icon: Heart,
    title: "For Every Aspirant",
    desc: "No paywalls between you and your dream uniform.",
  },
]

export default function SupportPage() {
  const [selected, setSelected] = useState<number | null>(200)
  const [custom, setCustom] = useState("")

  const activeAmount = custom ? Number(custom) : selected

  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden">

      {/* Ambient glows */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 sm:w-[420px] sm:h-[420px] bg-purple-600 blur-[110px] sm:blur-[160px] opacity-20 rounded-full" />
      <div className="pointer-events-none absolute top-1/3 -right-24 w-72 h-72 sm:w-[420px] sm:h-[420px] bg-pink-600 blur-[110px] sm:blur-[160px] opacity-[0.15] rounded-full" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 w-64 h-64 sm:w-96 sm:h-96 bg-fuchsia-600 blur-[100px] sm:blur-[140px] opacity-[0.12] rounded-full" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-12"
        >
          <Link href="/">
            <button className="group w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-zinc-900/70 border border-zinc-800 backdrop-blur-xl text-white flex items-center justify-center hover:border-purple-500/60 hover:shadow-[0_0_20px_rgba(168,85,247,0.25)] transition-all">
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>
          </Link>

          <div className="mt-6 sm:mt-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-white to-pink-400 bg-clip-text text-transparent">
              Support Defence Era
            </h1>
            <p className="mt-3 text-zinc-400 text-xs sm:text-sm tracking-[3px] sm:tracking-[5px] uppercase">
              Keep Education Free <span className="text-purple-500">•</span> Fuel The Mission
            </p>
          </div>
        </motion.div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 sm:gap-6 lg:gap-8">

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3 flex flex-col gap-5 sm:gap-6"
          >

            {/* Large Glass Card */}
            <div className="relative rounded-[28px] bg-zinc-900/40 border border-zinc-800 backdrop-blur-2xl p-6 sm:p-8 md:p-10 overflow-hidden">

              <div className="absolute -top-16 -right-16 w-48 h-48 bg-pink-600 blur-[90px] opacity-20 rounded-full" />

              <div className="relative">
                <div className="relative w-fit">
                  <div className="absolute inset-0 bg-pink-600 blur-2xl opacity-40 rounded-full" />
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center shadow-[0_0_25px_rgba(236,72,153,0.4)]">
                    <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" />
                  </div>
                </div>

                <h2 className="mt-5 sm:mt-6 text-xl sm:text-2xl md:text-3xl font-extrabold leading-tight">
                  Together, We Can
                  <br />
                  <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
                    Keep Education FREE!
                  </span>
                </h2>

                <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
                  Defence Era is a non-profit platform created to provide 100%
                  FREE quality education for NDA, CDS, AFCAT, SSB and all
                  defence exams.
                </p>

                <p className="mt-3 text-zinc-400 text-sm sm:text-base leading-relaxed">
                  Running this platform requires resources like servers,
                  internet, premium tools and content creation.
                </p>

                {/* Highlight strip */}
                <div className="mt-5 rounded-2xl bg-pink-500/10 border border-pink-500/20 px-4 sm:px-5 py-3.5 sm:py-4">
                  <p className="text-xs sm:text-sm text-pink-100/90 leading-relaxed">
                    Your support helps us continue this mission and reach more
                    defence aspirants across India. 🇮🇳
                  </p>
                </div>

                <p className="mt-6 text-xs sm:text-sm font-bold text-zinc-300 tracking-wide">
                  Your Support Helps In
                </p>

                {/* Feature Grid */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {features.map(({ icon: Icon, label, sub, color }) => (
                    <div
                      key={label}
                      className="group flex items-center gap-3 rounded-2xl bg-black/40 border border-zinc-800 px-3.5 py-3 hover:border-purple-500/40 transition-all"
                    >
                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}
                      >
                        <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-white" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-zinc-200 leading-tight">
                          {label}
                        </p>
                        <p className="text-[10px] sm:text-xs text-zinc-500 mt-0.5">
                          {sub}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quote strip */}
                <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-purple-950/50 to-pink-950/30 border border-purple-500/20 px-4 sm:px-5 py-4">
                  <p className="text-xs sm:text-sm italic text-zinc-300 leading-relaxed">
                    "A small support from you can create a big impact in
                    someone&apos;s life."
                  </p>
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(236,72,153,0.4)]">
                    <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>

          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-5 sm:gap-6"
          >

            {/* Support Card */}
            <div className="relative rounded-[28px] bg-zinc-900/40 border border-zinc-800 backdrop-blur-2xl p-6 sm:p-8">

              <div className="relative w-fit">
                <div className="absolute inset-0 bg-purple-600 blur-2xl opacity-30 rounded-full" />
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-black border border-purple-500/30 flex items-center justify-center">
                  <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                </div>
              </div>

              <h3 className="mt-4 text-lg sm:text-xl font-extrabold">
                Support the Mission
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                Choose any amount — every bit genuinely helps.
              </p>

              {/* Amount Grid */}
              <div className="mt-5 grid grid-cols-3 gap-2.5 sm:gap-3">
                {amounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => {
                      setSelected(amt)
                      setCustom("")
                    }}
                    className={`relative rounded-2xl py-3 sm:py-3.5 text-sm sm:text-base font-bold border transition-all overflow-hidden ${
                      activeAmount === amt
                        ? "border-transparent bg-gradient-to-r from-purple-500 to-pink-500 shadow-[0_0_20px_rgba(217,70,239,0.35)] scale-[1.02]"
                        : "border-zinc-800 bg-black/40 text-zinc-300 hover:border-purple-500/50"
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}

                {/* Custom Amount */}
                <div
                  className={`relative flex items-center rounded-2xl border px-3 py-3 sm:py-3.5 transition-all ${
                    custom
                      ? "border-purple-500/60 bg-black/40"
                      : "border-zinc-800 bg-black/40 hover:border-zinc-700"
                  }`}
                >
                  <span className="text-zinc-500 text-xs sm:text-sm mr-1 shrink-0">₹</span>
                  <input
                    type="number"
                    min={1}
                    value={custom}
                    onChange={(e) => {
                      setCustom(e.target.value)
                      setSelected(null)
                    }}
                    placeholder="Custom"
                    className="w-full min-w-0 bg-transparent outline-none text-xs sm:text-sm font-bold text-white placeholder:text-zinc-600 placeholder:font-normal"
                  />
                </div>
              </div>
            </div>

            {/* Telegram Card */}
            <div className="relative rounded-[28px] bg-zinc-900/40 border border-zinc-800 backdrop-blur-2xl p-6 sm:p-8">
              <h3 className="text-base sm:text-lg font-extrabold">
                Support via PhonePe Gift Card
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 mt-1 leading-relaxed">
                Send a PhonePe Gift Card{activeAmount ? ` of ₹${activeAmount}` : ""}{" "}
                and message us on Telegram to confirm — quick, simple, and
                completely voluntary.
              </p>

              <a
                href={TELEGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 block"
              >
                <button className="group relative w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:opacity-95 transition-all py-4 rounded-2xl font-bold text-sm sm:text-base shadow-[0_0_25px_rgba(56,189,248,0.3)] overflow-hidden">
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 relative" />
                  <span className="relative">Message on Telegram</span>
                </button>
              </a>

            </div>

            {/* Transparency Card */}
            <div className="rounded-[28px] bg-black/40 border border-zinc-800 p-5 sm:p-6 flex items-start gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm sm:text-base font-bold text-zinc-200">
                  100% Transparent
                </p>
                <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
                  No hidden charges. Every contribution directly supports
                  Defence Era.
                </p>
              </div>
            </div>

          </motion.div>

        </div>

        {/* BOTTOM SECTION — Our Promise */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-10 sm:mt-14"
        >
          <h3 className="text-center text-xs sm:text-sm tracking-[4px] uppercase text-zinc-500 mb-6 sm:mb-8">
            Our Promise
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {promises.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group rounded-[28px] bg-zinc-900/40 border border-zinc-800 backdrop-blur-2xl p-6 text-center hover:border-purple-500/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="mx-auto w-12 h-12 rounded-2xl bg-black border border-zinc-800 flex items-center justify-center group-hover:border-purple-500/50 transition-all">
                  <Icon className="w-5 h-5 text-purple-400" />
                </div>
                <p className="mt-4 text-sm sm:text-base font-bold text-zinc-200">
                  {title}
                </p>
                <p className="mt-1.5 text-xs sm:text-sm text-zinc-500 leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <p className="text-center text-[10px] sm:text-xs text-zinc-700 mt-10 sm:mt-14 pb-4">
          Defence Era will always be free. This page exists for those who
          simply want to give back.
        </p>

      </div>
    </div>
  )
}