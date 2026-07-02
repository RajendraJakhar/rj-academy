"use client"

/**
 * ============================================================================
 * app/admin/popup/page.tsx
 * ============================================================================
 * Simple admin control screen — turn the homepage support popup ON/OFF and
 * edit its text/links, live, without touching code.
 *
 * Drop this file at: app/admin/popup/page.tsx
 * (adjust the path to match wherever your other admin pages live)
 * ============================================================================
 */

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
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

const DEFAULTS: PopupSettings = {
  is_active: false,
  title: "",
  message: "",
  button_text: "",
  button_link: "",
  telegram_link: "",
  show_every_visit: false,
}

export default function AdminPopupPage() {
  const router = useRouter()
  const [form, setForm] = useState<PopupSettings>(DEFAULTS)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [savedMsg, setSavedMsg] = useState("")

  useEffect(() => {
    // 🔒 Reuse the same admin lock as the main dashboard
    const unlocked = localStorage.getItem("adminAccess")
    if (unlocked !== "true") {
      router.push("/admin")
      return
    }
    load()
  }, [])

  const load = async () => {
    const { data, error } = await supabase
      .from("popup_settings")
      .select("*")
      .eq("id", 1)
      .single()

    if (!error && data) {
      setForm(data as PopupSettings)
    }
    setLoading(false)
  }

  const handleChange = (field: keyof PopupSettings, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setSaving(true)
    setSavedMsg("")

    const { error } = await supabase
      .from("popup_settings")
      .update({ ...form })
      .eq("id", 1)

    setSaving(false)

    if (error) {
      setSavedMsg("❌ Save failed: " + error.message)
    } else {
      setSavedMsg("✅ Saved — live on homepage now")
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center text-white">
        <p className="text-zinc-400">Loading popup settings...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-black mb-1">Support Popup Control</h1>
        <p className="text-zinc-400 text-sm mb-8">
          Toggle the homepage popup and edit its content. Changes go live
          immediately for every visitor.
        </p>

        <div className="bg-white/5 border border-white/10 rounded-[28px] p-6 space-y-6">
          {/* ON/OFF TOGGLE */}
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-3.5">
            <div>
              <p className="font-bold">Popup Status</p>
              <p className="text-xs text-zinc-500">
                {form.is_active ? "Currently showing to visitors" : "Currently hidden"}
              </p>
            </div>
            <button
              onClick={() => handleChange("is_active", !form.is_active)}
              className={`
                relative h-8 w-14 rounded-full transition-colors duration-200
                ${form.is_active ? "bg-gradient-to-r from-pink-500 to-purple-600" : "bg-white/10"}
              `}
            >
              <span
                className={`
                  absolute top-1 h-6 w-6 rounded-full bg-white transition-all duration-200
                  ${form.is_active ? "left-7" : "left-1"}
                `}
              />
            </button>
          </div>

          {/* SHOW EVERY VISIT TOGGLE */}
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-3.5">
            <div>
              <p className="font-bold text-sm">Show Every Visit</p>
              <p className="text-xs text-zinc-500">
                Off = once per browser session. On = every page load.
              </p>
            </div>
            <button
              onClick={() => handleChange("show_every_visit", !form.show_every_visit)}
              className={`
                relative h-7 w-12 rounded-full transition-colors duration-200
                ${form.show_every_visit ? "bg-gradient-to-r from-pink-500 to-purple-600" : "bg-white/10"}
              `}
            >
              <span
                className={`
                  absolute top-1 h-5 w-5 rounded-full bg-white transition-all duration-200
                  ${form.show_every_visit ? "left-6" : "left-1"}
                `}
              />
            </button>
          </div>

          {/* TITLE */}
          <div>
            <label className="text-xs font-semibold text-zinc-400 mb-1.5 block">
              Title
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-500/50"
              placeholder="Keep Defence Era Free 🇮🇳"
            />
          </div>

          {/* MESSAGE */}
          <div>
            <label className="text-xs font-semibold text-zinc-400 mb-1.5 block">
              Message
            </label>
            <textarea
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
              rows={3}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-500/50 resize-none"
              placeholder="Short supportive message shown in the popup"
            />
          </div>

          {/* BUTTON TEXT + LINK */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-zinc-400 mb-1.5 block">
                Button Text
              </label>
              <input
                type="text"
                value={form.button_text}
                onChange={(e) => handleChange("button_text", e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-500/50"
                placeholder="Support Now"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-400 mb-1.5 block">
                Button Link
              </label>
              <input
                type="text"
                value={form.button_link}
                onChange={(e) => handleChange("button_link", e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-500/50"
                placeholder="/support"
              />
            </div>
          </div>

          {/* TELEGRAM LINK */}
          <div>
            <label className="text-xs font-semibold text-zinc-400 mb-1.5 block">
              Telegram Link
            </label>
            <input
              type="text"
              value={form.telegram_link}
              onChange={(e) => handleChange("telegram_link", e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-500/50"
              placeholder="https://t.me/..."
            />
          </div>

          {/* SAVE */}
          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-gradient-to-r from-purple-600 to-blue-500 hover:scale-[1.02] transition-all px-6 py-3 rounded-2xl font-black text-sm disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            {savedMsg && <p className="text-sm text-zinc-400">{savedMsg}</p>}
          </div>
        </div>
      </div>
    </main>
  )
}