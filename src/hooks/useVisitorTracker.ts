"use client"

import { useEffect } from "react"
import { supabase } from "@/lib/supabase"

export function useVisitorTracker() {

  useEffect(() => {

    startTracking()

  }, [])

  async function startTracking() {

    let visitorId =
      localStorage.getItem("visitor_id")

    if (!visitorId) {

      visitorId =
        crypto.randomUUID()

      localStorage.setItem(
        "visitor_id",
        visitorId
      )

    }

    const {
      data: { user },
    } = await supabase.auth.getUser()

    const isGuest = !user

    await supabase
      .from("online_visitors")
      .upsert({
        visitor_id: visitorId,
        user_id: user?.id ?? null,
        page: window.location.pathname,
        device: getDevice(),
        browser: getBrowser(),
        is_guest: isGuest,
        last_seen: new Date().toISOString(),
      })

    setInterval(async () => {

      await supabase
        .from("online_visitors")
        .update({
          page: window.location.pathname,
          last_seen: new Date().toISOString(),
        })
        .eq("visitor_id", visitorId)

    }, 30000)

  }

  return null

}
function getDevice() {

  const ua = navigator.userAgent

  if (/mobile/i.test(ua))
    return "Mobile"

  if (/tablet/i.test(ua))
    return "Tablet"

  return "Desktop"

}

function getBrowser() {

  const ua = navigator.userAgent

  if (ua.includes("Chrome"))
    return "Chrome"

  if (ua.includes("Firefox"))
    return "Firefox"

  if (ua.includes("Safari"))
    return "Safari"

  if (ua.includes("Edge"))
    return "Edge"

  return "Unknown"

}