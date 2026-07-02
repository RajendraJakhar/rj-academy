"use client"

/**
 * ============================================================================
 * SupportPopup.tsx
 * ============================================================================
 * Admin-controlled support popup. Shows automatically when the app opens
 * (homepage mounts), driven entirely by the `popup_settings` table in
 * Supabase — flip `is_active` on/off from the admin panel, no redeploy.
 *
 * PLACEMENT: drop this once near the top of your homepage's return, e.g.
 *   <main>
 *     <SupportPopup />
 *     <Sidebar ... />
 *     <nav>...</nav>
 *     ...
 *   </main>
 *
 * It renders nothing visible until its data loads and is_active is true.
 * ============================================================================
 */

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Send, X } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface PopupSettings {
  is_active: boolean
  title: string
  message: string
  button_text: string
  button_link: string
  telegram_link: string
  show_every_visit: boolean
}

const SESSION_KEY = "defence-era-popup-dismissed"

// Splits a trailing flag emoji (e.g. 🇮🇳) off the title so it can be
// rendered at a bigger size independently of the title text — flag emojis
// render tiny/as plain letters on Windows, so we boost just that part.
function splitTitleFlag(title: string) {
  const flagRegex = /(\s*)([\u{1F1E6}-\u{1F1FF}]{2})\s*$/u
  const match = title.match(flagRegex)
  if (match && match.index !== undefined) {
    return { base: title.slice(0, match.index).trim(), flag: match[2] }
  }
  return { base: title, flag: null as string | null }
}

export default function SupportPopup() {
  const [settings, setSettings] = useState<PopupSettings | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      const { data, error } = await supabase
        .from("popup_settings")
        .select("*")
        .eq("id", 1)
        .single()

      if (error || !data || cancelled) return

      setSettings(data as PopupSettings)

      if (!data.is_active) return

      // if admin wants it shown every visit, skip the session check
      if (data.show_every_visit) {
        setVisible(true)
        return
      }

      const alreadyDismissed = sessionStorage.getItem(SESSION_KEY)
      if (!alreadyDismissed) {
        setVisible(true)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [])

  const handleClose = () => {
    setVisible(false)
    sessionStorage.setItem(SESSION_KEY, "1")
  }

  if (!settings) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
        >
          {/* Backdrop */}
          <div
            onClick={handleClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Popup card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="
              relative w-full max-w-sm
              rounded-[28px] border border-white/10
              bg-zinc-950/95 backdrop-blur-xl
              shadow-[0_0_60px_-10px_rgba(217,70,239,0.4)]
              overflow-hidden
            "
          >
            {/* Ambient glow */}
            <div className="pointer-events-none absolute -top-16 -left-10 h-48 w-48 rounded-full bg-fuchsia-600/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -right-10 h-48 w-48 rounded-full bg-purple-600/20 blur-3xl" />

            {/* Close button */}
            <button
              onClick={handleClose}
              aria-label="Close"
              className="
                absolute top-3.5 right-3.5 z-10
                flex h-8 w-8 items-center justify-center
                rounded-full bg-white/5 border border-white/10
                text-gray-400 hover:text-white hover:bg-white/10
                transition-colors
              "
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative p-6 sm:p-7">
              <span
                className="
                  flex h-12 w-12 items-center justify-center rounded-2xl
                  bg-gradient-to-br from-pink-500 to-purple-600
                  shadow-[0_0_24px_-4px_rgba(217,70,239,0.6)]
                  mb-4
                "
              >
                <Heart className="h-6 w-6 fill-white text-white" />
              </span>

              <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                {splitTitleFlag(settings.title).base}
              </h3>

              <p className="mt-2.5 text-sm text-gray-400 leading-relaxed">
                {settings.message}
              </p>

              <div className="flex flex-col gap-2.5 mt-5">
                <Link href={settings.button_link || "/support"} className="w-full">
                  <button
                    onClick={handleClose}
                    className="
                      relative w-full overflow-hidden
                      rounded-2xl px-4 py-3
                      text-sm font-semibold text-white
                      bg-gradient-to-r from-pink-500 to-purple-600
                      shadow-[0_0_22px_-4px_rgba(217,70,239,0.65)]
                      transition-transform duration-200
                      hover:scale-[1.015] active:scale-[0.98]
                      group/btn
                    "
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Heart className="h-4 w-4" />
                      {settings.button_text || "Support Now"}
                    </span>
                    <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                  </button>
                </Link>

                {settings.telegram_link && (
                  <a
                    href={settings.telegram_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <button
                      className="
                        w-full flex items-center justify-center gap-2
                        rounded-2xl px-4 py-3
                        text-sm font-semibold text-white
                        bg-white/5 border border-sky-400/30
                        hover:bg-sky-500/10 hover:border-sky-400/50
                        transition-colors duration-200
                      "
                    >
                      <Send className="h-4 w-4 text-sky-400" />
                      Message on Telegram
                    </button>
                  </a>
                )}

                <button
                  onClick={handleClose}
                  className="text-lg text-gray-400 hover:text-gray-200 transition-colors mt-1.5 font-medium"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}