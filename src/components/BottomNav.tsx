import Link from "next/link"

export default function BottomNav() {

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-zinc-800 p-4 flex items-center justify-around z-50">

      <Link href="/">
        <button className="flex flex-col items-center text-purple-400">

          <span className="text-2xl">
            🏠
          </span>

          <span className="text-xs mt-1">
            Home
          </span>

        </button>
      </Link>

      <Link href="/courses">
        <button className="flex flex-col items-center text-zinc-400">

          <span className="text-2xl">
            📚
          </span>

          <span className="text-xs mt-1">
            Courses
          </span>

        </button>
      </Link>

      <button className="flex flex-col items-center text-zinc-400">

        <span className="text-2xl">
          ❤️
        </span>

        <span className="text-xs mt-1">
          Saved
        </span>

      </button>

      <button className="flex flex-col items-center text-zinc-400">

        <span className="text-2xl">
          👤
        </span>

        <span className="text-xs mt-1">
          Profile
        </span>

      </button>

    </div>
  )
}