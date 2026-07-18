"use client";

import { motion } from "framer-motion";
import { Heart, Gift, Send, ShieldCheck } from "lucide-react";
import Link from "next/link";

/**
 * SupportSection
 * -----------------------------------------------------------------------
 * MOBILE (< lg): compact, text-free card — same footprint as a single
 * course card. Whole card is a link to /support.
 *
 * DESKTOP (>= lg): original rich two-column strip with full copy,
 * trust row, and both CTAs — unchanged.
 * -----------------------------------------------------------------------
 */

const TELEGRAM_LINK = "https://t.me/+fb_amz94Q_o5Njk1";

export default function SupportSection() {
  return (
    <section className="w-full mt-6 mb-8">
      {/* ============== MOBILE / TABLET — compact, course-card sized ============== */}
      <Link href="/support" className="block lg:hidden">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="
            group relative overflow-hidden
            rounded-2xl border border-white/10
            bg-white/[0.03] backdrop-blur-xl
            shadow-[0_0_30px_-10px_rgba(168,85,247,0.35)]
            active:scale-[0.98] transition-transform duration-200
            px-4 py-4 flex items-center gap-3.5
          "
        >
          {/* ambient glow */}
          <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-fuchsia-600/20 blur-3xl" />

          <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shrink-0 shadow-[0_0_16px_rgba(217,70,239,0.5)]">
            <Heart className="h-5 w-5 text-white" fill="currentColor" />
          </div>

          <h2 className="relative flex-1 min-w-0 text-sm font-bold text-white truncate">
            Support Defence Era
          </h2>

          <div className="relative w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-pink-400/40 transition-all">
            <span className="text-pink-400 text-sm">→</span>
          </div>
        </motion.div>
      </Link>

      {/* ============== DESKTOP — full rich strip ============== */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="
          hidden lg:block
          relative overflow-hidden
          max-w-6xl mx-auto
          rounded-[32px]
          border border-white/10
          bg-white/[0.03] backdrop-blur-xl
          shadow-[0_0_40px_-10px_rgba(168,85,247,0.35)]
          group
        "
      >
        {/* Ambient glow layers */}
        <div className="pointer-events-none absolute -top-24 -left-16 h-56 w-56 rounded-full bg-fuchsia-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-10 h-56 w-56 rounded-full bg-purple-600/20 blur-3xl" />

        {/* Animated border glow on hover */}
        <div className="pointer-events-none absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[linear-gradient(120deg,transparent,rgba(217,70,239,0.15),transparent)]" />

        <div className="relative flex flex-row items-stretch">
          {/* ---------------- LEFT (70%) ---------------- */}
          <div className="flex-1 basis-[70%] p-6 lg:p-8 flex flex-col justify-center">
            {/* Badge */}
            <div className="inline-flex w-fit items-center gap-1.5 mb-3 rounded-full border border-pink-400/20 bg-pink-500/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-pink-300">
              <Heart className="h-3 w-3 fill-pink-400 text-pink-400" />
              COMMUNITY SUPPORTED
            </div>

            <h2 className="text-xl xl:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-pink-400">❤️</span>
              Keep Defence Era Free
            </h2>

            <p className="mt-2 text-sm text-gray-400 leading-relaxed max-w-xl">
              All courses on Defence Era are 100% free. Running this platform
              costs hosting, internet, video storage and premium AI tools —
              if it's helped you, you can support us. Totally voluntary.
            </p>

            {/* Trust row */}
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                Always Free
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                No Hidden Charges
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                Voluntary Support
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                Every Contribution Helps
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="block w-px bg-white/10 my-6" />

          {/* ---------------- RIGHT (30%) ---------------- */}
          <div className="flex-1 basis-[30%] p-6 lg:p-8 flex flex-col justify-center gap-3">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-purple-600 shadow-[0_0_16px_rgba(217,70,239,0.5)]">
                <Gift className="h-4 w-4 text-white" />
              </span>
              Support Defence Era
            </div>

            <p className="text-xs text-gray-400">
              Starting from{" "}
              <span className="text-white font-semibold">₹100</span> via
              PhonePe Gift Card
            </p>

            <div className="flex flex-col gap-2.5 mt-1">
              {/* Support Now -> /support */}
              <Link href="/support" className="w-full">
                <button
                  className="
                    relative w-full overflow-hidden
                    rounded-2xl px-4 py-2.5
                    text-sm font-semibold text-white
                    bg-gradient-to-r from-pink-500 to-purple-600
                    shadow-[0_0_20px_-4px_rgba(217,70,239,0.6)]
                    transition-transform duration-200
                    hover:scale-[1.02] active:scale-[0.98]
                    group/btn
                  "
                >
                  <span className="relative z-10 flex items-center justify-center gap-1.5">
                    <Heart className="h-4 w-4" />
                    Support Now
                  </span>
                  {/* Button shine */}
                  <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                </button>
              </Link>

              {/* Direct Telegram link */}
              <a
                href={TELEGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <button
                  className="
                    w-full flex items-center justify-center gap-1.5
                    rounded-2xl px-4 py-2.5
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
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}