"use client"

// ─────────────────────────────────────────────
// MAINTENANCE GATE v3 — FULL BLOCK
// Save as: components/MaintenanceGate.tsx
//
// app/layout.tsx mein <body> ke andar children ko wrap karo:
//
//   import MaintenanceGate from "../components/MaintenanceGate"
//
//   <body className={...}>
//     <MaintenanceGate>{children}</MaintenanceGate>
//   </body>
//
// KAISE KAAM KARTA HAI:
// - Maintenance ON → website kholte hi SABKO maintenance screen
//   (login page samet — koi bhi page ho, sab band).
// - Maintenance screen ke bottom pe chhota sa "Admin Login" link hai
//   → /login?admin=1 kholta hai → wahan se sirf login page khulta hai
//   → admin email se login karte hi pura site khul jata hai
//   (upar red banner ke saath), students ke liye band hi rehta hai.
// ─────────────────────────────────────────────

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { supabase } from "@/lib/supabase"

// ✅ Yahi emails admin page mein bhi hain — dono jagah same rakhna
const ADMIN_EMAILS = [
  "rajendrajakhar1322@gmail.com",
  "rajendrajakharyt@gmail.com",
  "cricketnews1322@gmail.com",
]

export default function MaintenanceGate({
  children,
}: {
  children: React.ReactNode
}) {

  const pathname = usePathname()

  const [maintenance, setMaintenance] = useState(false)
  const [message, setMessage] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminBypass, setAdminBypass] = useState(false)
  const [checked, setChecked] = useState(false)

  // CHECK: kya current user admin hai?
  const checkAdmin = async () => {

    const {
      data: { user },
    } = await supabase.auth.getUser()

    setIsAdmin(
      !!user && ADMIN_EMAILS.includes(user.email || "")
    )

  }

  // CHECK: maintenance status
  const fetchStatus = async () => {

    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .eq("id", 1)
      .single()

    if (!error && data) {

      setMaintenance(data.maintenance === true)

      setMessage(data.maintenance_message || "")

    }

    setChecked(true)
  }

  // CHECK: kya URL mein ?admin=1 hai (login backdoor ke liye)
  const checkBypass = () => {

    if (typeof window === "undefined") return

    const params = new URLSearchParams(window.location.search)

    if (params.get("admin") === "1") {

      // Ek baar aaya to session bhar yaad rakho
      // (login ke baad redirect hone par bhi kaam kare)
      sessionStorage.setItem("adminBypass", "1")

    }

    setAdminBypass(
      sessionStorage.getItem("adminBypass") === "1"
    )

  }

  // MOUNT: sab checks + realtime + polling backup
  useEffect(() => {

    fetchStatus()

    checkAdmin()

    checkBypass()

    // 1) REALTIME — admin toggle karte hi turant effect
    const channel = supabase
      .channel("site-settings-watch")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "site_settings",
        },
        (payload: any) => {

          setMaintenance(payload.new?.maintenance === true)

          setMessage(payload.new?.maintenance_message || "")

        }
      )
      .subscribe()

    // 2) POLLING BACKUP — realtime na ho to bhi max 10 sec mein effect
    const interval = setInterval(fetchStatus, 10000)

    return () => {

      supabase.removeChannel(channel)

      clearInterval(interval)

    }

  }, [])

  // HAR PAGE CHANGE pe dobara check
  useEffect(() => {

    fetchStatus()

    checkAdmin()

    checkBypass()

  }, [pathname])

  // ─── ADMIN LOGGED IN — kabhi block nahi, sirf red banner ───
  if (maintenance && isAdmin) {

    return (

      <>

        <div className="sticky top-0 z-[999] bg-gradient-to-r from-red-600 to-orange-500 text-white text-center py-2 px-4 text-xs md:text-sm font-bold tracking-wide flex items-center justify-center gap-2">

          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>

          🛠️ MAINTENANCE LIVE — Students blocked hain, sirf tumhe website dikh rahi hai (Admin)

        </div>

        {children}

      </>

    )

  }

  // ─── LOGIN BACKDOOR — sirf ?admin=1 wale ko login page khulega ───
  if (maintenance && pathname === "/login" && adminBypass) {

    return <>{children}</>

  }

  // Normal render: check pending ya maintenance off
  if (!checked || !maintenance) {

    return <>{children}</>

  }

  // ─── SABKE LIYE — MAINTENANCE SCREEN ───
  return (

    <main className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">

      {/* BACKGROUND GLOWS */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600 blur-[140px] opacity-15 rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-600 blur-[140px] opacity-10 rounded-full"></div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-600 blur-[180px] opacity-[0.05] rounded-full"></div>

      <div className="relative z-10 w-full max-w-md text-center">

        {/* LOGO */}
        <div className="relative inline-block mb-6">

          <div className="absolute inset-0 bg-yellow-500/20 blur-2xl rounded-full"></div>

          <img
            src="/logo.png"
            alt="Defence Era"
            className="relative w-16 h-16 md:w-20 md:h-20 object-contain mx-auto"
          />

        </div>

        {/* CARD */}
        <div className="relative overflow-hidden bg-gradient-to-b from-zinc-900/80 to-zinc-950 border border-white/10 rounded-[32px] p-8 md:p-10 shadow-[0_8px_60px_rgba(234,179,8,0.08)]">

          {/* TOP SHEEN */}
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>

          {/* ICON WITH RING */}
          <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-6">

            {/* SLOW SPINNING RING */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-yellow-500/30 animate-[spin_12s_linear_infinite]"></div>

            {/* INNER CIRCLE */}
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-yellow-500/15 to-orange-500/5 border border-yellow-500/20 flex items-center justify-center text-3xl md:text-4xl">
              🛠️
            </div>

          </div>

          <p className="text-yellow-500/80 text-[10px] md:text-xs tracking-[5px] uppercase font-bold mb-3">
            Scheduled Maintenance
          </p>

          <h1 className="text-3xl md:text-3xl font-black bg-gradient-to-r from-yellow-300 via-yellow-500 to-orange-400 bg-clip-text text-transparent leading-tight">
            We'll Be Back Soon
          </h1>

          <p className="text-zinc-400 mt-4 text-sm md:text-base leading-relaxed">

            {message ||
              "We're upgrading Defence Era to serve you better. Your preparation matters to us — please check back shortly."}

          </p>

          {/* PROGRESS SHIMMER BAR */}
          <div className="mt-7 h-1 rounded-full bg-white/5 overflow-hidden">

            <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-yellow-500 to-orange-400 animate-[maintenanceBar_2.2s_ease-in-out_infinite]"></div>

          </div>

          <div className="mt-4 flex items-center justify-center gap-2">

            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400"></span>
            </span>

            <p className="text-zinc-500 text-[10px] md:text-xs tracking-[3px] uppercase font-semibold">
              Team Is Working On It
            </p>

          </div>

        </div>

        {/* FOOTER */}
        <div className="mt-6 inline-flex items-center gap-2">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-zinc-700"></span>
          <p className="text-zinc-600 text-[10px] tracking-[4px] uppercase">
            Defence Era Premium Platform
          </p>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-zinc-700"></span>
        </div>

        {/* ADMIN BACKDOOR — chhota sa link, students ignore karenge */}
        <div>

          <a
            href="/login?admin=1"
            className="inline-block mt-4 text-zinc-800 hover:text-zinc-200 text-[15px] transition-colors"
          >
            Admin Login
          </a>

        </div>

      </div>

      {/* KEYFRAMES */}
      <style jsx global>{`
        @keyframes maintenanceBar {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(320%); }
        }
      `}</style>

    </main>

  )
}