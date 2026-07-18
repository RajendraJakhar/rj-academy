"use client"

// ─────────────────────────────────────────────
// ADMIN → EXAM COUNTDOWN MANAGER
// Save as: app/admin/exams/page.tsx
// (agar admin folder ka path alag hai to waha daal dena,
//  aur admin sidebar/menu mein link add kar dena: /admin/exams)
// ─────────────────────────────────────────────

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

const COLOR_OPTIONS = [
  { key: "purple", grad: "from-purple-600 to-blue-500", glowRgb: "168,85,247" },
  { key: "emerald", grad: "from-emerald-500 to-teal-500", glowRgb: "16,185,129" },
  { key: "sky", grad: "from-sky-500 to-cyan-500", glowRgb: "14,165,233" },
  { key: "pink", grad: "from-pink-500 to-rose-500", glowRgb: "236,72,153" },
  { key: "amber", grad: "from-amber-500 to-orange-500", glowRgb: "245,158,11" },
  { key: "fuchsia", grad: "from-fuchsia-500 to-violet-500", glowRgb: "217,70,239" },
]

const EMPTY_FORM = {
  name: "",
  exam_date: "",
  icon: "🎖️",
  color: "purple",
  sort_order: 0,
}

function getDaysLeft(dateStr: string) {

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const examDate = new Date(dateStr + "T00:00:00")

  return Math.ceil(
    (examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  )
}

export default function AdminExamsPage() {

  const router = useRouter()

  const [exams, setExams] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<any>(EMPTY_FORM)

  useEffect(() => {

    fetchExams()

  }, [])

  // FETCH ALL (active + inactive dono, admin ko sab dikhna chahiye)
  const fetchExams = async () => {

    setLoading(true)

    const { data, error } = await supabase
      .from("exams")
      .select("*")
      .order("sort_order", { ascending: true })

    if (error) {

      console.log(error)

    } else {

      setExams(data || [])

    }

    setLoading(false)
  }

  // OPEN ADD FORM
  const openAdd = () => {

    setEditingId(null)
    setForm({ ...EMPTY_FORM, sort_order: exams.length + 1 })
    setShowForm(true)
  }

  // OPEN EDIT FORM
  const openEdit = (exam: any) => {

    setEditingId(exam.id)

    setForm({
      name: exam.name,
      exam_date: exam.exam_date,
      icon: exam.icon,
      color: exam.color,
      sort_order: exam.sort_order,
    })

    setShowForm(true)
  }

  // SAVE (insert ya update)
  const saveExam = async () => {

    if (!form.name.trim() || !form.exam_date) {

      alert("Exam name aur date dono required hai!")

      return
    }

    setSaving(true)

    if (editingId) {

      const { error } = await supabase
        .from("exams")
        .update({
          name: form.name.trim(),
          exam_date: form.exam_date,
          icon: form.icon,
          color: form.color,
          sort_order: Number(form.sort_order) || 0,
        })
        .eq("id", editingId)

      if (error) {

        console.log(error)

        alert("Update failed: " + error.message)

      }

    } else {

      const { error } = await supabase
        .from("exams")
        .insert({
          name: form.name.trim(),
          exam_date: form.exam_date,
          icon: form.icon,
          color: form.color,
          sort_order: Number(form.sort_order) || 0,
        })

      if (error) {

        console.log(error)

        alert("Add failed: " + error.message)

      }

    }

    setSaving(false)
    setShowForm(false)

    fetchExams()
  }

  // TOGGLE ACTIVE
  const toggleActive = async (exam: any) => {

    const { error } = await supabase
      .from("exams")
      .update({ is_active: !exam.is_active })
      .eq("id", exam.id)

    if (error) {

      console.log(error)

    }

    fetchExams()
  }

  // DELETE
  const deleteExam = async (exam: any) => {

    const sure = confirm(`"${exam.name}" delete karna hai? Ye wapas nahi aayega.`)

    if (!sure) return

    const { error } = await supabase
      .from("exams")
      .delete()
      .eq("id", exam.id)

    if (error) {

      console.log(error)

      alert("Delete failed: " + error.message)

    }

    fetchExams()
  }

  return (

    <main className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600 blur-[140px] opacity-15 rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 blur-[140px] opacity-15 rounded-full"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-6">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6 md:mb-8 gap-3">

          <div className="flex items-center gap-3 md:gap-4 min-w-0">

            <button
              onClick={() => router.back()}
              className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-black/40 border border-zinc-700 hover:border-purple-500 transition-all text-lg shrink-0"
            >
              ←
            </button>

            <div className="min-w-0">

              <h1 className="text-lg md:text-2xl font-black bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent tracking-wide truncate">
                EXAM COUNTDOWN MANAGER
              </h1>

              <p className="text-zinc-500 text-[10px] md:text-xs tracking-[2px] uppercase font-semibold">
                {exams.length} Exams • Students ko dashboard pe dikhega
              </p>

            </div>

          </div>

          <button
            onClick={openAdd}
            className="bg-gradient-to-r from-purple-600 to-blue-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-105 px-4 py-2.5 md:px-5 md:py-3 rounded-xl font-bold text-xs md:text-sm transition-all shrink-0"
          >
            + Add Exam
          </button>

        </div>

        {/* LOADING */}
        {loading ? (

          <div className="flex flex-col gap-3">

            {[1, 2, 3].map((i) => (

              <div
                key={i}
                className="animate-pulse bg-black/40 border border-zinc-800 rounded-2xl h-[72px]"
              ></div>

            ))}

          </div>

        ) : exams.length === 0 ? (

          <div className="bg-black/40 border border-zinc-800 rounded-[28px] p-10 text-center">

            <h2 className="text-xl font-bold text-zinc-300">
              Koi Exam Nahi Hai
            </h2>

            <p className="text-zinc-500 mt-2 text-sm">
              "+ Add Exam" se pehla exam add karo — students ko turant dikhna shuru ho jayega.
            </p>

          </div>

        ) : (

          <div className="flex flex-col gap-3">

            {exams.map((exam) => {

              const c =
                COLOR_OPTIONS.find((x) => x.key === exam.color) ||
                COLOR_OPTIONS[0]

              const d = getDaysLeft(exam.exam_date)

              return (

                <div
                  key={exam.id}
                  className={`relative flex items-center gap-3 md:gap-4 rounded-2xl border bg-white/[0.03] px-3.5 py-3 md:px-5 md:py-4 transition-all ${
                    exam.is_active
                      ? "border-white/10"
                      : "border-zinc-800 opacity-50"
                  }`}
                >

                  {/* ICON */}
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${c.grad} flex items-center justify-center text-lg md:text-xl shrink-0`}
                    style={{ boxShadow: `0 0 14px rgba(${c.glowRgb},0.3)` }}
                  >
                    {exam.icon}
                  </div>

                  {/* INFO */}
                  <div className="min-w-0 flex-1">

                    <p className="text-white font-bold text-sm md:text-base truncate">
                      {exam.name}

                      {!exam.is_active && (
                        <span className="ml-2 text-[10px] text-zinc-500 font-semibold uppercase tracking-wide">
                          (Hidden)
                        </span>
                      )}
                    </p>

                    <p className="text-zinc-500 text-xs mt-0.5">
                      {new Date(exam.exam_date + "T00:00:00").toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                      {" • "}
                      {d > 0 ? `${d} days left` : d === 0 ? "Today!" : "Done"}
                    </p>

                  </div>

                  {/* ACTIONS */}
                  <div className="flex items-center gap-1.5 md:gap-2 shrink-0">

                    {/* SHOW/HIDE */}
                    <button
                      onClick={() => toggleActive(exam)}
                      title={exam.is_active ? "Hide from students" : "Show to students"}
                      className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-white/5 border border-white/10 hover:border-white/30 transition-all text-sm"
                    >
                      {exam.is_active ? "👁️" : "🚫"}
                    </button>

                    {/* EDIT */}
                    <button
                      onClick={() => openEdit(exam)}
                      title="Edit"
                      className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-white/5 border border-white/10 hover:border-purple-500 transition-all text-sm"
                    >
                      ✏️
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() => deleteExam(exam)}
                      title="Delete"
                      className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-white/5 border border-white/10 hover:border-red-500 hover:bg-red-500/10 transition-all text-sm"
                    >
                      🗑️
                    </button>

                  </div>

                </div>

              )

            })}

          </div>

        )}

      </div>

      {/* ─── ADD / EDIT MODAL ─── */}
      {showForm && (

        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowForm(false)}
        >

          <div
            className="w-full max-w-md bg-zinc-950 border border-purple-500/30 rounded-3xl p-5 md:p-6 shadow-[0_0_60px_rgba(168,85,247,0.2)]"
            onClick={(e) => e.stopPropagation()}
          >

            <h3 className="text-lg font-black bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent tracking-wide mb-5">
              {editingId ? "EDIT EXAM" : "ADD NEW EXAM"}
            </h3>

            {/* NAME */}
            <label className="block text-zinc-400 text-xs font-semibold mb-1.5">
              Exam Name
            </label>

            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. NDA 1 2027"
              className="w-full bg-black/50 border border-zinc-800 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-all mb-4"
            />

            {/* DATE */}
            <label className="block text-zinc-400 text-xs font-semibold mb-1.5">
              Exam Date
            </label>

            <input
              type="date"
              value={form.exam_date}
              onChange={(e) => setForm({ ...form, exam_date: e.target.value })}
              className="w-full bg-black/50 border border-zinc-800 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-all mb-4 [color-scheme:dark]"
            />

            {/* ICON + SORT ORDER */}
            <div className="flex gap-3 mb-4">

              <div className="flex-1">

                <label className="block text-zinc-400 text-xs font-semibold mb-1.5">
                  Icon (emoji)
                </label>

                <input
                  type="text"
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  placeholder="🎖️"
                  className="w-full bg-black/50 border border-zinc-800 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
                />

              </div>

              <div className="w-28">

                <label className="block text-zinc-400 text-xs font-semibold mb-1.5">
                  Order
                </label>

                <input
                  type="number"
                  value={form.sort_order}
                  onChange={(e) => setForm({ ...form, sort_order: e.target.value })}
                  className="w-full bg-black/50 border border-zinc-800 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
                />

              </div>

            </div>

            {/* COLOR PICKER */}
            <label className="block text-zinc-400 text-xs font-semibold mb-1.5">
              Card Color
            </label>

            <div className="flex gap-2 mb-6">

              {COLOR_OPTIONS.map((c) => (

                <button
                  key={c.key}
                  onClick={() => setForm({ ...form, color: c.key })}
                  className={`w-9 h-9 rounded-xl bg-gradient-to-br ${c.grad} transition-all ${
                    form.color === c.key
                      ? "ring-2 ring-white scale-110"
                      : "opacity-60 hover:opacity-100"
                  }`}
                  title={c.key}
                ></button>

              ))}

            </div>

            {/* ACTIONS */}
            <div className="flex gap-3">

              <button
                onClick={() => setShowForm(false)}
                className="flex-1 rounded-xl border border-zinc-800 py-2.5 text-zinc-400 text-sm hover:text-white hover:border-zinc-600 transition-all"
              >
                Cancel
              </button>

              <button
                onClick={saveExam}
                disabled={saving}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] rounded-xl py-2.5 font-bold text-sm transition-all disabled:opacity-50"
              >
                {saving ? "Saving..." : editingId ? "Update Exam" : "Add Exam"}
              </button>

            </div>

          </div>

        </div>

      )}

    </main>

  )
}